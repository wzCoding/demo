import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/css/theme.css'
import './mock'
import { Loading } from './components/Loading'
import hljs from 'highlight.js'
const app = createApp(App)
const pinia = createPinia()
console.log(hljs.highlightBlock
    )
app.use(pinia);
app.use(router);
app.use(Loading);


app.mount('#app');


