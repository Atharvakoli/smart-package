import Clothing from "@/models/Clothing";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

interface Clothings {
  clothing_type: string;
  temperature_min: number;
  temperature_max: number;
  activity_type: string;
  ranking: number;
}

async function createClothing(clothingDetails: Clothings)
{
  try {
    const {
      clothing_type,
      temperature_min,
      temperature_max,
      activity_type,
      ranking,
    } = clothingDetails;

    const newClothing = await Clothing.create({
      id: uuidv4(),
      clothing_type,
      temperature_min,
      temperature_max,
      activity_type,
      ranking,
    });
    return newClothing;
  } catch (error) {
    throw new Error(`Database query failed ${error}`);
  }
}

export async function POST(req: NextResponse) {
  try {
    const clothingDetails: Clothings = await req.json();
    if (!clothingDetails) {
      return NextResponse.json(
        { error: "Credentails are required" },
        { status: 404 }
      );
    }
    const newClothings = await createClothing(clothingDetails);

    if (!newClothings) {
      return NextResponse.json(
        { error: "Failed to Create Clothing" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Clothing Created successfully.",
      newClothings,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Validation failed. Please provide valid data." },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: `Failed to Create Clothing ${error}` },
      { status: 500 }
    );
  }
}
