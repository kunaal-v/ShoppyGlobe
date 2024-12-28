import {  useParams } from "react-router-dom"
import { useMemo,useRef } from "react";
import Error from "./Error";
import useFetch from "../utils/useFetch"
import Reviews from "./Reviews";
import { useDispatch } from "react-redux";
import { AddToCart } from "../utils/CartSlice";

function ProductDetails()
{
    const params=useParams();
    const dispatch= useDispatch();
    var products=useRef([]);
    
    const {data,err,loading}=useFetch("https://dummyjson.com/products");
    useMemo(()=>{
        if(data)
        {
            const newData=data.products;
            const item=newData.filter(pro=>pro.id==params.id);
            products.current=item;
        }
    },[data,params.id])
    function handleAdd(item)
    {
        dispatch(AddToCart(item));
    }
    
    if(err)
    {
    <Error/>
    return 
    }
    if(loading)
    {
    return <h1>Loading......</h1>
    }
    return (<>
        {
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