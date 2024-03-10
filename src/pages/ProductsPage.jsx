import productsService from '../services/products.service';
import ProductCard from '../components/ProductCard';
import { useEffect, useState } from 'react';
// import { useContext } from 'react';
// import { AuthContext } from '../context/auth.context';

function ProductsPage() {

    const [ products, setProducts ] = useState([]);
    const [ errorMsg, setErrorMsg ] = useState(undefined);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        productsService
            .getProducts()
            .then((res) => {
                console.log('data from the res ==> ',res.data)
                setProducts(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                setErrorMsg(err.response.data.message);
            })
    }, []);



    return(
        <div>
            {/* { isLoading && <div><p>Loading...</p></div> } */}

            <div>
                <button>wine</button>
                <button>jams</button>
            </div>
            
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