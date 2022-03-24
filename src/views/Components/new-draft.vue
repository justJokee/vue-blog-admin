<template>
  <div class="new-draft">
    <div class="new-draft__header">
      <i class="el-icon-circle-plus" />
      <div class="header__text">New Draft</div>
    </div>
    <div class="new-draft__body">
      <div class="body__line">点击创建文档您将新增一个</div>
      <div class="body__line">未经发布的</div>
      <div class="body__line">草稿</div>
    </div>
    <div class="new-draft__foot">
      <n-button size="large" type="info" @click="createDraft">创建文档</n-button>
    </div>
  </div>
  <doc-info :show="modalShow" :edit="0" @update:show="updateShow" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import docInfo from '@/views/Write/Components/doc-info.vue'
const modalShow = ref(false)

function createDraft() {
  modalShow.value = true
}
function updateShow(val: boolean) {
  modalShow.value = val
}
</script>

<style lang="scss">
@import '@/style/index.scss';
.new-draft {
  height: 100%;
  text-align: center;
  border-radius: 16px;
  padding: 32px 0;
  @include themeify() {
    background: themed('bg-draft');
  }
  [class^='el-icon'] {
    font-size: 48px;
    @include themeify() {
      color: themed('color-ele-primary');
    }
  }
  &__header {
    .header__text {
      margin-top: 10px;
      font-size: 18px;
    }
  }
  &__body {
    line-height: 2;
    padding: 12px 0;
    font-size: 12px;
    @include themeify() {
      color: themed('color-text-comment');
    }
  }
  &__foot {
    margin-top: 24px;
    .n-button {
      background: #fff;
      @include themeify() {
        color: themed('color-ele-primary');
      }
      padding-left: 32px;
      padding-right: 24px;
      .n-button__border {
        border: none;
      }
    }
  }
}
</style>
