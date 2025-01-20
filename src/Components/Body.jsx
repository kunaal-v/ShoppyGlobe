import {  Link } from 'react-router-dom';
// import useFetch from '../utils/useFetch';
// import Error from './Error';
import Product from './Product';
import { useEffect, useState, useRef } from 'react';

function Body()
{
    // this handle cart function is to add the item to the cart
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
    const [isSignedIn,setIsSignedIn]=useState(true);
    const [products,setProducts]=useState([]);
    const render=useRef(null);
    const accessToken=localStorage.getItem("accessToken");
    // This useEffect is used to set the products based on the data received if the user is logged in
    useEffect(() => {
        fetch('http://localhost:5861/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization:`JWT ${accessToken}`
          },
        }).then((response) => response.json())
        .then((data) => {
          if(isSignedIn&&render.current==null)
            {
              if(data=="Token has expired")
              {
              alert("your access to the website has been expired, Kindely refresh the page and login again");
              
              setIsSignedIn(false);
              render.current=true;
              }
              setProducts(data);
            }
            })
      }); 
      if(!isSignedIn&&render.current==true)
      {
        return(<>
          <h1>Session expired, refresh the page and LogIn again..</h1>
          </>);
      }
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