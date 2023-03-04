import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { getProfiles, getProfile, getProfileBySearch, getProfileByUser, createProfile, updateProfile, deleteProfile } from '../../../services/profileServices';

const initialState = {
    profile: null,
    profiles: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const create_Profile = createAsyncThunk("profiles/create",async(FormData, thunkAPI) => {
    try{
        return await createProfile(FormData);
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) ||error.message ||error.toString();
        console.log(message);
        toast.error(message);
        return thunkAPI.rejectWithValue(message);
        
    }
});

export const get_Profiles = createAsyncThunk("profiles/getProfiles",async(id, thunkAPI) => {
    try{
        return await getProfiles();
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) ||error.message ||error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);  
    }
});

export const get_Profile = createAsyncThunk("profiles/getProfile",async(id, thunkAPI) => {
    try{
        return await getProfile(id);
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) ||error.message ||error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);  
    }
});

export const get_Profile_by_User = createAsyncThunk("profiles/getProfileByUser",async(searchQuery, thunkAPI) => {
    try{
        return await getProfileByUser(searchQuery);
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) ||error.message ||error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);  
    }
});

export const get_Profile_by_Search = createAsyncThunk("profiles/getProfileBySearch",async(searchQuery, thunkAPI) => {
    try{
        return await getProfileBySearch(searchQuery);
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) ||error.message ||error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);  
    }
});

export const update_Profile = createAsyncThunk("profiles/updateProfile",async({ id, formData }, thunkAPI) => {
    try{
        return await updateProfile(id,formData);
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) ||error.message ||error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);  
    }
});

export const delete_Profile = createAsyncThunk("profiles/delete",async(id, thunkAPI) => {
    try{
        console.log("delete");  
        return await deleteProfile(id);
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) ||error.message ||error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);  
    }
});

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers:{
        SET_CREATEPROFILE(state,action){
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload);
            state.profiles.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(create_Profile.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(create_Profile.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload);
            state.profiles.push(action.payload);
            // localStorage.setItem("profile",JSON.stringify(action.payload)); 
            // console.log("log from crt prf fulfiied...")
            toast.success("Profile added successfully");
        })
        .addCase(create_Profile.rejected,(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            // console.log("log from crt prf...")
            toast.error(action.payload);
        })
        .addCase(get_Profiles.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(get_Profiles.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload);
            state.profiles = action.payload;
        })
        .addCase(get_Profiles.rejected,(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        })
        .addCase(get_Profile.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(get_Profile.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload);
            state.profile = action.payload;
        })
        .addCase(get_Profile.rejected,(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        })
        .addCase(get_Profile_by_User.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(get_Profile_by_User.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload);
            state.profiles = action.payload;
        })
        .addCase(get_Profile_by_User.rejected,(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        })
        .addCase(delete_Profile.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(delete_Profile.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            toast.success("Profile deleted successfully....");
        })
        .addCase(delete_Profile.rejected,(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        })
        .addCase(update_Profile.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(update_Profile.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            toast.success("Profile updated successfully");
        })
        .addCase(update_Profile.rejected,(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        });
    },
})

export const { SET_CREATEPROFILE } = profileSlice.actions;

export const selectIsLoading = (state) => state.profile.isLoading;
export const selectProfile = (state) => state.profile.profile;

export default profileSlice.reducer;
