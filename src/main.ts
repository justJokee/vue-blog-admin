import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/'
import api from '@/api/'

import 'vfonts/Lato.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
app.config.globalProperties.$api = api
