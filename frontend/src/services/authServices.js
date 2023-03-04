import axios from 'axios';
import { toast } from 'react-toastify';

// const axios = axioss.create({ baseURL: "http://localhost:3001" });

//REGISTER USER
export const register = async(userData) => {
    try{
        const response = await axios.post("/users/signup",userData);
        if(response.statusText === "OK"){
            toast.success("User Registered successfully");
        }
        return response.data;
    }catch(error){
        const message =(error.response && error.response.data && error.response.data.message) ||error.message ||error.toString();
        toast.error(message);
    }

}

//LOGIN USER
export const login = async (userData) => {
    try{
        const response = await axios.post("/users/signin",userData);
        if(response.statusText === "OK"){
            toast.success("Login Successfully");
        }
        return response.data;
    }catch(error){
        console.log(error.response.data);
        
        const message =(error.response && error.response.data && error.response.data.message) ||error.message ||error.toString();
        toast.error(message);
    }

}

//LOGOUT USER
export const logoutUser = async () => {
    try{
        await axios.get(`/users/logout`);
    }catch(error){
        const message =(error.response && error.response.data && error.response.data.message) ||error.message ||error.toString();
        toast.error(message);
    }

}

//GET LOGIN STATUS
export const getLoginStatus = async () => {
    try{
        const response = await axios.get(`/users/loggedIn`);
        // console.log("response="+response);
        // console.log(response.data);
        return response.data;
    }catch(error){
        console.log("error");
        const message =(error.response && error.response.data && error.response.data.message) ||error.message ||error.toString();
        console.log(message);
        toast.error(message);
    }
}

//FORGOT PASSWORD
export const forgot = async (userData) => {
    try{
        const response = await axios.post("/users/forgot",userData);
        toast.success(response.data.message);
    }catch(error){
        const message =(error.response && error.response.data && error.response.data.message) ||error.message ||error.toString();
        toast.error(message);
    }

}

//RESET PASSWORD
export const reset = async (userData, resetToken) => {
    try{
        const response = await axios.put(`/users/reset/${resetToken}`,userData);
        return response.data;
    }catch(error){
        const message =(error.response && error.response.data && error.response.data.message) ||error.message ||error.toString();
        toast.error(message);
    }
}