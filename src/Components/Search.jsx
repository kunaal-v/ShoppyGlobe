import { useDispatch } from "react-redux";
import { AddToCart } from "../utils/CartSlice";
import useFetch from "../utils/useFetch";
import { useEffect,useState } from "react";
import Error from "./Error";
import { Link } from "react-router-dom";
import Product from "./Product";
function Search()
{
    // This component is used to search the products based on the searched text
    const dispatch=useDispatch();
    const [searchedText,setSearchedText]=useState("");
    // This function is used to add the product to the cart
    function handleCart(item)
    {
        dispatch(AddToCart(item));
    }  
    // This useFetch is used to fetch the products from the API
    const {data,err,loading}=useFetch('https://dummyjson.com/products');
    const [products,setProducts]=useState([]);
    // This useEffect is used to filter the products based on the searched text
    useEffect(()=>{
        // If the data is present then filter the products based on the searched text
        if(data)
        {
            if(searchedText!="")
            {
                let newData=data.products.filter(product=>
                    product.title.toLowerCase().includes(searchedText.toLowerCase())
                )
                setProducts(newData);
            }
            else
            {
                setProducts(data.products);
            } 
        }
    },[data,searchedText])
    // If there is an error then show the error component
    if(err)
    {
    <Error/>
    return 
    }
    // If the data is loading then show the loading component
    if(loading)
    {
    return <h1>Loading......</h1>
    }
    return(<>
    
    <div className="Search">
        <input type="text" name="" id="" 
        className="search_input" 
        placeholder="Search..." 
        onChange={(e)=>setSearchedText(e.target.value)}/>
    </div>
    <div className='products'>

        {/* This map function is used to show all the products by rendering Product component */}
        {products.map((product)=>(
            <li key={product.id}>
            <div className='product'>
            <Link to={`/product/${product.id}`}>
            <Product item={product}/></Link>
            <div >
                    <button className='product_addToCart_btn' onClick={()=>handleCart(product)}>Add To Cart</button>
                </div>
            </div>
        </li>
        ))}
        </div>
    </>)
}
export default Search