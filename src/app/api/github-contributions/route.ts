import { NextResponse } from "next/server";

const GITHUB_USERNAME = "JohnCarl-30";

export async function GET() {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      { next: { revalidate: 3600 } },
    );

    if (!res.ok) {
      throw new Error(`Upstream responded with ${res.status}`);
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to load GitHub contributions" },
      { status: 502 },
    );
  }
}
