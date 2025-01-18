import {  useParams } from "react-router-dom"
import { useState,useRef,useEffect } from "react";
// import Error from "./Error";
// import useFetch from "../utils/useFetch"
import Reviews from "./Reviews"; 
// import { useDispatch } from "react-redux";
// import { AddToCart } from "../utils/CartSlice";

function ProductDetails()
{
    // This component is used to display the product details 
    const params=useParams();
    var products=useRef([]);
    const [render,setRender]=useState(false);
    useEffect(() => {
            fetch('http://localhost:5861/api/products', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }).then((response) => response.json())
            .then((data) => {
                const item=data.filter(pro=> pro._id==params.id);
                products.current=item;
                setRender(!render);
                })
          }, [params,render]);

    function handleAdd(product){
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
    return (<>
        {
            // If the data is present then display the product details
            products.current.map((product)=>
            <li key={product.id} className="Product_Details">
                    <div className="ProductDetails">
                        <div >
                            <img src={product.images[0]} alt=""  width="500px"height="500px" className="ProductDetails_image"/>
                        </div>
                        <div className="ProductDetails_Details">
                            <span className="discount_Percentage">-{product.discountPercentage}%</span>
                            <span style={{color:"red"}}>{product.availabilityStatus=="Low Stock"?"Low Stock":""}</span>
                            <span> BRAND: {product.brand}</span><hr />
                            <span> Type: {product.category}</span><hr />
                            <span> {product.description}</span><hr />
                            <span> Price: ${product.price}</span>
                            <span> Rating: {product.rating}</span><hr />
                            <span> {product.returnPolicy}</span>
                            <span>{product.warrantyInformation}</span><hr />
                            <div className="quantity_btns">
                                <div>
                                    <button onClick={()=>handleAdd(product)} className="AddToCartBtn">Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="Reviews">
                        <span>REVIEWS</span>
                        {/* This map function is used to show all the reviews by rendering Reviews component */}
                        {product.reviews.map((review,index)=>
                            (<div key={index}>
                                <Reviews data={review}/> </div>)
                        )}
                    </div>
            </li> )
        }
    </>)
}
export default ProductDetails   