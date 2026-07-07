import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const svgPath = path.join(root, "app/icon.svg");
const outPath = path.join(root, "app/favicon.ico");
const sizes = [16, 32, 48];

function encodeIco(images) {
  const headerSize = 6 + images.length * 16;
  let offset = headerSize;
  const entries = images.map((image) => {
    const entry = {
      width: image.width,
      height: image.height,
      size: image.data.length,
      offset,
    };
    offset += image.data.length;
    return entry;
  });

  const buffer = Buffer.alloc(offset);
  buffer.writeUInt16LE(0, 0);
  buffer.writeUInt16LE(1, 2);
  buffer.writeUInt16LE(images.length, 4);

  let position = 6;
  for (const entry of entries) {
    buffer.writeUInt8(entry.width >= 256 ? 0 : entry.width, position);
    buffer.writeUInt8(entry.height >= 256 ? 0 : entry.height, position + 1);
    buffer.writeUInt8(0, position + 2);
    buffer.writeUInt8(0, position + 3);
    buffer.writeUInt16LE(1, position + 4);
    buffer.writeUInt16LE(32, position + 6);
    buffer.writeUInt32LE(entry.size, position + 8);
    buffer.writeUInt32LE(entry.offset, position + 12);
    position += 16;
  }

  for (let index = 0; index < images.length; index += 1) {
    images[index].data.copy(buffer, entries[index].offset);
  }

  return buffer;
}

const svg = fs.readFileSync(svgPath);
const images = await Promise.all(
  sizes.map(async (size) => ({
    width: size,
    height: size,
    data: await sharp(svg).resize(size, size).png().toBuffer(),
  })),
);

fs.writeFileSync(outPath, encodeIco(images));
console.log(`favicon.ico generated at ${outPath} (${sizes.join(", ")}px)`);
