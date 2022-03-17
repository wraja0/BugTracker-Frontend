// IMPORT LOCATION
import { useLocation } from "react-router"

function Badlogin() {
    const location = useLocation()
    if (location.state = 'baduser') {
        return (
            <h1>INVALID USERNAME/PASSWORD</h1>
        )
    }
}
export default Badlogin