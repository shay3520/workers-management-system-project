
import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './Pages/Login/Login'
import { Register } from './Pages/Register/Register'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/register" />} /> {/* Default route */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
