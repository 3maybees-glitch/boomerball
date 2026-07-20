/** Public VAPID key — safe to ship in the client bundle. */
export const DEFAULT_VAPID_PUBLIC_KEY =
  "BHbYgvSn86ramhRKqGzT2PpFtv9AOF7BlTWRgcsIMpV4te_L6pXpQxaDKLVv9CqKdDGERYKQRbiGlG9D6kS-M_o";

export function getVapidPublicKey(): string {
  return (
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY?.trim() || DEFAULT_VAPID_PUBLIC_KEY
  );
}
