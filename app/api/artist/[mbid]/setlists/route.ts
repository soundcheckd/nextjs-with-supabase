import { getArtistSetlists, formatSetlistForDisplay } from "@/lib/setlistfm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ mbid: string }> }
) {
  const { mbid } = await params;
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");

  if (!mbid) {
    return NextResponse.json(
      { error: "Artist MBID is required" },
      { status: 400 }
    );
  }

  try {
    const results = await getArtistSetlists(mbid, page);
    
    if (!results || !results.setlist) {
      return NextResponse.json({
        setlists: [],
        total: 0,
        page,
        itemsPerPage: 20,
        totalPages: 0,
      });
    }

    const formattedSetlists = results.setlist.map(formatSetlistForDisplay);
    const totalPages = Math.ceil(results.total / results.itemsPerPage);

    return NextResponse.json({
      setlists: formattedSetlists,
      total: results.total,
      page: results.page,
      itemsPerPage: results.itemsPerPage,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching artist setlists:", error);
    return NextResponse.json(
      { error: "Failed to fetch artist setlists" },
      { status: 500 }
    );
  }
}
