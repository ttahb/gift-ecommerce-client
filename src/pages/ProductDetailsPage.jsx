import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import productsService from "../services/products.service";
import { AuthContext } from "../context/auth.context";
import userService from "../services/user.service";
import fileUploadService from "../services/file-upload.service";
import "./ProductDetailsPage.css"
import SingleProductCard from "../components/SingleProductCard";

function ProductDetailsPage(){
    const [ product, setProduct ] = useState([]);
    const [ productItems, setProductItems ] = useState(1);
    const [ isLoadingBr, setIsLoadingBr ] = useState(true);
    const { productId } = useParams();
    const { user, isLoading } = useContext(AuthContext);
    const [ errorMsg, setErrorMsg ] = useState(undefined);
    const navigate = useNavigate();

    const plusItems =() => setProductItems(productItems + 1);
    const minusItems = () => {
        if(productItems === 1 ){
            setProductItems(1)
        } else {
            setProductItems(productItems - 1)
        }
    };

    const handleBasket = () => {
        const userId = user.userId;

        const userData = {
            productImg: product.image,
            productId: product._id,
            productName: product.productName,
            price: product.price,
            quantity: productItems
        }

        userService
            .getUser(userId)
            .then((res) => {
                return res.data.basket 
            })
            .then((resBasket) => {
                let isExistingProduct = false;

                resBasket.forEach(product => { 
                    if(product.productId === userData.productId){
                        product.quantity += userData.quantity;
                        isExistingProduct = true;
                    }
                })

                if(!isExistingProduct){
                    resBasket.push(userData);
                }
                
                userService
                    .updateUserFields( userId, { basket: resBasket } )
                    .catch(err => setErrorMsg(err.response.data.message))
            })
            .catch((err) => {
                console.log(err);
                setErrorMsg(err.response.data.message)
            })
    };

    const getOneProduct = () => {
        productsService
            .getProduct(productId)
            .then((res) => {
                setProduct(res.data)
                setIsLoadingBr(false)
            })
            .catch((err) => {
                setErrorMsg(err.response.data.message)
            })
    };

    const handleDeleteProduct = async (prodId) => {
        const publicIdOfCloudinary = new FormData();
        const imageId = product.image.split('/').splice(-2).join('/').split('.')[0];
        publicIdOfCloudinary.append('publicIdOfCloudinary', imageId)

        try {
            await fileUploadService.deleteImage(publicIdOfCloudinary);
            await productsService.deleteProduct(prodId);
            navigate('/products')
        } catch(err) {
            console.log(err)
        }

    }

    useEffect(() => {
        if(!isLoading){
            getOneProduct();
            setIsLoadingBr(false);
        }
    } ,[isLoading]);

    if(isLoadingBr) {
        return(
            <div className='loading-div'>
                <p>Loading...</p>
            </div>
        )
    }

    return(
        <div className='single-product-display'>
            <div>
                {user && user.role.toLowerCase() === 'admin' && <Link to={`/product/edit/${productId}`}><button>Edit Product</button></Link>}
                {user && user.role.toLowerCase() === 'admin' && <button onClick={ () => handleDeleteProduct(product._id)}>Delete Product</button>}
            </div>
            {errorMsg && <p>{errorMsg}</p>}
            
            <SingleProductCard product={product} />

            <div className='single-product-display btn-container-single-product'>
                <p>Add items in basket: {productItems} 
                    <span><button className="secondary" onClick={minusItems}>-</button></span>
                    <span><button className="secondary" onClick={plusItems}>+</button></span>
                </p>     
                <div className="basket-shoping-btn">
                    <button onClick={handleBasket}>Add to Basket</button>
                    <Link to={'/products'} ><button>Continue Shoping</button></Link>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailsPage;