<template>
  <div class="home-site">
    <n-card title="网站概况" :bordered="false">
      <div class="home-site__content">
        <ul>
          <li>
            <span>访问总量</span>
            <span>{{ viewersCount?.total }}</span>
          </li>
          <li>
            <span>最近访问</span>
            <span>{{ formatDate(viewersCount?.latest.date) }}</span>
          </li>
          <li>
            <span>部署环境</span>
            <span>阿里云</span>
          </li>
          <li>
            <span>占位符</span>
            <span>有待开发</span>
          </li>
        </ul>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { viewersCountSchema } from '@/types/'
import { formatDate } from '@/utils/formatDate'

import api from '@/api/home'
const viewersCount = ref<viewersCountSchema['res']>()
onMounted(async () => {
  const { data, status } = await api.getViewersCount()
  if (status === 200) {
    viewersCount.value = data
  }
})
</script>

<style lang="scss">
.home-site {
  width: 100%;
  height: 100%;
  &__content {
    li {
      padding: 12px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
