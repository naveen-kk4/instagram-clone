import React,{useState, useContext, useEffect} from "react";
import axios from "axios"; 
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import plant from "../icons/plant.png"
import leaf from "../icons/leaf.png"



const Login = () => {
    const [user, setUser] = useState({email:"",password:""});
    const [message, setMessage] = useState("");
    const {setToken} = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(()=>{
        let localTokenJSON = localStorage.getItem("token"); 
        if(localTokenJSON != undefined){
            navigate("/home")
        }
  },[])

      function updateUser(e){
          
          let key = e.target.name;
          setUser({...user, [key]:e.target.value})
         
      }

      async function implementLogin(e){
            e.preventDefault();

            if(!user.email || !user.password){
                setMessage("Please fill all the fields")
                return;
            }


            try{
                const response =  await axios.post("https://instagram-express-app.vercel.app/api/auth/login",{
                    email:user.email,
                    password:user.password,
                })
               
                setMessage(response.data.message)
               
                
                // add token to localstorage:
              
                setToken(response.data.data.token);
                localStorage.setItem("token", response.data.data.token)

                setUser({email:"",password:""})
                // alert("Login Successful")
                setTimeout(()=>navigate("/home"), 1000)
                // navigate("/dashboard")
              }
            catch(error){
                console.log("Error", error.response.data.message)
                console.log("status", error.response.status)
                setMessage(error.response.data.message)
            }    
      }

    return (
        // <div>
        //     <h1>Login</h1>
        //     {
        //         message && <h2>{message}</h2>
        //     }
        //     <form onSubmit={implementLogin}>
                
        //         <input type="email" placeholder="Email"  name="email" required
        //             onChange={updateUser}
        //             value={user.email}
        //         />
        //         <br />
        //         <input type="password" placeholder="Password"  name="password" required
        //             onChange={updateUser}
        //             value={user.password}
        //         />
        //         <br />
        //         <button type="submit">Submit</button>
        //     </form>
        // </div>
        <div className="d-flex">
        <div className="welcome-page d-flex justify-content-center align-items-center">
          <h1>IMAGE GALLERY</h1>
          <img src={plant} ></img>
          <img className="leaf" src={leaf}></img>
        </div>
        
        <div className="d-flex align-items-center signup-login">
        
       
        
        <form onSubmit={implementLogin}>
            <h2>Login</h2>
        
        <label htmlFor="name" className="fs-6">Your email</label><br></br>
               <input className="mb-3" type="email" placeholder="Email"  name="email" required
                    onChange={updateUser}
                    value={user.email}
                />
                <br />
                <label htmlFor="password" className="fs-6">Password</label><br></br>
                <input className="mb-3" type="password" placeholder="Password"  name="password" required
                    onChange={updateUser}
                    value={user.password}
                />
                <br />
                <button type="submit">Submit</button>

                {
        message && <h2>{message}</h2>
    }
        </form>
       
        </div>
        
        </div>
    );
}

export default Login;






