<template>
  <div class="mp-doc">
    <transition mode="out-in">
      <div class="mp-ddoc__info" v-if="!$route.params.articleId">
        <doc-info :edit="edit" ref="docInfoRef" />
      </div>
      <div class="mp-ddoc__editor" v-else>
        <doc-editor />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import docInfo from './Components/doc-info.vue'
import docEditor from './Components/doc-editor.vue'
import { useRoute } from 'vue-router'
// const $router = useRouter()
const docInfoRef = ref()
const $route = useRoute()

const edit = ref(1)
watch($route, (to, from) => {
  console.log('这是路由---.>>>.', to, from)
})
</script>
<style lang="scss">
.mp-doc {
  &__info {
  }
  &__editor {
  }
}
</style>
