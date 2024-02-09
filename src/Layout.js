import { Outlet } from "react-router-dom";
import React from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";


const Layout = ()=>{
    return(
        <>
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
        </>
    )
}
export default Layout;