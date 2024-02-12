import React, { useState,useEffect,useContext, useRef} from "react";
import axios from "axios";
import UserContext from "../Context/UserContext";
import InfiniteScroll from "react-infinite-scroll-component";

const AllPosts=()=>{
    const[data,setData]=useState([]);
    const token = localStorage.getItem("token");
    const[items,setItems] = useState([]);
    const[hasMore,setHasMore] = useState(true);
    const loaderEle = useRef();

    useEffect( ()=>{
        console.log(token);
        axios.get("https://instagram-express-app.vercel.app/api/post/all-posts",{
            headers:{
                "authorization" : `Bearer ${token}`
            }
         })
         .then(response =>{
            
            setData(response.data.data);
            localStorage.setItem("pageNum","10");
            loaderEle.current.style.display = "none";
            setItems(response.data.data.slice(0,10));
           
         })
         .catch( err => console.log("Error", err))
    },[])

    function addData(){
        console.log(items);
        let limit = Number(localStorage.getItem("pageNum"));
        if(limit<data.length){
            setItems([...items,...data.slice(limit,limit+10)]);
             localStorage.setItem("pageNum",limit+10);
             
        }
        else setHasMore(false);
    }
    return(
        <>
       <div className="myProfile-h1"><h2 >ALL POSTS</h2></div> 
        <div id="parentScrollDiv" style={{width:"100%",height:"100vh",overflow:"auto"}} >
        <InfiniteScroll className="d-flex flex-wrap gap-5 " dataLength={items.length} next={addData} 
            hasMore={hasMore}
            loader={ <section className="sec-loading">
            <div className="one">
            </div>
          </section>}
            scrollableTarget="parentScrollDiv"
            >
      
           
            {
               items && items.length!=0 && items.map((item)=>(
                
                <div id={item._id} className="card" style={{width:"18rem"}}>
  <img src={item.image} className="card-img-top" style={{height:"250px",width:"18rem"}} alt={"...image unavailable"}/>
  <div className="card-body">
    <p className="card-text">Note:<b>{item.text}</b></p>
  </div>
</div>
               ))
            }
        </InfiniteScroll>    
        </div>
        <section ref={loaderEle} className="sec-loading">
            <div className="one">
            </div>
          </section>
        
        </>
    )
}
export default AllPosts;