import OBJ from "../../constant/actiontype";

const auth = (state, { type, payload }) => {
  // console.log(type === OBJ.LOGIN, payload);
  if (type === OBJ.LOGIN)
    return {
      ...state,
      isloggedin: true,
      user: payload.user,
      token: payload.token,
    };
  else return state;
};
export default auth;
