<template>
  <n-layout class="mp-layout">
    <n-config-provider :theme="darkTheme" class="mp-layout__header">
      <n-layout-header bordered>navbar</n-layout-header>
    </n-config-provider>
    <n-layout class="mp-layout__content" has-sider>
      <n-config-provider :theme="darkTheme" class="mp-layout__sider">
        <n-layout-sider :native-scrollbar="false" :width="270">
          <n-menu
            :options="menuOptions"
            :expanded-keys="expandedKes"
            :value="$route.path"
            :accordion="accordion"
            @update:expanded-keys="handleUpdateExpandedValue"
          />
        </n-layout-sider>
      </n-config-provider>
      <n-layout class="mp-layout__body">
        <router-view />
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { h, ref, watch, Component } from 'vue'
import { MenuOption, darkTheme, NIcon } from 'naive-ui'
// import {  } from 'naive-ui'
import router from '@/router/'
import { RouteRecordRaw, RouterLink } from 'vue-router'
import { metaAlias } from '@/types/'
import { getRandomCharacter } from '@/utils/getRandomCharacter'
const { options } = router
const layoutRoutes: RouteRecordRaw[] = []
options.routes.forEach((route) => {
  const meta: metaAlias = route.meta
  if ((meta && meta.beMenu) || route.path === '/view') {
    layoutRoutes.push(route)
  }
})
const accordion = ref(true)
const menuOptions: MenuOption[] = []
layoutRoutes.map((route: RouteRecordRaw) => {
  let children: MenuOption[] = []
  if (route.children && route.children.length) {
    route.children.forEach((subRoute) => {
      const subRoutePath: string = /(.*)\/:/.test(subRoute.path)
        ? (/(.*)\/:/.exec(subRoute.path) as RegExpExecArray)[1]
        : subRoute.path
      const menu = {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                name: subRoute.name
              }
            },
            {
              default: () => subRoute.meta?.name
            }
          ),
        key: route.path + '/' + subRoutePath,
        icon: subRoute.meta?.icon ? renderIcon(subRoute.meta?.icon as Component) : undefined
      }
      children.push(menu)
    })
  }
  // 作为顶级菜单
  if (route.meta?.asTopMenu) {
    menuOptions.push({
      label: route.meta.name,
      key: getRandomCharacter(),
      icon: route.meta.icon ? renderIcon(route.meta.icon as Component) : undefined,
      children
    })
  } else {
    menuOptions.push(...children)
  }
})
const expandedKes = ref<string[]>([])
console.log('menusoptions----->>>>', menuOptions, router)

function handleUpdateExpandedValue(keys: Array<string>) {
  console.log('接收到折叠的key--->>>>', keys)
  expandedKes.value = keys
}
watch(
  router.currentRoute,
  () => {
    menuOptions.some((menu) => {
      // 当前路由处于非顶级菜单，初始化默认展开
      if (menu.key !== router.currentRoute.value.path && menu.children && menu.children.length) {
        return menu.children.some((subMenu) => {
          if (subMenu.key === router.currentRoute.value.path) {
            console.log('侦听触发')
            if (!accordion.value) expandedKes.value.push(menu.key as string)
            else expandedKes.value = [menu.key as string]
            return true
          }
        })
      }
    })
  },
  {
    immediate: true
  }
)

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
</script>

<style lang="scss">
.mp-layout {
  width: 100vw;
  height: 100vh;
  &__header {
    height: 50px;
    > .n-layout-header {
      height: 100%;
    }
  }
  &__content {
    height: calc(100vh - 50px);
    > .n-layout-scroll-container {
      display: flex;
    }
  }
  &__sider {
    height: calc(100vh - 50px);
    overflow: hidden;
    > .n-layout-sider {
      height: 100%;
    }
  }
}
</style>
