import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SET_LOGIN, SET_NAME } from '../redux/features/auth/authSlice';
import { getLoginStatus } from '../services/authServices';
import { toast } from 'react-toastify';


const useRedirectLoggedOutUser = (path) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const redirectLoogedOutUser = async() => {
            const isLoggedIn = await getLoginStatus();
            console.log("isLoggedIn...="+isLoggedIn)
            
            await dispatch(SET_LOGIN({flag: isLoggedIn, name: localStorage.getItem("name")?.substring(1,localStorage.getItem("name").length-1)}));            

        if(!isLoggedIn) {
            await dispatch(SET_NAME(""));
            console.log("not logged in")
            toast.info("Session expired, please login to continue.");
            navigate(path);
            return;
        }
    };
    redirectLoogedOutUser();
    }, [navigate, path, dispatch]);
};

export default useRedirectLoggedOutUser;
