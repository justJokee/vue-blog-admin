<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <h1>{{ a }}</h1>
  APP的OBJ:
  <h3>{{ obj.say1 }}</h3>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>
<script setup lang="ts">
import { ref } from "vue";
import { obj } from "./components/say";

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from "./components/HelloWorld.vue";
const a = ref(666);
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
