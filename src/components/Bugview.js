import userEvent from "@testing-library/user-event";
import { useEffect, useState } from "react";
import { useLocation } from "react-router"
const URL = 'http://localhost:4000'
function Bugview() {
    const location = useLocation();
    const [bugState, setBugState] = useState({
        bug: location.state.bug,
    })
    const [testState, setTestState] = useState(location.state.tests)
    const user = location.state.user
    const handleCodeChange = (event)=> {
        console.log(`run`)
        event.preventDefault()
        setBugState({
            ...Bugview,
            bug: event.target.value
        })
        console.log(event.target.value)
    }
    function Testinput(props) {
        const [test, setTest] = useState({
            body: props.body
        })
        const handleChange = (event)=>{
            setTest({...test,body:event.target.value})
        }
        const updateTest = async(data)=>{
            const res = await fetch(URL + "/login", {
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
              const res2 = await fetch(URL + "/tests/update", {
                  method: "put",
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${token.accessToken}`
                  },
                  body: JSON.stringify({
                      test: data,
                      id: props.id
                  })
              });
              const updatedTest = await res2.json()
              console.log(updatedTest)
            //   setTest({...test, body:updateTest.body})
        } 
        const handleUpdateTest = ()=> {
            updateTest(test.body)
        }
        return (
            <div>
                <input
                onChange={handleChange}
                value={test.body}
                />
                <input onClick={handleUpdateTest} type='submit' value='Update Test' />
                <input  type='submit' value="Delete" />
            </div>
        )
    }
    const testToMap = location.state.tests
    const mappedTests = testToMap.map((data,index)=>{

        if (user.class == 'dev') {
        return (
            <div key={index}>

                <p>{index+1} : {data.body}</p>
            </div>
        )}

        if (user.class == 'manager') {
            console.log(data)
            return (
            <div key={index}>   
                <Testinput body={testState[index].body} key={index} id={data._id}/>
            </div>
            )
        }
    })
    useEffect(()=> {
        const doit = ()=> {
            setBugState({bug: location.state.bug})
        }
        doit()
    },[location] )
    console.log(user)
    return (
        <div>
            <textarea
            name = 'bug'
            onChange={handleCodeChange}
            value={bugState.bug}
            />
            <p>===--TESTS--===</p>
            {mappedTests}
        </div>
    )
}
export default Bugview