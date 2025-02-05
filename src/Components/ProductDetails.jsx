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
    const accessToken=localStorage.getItem("accessToken");
    const [render,setRender]=useState(false);
    // this useEffect is used to fetch the products form the products collection is the user is logged in to show product details
    useEffect(() => {
            fetch('http://localhost:5861/api/products', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                authorization:`JWT ${accessToken}`
              },
            }).then((response) => response.json())
            .then((data) => {
                const item=data.filter(pro=> pro._id==params.id);
                products.current=item;
                setRender(!render)
                })
          },[render,params,accessToken]);

          // this function is used to add the product to the carts collection 
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