import Travel from "@/models/trip";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

interface Travels {
  user_id: string;
  location: number;
  start_date: string;
  end_date: string;
  num_people: number;
}

async function createTravel(travelDetails: Travels) {
  try {
    const { user_id, location, start_date, end_date, num_people } =
      travelDetails;

    const newTravel = await Travel.create({
      id: uuidv4(),
      user_id,
      location,
      start_date,
      end_date,
      num_people,
    });
    return newTravel;
  } catch (error) {
    throw new Error(`Database query failed ${error}`);
  }
}

export async function POST(req: NextResponse) {
  try {
    const travelDetails: Travels = await req.json();
    if (!travelDetails) {
      return NextResponse.json(
        { error: "Credentails are required" },
        { status: 404 }
      );
    }
    const newTravel = await createTravel(travelDetails);

    if (!newTravel) {
      return NextResponse.json(
        { error: "Failed to Create travel details" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: "Travel Created successfully.",
      newTravel,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to Create Travel ${error}` },
      { status: 500 }
    );
  }
}
