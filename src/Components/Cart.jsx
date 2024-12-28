import { useDispatch, useSelector } from "react-redux"
import { ClearCart } from "../utils/CartSlice";
import CartProduct from "./CartProduct";

function Cart()
{
    // This component is used to display the products in the cart
    const cartItems=useSelector(store=>store.cart.items);
    const dispatch=useDispatch();
    // This function is used to clear the cart
    function handleClearCart()
    {
        dispatch(ClearCart())   
    }
    // If the cart is empty then show the empty cart message
    if(cartItems.length==0)
    {
        return(<>
        <div className="EmptyCart">Cart is Empty</div></>)
    }
    return(<>
    {/* This is used to show the products in the cart */}
    {cartItems.map((data)=>
    <li key={data.id} style={{listStyle:"none"}}>
        <CartProduct item={data}/>
    </li>)}
        <div className="clearCart">
        <button onClick={handleClearCart} className="AddToCartBtn">Clear Cart</button>

        </div>
    </>)
}
export default Cart