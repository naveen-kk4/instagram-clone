import React,{useState,useContext,useEffect} from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const [joke, setJoke] = useState("");
    const [name, setName] = useState("");
    const {token, setToken} = useContext(UserContext);

    const navigate = useNavigate();

    console.log("token", token)

    useEffect(()=>{
       if(token == ""){
           // check for token in localstorage:
           let localTokenJSON = localStorage.getItem("token"); 
           if(localTokenJSON == undefined){
                navigate("/login")
           }
           else{
              setToken(JSON.parse(localTokenJSON))
           }

       }
       else getJoke();
    },[token])


   

    function getJoke(){
         axios.get("https://instagram-express-app.vercel.app/api/auth/zuku",{
            headers:{
                "authorization" : `Bearer ${token}`
            }
         })
         .then(response =>{
            console.log("joke", response.data.data.message)
            setJoke(response.data.data.message)
            setName(response.data.data.user.name)
         })
         .catch( err => console.log("Error", err.response.data.message))
    }


    async function logout(){
          console.log("I am executing")
          try{
              const response = await axios.delete("https://instagram-express-app.vercel.app/api/auth/logout",{
                headers:{
                    "authorization" : `Bearer ${token }`
                  }
                })
                alert("Logout Successful")
                // delete token from localstorage:
                localStorage.removeItem("token")
                setToken("");
                setName("");
                setJoke("");
                // navigate("/login")
          }
          catch(error){
                console.log("Error", error.response.data.message)
          }
    }


    return(
        <div>
           {name && <h1>Welcome back {name}!</h1>}
            {
                <p>{joke}</p>
            }
            <button onClick={logout}> Logout </button>
        </div>
    )
}


export default Dashboard;

