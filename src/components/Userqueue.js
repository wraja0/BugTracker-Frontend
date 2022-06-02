import {Outlet, useLocation} from 'react-router'
import {useEffect, useState} from 'react'
import { type } from '@testing-library/user-event/dist/type';
import { Link, } from 'react-router-dom';
const URL = 'http://localhost:4000'
function Userqueue() {
    const location = useLocation();
    const URL = location.state.URL
    const token = location.state.token
    const [bugIds, setBugIds] = useState({})
    const [queState, setQueState] = useState("")
    // FOR REFRENCE WHEN YOU WAKE UP YOU WERE WORKING ON THIS ROUTE IMPORT USELOCATION AND GET THE TOKEN OUT SO U CAN REMOVE THE EXTRA REQUEST
    useEffect ( ()=> {
        const fetchBugIdFromUser = async()=> {
            const res = await fetch(URL+ '/user/login', {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.accessToken}`
                }
            })
            const userData = await res.json();
            setBugIds(userData.bugsQue)
        }
        const fetchBug =async()=> {
            const res = await fetch(URL+ '/bugs', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token.accessToken}`
                },
                body: JSON.stringify({
                    ids: bugIds
                })
            })
            const bugData = await res.json();
            console.log(bugData)
            const newData = await bugData.bugQue
            const testData = await bugData.testArr
            console.log(testData)
            console.log(newData)
            const bugTests = testData.map((data,index)=>{
                return (
                    <div key={index}>
                        {data.body}
                    </div>
                )
            })
            const bugQueues =newData.map((data,index)=> {
                console.log(bugTests)
                return (
                        <Link key={index} state={{bug:data.codeBase,tests:testData[index]}} to={'bugview'}> Bug # {index+1}</Link>
                )
            })
            setQueState(bugQueues)
            console.log(bugQueues)
        }
        fetchBugIdFromUser()
        fetchBug()
        }, [])
    return (
        <div>
            <h1>Userqueue</h1>

            <div>
                <nav>
                    {queState}
                </nav>
                <Outlet />
            </div>
        </div>
    )
}
export default Userqueue