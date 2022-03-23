<template>
  <div class="mp-doc">
    <div class="mp-doc__editor">
      <doc-editor />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import docEditor from './Components/doc-editor.vue'
import { useRoute } from 'vue-router'
// const $router = useRouter()
const $route = useRoute()

watch($route, (to, from) => {
  console.log('这是路由---.>>>.', to, from)
})
</script>
<style lang="scss">
.mp-doc {
  &__editor {
  }
}
</style>
