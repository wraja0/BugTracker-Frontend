// IMPORT HOOKS
import { useState, useEffect } from "react";
// IMPORT ROUTER HOOKS
import { Outlet, useLocation } from "react-router"
// IMPORT NAVIGATION 
import { Link, } from 'react-router-dom';
const URL = 'http://localhost:4000'

function BugsAll() {
    // DESTRUCTURE PASSED STATE
    const location = useLocation();
    const URL = location.state.URL
    const token = location.state.token
    // SET BUG QUE STATE
    const [queState,setQueState] = useState("")
    useEffect ( ()=> {
        // FETCH AN ARRAY OF ALL BUGS AND MATCHING TEST DATA
        const fetchBug =async()=> {
            console.log(`yer token here ${JSON.stringify(token)}`)
            const res = await fetch(URL+ '/bugs', {
                method: 'get',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token.accessToken}`
                }
            })

            const bugData = await res.json();
            // ARRAY OF FETCHED BUGS
            const newData = await bugData.bugQue
            const testData = await bugData.testArr
            // ARRAY OF AN ARRAY OF ALL TESTS WITH EACH LARGER ARRAY MAPPING TO ITS RELEVANT BUG
            // MAP ALL FETCHED BUGS WITH A LINK TO THE BUGS PAGE
            const bugQueues =newData.map((data,index)=> {
                return (
                        <Link key={index} state={{bug:data.codeBase,tests:testData[index]}} to={'bugview'}> Bug # {index+1}</Link>
                )
            })
            // S
            setQueState(bugQueues)
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