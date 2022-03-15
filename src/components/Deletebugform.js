
function Deletebugform() {
    const URL = 'http://localhost:4000'
    const deleteBug = async(id)=> {
        await fetch(URL +'/bugs' + id + '/delete', {
            method: "delete"
        })
    }
    return (
        <form>
            <input onSubmit={deleteBug} type="submit" value="Create Bug" />
        </form>
    )
}
export default Deletebugform