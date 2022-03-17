import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router"
import { Link, } from 'react-router-dom';
const URL = 'http://localhost:4000'

function BugsAll() {
    const location = useLocation();
    const user = location.state.user
    const bugQueue = user.bugsQue
    const [queState,setQueState] = useState("")
    useEffect ( ()=> {
        const fetchBug =async()=> {
            const res= await fetch(URL+'/login', {
                method: 'post', 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: user.username,
                    password: user.password
                })
            })
            const token = await res.json();
            console.log(`yer token here ${JSON.stringify(token)}`)
            const res2 = await fetch(URL+ '/bugs', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token.accessToken}`
                },
                body: JSON.stringify({
                    ids: bugQueue
                })
            })
            const bugData = await res2.json();
            console.log(bugData)
            const newData = await bugData.bugQue
            const testData = await bugData.testArr
            console.log(testData)
            console.log(newData)
            const bugQueues =newData.map((data,index)=> {
            
                return (
                        <Link key={index} state={{user:user,bug:data.codeBase,tests:testData[index]}} to={'bugview'}> Bug # {index+1}</Link>
                )
            })
            setQueState(bugQueues)
            console.log(bugQueues)
        }
        fetchBug()
        }, [])
    return (
        <div>
            All Bugs
            <nav>
            {queState}
            </nav>
            <Outlet />
        </div>
    )
}
export default BugsAll