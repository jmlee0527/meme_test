import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";

// Run the site's actual TypeScript data/helpers in Node without a bundler or
// changing Node's global resolver. Used only by validation scripts.
const cache = new Map();
export function loadSiteModule(relativePath) {
  const filename = path.resolve(relativePath);
  if (cache.has(filename)) return cache.get(filename).exports;
  const module = { exports: {} };
  cache.set(filename, module);
  const nativeRequire = createRequire(filename);
  const require = (specifier) => {
    if (!specifier.startsWith("@/") && !specifier.startsWith(".")) return nativeRequire(specifier);
    const base = specifier.startsWith("@/") ? path.resolve(specifier.slice(2)) : path.resolve(path.dirname(filename), specifier);
    const resolved = [base, `${base}.ts`, `${base}.json`, path.join(base, "index.ts")].find((file) => fs.existsSync(file) && fs.statSync(file).isFile());
    if (!resolved) throw new Error(`Cannot resolve ${specifier} from ${filename}`);
    if (resolved.endsWith(".json")) return JSON.parse(fs.readFileSync(resolved, "utf8"));
    return loadSiteModule(resolved);
  };
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, esModuleInterop: true },
  });
  new Function("require", "module", "exports", outputText)(require, module, module.exports);
  return module.exports;
}
