import productsService from '../services/products.service';
import ProductCard from '../components/ProductCard';
import { useEffect, useState, useContext } from 'react';
import SearchProducts from '../components/SearchProducts';
import { AuthContext } from '../context/auth.context';
import { Link } from 'react-router-dom';

function ProductsPage() {

    const [ products, setProducts ] = useState([]);
    const [ productsData, setProductsData ] = useState([]);
    const [ errorMsg, setErrorMsg ] = useState(undefined);
    const [ isLoading, setIsLoading ] = useState(true);
    const { user } = useContext(AuthContext);

    // console.log('this is the products', products)
  
    const handleTags = (str) => {
        const valueS = str;
        let filteredProducts;  
        setProducts(productsData);

        if(valueS === ""){
            setProducts(productsData);
        } else {
            filteredProducts = [...productsData].filter(product => product.tags === valueS);
            setProducts(filteredProducts);
        }
    }

    const handleSearch = (str) => {
        let searchProducts;
        setProducts(productsData);

        if(str === ""){
            setProducts(productsData);
        } else {
            searchProducts = [...productsData].filter((name) => {
                return name.productName.toLowerCase().includes(str.toLowerCase());
            });
            setProducts(searchProducts);
        }
    }

    useEffect(() => {
        productsService
            .getAllProducts()
            .then((res) => {
                // console.log('data from the res ==> ',res)
                setProducts(res.data);
                setProductsData(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                setErrorMsg(err.response.data.message);
            })
    }, []);

    if(isLoading){
        return(
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    return(
        <div>
            <br />
            {user && user.role.toLowerCase() === 'admin' && <Link to={'/product/create'}><button>Create new Product</button></Link>}
            <br /> 
            <SearchProducts handleTags={handleTags} handleSearch={handleSearch}/>

            {products.map(product => <ProductCard key={product._id} {...product}/> )}

            {errorMsg && <p>{errorMsg}</p>}

        </div>
    )
}

export default ProductsPage;