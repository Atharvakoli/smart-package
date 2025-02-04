import { Trip } from "@/models/trip";
import { NextResponse } from "next/server";

async function deleteTrip(existingTrip) {
  try {
    await existingTrip.destroy();
  } catch (error) {
    throw new Error(`Database query failed ${error}`);
  }
}

export async function DELETE(req, context) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "Id is required" }, { status: 404 });
    }

    const existingTrip = await Trip.findOne({ where: { id } });

    if (!existingTrip) {
      return NextResponse.json({ error: "Can't Find Trip" }, { status: 404 });
    }

    await deleteTrip(existingTrip);

    return NextResponse.json(
      { message: "Trip deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to Delete Trip ${error}` },
      { status: 500 }
    );
  }
}
