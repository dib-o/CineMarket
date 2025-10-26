import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import { getUserModel } from "@/model/user-data/userData";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const username = searchParams.get("username");

    if (!userId || !username) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing userId or username in query",
        },
        { status: 400 }
      );
    }

    await connectToDB();

    const Movie = getUserModel(userId, username);
    const Movies = await Movie.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, Movies });
  } catch (error: any) {
    console.error("❌ Error fetching movies:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDB();

    const body = await req.json();
    const { userId, username, ...movieData } = body;

    if (!userId || !username) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing userId or username",
        },
        { status: 400 }
      );
    }

    const Movie = getUserModel(userId, username);
    const Movies = await Movie.create(movieData);

    return NextResponse.json({
      success: true,
      movie: Movies,
    });
  } catch (error: any) {
    console.error("❌ Error creating movie: ", error.message);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    await connectToDB();
    const { userId, username, movieId } = await req.json();
    if (!userId || !username || !movieId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing userId, username, or movieId",
        },
        { status: 400 }
      );
    }
    const movie = getUserModel(userId, username);
    const result = await movie.findOneAndDelete({ id: movieId });
    if (!result) {
      return NextResponse.json(
        {
          success: false,
          message: "MovieId not found or already deleted",
        },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "Movie deleted successfully",
    });
  } catch (error: any) {
    console.error("❌ Error deleting movie:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
