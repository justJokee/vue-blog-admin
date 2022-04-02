<template>
  <div class="home-device">
    <n-row gutter="24">
      <n-col :span="12">
        <n-card title="浏览器偏好" :bordered="false">
          <div class="home-device__browser" />
        </n-card>
      </n-col>
      <n-col :span="12">
        <n-card title="操作系统" :bordered="false">
          <div class="home-device__system" />
        </n-card>
      </n-col>
    </n-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { deviceSchema, ECOption } from '@/types/'
import echarts from '@/utils/echarts'
import api from '@/api/home'
let resizeObserver: any = null
const device = ref<deviceSchema['res']>()
let broInstance = ref<echarts.ECharts>()
let sysInstance = ref<echarts.ECharts>()
onMounted(async () => {
  const bro = document.querySelector('.home-device__browser') as HTMLElement
  const sys = document.querySelector('.home-device__system') as HTMLElement
  const { data, status } = await api.getDevice()
  if (status === 200) {
    device.value = data
    initBrowserPie(bro)
    initSystemPie(sys)
    resizeObserver = new ResizeObserver(() => {
      echarts.getInstanceByDom(bro)?.resize()
      echarts.getInstanceByDom(sys)?.resize()
    })

    resizeObserver.observe(document.querySelector('.mp-layout__body') as Element)
  }
})
function initBrowserPie(bro: HTMLElement) {
  const el = bro
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
function initSystemPie(sys: HTMLElement) {
  const el = sys
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

onUnmounted(() => {
  resizeObserver?.disconnect()
  broInstance.value?.dispose()
  sysInstance.value?.dispose()
})
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
