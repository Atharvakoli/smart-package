const {
  getWeather,
  getWeatherForcast,
  getWeatherHistory,
  getAlerts,
  getFutureWheather,
} = require("../service/index.service");
const {
  validateDetails,
  validateHistoryDetails,
  validateFutureDetails,
  validateAlertDetails,
} = require("./validation/validate");

const currentWeather = async (req, res) => {
  try {
    let { q } = req.query;

    let errors = validateDetails(q);

    if (errors.length > 0) {
      return res.status(404).json({ errors });
    }

    const response = await getWeather(q);

    if (response === null) {
      return res.status(400).json({ message: "Something went wrong" });
    }
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: `Current weather Error: ${error.message}` });
  }
};

const weatherForcast = async (req, res) => {
  try {
    let { q, days } = req.query;

    let errors = validateDetails(q, days);

    if (errors.length > 0) {
      return res.status(404).json({ errors });
    }

    const response = await getWeatherForcast(q, days);

    if (response === null) {
      return res.status(400).json({ message: "Something went wrong" });
    }
    res.json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Current weather Forcast Error: ${error.message}` });
  }
};

const weatherHistory = async (req, res) => {
  try {
    let { q, dt } = req.query;

    let errors = validateHistoryDetails(q, dt);

    if (errors.length > 0) {
      return res.status(404).json({ errors });
    }
    console.log(errors);

    const response = await getWeatherHistory(q, dt);

    if (response === null) {
      return res.status(400).json({ message: "Something went wrong" });
    }
    res.json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Current weather History Error: ${error.message}` });
  }
};

const weatherAlerts = async (req, res) => {
  try {
    let { q } = req.query;

    let errors = validateAlertDetails(q);

    if (errors.length > 0) {
      return res.status(404).json({ errors });
    }

    const response = await getAlerts(q);

    if (response === null) {
      return res.status(400).json({ message: "Something went wrong" });
    }
    res.json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Current weather Alerts Error: ${error.message}` });
  }
};

const futureWeather = async (req, res) => {
  try {
    let { q, dt } = req.query;

    let errors = validateFutureDetails(q, dt);

    if (errors.length > 0) {
      return res.status(404).json({ errors });
    }

    const response = await getFutureWheather(q, dt);

    if (response === null) {
      return res.status(400).json({ message: "Something went wrong" });
    }
    res.json(response);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Current weather Alerts Error: ${error.message}` });
  }
};

module.exports = {
  currentWeather,
  weatherForcast,
  weatherHistory,
  weatherAlerts,
  futureWeather,
};
