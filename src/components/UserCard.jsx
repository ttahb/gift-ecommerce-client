
function UserCard( { fullName, email, companyName, companySize } ) {

    return(
        <div className="TaskCard card">
            <h2>Your account details</h2>
            <div>
                <h4>Your Name:</h4>
                <p>{fullName}</p>
            </div>
            <div>
                <h4>Your email:</h4>
                <p>{email}</p>
            </div>
            <div>
                <h4>Your company Name:</h4>
                <p>{companyName}</p>
            </div>
            <div>
                <h4>Your company size:</h4>
                <p>{companySize}</p>
            </div>    
        </div>
    )
}

export default UserCard;