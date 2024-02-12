import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate} from "react-router-dom";
const Update=()=>{
    const location = useLocation();
    const navigate = useNavigate();
    const [text,setText] = useState(location.state.postText);
    const token = localStorage.getItem("token");
    async function handleUpdate(){
        try{
        const response=await axios.put(`https://instagram-express-app.vercel.app/api/post/update/${location.state.id}`,{
           
            text:text
           },{ headers:{
            "authorization" : `Bearer ${token}`
        }}) ;
        navigate("/home/profile");
    }
    catch(error){
        console.log(error);
    }
        
    }
    return(
        <div  className="card upd-card" style={{width: "18rem"}}>
                <img style={{height:"250px",width:"18rem"}} src={location.state.img}></img>
                   <div className="d-flex gap-3 py-2 mx-1">
                  <input style={{border:"1px solid blue",outline:"none"}} maxLength="45" type="text" class="card-text" value={text} onChange={(e)=>setText(e.target.value)} ></input>
                  <button onClick={handleUpdate} className="button-21">update</button>
                  </div> 
                  
                </div>
                
             
                
               
              
    )
}

export default Update;