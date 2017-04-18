/**
 * 管理state
 *
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
import hello from './modules/hello'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showWelcome: true
  },
  mutations,
  getters,
  actions,
  modules: {
    hello
  }
})
