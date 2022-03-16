import React from  "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Page IMPORTS
import Register from './pages/Register'
import Login from './pages/login'
import Dashboard from './pages/Dashboard'
// COMPONENT IMPORTS
import Cleared from "./components/Cleared";
import Userqueue from "./components/Userqueue";
import BugsAll from "./components/BugsAll";
import Newbugform from "./components/Newbugform";

function App() {
    return (
        <Router>
    <React.StrictMode>
      <Routes>
        <Route path="/register" element={<Register />}/>
        <Route path ="/home" element={<Dashboard />} >
          <Route path="queue" element={<Userqueue />} />
          <Route path="cleared" element={<Cleared />} />
          <Route path="viewallbugs" element={<BugsAll />} />
          <Route path="assignbug" element={<Newbugform />} />
        </Route>
        <Route path="/" element={<Login />} />
        {/* <Route path="reset" element={<Reset />} />  */}
      </Routes>
    </React.StrictMode>
  </Router>
    )
}
export default App