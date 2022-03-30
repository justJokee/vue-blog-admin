<template>
  <div class="mp-pwd">
    <div class="mp-pwd__form">
      <n-form
        ref="formRef"
        label-align="left"
        label-placement="left"
        :label-width="80"
        :model="resetpwd"
        :rules="rules"
        size="medium"
      >
        <n-form-item label="旧密码" path="oldPassword">
          <n-input type="password" v-model:value="resetpwd.oldPassword" placeholder="请输入旧密码" />
        </n-form-item>
        <n-form-item label="新密码" path="password">
          <n-input type="password" v-model:value="resetpwd.password" placeholder="请输入新密码" />
        </n-form-item>
        <n-form-item label="确认密码" path="confirmPassword">
          <n-input type="password" v-model:value="resetpwd.confirmPassword" placeholder="确认新密码" />
        </n-form-item>
      </n-form>
      <div class="mp-pwd__form-submit">
        <n-button type="info" @click="submit">确认</n-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import api from '@/api/'
import md5 from 'js-md5'
import { useStore } from '@/store/'
import { useRouter } from 'vue-router'
import { removeUserInfo } from '@/utils/auth'
const $message = useMessage()
const $store = useStore()
const $router = useRouter()
const resetpwd = ref({
  oldPassword: '',
  password: '',
  confirmPassword: ''
})
const rules = {
  oldPassword: {
    required: true,
    message: '请输入旧密码',
    trigger: ['input', 'blur']
  },
  password: {
    required: true,
    message: '请输入新密码',
    trigger: ['input', 'blur']
  },
  confirmPassword: {
    required: true,
    message: '请确认新密码',
    trigger: ['input', 'blur']
  }
}
async function submit() {
  if (resetpwd.value.password !== resetpwd.value.confirmPassword) {
    $message.warning('两次输入密码不正确')
    return
  }
  const { status } = await api.resetpwd({
    uid: $store.state.userInfo.uid,
    oldPassword: md5(resetpwd.value.oldPassword),
    password: md5(resetpwd.value.password)
  })
  if (status === 200) {
    $message.success('重置密码成功，请重新登陆')
    // 重置密码成功，重新登陆
    removeUserInfo()
    $store.commit('removeUserInfo')
    $router.push({ name: 'login' })
  }
}
</script>

<style lang="scss">
.mp-pwd {
  &__form {
    width: 400px;
    padding: 24px;
    &-submit {
      padding: 12px 0;
      text-align: center;
    }
  }
}
</style>
