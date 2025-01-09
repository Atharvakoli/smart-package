import { NextRequest, NextResponse } from "next/server";
import { getSearchPhotos } from "../../../../../../database/service/index.service";
import { validateDetails } from "../../../../../../database/controllers/validation/validate";

export async function GET(
  req: NextRequest,
  { params }: { params: { query: string } }
) {
  try {
    const { query } = await params;
    const errors = validateDetails(query);
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }
    const photos = await getSearchPhotos(query);
    return NextResponse.json({ photos }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed Get photos ${error}` },
      { status: 500 }
    );
  }
}
