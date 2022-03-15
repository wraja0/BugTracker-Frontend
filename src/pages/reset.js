import "../styles/App.css"
import Userfront from '@userfront/react'
function Reset() {
    Userfront.init("8nwr5pwb");
    const PasswordResetForm = Userfront.build({
        toolId: "ombdar"
    });
    return (
        <PasswordResetForm />
    );
}
export default Reset;