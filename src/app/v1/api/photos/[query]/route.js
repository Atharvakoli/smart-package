import { NextResponse } from "next/server";
import { getSearchPhotos } from "../../../../../../database/service/index.service";

export async function GET(req, context) {
  try {
    const { query } = await context.params;

    const photos = await getSearchPhotos(query);

    if (!photos) {
      return NextResponse.json(
        { error: "Photos details, NOT FOUND" },
        { status: 404 }
      );
    }

    return NextResponse.json({ photos }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `failed to get Weather forcast ${error.message}` },
      { status: 500 }
    );
  }
}
