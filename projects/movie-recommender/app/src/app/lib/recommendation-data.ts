export const streamingServices = [
  "Netflix",
  "Hulu",
  "Max",
  "Prime Video",
  "Disney+",
  "Apple TV+",
  "Peacock",
  "Paramount+",
] as const;

export const tasteGenres = [
  "Sci-fi",
  "Thriller",
  "Comedy",
  "Drama",
  "Action",
  "Romance",
  "Horror",
  "Crime",
] as const;

export const moodOptions = [
  "Easy watch",
  "Thoughtful",
  "Dark",
  "Fun",
  "Tense",
] as const;

export const energyOptions = ["Low", "Medium", "High"] as const;
export const companyOptions = ["Solo", "Date night", "Group"] as const;
export const maxRuntimeOptions = ["90", "120", "150", "Any"] as const;

export type EnergyLevel = "Low" | "Medium" | "High";
export type CompanyType = "Solo" | "Date night" | "Group";
export type MovieIntensity = "low" | "medium" | "high";
export type Tone = "light" | "balanced" | "dark";
export type Complexity = "easy" | "moderate" | "demanding";

export type MoviePick = {
  title: string;
  year: number;
  service: string;
  fit: string;
  vibe: string;
  whyTonight: string;
  fallbackReason: string;
  intensity: MovieIntensity;
  runtime: number;
  genres: string[];
  moods: string[];
  avoidTags: string[];
  energy: EnergyLevel;
  tone: Tone;
  complexity: Complexity;
  bestFor: CompanyType[];
  rewatchable: boolean;
  conversationStarter: boolean;
  goodFor: string[];
};

export type RecommendationInput = {
  services: string[];
  genres: string[];
  mood: string;
  avoid: string;
  energy: EnergyLevel | "";
  company: CompanyType | "";
  maxRuntime: string;
};

export type RankedRecommendation = MoviePick & {
  score: number;
  reasons: string[];
  caution?: string;
  friendNote: string;
};

