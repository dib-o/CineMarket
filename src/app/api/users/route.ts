import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongodb";
import User from "@/model/users/users";

export async function GET() {
  try {
    await connectToDB();
    const users = await User.find().sort({ createdAt: -1 });
    return NextResponse.json(users);
  } catch (error: any) {
    console.error("Error fetching tasks:", error.message);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectToDB();
    const data = await req.json();
    const user = await User.create(data);
    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDB();
    const { userId, newEmail, newPassword } = await req.json();

    if (!userId || !newEmail || !newPassword) {
      return NextResponse.json(
        { success: false, message: "Missing userId, new email, or new password" },
        { status: 400 }
      );
    }

    const updated = await User.findOneAndUpdate(
      {
        userId: userId,
      },
      {
        $set: {
          email: newEmail,
          password: newPassword,
        },
      },
      { new: true }
    );
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "No matching task found to update" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, message: updated });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
