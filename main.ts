import * as fs from "node:fs";
import * as path from "node:path";

const ENTRY =
  "Don't take the old motorbike when Dad offers you the keys on the morning of 3 June 2019.\n" +
  "Its brakes fail at the market junction three weeks later, and the month in a cast costs you the scholarship interview you waited a year for.";

function main(): void {
  // Reject a trailing newline / trailing blank line: the entry must end
  // with content, not a line break, so the written file is exactly 2 lines.
  if (ENTRY.endsWith("\n")) {
    throw new Error("entry must not end with a trailing newline");
  }
  const lines = ENTRY.split("\n");
  if (lines.length !== 2) {
    throw new Error(`entry must be exactly 2 lines, got ${lines.length}`);
  }
  for (const line of lines) {
    if (line.trim().length === 0) {
      throw new Error("entry lines must not be empty or whitespace-only");
    }
    if (line !== line.trim()) {
      throw new Error("entry lines must not have leading or trailing whitespace");
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
  // Round-trip check: what landed on disk must be byte-identical to ENTRY.
  const written = fs.readFileSync(outPath, "utf8");
  if (written !== ENTRY) {
    throw new Error("round-trip check failed: written entry.txt differs from ENTRY");
  }
  console.log(`wrote ${outPath}: ${Buffer.byteLength(ENTRY, "utf8")} bytes, ${charCount} chars`);
}

main();
