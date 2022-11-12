
import { type Dispatch } from "react";
export const initialState = {
    user: JSON.parse(window.localStorage.getItem("User") as any)  ||  {},
    dispatch: (() => undefined) as Dispatch<any>, 
    isLoggedIn : false,
}

export const actionTypes = {
    SET_USER: "SET_USER",
    LOGOUT_USER: "LOGOUT",
    UPDATE_USER: "UPDATE_USER",
    UPDATE_PIC: "UPDATE_PIC"
};

const reducer = (state:any, action: any) => { 
    console.log("state, action",state,action);
    switch (action.type) {
        case actionTypes.SET_USER:
            state.isLoggedIn = true;
            return {
                ...state,
                user: action,
            };
        case actionTypes.LOGOUT_USER: 
            return {
                user: null,
            };
        case actionTypes.UPDATE_USER: 
            return {
                ...state,
                followers: action.followers,
                following: action.followers,
            };
        
        case actionTypes.UPDATE_PIC:
            return {
                ...state,
                profile: action.profile,
            };
        default:
            return state;
            
    }
}

export default reducer;