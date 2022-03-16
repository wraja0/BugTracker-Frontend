import {useLocation} from 'react-router'
function Userqueue() {
    const location = useLocation();
    const user = location.state
    const bugQueue = user.bugsQue
    console.log(bugQueue)
    return (
        <div>
            Userqueue
        </div>
    )
}
export default Userqueue