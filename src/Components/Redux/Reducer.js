import { combineReducers } from "redux";

export const IsLogout = (state = "", action) =>{
    console.log(action);
    switch (action.type) {
        case "LOGOUT_SUCCESS": return action.playload;
        case "LOGOUT_FAILED": return action.playload;
        case "USER_LOGGED": return action.auth;
        case "USER_NOT_LOGGED": return action.credentials;
        default: return state;
    }
}

export const rootReducer = combineReducers({
    IsLogout
})


