import "../styles/App.css" 
import Newbugform from "../components/Newbugform";
import { useLocation, Outlet } from "react-router";
import { Link } from "react-router-dom";
const URL = 'http://localhost:4000'
function Dashboard() {
  const location = useLocation();
  const user = location.state
  console.log(user)
      const updateBug = async(bug, id) => {
          await fetch(URL +'/bugs' + id + '/update', {
              method: "put",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(bug)
          })
      }
    if (user == null ) {return (
      <p>Unauthorized please login</p>
    )}
    if (user.class == 'dev') {return (
      <div>
        <h1>Dashboard</h1>
        <h2>Welcome {user.username}</h2>
        <nav>
          <Link to="queue" state={user}> Bug Queue </Link>
          <Link to ="cleared" state={user}>Bugs Cleared</Link>
        </nav>
        <Outlet />
      </div>
    )}
    if (user.class == 'manager') {return (
      <div>
        <h1>Dashboard</h1>
        <h2>Welcome {user.username}</h2>
        <nav>
          <Link to="assignbug" state={user}> Assign a New Bug </Link>
          <Link to ="viewallbugs" state={user}>View all Bugs</Link>
        </nav>
        <Outlet />
      </div>
    )}
}
export default Dashboard;
