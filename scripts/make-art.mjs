// Generates the blog illustrations and Open Graph image as SVG. Run once: node scripts/make-art.mjs
import fs from "node:fs";
import { fileURLToPath } from "node:url";
const out = fileURLToPath(new URL("../public/images/", import.meta.url));
fs.mkdirSync(out + "blog", { recursive: true });

const defs = `<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#04180f"/><stop offset="1" stop-color="#0e6b47"/></linearGradient><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#16c172"/><stop offset="1" stop-color="#b6f35a"/></linearGradient></defs>`;
const frame = (inner, w = 1200, h = 630) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">${defs}<rect width="${w}" height="${h}" fill="url(#bg)"/><circle cx="1050" cy="80" r="220" fill="#16c172" opacity=".18"/><circle cx="120" cy="560" r="200" fill="#b6f35a" opacity=".1"/>${inner}</svg>`;
const bar = (x, y, w, h, o = 1) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${Math.min(14, h / 2)}" fill="url(#g)" opacity="${o}"/>`;
const glass = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="28" fill="#fff" opacity=".08" stroke="#fff" stroke-opacity=".25"/>`;

const art = {
  budget: glass(220, 140, 760, 350) + [["Needs", 480, 0.55], ["Wants", 300, 0.4], ["Savings", 220, 1]].map(([_, w, o], i) => bar(280, 190 + i * 100, w, 56, o)).join("") + `<circle cx="900" cy="300" r="70" fill="none" stroke="url(#g)" stroke-width="22" stroke-dasharray="300 440"/>`,
  cards: glass(260, 150, 480, 300) + `<rect x="300" y="200" width="400" height="200" rx="26" fill="url(#g)"/><rect x="300" y="250" width="400" height="34" fill="#04180f" opacity=".5"/><rect x="330" y="340" width="120" height="16" rx="8" fill="#04180f" opacity=".6"/>` + glass(780, 170, 220, 260) + `<rect x="810" y="200" width="160" height="30" rx="8" fill="#fff" opacity=".4"/><circle cx="890" cy="320" r="42" fill="none" stroke="#b6f35a" stroke-width="10"/><path d="M890 296v26l16 10" stroke="#b6f35a" stroke-width="8" fill="none" stroke-linecap="round"/>`,
  loans: glass(200, 130, 800, 370) + `<path d="M260 200 C 420 200, 480 330, 620 360 S 860 440, 940 450" stroke="url(#g)" stroke-width="12" fill="none" stroke-linecap="round"/>` + [0, 1, 2, 3, 4].map((i) => bar(280 + i * 150, 440 - (4 - i) * 55, 90, 20 + (4 - i) * 55, 0.4 + i * 0.12)).join(""),
  privacy: `<rect x="470" y="210" width="260" height="230" rx="40" fill="url(#g)"/><path d="M520 210v-50a80 80 0 01160 0v50" stroke="#fff" stroke-width="22" fill="none" stroke-linecap="round"/><circle cx="600" cy="320" r="28" fill="#04180f"/><rect x="590" y="330" width="20" height="60" rx="8" fill="#04180f"/>` + glass(170, 240, 200, 170) + glass(830, 240, 200, 170),
  split: [0, 1, 2].map((i) => `<circle cx="${420 + i * 180}" cy="260" r="64" fill="url(#g)" opacity="${1 - i * 0.2}"/>`).join("") + `<path d="M420 360 L 600 450 L 780 360" stroke="#b6f35a" stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="4 18"/>` + glass(470, 440, 260, 70),
  emergency: `<path d="M600 130 L840 220 V340 C840 450 740 510 600 550 C460 510 360 450 360 340 V220 Z" fill="url(#g)" opacity=".9"/><path d="M520 340 l60 60 110 -120" stroke="#04180f" stroke-width="28" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,
};
for (const [k, v] of Object.entries(art)) fs.writeFileSync(`${out}blog/${k}.svg`, frame(v));

const og = frame(
  `<text x="80" y="250" font-family="Helvetica, Arial, sans-serif" font-weight="800" font-size="96" fill="#fff">Valam</text><text x="80" y="330" font-family="Helvetica, Arial, sans-serif" font-weight="600" font-size="40" fill="#b6f35a">Private money, calmly managed</text><text x="80" y="400" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#bfe3d0">Your data stays on your phone.</text><text x="80" y="445" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#bfe3d0">AI coach Mathi, no ads, works offline.</text>` +
    `<path d="M700 520 C 800 500, 840 420, 920 430 S 1040 330, 1120 300" stroke="url(#g)" stroke-width="12" fill="none" stroke-linecap="round"/><circle cx="1120" cy="300" r="14" fill="#b6f35a"/>`,
);
fs.writeFileSync(out + "og-image.svg", og);
