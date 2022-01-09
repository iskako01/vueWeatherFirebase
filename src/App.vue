<template>
  <div class="main">
    <Loading v-if="loading" />

    <div class="app" v-else>
      <Modal v-if="modalOpen" @modal-close="modalClose" :cities="cities" />
      <Navigation
        @add-city="addCity"
        @edit-city="editCity"
        :isEdit="isEdit"
        :addCityActive="addCityActive"
        :isDay="isDay"
        :isNight="isNight"
      />
      <router-view
        :cities="cities"
        :isEdit="isEdit"
        :isDay="isDay"
        :isNight="isNight"
        @is-day="dayTime"
        @is-night="nightTime"
        @resetDays="resetDays"
        @add-new-city="addCity"
        :loading="loading"
      />
    </div>
  </div>
</template>

<script>
import Modal from "./components/Modal.vue";
import Loading from "./components/Loading.vue";
import Navigation from "./components/Navigation.vue";
import { fetchApiWeather } from "./api";
import axios from "axios";
import { db } from "./firebase";

export default {
  name: "App",
  components: { Navigation, Modal, Loading },
  data() {
    return {
      loading: true,
      cityName: "Tokio",
      cities: [],
      modalOpen: false,
      isEdit: false,
      isDay: false,
      isNight: false,
      apiKey: "7941a0b4aae276f33c7eb474f5cb1f73",
      addCityActive: false,
    };
  },

  async created() {
    await fetchApiWeather(this.cityName);
    await this.getCityWeather();
    this.checkRoute();
  },

  methods: {
    addCity() {
      this.modalOpen = true;
    },
    editCity() {
      this.isEdit = !this.isEdit;
    },
    modalClose() {
      this.modalOpen = false;
    },
    async getCityWeather() {
      let firebaseCollection = db.collection("cities");

      firebaseCollection.onSnapshot((snap) => {
        if (snap.docs.length === 0) {
          this.loading = false;
        }
        snap.docChanges().forEach(async (doc) => {
          if (doc.type === "removed") {
            this.cities = this.cities.filter(
              (city) => city.city !== doc.doc.data().city
            );
          }
          if (doc.type === "added" && !doc.doc.Nd) {
            try {
              const data = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${
                  doc.doc.data().city
                }&units=imperial&APPID=${this.apiKey}`
              );

              firebaseCollection
                .doc(doc.doc.id)
                .update({
                  currentWeather: data.data,
                })
                .then(() => {
                  this.cities.push(doc.doc.data());
                  this.loading = false;
                });
            } catch (error) {
              console.log(error);
            }
          } else if (doc.type === "added" && doc.doc.Nd) {
            this.cities.push(doc.doc.data());
          }
        });
      });
    },
    checkRoute() {
      if (this.$route.name === "addCity") {
        this.addCityActive = true;
      } else {
        this.addCityActive = false;
      }
    },
    dayTime() {
      this.isDay = !this.isDay;
    },
    nightTime() {
      this.isNight = !this.isNight;
    },
    resetDays() {
      this.isDay = false;
      this.isNight = false;
    },
  },
  watch: {
    $route() {
      this.checkRoute();
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}
.day {
  transition: 500ms ease all;
  background-color: rgb(59, 150, 249);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.night {
  transition: 500ms ease all;
  background-color: rgb(20, 42, 95);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
.main {
  max-width: 1024px;
  margin: 0 auto;
  height: 100vh;
  .container {
    padding: 0 20px;
  }
}
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
</style>
