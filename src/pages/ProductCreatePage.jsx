import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import productsService from "../services/products.service";
import { useNavigate } from "react-router-dom";
import fileUploadService from '../services/file-upload.service'

function ProductCreatePage() {

    const [ productName, setProductName ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ tag, setTag ] = useState('');
    const [ errorMsg, setErrorMsg ] = useState(undefined);
    const [ priceLetter, setPriceLetter ] = useState(undefined);
    const { user } = useContext(AuthContext);
    const [ isloading , setIsLoading ] = useState(false);
    const navigate = useNavigate();

    // useState set...
    const handleProductName = (e) => setProductName(e.target.value);
    const rexegLetters = /[A-Za-z]/;
    const rexegNumbers = /[0-9]/;
    const handlePrice = (e) => {
        if(rexegLetters.test(e.target.value)) {
            setPrice(e.target.value);
            return setPriceLetter('letters not allowed')
        } else if(e.target.value === '' || rexegNumbers.test(e.target.value)) {
            setPriceLetter(undefined);
            setPrice(e.target.value);
        } else {
            setPriceLetter(undefined);
            setPrice(e.target.value);
        }
    }
    const handleDescription = (e) => setDescription(e.target.value);
    const handleTag = (e) => setTag(e.target.value);

    // handleEvent

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(rexegLetters.test(price)){
            return setErrorMsg('The price cannot contain letters')

        } else if(rexegNumbers.test(price)) {
            setErrorMsg(undefined);
        
            try{
                setIsLoading(true)
                const uploadData = new FormData();
                uploadData.append("img", e.target[3].files[0]);
                    // console.log('this is the nploadData NEW FORM ==>', uploadData , e.target[3].files[0])

                const uploadInfo = await fileUploadService.uploadImage(uploadData)
                    // console.log("uploadedImage",uploadInfo)
                const uploadedImage = uploadInfo.image
                    // console.log("uploadedImage",uploadedImage)

                const reqBody = {
                    userId: user.userId,
                    productName,
                    price,
                    image: uploadedImage,
                    description,
                    tags: tag
                }

                const creationProd = await productsService.createProduct(reqBody)
                    // console.log("created product",creationProd)
                const productId = creationProd.data._id;
                setIsLoading(false)
                navigate(`/product/${productId}`)

            }catch(err){
                setErrorMsg(err.response.data.message);
            }

        }
    }

    if(isloading){
        return (
            <div>
                <span className="loader"></span>
                <p>Loading...</p>
            </div>
        )
    }

    return(
        <div className="auth-form">
            { errorMsg && <p>error: {errorMsg}</p>}

            <form onSubmit={handleSubmit}>
                <label> Name:
                <br />
                    <input type="text" name='productName' value={productName} onChange={handleProductName}/>
                </label>
                <br />
                <label>Price: 
                <br />
                    <span>{priceLetter && <p>{priceLetter}</p>}</span>
                    <input type="text" name="price" value={price} onChange={handlePrice} /> Euro
                </label>
                <br />
                <label>Description:
                <br />
                    <textarea name="description" cols="60" rows="5" value={description} onChange={handleDescription}></textarea>
                </label>
                <br />
                <label>Upload URL image: 
                    <br />
                    <input type="file"/>
                    {/* onChange={handleFileUpload} */}
                    </label>
                    <br />
                    <label>Tag:
                    <br />
                        <select name="tags" onChange={handleTag}>
                            <option value=""></option>
                            <option value="wine">Wine</option>
                            <option value="jams">Jams</option>
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