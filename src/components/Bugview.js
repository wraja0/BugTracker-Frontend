import userEvent from "@testing-library/user-event";
import { useEffect, useState } from "react";
import { useInRouterContext } from "react-router"
function Bugview(props) {
    const token = props.token
    const URL = props.URL
    const bug = props.bug
    const [user, setUser] = useState({})
    const [bugState, setBugState] = useState("")
    const [testArr,setTestArr] = useState([])
    useEffect(()=> {
        const loginUser = async()=> {
            const res = await fetch(URL+'/user/login', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token.accessToken}`
                }
            })
            const userData = await res.json();
            setUser(userData);
        }
        const fetchBug = async(data)=> {
            const res = await fetch(URL+ '/bugs', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token.accessToken}`
                },
                body: JSON.stringify({
                    id: data
                })})
            const bugData = await res.json()
            console.log(bugData)
            const bugBodyData = await bugData.bug.codeBase
            const tests = await bugData.tests
            setBugState(bugBodyData)
            setTestArr(tests)
        }
        loginUser();
        fetchBug(bug);
    },[])
    const mappedTests = testArr.map((data,index)=>{
        if (user.class === 'dev') {
            return (<div key={index}>
                <p>Test #{index+1} {data.body}</p>
                </div>
            )
        }
        if (user.class === 'manager') return (
            <div key={index}>
            <p>Test #{index+1} {data.body}</p>
            </div>
        )
    })
    const handleChange = (event)=> {
        setBugState(event.target.value)
    }
    console.log(mappedTests)
    return (
        <div>
            <textarea
            onChange={handleChange}
            ON
            value={bugState} />
            {mappedTests}
            <p>Assigned Users : {}</p>
        </div>
    )
}
export default Bugview