/* eslint-disable import/no-anonymous-default-export */

import OBJ from "../../constant/actiontype";
export default (data) => async (dispatch) => {
  // console.log(data);
  dispatch({
    type: OBJ.LOGIN,
    payload: data,
  });
};
