<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import API from "@/services/api";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      config: {},
    };
  },
  created() {
    console.log(this.config?.test);
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await API.user.getUserInfo({
        username: "123",
      });
      console.log(res);
    },
  },
};
</script>
