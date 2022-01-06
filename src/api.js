import axios from "axios";
import { db } from "./firebase";

const apiKey = "7941a0b4aae276f33c7eb474f5cb1f73";

export async function fetchApiWeather(cityName) {
  const data = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&APPID=${apiKey}`
  );
  return data.data;
}

export async function addCity(cityName) {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&APPID=${apiKey}`
  );
  const data = await response.data;
  db.collection("cities").doc().set({
    city: cityName,
    currentWeather: data,
  });
}

export async function removeCityFirebase(city, id) {
  db.collection("cities")
    .where("city", "==", `${city}`)
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        id = doc.id;
      });
    })
    .then(() => {
      db.collection("cities").doc(id).delete();
    });
}
