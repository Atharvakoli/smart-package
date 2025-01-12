import User from "@/models/User";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { generateAccessToken } from "../../../../../../database/service/index.service";


async function getUserByEmail(email: string) {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch (error) {
    console.error("Database query failed:", error);
    throw new Error("Database query failed");
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const user = await getUserByEmail(email);

    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const { ...userWithoutPassword } = user.toJSON();
        const token = generateAccessToken(userWithoutPassword);
        return NextResponse.json(
          {
            message: "Welcome back to our services.",
            user: { ...userWithoutPassword },
            access_token: token,
          },
          { status: 200 }
        );
      }
    }

    return NextResponse.json(
      { error: "New User, Please Sign Up or Password Incorrect." },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error occurred:", error);
    return NextResponse.json(
      { error: `Failed to fetch data: ${error.message}` },
      { status: 500 }
    );
  }
}
