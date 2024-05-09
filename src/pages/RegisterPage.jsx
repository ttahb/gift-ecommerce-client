import { useContext, useState } from "react"
import authService from "../services/auth.service";
import { AuthContext } from "../context/auth.context";
import { useNavigate, Link } from "react-router-dom";
import googleAuthService from "../services/google.auth.service";
import "./RegisterPage.css"
import googleLoginBtn from '../../public/web_neutral_sq_ctn@4x.png'

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

    const handleGoogleLogin = async (num) => {

        try{
            const requestUrl = await googleAuthService.googleAuthLogin(num);
            const url = requestUrl.data.authorizationUrl;


            if(requestUrl.data.procces === 'successful' ){
                const screenWidth = window.screen.width;
                const screenHeight = window.screen.height;
                const popupWidth = 800;
                const popupHeight = 500;
                const left = (screenWidth - popupWidth) / 2;
                const top = (screenHeight - popupHeight) / 2;
                // console.log("left toalScreen1440 - ThePopupScreen800 = leftOverScreen640 / 2 = CenterMiddle320 ==> ",left)
                // Open the popup window
                window.open(url, 'Google-Login', `width=${popupWidth}, height=${popupHeight}, left=${left}, top=${top}`);
            } else {
                errorMessage('Something went wrong')
            }
        }catch(err){
            errorMessage(err.response.data.errorMsg);
        }

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
                            className="input-filed"
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
                            className="input-filed"
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
                            className="input-filed"
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
                            className="input-filed"
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
                            className="input-filed"
                        />
                    </label>
                    <label>
                        <span>Company Size:</span>
                        <select name="companySize" className="input-filed" value={companySize} onChange={handleCompanySize}>
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
                <div className="google-register">
                
                    <img src={googleLoginBtn} alt="google button" onClick={ () => handleGoogleLogin(0)} className="google-btn" />

                </div>
            </div>
            { errorMessage && <p style={{color:'red'}}>{errorMessage}</p>}
            <p>Already a user: <Link to={"/login"}>Login</Link></p>
        </div>
    )
}

export default RegisterPage;