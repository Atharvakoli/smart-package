import { NextResponse } from "next/server";
import { validateWeatherForecastDetails } from "../../../../../../../database/controllers/validation/validate";
import { getWeatherForcast } from "../../../../../../../database/service/index.service";

export async function GET(req, context) {
  try {
    const { query, days } = await context.params;

    const errors = validateWeatherForecastDetails(query, parseInt(days));

    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const weatherForecast = await getWeatherForcast(query, days);

    if (!weatherForecast) {
      return NextResponse.json(
        { error: "Weather forecast details, NOT FOUND" },
        { status: 404 }
      );
    }

    return NextResponse.json({ weatherForecast }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `failed to get Weather forcast ${error.message}` },
      { status: 500 }
    );
  }
}
