import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/'
import { store, key } from '@/store/'
import { getUserInfo } from '@/utils/auth'
import api from '@/api/'
import 'vfonts/Lato.css'
// import 'vfonts/FiraCode.css'
import '@/style/reset.scss'
import '@/assets/css/el-icon.css'
const userInfo = getUserInfo()
if (userInfo) store.commit('setUserInfo', userInfo)
const app = createApp(App)
app.use(router)
app.use(store, key)
app.mount('#app')
app.config.globalProperties.$api = api
