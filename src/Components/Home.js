import bg from "../icons/hd-bg.jpg"



const Home = ()=>{
    console.log(localStorage.getItem("token"));
    return(
<>

        <div ><img style={{width:"100%"}} src={bg}></img></div>
        <p className="hd-text">"Emotional Sense Of Photography"</p>
        </>
    )
}
export default Home;