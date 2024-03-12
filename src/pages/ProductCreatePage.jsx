import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";


function ProductCreatePage() {

    const [ productName, setProductName ] = useState('');
    const [ price, setPrice ] = useState(0);
    const [ description, setDescription ] = useState('');
    const [ image, setImage ] = useState('')
    const [ tag, setTag ] = useState('');
    const { user } = useContext(AuthContext);

    const handleProductName = (e) => setProductName(e.target.value);
    const handlePrice = (e) => setPrice(e.target.value);
    const handleDescription = (e) => setDescription(e.target.value);
    const handleTag = (e) => setTag(e.target.value)
    const handleImage = (e) => setImage(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault();

        const reqBody = {
            userId: user.userId,
            productName,
            price,
            image,
            description,
            tag
        }

        console.log(reqBody)
    }


    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label> Name:
                <br />
                    <input type="text" name='productName' value={productName} onChange={handleProductName}/>
                </label>
                <br />
                <label>Price: 
                <br />
                    <input type="text" name="price" value={price} onChange={handlePrice}/>
                </label>
                <br />
                <label>Description:
                <br />
                    <textarea name="description" id="" cols="60" rows="5" value={description} onChange={handleDescription}></textarea>
                </label>
                <br />
                <label>Upload URL image: 
                    <br />
                    <input type="text" name="image" value={image} onChange={handleImage} />
                </label>
                <br />
                <label>Tag:
                <br />
                    <select name="tags" onChange={handleTag}>
                        <option value=""></option>
                        <option value="wine">Wien</option>
                        <option value="jams">James</option>
                        <option value="chocolates">Chocolates</option>
                        <option value="cookies">Cookies</option>
                        <option value="cakes">Cakes</option>
                    </select>
                </label>
                <br />
                <button>Create</button>
            </form>
        </div>
    )
}

export default ProductCreatePage;