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

          }).then((response) => response.json())
          .then((data) => {
              console.log(data);
              })
    }  
    // This useFetch is used to fetch the products from the API
    // const {data,err,loading}=useFetch();
    const [products,setProducts]=useState([]);
    // This useEffect is used to set the products based on the data received
    useEffect(() => {
        fetch('http://localhost:5861/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((response) => response.json())
        .then((data) => {
            setProducts(data);
            })
      }, []); 
    // if(err)
    // {
    // <Error/>
    // return 
    // }
    // if(loading)
    // {
    // return <div>Loading......</div>
    // }
    return (<>
    {/* This is used to display the products */}
        <div className='products'>
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
        </div>
    </>)
}
export default Body