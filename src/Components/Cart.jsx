import { useDispatch, useSelector } from "react-redux"
import { ClearCart } from "../utils/CartSlice";
import CartProduct from "./CartProduct";

function Cart()
{
    const cartItems=useSelector(store=>store.cart.items);
    const dispatch=useDispatch();
    function handleClearCart()
    {
        dispatch(ClearCart())   
    }
    if(cartItems.length==0)
    {
        return(<>
        <div className="EmptyCart">Cart is Empty</div></>)
    }
    return(<>
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