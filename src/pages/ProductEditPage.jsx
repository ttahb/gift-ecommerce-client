import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productsService from "../services/products.service";
import { AuthContext } from "../context/auth.context";

function ProductEditPage() {

    const [ isLoading, setIsLoading ] = useState(true);
    const [ errorMsg, setErrorMsg] = useState(undefined);
    const { productId } = useParams();
    const [ productName, setProductName ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ image ,setImage ] = useState('');
    const [ tags, setTags] = useState('');
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    

    const handleProductName = (e) => setProductName(e.target.value);
    const handlePrice = (e) => setPrice(e.target.value);
    const handleDescription = (e) => setDescription(e.target.value);
    const handleImage = (e) => setImage(e.target.value);
    const handleTags = (e) => setTags(e.target.value);


    const handleEditProduct = (e) => {
        e.preventDefault();

        const userId = user.userId;

        const reqBody = {
            lastUpdatedBy: userId,
            productName,
            price,
            description,
            image,
            tags
        }

        productsService
            .changeProduct(productId, reqBody)
            .then(() => {
                // console.log(res.data) 
                navigate(`/product/${productId}`)
            })
            .catch((err) => {
                setErrorMsg(err.response.data.message)
            })
    }

    const getOneProduct = () => {
        productsService
            .getProduct(productId)
            .then((res) => {
                console.log(res.data);
                setProductName(res.data.productName);
                setPrice(res.data.price);
                setDescription(res.data.description);
                setImage(res.data.image);
                setTags(res.data.tags);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        getOneProduct();
    }, [])

    if(isLoading){
        return(
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    return(
        <div>
            { errorMsg && <p>{errorMsg}</p>}
            <form onSubmit={handleEditProduct}>
                <label> Name:
                <br />
                    <input type="text" placeholder={productName} value={productName} onChange={handleProductName}/>
                </label>
                <br />
                <label>Price:
                <br />
                    <input type="text" placeholder={price} value={price} onChange={handlePrice}/>
                </label>
                <br />
                <label>Description: 
                <br />
                    <textarea name="description" id="" cols="70" rows="5" placeholder={description} value={description} onChange={handleDescription}></textarea>
                </label>
                <br />
                <label>Image:
                <br />
                    <input type="text" placeholder={image} value={image} onChange={handleImage} />
                </label>
                <br />
                <label>Tags:
                <br />
                    <select name="tags" onChange={handleTags} value={tags}>
                        <option value=""></option>
                        <option value="wine">Wien</option>
                        <option value="jams">James</option>
                        <option value="chocolates">Chocolates</option>
                        <option value="cookies">Cookies</option>
                        <option value="cakes">Cakes</option>
                    </select>
                </label>
                <br />
                <button>Edit</button>
            </form>
        </div>
    )
}

export default ProductEditPage;
