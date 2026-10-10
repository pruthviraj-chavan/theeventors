const MEDIA_ORIGIN = "https://theeventors.lovable.app";

/** Resolve Lovable CDN paths independently of the active app host (for Vercel deployments). */
export function mediaAssetUrl(path: string): string {
  return new URL(path, MEDIA_ORIGIN).toString();
}