import UserPreferences from "@/models/UserPreferences";
import { NextResponse } from "next/server";

async function getAllUserPreferences() {
  try {
    return await UserPreferences.findAll();
  } catch (error) {
    throw new Error(`Database query failed ${error}`);
  }
}

export async function GET() {
  try {
    const userPreferences = await getAllUserPreferences();
    if (!userPreferences) {
      return NextResponse.json(
        { error: "Can't find user Preferences" },
        { status: 404 }
      );
    }
    return NextResponse.json(userPreferences, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to GET User preferences ${error}` },
      { status: 500 }
    );
  }
}
