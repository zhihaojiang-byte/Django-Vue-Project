import Vue from 'vue'
import App from './App.vue'
import router from './router'

// reset all the style with normalize.css
import 'normalize.css'

// vant is a UI library for mobile app development , I choose to register all the components here
import Vant from 'vant';
import 'vant/lib/index.css';
// vant UI support different language, I choose english in this project
import { Locale } from 'vant';
import enUS from 'vant/es/locale/lang/en-US';

Locale.use('en-US', enUS);

Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
