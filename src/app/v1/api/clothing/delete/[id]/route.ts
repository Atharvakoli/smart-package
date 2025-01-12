import Clothing from "@/models/Clothing";
import { NextResponse, NextRequest } from "next/server";

async function deleteClothing(existingClothing: Clothing) {
  try {
    return await existingClothing.destroy();
  } catch (error) {
    throw new Error(`Database query failed ${error}`);
  }
}

export async function DELETE(req: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params;

    if (!id) {
      return NextResponse.json({ error: "Id is required" }, { status: 400 });
    }

    const existingClothing = await Clothing.findOne({ where: { id } });

    if (!existingClothing) {
      return NextResponse.json(
        { error: "Can't Find Clohthing" },
        { status: 404 }
      );
    }

    const deletedClothing = await deleteClothing(existingClothing);

    if (!deleteClothing) {
      return NextResponse.json(
        {
          error: "Can't delete User, something went wrong.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Clothing deleted successfully", deletedClothing },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to Delete Clothing ${error}` },
      { status: 500 }
    );
  }
}
