
import './App.css';
import Signup from "./Components/SignUp.js"
import Login from "./Components/Login.js"
import Dashboard from './Components/Dashboard.js';
import React,{useState} from "react";
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Layout from './Layout.js';
import Home from './Components/Home.js';
import Profile from './Components/Profile.js';
import AllPosts from './Components/AllPosts.js';
import Update from './Components/Update.js';

function App() {
  const[token,setToken] = useState("");
  return (
    <BrowserRouter >
    <Routes>
      <Route path='/' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home/' element={<Layout/>}>
        <Route path='' element={<Home></Home>}></Route>
        <Route path='profile' element={<Profile></Profile>}></Route>
        <Route path='all-posts' element={<AllPosts></AllPosts>}></Route>
        
      </Route>
      <Route path='/update' element={<Update></Update>}></Route>
      
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
