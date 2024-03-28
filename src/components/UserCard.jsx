import Profile from '../../public/profile.png'
import './UserCard.css'

function UserCard( { fullName, email, companyName, companySize } ) {

    return(
        <div className="profilecard card">
            <h2>Your account details</h2>
            <div className="left-align">
                <h4>Your Name:</h4>
                <p>{fullName}</p>
            </div>
            <div className="left-align">
                <h4>Your email:</h4>
                <p>{email}</p>
            </div>
            <div className="left-align">
                <h4>Your company Name:</h4>
                <p>{companyName}</p>
            </div>
            <div className="left-align">
                <h4>Your company size:</h4>
                <p>{companySize}</p>
            </div>   
            <div className='profile-pic'>
                <img src={Profile}/>
            </div>
        </div>
    )
}

export default UserCard;