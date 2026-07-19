import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { PodcastChannel } from "@/data/podcasts";
import { soonerPodcasts } from "@/data/podcasts";

interface PodcastChannelsProps {
  channels?: PodcastChannel[];
}

export function PodcastChannels({ channels = soonerPodcasts }: PodcastChannelsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {channels.map((channel) => (
        <a
          key={channel.id}
          href={channel.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex gap-4 rounded-2xl border border-crimson/12 bg-white/95 p-4 shadow-[0_4px_20px_rgba(26,10,10,0.06)] transition hover:border-crimson/35 hover:shadow-[0_8px_28px_rgba(132,22,23,0.1)] active:scale-[0.99]"
        >
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-crimson/12 bg-cream">
            <Image
              src={channel.thumbnail}
              alt=""
              fill
              unoptimized
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-display font-bold text-ink group-hover:text-crimson">
              {channel.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm text-ink/65">{channel.description}</p>
            <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-crimson">
              Watch on YouTube
              <ExternalLink className="h-3 w-3" aria-hidden />
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
