// Builds the favicon set from the Mathi button (the app's floating action button): a green gradient disc with the white crescent and spark.
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const dir = fileURLToPath(new URL("../public/", import.meta.url));
const grad = `<linearGradient id="b" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#12b76a"/><stop offset=".5" stop-color="#16c172"/><stop offset="1" stop-color="#7be05a"/></linearGradient>`;
// Same crescent and spark as the app's MathiGlyph, turned 135 degrees about the centre.
const glyph = (s) => `<g transform="translate(50 50) scale(${s}) translate(-50 -50) rotate(135 50 50)"><mask id="m"><rect width="100" height="100" fill="#fff"/><circle cx="62" cy="40" r="22" fill="#000"/></mask><circle cx="47" cy="53" r="27" fill="#fff" mask="url(#m)"/><path d="M66 30L68 36L74 38L68 40L66 46L64 40L58 38L64 36Z" fill="#fff"/></g>`;
const disc = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs>${grad}</defs><circle cx="50" cy="50" r="50" fill="url(#b)"/>${glyph(0.62)}</svg>`;
const square = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs>${grad}</defs><rect width="100" height="100" fill="url(#b)"/>${glyph(0.6)}</svg>`;

fs.writeFileSync(dir + "favicon.svg", disc);
fs.writeFileSync(dir + "images/icon-square.svg", square);

const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const shot = (svg, out, size, transparent) => {
  // Chrome sizes a bare SVG by its own width and height, so render a copy at the target size.
  const tmp = `${dir}.tmp-${size}.svg`;
  fs.writeFileSync(tmp, fs.readFileSync(dir + svg, "utf8").replace("<svg ", `<svg width="${size}" height="${size}" `));
  execFileSync(chrome, ["--headless=new", "--disable-gpu", "--hide-scrollbars", ...(transparent ? ["--default-background-color=00000000"] : []), `--window-size=${size},${size}`, `--screenshot=${dir}${out}`, `file://${tmp}`], { stdio: "ignore" });
  fs.rmSync(tmp);
};
shot("favicon.svg", "favicon-32.png", 32, true);
shot("favicon.svg", "favicon-192.png", 192, true);
shot("images/icon-square.svg", "apple-touch-icon.png", 180, false);
shot("images/icon-square.svg", "icon-512.png", 512, false);
