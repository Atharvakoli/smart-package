
import { UserPreferences } from "@/models";
import { NextResponse } from "next/server";

async function deletePreferences(existingUserPreferences) {
  try {
    return await existingUserPreferences.destroy();
  } catch (error) {
    throw new Error(`Database query failed ${error.message}`);
  }
}

export async function DELETE(req, context) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "Id is required" }, { status: 400 });
    }

    const findUserPerencesById = await UserPreferences.findOne({
      where: { id },
    });

    if (!findUserPerencesById) {
      return NextResponse.json(
        { error: "User Preferences, Not Found" },
        { status: 404 }
      );
    }

    const deletedUserPreferences = await deletePreferences(
      findUserPerencesById
    );

    if (deletedUserPreferences === null) {
      return NextResponse.json(
        {
          error: "Can't delete User preferences, something went wrong",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "User Perenferences deleted successfully.",
        deletedUserPreferences,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete User preferences ${error.message}` },
      { status: 500 }
    );
  }
}
