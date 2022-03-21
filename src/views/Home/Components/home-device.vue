<template>
  <div class="home-device">
    <n-grid x-gap="24" :cols="2">
      <n-gi>
        <n-card title="浏览器偏好" :bordered="false">
          <div class="home-device__browser" />
        </n-card>
      </n-gi>
      <n-gi>
        <n-card title="操作系统" :bordered="false">
          <div class="home-device__system" />
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { deviceSchema, ECOption } from '@/types/'
import echarts from '@/utils/echarts'
import api from '@/api/home'
const device = ref<deviceSchema['res']>()
let broInstance = ref<echarts.ECharts>()
let sysInstance = ref<echarts.ECharts>()
onMounted(async () => {
  const { data, status } = await api.getDevice()
  if (status === 200) {
    device.value = data
    initBrowserPie()
    initSystemPie()
  }
})
function initBrowserPie() {
  const el = document.querySelector('.home-device__browser')
  const option: ECOption = {
    tooltip: {},
    series: [
      {
        type: 'pie',
        data: device.value?.browser
      }
    ]
  }
  broInstance.value = echarts.init(el as HTMLElement)
  broInstance.value.setOption(option)
}
function initSystemPie() {
  const el = document.querySelector('.home-device__system')
  const option: ECOption = {
    tooltip: {},
    series: [
      {
        type: 'pie',
        data: device.value?.system
      }
    ]
  }
  sysInstance.value = echarts.init(el as HTMLElement)
  sysInstance.value.setOption(option)
}
</script>

<style lang="scss">
.home-device {
  width: 100%;
  height: 100%;
  &__browser,
  &__system {
    width: 100%;
    height: 100%;
  }
}
</style>
