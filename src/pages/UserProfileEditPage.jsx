import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import userService from "../services/user.service";
import { useNavigate } from "react-router-dom";

function UserProfileEditPage() {

    const [ fullName, setFullName ] = useState('');
    const [ companyName, setCompanyName ] = useState('');
    const [ companySize, setCompanySize ] = useState('');
    const { user, isLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleFullName = (e) => setFullName(e.target.value);
    const handleCompanyName = (e) => setCompanyName(e.target.value);
    const handleCompanySize = (e) => setCompanySize(e.target.value);
    
    // const storeToken = localStorage.getItem('token')

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedUserData = {
                fullName,
                companyName,
                companySize,
            };

            const updatedUser = await userService.updateUserFields(user.userId, updatedUserData);
            console.log(updatedUser);
            navigate(`/users/${user.userId}`)
            
        } catch (error) {
            console.error('Error updating user:', error);
        }
    }
    const getUpdatedUser = () => {
        userService
            .getUser(user.userId)
            .then((res) =>{
                console.log('response from the user', res.data)
                setFullName(res.data.fullName)
                setCompanyName(res.data.companyName)
                setCompanySize(res.data.companySize)

            }).catch(error =>{
                console.log(error)
            })
    }
    useEffect(() =>{
        if(!isLoading){
            getUpdatedUser();
        }
    }, [isLoading])

    if(isLoading) {
        return(
            <div className='loading-div'>
                <p>Loading...</p>
            </div>
        )
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label> Full name:
                <br />
                    <input type="text" name='fullName' value={fullName} onChange={handleFullName}/>
                </label>

                <br />

                <label> Company name:
                <br />
                    <input type="text" name='companyName' value={companyName} onChange={handleCompanyName}/>
                </label>

                <br />

                <label>Company Size:
                <select name="companySize" value={companySize} onChange={handleCompanySize}>
                    <option value="">--Please choose an option--</option>
                    <option value="0-100">0-100</option>
                    <option value="101-1000">101-1000</option>
                    <option value="1001-10000">1001-10000</option>
                    <option value="10000+">10000+</option>
                </select>
            </label>

                <br />
            
                <button>Update</button>
            </form>
        </div>
    )
}

export default UserProfileEditPage;