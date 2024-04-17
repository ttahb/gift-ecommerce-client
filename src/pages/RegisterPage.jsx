import { useContext, useState } from "react"
import authService from "../services/auth.service";
import { AuthContext } from "../context/auth.context";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import googleAuthService from "../services/google.auth.service";
import "./RegisterPage.css"

function RegisterPage() {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [companySize, setCompanySize] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [errMsgPwd, setErrMsgPwd] = useState(undefined);
    const [ regiterBtn, setRegiterBtn ] = useState(true)


    const { storeToken, authenticateUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("hello from register button")

        const reqBody = { fullName, email, password, companyName, companySize};
        
        authService
            .register(reqBody)
            .then(resp => {
                console.log('token from the authService ===> ',resp.data.authToken)
                storeToken(resp.data.authToken);
                authenticateUser();
            })
            .then(()=> navigate('/products'))
            .catch(err => setErrorMessage(err.response.data.message));        
    }

    const handleEmail = (e) => setEmail(e.target.value);
    const handleFullName = (e) => setFullName(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleConfirmPassword = (e) => {
        if(password !== e.target.value){
            setConfirmPassword(e.target.value);
            setErrMsgPwd('Passwords do not match!')
        } else {
            setConfirmPassword(e.target.value);
            setErrMsgPwd(undefined);
        }
    }
    const handleCompanyName = (e) => setCompanyName(e.target.value);
    const handleCompanySize = (e) => setCompanySize(e.target.value);
    
    const handleRegisterBtn = () => {
        setRegiterBtn(!regiterBtn)
    }

    const handleGoogleLogin = (credentialResponse) => {
            // console.log("from the register google btn res ==> ",credentialResponse)
        const googleToken = credentialResponse.credential
            // console.log("that'st he stored credentials form the credentialresponse",googleToken)

        googleAuthService
            .googleAuthRegister(googleToken)
            .then(res => {
                console.log(res)
                storeToken(res.data.authToken);
                authenticateUser();
            })
            .then(()=> navigate('/products'))
            .catch(err => {
                console.log(err)
                setErrorMessage(err.response.data.message)});   

    }

    return (
        <div className="auth-form large-field">
            <div>
                <button className="secondary" onClick={handleRegisterBtn}>Register with {regiterBtn ? "Form" : "Google"}</button>
            </div>
            <div className={  regiterBtn ? "nonActivateBtn" : "activateBtnRegister" }>
                <p className="register-sign">Register with Form</p>
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Full Name:</span>
                        <input 
                            type="text"
                            name="fullName"
                            value={fullName}
                            onChange={handleFullName} 
                            placeholder="John Doe"
                            required   
                        />
                    </label>
                    <label>
                        <span>Email:</span>
                        <input 
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleEmail}
                            placeholder="e.g. john@domain.com"
                            required
                        />
                    </label>

                    
                    <label>
                        <span>Password:</span>
                        <input 
                            type="password"
                            name="password"
                            value={password}
                            onChange={handlePassword}
                            placeholder="********"
                            required
                        />
                    </label>
                    <label>
                        <span>Confirm Password:</span>
                        <input 
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPassword}
                            placeholder="********"
                            required
                        />
                    </label>
                    { errMsgPwd && <p style={{color:'red'}}>{errMsgPwd}</p>}

                    
                    <label>
                        <span>Company Name:</span>
                        <input 
                            type="text"
                            name="companyName"
                            value={companyName}
                            onChange={handleCompanyName}
                            placeholder="XYZ Inc."
                        />
                    </label>
                    <label>
                        <span>Company Size:</span>
                        <select name="companySize" value={companySize} onChange={handleCompanySize}>
                            <option value="">--Please choose an option--</option>
                            <option value="0-100">0-100</option>
                            <option value="101-1000">101-1000</option>
                            <option value="1001-10000">1001-10000</option>
                            <option value="10000+">10000+</option>
                        </select>
                    </label>
                    <button>Register</button>
                </form>
            </div>
            <div className={`google-register ${ regiterBtn ? " activateBtn" : " nonActivateBtn" }`} >
                <p className="register-sign">Register with Google</p>
                <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            </div>
            { errorMessage && <p style={{color:'red'}}>{errorMessage}</p>}
            <p>Already a user: <Link to={"/login"}>Login</Link></p>
        </div>
    )
}

export default RegisterPage;