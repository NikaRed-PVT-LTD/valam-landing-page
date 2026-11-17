// Renders the blog cover images: brand background, a key figure from the article and the matching
// real app screen in a phone frame. Writes 1200x630 JPEG (for social cards) and WebP (for the page).
// Needs Google Chrome, cwebp (brew install webp) and macOS sips. Run when a post or screenshot changes:
//   node scripts/make-covers.mjs            all covers
//   node scripts/make-covers.mjs tax chit   only these
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = path.join(root, "public");
const out = path.join(pub, "images/blog");
const chrome = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const file = (p) => pathToFileURL(path.join(pub, p)).href;

// One entry per cover: the category shown, the key figure and the app screen that goes with it.
const covers = {
  budget: { tag: "Budgeting", label: "Left for each day", value: "₹530", sub: "₹16,000 for the rest of the month", chips: ["Needs", "Wants", "Savings"], screen: "plan" },
  cards: { tag: "Credit cards", label: "Card bill due", value: "₹75,659", sub: "Pay in full by the due date, pay no interest", chips: ["Statement", "Due date", "Minimum due"], screen: "m-bills" },
  loans: { tag: "Loans", label: "Debt free by", value: "2036", sub: "Instead of 2044, by rolling each finished EMI into the next", chips: ["EMI", "Prepayment", "Interest saved"], screen: "m-loans" },
  privacy: { tag: "Privacy", label: "Your money data lives on", value: "This phone", sub: "Encrypted, offline first, no ads, no tracking", chips: ["Encrypted", "Offline", "No ads"], screen: "home" },
  split: { tag: "Shared money", label: "Owed to you", value: "₹1.1L", sub: "Every settlement confirmed by the person receiving it", chips: ["Lend", "Split", "Settle up"], screen: "wealth" },
  emergency: { tag: "Saving", label: "Emergency fund", value: "5.7 months", sub: "of essential costs covered by cash", chips: ["3 months", "6 months", "Peace of mind"], screen: "coach" },
  tax: { tag: "Tax", label: "Income tax", value: "Old vs New", sub: "Your own deductions decide which regime costs less", chips: ["80C", "80D", "ITR form"], screen: "plan" },
  chit: { tag: "Saving", label: "Chit contribution", value: "₹5,000 × 20", sub: "Early prize works like a loan, late prize like a deposit", chips: ["Auction", "Dividend", "Real return"], screen: "m-bills" },
  payoff: { tag: "Loans", label: "Debt free", value: "8 years sooner", sub: "Avalanche: extra money goes to the highest rate first", chips: ["Avalanche", "Snowball"], screen: "m-loans" },
  upi: { tag: "Budgeting", label: "Spent in November", value: "₹1,58,120", sub: "49 transactions this month, sorted into categories", chips: ["Bank SMS", "Categories", "Weekly review"], screen: "activity" },
  "safe-to-spend": { tag: "Budgeting", label: "Safe to spend today", value: "₹224", sub: "After bills, EMIs, card dues and savings", chips: ["Bills", "EMIs", "Savings"], screen: "m-safe" },
  subscriptions: { tag: "Saving", label: "₹199 a month is", value: "₹2,388 a year", sub: "Find every subscription and keep only what you use", chips: ["Keep", "Downgrade", "Cancel"], screen: "m-bills" },
  impulse: { tag: "Habits", label: "Before you buy", value: "Wait 24 hours", sub: "Most urges pass. What you still want is worth buying", chips: ["Wishlist", "Can I afford it?"], screen: "coach" },
  roadmap: { tag: "Planning", label: "Your roadmap", value: "Level 2 of 6", sub: "Foundation to independence, one step at a time", chips: ["Stability", "Security", "Growth"], screen: "plan" },
};

const html = (c) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: J; src: url("${file("fonts/PlusJakartaSans-Variable.ttf")}"); font-weight: 200 800; }
* { box-sizing: border-box; margin: 0; }
body { width: 1200px; height: 630px; overflow: hidden; font-family: J, sans-serif; color: #fff;
  background: radial-gradient(circle at 88% 8%, rgba(22,193,114,.35), transparent 42%), radial-gradient(circle at 6% 100%, rgba(182,243,90,.16), transparent 40%), linear-gradient(135deg, #04180f, #0a4a32 60%, #0e6b47); }
.grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px); background-size: 48px 48px; }
.left { position: absolute; left: 88px; top: 0; bottom: 0; width: 620px; display: flex; flex-direction: column; justify-content: center; gap: 26px; }
.brand { display: flex; align-items: center; gap: 12px; font-weight: 800; font-size: 26px; }
.brand img { width: 44px; height: 44px; border-radius: 12px; }
.tag { margin-left: 10px; padding: 6px 14px; border-radius: 999px; font-size: 16px; font-weight: 700; color: #04180f; background: #b6f35a; }
.card { padding: 30px 34px; border-radius: 28px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.22); box-shadow: 0 30px 60px -30px rgba(0,0,0,.6); }
.label { font-size: 22px; font-weight: 600; color: #bfe3d0; }
.value { font-size: ${c.value.length > 9 ? 70 : 86}px; line-height: 1.05; font-weight: 800; letter-spacing: -.02em; margin: 8px 0 12px; background: linear-gradient(90deg, #16c172, #b6f35a); -webkit-background-clip: text; color: transparent; }
.sub { font-size: 21px; line-height: 1.4; color: #e2f6ea; }
.chips { display: flex; gap: 10px; flex-wrap: wrap; }
.chips span { padding: 8px 16px; border-radius: 999px; font-size: 17px; font-weight: 600; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2); }
.phone { position: absolute; right: 96px; top: 56px; width: 306px; height: 664px; padding: 10px; border-radius: 52px; background: #0b1f17; border: 2px solid rgba(255,255,255,.18); box-shadow: 0 40px 80px -20px rgba(0,0,0,.7), 0 0 0 10px rgba(22,193,114,.08); transform: rotate(3deg); }
.phone img { width: 100%; height: 100%; object-fit: cover; object-position: top; border-radius: 42px; display: block; }
</style></head><body><div class="grid"></div>
<div class="left">
  <div class="brand"><img src="${file("images/logo.png")}" alt="">Valam<span class="tag">${c.tag}</span></div>
  <div class="card"><div class="label">${c.label}</div><div class="value">${c.value}</div><div class="sub">${c.sub}</div></div>
  <div class="chips">${c.chips.map((x) => `<span>${x}</span>`).join("")}</div>
</div>
<div class="phone"><img src="${file(`images/screens/${c.screen}.jpg`)}" alt=""></div>
</body></html>`;

const only = process.argv.slice(2);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "valam-covers-"));
for (const [name, c] of Object.entries(covers)) {
  if (only.length && !only.includes(name)) continue;
  const page = path.join(tmp, `${name}.html`);
  fs.writeFileSync(page, html(c));
  const png = path.join(tmp, `${name}.png`);
  execFileSync(chrome, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files", "--force-device-scale-factor=1", "--window-size=1200,630", "--virtual-time-budget=2000", `--screenshot=${png}`, pathToFileURL(page).href], { stdio: "ignore" });
  execFileSync("cwebp", ["-quiet", "-q", "82", png, "-o", path.join(out, `${name}.webp`)]);
  execFileSync("sips", ["-s", "format", "jpeg", "-s", "formatOptions", "84", png, "--out", path.join(out, `${name}.jpg`)], { stdio: "ignore" });
  console.log("cover", name);
}
fs.rmSync(tmp, { recursive: true, force: true });
