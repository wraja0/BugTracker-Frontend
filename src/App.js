import React from  "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from './pages/Register'
import Login from './pages/login'
import Dashboard from './pages/Dashboard'
import Reset from './pages/reset'

function App() {
    return (
        <Router>
    <React.StrictMode>
      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path ="/home" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
        <Route path="reset" element={<Reset />} /> 
      </Routes>
    </React.StrictMode>
  </Router>
    )
}
export default App