export const movieCatalog: MoviePick[] = [
  {
    title: "Ex Machina",
    year: 2014,
    service: "Max",
    fit: "Thoughtful sci-fi with tension and atmosphere.",
    vibe: "Smart, tense, sleek",
    whyTonight: "Best when you want something intelligent, controlled, and gripping without feeling bloated.",
    fallbackReason: "Still a strong default if you want quality and tension without a huge time commitment.",
    intensity: "medium",
    runtime: 108,
    genres: ["Sci-fi", "Thriller"],
    moods: ["Thoughtful", "Tense", "Dark"],
    avoidTags: ["too slow"],
    energy: "Medium",
    tone: "dark",
    complexity: "moderate",
    bestFor: ["Solo", "Date night"],
    rewatchable: true,
    conversationStarter: true,
    goodFor: ["smart sci-fi night", "tense but controlled watch"],
  },
  {
    title: "Arrival",
    year: 2016,
    service: "Netflix",
    fit: "A thoughtful sci-fi drama when you want something emotional and smart.",
    vibe: "Reflective, emotional, cerebral",
    whyTonight: "Best when you want science fiction with real feeling and a slower, richer payoff.",
    fallbackReason: "A strong serious fallback when you want intelligence over spectacle.",
    intensity: "medium",
    runtime: 116,
    genres: ["Sci-fi", "Drama"],
    moods: ["Thoughtful", "Dark"],
    avoidTags: ["too slow"],
    energy: "Low",
    tone: "balanced",
    complexity: "demanding",
    bestFor: ["Solo", "Date night"],
    rewatchable: true,
    conversationStarter: true,
    goodFor: ["emotional sci-fi", "quieter thoughtful night"],
  },
  {
    title: "Palm Springs",
    year: 2020,
    service: "Hulu",
    fit: "A funny, clever pick when you want something easy and genuinely good.",
    vibe: "Funny, romantic, low-friction",
    whyTonight: "Best when the goal is to land on something enjoyable fast and avoid wasting the night browsing.",
    fallbackReason: "A reliable fallback when you want a high-likelihood yes instead of a risky pick.",
    intensity: "low",
    runtime: 90,
    genres: ["Comedy", "Romance"],
    moods: ["Easy watch", "Fun"],
    avoidTags: ["too silly"],
    energy: "Low",
    tone: "light",
    complexity: "easy",
    bestFor: ["Solo", "Date night", "Group"],
    rewatchable: true,
    conversationStarter: false,
    goodFor: ["date night", "easy win", "low-friction watch"],
  },
  {
    title: "Game Night",
    year: 2018,
    service: "Max",
    fit: "A fast, funny studio comedy with enough mystery to keep it moving.",
    vibe: "Fun, slick, playful",
    whyTonight: "Best when you want something light and entertaining that still feels sharp.",
    fallbackReason: "A useful easy-watch fallback when you want laughs without going too broad.",
    intensity: "low",
    runtime: 100,
    genres: ["Comedy", "Crime"],
    moods: ["Fun", "Easy watch"],
    avoidTags: ["too silly"],
    energy: "Medium",
    tone: "light",
    complexity: "easy",
    bestFor: ["Date night", "Group"],
    rewatchable: true,
    conversationStarter: false,
    goodFor: ["group hang", "something fun and fast"],
  },
  {
    title: "Michael Clayton",
    year: 2007,
    service: "Prime Video",
    fit: "A sharp adult drama with real tension and strong writing.",
    vibe: "Sharp, adult, gripping",
    whyTonight: "Best if you want something serious and rewarding that still feels tight and purposeful.",
    fallbackReason: "Useful when you want a grown-up, high-quality drama instead of algorithm sludge.",
    intensity: "medium",
    runtime: 119,
    genres: ["Drama", "Crime"],
    moods: ["Thoughtful", "Tense"],
    avoidTags: ["too depressing", "too slow"],
    energy: "Medium",
    tone: "balanced",
    complexity: "moderate",
    bestFor: ["Solo", "Date night"],
    rewatchable: true,
    conversationStarter: true,
    goodFor: ["smart adult drama", "serious but not draining"],
  },
  {
    title: "Before Sunrise",
    year: 1995,
    service: "Prime Video",
    fit: "A strong pick for a more intimate, thoughtful, romantic night.",
    vibe: "Warm, talky, romantic",
    whyTonight: "Best when you want something human, low-pressure, and emotionally rewarding.",
    fallbackReason: "A smart softer fallback when darker or louder options feel like the wrong mood.",
    intensity: "low",
    runtime: 101,
    genres: ["Romance", "Drama"],
    moods: ["Thoughtful", "Easy watch"],
    avoidTags: ["too talky", "too slow"],
    energy: "Low",
    tone: "light",
    complexity: "moderate",
    bestFor: ["Solo", "Date night"],
    rewatchable: true,
    conversationStarter: true,
    goodFor: ["date night", "quiet emotional watch"],
  },
  {
    title: "Mad Max: Fury Road",
    year: 2015,
    service: "Max",
    fit: "A high-energy action pick when you want momentum and spectacle.",
    vibe: "Intense, kinetic, exhilarating",
    whyTonight: "Best if you want maximum forward motion and almost no dead air.",
    fallbackReason: "A good reset choice when attention is low and you want something immediate.",
    intensity: "high",
    runtime: 120,
    genres: ["Action", "Sci-fi"],
    moods: ["Fun", "Tense"],
    avoidTags: ["too intense"],
    energy: "High",
    tone: "balanced",
    complexity: "easy",
    bestFor: ["Solo", "Group"],
    rewatchable: true,
    conversationStarter: false,
    goodFor: ["adrenaline night", "attention reset"],
  },
  {
    title: "Mission: Impossible - Fallout",
    year: 2018,
    service: "Paramount+",
    fit: "A polished action blockbuster when you want something propulsive and crowd-pleasing.",
    vibe: "Big, kinetic, exciting",
    whyTonight: "Best when the move is to stop overthinking and watch something that just goes.",
    fallbackReason: "A strong action fallback when you want energy and competence.",
    intensity: "high",
    runtime: 147,
    genres: ["Action", "Thriller"],
    moods: ["Fun", "Tense"],
    avoidTags: ["too long", "too intense"],
    energy: "High",
    tone: "balanced",
    complexity: "easy",
    bestFor: ["Solo", "Group"],
    rewatchable: true,
    conversationStarter: false,
    goodFor: ["big action night", "group pick"],
  },
  {
    title: "Gone Girl",
    year: 2014,
    service: "Hulu",
    fit: "A dark thriller when you want something gripping and a little nasty.",
    vibe: "Dark, twisty, sharp",
    whyTonight: "Best if you want a conversation-starting thriller with edge and momentum.",
    fallbackReason: "A strong darker fallback when you want more bite than a standard thriller gives you.",
    intensity: "high",
    runtime: 149,
    genres: ["Thriller", "Drama"],
    moods: ["Dark", "Tense"],
    avoidTags: ["too dark", "too long", "too intense"],
    energy: "Medium",
    tone: "dark",
    complexity: "moderate",
    bestFor: ["Solo", "Date night"],
    rewatchable: true,
    conversationStarter: true,
    goodFor: ["dark thriller night", "want something sharp and nasty"],
  },
  {
    title: "Barbarian",
    year: 2022,
    service: "Hulu",
    fit: "A tense horror-thriller if you want something unsettling and unpredictable.",
    vibe: "Creepy, tense, nasty",
    whyTonight: "Best when you want a real jolt and do not mind things getting weird.",
    fallbackReason: "A strong dark-night fallback if you want risk and intensity.",
    intensity: "high",
    runtime: 102,
    genres: ["Horror", "Thriller"],
    moods: ["Dark", "Tense"],
    avoidTags: ["too intense", "too dark"],
    energy: "High",
    tone: "dark",
    complexity: "easy",
    bestFor: ["Solo", "Group"],
    rewatchable: false,
    conversationStarter: true,
    goodFor: ["horror night", "want something wild"],
  },
  {
    title: "The Nice Guys",
    year: 2016,
    service: "Netflix",
    fit: "A funny crime pick with enough energy to feel fun without turning dumb.",
    vibe: "Funny, sharp, chaotic",
    whyTonight: "Best when you want laughs, momentum, and something broadly likable.",
    fallbackReason: "A strong all-around fallback when you want something safer but not boring.",
    intensity: "medium",
    runtime: 116,
    genres: ["Comedy", "Crime", "Action"],
    moods: ["Fun", "Easy watch"],
    avoidTags: ["too silly"],
    energy: "Medium",
    tone: "light",
    complexity: "easy",
    bestFor: ["Solo", "Date night", "Group"],
    rewatchable: true,
    conversationStarter: false,
    goodFor: ["easy fun watch", "crime-comedy night"],
  },
  {
    title: "Prisoners",
    year: 2013,
    service: "Netflix",
    fit: "A serious thriller for nights when you want something heavy and fully absorbing.",
    vibe: "Dark, tense, intense",
    whyTonight: "Best if you want to lock into something gripping and emotionally heavy.",
    fallbackReason: "A high-conviction thriller fallback when lighter picks feel wrong.",
    intensity: "high",
    runtime: 153,
    genres: ["Thriller", "Crime", "Drama"],
    moods: ["Dark", "Tense", "Thoughtful"],
    avoidTags: ["too dark", "too intense", "too long"],
    energy: "High",
    tone: "dark",
    complexity: "moderate",
    bestFor: ["Solo"],
    rewatchable: true,
    conversationStarter: true,
    goodFor: ["heavy thriller night", "want something absorbing"],
  },
  {
    title: "Knives Out",
    year: 2019,
    service: "Peacock",
    fit: "A clever, easy-to-like mystery with real momentum and charm.",
    vibe: "Clever, playful, crowd-pleasing",
    whyTonight: "Best when you want something sharp and entertaining with low risk.",
    fallbackReason: "A polished backup when you want broad appeal without feeling generic.",
    intensity: "low",
    runtime: 130,
    genres: ["Crime", "Comedy", "Drama"],
    moods: ["Fun", "Easy watch", "Thoughtful"],
    avoidTags: ["too silly"],
    energy: "Medium",
    tone: "light",
    complexity: "moderate",
    bestFor: ["Date night", "Group"],
    rewatchable: true,
    conversationStarter: true,
    goodFor: ["group movie", "light mystery"],
  },
  {
    title: "The Babadook",
    year: 2014,
    service: "Prime Video",
    fit: "A psychological horror pick when you want something dark and emotionally heavy.",
    vibe: "Dark, haunting, intense",
    whyTonight: "Best when you want horror with substance, not just cheap scares.",
    fallbackReason: "A useful horror fallback when you want something serious and unsettling.",
    intensity: "high",
    runtime: 94,
    genres: ["Horror", "Drama"],
    moods: ["Dark", "Thoughtful", "Tense"],
    avoidTags: ["too dark", "too intense"],
    energy: "Medium",
    tone: "dark",
    complexity: "moderate",
    bestFor: ["Solo"],
    rewatchable: false,
    conversationStarter: true,
    goodFor: ["serious horror night", "dark thoughtful mood"],
  },
  {
    title: "Top Gun: Maverick",
    year: 2022,
    service: "Paramount+",
    fit: "A high-confidence blockbuster if you want an easy, satisfying win.",
    vibe: "Big, emotional, exhilarating",
    whyTonight: "Best when you want something polished, exciting, and easy to say yes to.",
    fallbackReason: "A very safe fallback for a fun crowd-pleaser night.",
    intensity: "medium",
    runtime: 131,
    genres: ["Action", "Drama"],
    moods: ["Fun", "Easy watch"],
    avoidTags: ["too loud"],
    energy: "Medium",
    tone: "light",
    complexity: "easy",
    bestFor: ["Solo", "Date night", "Group"],
    rewatchable: true,
    conversationStarter: false,
    goodFor: ["crowd-pleaser", "easy blockbuster win"],
  },
  {
    title: "Past Lives",
    year: 2023,
    service: "Apple TV+",
    fit: "A quiet romantic drama when you want something intimate and emotionally precise.",
    vibe: "Tender, reflective, bittersweet",
    whyTonight: "Best when you want an adult emotional story that feels honest and restrained.",
    fallbackReason: "A softer thoughtful fallback when thrillers or spectacle feel wrong.",
    intensity: "low",
    runtime: 106,
    genres: ["Romance", "Drama"],
    moods: ["Thoughtful", "Easy watch"],
    avoidTags: ["too slow"],
    energy: "Low",
    tone: "balanced",
    complexity: "moderate",
    bestFor: ["Solo", "Date night"],
    rewatchable: true,
    conversationStarter: true,
    goodFor: ["date night", "quiet emotional watch"],
  },
  {
    title: "Prey",
    year: 2022,
    service: "Disney+",
    fit: "A lean survival action-thriller with strong momentum.",
    vibe: "Tense, physical, focused",
    whyTonight: "Best when you want something brisk, satisfying, and not overloaded.",
    fallbackReason: "A strong action fallback when you want tension without sprawl.",
    intensity: "medium",
    runtime: 100,
    genres: ["Action", "Thriller", "Sci-fi"],
    moods: ["Tense", "Fun"],
    avoidTags: ["too intense"],
    energy: "High",
    tone: "balanced",
    complexity: "easy",
    bestFor: ["Solo", "Group"],
    rewatchable: true,
    conversationStarter: false,
    goodFor: ["lean action night", "fast tense watch"],
  },
  {
    title: "Paddington 2",
    year: 2017,
    service: "Netflix",
    fit: "A genuinely delightful comfort pick when you want something warm and light.",
    vibe: "Sweet, funny, charming",
    whyTonight: "Best when the goal is to feel better, not be challenged.",
    fallbackReason: "A wholesome fallback when you want the opposite of dark or draining.",
    intensity: "low",
    runtime: 103,
    genres: ["Comedy"],
    moods: ["Easy watch", "Fun"],
    avoidTags: ["too silly"],
    energy: "Low",
    tone: "light",
    complexity: "easy",
    bestFor: ["Solo", "Date night", "Group"],
    rewatchable: true,
    conversationStarter: false,
    goodFor: ["comfort movie", "reset night"],
  },
  {
    title: "Zodiac",
    year: 2007,
    service: "Netflix",
    fit: "A meticulous investigative thriller when you want something immersive and serious.",
    vibe: "Obsessive, tense, procedural",
    whyTonight: "Best when you want a long, absorbing thriller that rewards attention.",
    fallbackReason: "A serious fallback for a more demanding crime-thriller mood.",
    intensity: "medium",
    runtime: 157,
    genres: ["Thriller", "Crime", "Drama"],
    moods: ["Thoughtful", "Tense", "Dark"],
    avoidTags: ["too long", "too slow"],
    energy: "Medium",
    tone: "dark",
    complexity: "demanding",
    bestFor: ["Solo"],
    rewatchable: true,
    conversationStarter: true,
    goodFor: ["investigative thriller", "want something deep and absorbing"],
  }
];

