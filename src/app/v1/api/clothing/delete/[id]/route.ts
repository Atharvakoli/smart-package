import Clothing from "@/models/Clothing";
import { NextResponse, NextRequest } from "next/server";

async function deleteClothing(existingClothing: Clothing) {
  try {
    await existingClothing.destroy();
    return true;
  } catch (error) {
    throw new Error(`Database query failed: ${error}`);
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const existingClothing = await Clothing.findOne({ where: { id } });

    if (!existingClothing) {
      return NextResponse.json(
        { error: "Clothing not found" },
        { status: 404 }
      );
    }

    const isDeleted = await deleteClothing(existingClothing);

    if (!isDeleted) {
      return NextResponse.json(
        { error: "Failed to delete clothing, something went wrong" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Clothing deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to delete clothing: ${error}` },
      { status: 500 }
    );
  }
}
