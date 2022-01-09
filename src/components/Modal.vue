<template>
  <div class="modal" ref="modal" @click="modalClose">
    <div class="modal-wrap" ref="modalWrap" @click.stop>
      <label for="city-name">Enter location</label>
      <input type="text" name="city-name" v-model="city" />
      <button @click="addNewCity">Add</button>
    </div>
  </div>
</template>

<script>
import { addCity } from "../api";
export default {
  props: {
    cities: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      city: "",
    };
  },
  methods: {
    modalClose() {
      this.$emit("modal-close");
    },
    async addNewCity() {
      try {
        await addCity(this.city,this.cities).then(() => this.modalClose());
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  z-index: 101;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  label {
    color: #fff;
  }
  .modal-wrap {
    max-width: 500px;
    border-radius: 8px;
    width: 80%;
    padding: 20px;
    background-color: #31363d;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    input {
      color: #fff;
      border: none;
      background-color: transparent;
      border-bottom: 1px solid #fff;
      padding: 6px 4px;
      margin: 10px 0 20px;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
    button {
      background-color: #222325;
      color: #fff;
      padding: 6px 20px;
      border-radius: 8px;
      border: none;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
  }
}
</style>
