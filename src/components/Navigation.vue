<template>
  <div>
    <header v-if="addCityActive" class="container add-city">
      <nav>
        <router-link to="/"><span>Add city</span></router-link>
        <div class="right">
          <i
            class="far fa-edit"
            :class="{ 'edit-active': isEdit }"
            @click="editCity"
          ></i>
          <i class="fas fa-sync" @click="reloadApp"></i>
          <i class="fas fa-plus" @click="addCity"></i>
        </div>
      </nav>
    </header>
    <header v-else class="container" :class="{ day: isDay, night: isNight }">
      <nav>
        <router-link to="/" class="router-link">
          <i class="fas fa-plus"></i>
        </router-link>
        <span
          >{{ new Date().toLocaleString("en-us", { weekday: "short" }) }},
          {{ new Date().toLocaleString("en-us", { month: "short" }) }}
          {{ new Date().toLocaleString("en-us", { day: "2-digit" }) }}</span
        >
        <span>&deg; F</span>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    addCityActive: {
      type: Boolean,
      default: false,
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
    return {};
  },
  methods: {
    addCity() {
      this.$emit("add-city");
    },
    editCity() {
      this.$emit("edit-city");
    },
    reloadApp() {
      location.reload();
    },
  },
};
</script>

<style lang="scss" scoped>
.add-city {
  background-color: #313640;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
header {
  z-index: 99;
  position: fixed;
  max-width: 1024px;
  width: 100%;
  nav {
    display: flex;
    color: #fff;
    padding: 30px 0;
    justify-content: space-between;
  }
  .edit-active {
    color: rgba(210, 75, 75, 1);
  }
  .router-link {
    color: #fff;
  }
  .right {
    i {
      font-size: 20px;
    }
    i:nth-child(2),
    i:nth-child(3) {
      margin-left: 16px;
    }
  }
  span {
    font-weight: 600;
    color: #fff;
  }
}
</style>
