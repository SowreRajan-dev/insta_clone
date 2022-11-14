import  { createContext,useReducer,useContext} from "react";
import reducer, { initialState } from "./UserContext/userReducer";
export const StateContext = createContext(initialState);


export const StateProvider = ({ children }: any) => { 
    const [state, dispatch] = useReducer(reducer, initialState);
    return <StateContext.Provider value={{
        user: state.user,
        dispatch,
        isLoggedIn: state.isLoggedIn,
    }}>{ children}</StateContext.Provider>
}

export const useStateValue = () => useContext(StateContext);