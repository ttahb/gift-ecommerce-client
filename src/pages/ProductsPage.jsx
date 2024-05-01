import productsService from '../services/products.service';
import ProductCard from '../components/ProductCard';
import { useEffect, useState, useContext } from 'react';
import SearchProducts from '../components/SearchProducts';
import { AuthContext } from '../context/auth.context';
import { Link } from 'react-router-dom';
import "../pages/ProductsPage.css";
import InfiniteScroll from 'react-infinite-scroller';

function ProductsPage() {

    const [ products, setProducts ] = useState([]);
    const [ productsData, setProductsData ] = useState([]);
    const [ errorMsg, setErrorMsg ] = useState(undefined);
    const [ isLoading, setIsLoading ] = useState(true);
    const { user } = useContext(AuthContext);
    const [ pageNum, setPageNum ] = useState(1)
    const [ hasMore , setHasMore ] = useState(true)

    // const isMobile = window.screen
    // console.log('isMobile ====> window screen ==>', isMobile)
    // console.log(products)
  
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

    const loadFunc = () => {

        productsService
            .getAllProducts(pageNum)
            .then((res) => {
                    // console.log('data from the res ==> ',res.data)
                const pageOfProduct = res.data.products;
                const isLastPage = res.data.isLastPage

                setProducts(prevProducts => [...prevProducts, ...pageOfProduct]);
                setProductsData(prevProductsData => [...prevProductsData, ...pageOfProduct]);
                setPageNum(isLastPage ? pageNum : pageNum + 1)
                if(isLastPage){
                    setHasMore(false)
                }
                setIsLoading(false);
            })
            .catch((err) => {
                setIsLoading(false);
                setErrorMsg(err.response.data.message);
            })
    }

    useEffect(() => {
        loadFunc();
    }, []);

    if(isLoading){
        return(
        <div>
            <span className="loader"></span>
            <p>loading...</p>
        </div>
        )
    }

    return(
        <div className='products-container'>
            
            {user && user.role.toLowerCase() === 'admin' && <Link to={'/product/create'}><button>Create new Product</button></Link>}
                        
            <SearchProducts handleTags={handleTags} handleSearch={handleSearch}/>
            
                <div>
                    <InfiniteScroll
                        pageStart={1}
                        loadMore={loadFunc}
                        hasMore={hasMore}
                        loader={<div> <span className="loader"></span><p>Loading ...</p></div>}
                    >
                        <div className='products-display'>
                            {products.map(product => (
                                <ProductCard {...product} key={product._id} />
                            ) )}
                        </div>
                    </InfiniteScroll>
                </div>
                
            
            {errorMsg && <p>{errorMsg}</p>}

        </div>
    )
}

export default ProductsPage;