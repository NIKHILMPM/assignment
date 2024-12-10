import react, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Login } from './components/Login'
import { Register } from './components/Register'
import { Home } from './components/Home'
import { Report } from './components/Report'


function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route index element={<Login />} />
          <Route path='/login' element={<Login />} />\
          <Route path='/register' element={<Register />} />\
          <Route path='/Home' element={<Home />} />
          <Route path='/report' element={<Report />} />

        </Routes>
      </Router>

    </>
  )
}

export default App
