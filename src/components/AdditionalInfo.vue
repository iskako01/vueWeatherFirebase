<template>
  <div class="additional-info">
    <div>
      <span>Sunrise</span>
      <span>{{ timeSunrise }}</span>
    </div>
    <div>
      <span>Sunset</span>
      <span>{{ timeSunset }}</span>
    </div>
    <div>
      <span>Humidity</span>
      <span>{{ currentWeather.main.humidity }} %</span>
    </div>
    <div>
      <span>Cloudness</span>
      <span>{{ currentWeather.clouds.all }} %</span>
    </div>
    <div>
      <span>Wind</span>
      <span>{{ windSpeed }} mph</span>
    </div>
    <div>
      <span>Pressure</span>
      <span>{{ currentWeather.main.pressure }} hPa</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentWeather: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    timeSunrise() {
      return new Date(this.currentWeather.sys.sunrise * 1000).toLocaleString(
        "en-us",
        {
          timeStyle: "short",
        }
      );
    },
    timeSunset() {
      return new Date(this.currentWeather.sys.sunset * 1000).toLocaleString(
        "en-us",
        {
          timeStyle: "short",
        }
      );
    },
    windSpeed() {
      return Math.round(this.currentWeather.wind.speed);
    },
  },
};
</script>

<style lang="scss" scoped>
.additional-info {
  padding: 30px 20px;
  display: flex;
  flex-wrap: wrap;
  color: #fff;
  > div {
    display: flex;
    flex-direction: column;
    flex-basis: 50%;
    margin-bottom: 20px;
    span:nth-child(1) {
      font-size: 12px;
      margin-bottom: 8px;
    }
    span:nth-child(2) {
      font-weight: 600;
    }
  }
  div:nth-child(5),
  div:nth-child(6) {
    margin-bottom: 0;
  }
}
</style>
