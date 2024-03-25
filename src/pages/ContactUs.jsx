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
        <div>
            <h1 style={{fontSize: "2rem", margin: "2rem"}}>Contact Us</h1>

            <form>
                <label>Name:
                    <input type="text" value={name} onChange={handleName} />
                </label>
                <br />
                <label>Email:
                    <input type="email" value={email} onChange={handleEmail} />
                </label>
                <br />
                <label>Message:
                    <textarea cols="60" rows="6" value={message} onChange={handleMessage} ></textarea>
                </label>
                <br />
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default ContactUs;