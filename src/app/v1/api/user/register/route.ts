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
    throw new Error("Invalid or expired token");
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
  } catch (error: any) {
    throw new Error(`Database query failed: ${error}`);
  }
}

export async function POST(req: NextRequest) {
  const emailRegix = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const numberRegix = /^(\+\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/;

  try {
    const user: Users = await req.json();

    if (!emailRegix.test(user.email)) {
      return NextResponse.json(
        { error: "Invalid email or contact format." },
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

    const token = generateAccessToken(newUser);

    const UserWithToken = {
      ...newUser.dataValues,
      access_token: token,
    };

    return NextResponse.json(
      {
        message: "User created successfully.",
        newUser: UserWithToken,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message || "Failed to create user.",
      },
      { status: 500 }
    );
  }
}
