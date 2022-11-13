import { type Dispatch } from "react";
export const initialState = {
  user: JSON.parse(window.localStorage.getItem("User") as string) ,
  dispatch: (() => undefined) as Dispatch<any>,
  isLoggedIn: JSON.parse(window.localStorage.getItem("isUserLoggedIn") as any) || false,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  LOGOUT_USER: "LOGOUT",
  UPDATE_USER: "UPDATE_USER",
  UPDATE_PIC: "UPDATE_PIC",
};

const reducer = (state: any, action: any) => {
  console.log("action ", action.action);
  switch (action.type) {
    case actionTypes.SET_USER:
      console.log("set user");
      return {
        user: action.action,
        isLoggedIn:true
      }
    case actionTypes.LOGOUT_USER:
      return {
          user: {},
          isLoggedIn : false
      };
    case actionTypes.UPDATE_USER:
      return {
        ...state,
        user:action.action,
        followers: action.action.followers,
        following: action.action.followers,
      };

    case actionTypes.UPDATE_PIC:
      return {
        ...state,
        profile: action.profile,
      };
    default:
      return state;
  }
};

export default reducer;
