import React, { useState } from 'react';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from "../../../services/authServices";
import { SET_LOGIN, SET_NAME, SET_PROFILE } from '../../../redux/features/auth/authSlice';
import { create_Profile, SET_CREATEPROFILE } from '../../../redux/features/profile/profile';
import { createProfile } from '../../../services/profileServices';
// import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
// import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";




  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  };

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(false);
    const [formData,setFormData] = useState(initialState);
    const { firstName, lastName, email, password, password2 } = formData;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const registerUser = async (e) => {
        e.preventDefault();

        if(!firstName || !lastName || !email || !password){
            return toast.error("All fields are required");
        }
        if(password.length < 6){
            return toast.error("Password must be up to 6 characters");
        }
        // if(!validateEmail(email)){
        //     return toast.error("Please enter a avalid email");
        // }
        if(password !== password2){
            return toast.error("Passwords do not match");
        }

        const userData = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword: password2
        };
        setIsLoading(true);
        try{
            // await createProfile(userData);
            const data = await register(userData);
            console.log(data);
            console.log(data.result);
            await dispatch(SET_LOGIN({flag: true, name: data?.result?.name}));
            await dispatch(SET_NAME(data.result.name));
            const info = {
                name: data?.result?.name,
                email: data?.result?.email,
                userId: data?.result?._id,
                phoneNumber: '',
                businessName: '',
                contactAddress: '',
                logo: '',
                website: ''
            };
            const pro = await createProfile(info);
            console.log(pro);
            await dispatch(SET_CREATEPROFILE(pro));
            await dispatch(SET_PROFILE({result: data?.result, token: data?.token, userProfile:pro}));

            navigate("/dashboard");
            setIsLoading(false);
        }catch(error){
            console.log("error"+error)
            toast.error(error);
            setIsLoading(false);
        }
    }
  return (
    <div>
        <div className='flex justify-center items-center h-[90vh]'>
                <button className='btn btn-outline btn-primary btn-sm text-lg font-normal mr-1 mt-2 rounded-2xl normal-case absolute top-14 left-1'>
                    <Link to="/" className='text-primary hover:text-white'>Back</Link>
                </button>
                <div class="p-4 w-4/5 sm:w-3/4 md:w-1/2 lg:w-1/4 bg-slate-700 rounded-xl">
                <form class="form-control flex justify" onSubmit={registerUser}>
                    <input type="text" placeholder="First Name" required name='firstName' value={firstName} onChange={handleInputChange} class="input"/>

                    <input type="text" placeholder="Last Name" required name='lastName' value={lastName} onChange={handleInputChange} class="input"/>

                    <input type="email" placeholder="Email" required name='email' value={email} onChange={handleInputChange} class="input mt-2"/>

                    <input type="password" placeholder="Password" required name='password' value={password} onChange={handleInputChange} class="input mt-2"/>

                    <input type="password" placeholder="Confirm Password" required name='password2' value={password2} onChange={handleInputChange} class="input mt-2"/>

                    <div className='flex justify-center'>
                    <button className='btn btn-sm text-xl mt-4 pb-1 normal-case bg-blue-600 text-white
                        hover:bg-blue-400 hover:text-black shadow-md shadow-blue-300 border-none' type='submit'>Register</button>
                    </div>
                    <div className='text-white mt-4 flex justify-center'>
                        <p>&nbsp; Already have an account?&nbsp;</p>
                        <Link to="/login" className='font-bold text-blue-500'>Login</Link>
                    </div>
                </form>
                </div>
            </div>
        
    </div>
  )
}

export default Register
