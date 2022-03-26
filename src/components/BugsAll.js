import Bugview from "./Bugview"
// IMPORT HOOKS
import { useState, useEffect } from "react";
// IMPORT ROUTER HOOKS
import { Outlet, useLocation } from "react-router"
// IMPORT NAVIGATION 
import { Link, } from 'react-router-dom';
function BugsAll() {
    // DESTRUCTURE PASSED STATE
    const location = useLocation();
    const URL = location.state.URL
    const token = location.state.token
    // SET BUG QUE STATE
    const [queState,setQueState] = useState("")
    // SET BUG BUG SELECTOR INPUT STATE
    const [selectorState,setSelectorState] = useState("")
    const [currentBug,setCurrentBug] = useState(0)
    useEffect ( ()=> {
        // FETCH AN ARRAY OF ALL BUGS AND MATCHING TEST DATA
        const fetchCode =async()=> {
            const res = await fetch(URL+ '/user/login', {
                method: 'get',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token.accessToken}`
                }
            })
            const userData = await res.json();
            // ARRAY OF FETCHED BUGS
            const bugque = userData.bugsQue
            const mappedBugQue =bugque.map((data,index)=> {
                console.log(data)
                return (
                        <Bugview key={index} URL={URL} token={token} bug={data} />
                )
            })
            setQueState(mappedBugQue)
            const mappedSelectors = bugque.map((data,index)=>{
                return (
                    <option key={index} value={index}>Bug # {index +1} </option>
                )
            })
            setSelectorState(mappedSelectors)
        }
        // REQUEST TO LOGIN USING ACCESSTOKEN AND SETU USER DATA
        const checkLogin = async()=> {
            const res = await fetch(URL +'/user/login', {
                method:'get',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token.accessToken}`
                }
            })
            const userData = res.json();
        }
        checkLogin();
        fetchCode();
        },[]
    )
    const handleChange = (event)=> {
        [event.target.name]= event.target.value
        setCurrentBug(event.target.value)

    }
        
    return (
        <div>
            All Bugs
            <form>
                <label> Select Bug : 
                    <select name='Bugqueue' onChange={handleChange}>
                        {selectorState}
                    </select>
                </label>
            </form>
            {queState[currentBug]}
            
        </div>
    )
}
export default BugsAll