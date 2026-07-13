export interface PodcastChannel {
  id: string;
  name: string;
  description: string;
  youtubeUrl: string;
  thumbnail: string;
  hosts: string;
}

/** Oklahoma Sooners–only YouTube podcast channels */
export const soonerPodcasts: PodcastChannel[] = [
  {
    id: "locked-on-sooners",
    name: "Locked On Sooners",
    description:
      "Daily Sooners football and basketball coverage — news, analysis, and insider talk from the Locked On Podcast Network.",
    youtubeUrl: "https://www.youtube.com/c/LockedOnSooners",
    thumbnail: "/podcasts/locked-on-sooners.jpg",
    hosts: "John Williams & Jay Smith",
  },
  {
    id: "sooners-illustrated",
    name: "Sooners Illustrated",
    description:
      "247Sports affiliate with recruiting breakdowns, practice reports, and game-week pods from reporters on the OU beat.",
    youtubeUrl: "https://www.youtube.com/@SoonersIllustrated",
    thumbnail: "/podcasts/sooners-illustrated.jpg",
    hosts: "Josh Callaway, Collin Kennedy & Tom Green",
  },
  {
    id: "ok-breakdown",
    name: "The Oklahoma Breakdown",
    description:
      "Former Sooner standouts Gabe Ikard and Teddy Lehman on OU football, recruiting, the SEC, and Oklahoma sports.",
    youtubeUrl: "https://www.youtube.com/@OK_Breakdown",
    thumbnail: "/podcasts/ok-breakdown.jpg",
    hosts: "Gabe Ikard & Teddy Lehman",
  },
  {
    id: "ou-insider",
    name: "OU Insider",
    description:
      "Rivals/On3 video pods with portal updates, recruiting intel, and practice buzz straight out of Norman.",
    youtubeUrl: "https://www.youtube.com/@OUInsider",
    thumbnail: "/podcasts/ou-insider.jpg",
    hosts: "OU Insider staff",
  },
  {
    id: "sooner-scoop",
    name: "SoonerScoop",
    description:
      "SoonerScoop.com video shows covering OU football recruiting, roster moves, and game-week previews.",
    youtubeUrl: "https://www.youtube.com/@SoonerScoop",
    thumbnail: "/podcasts/sooner-scoop.jpg",
    hosts: "SoonerScoop team",
  },
  {
    id: "sooner-surge",
    name: "Sooner Surge",
    description:
      "OU sports talk covering Sooners football, softball, and recruiting from an aspiring sports-journalism crew.",
    youtubeUrl: "https://www.youtube.com/@SoonerSurge",
    thumbnail: "/podcasts/sooner-surge.jpg",
    hosts: "Brody, Hunter, Jaxon, Jason, Jeremy & Traber",
  },
];
