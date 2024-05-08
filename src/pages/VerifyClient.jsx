import { useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

function VerifyClient() {

    const { storeToken, authenticateUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const verifyUser = () => {
        const cookies = new Cookies();
        const cookieToken = cookies.get('JWToken');
        // console.log("Incomming from VerifyClinet ====> ", cookieToken);
        storeToken(cookieToken);
        authenticateUser();
        navigate("/products");
    }

    useEffect(() => {
        verifyUser();
    }, [])

    return (
        <div>
            <p>...Loading</p>
        </div>
    )
}

export default VerifyClient;