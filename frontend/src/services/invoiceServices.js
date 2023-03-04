import axios from 'axios';
import { toast } from 'react-toastify';


export const getInvoice = async(id) => {
    try{
        const response = await axios.get(`/invoices/${id}`);
    console.log("res from get invoice= "+response);
    // console.log(...response);
    return response.data;
    }catch(error){
        console.log(error);
    }
}


export const getInvoicesByUser = async(searchQuery) => {
    const response = await axios.get(`/invoices/user?searchQuery=${searchQuery.search}`);
    return response.data;
}


export const createInvoice = async(formData) => {
    const response = await axios.post('/invoices', formData);
    return response.data;
}

export const updateInvoice = async(id, formData) => {
    const response = await axios.patch(`/invoices/${id}`, formData);
    return response.data;
}

export const deleteInvoice = async(id) => {
    const response = await axios.delete(`/invoices/${id}`);
    return response.data;
}