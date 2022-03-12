import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/'
import 'vfonts/Lato.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
