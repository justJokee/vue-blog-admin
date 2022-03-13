<template>
  <div class="mp-write">
    <comp-editor v-model="content" :init-value="initValue" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CompEditor from '@/components/Editor/CompEditor.vue'
const content = ref('')
const initValue = ref('')
</script>

<style lang="scss"></style>
