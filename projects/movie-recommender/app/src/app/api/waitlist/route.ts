import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body?.email || typeof body.email !== "string") {
    return NextResponse.json({ ok: false, error: "Email is required." }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    message: "Waitlist capture received.",
    entry: {
      email: body.email,
      name: body.name || "",
      interest: body.interest || "",
      premiumInterest: body.premiumInterest || "",
      createdAt: new Date().toISOString(),
    },
    note: "This endpoint is ready for a real backend or email tool integration next.",
  });
}
