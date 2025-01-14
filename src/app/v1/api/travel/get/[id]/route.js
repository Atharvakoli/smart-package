import { Trip } from "@/models";
import { User } from "../../../../../../models/User";
import { NextResponse } from "next/server";

async function getAllTrips() {
  try {
    const trips = await Trip.findAll({ include: "user" });

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

export async function GET(req, context) {
  try {
    const { id } = await context.params;
    const trips = await getAllTrips();

    if (trips.length === 0) {
      return NextResponse.json({ error: "No trips found" }, { status: 404 });
    }

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return NextResponse.json({ error: "User, NOT FOUND" }, { status: 404 });
    }

    return NextResponse.json({ ...user?.dataValues, trips }, { status: 200 });
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