export function buildRecommendationQuery(input: RecommendationInput) {
  const params = new URLSearchParams();

  if (input.services.length) params.set("services", input.services.join(","));
  if (input.genres.length) params.set("genres", input.genres.join(","));
  if (input.mood) params.set("mood", input.mood);
  if (input.avoid.trim()) params.set("avoid", input.avoid.trim());
  if (input.energy) params.set("energy", input.energy);
  if (input.company) params.set("company", input.company);
  if (input.maxRuntime) params.set("maxRuntime", input.maxRuntime);

  return params.toString();
}

function normalizeAvoidText(text: string) {
  return text.toLowerCase().trim();
}

function buildReasons(movie: MoviePick, input: RecommendationInput, matchedGenres: string[]) {
  const reasons: string[] = [];

  if (input.services.includes(movie.service)) {
    reasons.push(`it is on ${movie.service}`);
  }

  if (matchedGenres.length) {
    reasons.push(`it leans into ${matchedGenres.join(" and ")}`);
  }

  if (input.mood && movie.moods.includes(input.mood)) {
    reasons.push(`it fits a ${input.mood.toLowerCase()} night`);
  }

  if (input.energy && movie.energy === input.energy) {
    reasons.push(`its energy matches what you asked for`);
  }

  if (input.company && movie.bestFor.includes(input.company)) {
    reasons.push(`it plays well for ${input.company.toLowerCase()}`);
  }

  if (!reasons.length) {
    reasons.push(movie.fallbackReason);
  }

  return reasons;
}

