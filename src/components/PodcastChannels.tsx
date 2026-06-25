import Image from "next/image";
import { ExternalLink, Mic } from "lucide-react";
import type { PodcastChannel } from "@/data/podcasts";
import { soonerPodcasts } from "@/data/podcasts";

interface PodcastChannelsProps {
  channels?: PodcastChannel[];
}

export function PodcastChannels({ channels = soonerPodcasts }: PodcastChannelsProps) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Mic className="h-6 w-6 text-crimson" aria-hidden />
        <h2 className="font-display text-2xl font-bold text-crimson">
          Sooner Podcasts on YouTube
        </h2>
      </div>
      <p className="mb-6 text-base text-ink/65">
        OU-only shows with video episodes — subscribe for daily breakdowns, recruiting
        pods, and game-week talk.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {channels.map((channel) => (
          <a
            key={channel.id}
            href={channel.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex gap-4 rounded-xl border-2 border-crimson/15 bg-white/95 p-4 shadow-sm backdrop-blur-sm transition hover:border-crimson/35 hover:shadow-md"
          >
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-crimson/15 bg-cream">
              <Image
                src={channel.thumbnail}
                alt=""
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display text-lg font-bold text-ink group-hover:text-crimson">
                  {channel.name}
                </h3>
                <ExternalLink
                  className="mt-1 h-4 w-4 shrink-0 text-ink/35 group-hover:text-crimson"
                  aria-hidden
                />
              </div>
              <p className="mt-0.5 text-xs font-semibold uppercase tracking-wide text-crimson/70">
                {channel.hosts}
              </p>
              <p className="mt-2 line-clamp-2 text-sm leading-snug text-ink/70">
                {channel.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
