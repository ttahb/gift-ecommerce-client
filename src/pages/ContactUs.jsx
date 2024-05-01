import { useState } from "react";
import "./ContactUs.css"

function ContactUs() {

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ dissabledMsg, setDissabledMsg ] = useState(false)

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
        setDissabledMsg(true)
    }

    return(
        <div className="auth-form">
            <h2 className="order-title">Do you have doubts? Contact Us! :D</h2>

            <form className="form-contact-us">
                <label style={{margin: "0"}}>Name:
                    <input className="input-filed" style={{margin: "0.5rem 0 0 0 "}} type="text" value={name} onChange={handleName} />
                </label>
                <br />
                <label style={{margin: "0"}}>Email:
                    <input className="input-filed" style={{margin: "0.5rem 0 0 0 "}} type="email" value={email} onChange={handleEmail} />
                </label>
                <br />
                <label style={{margin: "0"}}>Message:
                    <textarea className="input-filed" style={{margin: "0.5rem 0 0 0 "}} cols="60" rows="6" value={message} onChange={handleMessage} ></textarea>
                </label>
                <br />
                {dissabledMsg && <p>Currently this option is dissabled.</p>}
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default ContactUs;