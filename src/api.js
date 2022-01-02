import axios from "axios";

const apiKey = "7941a0b4aae276f33c7eb474f5cb1f73";

export async function fetchApiWeather(cityName) {
  const data = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&APPID=${apiKey}`
  );
  return data.data;
}
