import { NextRequest, NextResponse } from "next/server";
import { getRecommendations } from "@/app/lib/recommendation-data";
import { getLivePool } from "@/app/lib/live-pool";
import { recommendationInputToLiveQuery } from "@/app/lib/live-recommendation-types";

function parseList(value: string | null) {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const input = {
    services: parseList(searchParams.get("services")),
    genres: parseList(searchParams.get("genres")),
    mood: searchParams.get("mood") || "Thoughtful",
    avoid: searchParams.get("avoid") || "",
    energy: (searchParams.get("energy") || "") as "" | "Low" | "Medium" | "High",
    company: (searchParams.get("company") || "") as "" | "Solo" | "Date night" | "Group",
    maxRuntime: searchParams.get("maxRuntime") || "120",
  };

  const livePool = await getLivePool(recommendationInputToLiveQuery(input));
  const recommendations = getRecommendations(input, livePool.movies);

  return NextResponse.json({
    input,
    recommendations,
    poolSize: livePool.movies.length,
    source: livePool.source,
    liveCatalogReady: livePool.liveCatalogReady,
    note: livePool.note,
  });
}
