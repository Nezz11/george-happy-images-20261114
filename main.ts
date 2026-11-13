// SPDX-License-Identifier: MIT
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const artwork = new URL("./image.jpg", import.meta.url);
const outputDirectory = process.env.MAKEFUN_OUTPUT_DIR || "/output";

const image = readFileSync(artwork);
const startsWithJpeg = image[0] === 0xff && image[1] === 0xd8;
const endsWithJpeg = image.at(-2) === 0xff && image.at(-1) === 0xd9;
if (!startsWithJpeg || !endsWithJpeg || image.length > 1_048_576) {
  throw new Error("image.jpg must be a complete JPEG of at most 1 MiB");
}

mkdirSync(outputDirectory, { recursive: true });
writeFileSync(join(outputDirectory, "entry.png"), image);
