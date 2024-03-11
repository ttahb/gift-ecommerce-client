import productsService from '../services/products.service';
import ProductCard from '../components/ProductCard';
import { useEffect, useState } from 'react';
import SearchProducts from '../components/SearchProducts';
// import { useContext } from 'react';
// import { AuthContext } from '../context/auth.context';

function ProductsPage() {

    const [ products, setProducts ] = useState([]);
    const [ productsData, setProductsData ] = useState([])
    const [ errorMsg, setErrorMsg ] = useState(undefined);
    const [ isLoading, setIsLoading ] = useState(true);
  
    const handleTags = (str) => {
        const valueS = str;
        let filteredProducts;  

        //console.log('the event => ', e.target.value)  
        setProducts(productsData);

        if(valueS === ""){
            setProducts(productsData);
        } else {
            filteredProducts = [...productsData].filter(product => product.tags === valueS);
            setProducts(filteredProducts);
        }
    
    }

    const handleSearch = (str) => {
        console.log('str after is sent througth => ', str);

        let searchProducts;
        setProducts(productsData);

        if(str === ""){
            setProducts(productsData);
        } else {
            searchProducts = [...productsData].filter((name) => {
                return name.productName.toLowerCase().includes(str.toLowerCase())
            })
            setProducts(searchProducts)
        }
    }

    useEffect(() => {
        productsService
            .getProducts()
            .then((res) => {
                // console.log('data from the res ==> ',res.data)
                setProducts(res.data);
                setProductsData(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                setErrorMsg(err.response.data.message);
            })
    }, []);



    return(
        <div>
            { isLoading && <div><p>Loading...</p></div> }

            <SearchProducts handleTags={handleTags} handleSearch={handleSearch}/>

            
            {products.map((product)=>{
                return(
                    <ProductCard key={product._id} {...product}/>
                )
            })}
            {errorMsg && <p>{errorMsg}</p>}

        
        </div>
    )
}

export default ProductsPage;