import { Link } from 'react-router-dom';
import useFetch from '../utils/useFetch';
import Error from './Error';
import Product from './Product';
import { useEffect, useState } from 'react';

import { useDispatch } from "react-redux";
import { AddToCart } from "../utils/CartSlice";


function Body()
{
    // This component is used to display the products
    const dispatch=useDispatch();
    // This function is used to add the product to the cart
    function handleCart(item)
    {
        dispatch(AddToCart(item));
    }  
    // This useFetch is used to fetch the products from the API
    const {data,err,loading}=useFetch('https://dummyjson.com/products');
    const [products,setProducts]=useState([]);
    // This useEffect is used to set the products based on the data received
    useEffect(()=>{
        if(data)
        {
            setProducts(data.products);
        }
    },[data])
    if(err)
    {
    <Error/>
    return 
    }
    if(loading)
    {
    return <div>Loading......</div>
    }
    return (<>
    {/* This is used to display the products */}
        <div className='products'>
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
export default Body