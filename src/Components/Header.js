   
import logo from "../icons/27002.jpg";

   const Header = ()=>{
    return(
  <nav className="d-flex justify-content-between align-items-center">
    <div className="ms-2 logo"><span>image-gallery</span><img style={{width:"45px",height:"50px"}} src={logo}></img></div>
    <div className="d-flex justify-content-around">
   <p>All posts</p>
   <p>My profile</p>
    </div>
  </nav>
       
    )
}
export default Header;