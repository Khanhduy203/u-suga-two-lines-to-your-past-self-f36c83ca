import * as fs from "node:fs";
import * as path from "node:path";

const ENTRY =
  "Don't take the old motorbike when Dad offers you the keys on the morning of 3 June 2019.\n" +
  "Its brakes fail at the market junction three weeks later, and the month in a cast costs you the scholarship interview you waited a year for.";

function main(): void {
  const lines = ENTRY.split("\n");
  if (lines.length !== 2) {
    throw new Error(`entry must be exactly 2 lines, got ${lines.length}`);
  }
  for (const line of lines) {
    if (line.trim().length === 0) {
      throw new Error("entry lines must not be empty");
    }
  }
  const charCount = [...ENTRY].length;
  if (charCount < 1 || charCount > 280) {
    throw new Error(`entry must be 1-280 chars, got ${charCount}`);
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "entry.txt");
  fs.writeFileSync(outPath, ENTRY, "utf8");
  console.log(`wrote ${outPath}: ${Buffer.byteLength(ENTRY, "utf8")} bytes, ${charCount} chars`);
}

main();
