import userService from '../services/user.service';
import UserCard from '../components/UserCard';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { AuthContext } from '../context/auth.context';
// import { isAuthenticated } from '../../../gift-ecommerce-server/middleware/jwt.middleware';

function UserProfilePage() {
    const [user, setUser] = useState();
    const {userId} = useParams();
    // const [userData, setUserData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    //Use Effect to get all the users
    useEffect(() => {
        userService
            .getUser(userId)
            .then((res) => {
                console.log('data from the res ==> ',res)
                setUser(res.data);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            })
    }, []);

    if(isLoading){
        return(
        <div>
            <span className="loader"></span>
            <p>loading...</p>
        </div>
        )
    } //else if (user.role === isAuthenticated) {
        return(
            <div>
                <h1 className="order-title">Welcome to your profile page</h1>
                <div>
                <UserCard
                fullName={user.fullName} 
                email={user.email}
                companyName={user.companyName}
                companySize={user.companySize}
                />
                <Link to={`/orders`}><button className='space-between-btns'>Orders</button></Link>
                <Link to={`/users/edit/${userId}`}><button>Edit Profile</button></Link>         
                </div>   
            </div>
        )
    //}
}

export default UserProfilePage;