import { redirect } from "next/navigation";
import { PREMIUM_ROUTE } from "@/lib/premium";

/** Legacy URL — permanent redirect to The Locker Room */
export default function AdvancedRedirectPage() {
  redirect(PREMIUM_ROUTE);
}
