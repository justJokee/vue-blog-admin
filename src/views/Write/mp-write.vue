<template>
  <div class="mp-write">
    <comp-editor v-model="content" :init-value="initValue" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import api from '@/api/article'

import CompEditor from '@/components/Editor/CompEditor.vue'
const content = ref('')
const initValue = ref(
  '<p>js</p><pre class="language-javascript ql-syntax"><code><span class="hljs-keyword">const</span> a = <span class="hljs-number">111</span>\n</code></pre><p>css</p><pre class="language-css ql-syntax"><code>.css {\n  font-size: 12px;\n}\n</code></pre>'
)
</script>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  async mounted() {}
})
</script>
<style lang="scss"></style>
