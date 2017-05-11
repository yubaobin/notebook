/**
 * 公共actions
 */

/**
 * 改变appName状态
 */
export const changeType = ({ commit }, options) => {
  commit('changeType', options);
};

export const changeBottomHeight = ({ commit }, options) => {
  commit('changeBottomHeight', options);
};

export const changeTopHeight = ({ commit }, options) => {
  commit('changeTopHeight', options);
};

export const changeShowTitle = ({ commit }, options) => {
  commit('changeShowTitle', options);
};

export const changeShowBottom = ({ commit }, options) => {
  commit('changeShowBottom', options);
};
