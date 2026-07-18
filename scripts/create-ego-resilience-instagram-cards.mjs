import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outDir = path.resolve("public/marketing/ego-resilience");
const sourceImage = path.join(outDir, "ego-resilience-mascot.png");
const width = 1080;
const height = 1350;
const font = "Apple SD Gothic Neo, Pretendard, Noto Sans CJK KR, sans-serif";

const esc = (text) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function text(lines, x, y, size, weight, fill, lineHeight = 1.28, anchor = "start", extra = "") {
  const spans = lines.map((line, index) => {
    const dy = index === 0 ? 0 : size * lineHeight;
    return `<tspan x="${x}" dy="${index === 0 ? 0 : dy}">${esc(line)}</tspan>`;
  }).join("");
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="${font}" font-size="${size}" font-weight="${weight}" fill="${fill}" letter-spacing="0" ${extra}>${spans}</text>`;
}

function pill(x, y, w, h, fill, stroke = "none") {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
}

async function roundedImage(input, output, size, radius) {
  const mask = Buffer.from(`<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#fff"/></svg>`);
  await sharp(input).resize(size, size, { fit: "cover" }).composite([{ input: mask, blend: "dest-in" }]).png().toFile(output);
}

async function createCard1() {
  const imagePath = path.join(outDir, "ego-resilience-illustration-card1.png");
  await roundedImage(sourceImage, imagePath, 690, 60);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#EDE9FE"/>
          <stop offset="0.46" stop-color="#ECFEFF"/>
          <stop offset="1" stop-color="#FDF2F8"/>
        </linearGradient>
        <linearGradient id="main" x1="0" x2="1">
          <stop offset="0" stop-color="#6D5DFB"/>
          <stop offset="1" stop-color="#10B981"/>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#7C3AED" flood-opacity=".16"/>
        </filter>
      </defs>
      <rect width="1080" height="1350" fill="url(#bg)"/>
      <circle cx="82" cy="186" r="168" fill="#FFFFFF" opacity=".42"/>
      <circle cx="1000" cy="240" r="210" fill="#FFFFFF" opacity=".48"/>
      <circle cx="912" cy="1140" r="260" fill="#C4B5FD" opacity=".22"/>
      <circle cx="92" cy="1110" r="210" fill="#99F6E4" opacity=".22"/>
      ${pill(82, 88, 260, 60, "#FFFFFFAA", "#FFFFFF")}
      ${text(["무료 심리 테스트"], 212, 127, 28, 800, "#6D5DFB", 1.2, "middle")}
      ${text(["자아탄력성", "테스트"], 82, 270, 102, 900, "#111827", 1.02)}
      ${text(["나는 얼마나 빨리 회복할까?"], 86, 504, 48, 800, "#6D5DFB")}
      <rect x="80" y="596" width="920" height="620" rx="76" fill="#FFFFFFB8" filter="url(#shadow)"/>
      <rect x="108" y="624" width="864" height="564" rx="58" fill="#F8FAFC"/>
      <path d="M148 1112 C310 1048 436 1108 548 1062 C676 1010 810 1054 934 984" fill="none" stroke="#A7F3D0" stroke-width="24" stroke-linecap="round" opacity=".75"/>
      <path d="M140 1042 C266 982 396 1032 516 974 C648 912 780 940 928 866" fill="none" stroke="#C4B5FD" stroke-width="22" stroke-linecap="round" opacity=".62"/>
      ${pill(155, 1238, 770, 70, "#FFFFFFD9", "#FFFFFF")}
      ${text(["12문항 · 약 2~3분 · 회원가입 없음"], 540, 1283, 31, 800, "#334155", 1.2, "middle")}
      ${text(["미미테스트"], 908, 96, 25, 900, "#64748B", 1.2, "end")}
    </svg>`;

  await sharp(Buffer.from(svg))
    .composite([{ input: imagePath, top: 612, left: 195 }])
    .png()
    .toFile(path.join(outDir, "ego-resilience-instagram-01.png"));
}

async function createCard2() {
  const imagePath = path.join(outDir, "ego-resilience-illustration-card2.png");
  await roundedImage(sourceImage, imagePath, 310, 42);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#F8FAFC"/>
          <stop offset="0.45" stop-color="#F5F3FF"/>
          <stop offset="1" stop-color="#ECFDF5"/>
        </linearGradient>
        <linearGradient id="cta" x1="0" x2="1">
          <stop offset="0" stop-color="#6D5DFB"/>
          <stop offset="1" stop-color="#14B8A6"/>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#64748B" flood-opacity=".14"/>
        </filter>
      </defs>
      <rect width="1080" height="1350" fill="url(#bg)"/>
      <circle cx="970" cy="132" r="190" fill="#C4B5FD" opacity=".24"/>
      <circle cx="134" cy="1230" r="250" fill="#99F6E4" opacity=".26"/>
      ${pill(78, 78, 312, 58, "#EDE9FE", "#DDD6FE")}
      ${text(["자아탄력성 테스트"], 234, 116, 28, 900, "#6D5DFB", 1.2, "middle")}
      ${text(["힘든 일이 지나간 뒤,", "나는 어떻게 다시", "일상으로 돌아올까?"], 78, 238, 63, 900, "#111827", 1.13)}
      ${text(["자아탄력성은 상처받지 않는 능력이 아니라", "흔들린 뒤 감정과 상황을 정리하고", "다시 움직일 힘을 찾는 과정이에요."], 82, 520, 31, 700, "#475569", 1.46)}
      <rect x="70" y="690" width="940" height="118" rx="34" fill="#FFFFFFD9" filter="url(#shadow)"/>
      <rect x="100" y="722" width="54" height="54" rx="18" fill="#EDE9FE"/>
      ${text(["1"], 127, 759, 27, 900, "#6D5DFB", 1.2, "middle")}
      ${text(["감정을 정리하는 힘"], 184, 739, 32, 900, "#111827")}
      ${text(["당황해도 다음 행동을 다시 고를 수 있는지 확인해요."], 184, 779, 24, 700, "#64748B")}
      <rect x="70" y="836" width="940" height="118" rx="34" fill="#FFFFFFD9" filter="url(#shadow)"/>
      <rect x="100" y="868" width="54" height="54" rx="18" fill="#DCFCE7"/>
      ${text(["2"], 127, 905, 27, 900, "#059669", 1.2, "middle")}
      ${text(["다시 시작하는 힘"], 184, 885, 32, 900, "#111827")}
      ${text(["실패를 전체로 확대하지 않고 작은 회복 루틴을 찾아요."], 184, 925, 24, 700, "#64748B")}
      <rect x="70" y="982" width="940" height="118" rx="34" fill="#FFFFFFD9" filter="url(#shadow)"/>
      <rect x="100" y="1014" width="54" height="54" rx="18" fill="#FCE7F3"/>
      ${text(["3"], 127, 1051, 27, 900, "#DB2777", 1.2, "middle")}
      ${text(["도움을 요청하는 힘"], 184, 1031, 32, 900, "#111827")}
      ${text(["혼자 버티기보다 필요한 관계 자원을 살펴봐요."], 184, 1071, 24, 700, "#64748B")}
      <rect x="70" y="1162" width="940" height="96" rx="48" fill="url(#cta)"/>
      ${text(["프로필 링크에 접속하여 지금 바로 테스트해보세요!"], 540, 1223, 31, 900, "#FFFFFF", 1.2, "middle")}
      ${text(["미미테스트"], 912, 132, 25, 900, "#64748B", 1.2, "end")}
    </svg>`;

  await sharp(Buffer.from(svg))
    .composite([{ input: imagePath, top: 98, left: 695 }])
    .png()
    .toFile(path.join(outDir, "ego-resilience-instagram-02.png"));
}

await fs.mkdir(outDir, { recursive: true });
await createCard1();
await createCard2();

const files = [
  path.join(outDir, "ego-resilience-instagram-01.png"),
  path.join(outDir, "ego-resilience-instagram-02.png"),
];

for (const file of files) {
  const meta = await sharp(file).metadata();
  if (meta.width !== width || meta.height !== height) {
    throw new Error(`${file} has invalid dimensions ${meta.width}x${meta.height}`);
  }
}

console.log(JSON.stringify({ files, width, height, status: "PASS" }, null, 2));
