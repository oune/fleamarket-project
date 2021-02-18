<template>
  <v-app>
    <pcMenuBar />
    <v-main>
      <showDetail />
      <!-- <HelloWorld /> -->
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import pcMenuBar from "@/components/pcMenuBar";
import showDetail from "@/views/showDetail";

export default {
  name: "App",

  components: {
    // HelloWorld,
    pcMenuBar,
    showDetail,
  },

  data: () => ({
    //
  }),
};
</script>
