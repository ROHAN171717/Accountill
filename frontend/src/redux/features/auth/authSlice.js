import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    name: "",
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        SET_LOGIN(state,action){
            // console.log('login reducer...');
            // console.log(action.payload);
            // localStorage.setItem("name",JSON.stringify(action.payload.name));
            state.isLoggedIn = action.payload.flag;
            state.name = action.payload.name;
        },

        SET_NAME(state,action){
            console.log(action.payload)
            state.name = action.payload;
            localStorage.setItem("name",JSON.stringify(action.payload));        
        },

        SET_PROFILE(state,action){
            console.log(action.payload);
            localStorage.setItem("Profile",JSON.stringify(action.payload));
        }
    }
})

export default authSlice.reducer;
export const { SET_LOGIN, SET_NAME, SET_PROFILE } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;