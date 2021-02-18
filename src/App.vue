<template>
  <v-app>
    <pcMenuBar />
    <v-main>
      <HelloWorld />
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import pcMenuBar from "@/components/pcMenuBar";

export default {
  name: "App",

  components: {
    HelloWorld,
    pcMenuBar,
  },

  data: () => ({
    //
  }),
};
</script>
