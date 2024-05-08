import { useState, useContext } from "react";
import authService from "../services/auth.service";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
// import { GoogleLogin } from '@react-oauth/google';
import googleAuthService from "../services/google.auth.service";
import "./LoginPage.css"

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
                navigate("/products");
            })
            .catch((err) => {
                setErrorMsg(err.response.data.message);
            })
    }

    const handleGoogleLogin = async () => {

        try{
            const requestUrl = await googleAuthService.googleAuthLogin();
            const url = requestUrl.data.authorizationUrl;
            const screenWidth = window.screen.width;
            const screenHeight = window.screen.height;
            const popupWidth = 800;
            const popupHeight = 500;
            const left = (screenWidth - popupWidth) / 2;
            const top = (screenHeight - popupHeight) / 2;
            // console.log("left toalScreen1440 - ThePopupScreen800 = leftOverScreen640 / 2 = CenterMiddle320 ==> ",left)
            // Open the popup window
            window.open(url, 'Google-Login', `width=${popupWidth}, height=${popupHeight}, left=${left}, top=${top}`);

        }catch(err){
            setErrorMsg(err.response.data.errorMsg);
        }

    }

    return(
        <div className="auth-form">
            <form onSubmit={handleSubmit}>
                <label>Email:
                    <input className="input-filed" type="text" name="email" value={email} onChange={handleEmail} />
                </label>
                <label>Password:
                    <input className="input-filed" type="password" name="password" value={password} onChange={handlePassword}/>
                </label>
                <button>Login</button>
            </form>
            <div className="google-register">

                <button onClick={handleGoogleLogin}>Login with Google</button>

            </div>
            { erroroMsg && <p>{erroroMsg}</p> }
            <p>Not a user? <Link to={"/register"}>Register</Link></p>
        </div>
    )
}

export default LoginPage;