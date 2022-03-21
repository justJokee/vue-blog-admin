<template>
  <div class="comp-layout">
    <div class="comp-layout__col comp-layout__col-0">
      <slot />
    </div>
    <div class="comp-layout__col comp-layout__col-1" v-if="props.column">
      <slot name="col-1" />
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { computed } from 'vue'
interface propsType {
  column: number
}
const props = withDefaults(defineProps<propsType>(), {
  column: 0
})
// const style = computed(() => {
//   const
// })
</script>
<style lang="scss">
.comp-layout {
  height: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0 -16px;
  &__col {
    line-height: normal;
    padding: 0 16px;
  }
  &__col-0 {
    flex-grow: 1;
  }
  &__col-1 {
    width: 320px;
    flex: 0 0 auto;
  }
}
</style>
