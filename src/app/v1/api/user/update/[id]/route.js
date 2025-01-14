import { User } from "@/models";
import { NextResponse } from "next/server";

async function updateUser(user, existingUser) {
  try {
    existingUser.set({
      name: user.name ?? existingUser.name,
      email: user.email ?? existingUser.email,
      contactNumber: user.contactNumber ?? existingUser.contactNumber,
    });

    await existingUser.save();
    return existingUser;
  } catch (error) {
    throw new Error(`Database query failed: ${error}`);
  }
}

export async function PUT(req, context) {
  const emailRegix = /^[a-z0-9][\w\.]{m,n}\@\w+?(\.\w+){1,}$/gi;
  const number_regix = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ error: "Id is required" }, { status: 400 });
    }

    const user = await req.json();

    if (
      !user.name ||
      !user.email ||
      !user.contactNumber ||
      !emailRegix.test(user.email) ||
      !number_regix.test(user.contactNumber)
    ) {
      return NextResponse.json(
        {
          error:
            "All fields (name, email, contactNumber) are required ans should be valid",
        },
        { status: 404 }
      );
    }

    const existingUser = await User.findOne({ where: { id } });
    if (!existingUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const updatedUser = await updateUser(user, existingUser);

    return NextResponse.json({
      message: "User updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update user. ${error.message}` },
      { status: 500 }
    );
  }
}
