import { type NextRequest, NextResponse } from "next/server";

import { getAchievementsData } from "@/services/achievements";

export const GET = async (req: NextRequest) => {
  try {
    // Validate environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error("Missing Supabase environment variables");
      return NextResponse.json(
        { message: "Server configuration error" },
        { status: 500 },
      );
    }

    const searchParams = req.nextUrl.searchParams;
    const queryCategory = searchParams.get("category");
    const querySearch = searchParams.get("search");

    if (queryCategory && querySearch) {
      const data = await getAchievementsData({
        category: queryCategory,
        search: querySearch,
      });
      return NextResponse.json(data, { status: 200 });
    }

    if (queryCategory && queryCategory.trim()) {
      const data = await getAchievementsData({ category: queryCategory });
      return NextResponse.json(data, { status: 200 });
    }

    if (querySearch) {
      const data = await getAchievementsData({ search: querySearch });
      return NextResponse.json(data, { status: 200 });
    }

    const data = await getAchievementsData({});
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in achievements API:", error);
    return NextResponse.json(
      { 
        message: "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? (error as Error).message : undefined
      },
      { status: 500 },
    );
  }
};
