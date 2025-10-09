export interface DecisionCard {
  id: string;
  title: string;
  description: string;
  category: 'domestic' | 'foreign' | 'economic' | 'social' | 'crisis';
  options: {
    text: string;
    effects: {
      popularity: number;
      stability: number;
      media: number;
      economy: number;
    };
  }[];
}

export const decisionCards: DecisionCard[] = [
  {
    id: "budget-crisis",
    title: "Budget Crisis",
    description: "The national budget is facing a massive deficit. Congress is demanding immediate action to address the shortfall before the government shuts down.",
    category: "economic",
    options: [
      {
        text: "Cut social programs to balance the budget",
        effects: { popularity: -15, stability: 5, media: -5, economy: 10 }
      },
      {
        text: "Raise taxes on wealthy individuals and corporations",
        effects: { popularity: 5, stability: -5, media: 10, economy: -5 }
      },
      {
        text: "Increase government borrowing and deficit spending",
        effects: { popularity: 10, stability: -10, media: -10, economy: 5 }
      }
    ]
  },
  {
    id: "healthcare-reform",
    title: "Healthcare Reform Proposal",
    description: "A major healthcare reform bill is before Congress. It promises universal coverage but faces fierce opposition from insurance companies.",
    category: "domestic",
    options: [
      {
        text: "Push for universal healthcare despite opposition",
        effects: { popularity: 10, stability: -10, media: 5, economy: -10 }
      },
      {
        text: "Negotiate a compromise with insurance companies",
        effects: { popularity: -5, stability: 5, media: -5, economy: 5 }
      },
      {
        text: "Abandon the reform to avoid political battle",
        effects: { popularity: -15, stability: 10, media: -10, economy: 0 }
      }
    ]
  },
  {
    id: "trade-war",
    title: "International Trade Dispute",
    description: "A major trading partner has imposed tariffs on our exports. Your economic advisors are split on how to respond to this escalating trade war.",
    category: "foreign",
    options: [
      {
        text: "Impose retaliatory tariffs immediately",
        effects: { popularity: 5, stability: -5, media: 0, economy: -10 }
      },
      {
        text: "Seek diplomatic resolution through negotiations",
        effects: { popularity: -5, stability: 5, media: 10, economy: 0 }
      },
      {
        text: "Ignore the tariffs and maintain free trade principles",
        effects: { popularity: -10, stability: 0, media: -5, economy: 5 }
      }
    ]
  },
  {
    id: "climate-action",
    title: "Climate Change Legislation",
    description: "Environmental groups are demanding immediate action on climate change, while industrial lobbyists warn of economic consequences.",
    category: "social",
    options: [
      {
        text: "Implement aggressive carbon reduction targets",
        effects: { popularity: 0, stability: -5, media: 15, economy: -15 }
      },
      {
        text: "Focus on gradual, market-based solutions",
        effects: { popularity: 5, stability: 5, media: 0, economy: -5 }
      },
      {
        text: "Prioritize economic growth over environmental concerns",
        effects: { popularity: -10, stability: 0, media: -15, economy: 15 }
      }
    ]
  },
  {
    id: "social-media-regulation",
    title: "Social Media Regulation",
    description: "Major social media platforms are facing calls for increased regulation following privacy scandals and concerns about misinformation.",
    category: "domestic",
    options: [
      {
        text: "Implement strict regulation and oversight",
        effects: { popularity: 5, stability: 10, media: -10, economy: -5 }
      },
      {
        text: "Allow platforms to self-regulate with minimal oversight",
        effects: { popularity: -5, stability: -10, media: 15, economy: 10 }
      },
      {
        text: "Create a new government agency to monitor content",
        effects: { popularity: -10, stability: 0, media: -5, economy: -10 }
      }
    ]
  },
  {
    id: "infrastructure-investment",
    title: "Infrastructure Investment Package",
    description: "The nation's roads, bridges, and broadband networks need major upgrades. A massive infrastructure bill is being debated in Congress.",
    category: "economic",
    options: [
      {
        text: "Support the full infrastructure package",
        effects: { popularity: 10, stability: 5, media: 5, economy: -5 }
      },
      {
        text: "Negotiate a smaller, targeted package",
        effects: { popularity: 0, stability: 5, media: 0, economy: 0 }
      },
      {
        text: "Oppose increased government spending",
        effects: { popularity: -5, stability: -5, media: -5, economy: 5 }
      }
    ]
  },
  {
    id: "immigration-policy",
    title: "Immigration Reform",
    description: "Immigration has become a hot-button issue with security concerns on one side and humanitarian appeals on the other.",
    category: "social",
    options: [
      {
        text: "Increase border security and restrict immigration",
        effects: { popularity: 0, stability: 10, media: -10, economy: -5 }
      },
      {
        text: "Create a path to citizenship for undocumented immigrants",
        effects: { popularity: 5, stability: -10, media: 10, economy: 5 }
      },
      {
        text: "Maintain current immigration policies",
        effects: { popularity: -5, stability: 0, media: -5, economy: 0 }
      }
    ]
  },
  {
    id: "military-intervention",
    title: "International Crisis",
    description: "A humanitarian crisis in a foreign nation has escalated. The international community is calling for intervention, but public support is mixed.",
    category: "foreign",
    options: [
      {
        text: "Deploy military forces for humanitarian intervention",
        effects: { popularity: -10, stability: -10, media: 0, economy: -10 }
      },
      {
        text: "Provide humanitarian aid without military involvement",
        effects: { popularity: 5, stability: 5, media: 10, economy: -5 }
      },
      {
        text: "Stay out of foreign conflicts entirely",
        effects: { popularity: 0, stability: 0, media: -10, economy: 5 }
      }
    ]
  },
  {
    id: "education-funding",
    title: "Education Budget Crisis",
    description: "Schools across the nation are facing budget cuts. Teachers are threatening strikes while taxpayers resist increased spending.",
    category: "domestic",
    options: [
      {
        text: "Increase federal education funding significantly",
        effects: { popularity: 10, stability: -5, media: 5, economy: -10 }
      },
      {
        text: "Shift funding from other programs to education",
        effects: { popularity: 0, stability: -5, media: 0, economy: 0 }
      },
      {
        text: "Encourage private and local funding solutions",
        effects: { popularity: -5, stability: 5, media: -5, economy: 5 }
      }
    ]
  },
  {
    id: "tech-monopoly",
    title: "Tech Giant Monopoly Concerns",
    description: "Major technology companies are facing antitrust scrutiny. Critics say they're too powerful, while supporters argue they drive innovation.",
    category: "economic",
    options: [
      {
        text: "Break up major tech companies through antitrust action",
        effects: { popularity: 5, stability: -10, media: 0, economy: -15 }
      },
      {
        text: "Impose regulations without breaking up companies",
        effects: { popularity: 0, stability: 0, media: 5, economy: -5 }
      },
      {
        text: "Allow market forces to regulate the industry",
        effects: { popularity: -10, stability: 5, media: -10, economy: 10 }
      }
    ]
  },
  {
    id: "pandemic-response",
    title: "Health Emergency Response",
    description: "A new health threat is spreading rapidly. Health experts recommend lockdowns while economists warn of devastating impacts.",
    category: "crisis",
    options: [
      {
        text: "Implement immediate nationwide lockdowns",
        effects: { popularity: -5, stability: 10, media: 0, economy: -20 }
      },
      {
        text: "Use targeted restrictions in affected areas only",
        effects: { popularity: 0, stability: 0, media: 5, economy: -10 }
      },
      {
        text: "Rely on voluntary compliance and personal responsibility",
        effects: { popularity: -10, stability: -15, media: -10, economy: 5 }
      }
    ]
  },
  {
    id: "energy-independence",
    title: "Energy Independence Initiative",
    description: "Rising energy costs and supply chain concerns have renewed calls for energy independence through domestic production.",
    category: "economic",
    options: [
      {
        text: "Invest heavily in renewable energy infrastructure",
        effects: { popularity: 5, stability: 0, media: 10, economy: -5 }
      },
      {
        text: "Expand domestic oil and gas production",
        effects: { popularity: 0, stability: 5, media: -10, economy: 10 }
      },
      {
        text: "Pursue a mixed energy strategy",
        effects: { popularity: 0, stability: 5, media: 0, economy: 0 }
      }
    ]
  },
  {
    id: "space-program",
    title: "National Space Program Expansion",
    description: "Scientists are pushing for increased space exploration funding while critics argue the money should be spent on earthly problems.",
    category: "domestic",
    options: [
      {
        text: "Dramatically increase space program funding",
        effects: { popularity: -5, stability: 0, media: 10, economy: -10 }
      },
      {
        text: "Partner with private companies for space exploration",
        effects: { popularity: 5, stability: 0, media: 5, economy: 5 }
      },
      {
        text: "Maintain current modest space funding levels",
        effects: { popularity: 0, stability: 5, media: -5, economy: 0 }
      }
    ]
  },
  {
    id: "housing-crisis",
    title: "Affordable Housing Crisis",
    description: "Housing costs are skyrocketing in major cities. Residents are demanding action while developers resist new regulations.",
    category: "social",
    options: [
      {
        text: "Implement strict rent control and zoning requirements",
        effects: { popularity: 10, stability: -5, media: 5, economy: -10 }
      },
      {
        text: "Provide tax incentives for affordable housing development",
        effects: { popularity: 5, stability: 5, media: 0, economy: -5 }
      },
      {
        text: "Let market forces determine housing prices",
        effects: { popularity: -15, stability: 0, media: -10, economy: 10 }
      }
    ]
  },
  {
    id: "cyber-security",
    title: "National Cybersecurity Threat",
    description: "Critical infrastructure has been targeted by cyberattacks. Intelligence agencies are recommending increased cybersecurity measures.",
    category: "crisis",
    options: [
      {
        text: "Launch cyber counter-attacks against hostile nations",
        effects: { popularity: 5, stability: -10, media: -5, economy: 0 }
      },
      {
        text: "Increase cybersecurity funding and cooperation with allies",
        effects: { popularity: 0, stability: 10, media: 5, economy: -5 }
      },
      {
        text: "Focus on domestic cybersecurity improvements only",
        effects: { popularity: -5, stability: 5, media: 0, economy: 0 }
      }
    ]
  },
  {
    id: "artificial-intelligence",
    title: "AI Regulation Framework",
    description: "Artificial intelligence is rapidly advancing. Tech leaders want minimal regulation while ethicists warn of potential dangers.",
    category: "social",
    options: [
      {
        text: "Create comprehensive AI oversight and safety regulations",
        effects: { popularity: 0, stability: 10, media: 5, economy: -10 }
      },
      {
        text: "Establish basic ethical guidelines for AI development",
        effects: { popularity: 5, stability: 5, media: 5, economy: -5 }
      },
      {
        text: "Allow AI development to proceed without government interference",
        effects: { popularity: -5, stability: -10, media: -10, economy: 15 }
      }
    ]
  },
  {
    id: "drug-policy",
    title: "Drug Policy Reform",
    description: "The war on drugs is being questioned as addiction rates rise. Some states are legalizing drugs while others increase enforcement.",
    category: "social",
    options: [
      {
        text: "Decriminalize drugs and focus on treatment",
        effects: { popularity: 0, stability: -5, media: 5, economy: -5 }
      },
      {
        text: "Maintain current drug enforcement policies",
        effects: { popularity: -5, stability: 0, media: -5, economy: -5 }
      },
      {
        text: "Increase penalties and enforcement for drug crimes",
        effects: { popularity: -5, stability: 5, media: -10, economy: -10 }
      }
    ]
  },
  {
    id: "electoral-reform",
    title: "Electoral System Reform",
    description: "Critics are calling for changes to the electoral system, including campaign finance reform and voting access improvements.",
    category: "domestic",
    options: [
      {
        text: "Implement comprehensive electoral and campaign finance reforms",
        effects: { popularity: 5, stability: -5, media: 10, economy: 0 }
      },
      {
        text: "Make minor adjustments to current electoral procedures",
        effects: { popularity: 0, stability: 0, media: 0, economy: 0 }
      },
      {
        text: "Oppose changes to the current electoral system",
        effects: { popularity: -10, stability: 5, media: -10, economy: 0 }
      }
    ]
  },
  {
    id: "privacy-rights",
    title: "Digital Privacy Rights",
    description: "Citizens are demanding stronger privacy protections online while law enforcement wants access to digital communications for security.",
    category: "social",
    options: [
      {
        text: "Strengthen digital privacy protections significantly",
        effects: { popularity: 10, stability: -5, media: 10, economy: -5 }
      },
      {
        text: "Balance privacy rights with security needs",
        effects: { popularity: 0, stability: 5, media: 0, economy: 0 }
      },
      {
        text: "Prioritize security access over privacy concerns",
        effects: { popularity: -10, stability: 10, media: -15, economy: 0 }
      }
    ]
  },
  {
    id: "gig-economy",
    title: "Gig Economy Labor Rights",
    description: "App-based workers are demanding employee benefits while companies argue it would destroy the gig economy business model.",
    category: "economic",
    options: [
      {
        text: "Require gig companies to provide full employee benefits",
        effects: { popularity: 10, stability: 0, media: 5, economy: -10 }
      },
      {
        text: "Create a new category of worker rights for gig workers",
        effects: { popularity: 5, stability: 5, media: 5, economy: -5 }
      },
      {
        text: "Maintain current independent contractor classifications",
        effects: { popularity: -10, stability: 0, media: -10, economy: 10 }
      }
    ]
  }
];
