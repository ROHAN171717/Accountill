import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { createClient, getClient, getClientByUser, updateClient, deleteClient } from '../../../services/clientServices';

const initialState = {
    client: null,
    clients: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const create_Client = createAsyncThunk("clients/create",async(FormData, thunkAPI) => {
    try{
        return await createClient(FormData);
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) ||error.message ||error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
        
    }
});


export const get_Client = createAsyncThunk("clients/getClient",async(id, thunkAPI) => {
    try{
        return await getClient(id);
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) ||error.message ||error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);  
    }
});

export const get_Client_by_User = createAsyncThunk("clients/getClientByUser",async(searchQuery, thunkAPI) => {
    try{
        return await getClientByUser(searchQuery);
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) ||error.message ||error.toString();
        console.log("get_Client_by_User  "+error)
        console.log(message);
        return thunkAPI.rejectWithValue(message);  
    }
});

export const update_Client = createAsyncThunk("clients/updateClient",async({ id, formData }, thunkAPI) => {
    try{
        return await updateClient(id,formData);
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) ||error.message ||error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);  
    }
});

export const delete_Client = createAsyncThunk("clients/delete",async(id, thunkAPI) => {
    try{
        console.log("delete");  
        return await deleteClient(id);
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) ||error.message ||error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);  
    }
});

const clientSlice = createSlice({
    name: "client",
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(create_Client.pending, (state)=>{
            // state.isLoading = true;
            return {...state, isLoading: true}
        })
        .addCase(create_Client.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload);
            state.clients.push(action.payload);
            toast.success("Client added successfully");
        })
        .addCase(create_Client.rejected,(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        })
        .addCase(get_Client.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(get_Client.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload);
            state.client = action.payload;
        })
        .addCase(get_Client.rejected,(state, action)=>{
            toast.error(action.payload);
            return { ...state, isLoading: false, isError: true, message: action.payload}
            // state.isLoading = false;
            // state.isError = true;
            // state.message = action.payload;
        })
        .addCase(get_Client_by_User.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(get_Client_by_User.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload.data);
            state.clients = action.payload.data;
        })
        .addCase(get_Client_by_User.rejected,(state, action)=>{
            toast.error(action.payload);
            return { ...state, isLoading: false, isError: true, message: action.payload}
            // state.isLoading = false;
            // state.isError = true;
            // state.message = action.payload;
            // toast.error(action.payload);
        })
        .addCase(delete_Client.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(delete_Client.fulfilled, (state, action)=>{
            // state.isLoading = false;
            // state.isSuccess = true;
            // state.isError = false;
            toast.success("Client deleted successfully....");
            console.log("deleete....")
            console.log(action.payload.data);
            console.log(state.clients)
            return {
                ...state,
                // invoices: state.clients.filter((client) => client._id !== action.payload.data._id),
                isLoading: false,
                isSuccess: true,
                isError: false,

            }
        })
        .addCase(delete_Client.rejected,(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        })
        .addCase(update_Client.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(update_Client.fulfilled, (state, action)=>{
            // state.isLoading = false;
            // state.isSuccess = true;
            // state.isError = false;
            toast.success("Client updated successfully");

            console.log(action.payload);
            return {
                ...state,
                invoices: state.clients.map((client) => client._id === action.payload._id ? action.payload : client),
                isLoading: false,
                isSuccess: true,
                isError: false,

            }
        })
        .addCase(update_Client.rejected,(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        });
    },
})

export const selectIsLoading = (state) => state.client.isLoading;
export const selectClient = (state) => state.client.client;

export default clientSlice.reducer;
