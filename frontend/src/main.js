import './assets/main.css'
//Import Froala Editor
import 'froala-editor/js/plugins.pkgd.min.js'
//Import third party plugins
import 'froala-editor/js/third_party/embedly.min.js'
import 'froala-editor/js/third_party/image_tui.min.js'
// Import Froala Editor css files.
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/froala_style.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { getStores } from '@/stores'

import App from './App.vue'
import router from './router'
import './axios'
import VueFroala from 'vue-froala-wysiwyg'
import ToastPlugin from 'vue-toast-notification'
import registerDirectives from './directives'

const app = createApp(App)

app.use(ToastPlugin)
app.use(createPinia())
app.use(VueFroala)
const { authStore } = getStores()
registerDirectives(app)
app.config.globalProperties.$auth = authStore
app.use(router)
app.mount('#app')
