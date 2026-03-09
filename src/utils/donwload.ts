/**
 * downloadImage
 * Fetches a cross-origin image as a blob and triggers a native browser
 * "Save file" prompt — bypassing the redirect behaviour of the HTML
 * `download` attribute on cross-origin URLs.
 */
export async function downloadImage(
  url: string,
  filename: string,
  onStart?: () => void,
  onDone?: () => void,
  onError?: (err: unknown) => void
): Promise<void> {
  try {
    onStart?.();

    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = filename;
    anchor.style.display = "none";

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    // Revoke after a short delay to allow the download to start
    setTimeout(() => URL.revokeObjectURL(objectUrl), 10_000);

    onDone?.();
  } catch (err) {
    onError?.(err);
  }
}