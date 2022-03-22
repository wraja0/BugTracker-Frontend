// IMPORT HOOKS
import { useState } from "react"
import {useEffect} from 'react'
// IMPORT LOCATION
import { useLocation } from "react-router";
function Newbugform() {
    // DESTRUCTURE PASSED STATE DATA
    const location = useLocation();
    const token = location.state.token
    const URL  = location.state.URL
    // SET STATES
    const [user, setUser] = useState({})
    const [allUserData, setAllUserData] = useState("")
    const [bugForm, setBugForm] = useState({
        devsAssigned: "",
        codeBase: "",
        tests: "",
    })
    // SETUP MASTERTESTS DATA TO BE SENT TO BACKEND FROM EACH TESTINPUT COMPONENT WHICH IS MAPPED OUT BASED ON THE TESTARR STATE
    const [masterTests, setMasterTests] = useState([])
    // A TEST ARRAY TO MAP A TESTINPUT COMPONENT NO DATA NEEDED FOR EMPTY INPUTS SO I JUST THREW IN THEIR INDEX
    const [testArr,setTestArr] = useState(["0"])
     // HANDLE CHANGE FOR ADD TEST BUTTON
     const addTest = (event)=> {
        event.preventDefault()
        setTestArr([...testArr,testArr.length ])

    }
    // SETUP TESTS INPUT COMPONENT 
    function Testinput(props){ 
        // INPUT STATE FOR CHILD COMPONENET 
        const [test,setTest] = useState({
            name: props.name,
            counter: props.index
        })
        // HANDLECHANGE FUNCTION FOR EACH INPUT COMPONENT AND UPDATES MASTERTEST STATE
        const handleChange = (event)=> {
            setTest({
                ...Testinput,
                name: props.name,
                body: event.target.value,
                counter: props.index
            })
            // APPEND INPUT TO MASTERTEST ARRAY AND UPDATE STATE
            masterTests[props.index] = {body:event.target.value,name:props.name}
            console.log(masterTests)
            setMasterTests(masterTests)
        }
        return (
            <input
            type='text'
            value={test.body}
            name={props.name}
            placeholder={props.name}
            onChange={handleChange}
             />
        )
    }
    // MAP TESTARR TO TESTINPUT COMPONENT 
    const mappedTests = testArr.map((data,index)=> {
        const name = 'test'+ index
        return <Testinput name={name} key={index} index={index}/>
    })
    // HANDLE INPUT CHANGE FOR NEW BUG FORM
    const handleChange = (event)=> {
        setBugForm({...bugForm, [event.target.name]: event.target.value })
    }
    // HANDLE CREATE BUG FORM SUBMISSIONS
    const handleSubmit = (event)=> {
        event.preventDefault()
        console.log(masterTests)
        createBug(bugForm,masterTests)
        setBugForm({
            ...bugForm,
            devsAssigned: "",
            codeBase: "",
            tests: ""
        })
    }
    // SEND NEW BUG CREATION REQUEST TO BACKEND API
    const createBug = async(bug,allTests) => {
        const res2 = await fetch(URL + "/bugs/create", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token.accessToken}`
              },
            body: JSON.stringify({
                dev: bug.devsAssigned,
                codeBase: bug.codeBase,
                tests: allTests
            })
            });
        const newBugData = await res2.json()
        console.log(newBugData)
    }
    // RETREIVE ALL USERDATA AND PERSONAL USER DATA
    useEffect( ()=> {
        const getPersonalUserData = async()=> {
            const res = await fetch(URL + "/user/login", {
                method: "get",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token.accessToken}`
                }
              });
            const userData = await res.json()
            setUser(userData)
            }
        const getAllUserData = async()=> {
            const res2 = await fetch(URL + '/user/allDevs', {
                method: "get",
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${token.accessToken}`
                }
            })
            const allUserData = await res2.json()
            const allUsers = allUserData.map((user, index)=> {
                return (
                <option
                    value={user.username}
                    userdata = {user}
                    key = {index}
                     >{user.username}</option>)
            })
            setAllUserData(allUsers)
        }
        getAllUserData();
        getPersonalUserData();
    }, [])
    return (
        <div >
            <h3> New Bug form</h3>
            <form onSubmit={handleSubmit}>
                <select 
                value={bugForm.devs}
                name="devsAssigned"
                onChange={handleChange}
                >
                    {allUserData}
                </select>
                 <textarea 
                type='text'
                value={bugForm.base}
                name="codeBase"
                placeholder="codebase"
                onChange={handleChange}
                />
                <input onSubmit={handleSubmit} type="submit" value="Create Bug" />
                <div>
                    <input type="button" onClick={addTest} value="add test" />
                    {mappedTests}
                </div>
            </form>
        </div>
    )
}
export default Newbugform