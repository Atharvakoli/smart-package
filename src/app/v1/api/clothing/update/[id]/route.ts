import Clothing from "@/models/Clothing";
import { NextRequest, NextResponse } from "next/server";

interface Clothings {
  clothing_type: string;
  temperature_min: number;
  temperature_max: number;
  activity_type: string;
  ranking: number;
}

async function getUpdatedClothing(
  clothing: Clothing,
  clothingDetails: Clothings
) {
  try {
    clothing.set({
      clothing_type: clothingDetails.clothing_type ?? clothing.clothing_type,
      temperature_min: clothingDetails.temperature_min ?? clothing.temperature_min,
      temperature_max: clothingDetails.temperature_max ?? clothing.temperature_max,
      activity_type: clothingDetails.activity_type ?? clothing.activity_type,
      ranking: clothingDetails.ranking ?? clothing.ranking,
    });

    await clothing.save();
    return clothing;
  } catch (error) {
    throw new Error(`Database query failed ${error}`);
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ error: "Id is required" }, { status: 404 });
    }
    const clothingDetails: Clothings = await req.json();

    if (!clothingDetails) {
      return NextResponse.json(
        { error: "Credentails are required" },
        { status: 404 }
      );
    }

    const clothing = await Clothing.findOne({ where: { id } });

    if (!clothing) {
      return NextResponse.json(
        { error: "Can't Find Clothing" },
        { status: 404 }
      );
    }

    const updatedClothing = await getUpdatedClothing(clothing, clothingDetails);

    if (!updatedClothing) {
      return NextResponse.json(
        { error: "Can't Update Clothing. something went wrong" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Clothing Updated successfully", updatedClothing },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to Update Clothing ${error}` },
      { status: 500 }
    );
  }
}
