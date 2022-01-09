<template>
  <div class="weekly-forecast">
    <div class="container">
      <div class="daily" v-for="(day, index) in filteredList" :key="index">
        <daily-forecast :day="day" />
      </div>
    </div>
  </div>
</template>

<script>
import DailyForecast from "./DailyForecast.vue";

export default {
  components: { DailyForecast },
  props: {
    forecast: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    filteredList() {
      return this.forecast.daily.slice(0, 8);
    },
  },
};
</script>
<style lang="scss" scoped>
.weekly-forecast {
  padding: 30px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.7);
  .daily {
    margin-bottom: 24px;
  }
  .daily:last-child {
    margin-bottom: 0;
  }
}
</style>
