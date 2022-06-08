// IMPORT LOCATION
import { useLocation } from "react-router"

function Badlogin() {
    const location = useLocation()
    if (location.state = 'baduser') {
        return (
            <div>
            <h1>INVALID USERNAME/PASSWORD</h1>
            <a href="/"> LOGIN</a>
            </div>
        )
    }
}
export default Badlogin