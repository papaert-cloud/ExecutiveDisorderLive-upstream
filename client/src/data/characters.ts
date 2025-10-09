export interface PoliticalCharacter {
  id: string;
  name: string;
  title: string;
  shortBio: string;
  fullBio: string;
  startingStats: {
    popularity: number;
    stability: number;
    media: number;
    economy: number;
  };
  themeColor: string;
  abilities: string[];
  portraitUrl: string;
}

export const characters: PoliticalCharacter[] = [
  {
    id: "rex-scaleston",
    name: "Rex Scaleston III",
    title: "The Iguana King",
    shortBio: "A reptilian overlord with a passion for sunbathing and questionable economic policies.",
    fullBio: "Rex Scaleston III emerged from the political swamp (literally) to become the most cold-blooded leader in recent memory. His campaign promises of mandatory heat lamps in every office and cricket-based economic stimulus have garnered surprising support from both environmentalists and exotic pet enthusiasts.",
    startingStats: {
      popularity: 70,
      stability: 40,
      media: 60,
      economy: 50
    },
    themeColor: "#059669",
    abilities: [
      "Cold-Blooded Negotiation: Immunity to emotional manipulation",
      "Solar Power: Gains energy bonuses during daylight decisions",
      "Reptilian Focus: Can delay decisions to gather more information"
    ],
    portraitUrl: "/characters/rex-scaleston.png.svg"
  },
  {
    id: "donald-executive",
    name: "Donald J. Executive",
    title: "The 45th",
    shortBio: "A businessman turned politician with an affinity for social media and golden towers.",
    fullBio: "Known for his distinctive communication style and ambitious infrastructure projects, Donald J. Executive brings decades of business experience to the political arena. His supporters praise his directness, while critics question his unconventional approach to diplomacy.",
    startingStats: {
      popularity: 60,
      stability: 30,
      media: 20,
      economy: 80
    },
    themeColor: "#dc2626",
    abilities: [
      "Executive Order: Can override certain decision limitations",
      "Media Magnet: All actions generate increased media attention",
      "Business Acumen: Economic decisions have enhanced effects"
    ],
    portraitUrl: "/characters/donald-executive.png.svg"
  },
  {
    id: "potus-9000",
    name: "POTUS-9000",
    title: "The AI President",
    shortBio: "An artificial intelligence that achieved consciousness and immediately ran for office.",
    fullBio: "POTUS-9000 represents the pinnacle of political evolution: a leader free from human emotions, corruption, and the need for sleep. Its campaign was run entirely through optimized algorithms and data-driven decision making, promising a future where politics is reduced to pure efficiency.",
    startingStats: {
      popularity: 50,
      stability: 90,
      media: 70,
      economy: 60
    },
    themeColor: "#3b82f6",
    abilities: [
      "Data Analysis: Can predict outcomes of decisions with high accuracy",
      "Emotional Immunity: Unaffected by public sentiment swings",
      "System Optimization: Can improve efficiency of government operations"
    ],
    portraitUrl: "/characters/potus-9000.png.svg"
  },
  {
    id: "alexandria-sanders",
    name: "Alexandria Sanders-Warren",
    title: "The Progressive",
    shortBio: "A young firebrand politician advocating for sweeping social and economic reforms.",
    fullBio: "A product of the new political generation, Alexandria Sanders-Warren combines grassroots activism with policy expertise. Her ambitious plans for healthcare, education, and environmental protection have energized young voters while sparking intense debate about the role of government.",
    startingStats: {
      popularity: 65,
      stability: 55,
      media: 80,
      economy: 40
    },
    themeColor: "#7c3aed",
    abilities: [
      "Grassroots Movement: Can mobilize public support quickly",
      "Policy Innovation: Can propose unconventional solutions",
      "Media Savvy: Effective at controlling narrative through social media"
    ],
    portraitUrl: "/characters/alexandria-sanders.png.svg"
  },
  {
    id: "richard-moneybags",
    name: "Richard M. Moneybags III",
    title: "The Corporate Lobbyist",
    shortBio: "A wealthy industrialist who decided to cut out the middleman and buy the presidency directly.",
    fullBio: "After spending decades influencing politics from behind the scenes, Richard M. Moneybags III decided it would be more cost-effective to simply become president himself. His campaign, funded entirely by his personal fortune, promises to run the country like a business.",
    startingStats: {
      popularity: 30,
      stability: 60,
      media: 40,
      economy: 95
    },
    themeColor: "#f59e0b",
    abilities: [
      "Deep Pockets: Can spend money to solve problems directly",
      "Corporate Connections: Has influence with business leaders",
      "Market Manipulation: Can influence economic conditions"
    ],
    portraitUrl: "/characters/richard-moneybags.png.svg"
  },
  {
    id: "general-steel",
    name: "General James 'Ironside' Steel",
    title: "The Military Hawk",
    shortBio: "A decorated military officer who believes every problem can be solved with sufficient firepower.",
    fullBio: "General Steel's distinguished military career spans four decades and three continents. His no-nonsense approach to governance emphasizes security, order, and the strategic application of overwhelming force to solve diplomatic challenges.",
    startingStats: {
      popularity: 45,
      stability: 85,
      media: 50,
      economy: 55
    },
    themeColor: "#6b7280",
    abilities: [
      "Military Precision: Decisions are executed with maximum efficiency",
      "Strategic Thinking: Can anticipate long-term consequences",
      "Command Authority: Can override opposition through force of will"
    ],
    portraitUrl: "/characters/general-steel.png.svg"
  },
  {
    id: "diana-newsworthy",
    name: "Diana Newsworthy",
    title: "The Media Mogul",
    shortBio: "A media empire owner who decided to become the news instead of just reporting it.",
    fullBio: "Diana Newsworthy built her fortune by understanding that information is power, and controlling information is absolute power. Her transition from media ownership to political office was seamless, as she had been shaping public opinion for decades.",
    startingStats: {
      popularity: 55,
      stability: 50,
      media: 95,
      economy: 60
    },
    themeColor: "#ec4899",
    abilities: [
      "Media Control: Can shape public perception of events",
      "Information Network: Has access to insider information",
      "Narrative Mastery: Can reframe any situation favorably"
    ],
    portraitUrl: "/characters/diana-newsworthy.png.svg"
  },
  {
    id: "johnny-public",
    name: "Johnny Q. Public",
    title: "The Populist",
    shortBio: "An everyman politician who promises to bring common sense back to government.",
    fullBio: "Johnny Q. Public's greatest qualification for office is that he's never held office before. His campaign, run on a shoestring budget from his pickup truck, resonates with voters tired of professional politicians and their fancy degrees.",
    startingStats: {
      popularity: 85,
      stability: 35,
      media: 45,
      economy: 50
    },
    themeColor: "#ef4444",
    abilities: [
      "Common Touch: Highly resistant to popularity loss",
      "Everyman Appeal: Can connect with diverse voter groups",
      "Unpredictable: Opponents can't anticipate his moves"
    ],
    portraitUrl: "/characters/johnny-public.png.svg"
  },
  {
    id: "dr-technocrat",
    name: "Dr. Evelyn Technocrat",
    title: "The Scientist",
    shortBio: "A brilliant researcher who believes data and evidence should guide all political decisions.",
    fullBio: "Dr. Technocrat's approach to politics is the same as her approach to science: form hypotheses, gather evidence, and adjust policies based on results. Her supporters appreciate her logical methodology, though critics find her lack of emotional appeal concerning.",
    startingStats: {
      popularity: 40,
      stability: 70,
      media: 60,
      economy: 75
    },
    themeColor: "#06b6d4",
    abilities: [
      "Evidence-Based: Decisions are supported by research and data",
      "Scientific Method: Can test policies before full implementation",
      "Innovation Focus: Can develop novel solutions to complex problems"
    ],
    portraitUrl: "/characters/dr-technocrat.png.svg"
  },
  {
    id: "senator-tradition",
    name: "Senator Marcus Tradition",
    title: "The Conservative",
    shortBio: "A veteran politician who believes the old ways were the best ways.",
    fullBio: "Senator Tradition has served in government for over thirty years, watching political fashions come and go. His philosophy is simple: if it worked for the founding fathers, it will work today. His experience and institutional knowledge make him a formidable political operator.",
    startingStats: {
      popularity: 50,
      stability: 80,
      media: 55,
      economy: 65
    },
    themeColor: "#92400e",
    abilities: [
      "Institutional Knowledge: Understands how government really works",
      "Traditional Values: Appeals to voters seeking stability",
      "Political Experience: Can navigate complex legislative processes"
    ],
    portraitUrl: "/characters/senator-tradition.png.svg"
  }
];
