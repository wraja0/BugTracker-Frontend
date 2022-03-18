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
    // SETUP MASTERTESTS DATA TO BE SENT TO BACKEND API FROM EACH TESTINPUT COMPONENT 
    const [masterTests, setMasterTests] = useState()
    // A TEST ARRAY TO MAP A TESTINPUT COMPONENT NO DATA NEEDED FOR EMPTY INPUTS SO I HAVE SOME NONSENSE HERE
    const [testArr,setTestArr] = useState(["this is prob not what you want to do here"])

    // SETUP TESTS INPUT COMPONENT 
    function Testinput(props){ 
        // INPUT STATE FOR CHILD COMPONENET 
        const [test,setTest] = useState({
            name: props.name,
            counter: props.index
        })
        const handleChange = (event)=> {
            setTest({
                ...Testinput,
                name: props.name,
                body: event.target.value,
                counter: props.index
            })
            // APPEND INPUT TO MASTERTEST ARRAY AND UPDATE STATE
            masterTests[props.index] = {body:event.target.value,name:props.name}
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
    // HANDLE INPUT CHANGE FOR PARENT COMPONENET 
    const handleChange = (event)=> {
        setBugForm({...bugForm, [event.target.name]: event.target.value })
    }
    // HANDLE CHANGE FOR ADD TEST BUTTON
    const addTest = (event)=> {
        event.preventDefault()
        setTestArr([...testArr,'this is prob not what you want  to do here' ])

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
    // HANDLE CREATE BUG FORM SUBMISSIONS
    const handleSubmit = (event)=> {
        event.preventDefault()
        
        createBug(bugForm,masterTests)
        setBugForm({
            ...bugForm,
            devsAssigned: "",
            codeBase: "",
            tests: ""
        })
    }
    // MAP TESTARR TO TESTINPUT COMPONENT 
    const mappedTests = testArr.map((data,index)=> {
        const name = 'test'+index
         return <Testinput name={name} key={index} index={index}/>
     })
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