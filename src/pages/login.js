//IMPORTS
import "../styles/App.css"
import { useState, createContext } from "react"
import { Navigate} from "react-router"
import { useLocation } from "react-router"
const URL = 'http://localhost:4000'
function Login(props) {
    const userContext = createContext();
    const location= useLocation();
    // STATES
    const [loginForm, setLoginForm] = useState({
        username: "",
        password:""
    })
    const [user, setUser] = useState({
        isAuth : false
    })

    // CHANGE HANDLERS

    const handleChange = (event,)=> {
        setLoginForm({...loginForm, [event.target.name]: event.target.value })
    }
    const handleLogin = async (data)=> { 
        const res = await fetch(URL + "/login", {
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
        console.log(token.accessToken);
        const res2 = await fetch(URL + "/user", {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token.accessToken}`
              }
            });
        const userData = await res2.json()
        userData.isAuth = true
        console.log(userData)
        setUser(userData)
        console.log(user)
    }
    const handleSubmit = (event)=> {
        event.preventDefault()
        handleLogin(loginForm)
        setLoginForm({
            ...loginForm,
            username: "",
            password: ""
        })
    }
    // COMPONENT
    if (!user.username) return (
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
        </div>
    )
    else return <Navigate to={'/home'} state={user} />

}
export default Login;