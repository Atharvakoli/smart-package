import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

async function deleteUser(existingUser: User) {
  try {
    return await existingUser.destroy();
  } catch (error) {
    throw new Error(`Database query failed: ${error}`);
  }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    if (id === undefined) {
      return NextResponse.json({ error: "Id is required" }, { status: 400 });
    }

    const existingUser = await User.findOne({ where: { id } });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const deletedUser = await deleteUser(existingUser);

    if (!deleteUser) {
      return NextResponse.json(
        {
          error: "Can't delete User, something went wrong",
        },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "User Logged successfully.",
      deletedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete User. ${error}` },
      { status: 500 }
    );
  }
}
