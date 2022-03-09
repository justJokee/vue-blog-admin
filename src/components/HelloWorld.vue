<template>
  <h1>{{ msg }}</h1>
  <button @click="bian">变化试试</button>
  测试组合式api：：：
  <h4>{{ obj.say1 }}</h4>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { obj } from "./say";
defineProps<{ msg: string }>();
function bian() {
  obj.say1.value = "看看中用吧";
}
const count = ref(0);
</script>
<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
