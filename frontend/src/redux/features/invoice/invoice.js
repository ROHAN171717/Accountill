import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { getInvoice, getInvoicesByUser, createInvoice, updateInvoice, deleteInvoice } from '../../../services/invoiceServices';

const initialState = {
    invoice: null,
    invoices: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const create_Invoice = createAsyncThunk("invoices/create",async(FormData, thunkAPI) => {
    try{
        return await createInvoice(FormData);
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) ||error.message ||error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
        
    }
});


export const get_Invoice = createAsyncThunk("invoices/getInvoice",async(id, thunkAPI) => {
    try{
        console.log("here...")
        const res = await getInvoice(id);
        console.log("res = ", res);
        return res;
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) ||error.message ||error.toString();
        console.log("here error...")
        console.log(message);
        return thunkAPI.rejectWithValue(message);  
    }
});

export const get_Invoice_by_User = createAsyncThunk("invoices/getInvoiceByUser",async(searchQuery, thunkAPI) => {
    try{
        return await getInvoicesByUser(searchQuery);
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) ||error.message ||error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);  
    }
});

export const update_Invoice = createAsyncThunk("invoices/updateInvoice",async({ id, formData }, thunkAPI) => {
    try{
        return await updateInvoice(id,formData);
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) ||error.message ||error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);  
    }
});

export const delete_Invoice = createAsyncThunk("invoices/delete",async(id, thunkAPI) => {
    try{
        console.log("delete");  
        return await deleteInvoice(id);
    } catch (error) {
        const message =(error.response && error.response.data && error.response.data.message) ||error.message ||error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);  
    }
});

const invoiceSlice = createSlice({
    name: "invocie",
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(create_Invoice.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(create_Invoice.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload);
            state.invoices.push(action.payload);
            toast.success("Invoice added successfully");
        })
        .addCase(create_Invoice.rejected,(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        })
        .addCase(get_Invoice.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(get_Invoice.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log("action payload")
            console.log(action.payload);
            state.invoice = action.payload === undefined ? null : action.payload;
        })
        .addCase(get_Invoice.rejected,(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        })
        .addCase(get_Invoice_by_User.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(get_Invoice_by_User.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            console.log(action.payload);
            state.invoices = action.payload.data;
        })
        .addCase(get_Invoice_by_User.rejected,(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        })
        .addCase(delete_Invoice.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(delete_Invoice.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            toast.success("Invoice deleted successfully....");

            // return {
            //     ...state,
            //     // invoices: state.invoices.filter((invoice) => invoice._id!== action.payload),
            //     isLoading: false,
            //     isSuccess: true,
            //     isError: false,

            // }
        })
        .addCase(delete_Invoice.rejected,(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        })
        .addCase(update_Invoice.pending, (state)=>{
            state.isLoading = true;
        })
        .addCase(update_Invoice.fulfilled, (state, action)=>{
            // state.isLoading = false;
            // state.isSuccess = true;
            // state.isError = false;
            toast.success("Invoice updated successfully");
            console.log(action.payload);
            return {
                ...state,
                invoices: state.invoices.map((invoice) => invoice._id === action.payload._id ? action.payload : invoice),
                isLoading: false,
                isSuccess: true,
                isError: false,

            }
        })
        .addCase(update_Invoice.rejected,(state, action)=>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            toast.error(action.payload);
        });
    },
})

export const selectIsLoading = (state) => state.invoice.isLoading;
export const selectInvoice = (state) => state.invoice.invoice;

export default invoiceSlice.reducer;
