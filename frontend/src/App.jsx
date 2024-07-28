import { useState, Suspense } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import {Signup} from "./pages/Signup";
import {Signin} from "./pages/Signin";
import {Dashboard} from "./pages/Dashboard";
import {SendMoney} from "./pages/Send";
import {Profile} from "./pages/Profile";

function App() {
  return (
   <>
    <BrowserRouter>

      <Routes>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/send" element={<SendMoney/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>

    </BrowserRouter>
   </> 
  )
}

export default App
