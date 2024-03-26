import { useState, useContext } from "react";
import authService from "../services/auth.service";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ erroroMsg, setErrorMsg ] = useState(undefined);
    const { storeToken, authenticateUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        const reqBody = { email, password };

        authService
            .login(reqBody)
            .then((res) => {
                storeToken(res.data.authToken);
                authenticateUser();
                navigate("/"); // TODO - this should go to the product page
            })
            .catch((err) => {
                setErrorMsg(err.response.data.message);
            })
    }

    return(
        <div className="auth-form">
            <form onSubmit={handleSubmit}>
                <label>Email:
                    <input type="text" name="email" value={email} onChange={handleEmail} />
                </label>
                <label>Password:
                    <input type="password" name="password" value={password} onChange={handlePassword}/>
                </label>
                <button>Login</button>
            </form>
            { erroroMsg && <p>{erroroMsg}</p> }
            <p>Not a user? <Link to={"/register"}>Register</Link></p>
        </div>
    )
}

export default LoginPage;