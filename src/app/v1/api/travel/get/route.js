import { Trip } from "@/models/trip";
import { NextResponse } from "next/server";

async function getAllTrips() {
  try {
    const trips = await Trip.findAll();

    if (!trips || trips.length === 0) {
      return [];
    }
    return trips;
  } catch (error) {
    throw new Error(
      `Database query failed: ${error instanceof Error ? error.message : error}`
    );
  }
}

export async function GET() {
  try {
    const trips = await getAllTrips();

    if (trips.length === 0) {
      return NextResponse.json({ error: "No trips found" }, { status: 404 });
    }

    return NextResponse.json({ trips }, { status: 200 });
  } catch (error) {
    console.error("Error fetching trips:", error);
    return NextResponse.json(
      {
        error: `Failed to get trips: ${
          error instanceof Error ? error.message : error
        }`,
      },
      { status: 500 }
    );
  }
}
