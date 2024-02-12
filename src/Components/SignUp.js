
import React,{useEffect, useState,useContext} from "react";
import axios from "axios";
import  UserContext  from "../Context/UserContext";
import  {useNavigate} from 'react-router-dom';
import plant from "../icons/plant.png"
import leaf from "../icons/leaf.png"


const SignUp = ()=>{
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("token")!==null){
            navigate("/home");
          
        }
    },[])
    
    const[user,setUser] = useState({name:"",password:"",confirmPassword:"",email:""});
    const[message,setMessage] = useState('');
    const {setToken}=useContext(UserContext);
  
   

    function updateUser(e){
        
        setUser({...user,  [e.target.name]:e.target.value});
    }
    async function handleSignup(e){
        e.preventDefault();
        if(user.password !== user.confirmPassword){
            setMessage("Invalid password");
            return;
        }
        if(!user.email.includes('@') || !user.email.includes('.')){
            setMessage("Invalid email");
            return;
        }
        try{
            const res = await axios.post("https://instagram-express-app.vercel.app/api/auth/signup",{
                name:user.name,
                email:user.email,
                password:user.password
            });
            setMessage(res.data.message);
             setToken(res.data.data.token);
           
            setUser({name:"",password:"",confirmPassword:"",email:""});
            localStorage.setItem("token",res.data.data.token);
            setTimeout(()=>{
                navigate('/home');
             },300);
        }
        catch(error){
            setMessage(error.response.data.message);
        }
      
    }
   return(
    <div className="d-flex">
    <div className="welcome-page d-flex justify-content-center align-items-center">
      <h1>IMAGE GALLERY</h1>
      <img src={plant} ></img>
      <img className="leaf" src={leaf}></img>
    </div>
    
    <div className="d-flex align-items-center signup-login">
    
   
    
    <form onSubmit={handleSignup}>
    
   
     <h2 className="fw-bolder fs-1 my-2">Sign  up</h2>

    <label htmlFor="name" className="fs-6">Your Name</label><br></br>
    <input className="mb-2" type="text" id="name" placeholder=" Enter Name" name="name" required onChange={updateUser} value={user.name}/>
   <br></br>
    <label htmlFor="email" className="fs-6">Email Address</label><br></br>
    <input className="mb-2" type="email" id="email" placeholder=" Enter Email" name="email" required onChange={updateUser} value={user.email}/>
    <br></br>
    <label htmlFor="password" className="fs-6">Password</label><br></br>
    <input className="mb-2"  type="password" id="password" placeholder=" Enter Password" name="password" required onChange={updateUser} value={user.password}/>
    <br></br>
    <label htmlFor="confirm-password" className="fs-6">Confirm Password</label><br></br>
    <input className="mb-4" type="password" id="confirm-password" placeholder=" Confirm Password" name="confirmPassword" required onChange={updateUser} value={user.confirmPassword}/>
    <br></br>
  <button type="submit">Create Account</button>
  {
        message && <h2>✖{message}✖</h2>
    }
    </form>
   
    </div>
    
    </div>
    
   
   )
}
export default SignUp;
