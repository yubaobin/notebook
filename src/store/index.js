/**
 * 管理state
 *
 */
import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import * as mutations from './mutations';
import book from './modules/book';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    type: 'new',
    bottomHeight: 0,
    topHeight: 0,
  },
  mutations,
  getters,
  actions,
  modules: {
    book,
  },
});
