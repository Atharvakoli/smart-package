import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { validateTripDetails } from "../../../../../../database/service/index.service";
import { Trip } from "@/models/trip";

async function createTrip(tripDetails) {
  try {
    const {
      user_id,
      location,
      start_date,
      end_date,
      sex,
      num_people,
      activity_type,
      frequency,
    } = tripDetails;

    const newTrip = await Trip.create({
      id: uuidv4(),
      user_id,
      location,
      start_date,
      end_date,
      sex,
      num_people,
      activity_type,
      frequency,
    });
    return newTrip;
  } catch (error) {
    throw new Error(`Database query failed ${error.message}`);
  }
}

export async function POST(req) {
  try {
    const tripDetails = await req.json();

    const errors = validateTripDetails(tripDetails);
    if (errors.length > 0) {
      return NextResponse.json(
        { error: "Credentails are required", errors },
        { status: 404 }
      );
    }
    const newTrip = await createTrip(tripDetails);

    if (!newTrip) {
      return NextResponse.json(
        { error: "Failed to Create trip details" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Trip Created successfully.",
      newTrip,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to Create Trip ${error.message}` },
      { status: 500 }
    );
  }
}
