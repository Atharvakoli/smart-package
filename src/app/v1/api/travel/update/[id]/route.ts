import { Travel } from "@/models";
import { NextResponse } from "next/server";

interface Travels {
  id: string;
  location: string;
  start_date: string;
  end_date: string;
  num_people: number;
}

async function getUpdatedTravel(travel: Travel, travelDetails: Travels) {
  try {
    travel.set({
      location: travelDetails.location ?? travel.location,
      start_date: travelDetails.start_date ?? travel.start_date,
      end_date: travelDetails.end_date ?? travel.end_date,
      num_people: travelDetails.num_people ?? travel.num_people,
    });

    await travel.save();
    return travel;
  } catch (error) {
    throw new Error(`Database query failed ${error}`);
  }
}

export async function PUT({ params }: { params: { id: string } }) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json({ error: "Id is required" }, { status: 404 });
    }
    const travelDetails: Travels = await req.json();

    if (!travelDetails) {
      return NextResponse.json(
        { error: "Credentails are required" },
        { status: 404 }
      );
    }

    const travel = await Travel.findOne({ where: { id } });

    if (!travel) {
      return NextResponse.json({ error: "Can't Find Travel" }, { status: 404 });
    }

    const updatedTravel = await getUpdatedTravel(travel, travelDetails);

    if (!updatedTravel) {
      return NextResponse.json(
        { error: "Can't Update Travel. something went wrong" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Travel Updated successfully", updatedTravel },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to Update Travel ${error}` },
      { status: 500 }
    );
  }
}
