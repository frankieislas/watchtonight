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
  service: string;
  fit: string;
  vibe: string;
  genres: string[];
  moods: string[];
};

export type RecommendationInput = {
  services: string[];
  genres: string[];
  mood: string;
  avoid: string;
};

export const movieCatalog: MoviePick[] = [
  {
    title: "Ex Machina",
    service: "Max",
    fit: "Thoughtful sci-fi with tension and atmosphere.",
    vibe: "Smart, tense, sleek",
    genres: ["Sci-fi", "Thriller"],
    moods: ["Thoughtful", "Tense", "Dark"],
  },
  {
    title: "Palm Springs",
    service: "Hulu",
    fit: "A funny, clever pick when you want something easy and genuinely good.",
    vibe: "Funny, romantic, low-friction",
    genres: ["Comedy", "Romance"],
    moods: ["Easy watch", "Fun"],
  },
  {
    title: "Michael Clayton",
    service: "Prime Video",
    fit: "A sharp adult drama with real tension and strong writing.",
    vibe: "Sharp, adult, gripping",
    genres: ["Drama", "Crime"],
    moods: ["Thoughtful", "Tense"],
  },
  {
    title: "Mad Max: Fury Road",
    service: "Max",
    fit: "A high-energy action pick when you want momentum and spectacle.",
    vibe: "Intense, kinetic, exhilarating",
    genres: ["Action", "Sci-fi"],
    moods: ["Fun", "Tense"],
  },
  {
    title: "Gone Girl",
    service: "Hulu",
    fit: "A dark thriller when you want something gripping and a little nasty.",
    vibe: "Dark, twisty, sharp",
    genres: ["Thriller", "Drama"],
    moods: ["Dark", "Tense"],
  },
  {
    title: "Before Sunrise",
    service: "Prime Video",
    fit: "A strong pick for a more intimate, thoughtful, romantic night.",
    vibe: "Warm, talky, romantic",
    genres: ["Romance", "Drama"],
    moods: ["Thoughtful", "Easy watch"],
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

export function getRecommendations(input: RecommendationInput) {
  const ranked = movieCatalog
    .filter((movie) => {
      if (!input.services.length) return true;
      return input.services.includes(movie.service);
    })
    .map((movie) => {
      let score = 0;

      if (input.mood && movie.moods.includes(input.mood)) score += 3;
      score += movie.genres.filter((genre) => input.genres.includes(genre)).length * 2;

      return { movie, score };
    })
    .sort((a, b) => b.score - a.score);

  const fallback = movieCatalog
    .filter((movie) => !ranked.find((entry) => entry.movie.title === movie.title))
    .map((movie) => ({ movie, score: 0 }));

  return [...ranked, ...fallback].slice(0, 3).map((entry) => entry.movie);
}
