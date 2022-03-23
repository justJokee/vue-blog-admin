<template>
  <ol class="tree-folder">
    <li v-for="(catalog, index) in catalogs" :key="catalog.level + '_' + index">
      <div class="tree-folder__content">
        <div class="tree-folder__order">
          <span v-if="(catalog.order + '').includes('.')">{{ catalog.order }}</span>
          <span v-else>{{ catalog.order }}.</span>
        </div>
        <span>{{ catalog.name }}</span>
      </div>
      <tree-folder v-if="catalog.children && catalog.children.length" :catalogs="catalog.children" :cur-index="index" />
    </li>
    <div class="tree-folder__empty" v-if="!catalogs.length">暂未匹配到目录</div>
  </ol>
</template>

<script lang="ts" setup>
import { flatTree } from '@/types/'

interface propsType {
  catalogs: Array<flatTree>
}

defineProps<propsType>()
</script>

<style lang="scss">
.tree-folder {
  ol,
  li {
    list-style-type: none;
  }
  padding-left: 12px;
  &__content {
    transition: all ease 0.38s;
    cursor: pointer;
    padding: 6px;
  }

  &__order {
    display: inline-block;
    margin-right: 8px;
  }
  &__empty {
    font-size: 12px;
    text-align: center;
    color: '#c0c4cc';
  }
}
</style>
