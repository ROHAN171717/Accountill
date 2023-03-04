import React, { useState } from 'react';
import useRedirectLoggedOutUser from '../../customeHook/useRedirectLoggedOutUser';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {useTheme} from '@mui/material/styles';
import TextField from '@mui/material/TextField';


import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import MailIcon from '@mui/icons-material/Mail';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const useStyles = makeStyles(() => ({
    root: {
      width: '100%',
      maxWidth: 450,
      // backgroundColor: "#EEEEEE",
    },
    large: {
      width: useTheme().spacing(12),
      height: useTheme().spacing(12),
    },
  }));

const Settings = () => {

    useRedirectLoggedOutUser("/login");

    const classes = useStyles();

    const [isEdit, setIsEdit] = useState(false);


    const data = [
      {
        icon:<BusinessCenterIcon/>,
        text: "AccountBalance"
      },
      {
        icon:<LocationOnIcon/>,
        text: "AccountBalance"
      },
      {
        icon:<PhoneInTalkIcon/>,
        text: "AccountBalance"
      },
      {
        icon:<MailIcon/>,
        text: "AccountBalance"
      },
      {
        icon:<AccountBalanceWalletIcon/>,
        text: "AccountBalance"
      },
    ]
  return (
    <div className='ml-16 pb-4 bg-gray-200' style={{minHeight: "92.7vh"}}>
      <div className='mx-6 pt-6'>
        <div className='text-center'>
            <h1 className='text-4xl font-bold'>Profile Settings</h1>
            <h1 className='mt-2'>Edit your business profile</h1>
        </div>
        <div className='bg-white border-2 border-gray-400 rounded-md p-4 w-1/3 mx-auto mt-6'>
          <div className='mx-auto border-b-2 border-gray-400 pb-6'>
            <Avatar src="https://images.unsplash.com/photo-1677069757778-65595c65bcce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" alt="Rohan" style={{margin:"auto", fontSize:"50px"}} className={classes.large}/>
          </div>
          {!isEdit && (
            <div className='mt-4'>
              <div className='flex flex-col'>

              {data.map((e) => (
                // console.log(e);
                <div className='flex my-1'>
                  <div>{e.icon}</div>
                  <span className='ml-6 text-lg'>{e.text}</span>
                </div>
              ))}

              </div>
              <div className='flex justify-center'>
              <button className="btn btn-sm text-2xl mt-4 normal-case bg-blue-600 text-white
              hover:bg-blue-400 border-none hover:text-black w-full h-12" type='submit' onClick={() => setIsEdit(true)} >Edit Profile</button>
              </div>
            </div>
          )}

          {
            isEdit && (
              <div className='mt-4'>
                <input type="file" className="file-input file-input-bordered w-full max-w-full mt-2" />

                <div className='flex justify-between my-4'>
                <TextField
                label="Email Address"
                type="text"
                required
                sx={{width:"48%"}}
                />

                <TextField
                label="Phone Number"
                type="text"
                required
                sx={{width:"48%"}}
                />
                </div>

                <div className='my-4'>
                  <TextField
                  label="Business Name"
                  type="text"
                  required
                  sx={{width:"100%"}}
                  />
                </div>
                <div className='my-4'>
                  <TextField
                  label="Contact Address"
                  type="text"
                  required
                  sx={{width:"100%"}}
                  />
                </div>
                <div className='my-4 w-full'>
                  <TextField
                  label="Payment Details / Notes"
                  type="text"
                  required
                  multiline
                  rows={3}
                  sx={{width:"100%"}}
                  />
                </div>
                <div className='flex justify-center'>
                <button className="btn btn-sm text-2xl mt-4 normal-case bg-blue-600 text-white
                hover:bg-blue-400 border-none hover:text-black w-full h-12" type='submit' onClick={() => setIsEdit(true)} >Update Profile</button>
                </div>
                
              </div>
            )
          }

        </div>
      </div>
    </div>
  )
}

export default Settings;
