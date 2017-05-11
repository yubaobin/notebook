/**
 * hello 模块
 */
const getters = {
  getNoteId: (state) => state.noteId,
  getTitle: (state) => state.title,
};

const actions = {
  changeNoteId({ commit }, option) {
    commit('changeNoteId', option);
  },
  changeTitle({ commit }, option) {
    commit('changeTitle', option);
  },
};

const mutations = {
  changeNoteId(state, { noteId }) {
    state.noteId = noteId;
  },
  changeTitle(state, { title }) {
    state.title = title;
  },
};
const state = {
  noteId: -1,
  title: '',
};
export default {
  state,
  getters,
  actions,
  mutations,
};
