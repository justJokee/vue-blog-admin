<template>
  <h1>{{ msg }}</h1>
  <button @click="bian">change</button>
  <h4>{{ obj.say1 }}</h4>
</template>

<script setup lang="ts">
import { obj } from './say'
defineProps<{ msg: string }>()
function bian() {
  obj.say1.value = 'oops'
}
// const demo = 'test eslint'
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
