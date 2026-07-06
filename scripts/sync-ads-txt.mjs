import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const config = JSON.parse(await readFile(new URL("../config/adsense.json", import.meta.url), "utf8"));
const clientId = (process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || config.clientId).trim();

if (!/^ca-pub-\d{16}$/.test(clientId)) {
  throw new Error("NEXT_PUBLIC_ADSENSE_CLIENT_ID must match ca-pub- followed by 16 digits.");
}

const publisherId = clientId.replace(/^ca-/, "");
const line = `${config.sellerDomain}, ${publisherId}, ${config.relationship}, ${config.certificationAuthorityId}\n`;
await writeFile(new URL("../public/ads.txt", import.meta.url), line, "utf8");
console.log(`ads.txt synchronized for ${publisherId} in ${root}`);
