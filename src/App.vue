<template>
  <v-app>
    <pcMenuBar />
    <v-main>
      <showDetailAdmin />
      <!-- <HelloWorld /> -->
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
import pcMenuBar from "@/components/pcMenuBar";
import showDetailAdmin from "@/views/showDetailAdmin";

export default {
  name: "App",

  components: {
    // HelloWorld,
    pcMenuBar,
    showDetailAdmin,
  },

  data: () => ({
    //
  }),
};
</script>
