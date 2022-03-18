// Module imports
import React from  "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// Page IMPORTS
import Register from './pages/Register'
import Login from './pages/login'
import Dashboard from './pages/Dashboard'
import Badlogin from './pages/Badlogin'
// COMPONENT IMPORTS
import Cleared from "./components/Cleared";
import Userqueue from "./components/Userqueue";
import BugsAll from "./components/BugsAll";
import Newbugform from "./components/Newbugform";
import Bugview from './components/Bugview'
//Define backend API Address
const URL = 'http://localhost:4000'
// Base Router Component
function App() {
    return (
        <Router>
    <React.StrictMode>
      <Routes>
       {/* REGISTER ROUTE */}
        <Route path="/register" element={<Register URL={URL} />}/>
        {/* DASHBOARD ROUTE */}
        <Route path ="/home" element={<Dashboard />} >
          <Route path="queue" element={<Userqueue />} >
          <Route path="bugview" element={<Bugview />} />
          </Route>
          <Route path="cleared" element={<Cleared />} />
          <Route path="viewallbugs" element={<BugsAll />} >
            <Route path="bugview" element={<Bugview />} />
          </Route>
          <Route path="assignbug" element={<Newbugform />} />
        </Route>
        <Route path='badlogin' element={<Badlogin />} />
        {/* LOGIN ROUTE */}
        <Route path="/" element={<Login URL={URL} />} />
      </Routes>
    </React.StrictMode>
  </Router>
    )
}
export default App