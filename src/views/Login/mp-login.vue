<template>
  <div class="mp-login">
    <div class="mp-login__content">
      <div class="content__title">
        <span>Marco's blog</span>
      </div>
      <div class="content__body">
        <div class="content__form">
          <div class="content__form-item">
            <div class="form-item__input">
              <label for="login">
                <i class="el-icon-user" />
              </label>
              <input v-model="user.account" type="text" id="login" placeholder="请输入用户名" autocomplete="off" />
            </div>
          </div>
          <div class="content__form-item">
            <div class="form-item__input">
              <label for="password">
                <i class="el-icon-lock" />
              </label>
              <input
                v-model="user.password"
                type="password"
                id="password"
                placeholder="请输入密码"
                autocomplete="off"
                @keyup.enter="login"
              />
            </div>
          </div>
        </div>
        <div class="content__submit">
          <n-button type="info" @click="login">登录</n-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { setUserInfo } from '@/utils/auth'
import { useRouter } from 'vue-router'
import { useStore } from '@/store/'
import md5 from 'js-md5'
import api from '@/api/'
const $message = useMessage()
const $router = useRouter()
const $store = useStore()
const user = ref({
  account: '',
  password: ''
})
async function login() {
  if (!user.value.account || !user.value.password) {
    $message.error('缺少用户名或密码')
    return
  }
  const { status, data } = await api.login({
    account: user.value.account,
    password: md5(user.value.password)
  })
  if (status === 200) {
    setUserInfo(data)
    $store.commit('setUserInfo', data)
    $router.replace({
      name: 'home'
    })
  }
}
</script>
<style lang="scss">
.mp-login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: url('@/assets/img/login-bg.jpeg') no-repeat center / 100% 100%;

  &__content {
    color: #fff;
    width: 500px;
    height: 280px;
    padding: 24px;
    border-radius: 18px;
    background: rgba(0, 0, 0, 0.3);
    box-shadow: 0 14px 24px rgba(0, 0, 0, 0.6);
    .content {
      &__title {
        text-align: center;
        font-size: 24px;
      }
      &__body {
        padding: 20px;
      }
      &__form {
        &-item {
          padding: 8px;
          .form-item__input {
            display: flex;
            align-items: center;
            border-bottom: 1px solid rgb(241, 239, 239);
          }
          label {
            font-size: 18px;
          }
        }
        input {
          padding: 0 8px;
          color: #fff;
          background: transparent;
          border: none;
          -webkit-appearance: none;
          outline: none;
          width: 100%;
          height: 34px;
          line-height: 34px;
          &::placeholder {
            background: transparent;
            color: rgb(212, 211, 211);
            font-size: 14px;
          }
        }
      }
      &__submit {
        padding: 16px 12px;
        text-align: right;
      }
    }
  }
}
</style>
