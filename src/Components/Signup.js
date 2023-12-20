
import React,{useEffect, useState} from "react";
import axios from "axios";
import { directive } from "@babel/types";

const Signup = ()=>{
    const[user,setUser] = useState({name:"",password:"",confirmPassword:"",email:""});
   

    function updateUser(e){
        
        setUser({...user,  [e.target.name]:e.target.value});
    }
    async function handleSignup(e){
        e.preventDefault();
        try{
            const res = await axios.post("https://instagram-express-app.vercel.app/api/auth/signup",{
                name:user.name,
                email:user.email,
                password:user.password
            });
            console.log(res.data.message);
        }
        catch(error){
            console.error(error.response.data.message);
        }
      
    }
   return(
    <div>
    <h1>SIGNUP</h1>
    <form onSubmit={handleSignup}>
    
   
    <hr/>

    <span><b>Name:</b></span>
    <input type="text" placeholder="Enter Name" name="name" required onChange={updateUser}/>
   <br></br>
    <span><b>Email:</b></span>
    <input type="email" placeholder="Enter Email" name="email" required onChange={updateUser}/>
    <br></br>
    <span><b>Password:</b></span>
    <input type="password" placeholder="Enter Password" name="password" required onChange={updateUser}/>
    <br></br>
    <span><b>Confirm Password:</b></span>
    <input type="password" placeholder="Confirm Password" name="confirmPassword" required onChange={updateUser}/>
    <br></br>
  <button type="submit">Submit</button>
    </form>
    </div>
   
   )
}
export default Signup;
