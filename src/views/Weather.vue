<template>
  <div class="main">
    <Loading v-if="!load" />
    <div class="weather" :class="{ day: isDay, night: isNight }" v-else>
      <div class="weather-wrap">
        <current-weather
          :currentWeather="currentWeather"
          :isDay="isDay"
          :isNight="isNight"
        />
        <hourly-weather :forecast="forecast" />
        <weekly-forecast :forecast="forecast" />
        <additional-info :currentWeather="currentWeather" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { db } from "../firebase";
import Loading from "../components/Loading.vue";
import CurrentWeather from "../components/CurrentWeather.vue";
import HourlyWeather from "../components/HourlyWeather.vue";
import WeeklyForecast from "../components/WeeklyForecast.vue";
import AdditionalInfo from "../components/AdditionalInfo.vue";

export default {
  name: "Weather",
  components: {
    Loading,
    CurrentWeather,
    HourlyWeather,
    WeeklyForecast,
    AdditionalInfo,
  },
  props: {
    loading: {
      type: Boolean,
    },
    isDay: {
      type: Boolean,
      default: false,
    },
    isNight: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      apiKey: "7941a0b4aae276f33c7eb474f5cb1f73",
      forecast: null,
      currentWeather: null,
      currentTime: null,
      load: this.loading,
    };
  },
  created() {
    this.getWeather();
    console.log(this.load);
  },
  beforeUnmount() {
    this.$emit("resetDays");
  },
  methods: {
    getWeather() {
      db.collection("cities")
        .where("city", "==", `${this.$route.params.city}`)
        .get()
        .then((docs) => {
          console.log(this.$route.params.city);
          docs.forEach((doc) => {
            this.currentWeather = doc.data().currentWeather;
            axios
              .get(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${
                  doc.data().currentWeather.coord.lat
                }&lon=${
                  doc.data().currentWeather.coord.lon
                }&exclude=current,minutley,alerts&units=imperial&appid=${
                  this.apiKey
                }`
              )
              .then((res) => {
                this.forecast = res.data;
              })
              .then(() => {
                this.load = true;
                this.getCurrentTime();
              });
          });
        });
    },
    getCurrentTime() {
      const dateObject = new Date();
      this.currentTime = dateObject.getHours();
      const sunrise = new Date(
        this.currentWeather.sys.sunrise * 1000
      ).getHours();
      const sunset = new Date(this.currentWeather.sys.sunset * 1000).getHours();
      if (this.currentTime > sunrise && this.currentTime < sunset) {
        this.$emit("is-day");
      } else {
        this.$emit("is-night");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.loading {
  @keyframes spin {
    to {
      transform: rotateZ(360deg);
    }
  }
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  span {
    display: block;
    width: 60px;
    height: 60px;
    margin: 0 auto;
    border: 2px solid transparent;
    border-top-color: #142a5f;
    border-radius: 50%;
    animation: spin ease 1000ms infinite;
  }
}
.weather {
  transition: 500ms ease;
  overflow: scroll;
  width: 100%;
  height: 100%;
  .weather-wrap {
    overflow: hidden;
    max-width: 1024px;
    margin: 0 auto;
  }
}
</style>
