/**
 * 公共的mutations
 */

export const changeType = (state, { type }) => {
  state.type = type;
};

export const changeBottomHeight = (state, { bottomHeight }) => {
  state.bottomHeight = bottomHeight;
};

export const changeTopHeight = (state, { topHeight }) => {
  state.topHeight = topHeight;
};

export const changeShowTitle = (state, { showTitle }) => {
  state.showTitle = showTitle;
};

export const changeShowBottom = (state, { showBottom }) => {
  state.showBottom = showBottom;
};
