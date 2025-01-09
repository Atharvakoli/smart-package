// validations of wheatherData
const validateDetails = (q) => {
  let errors = [];
  if (!q || typeof q !== "string")
    errors.push("Query is required and should be string.");
  return errors;
};

const validateWeatherForecastDetails = (q, days) => {
  let errors = [];
  if (!q || typeof q !== "string") {
    errors.push("Query is required and should be string.");
  } else if (!days || typeof days !== "number") {
    errors.push("days is required and should be number.");
  }
  return errors;
};

function validateWeatherFutureDetails(q, dt) {
  let errors = [];
  if (!q || typeof q !== "string") {
    errors.push("Query is required and should be string.");
  } else if (!dt || typeof dt !== "string") {
    errors.push("date is required and should be string.");
  }
  return errors;
}

export {
  validateDetails,
  validateWeatherForecastDetails,
  validateWeatherFutureDetails,
};
