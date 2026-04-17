import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 引入刚刚写好的路由配置

const app = createApp(App)

app.use(router) // 启用路由
app.mount('#app')