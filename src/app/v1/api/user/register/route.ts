import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

interface Users {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  password: string;
}

export function generateAccessToken(user: Users) {
  const payload = { id: user.id, email: user.email };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRATION || "1h",
  });

  return accessToken;
}

export function verifyAccessToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch (error) {
    throw new Error("Invalid or expired token", error);
  }
}

async function createNewUser(user: Users) {
  try {
    const { name, email, contactNumber, password } = user;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      contactNumber,
    });

    return newUser;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Database query failed: ${error.message}`);
    }
    throw new Error("Unknown error occurred.");
  }
}

export async function POST(req: NextRequest) {
  const emailRegix = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const numberRegix = /^(\+\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/;

  try {
    const user: Users = await req.json();

    if (!emailRegix.test(user.email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    if (!numberRegix.test(user.contactNumber)) {
      return NextResponse.json(
        { error: "Invalid contact number format." },
        { status: 400 }
      );
    }

    const isExistingUser = await User.findOne({
      where: { email: user.email },
    });

    if (isExistingUser) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 409 }
      );
    }

    const newUser: Users = await createNewUser(user);

    const access_token = generateAccessToken(newUser);

    return NextResponse.json(
      {
        message: "User created successfully.",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          contactNumber: newUser.contactNumber,
        },
        access_token,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred." },
      { status: 500 }
    );
  }
}
