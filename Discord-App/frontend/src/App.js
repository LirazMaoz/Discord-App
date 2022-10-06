import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './authPages/LoginPage/LoginPage'
import RegisterPage from './authPages/RegisterPage/RegisterPage'
import Dashboard from './authPages/Dashboard/Dashboard'
import './App.css'
import AlertNotifiction from './shared/components/AlertNotifiction'


function App() {
  return (
    <>
      <Routes>
        <Route exact path="/login" element={<LoginPage />}></Route>
        <Route exact path="/register" element={<RegisterPage />}></Route>
        <Route exact path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
      <AlertNotifiction/>
    </>
  )
}

export default App
