import axios from 'axios';
import { toast } from 'react-toastify';


export const getProfile = async(id) => {
    const response = await axios.get(`/profiles/${id}`);
    return response.data;
}

export const getProfiles = async() => {
    const response = await axios.get('/profiles');
    return response.data;
}

export const getProfileByUser = async(searchQuery) => {
    const response = await axios.get(`/profiles?searchQuery=${searchQuery.search}`);
    return response.data;
}

export const getProfileBySearch = async(searchQuery) => {
    const response = await axios.get(`/profiles/search?searchQuery=${searchQuery.search}`);
    return response.data;
}

export const createProfile = async(formData) => {
    const response = await axios.post('/profiles', formData);
    return response.data;
}

export const updateProfile = async(id, formData) => {
    const response = await axios.patch(`/profiles/${id}`, formData);
    return response.data;
}

export const deleteProfile = async(id) => {
    const response = await axios.delete(`/profiles/${id}`);
    return response.data;
}