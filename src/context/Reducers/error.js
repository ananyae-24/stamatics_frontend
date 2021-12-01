import OBJ from "../../constant/actiontype";

const auth = (state, { type, payload }) => {
  // console.log(type, payload);
  if (type === OBJ.ERR)
    return {
      ...state,
      error: true,
      message: payload.message,
      type: payload.type,
    };
  else if (type === OBJ.ERR_R)
    return {
      ...state,
      error: false,
      message: null,
    };
  else return state;
};
export default auth;
