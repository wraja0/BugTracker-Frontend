// IMPORT STYLES
import "../styles/App.css" 
// IMPORT HOOKS
import { useState, useEffect } from "react";
// IMPORT ROUTER HOOKS
import { useLocation, Outlet, Navigate } from "react-router";
// IMPORT NAVIGATION
import { Link } from "react-router-dom"
function Dashboard() {
  // MAP PASSED STATE USING USELOCATION
  const location = useLocation();
  const tokenState =location.state.token
  const URL = location.state.URL
  // DEFINE STATE FOR USER DATA
  const [user, setUser] = useState({})
  // AUTHENTICATE TOKEN
  useEffect(()=> {
    const checkLogin = async()=> {
      const res = await fetch(URL + "/user/login", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokenState.accessToken}`
        }
      });
      const userData = await res.json()
      // SET USER STATE TO USE DATA
      setUser(userData)
      console.log(userData)
    }
    checkLogin()
  }, [tokenState.accessToken,URL])
  // AGGREGATE DATA TO BE PASSED 
  const data = {
    URL: URL,
    token: tokenState
  } 
  // REDIRECT TO HANDLE INVALID LOGINS
  if (user.invalidLogin) {
    console.log(user)
    return <Navigate to="/badlogin" state={user.errortype} />
  }
  // RENDER WHEN AN AUTHENTICATED USER IS A DEVELOPER
  if (user.class === 'dev') {return (
    <div className="dashboard">
      <h1> {user.class} Dashboard</h1>
      <h2>Welcome {user.username}</h2>
      <nav>
        <Link to="viewallbugs" state={data}> Bug Queue </Link>
        <Link to ="cleared" state={data}>Bugs Cleared</Link>
        <a href="/">  Sign Out</a>
      </nav>
      <Outlet />
    </div>
  )}
  // RENDER WHEN AN AUTHENTICATED USER IS A MANAGER
  if (user.class === 'manager') {return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <h2>Welcome {user.username}</h2>
      <nav>
        <Link to="assignbug" state={data}> Assign a New Bug </Link>
        <Link to ="viewallbugs" state={data}>View all Bugs</Link>
        <a href="/">  Sign Out</a>
      </nav>
      <Outlet />
    </div>
  )}
  else return <div />
}
export default Dashboard;