function buildFriendNote(movie: MoviePick, input: RecommendationInput) {
  const notes: string[] = [];

  if (input.mood && movie.moods.includes(input.mood)) {
    notes.push(`This feels right for a ${input.mood.toLowerCase()} night`);
  }

  if (input.company && movie.bestFor.includes(input.company)) {
    notes.push(`it should land well for ${input.company.toLowerCase()}`);
  }

  if (input.maxRuntime && input.maxRuntime !== "Any") {
    notes.push(`it stays within your ${input.maxRuntime}-minute ceiling`);
  }

  if (movie.conversationStarter && input.company === "Date night") {
    notes.push(`and it gives you something to talk about after`);
  }

  if (!notes.length) {
    notes.push(`This is here because it is a strong fit without feeling generic`);
  }

  return `${notes.join(", ")}.`;
}

function runtimeLimitFromInput(maxRuntime: string) {
  if (!maxRuntime || maxRuntime === "Any") return Number.POSITIVE_INFINITY;
  return Number(maxRuntime);
}

function pickDiverseTopThree(ranked: RankedRecommendation[]) {
  const selected: RankedRecommendation[] = [];

  for (const pick of ranked) {
    const tooSimilar = selected.some(
      (existing) =>
        existing.service === pick.service &&
        existing.moods.some((mood) => pick.moods.includes(mood)) &&
        existing.genres.some((genre) => pick.genres.includes(genre)),
    );

    if (tooSimilar && selected.length < 2) {
      continue;
    }

    selected.push(pick);

    if (selected.length === 3) {
      break;
    }
  }

  if (selected.length < 3) {
    for (const pick of ranked) {
      if (!selected.some((existing) => existing.title === pick.title)) {
        selected.push(pick);
      }
      if (selected.length === 3) break;
    }
  }

  return selected;
}

