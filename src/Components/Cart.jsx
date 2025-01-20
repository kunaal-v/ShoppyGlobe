import CartProduct from "./CartProduct";
import { useEffect, useRef, useState } from "react";

function Cart()
{
    // This component is used to display the products in the cart
    const [cartItems,setCartItems]=useState([]);
    const [isSignedIn,setIsSignedIn]=useState(true);
    const render=useRef(null);
    const accessToken=localStorage.getItem("accessToken")
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
    //The useEffect is used to fetch all the product from the cart collection if the user is logged in
    useEffect(() => {
        fetch('http://localhost:5861/api/cartProducts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `JWT ${accessToken}`
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
              setCartItems(data);
            }
            })
      }); 
      if(!isSignedIn&&render.current==true)
      {
        return(<>
          <h1>Session expired, refresh the page and LogIn again..</h1>
          </>);
      }
    
    // If the cart is empty then show the empty cart message
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
export default Cart