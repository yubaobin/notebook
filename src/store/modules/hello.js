/**
 * hello 模块
 */
const state = {
  name: ''
}

const getters = {
  getName: state => state.name
}

const actions = {
  changeName ({ commit }, option) {
    commit('changeName', option)
  }
}

const mutations = {
  changeName (state, { name }) {
    state.name = name
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
