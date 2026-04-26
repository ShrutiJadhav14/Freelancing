import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import { Routes, Route } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import DeveloperDashboard from './pages/DeveloperDashboard'
import CompanyDashboard from './pages/CompanyDashboard'
import DeveloperProfile from './pages/DeveloperProfile'

function App() {
 

  return (
  <>
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

    <Route path="/developer" element={<DeveloperDashboard />} />
    <Route path="/company" element={<CompanyDashboard />} />

    <Route path="/developer/profile" element={<DeveloperProfile />} />
    </Routes> 
  </Router>
  

  </>
  )
}

export default App
