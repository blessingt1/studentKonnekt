import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './Signup'
import Login from './Login'
import Home from './home'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
       <Route path='/' element={<Navigate to='/home' />}></Route>
        <Route path='/register' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
