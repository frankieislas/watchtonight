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

export type MoviePick = {
  title: string;
  year: number;
  service: string;
  fit: string;
  vibe: string;
  whyTonight: string;
  fallbackReason: string;
  intensity: "low" | "medium" | "high";
  runtime: number;
  genres: string[];
  moods: string[];
  avoidTags: string[];
};

export type RecommendationInput = {
  services: string[];
  genres: string[];
  mood: string;
  avoid: string;
};

export type RankedRecommendation = MoviePick & {
  score: number;
  reasons: string[];
  caution?: string;
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
  },
];

export function buildRecommendationQuery(input: RecommendationInput) {
  const params = new URLSearchParams();

  if (input.services.length) params.set("services", input.services.join(","));
  if (input.genres.length) params.set("genres", input.genres.join(","));
  if (input.mood) params.set("mood", input.mood);
  if (input.avoid.trim()) params.set("avoid", input.avoid.trim());

  return params.toString();
}

function normalizeAvoidText(text: string) {
  return text.toLowerCase().trim();
}

function buildReasons(movie: MoviePick, input: RecommendationInput) {
  const reasons: string[] = [];

  if (input.services.includes(movie.service)) {
    reasons.push(`available on ${movie.service}`);
  }

  const matchedGenres = movie.genres.filter((genre) => input.genres.includes(genre));
  if (matchedGenres.length) {
    reasons.push(`matches your ${matchedGenres.join(" + ")} taste`);
  }

  if (input.mood && movie.moods.includes(input.mood)) {
    reasons.push(`fits a ${input.mood.toLowerCase()} night`);
  }

  if (!reasons.length) {
    reasons.push(movie.fallbackReason);
  }

  return reasons;
}

export function getRecommendations(input: RecommendationInput): RankedRecommendation[] {
  const avoidText = normalizeAvoidText(input.avoid);

  const ranked = movieCatalog
    .filter((movie) => {
      if (!input.services.length) return true;
      return input.services.includes(movie.service);
    })
    .map((movie) => {
      let score = 0;
      const reasons = buildReasons(movie, input);
      let caution: string | undefined;

      if (input.mood && movie.moods.includes(input.mood)) score += 4;

      const matchedGenres = movie.genres.filter((genre) => input.genres.includes(genre));
      score += matchedGenres.length * 3;

      if (input.services.includes(movie.service)) score += 2;

      if (movie.runtime <= 110) score += 1;

      const matchedAvoidTag = movie.avoidTags.find((tag) => avoidText.includes(tag));
      if (matchedAvoidTag) {
        score -= 5;
        caution = `Possible mismatch: you said you want to avoid “${matchedAvoidTag}”.`;
      }

      if (avoidText.includes("too long") && movie.runtime >= 140) {
        score -= 3;
        caution = `Possible mismatch: this one runs ${movie.runtime} minutes.`;
      }

      return { ...movie, score, reasons, caution };
    })
    .sort((a, b) => b.score - a.score || a.runtime - b.runtime);

  return ranked.slice(0, 3);
}