export function getRecommendations(input: RecommendationInput): RankedRecommendation[] {
  const avoidText = normalizeAvoidText(input.avoid);
  const hasServiceFilter = input.services.length > 0;
  const hasGenreFilter = input.genres.length > 0;
  const hasMoodFilter = Boolean(input.mood);
  const runtimeLimit = runtimeLimitFromInput(input.maxRuntime);

  const ranked = movieCatalog
    .filter((movie) => {
      if (hasServiceFilter && !input.services.includes(movie.service)) {
        return false;
      }

      if (movie.runtime > runtimeLimit) {
        return false;
      }

      if (hasMoodFilter && !movie.moods.includes(input.mood) && hasGenreFilter) {
        const hasGenreMatch = movie.genres.some((genre) => input.genres.includes(genre));
        if (!hasGenreMatch) return false;
      }

      return true;
    })
    .map((movie) => {
      let score = 10;
      let caution: string | undefined;

      const matchedGenres = movie.genres.filter((genre) => input.genres.includes(genre));
      const moodMatch = hasMoodFilter && movie.moods.includes(input.mood);
      const reasons = buildReasons(movie, input, matchedGenres);

      score += matchedGenres.length * 10;

      if (moodMatch) score += 9;
      if (input.energy && movie.energy === input.energy) score += 7;
      if (input.company && movie.bestFor.includes(input.company)) score += 6;
      if (movie.conversationStarter && input.company === "Date night") score += 2;
      if (movie.rewatchable && input.mood === "Easy watch") score += 2;
      if (movie.intensity === "low" && input.mood === "Easy watch") score += 4;
      if (movie.intensity === "high" && (input.mood === "Dark" || input.mood === "Tense")) score += 3;
      if (movie.runtime <= 110) score += 2;

      const matchedAvoidTag = movie.avoidTags.find((tag) => avoidText.includes(tag));
      if (matchedAvoidTag) {
        score -= 12;
        caution = `Possible mismatch: you said you want to avoid “${matchedAvoidTag}”.`;
      }

      if (avoidText.includes("too long") && movie.runtime >= 140) {
        score -= 8;
        caution = `Possible mismatch: this one runs ${movie.runtime} minutes.`;
      }

      return { ...movie, score, reasons, caution, friendNote: buildFriendNote(movie, input) };
    })
    .sort((a, b) => b.score - a.score || a.runtime - b.runtime);

  const topPicks = pickDiverseTopThree(ranked);

  if (topPicks.length >= 3) {
    return topPicks;
  }

  const fallback = movieCatalog
    .filter((movie) => !topPicks.some((pick) => pick.title === movie.title))
    .map((movie) => ({
      ...movie,
      score: -1,
      reasons: [movie.fallbackReason],
      caution: hasServiceFilter
        ? `Outside your selected services, included only because the exact pool was too small.`
        : undefined,
      friendNote: `This is a fallback pick only because the exact filtered pool was too thin.`,
    }))
    .sort((a, b) => a.runtime - b.runtime);

  return [...topPicks, ...fallback].slice(0, 3);
}
