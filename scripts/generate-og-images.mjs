// One-off generator for public/images/og-default-{en,ar}.jpg — run with
// `node scripts/generate-og-images.mjs`. Builds an SVG (brand navy/accent
// background, real logo, headline) and rasterizes it with sharp. Not part
// of the build; sharp is a devDependency used only for this script.
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const COPY = {
  en: {
    eyebrow: "REGISTERED LAW FIRM IN SAUDI ARABIA",
    subtitle: "Legal Services in Saudi Arabia",
    tagline: "Corporate Immigration  ·  Company Incorporation  ·  Commercial Disputes  ·  Notary Services",
  },
  ar: {
    eyebrow: "شركة محامية مسجلة في المملكة العربية السعودية",
    subtitle: "خدمات قانونية في المملكة العربية السعودية",
    tagline: "الهجرة العالمية  ·  تأسيس الشركات  ·  المنازعات التجارية  ·  خدمات التوثيق",
  },
};

function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

async function buildSvg(lang) {
  const copy = COPY[lang];
  const isRtl = lang === "ar";
  const fontFamily = isRtl ? "Noto Sans Arabic, Arial, sans-serif" : "Inter, Arial, sans-serif";

  const logoPath = join(root, "public/images/logo-real.png");
  const logoBuffer = readFileSync(logoPath);
  const logoMeta = await sharp(logoBuffer).metadata();
  const logoDisplayWidth = 280;
  const logoDisplayHeight = Math.round(logoDisplayWidth * (logoMeta.height / logoMeta.width));
  const logoBase64 = logoBuffer.toString("base64");

  const width = 1200;
  const height = 630;
  const centerX = width / 2;

  const logoCardWidth = logoDisplayWidth + 64;
  const logoCardHeight = logoDisplayHeight + 40;
  const logoCardY = 140;

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow1" cx="15%" cy="15%" r="45%">
      <stop offset="0%" stop-color="#2E5B88" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#2E5B88" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="85%" cy="85%" r="45%">
      <stop offset="0%" stop-color="#2E5B88" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#2E5B88" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2E5B88" stroke-width="1" opacity="0.05"/>
    </pattern>
  </defs>

  <rect width="${width}" height="${height}" fill="#0B192C"/>
  <rect width="${width}" height="${height}" fill="url(#grid)"/>
  <rect width="${width}" height="${height}" fill="url(#glow1)"/>
  <rect width="${width}" height="${height}" fill="url(#glow2)"/>

  <rect x="${centerX - logoCardWidth / 2}" y="${logoCardY}" width="${logoCardWidth}" height="${logoCardHeight}" rx="12" fill="#F8F9FA"/>
  <image x="${centerX - logoDisplayWidth / 2}" y="${logoCardY + (logoCardHeight - logoDisplayHeight) / 2}" width="${logoDisplayWidth}" height="${logoDisplayHeight}" href="data:image/png;base64,${logoBase64}"/>

  <rect x="${centerX - 45}" y="${logoCardY + logoCardHeight + 40}" width="90" height="2" fill="#2E5B88"/>

  <text x="${centerX}" y="${logoCardY + logoCardHeight + 90}" text-anchor="middle" font-family="${fontFamily}" font-size="22" font-weight="600" letter-spacing="4" fill="#2E5B88">${escapeXml(copy.eyebrow)}</text>

  <text x="${centerX}" y="${logoCardY + logoCardHeight + 145}" text-anchor="middle" font-family="${fontFamily}" font-size="40" font-weight="500" fill="#F8F9FA">${escapeXml(copy.subtitle)}</text>

  <text x="${centerX}" y="${logoCardY + logoCardHeight + 190}" text-anchor="middle" font-family="${fontFamily}" font-size="19" fill="#F8F9FA" opacity="0.65">${escapeXml(copy.tagline)}</text>
</svg>`;
}

async function generate(lang) {
  const svg = await buildSvg(lang);
  const outPath = join(root, `public/images/og-default-${lang}.jpg`);
  await sharp(Buffer.from(svg)).jpeg({ quality: 92 }).toFile(outPath);
  console.log(`Wrote ${outPath}`);
}

await generate("en");
await generate("ar");
