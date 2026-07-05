import { PREMIUM_TIER_NAME } from "@/lib/premium";

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendLockerRoomMagicLinkEmail(
  to: string,
  magicUrl: string,
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.RESEND_FROM ?? "Boomer Ball <onboarding@resend.dev>";

  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[magic-link] Email not configured — link for testing:", magicUrl);
      return;
    }
    throw new Error("Email service is not configured");
  }

  const subject = `Your ${PREMIUM_TIER_NAME} sign-in link`;
  const text = [
    `Tap the link below to unlock ${PREMIUM_TIER_NAME} on Boomer Ball.`,
    "",
    magicUrl,
    "",
    "This link expires in 15 minutes and can be used once per send.",
    "If you didn't request this, you can ignore this email.",
  ].join("\n");

  const html = `
    <div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;color:#1a0a0a;">
      <p style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#841617;font-weight:700;">
        Boomer Ball
      </p>
      <h1 style="font-size:24px;color:#841617;margin:0 0 12px;">Your ${PREMIUM_TIER_NAME} link</h1>
      <p style="font-size:15px;line-height:1.6;color:#1a0a0a;">
        Tap below to unlock lifetime premium analytics on this browser. The link expires in 15 minutes.
      </p>
      <p style="margin:24px 0;">
        <a href="${magicUrl}" style="display:inline-block;background:#841617;color:#fdf9d8;padding:14px 24px;border-radius:999px;text-decoration:none;font-weight:700;">
          Open ${PREMIUM_TIER_NAME}
        </a>
      </p>
      <p style="font-size:12px;line-height:1.6;color:#666;">
        Or copy this URL:<br />
        <span style="word-break:break-all;">${magicUrl}</span>
      </p>
      <p style="font-size:11px;color:#888;margin-top:24px;">
        If you didn't request this email, you can safely ignore it.
      </p>
    </div>
  `.trim();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to: [to], subject, html, text }),
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(detail || "Failed to send email");
  }
}
