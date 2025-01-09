import Travel from "@/models/trip";
import { NextResponse } from "next/server";

async function getAllTravels() {
  try {
    const travels = await Travel.findAll();
    return travels;
  } catch (error) {
    throw new Error(`Database query failed ${error}`);
  }
}

export async function GET() {
  try {
    const travels = await getAllTravels();

    if (!travels) {
      return NextResponse.json({ error: "Can't Get Travels" }, { status: 404 });
    }
    return NextResponse.json(travels, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to Get Travels ${error}` },
      { status: 500 }
    );
  }
}
