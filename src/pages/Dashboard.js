import "../styles/App.css" 
import Newbugform from "../components/Newbugform";
import { useEffect } from "react"; 
import Userfront from "@userfront/react";
import { useLocation, useNavigate } from "react-router";
const URL = 'http://localhost:4000'
const navigate = useNavigate
function Dashboard() {
  const location = useLocation();
  const user = location.state
    // useEffect(async() => { 
    //     const res = await fetch(URL + "/user", {
    //       method: "get",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDcyODM4MDZ9.OQCnSRVdi0w28qcdUqqp9aq86pw1a0XdYZPZIOdLLk4"
    //         }
    //       });
    //     const userData = await res.json();
    //     console.log(userData);
    //     return userData
    //   })
      const updateBug = async(bug, id) => {
          await fetch(URL +'/bugs' + id + '/update', {
              method: "put",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(bug)
          })
      }
    return (
      <div>
        <h1>Dashboard</h1>
        <Newbugform />
        <p>{user.username}</p>
      </div>
    );
}
export default Dashboard;
