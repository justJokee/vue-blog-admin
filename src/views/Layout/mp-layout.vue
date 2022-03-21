<template>
  <n-layout class="mp-layout">
    <n-layout class="mp-layout__wrapper" has-sider>
      <n-config-provider class="mp-layout__sider">
        <div class="mp-layout__site">
          <div class="site-ico">
            <img src="~@/assets/img/site.png" alt="">
          </div>
          <div class="site-url">
            <a href="https://www.mapblog.cn">mapblog.cn</a>
          </div>
        </div>
        <n-layout-sider :native-scrollbar="false" :width="258">
          <n-menu :options="menuOptions" :value="$route.path" :accordion="accordion" />
        </n-layout-sider>
      </n-config-provider>
      <n-layout class="mp-layout__content-wrapper">
        <div class="mp-layout__content">
          <div class="mp-layout__navbar">
            <comp-layout :column="1">
              <div class="navbar-navigation">
                <span>您当前位于：</span>
                <div class="navbar-navigation__content">
                  <template v-for="(nav, index) in navigations" :key="index">
                    <span>{{ nav.name }}</span>
                    <span v-if="navigations.length > 1 && index !== navigations.length - 1">&nbsp;>&nbsp;</span>
                  </template>
                </div>
              </div>
              <template #col-1>
                <div class="navbar-user">
                  <div class="navbar-user__notice">
                    <layout-notice />
                  </div>
                  <div class="navbar-user__avator">
                    <layout-avator />
                  </div>
                </div>
              </template>
            </comp-layout>
          </div>
          <div class="mp-layout__body" :class="{ 'mp-layout__body--pin': pin }">
            <router-view v-slot="{ Component }">
              <transition name="component-fade" mode="out-in">
                <component :is="Component" v-if="$route.meta.customLayout" />
                <n-card
                  class="body-card"
                  :class="{ 'body-card--pin': pin }"
                  v-else
                  :title="($route.meta.name as string)"
                  :bordered="false"
                >
                  <component :is="Component" />
                </n-card>
              </transition>
            </router-view>
          </div>
        </div>
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { h, ref, computed } from 'vue'
import { MenuOption } from 'naive-ui'
import router from '@/router/'
import { RouteRecordRaw, RouterLink, useRoute } from 'vue-router'
import { metaAlias } from '@/types/'
import { getRandomCharacter } from '@/utils/getRandomCharacter'
import layoutNotice from './Components/layout-notice.vue'
import layoutAvator from './Components/layout-avator.vue'

const $route = useRoute()
console.log($route)
const { options } = router
const layoutRoutes: RouteRecordRaw[] = []
// 生成导航
const navigations = computed(() => {
  return $route.matched.map((route) => {
    return {
      name: route.meta?.name
    }
  })
})
const pin = computed(() => {
  if ($route.meta.pinLayout) return true
  return false
})
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
        type: 'group',

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
        icon: subRoute.meta?.icon ? renderIcon(subRoute.meta?.icon as string) : undefined
      }
      children.push(menu)
    })
  }
  // 作为顶级菜单
  if (route.meta?.asTopMenu) {
    menuOptions.push({
      type: 'group',
      label: route.meta.name,
      key: getRandomCharacter(),
      icon: route.meta.icon ? renderIcon(route.meta.icon as string) : undefined,
      children
    })
  } else {
    menuOptions.push(...children)
  }
})
// const expandedKes = ref<string[]>([])

// function handleUpdateExpandedValue(keys: Array<string>) {
//   console.log('接收到折叠的key--->>>>', keys)
//   expandedKes.value = keys
// }
// watch(
//   router.currentRoute,
//   () => {
//     menuOptions.some((menu) => {
//       // 当前路由处于非顶级菜单，初始化默认展开
//       if (menu.key !== router.currentRoute.value.path && menu.children && menu.children.length) {
//         return menu.children.some((subMenu) => {
//           if (subMenu.key === router.currentRoute.value.path) {
//             if (!accordion.value) expandedKes.value.push(menu.key as string)
//             else expandedKes.value = [menu.key as string]
//             return true
//           }
//         })
//       }
//     })
//   },
//   {
//     immediate: true
//   }
// )

function renderIcon(icon: string) {
  return () => h('i', { class: icon })
}
</script>

<style lang="scss">
@import '@/style/index.scss';
.mp-layout {
  width: 100vw;
  height: 100vh;

  &__wrapper {
    height: 100vh;
    > .n-layout-scroll-container {
      display: flex;
    }
    .n-menu .n-menu-item::before {
      left: 16px;
      right: 16px;
      border-radius: 6px;
    }
  }
  &__sider {
    height: 100vh;
    overflow: hidden;
    padding: 0 16px;
    > .n-layout-sider {
      height: calc(100% - 86px);
      [class^='el-icon-'] {
        font-size: 18px;
        // font-weight: bold;
      }
    }
  }
  &__site {
    font-size: 18px;
    padding: 28px 12px;
    display: flex;
    align-items: center;
    padding-left: 32px;
    height: 86px;
    // justify-content: center;
    .site-ico {
      width: 30px;
      height: 30px;
      padding: 4px;
      border-radius: 50%;
      background: #339dff;
      margin-right: 16px;
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .site-url {
      cursor: pointer;
      a {
        color: #344bbb;
      }
    }
  }
  &__content-wrapper {
    @include themeify() {
      background: themed('bg-body');
    }
  }

  &__content {
    height: 100%;
    padding: 32px;
  }

  &__navbar {
    height: 60px;
    line-height: 60px;
    .navbar-navigation {
      display: flex;
      align-items: center;
      flex-grow: 1;
      height: 100%;
      padding: 0 20px;
      box-shadow: 0 1px 6px 0 rgb(0 0 0 / 5%);
      border-radius: 14px;
      @include themeify() {
        background: themed('bg-card');
      }
      &__content {
        font-size: 12px;
      }
    }
    .navbar-user {
      height: 100%;
      padding-right: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  &__body {
    min-height: calc(100% - 60px);
    padding-top: 28px;
    .body-card {
      min-height: calc(100vh - 152px);
      box-shadow: 0 1px 6px 0 rgb(0 0 0 / 5%);
    }
    .body-card--pin {
      height: calc(100vh - 152px);
    }
  }
  &__body--pin {
    height: calc(100% - 60px);
  }
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.18s ease-in;
}

.component-fade-enter-from,
.component-fade-leave-to {
  opacity: 0;
}
</style>
