function AddressCard(props){
    return (
        <div>
            {/* <label for="companyName">Company Name/ Contact Person's Name:</label> */}
            <input style={{ width: '30%', padding: '8px', boxSizing: 'border-box' }} type="text" id="companyName" name="companyName" required placeholder="Enter the company name or contact person's name"/><br></br><br></br>
            {/* <label for="buildingNumber">Building Number:</label> */}
            <input style={{ width: '30%', padding: '8px', boxSizing: 'border-box' }} type="text" id="buildingNumber" name="buildingNumber" required placeholder="Enter the building number (e.g., 123)."/><br></br><br />

            {/* <label for="streetName">Street Name:</label> */}
            <input style={{ width: '30%', padding: '8px', boxSizing: 'border-box' }} type="text" id="streetName" name="streetName" required placeholder="Enter the street name (e.g., Calle Gran Vía)."/><br></br><br />

            {/* <label for="city">City:</label> */}
            <input style={{ width: '30%', padding: '8px', boxSizing: 'border-box' }} type="text" id="city" name="city" required placeholder="Enter the city name (e.g., Madrid)."/><br></br><br />

            {/* <label for="country">Country:</label> */}
            <input style={{ width: '30%', padding: '8px', boxSizing: 'border-box' }} type="text" id="country" name="country" required placeholder="Enter the country name (e.g., Spain)"/><br></br>

            {/* <label for="postalCode">Postal Code:</label> */}
            <input style={{ width: '30%', padding: '8px', boxSizing: 'border-box' }} type="text" id="postalCode" name="postalCode" required placeholder="Enter the postal code (e.g., 28013)."/><br></br><br />

            {/* <label for="contactNumber">Contact Number (Optional):</label> */}
            <input style={{ width: '30%', padding: '8px', boxSizing: 'border-box' }} type="text" id="contactNumber" name="contactNumber" placeholder="Contact Number (Optional) e.g. +34 6XX XX XX XX"/><br></br><br />
        </div>
    )
}

export default AddressCard;