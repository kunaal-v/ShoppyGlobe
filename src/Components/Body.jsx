import { Link } from 'react-router-dom';
// import useFetch from '../utils/useFetch';
// import Error from './Error';
import Product from './Product';
import { useEffect, useState } from 'react';



function Body()
{
    // This component is used to display the products
    // This function is used to add the product to the cart
    function handleCart(product)
    {
        fetch('http://localhost:5861/api/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),

          })
          
    }  
    // This useFetch is used to fetch the products from the API
    const [products,setProducts]=useState([]);
    const accessToken=localStorage.getItem("accessToken");
    // This useEffect is used to set the products based on the data received
    useEffect(() => {
        fetch('http://localhost:5861/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization:`JWT ${accessToken}`
          },
        }).then((response) => response.json())
        .then((data) => {
            setProducts(data);
            })
      },[]); 
      if(products==undefined||products.length<1)
      {
        
        return(<>
        <h1>Loading.....</h1>
        </>
        )
      }
    else{
      
      return (<>
        {/* This is used to display the products */}
            {products!=undefined&&<div className='products'>
            {products.map((product)=>(
                <li key={product.id}>
                <div className='product'>
                <Link to={`/product/${product._id}`}>
                    <Product item={product}/>
                </Link>
                <div >
                        <button className='product_addToCart_btn' onClick={()=>handleCart(product)}>Add To Cart</button>
                </div>
                </div>
            </li>
            ))}
            </div>}
        </>)
    }
}
export default Body