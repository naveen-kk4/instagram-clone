   
import { Link, NavLink } from "react-router-dom";
import logo from "../icons/27002.jpg";

   const Header = ()=>{
    return(
  <nav className="d-flex justify-content-between align-items-center">
    <div className="ms-2 logo"><span>image-gallery</span><img style={{width:"45px",height:"50px"}} src={logo}></img></div>
    <div className="d-flex justify-content-around">
    <p><NavLink className={"navlink"}  to=''>Home</NavLink></p>
   <p><NavLink className={"navlink"}  to='all-posts'>All Posts</NavLink></p>
   
   <p><NavLink  className={"navlink"} to='profile'>My profile</NavLink></p>
   
    </div>
  </nav>
       
    )
}
export default Header;