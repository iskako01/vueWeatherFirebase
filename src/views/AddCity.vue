<template>
  <div>
    <div class="no-cities" v-if="cities.length === 0">
      <p>No cities added, add new one?</p>
      <button @click="addNewCity">Add city</button>
    </div>
    <div class="grid" v-else>
      <div class="city-link" v-for="city in cities" :key="city">
        <City :city="city" :isEdit="isEdit" :cities="cities" />
      </div>
    </div>
  </div>
</template>

<script>
import City from "../components/City.vue";

export default {
  components: { City },
  props: {
    cities: {
      type: Array,
      default: () => [],
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    addNewCity() {
      this.$emit("add-new-city");
    },
  },
};
</script>

<style lang="scss" scoped>
.no-cities {
  position: absolute;
  min-height: 100vh;
  max-width: 1024px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  background-color: #313640;
}
button {
  margin-top: 16px;
  padding: 8px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: 500ms ease all;
  &:hover {
    outline: none;
    transform: scale(0.98);
  }
  &:focus {
    outline: none;
  }
}
.grid {
  display: grid;
  padding-top: 81px;
  background-color: #31363d;
  width: 100%;
  min-height: 100vh;
  grid-auto-rows: 250px;
  @media (min-width: 400px) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
