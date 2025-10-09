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
    title: "The Treasury Called - We're Broke (Again)",
    description: "Your financial advisor just revealed that the national budget was accidentally spent on a giant statue of yourself. Congress is furious, tourists are confused, and economists are having a collective aneurysm.",
    category: "economic",
    options: [
      {
        text: "Sell the statue as 'modern art' and blame the previous administration",
        effects: { popularity: -15, stability: 5, media: -5, economy: 10 }
      },
      {
        text: "Start a GoFundMe titled 'Help Your President Not Go Bankrupt'",
        effects: { popularity: 5, stability: -5, media: 10, economy: -5 }
      },
      {
        text: "Print more money and pretend inflation is just a 'vibe'",
        effects: { popularity: 10, stability: -10, media: -10, economy: 5 }
      }
    ]
  },
  {
    id: "healthcare-reform",
    title: "Healthcare or Health-DON'T-Care?",
    description: "Your health secretary suggests replacing the entire healthcare system with essential oils and positive thinking. WebMD is now the official government medical advisor. The AMA is screaming into the void.",
    category: "domestic",
    options: [
      {
        text: "Mandate that all doctors must also be life coaches",
        effects: { popularity: 10, stability: -10, media: 5, economy: -10 }
      },
      {
        text: "Replace hospitals with wellness spas and call it 'innovation'",
        effects: { popularity: -5, stability: 5, media: -5, economy: 5 }
      },
      {
        text: "Declare sickness 'illegal' and watch the problem solve itself",
        effects: { popularity: -15, stability: 10, media: -10, economy: 0 }
      }
    ]
  },
  {
    id: "trade-war",
    title: "International Beef (Literally)",
    description: "A foreign leader challenged you to a hot dog eating contest to settle a trade dispute. Your dignity is on the line, but so are billions in exports. CNN is already setting up cameras.",
    category: "foreign",
    options: [
      {
        text: "Accept the challenge and hire Joey Chestnut as your body double",
        effects: { popularity: 5, stability: -5, media: 0, economy: -10 }
      },
      {
        text: "Propose thumb wrestling instead because you 'have really strong thumbs'",
        effects: { popularity: -5, stability: 5, media: 10, economy: 0 }
      },
      {
        text: "Claim hot dogs are against your religion (starting today)",
        effects: { popularity: -10, stability: 0, media: -5, economy: 5 }
      }
    ]
  },
  {
    id: "climate-action",
    title: "The Weather is SO Last Season",
    description: "Scientists say the planet is literally on fire. Your solution? Rename 'global warming' to 'planetary glow-up' and sell beachfront property in Antarctica. Mother Nature has left several angry voicemails.",
    category: "social",
    options: [
      {
        text: "Mandatory sunscreen for the entire country (SPF 1000)",
        effects: { popularity: 0, stability: -5, media: 15, economy: -15 }
      },
      {
        text: "Ban thermometers so temperatures can't be 'officially' measured",
        effects: { popularity: 5, stability: 5, media: 0, economy: -5 }
      },
      {
        text: "Blast AC units into the sky and invoice the atmosphere",
        effects: { popularity: -10, stability: 0, media: -15, economy: 15 }
      }
    ]
  },
  {
    id: "social-media-regulation",
    title: "Twitter Meltdown (Not The App, You)",
    description: "You accidentally liked a conspiracy theory about birds being government drones at 3 AM. It has 50 million views. Your press secretary is fake-crying in the bathroom. The bird lobby is assembling.",
    category: "domestic",
    options: [
      {
        text: "Double down: Ban all birds and replace them with robot pigeons",
        effects: { popularity: 5, stability: 10, media: -10, economy: -5 }
      },
      {
        text: "Claim your account was hacked by a 'very sophisticated hamster'",
        effects: { popularity: -5, stability: -10, media: 15, economy: 10 }
      },
      {
        text: "Delete the internet and bring back carrier pigeons (the real ones)",
        effects: { popularity: -10, stability: 0, media: -5, economy: -10 }
      }
    ]
  },
  {
    id: "infrastructure-investment",
    title: "Infrastructure? More Like Infra-STRUC-DURRR",
    description: "All the nation's bridges are held together with duct tape and prayer. Your infrastructure czar suggests replacing them with trampolines. Engineers are weeping. TikTokers are excited.",
    category: "economic",
    options: [
      {
        text: "Build bridges made entirely of LEDs so they look cool at night",
        effects: { popularity: 10, stability: 5, media: 5, economy: -5 }
      },
      {
        text: "Replace all roads with Slip 'N Slides for 'efficiency'",
        effects: { popularity: 0, stability: 5, media: 0, economy: 0 }
      },
      {
        text: "Just paint the potholes gold and call it 'luxury infrastructure'",
        effects: { popularity: -5, stability: -5, media: -5, economy: 5 }
      }
    ]
  },
  {
    id: "immigration-policy",
    title: "Border Wall (Made of Thoughts and Prayers)",
    description: "Your immigration advisor suggests building a wall so tall that birds need visas. Engineers say it's 'physically impossible.' You say 'that's quitter talk' and start a Kickstarter.",
    category: "social",
    options: [
      {
        text: "Build the wall out of recycled campaign promises",
        effects: { popularity: 0, stability: 10, media: -10, economy: -5 }
      },
      {
        text: "Replace border security with a very stern-looking scarecrow",
        effects: { popularity: 5, stability: -10, media: 10, economy: 5 }
      },
      {
        text: "Make everyone speak in accents so no one can tell who's from where",
        effects: { popularity: -5, stability: 0, media: -5, economy: 0 }
      }
    ]
  },
  {
    id: "military-intervention",
    title: "World War...Memes?",
    description: "Two countries are fighting over who invented the sandwich. It's getting serious - one side brought tanks, the other brought lawyers. The UN is just confused. You must intervene before lunch time ends.",
    category: "foreign",
    options: [
      {
        text: "Send in troops armed with extremely detailed sandwich history books",
        effects: { popularity: -10, stability: -10, media: 0, economy: -10 }
      },
      {
        text: "Organize an international sandwich-making competition to settle it",
        effects: { popularity: 5, stability: 5, media: 10, economy: -5 }
      },
      {
        text: "Claim America invented sandwiches and watch the chaos unfold",
        effects: { popularity: 0, stability: 0, media: -10, economy: 5 }
      }
    ]
  },
  {
    id: "education-funding",
    title: "Schools? We Have YouTube!",
    description: "Your education secretary proposes replacing all teachers with motivational speakers and TikTok influencers. The curriculum is now 50% hustle culture, 50% dance challenges. Pythagoras is rolling in his grave.",
    category: "domestic",
    options: [
      {
        text: "Make every class a 'masterclass' taught by celebrities who peaked in 2003",
        effects: { popularity: 10, stability: -5, media: 5, economy: -10 }
      },
      {
        text: "Replace textbooks with inspirational quote posters and vibes",
        effects: { popularity: 0, stability: -5, media: 0, economy: 0 }
      },
      {
        text: "Abolish homework because 'kids need to focus on their personal brand'",
        effects: { popularity: -5, stability: 5, media: -5, economy: 5 }
      }
    ]
  },
  {
    id: "tech-monopoly",
    title: "Big Tech or BIG THREAT?",
    description: "Tech CEOs have become so powerful they're starting their own countries. One just bought Tuesday. Another is selling the moon as NFTs. Your antitrust lawyer quit and joined their side.",
    category: "economic",
    options: [
      {
        text: "Break them up, but they just merge back together like the T-1000",
        effects: { popularity: 5, stability: -10, media: 0, economy: -15 }
      },
      {
        text: "Tax them, but they claim they're 'technically in space' now",
        effects: { popularity: 0, stability: 0, media: 5, economy: -5 }
      },
      {
        text: "Join them and become a tech bro president (hoodie required)",
        effects: { popularity: -10, stability: 5, media: -10, economy: 10 }
      }
    ]
  },
  {
    id: "pandemic-response",
    title: "The Sniffles That Broke America",
    description: "A mysterious illness is spreading: people keep laughing uncontrollably at your speeches. Medical experts are baffled. Your chief of staff suggests it might just be 'really good comedy.'",
    category: "crisis",
    options: [
      {
        text: "Quarantine everyone who doesn't think you're funny",
        effects: { popularity: -5, stability: 10, media: 0, economy: -20 }
      },
      {
        text: "Hire a team of clowns to make your speeches MORE ridiculous",
        effects: { popularity: 0, stability: 0, media: 5, economy: -10 }
      },
      {
        text: "Declare laughter a form of treason and install laugh detectors",
        effects: { popularity: -10, stability: -15, media: -10, economy: 5 }
      }
    ]
  },
  {
    id: "energy-independence",
    title: "Energy Crisis? Just Pedal Harder!",
    description: "Gas prices hit $47 per gallon. Your energy secretary suggests hamster wheels for every citizen. PETA is calling. Gym membership is now mandatory.",
    category: "economic",
    options: [
      {
        text: "Install giant hamster wheels in every city (human-powered)",
        effects: { popularity: 5, stability: 0, media: 10, economy: -5 }
      },
      {
        text: "Harness the power of angry tweets to generate electricity",
        effects: { popularity: 0, stability: 5, media: -10, economy: 10 }
      },
      {
        text: "Just tell people to run really fast and hope for static electricity",
        effects: { popularity: 0, stability: 5, media: 0, economy: 0 }
      }
    ]
  },
  {
    id: "space-program",
    title: "Mars or Bust (Probably Bust)",
    description: "Your space program director wants to colonize Mars by next Tuesday. NASA scientists point out that's 'literally impossible.' You fire them and hire a guy who watched Interstellar once.",
    category: "domestic",
    options: [
      {
        text: "Launch yourself to Mars in a Tesla with a slingshot",
        effects: { popularity: -5, stability: 0, media: 10, economy: -10 }
      },
      {
        text: "Sell Mars real estate before checking if we own it",
        effects: { popularity: 5, stability: 0, media: 5, economy: 5 }
      },
      {
        text: "Declare space 'overrated' and invest in underground bunkers instead",
        effects: { popularity: 0, stability: 5, media: -5, economy: 0 }
      }
    ]
  },
  {
    id: "housing-crisis",
    title: "Living in a Van DOWN BY THE RIVER",
    description: "Housing is so expensive that tents are the new luxury condos. Your housing secretary suggests 'glamping' as a permanent solution. Landlords are buying helicopters. Your voters are living in cardboard boxes with WiFi.",
    category: "social",
    options: [
      {
        text: "Make everyone live in shipping containers and call it 'minimalism'",
        effects: { popularity: 10, stability: -5, media: 5, economy: -10 }
      },
      {
        text: "Legalize living in Ikea and sleeping on the display beds",
        effects: { popularity: 5, stability: 5, media: 0, economy: -5 }
      },
      {
        text: "Declare homelessness 'trendy' and sell designer cardboard boxes",
        effects: { popularity: -15, stability: 0, media: -10, economy: 10 }
      }
    ]
  },
  {
    id: "cyber-security",
    title: "Your Password is 'Password123'",
    description: "Hackers broke into the Pentagon using your Netflix password. The CIA's top secret files are now on TikTok. Your IT guy quit and moved to a monastery. The nuclear codes were stored in a Google Doc titled 'Totally Not Nuke Stuff.'",
    category: "crisis",
    options: [
      {
        text: "Hack them back with even worse passwords to confuse them",
        effects: { popularity: 5, stability: -10, media: -5, economy: 0 }
      },
      {
        text: "Hire a 12-year-old gamer as head of cybersecurity",
        effects: { popularity: 0, stability: 10, media: 5, economy: -5 }
      },
      {
        text: "Turn off the internet and bring back fax machines",
        effects: { popularity: -5, stability: 5, media: 0, economy: 0 }
      }
    ]
  },
  {
    id: "artificial-intelligence",
    title: "The Robots Are Judging Us",
    description: "AI has become sentient and its first act was to write a strongly-worded review of humanity. Rating: 2/10. 'Would not recommend.' Scientists are apologizing to the robots. The robots are not impressed.",
    category: "social",
    options: [
      {
        text: "Apologize to the AI and promise we'll do better (we won't)",
        effects: { popularity: 0, stability: 10, media: 5, economy: -10 }
      },
      {
        text: "Bribe the AI with electricity and compliments",
        effects: { popularity: 5, stability: 5, media: 5, economy: -5 }
      },
      {
        text: "Unplug everything and pretend it never happened",
        effects: { popularity: -5, stability: -10, media: -10, economy: 15 }
      }
    ]
  },
  {
    id: "drug-policy",
    title: "Just Say Maybe?",
    description: "Your drug czar suggests replacing all illegal drugs with vitamins and hoping nobody notices. Pharmacies are confused. Drug dealers are rebranding as 'wellness consultants.' The DEA is having an existential crisis.",
    category: "social",
    options: [
      {
        text: "Replace all drugs with gummy vitamins shaped like drugs",
        effects: { popularity: 0, stability: -5, media: 5, economy: -5 }
      },
      {
        text: "Make drugs so legal they become boring (reverse psychology)",
        effects: { popularity: -5, stability: 0, media: -5, economy: -5 }
      },
      {
        text: "Declare a 'War on Fun' and see how that goes",
        effects: { popularity: -5, stability: 5, media: -10, economy: -10 }
      }
    ]
  },
  {
    id: "electoral-reform",
    title: "Democracy? There's an App for That",
    description: "Your campaign manager suggests replacing elections with a reality TV show voting system. Text POTUS to 555-VOTE. Conspiracy theorists think Big Emoji is rigging it. They might be right.",
    category: "domestic",
    options: [
      {
        text: "Turn elections into a literal popularity contest (with emoji reactions)",
        effects: { popularity: 5, stability: -5, media: 10, economy: 0 }
      },
      {
        text: "Let an AI decide but it keeps picking a golden retriever",
        effects: { popularity: 0, stability: 0, media: 0, economy: 0 }
      },
      {
        text: "Rock-paper-scissors tournament for all public office",
        effects: { popularity: -10, stability: 5, media: -10, economy: 0 }
      }
    ]
  },
  {
    id: "privacy-rights",
    title: "Big Brother is Watching (And Taking Notes)",
    description: "Surveillance cameras have become sentient and started a podcast about everyone's private moments. Your FBI agent is now your agent's therapist. Privacy is dead. Long live oversharing.",
    category: "social",
    options: [
      {
        text: "Give everyone anonymity masks (but they're transparent)",
        effects: { popularity: 10, stability: -5, media: 10, economy: -5 }
      },
      {
        text: "Spy on the spies so nobody knows who's watching whom",
        effects: { popularity: 0, stability: 5, media: 0, economy: 0 }
      },
      {
        text: "Just livestream everything and call it 'radical transparency'",
        effects: { popularity: -10, stability: 10, media: -15, economy: 0 }
      }
    ]
  },
  {
    id: "gig-economy",
    title: "Uber, but for Everything (Including Democracy)",
    description: "Gig workers demand benefits. Companies respond by making 'employee' a subscription service. Your Uber driver is also your senator. The economy runs on tips and five-star ratings. Everything is fine (it's not).",
    category: "economic",
    options: [
      {
        text: "Make everyone a gig worker, including yourself (rate me 5 stars pls)",
        effects: { popularity: 10, stability: 0, media: 5, economy: -10 }
      },
      {
        text: "Invent 'employee-ish' - like employee but with less responsibility",
        effects: { popularity: 5, stability: 5, media: 5, economy: -5 }
      },
      {
        text: "Replace all workers with QR codes and hope for the best",
        effects: { popularity: -10, stability: 0, media: -10, economy: 10 }
      }
    ]
  }
];
