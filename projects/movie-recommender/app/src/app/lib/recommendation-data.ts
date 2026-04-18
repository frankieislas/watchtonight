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
  }
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

function buildReasons(movie: MoviePick, input: RecommendationInput, matchedGenres: string[]) {
  const reasons: string[] = [];

  if (input.services.includes(movie.service)) {
    reasons.push(`available on ${movie.service}`);
  }

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
  const hasServiceFilter = input.services.length > 0;
  const hasGenreFilter = input.genres.length > 0;
  const hasMoodFilter = Boolean(input.mood);

  const ranked = movieCatalog
    .filter((movie) => {
      if (hasServiceFilter && !input.services.includes(movie.service)) {
        return false;
      }

      if (hasMoodFilter && !movie.moods.includes(input.mood) && hasGenreFilter) {
        const hasGenreMatch = movie.genres.some((genre) => input.genres.includes(genre));
        if (!hasGenreMatch) return false;
      }

      return true;
    })
    .map((movie) => {
      let score = 0;
      let caution: string | undefined;

      const matchedGenres = movie.genres.filter((genre) => input.genres.includes(genre));
      const moodMatch = hasMoodFilter && movie.moods.includes(input.mood);
      const reasons = buildReasons(movie, input, matchedGenres);

      score += 4;
      score += matchedGenres.length * 8;

      if (moodMatch) {
        score += 7;
      } else if (hasMoodFilter) {
        score -= 4;
      }

      if (movie.runtime <= 110) score += 2;
      if (movie.runtime >= 140) score -= 2;
      if (movie.intensity === "low" && input.mood === "Easy watch") score += 3;
      if (movie.intensity === "high" && (input.mood === "Dark" || input.mood === "Tense")) score += 2;

      const matchedAvoidTag = movie.avoidTags.find((tag) => avoidText.includes(tag));
      if (matchedAvoidTag) {
        score -= 10;
        caution = `Possible mismatch: you said you want to avoid “${matchedAvoidTag}”.`;
      }

      if (avoidText.includes("too long") && movie.runtime >= 140) {
        score -= 6;
        caution = `Possible mismatch: this one runs ${movie.runtime} minutes.`;
      }

      return { ...movie, score, reasons, caution };
    })
    .sort((a, b) => b.score - a.score || a.runtime - b.runtime);

  if (ranked.length >= 3) {
    return ranked.slice(0, 3);
  }

  const fallback = movieCatalog
    .filter((movie) => !ranked.some((pick) => pick.title === movie.title))
    .map((movie) => ({
      ...movie,
      score: -1,
      reasons: [movie.fallbackReason],
      caution: hasServiceFilter
        ? `Outside your selected services, included only because the exact pool was too small.`
        : undefined,
    }))
    .sort((a, b) => a.runtime - b.runtime);

  return [...ranked, ...fallback].slice(0, 3);
}
