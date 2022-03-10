<template>
  <div class="mp-layout">
    <div class="mp-layout__menus">
      <n-menu :options="menuOptions" />
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { h } from 'vue'
import type { MenuOption } from 'naive-ui'
import router from '@/router/'
import { RouteRecordRaw, RouterLink } from 'vue-router'
import { metaAlias } from '@/types/'
const { options } = router
const layoutRoutes: RouteRecordRaw[] = []
options.routes.forEach((route) => {
  const meta: metaAlias = route.meta
  if ((meta && meta.beMenu) || route.path === '/view') {
    layoutRoutes.push(route)
  }
})

const menuOptions: MenuOption[] = []
layoutRoutes.map((route: RouteRecordRaw) => {
  let children: MenuOption[] = []
  if (route.children && route.children.length) {
    route.children.forEach((subRoute) => {
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
              default: () => subRoute.name
            }
          ),
        key: subRoute.path
      }
      children.push(menu)
    })
  }
  // 作为顶级菜单
  if (route.meta?.asTopMenu) {
    menuOptions.push({
      label: route.meta.name,
      key: Math.random(),
      children
    })
  } else {
    menuOptions.push(...children)
  }
})
console.log('menusoptions----->>>>', menuOptions)
</script>

<style lang="scss">
.mp-layout {
  width: 100vw;
  height: 100vh;
  &__menus {
    width: 200px;
    height: 100%;
  }
}
</style>
