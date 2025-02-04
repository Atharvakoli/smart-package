import { Trip } from "@/models/trip";
import { NextResponse } from "next/server";

async function getUpdatedTrip(trip, tripDetails) {
  try {
    trip.set({
      location: tripDetails.location ?? trip.location,
      start_date: tripDetails.start_date ?? trip.start_date,
      end_date: tripDetails.end_date ?? trip.end_date,
      num_people: tripDetails.num_people ?? trip.num_people,
    });

    await trip.save();
    return travel;
  } catch (error) {
    throw new Error(`Database query failed ${error}`);
  }
}

export async function PUT(req, context) {
  try {
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ error: "Id is required" }, { status: 404 });
    }
    const tripDetails = await req.json();

    if (!tripDetails) {
      return NextResponse.json(
        { error: "Credentails are required" },
        { status: 404 }
      );
    }

    const trip = await Trip.findOne({ where: { id } });

    if (!trip) {
      return NextResponse.json({ error: "Can't Find Trip" }, { status: 404 });
    }

    const updatedTrip = await getUpdatedTrip(trip, tripDetails);

    if (!updatedTrip) {
      return NextResponse.json(
        { error: "Can't Update Trip. something went wrong" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Trip Updated successfully", updatedTrip },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to Update Trip ${error.message}` },
      { status: 500 }
    );
  }
}
