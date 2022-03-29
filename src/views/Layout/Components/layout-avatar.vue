<template>
  <div class="layout-user">
    <n-popover>
      <template #trigger>
        <div class="layout-user__content">
          <n-avatar round size="large" :src="userInfo.avatar" />
          <span class="content-cheer">下午好，Marco !</span>
        </div>
      </template>
      <div class="layout-user__menus">
        <div class="layout-user__menu">
          <span class="menu-label">用户名：</span>
          <span>{{ userInfo.account }}</span>
        </div>
        <div class="layout-user__menu">
          <span class="menu-label">上次登录：</span>
          <span>{{ formatDate(userInfo.lastLoginTime) }}</span>
        </div>
        <div class="layout-user__menu">
          <span class="menu-label">注销：</span>
          <n-button size="tiny" @click="logout">退出系统</n-button>
        </div>
      </div>
    </n-popover>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { formatDate } from '@/utils/formatDate'
import { removeUserInfo } from '@/utils/auth'
const $store = useStore()
const $router = useRouter()
const userInfo = $store.state.userInfo
function logout() {
  removeUserInfo()
  $store.commit('removeUserInfo')
  $router.push({ name: 'login' })
}
</script>

<style lang="scss">
.layout-user {
  &__content {
    cursor: pointer;
    display: flex;
    align-items: center;
    .content-cheer {
      margin-left: 12px;
    }
  }
  &__menu {
    padding: 4px 0;
    .menu-label {
      display: inline-block;
      width: 80px;
    }
  }
}
</style>
