import UserPreferences from "@/models/UserPreferences";
import { NextRequest, NextResponse } from "next/server";

interface UserPreferencesDetails {
  user_id: string;
  home_city: string;
  activity_preferences: Record<string, unknown>;
  travel_history: Record<string, unknown>;
}

async function getUpdatedUserPreferences(
  existingUserPreferences: UserPreferences,
  newUserPreferencesDetails: UserPreferencesDetails
) {
  try {
    existingUserPreferences.set({
      user_id:
        newUserPreferencesDetails.user_id ?? existingUserPreferences.user_id,
      home_city:
        newUserPreferencesDetails.home_city ??
        existingUserPreferences.home_city,
      activity_preferences:
        newUserPreferencesDetails.activity_preferences ??
        existingUserPreferences.activity_preferences,
      travel_history:
        newUserPreferencesDetails.travel_history ??
        existingUserPreferences.travel_history,
    });

    await existingUserPreferences.save();
    return existingUserPreferences;
  } catch (error) {
    throw new Error(`Database query failed ${error}`);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json({ error: "Id is required" }, { status: 400 });
    }
    const userPreference = await req.json();

    if (!userPreference) {
      return NextResponse.json(
        { error: "Credentails is required" },
        { status: 400 }
      );
    }

    const findUserPreferenceById = await UserPreferences.findOne({
      where: { id },
    });

    if (!findUserPreferenceById) {
      return NextResponse.json(
        {
          message: "Can't Update User Preferences, something went wrong",
        },
        { status: 400 }
      );
    }

    const updatedUserPreference = await getUpdatedUserPreferences(
      findUserPreferenceById,
      userPreference
    );

    if (!updatedUserPreference) {
      return NextResponse.json(
        {
          message: "User Preferences updated successfully.",
          updatedUserPreference,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "User Preferences Updated successfully.",
        updatedUserPreference,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Failed Update UserPreferences ${error}` },
      { status: 500 }
    );
  }
}
