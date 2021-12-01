/* eslint-disable import/no-anonymous-default-export */

import OBJ from "../../constant/actiontype";
export default (data) => async (dispatch) => {
  // console.log(data);
  dispatch({
    type: OBJ.ERR,
    payload: data,
  });
  window.setTimeout(() => {
    dispatch({
      type: OBJ.ERR_R,
      payload: null,
    });
  }, 3000);
};
