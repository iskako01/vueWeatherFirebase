<template>
  <header class="container add-city">
    <nav>
      <router-link to="/"><span>Add city</span></router-link>
      <div class="right">
        <i class="far fa-edit"></i>
        <i class="fas fa-sync"></i>
        <i class="fas fa-plus" @click="addCity"></i>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      cities: [],
    };
  },
  methods: {
    addCity() {
      this.$router.push("/");
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
    color: #fff;
    font-weight: 600;
  }
}
</style>
