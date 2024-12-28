import { useDispatch, useSelector } from "react-redux";
import { AddToCart,RemoveFromCart } from "../utils/CartSlice";
import PropTypes from 'prop-types';
CartProduct.propTypes={
    item: PropTypes.object
};
function CartProduct(props)
{
    const product=props.item;
    const price=product.price;
    const discount=product.discountPercentage;
    const discountPrice=(price-(price*discount/100))
    const dispatch=useDispatch();
    const cartItems=useSelector(store=>store.cart.items)
    var item;
    if(cartItems)
        {
            item= cartItems.filter(item=>item.id==product.id);
        }
    function handleRemove(item)
    {
        dispatch(RemoveFromCart(item));
    }
    function handleAdd(item)
    {
        dispatch(AddToCart(item));
    }
    return (<>
    <div className="cart">
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