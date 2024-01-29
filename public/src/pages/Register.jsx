import {Button, TextField , Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import Logo from '../assets/logo.svg'
import {ToastContainer, toast} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

function Register() {

  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [email,setEmail]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")

  const navigate = useNavigate()

  const toastOptions = {
      position : "bottom-right",
      autoClose : 8000,
      pauseOnHover : true,
      draggable : true,
      theme : 'dark'
  }

  useEffect(() => {
    if (localStorage.getItem('chat-app-user'))
    {
      navigate('/')
    }
  }, [])
  
  async function handleClick (event) 
  {
    event.preventDefault();
    if(handleValidation())
    {
      const {data}  = await axios.post(registerRoute, {
        username,
        email,
        password,
      })
      if (data.status === false){
        toast.error(data.msg, toastOptions)
      }
      if (data.status === true){
        localStorage.setItem('chat-app-user', JSON.stringify(data.user))
        navigate('/')
      }
    }
  }

  function handleValidation () {
    if(password != confirmPassword){
      toast.error('password and confirm password should be same', toastOptions)
      return false;
    }
    else if (username.length < 3){
      toast.error('username should be more than 3 characters', toastOptions)
      return false;
    }
    else if (password.length < 3){
      toast.error('Password should be equal or greater than 8 characters', toastOptions)
      return false;
    }
    else if (email === ''){
      toast.error('email is required', toastOptions)
      return false;
    }
    return true;
  }

  return (
    <div className='bg-[#131324]'>
        <div className="flex flex-col h-screen justify-center items-center ">
        <div>
        <img className="w-24" src={Logo} alt="" />
        <Typography variant="h6" className="text-center text-white">
          SNAPPY
        </Typography>
        </div>
        
        <div className="m-4 p-5 w-96 bg-[#00000076] rounded-xl">
          <Input type = 'text'   label="Username" onChange={(e)=>setUsername(e.target.value)}/>
          <Input type='email' label="Email" onChange={(e)=>setEmail(e.target.value)}></Input>
          <Input type='password' label="Password" onChange={(e)=>setPassword(e.target.value)}></Input>
          <Input type='password' label="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)}></Input>
          <div className="flex justify-center mt-14"><Button variant="contained"   onClick={(event) => {handleClick(event)}} className="w-36">Sign Up</Button></div>
          <div className="text-center pt-4 text-white">
            Already have an account ? <Link className='text-blue-600' to="/login">Login</Link>
          </div>
        </div>
        </div>

        <ToastContainer />
    </div>
  )
}

function Input(proms) {
  return (
      <div className="m-4">
      <TextField 
      sx={{ input: { color: 'white' }, border: "0.01rem solid blue", borderRadius: "4px"}}
      InputLabelProps={{
        sx:{
          color : "gray",
          
        }
      }}
  id="outlined-basic" label={proms.label}  variant="outlined" type={proms.type} className="w-full"
    
      onChange={proms.onChange}
      ></TextField>
      </div>
  )
}

export default Register