<template>
  <div class="home-history">
    <n-card>
      <template #header>
        <div class="home-history__title">
          <span>访客数量</span>
          <n-select
            v-model:value="shortCut"
            @update:value="handleChange"
            placeholder="请选择时间段"
            :options="shortCuts"
          />
        </div>
      </template>
      <!-- <div style="width: 800px; border: 1px solid red"></div> -->
      <div class="home-history__ins" />
    </n-card>
    <div class="history-empty" v-if="history && !history.length">暂无数据</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { SelectOption } from 'naive-ui'
import moment from 'moment'
import 'moment/dist/locale/zh-cn'
import { historySchema, ECOption } from '@/types/'
import echarts from '@/utils/echarts'
import api from '@/api/home'
let resizeObserver: any = null
const history = ref<historySchema['res'][]>()
const shortCut = ref('week')
const shortCuts = ref<SelectOption[]>([
  { label: '本周', value: 'week' },
  { label: '本月', value: 'month' }
])
let lastShortCut = 'week'
let hisInstance: any = null
onMounted(async () => {
  getHistory()
})
function handleChange(value: string) {
  if (value === lastShortCut) return
  lastShortCut = value
  getHistory()
}
async function getHistory() {
  let start = moment()
    .startOf(shortCut.value as moment.unitOfTime.StartOf)
    .valueOf()
  let end = moment()
    .endOf(shortCut.value as moment.unitOfTime.StartOf)
    .valueOf()

  const { data, status } = await api.getHistory({
    start,
    end
  })
  if (status === 200) {
    history.value = data
    if (!hisInstance) initHistoryPie()
    else updateHistoryPie()
  }
}
function updateHistoryPie() {
  const xd = history.value?.map((item) => item.date.substring(2))
  const yv = history.value?.map((item) => item.value)
  let end = 100
  if (shortCut.value === 'month' && xd && xd.length > 15) end = 50
  const option: ECOption = {
    dataZoom: [{ type: 'inside', start: 0, end }],

    xAxis: {
      data: xd
    },

    series: [
      {
        data: yv
      }
    ]
  }
  hisInstance.setOption(option)
}
function initHistoryPie() {
  const el = document.querySelector('.home-history__ins') as HTMLElement
  const xd = history.value?.map((item) => item.date.substring(2))
  const yv = history.value?.map((item) => item.value)
  let end = 100
  if (shortCut.value === 'month' && xd && xd.length > 15) end = 50
  const option: ECOption = {
    animation: true,
    tooltip: {
      trigger: 'axis'
    },
    dataZoom: [{ type: 'inside', start: 0, end }],
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
  resizeObserver = new ResizeObserver(() => {
    echarts.getInstanceByDom(el)?.resize()
  })

  resizeObserver.observe(document.querySelector('.mp-layout__body') as Element)
}
onUnmounted(() => {
  resizeObserver?.disconnect()
  hisInstance.dispose()
})
</script>

<style lang="scss">
.home-history {
  position: relative;
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
  &__ins--empty {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 12px;
    color: #ccc;
  }
  .history-empty {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    font-size: 12px;
    color: #ccc;
  }
}
</style>
