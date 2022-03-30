<template>
  <div class="mp-exportdb">
    <div class="mp-exportdb__cheer">
      <span class="cheer-emoji">😼</span>
      <span class="cheer-info">~别看了，就一个按钮~</span>
      <span class="cheer-emoji">🇨🇳</span>
    </div>
    <n-space justify="center">
      <n-spin :show="show">
        <n-button @click="dumpdb">
          <template #icon>
            <i class="el-icon-download" />
          </template>
          数据库备份
        </n-button>
      </n-spin>
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '@/api/'
import { download } from '@/utils/download'
const show = ref(false)
async function dumpdb() {
  show.value = true
  const res = await api.mongodump()
  download(res)
  show.value = false
}
</script>

<style lang="scss">
.mp-exportdb {
  padding: 42px;
  &__cheer {
    padding: 20px 0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    .cheer-info {
      display: inline-block;
      padding: 0 20px;
      // color: rgb(204, 204, 204);
    }
    .cheer-emoji {
      font-size: 42px;
    }
  }
}
</style>
