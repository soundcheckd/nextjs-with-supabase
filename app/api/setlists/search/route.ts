import { searchSetlistsByArtist, formatSetlistForDisplay } from "@/lib/setlistfm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q");
  const page = parseInt(searchParams.get("page") || "1");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 }
    );
  }

  try {
    const results = await searchSetlistsByArtist(query, page);
    
    if (!results || !results.setlist) {
      return NextResponse.json({
        setlists: [],
        total: 0,
        page,
        itemsPerPage: 20,
      });
    }

    const formattedSetlists = results.setlist.map(formatSetlistForDisplay);

    return NextResponse.json({
      setlists: formattedSetlists,
      total: results.total,
      page: results.page,
      itemsPerPage: results.itemsPerPage,
    });
  } catch (error) {
    console.error("Error searching setlists:", error);
    return NextResponse.json(
      { error: "Failed to search setlists" },
      { status: 500 }
    );
  }
}
