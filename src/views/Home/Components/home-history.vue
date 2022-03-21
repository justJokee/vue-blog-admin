<template>
  <div class="home-history">
    <n-card>
      <template #header>
        <div class="home-history__title">
          <span>访客数量6</span>
          <n-select
            v-model:value="shortCut"
            @update:value="handleChange"
            placeholder="请选择时间段"
            :options="shortCuts"
          />
        </div>
      </template>
      <div class="home-history__ins" />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { SelectOption } from 'naive-ui'
// import moment from 'moment'
// import 'moment/dist/locale/zh-cn'
import { historySchema, ECOption } from '@/types/'
import echarts from '@/utils/echarts'
import api from '@/api/home'

const history = ref<historySchema['res'][]>()
const shortCut = ref('week')
const shortCuts = ref<SelectOption[]>([
  { label: '本周', value: 'week' },
  { label: '本月', value: 'month' }
])
let lastShortCut = 'week'
let hisInstance = null
onMounted(async () => {
  getHistory()
})
function handleChange(value) {
  if (value === lastShortCut) return
  lastShortCut = value
  getHistory()
}
async function getHistory() {
  const { data, status } = await api.getHistory({
    end: '2023-01-01',
    start: '2020-01-01'
  })
  if (status === 200) {
    history.value = data
    initHistoryPie()
  }
}
function initHistoryPie() {
  const el = document.querySelector('.home-history__ins')
  const xd = history.value?.map((item) => item.date.substring(2))
  const yv = history.value?.map((item) => item.value)
  const option: ECOption = {
    tooltip: {
      trigger: 'axis'
    },
    dataZoom: [{ type: 'inside', start: 0, end: shortCut.value === 'week' ? 100 : 50 }],
    grid: {
      left: '42px',
      right: '42px',
      bottom: 0,
      top: '16px;',
      containLabel: true
    },
    xAxis: {
      boundaryGap: false,
      axisLine: {
        show: false
      },

      axisTick: {
        show: false
      },
      splitLine: { show: false },
      type: 'category',
      data: xd
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    series: [
      {
        name: '访问数',
        type: 'line',
        smooth: true,
        data: yv
      }
    ]
  }
  hisInstance = echarts.init(el as HTMLElement)
  hisInstance.setOption(option)
}
</script>

<style lang="scss">
.home-history {
  width: 100%;
  height: 100%;
  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    > .n-select {
      width: 200px;
    }
  }
  &__ins {
    width: 100%;
    height: 100%;
  }
}
</style>
