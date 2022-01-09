<template>
  <div class="daily-forecast">
    <div>
      <span>{{ dateDay }}</span>
    </div>
    <div class="condition">
      <img :src="require(`../assets/img/${day.weather[0].icon}.svg`)" alt="" />
    </div>
    <div class="weather">
      <span class="high">{{ maxTemp }}&deg;</span>
      <span class="low">{{ minTemp }}&deg;</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    day: {
      type: Object,
      dafault: () => {},
    },
  },
  computed: {
    dateDay() {
      return new Date(this.day.dt * 1000).toLocaleString("en-us", {
        weekday: "long",
      });
    },
    maxTemp() {
      return Math.round(this.day.temp.max);
    },
    minTemp() {
      return Math.round(this.day.temp.min);
    },
  },
};
</script>

<style lang="scss" scoped>
.daily-forecast {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  div {
    flex: 1;
  }
  .condition {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 20px;
    }
  }
  .weather {
    display: flex;
    justify-content: flex-end;
    span {
      min-width: 20px;
    }
    .high {
      font-weight: 500;
      margin-right: 12px;
    }
  }
}
</style>
