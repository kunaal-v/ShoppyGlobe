import { Link } from 'react-router-dom';
import useFetch from '../utils/useFetch';
import Error from './Error';
import Product from './Product';
import { useEffect, useState } from 'react';

import { useDispatch } from "react-redux";
import { AddToCart } from "../utils/CartSlice";


function Body()
{
    const dispatch=useDispatch();
    function handleCart(item)
    {
        dispatch(AddToCart(item));
    }  
    const {data,err,loading}=useFetch('https://dummyjson.com/products');
    const [products,setProducts]=useState([]);
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