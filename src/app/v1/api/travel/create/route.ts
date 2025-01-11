import Trip from "@/models/trip";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { validateTripDetails } from "../../../../../../database/service/index.service";

interface Trips {
  user_id: string;
  location: string;
  start_date: string;
  end_date: string;
  sex: string;
  num_people: number;
  activity_type: string[];
  frequency: string;
}

async function createTrip(tripDetails: Trips) {
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

    const newTravel = await Trip.create({
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
    return newTravel;
  } catch (error) {
    throw new Error(`Database query failed ${error}`);
  }
}

export async function POST(req: NextResponse) {
  try {
    const tripDetails: Trips = await req.json();

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
        { error: "Failed to Create travel details" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Trip Created successfully.",
      newTrip,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to Create Trip ${error}` },
      { status: 500 }
    );
  }
}
