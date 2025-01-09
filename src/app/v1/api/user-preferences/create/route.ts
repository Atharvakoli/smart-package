import UserPreferences from "@/models/UserPreferences";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

interface UserPreferencesDetails {
  user_id: string;
  home_city: string;
  activity_preferences: Record<string, unknown>;
  travel_history: Record<string, unknown>;
}

async function createUserPreferences(userPreferences: UserPreferencesDetails) {
  try {
    return await UserPreferences.create({
      id: uuidv4(),
      user_id: userPreferences.user_id,
      home_city: userPreferences.home_city,
      activity_preferences: userPreferences.activity_preferences, 
      travel_history: userPreferences.travel_history,
    });
  } catch (error) {
    throw new Error(`Database query Failed ${error}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const userPreferences = await req.json();

    const { user_id, home_city, activity_preferences, travel_history } =
      userPreferences;

    if (!user_id || !home_city || !activity_preferences || !travel_history) {
      return NextResponse.json(
        {
          error:
            "All fields (user_id, home_city, activity_preferences, travel_history) are required.",
        },
        { status: 400 }
      );
    }

    const newUserPreferences = await createUserPreferences(userPreferences);

    if (!newUserPreferences) {
      return NextResponse.json(
        { error: "Can't create User Preferences, something went wrong." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "User preferences created successfully.", newUserPreferences },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Validation failed. Please provide valid data." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: `Failed to Create User Preferences: ${error}` },
      { status: 500 }
    );
  }
}
