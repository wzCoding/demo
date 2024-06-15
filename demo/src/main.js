import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/css/index.css'
import './mock'
import { Loading } from './components/Loading'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia);
app.use(router);
app.use(Loading);

app.mount('#app');


