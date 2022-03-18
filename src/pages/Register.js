// Import styles
import "../styles/App.css"
// Import Hooks
import { useState } from "react";

function Register(props) {
  // Set backend API Address 
  const URL = props.URL
  // Set States
  const [user, setUser] = useState("")
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password:"",
    class: ""
  })
  const registerUser = async(data)=> {
    const res = await fetch(URL + "/generateRegisterToken", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
          username:data.username,
          password:data.password,
          class:data.class
        })
    });
    const token = await res.json();
    console.log(token)
    const res2 = await fetch(URL + "/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.accessToken}`
        }
      });
      const userData = await res2.json()
      setUser(userData)
      console.log(user)
  }
  const handleChange = (event,)=> {
    setRegisterForm({...registerForm, [event.target.name]: event.target.value })
  }
  const handleSubmit = (event)=> {
    event.preventDefault()
    registerUser(registerForm)
    setRegisterForm({
        ...registerForm,
        username: "",
        password: "",
        class: ""
    })
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
                <input
                name="username"
                type="text"
                value={registerForm.username}
                placeholder="username"
                onChange={handleChange}
                />
                <input
                name="password"
                type="text"
                value={registerForm.password}
                placeholder="password"
                onChange={handleChange}
                />
                <select
                name="class"
                value={registerForm.class}
                onChange={handleChange} 
                >
                  <option value="dev" >Dev Class</option>
                  <option value="manager">Manager Class</option>
                  <option value="guest">Guest</option>
                </select>
                <input onSubmit={handleSubmit}
                  type="submit"
                  value="Resister"
                />
            </form>
    </div>
  );
}

export default Register;
