import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { ScheduleTabs } from "@/components/ScheduleTabs";

export const metadata: Metadata = {
  title: "Football Schedule",
  description:
    "Oklahoma Sooners 2026 upcoming schedule and 2025 results from soonersports.com.",
};

export default function SchedulePage() {
  return (
    <PageShell theme="schedule">
      <ScheduleTabs />
    </PageShell>
  );
}
