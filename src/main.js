import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index';
import './mobile';
import Icon from 'vue-awesome/components/Icon.vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueTouch from 'vue-touch';
import BottomNav from 'vue-bottom-nav';
import VueScroller from 'vue-scroller';
// import the main css file
require('./main.css');

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = 'http://127.0.0.1:3001';
Vue.use(VueTouch, { name: 'v-touch' });
Vue.use(BottomNav);
Vue.use(VueScroller);
// user global component
Vue.component('icon', Icon);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
