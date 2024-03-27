import { useState } from "react";

function ContactUs() {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ message, setMessage ] = useState('');

    const handleName = (e) => setName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handleMessage = (e) => setMessage(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        let reqBody = {
            name,
            email,
            message
        }

        console.log(reqBody);

        setName('');
        setEmail('');
        setMessage('');
    }

    return(
        <div className="auth-form">
            <h1 style={{fontSize: "2rem", margin: "2rem"}}>Contact Us</h1>

            <form>
                <label style={{margin: "0"}}>Name:
                    <input style={{margin: "0.5rem 0 0 0 "}} type="text" value={name} onChange={handleName} />
                </label>
                <br />
                <label style={{margin: "0"}}>Email:
                    <input style={{margin: "0.5rem 0 0 0 "}} type="email" value={email} onChange={handleEmail} />
                </label>
                <br />
                <label style={{margin: "0"}}>Message:
                    <textarea style={{margin: "0.5rem 0 0 0 "}} cols="60" rows="6" value={message} onChange={handleMessage} ></textarea>
                </label>
                <br />
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default ContactUs;