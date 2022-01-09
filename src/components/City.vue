<template>
  <div class="city" @click="weatherView">
    <i
      v-if="isEdit"
      class="far fa-trash-alt edit"
      @click="removeCity(city)"
    ></i>
    <span>{{ city.city }}</span>
    <div class="weather">
      <span>{{ cityTemp }}&deg;</span>
      <img :src="require(`../assets/img/${weatherIcon}.svg`)" alt="" />
    </div>
    <div class="video">
      <video
        autoplay
        loop
        muted
        :src="require(`../assets/video/${weatherIcon}.mp4`)"
      ></video>
      <div class="bg-overlay"></div>
    </div>
  </div>
</template>

<script>
import { removeCityFirebase } from "../api";

export default {
  name: "City",
  props: {
    city: {
      type: Object,
      default: () => {},
    },
    cities: {
      type: Array,
      default: () => [],
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      cityTemp: Math.round(this.city.currentWeather.main.temp),
      weatherIcon: this.city.currentWeather.weather[0].icon,
      id: null,
    };
  },

  methods: {
    removeCity(city) {
      removeCityFirebase(city.city, this.id);
    },
    weatherView() {
      if (!this.isEdit) {
        this.$router.push(`/weather/${this.city.city}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.city {
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 20px;
  flex-basis: 50%;
  min-height: 250px;
  color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  .edit {
    cursor: pointer;
    border-radius: 0px 15px 0 0;
    border: 10px solid rgb(77, 77, 77);
    background-color: rgb(77, 77, 77);
    z-index: 1;
    font-size: 20px;
    position: absolute;
    bottom: 0px;
    left: 0px;
  }
  span {
    z-index: 1;
    text-transform: capitalize;
    display: block;
    font-size: 25px;
    font-weight: 600;
  }
  .weather {
    display: flex;
    z-index: 1;
    justify-content: flex-end;
    align-items: flex-end;
    flex: 1;
    span {
      font-size: 35px;
      margin-right: 8px;
    }
    img {
      height: 20px;
      width: auto;
    }
  }
  .video {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    video {
      height: 100%;
      @media (min-width: 900px) {
        height: auto;
        width: 100%;
      }
    }
    .bg-overlay {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>
