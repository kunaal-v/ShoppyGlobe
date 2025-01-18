import CartProduct from "./CartProduct";
import { useEffect, useState } from "react";

function Cart()
{
    // This component is used to display the products in the cart
    const [isLoggedIn,setIsloggedIn]=useState(false);
    const [cartItems,setCartItems]=useState([]);
    const accessToken=localStorage.getItem("accessToken")
    useEffect(() => {
        fetch('http://localhost:5861/api/cartProducts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authurization: `JWT ${accessToken}`
          },
        }).then((response) => response.json())
        .then((data) => {
          setIsloggedIn(true);
            setCartItems(data);
            })
      });
    // This function is used to clear the cart
    function handleClearCart()
    {
        fetch('http://localhost:5861/api/clearCart', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          }).then((response) => response.json())
          .then((data) => {
              console.log(data);
              })
    }
    // If the cart is empty then show the empty cart message
    if(isLoggedIn)
    {
      if(cartItems.length==0)
        {
            return(<>
            <div className="EmptyCart">Cart is Empty</div></>)
        }
      return(<>
        {/* This is used to show the products in the cart */}
        {cartItems.length!=0&&cartItems.map((data)=>
        <li key={data.id} style={{listStyle:"none"}}>
            <CartProduct item={data}/>
        </li>)}
            <div className="clearCart">
            <button onClick={handleClearCart} className="AddToCartBtn">Clear Cart</button>
    
            </div>
        </>)
    }
    else{
      return(<>
      <div> User need to logIn before accesing to the cart</div>
      </>)
    }
    
    
}
export default Cart