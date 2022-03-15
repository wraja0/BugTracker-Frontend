import { useState } from "react"
import {useEffect} from 'react'
function Newbugform() {

    const [bugForm, setBugForm] = useState({
        devsAssigned: "",
        codeBase: "",
        test: "",
    })
    const handleChange = (event)=> {
        setBugForm({...bugForm, [event.target.name]: event.target.value })
    }
    const handleSubmit = (event)=> {
        event.preventDefault()
        createBug(bugForm)
        setBugForm({
            ...bugForm,
            devsAssigned: "",
            codeBase: "",
            test: ""
        })
    }
    const URL = 'http://localhost:4000/bugs'
    const createBug = async(bug) => {
        await fetch(URL + "/create", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bug)
        })
    }
    return (
        <div >
            <h3> New Bug form</h3>
            <form onSubmit={handleSubmit}>
                <input 
                type='text'
                value={bugForm.devs}
                name="devsAssigned"
                placeholder="dev name"
                onChange={handleChange}
                />
                 <textarea 
                type='text'
                value={bugForm.base}
                name="codeBase"
                placeholder="codebase"
                onChange={handleChange}
                />
                 <input 
                type='text'
                value={bugForm.tests}
                name="test"
                placeholder="test"
                onChange={handleChange}
                />
                <input onSubmit={handleSubmit} type="submit" value="Create Bug" />
            </form>
        </div>
    )
}
export default Newbugform