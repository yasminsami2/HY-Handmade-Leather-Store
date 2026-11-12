import { readdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function findImages(directory: string, root: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return findImages(fullPath, root);
    if (!/\.(?:avif|jpe?g|png|webp)$/i.test(entry.name)) return [];
    return [`/images/${path.relative(root, fullPath).split(path.sep).join("/")}`];
  }));
  return nested.flat();
}

export async function GET() {
  const imageRoot = path.join(process.cwd(), "public", "images");
  const images = await findImages(imageRoot, imageRoot);
  return NextResponse.json({ images });
}
