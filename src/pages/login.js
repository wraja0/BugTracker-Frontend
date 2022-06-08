//IMPORTS
// IMPORT STYLES
import "../styles/App.css"
// IMPORT HOOKS
import { useState } from "react"
// IMPORT ROUTER HOOKS
import { Navigate, Outlet} from "react-router"
import {Link} from 'react-router-dom'
function Login(props) {
    // SET BACKEND API ADDRESS
    const URL = props.URL
    // LOGIN FORM STATE
    const [loginForm, setLoginForm] = useState({
        username: "",
        password:""
    })
    // TOKEN STATE 
    const [tokenState,setTokenState] = useState({})
    // CHANGE LOGIN FORM HANDLER
    const handleChange = (event,)=> {
        setLoginForm({...loginForm, [event.target.name]: event.target.value })
    }
    // GET LOGIN TOKEN
    const handleLogin = async (data)=> { 
        // SIGN TOKEN
        const res = await fetch(URL + "/generateLoginToken", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              username: data.username,
              password:data.password
            })
        });
        const token = await res.json();
        setTokenState(token)
    }
    // SUBMIT LOGIN FORM HANDLER 
    const handleSubmit = (event)=> {
        event.preventDefault()
        handleLogin(loginForm)
        setLoginForm({
            ...loginForm,
            username: "",
            password: ""
        })
    }
    // IF USER HAS NOT GENERATED AN ACCESS TOKEN VIA THE LOGIN BUTTON 
    if (!tokenState.accessToken) return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                name="username"
                type="text"
                value={loginForm.username}
                placeholder="username"
                onChange={handleChange}
                />
                <input
                name="password"
                type="text"
                value={loginForm.password}
                placeholder="password"
                onChange={handleChange}
                />
                <input onSubmit={handleSubmit}
        type="submit" value="Submit Login" />
            </form>
            <nav>
                <Link to='Register'>Register</Link>
            </nav>
        </div>

    )
    // REDIRECT FOR WHEN AN ACCESS TOKEN HAS BEEN GENERATED 
    else return <Navigate to={'/home'} state={{URL:URL,token:tokenState}} />

}
export default Login;