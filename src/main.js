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
import Toast from 'vue-easy-toast';
import DropMenu from 'vue-dropmenu';
import Mock from 'mockjs';
// import the main css file
require('./main.css');
require('./animate.css');

Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = 'http://rapapi.org/mockjs/18698';
Vue.use(VueTouch, { name: 'v-touch' });
Vue.use(BottomNav);
Vue.use(VueScroller);
Vue.use(Toast);
Vue.use(DropMenu);

// use global component
Vue.component('icon', Icon);

// use mock
const s = document.createElement('script');
s.src = 'http://rapapi.org/rap.plugin.js?projectId=18698';
document.querySelector('head').appendChild(s);

Vue.prototype.Mock = Mock;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});

router.beforeEach((to, from, next) => {
  if (from.name === 'detail' && to.name !== 'detail') {
    store.dispatch('changeNoteId', { noteId: '' });
  } else if (to.name === 'detail') {
    const noteId = to.params.noteId;
    store.dispatch('changeNoteId', { noteId });
  }
  next();
});
