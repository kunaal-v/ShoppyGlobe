import { useDispatch, useSelector } from "react-redux";
import { AddToCart,RemoveFromCart } from "../utils/CartSlice";
import PropTypes from 'prop-types';
CartProduct.propTypes={
    item: PropTypes.object
};
function CartProduct(props)
{
    // This component is used to show the products in the cart
    const product=props.item;
    // This is used to calculate the discount price
    const price=product.price;
    const discount=product.discountPercentage;
    const discountPrice=(price-(price*discount/100))
    // This is used to dispatch the action
    const dispatch=useDispatch();
    const cartItems=useSelector(store=>store.cart.items)
    var item;
    // This is used to filter the products based on the id 
    if(cartItems)
        {
            item= cartItems.filter(item=>item.id==product.id);
        }
        // This function is used to remove the product from the cart
    function handleRemove(item)
    {
        dispatch(RemoveFromCart(item));
    }
    // This function is used to add the product to the cart
    function handleAdd(item)
    {
        dispatch(AddToCart(item));
    }
    return (<>
    <div className="cart">
        {/* This is used to show the product image and details */}
        <div className="cart_items">
            <img src={product.images[0]} alt="" width="100px" height="100px" style={{border:"1px solid lightgray"}}/>
            <div className="cart_details">
                <span>{product.title}</span>
                <span style={{textDecoration:"line-through"}}>${product.price}</span>
                <div>
                    <span style={{color:"red", marginRight:"10px"}}>${discountPrice.toFixed(2)}</span>
                    <span style={{background:"black", color:"white", padding:"0px 3px 0px 3px"}}>-{product.discountPercentage}% OFF</span>     
                </div>
            </div>
        </div>
        <div className="AddToCart_btns" style={{height:"50px"}}>
        {/* This is used to show the quantity of the product */}
            <button className="minus_btn" onClick={()=>handleRemove(product)} disabled={cartItems.length==0} >-</button>
            <span className="Quantity">
            {cartItems.length>0?item[0].quantity:0}
            </span>
            
            <button className="plus_btn" onClick={()=>handleAdd(product)}>+</button>
        </div>
    </div>
    </>)
}
export default CartProduct