import { useState } from "react";
import "./AdressCard.css"

function AddressCard(props){

    const [address, setAddress] = useState({
        contactPerson: "",
        buildingNumber: "",
        street: "",
        city: "",
        country: "",
        postalCode: "",
        contactNumber: ""
    });

    const [errors, setErrors] = useState({
        contactPerson: false,
        buildingNumber: false,
        street: false,
        city: false,
        country: false,
        postalCode: false
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress(prevState => ({
            ...prevState,
            [name]: value
        }));
       
        setErrors(prevState => ({
            ...prevState,
            [name]: value.trim() === ""
        }));
    };

    return (
        <div id="adr-form">
            <input className="adr-input" style={{ width: '50%', padding: '8px', boxSizing: 'border-box', borderColor: errors.contactPerson ? 'red' : '' }} type="text" name="contactPerson" value={address.contactPerson} onChange={handleChange} required placeholder="Enter the company name or contact person's name"/><br /><br />
            {errors.contactPerson && <><p style={{ color: 'red' }}>Please enter a valid contact person name.</p><br /></>}
            <input className="adr-input" style={{ width: '50%', padding: '8px', boxSizing: 'border-box', borderColor: errors.buildingNumber ? 'red' : '' }} type="text" name="buildingNumber" value={address.buildingNumber} onChange={handleChange} required placeholder="Enter the building number (e.g., 123)."/><br /><br /> 
            {errors.buildingNumber && <><p style={{ color: 'red' }}>Please enter a valid building number.</p><br /></>}
            <input className="adr-input" style={{ width: '50%', padding: '8px', boxSizing: 'border-box', borderColor: errors.street ? 'red' : '' }} type="text" name="street" value={address.street} onChange={handleChange} required placeholder="Enter the street name (e.g., Calle Gran Vía)."/><br /><br />
            {errors.street && <><p style={{ color: 'red' }}>Please enter a valid street name.</p><br /></>}
            <input className="adr-input" style={{ width: '50%', padding: '8px', boxSizing: 'border-box', borderColor: errors.city ? 'red' : '' }} type="text" name="city" value={address.city} onChange={handleChange} required placeholder="Enter the city name (e.g., Madrid)."/><br /><br />
            {errors.city && <><p style={{ color: 'red' }}>Please enter a valid city name</p><br /></>}
            <input className="adr-input" style={{ width: '50%', padding: '8px', boxSizing: 'border-box', borderColor: errors.country ? 'red' : '' }} type="text" name="country" value={address.country} onChange={handleChange} required placeholder="Enter the country name (e.g., Spain)"/><br /><br />
            {errors.country && <><p style={{ color: 'red' }}>Please enter a valid country name</p><br /></>}
            <input className="adr-input" style={{ width: '50%', padding: '8px', boxSizing: 'border-box', borderColor: errors.postalCode ? 'red' : '' }} type="text" name="postalCode" value={address.postalCode} onChange={handleChange} required placeholder="Enter the postal code (e.g., 28013)."/><br /><br />
            {errors.postalCode && <><p style={{ color: 'red' }}>Please enter a valid postal code</p><br /></>}
            <input className="adr-input" style={{ width: '50%', padding: '8px', boxSizing: 'border-box' }} type="text" name="contactNumber" value={address.contactNumber} onChange={handleChange} placeholder="Contact Number (Optional) e.g. +34 6XX XX XX XX"/><br /><br />
            
            {props.setAddress && props.setAddress(address)}
        </div>
    )
}

export default AddressCard;