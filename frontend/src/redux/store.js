import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import clientReducer from "./features/client/client";
import invoiceReducer from "./features/invoice/invoice";
import profileReducer from "./features/profile/profile"

// import storage from "redux-persist/lib/storage";
// import persistReducer from "redux-persist/es/persistReducer";
import { combineReducers } from "@reduxjs/toolkit";
// import { curryGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

// const persistConfig = {
//     key: "root",
//     version: 1,
//     storage,
// }

const combineReducer = combineReducers({
        auth: authReducer,
        client: clientReducer,
        invoice: invoiceReducer,
        profile: profileReducer,
})

const rootReducer = (state,action) => {
    if(action.type === 'logout/reset'){
        console.log("reset...")
        state = undefined;
    }
    return combineReducer(state,action);
}

const store=configureStore({
    reducer: rootReducer,
})

export default store;