import axios from 'axios';
import { toast } from 'react-toastify';


export const getClient = async(id) => {
    const response = await axios.get(`/clients/${id}`);
    return response.data;
}

export const getClientByUser = async(searchQuery) => {
    const response = await axios.get(`/clients/user?searchQuery=${searchQuery.search}`);
    return response.data;
}

export const createClient = async(formData) => {
    const response = await axios.post('/clients', formData);
    return response.data;
}

export const updateClient = async(id, formData) => {
    const response = await axios.patch(`/clients/${id}`, formData);
    return response.data;
}

export const deleteClient = async(id) => {
    const response = await axios.delete(`/clients/${id}`);
    return response.data;
}