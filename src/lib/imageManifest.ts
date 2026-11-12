let imageManifest: Promise<Set<string>> | undefined;

export function getImageManifest(): Promise<Set<string>> {
  if (!imageManifest) {
    imageManifest = fetch("/api/image-manifest")
      .then((response) => {
        if (!response.ok) throw new Error(`Image manifest request failed: ${response.status}`);
        return response.json() as Promise<{ images: string[] }>;
      })
      .then(({ images }) => new Set(images))
      .catch((error: unknown) => {
        imageManifest = undefined;
        throw error;
      });
  }
  return imageManifest;
}
