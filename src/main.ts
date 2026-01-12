import { createApp } from "vue"

import { registerPlugins } from "@/plugins"

import App from "./App.vue"

import 'bootstrap/dist/css/bootstrap.min.css'

import './assets/css/all.min.css'
import './assets/css/animate.css'
import './assets/css/bootstrap.min.css'
import './assets/css/custom.css'
import './assets/css/magnific-popup.css'
import './assets/css/mousecursor.css'
import './assets/css/slicknav.min.css'
import './assets/css/swiper-bundle.min.css'

const app = createApp(App)

registerPlugins(app).
    then(() => app.mount("#app"))