import {Button, TextField , Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios'
import Logo from '../assets/logo.svg'


function Register() {

  const [userName,setUserName]=useState("")
  const [password,setPassword]=useState("")
  const [email,setEmail]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")

  async function handleClick (event) 
  {
    event.preventDefault;
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
          <Input type = 'text'   label="Username" onChange={(e)=>setUserName(e.target.value)}/>
          <Input type='email' label="Email" onChange={(e)=>setEmail(e.target.value)}></Input>
          <Input type='password' label="Password" onChange={(e)=>setPassword(e.target.value)}></Input>
          <Input type='password' label="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)}></Input>
          <div className="flex justify-center mt-14"><Button variant="contained"   onSubmit={handleClick} className="w-36">Sign Up</Button></div>
          <div className="text-center pt-4 text-white">
            Already have an account ? <Link className='text-blue-600' to="/login">Login</Link>
          </div>
        </div>
        </div>
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