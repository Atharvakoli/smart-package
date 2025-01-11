import "dotenv/config";
import axiosInstance, { axiosInstance1 } from "../lib/axios.lib";
async function getWeather(query) {
  const response = await axiosInstance.get(
    `/current.json?key=${process.env.API_KEY}&q=${query}&aql=yes`
  );
  return response.data;
}

async function getWeatherForcast(query, days) {
  const response = await axiosInstance.get(
    `/forecast.json?key=${process.env.API_KEY}&q=${query}&days=${days}&aql=yes`
  );
  return response.data;
}

async function getWeatherHistory(query, dt) {
  const response = await axiosInstance.get(
    `/history.json?key=${process.env.API_KEY}&q=${query}&dt=${dt}`
  );
  return response.data;
}

async function getAlerts(query) {
  const response = await axiosInstance.get(
    `/alerts.json?key=${process.env.API_KEY}&q=${query}`
  );
  return response.data;
}

async function getSearchPhotos(query) {
  let photos = [];
  const response = await axiosInstance1.get(
    `/search/photos?query=${query}&page=1&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  );

  for (let i = 0; i < 10; i++) {
    photos.push(response.data.results[i]);
  }

  return photos;
}

const weatherConditions = [
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
}) {
  let errors = [];
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

export {
  getWeather,
  getAlerts,
  getWeatherHistory,
  getWeatherForcast,
  getSearchPhotos,
  weatherConditions,
  validateTripDetails,
};
