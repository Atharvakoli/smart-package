import Travel from "@/models/trip";
import { NextRequest, NextResponse } from "next/server";

async function deleteTravel(existingTravel: Travel) {
  try {
    await existingTravel.destroy();
  } catch (error) {
    throw new Error(`Database query failed ${error}`);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    if (!id) {
      return NextResponse.json({ error: "Id is required" }, { status: 404 });
    }

    const existingTravel = await Travel.findOne({ where: { id } });

    if (!existingTravel) {
      return NextResponse.json({ error: "Can't Find Travel" }, { status: 404 });
    }

    await deleteTravel(existingTravel);

    return NextResponse.json(
      { message: "Travel deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to Delete Travel ${error}` },
      { status: 500 }
    );
  }
}
