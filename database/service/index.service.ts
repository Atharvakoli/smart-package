import "dotenv/config";
import jwt, { JwtPayload } from "jsonwebtoken";
import axiosInstance, { axiosInstance1 } from "../lib/axios.lib";

interface Users {
  id: string;
  email: string;
}

interface TripDetails {
  user_id: string;
  location: string;
  start_date: string;
  end_date: string;
  sex: string;
  num_people: number;
  activity_type: string[];
  frequency: string;
}

interface WeatherResponse {
  data: any;
}

async function getWeather(query: string): Promise<any> {
  const response: WeatherResponse = await axiosInstance.get(
    `/current.json?key=${process.env.API_KEY}&q=${query}&aql=yes`
  );
  return response.data;
}

async function getWeatherForcast(query: string, days: number): Promise<any> {
  const response: WeatherResponse = await axiosInstance.get(
    `/forecast.json?key=${process.env.API_KEY}&q=${query}&days=${days}&aql=yes`
  );
  return response.data;
}

async function getWeatherHistory(query: string, dt: string): Promise<any> {
  const response: WeatherResponse = await axiosInstance.get(
    `/history.json?key=${process.env.API_KEY}&q=${query}&dt=${dt}`
  );
  return response.data;
}

async function getAlerts(query: string): Promise<any> {
  const response: WeatherResponse = await axiosInstance.get(
    `/alerts.json?key=${process.env.API_KEY}&q=${query}`
  );
  return response.data;
}

async function getSearchPhotos(query: string): Promise<any[]> {
  const photos: any[] = [];
  const response = await axiosInstance1.get(
    `/search/photos?query=${query}&page=1&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  for (let i = 0; i < Math.min(10, response.data.results.length); i++) {
    photos.push(response.data.results[i]);
  }

  return photos;
}

const weatherConditions: string[] = [
  "Sunny",
  "Clear",
  "Partly cloudy",
  "Cloudy",
  "Overcast",
  "Mist",
  "Patchy rain possible",
  "Patchy snow possible",
  "Patchy sleet possible",
  "Patchy freezing drizzle possible",
  "Thundery outbreaks possible",
  "Blowing snow",
  "Blizzard",
  "Fog",
  "Freezing fog",
  "Patchy light drizzle",
  "Light drizzle",
  "Freezing drizzle",
  "Heavy freezing drizzle",
  "Patchy light rain",
  "Light rain",
  "Moderate rain at times",
  "Moderate rain",
  "Heavy rain at times",
  "Heavy rain",
  "Light freezing rain",
  "Moderate or heavy freezing rain",
  "Light sleet",
  "Moderate or heavy sleet",
  "Patchy light snow",
  "Light snow",
  "Patchy moderate snow",
  "Moderate snow",
  "Patchy heavy snow",
  "Heavy snow",
  "Ice pellets",
  "Light rain shower",
  "Moderate or heavy rain shower",
  "Torrential rain shower",
  "Light sleet showers",
  "Moderate or heavy sleet showers",
  "Light snow showers",
  "Moderate or heavy snow showers",
  "Light showers of ice pellets",
  "Moderate or heavy showers of ice pellets",
  "Patchy light rain with thunder",
  "Moderate or heavy rain with thunder",
  "Patchy light snow with thunder",
  "Moderate or heavy snow with thunder",
];

function validateTripDetails({
  user_id,
  location,
  start_date,
  end_date,
  sex,
  num_people,
  activity_type,
  frequency,
}: TripDetails): string[] {
  const errors: string[] = [];
  if (!user_id || typeof user_id !== "string") {
    errors.push("user_id is required and should be string");
  }
  if (!location || typeof location !== "string") {
    errors.push("location is required and should be string");
  }
  if (!start_date || typeof start_date !== "string") {
    errors.push("startDate is required and should be string");
  }
  if (!end_date || typeof end_date !== "string") {
    errors.push("endDate is required and should be string");
  }
  if (!sex || typeof sex !== "string") {
    errors.push("sex is required and should be string");
  }
  if (!num_people || typeof num_people !== "number") {
    errors.push("travelers is required and should be number");
  }
  if (!activity_type || !Array.isArray(activity_type)) {
    errors.push("activityTypes is required and should be an array");
  }
  if (!frequency || typeof frequency !== "string") {
    errors.push("frequency is required and should be string");
  }
  return errors;
}

function generateAccessToken(user: Users): string {
  const payload = { id: user.id, email: user.email };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRATION || "1h",
  });

  return accessToken;
}

function verifyAccessToken(token: string): JwtPayload | string {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded;
  } catch (error) {
    throw new Error(`Invalid or expired token: ${error.message}`);
  }
}

export {
  getWeather,
  getAlerts,
  getWeatherHistory,
  getWeatherForcast,
  getSearchPhotos,
  weatherConditions,
  validateTripDetails,
  verifyAccessToken,
  generateAccessToken,
};
