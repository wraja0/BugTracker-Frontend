import { useState } from "react"
import { useLocation } from "react-router";
import {useEffect} from 'react'
const URL = 'http://localhost:4000'

function Newbugform() {
    // For the multiple test inputs
    const [masterTests, setMasterTest] = useState([])
    function Testinput(props){ 
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
            masterTests[props.index] = {body:event.target.value,name:props.name}
            setMasterTest(masterTests)
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
    console.log("change")
    // IMPORT STATE 
    const location = useLocation();
    const user = location.state.user
    // SET STATES
    const [allUserData, setAllUserData] = useState("")
    const [bugForm, setBugForm] = useState({
        devsAssigned: "",
        codeBase: "",
        tests: "",
    })
    const [testCount, setTestCount] = useState(1)
    // Handlers
    const handleChange = (event)=> {
        setBugForm({...bugForm, [event.target.name]: event.target.value })
    }
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
    const createBug = async(bug,allTests) => { 
        const res = await fetch(URL + "/generateLoginToken", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user.username,
            password: user.password,
            })
        });
        const token = await res.json();
        console.log(token)
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
    // Retreive all userdata to use for select buttons 
    useEffect( ()=> {
        const getAllUserData = async()=> {
            const res = await fetch(URL + "/generateLoginToken", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: user.username,
                    password: user.password
                })
            })
            const token= await res.json();
            const res2 = await fetch(URL + '/user/devs', {
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
    }, [])
    const [testArr,setTestArr] = useState(["this is prob not what you want to do here"]
    )
    const addTest = (event)=> {
        event.preventDefault()
        setTestCount(testCount +1)
        setTestArr([...testArr,'this is prob not what you want  to do here' ])

    }
    const mappedTests = testArr.map((data,index)=> {
        const name = 'test'+index
         return <Testinput name={name} key={index} index={index}/>
     })
    console.log(allUserData)
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