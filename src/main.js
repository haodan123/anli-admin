
import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import store from '@/stores/index.js'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import './assets/css/font-icon/iconfont.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
const app = createApp(App)

// 富文本ckeditor5 start
// import CKEditor from '@ckeditor/ckeditor5-vue';

// app.use(CKEditor)
// 富文本ckeditor5 end

// fontawesome图标start
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText }
 from '@fortawesome/vue-fontawesome'
 



/* add icons to the library */
library.add(fas, far, fab)

app.component('font-awesome-icon', FontAwesomeIcon)
app.component('font-awesome-layers', FontAwesomeLayers)
app.component('font-awesome-layers-text', FontAwesomeLayersText)
//fontawesome图标end



for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(store)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
