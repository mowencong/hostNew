import Vue from 'vue'
import App from './App'
import store from './store'  
Vue.prototype.$store = store
import http from './static/js/http.js'
Vue.prototype.$http=http;
Vue.config.productionTip = false
import uView from "uview-ui";
Vue.use(uView);
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
