import Clothing from "@/models/Clothing";
import { NextResponse } from "next/server";

async function getAllClothings() {
  try {
    const clothings = await Clothing.findAll();
    return clothings;
  } catch (error) {
    throw new Error(`Database query failed ${error}`);
  }
}

export async function GET() {
  try {
    const clothings = await getAllClothings();

    if (!clothings) {
      return NextResponse.json(
        { error: "Can't Get Clothings" },
        { status: 404 }
      );
    }
    return NextResponse.json({ clothings})
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to Get Clothings ${error}` },
      { status: 500 }
    );
  }
}
