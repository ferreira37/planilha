import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import money3 from 'v-money3'
import bootstrap from './bootstrap'

createApp(App).use(router).mount('#app')
App.use(money3)
App.use(bootstrap)
