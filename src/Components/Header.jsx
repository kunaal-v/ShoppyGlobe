import { Link } from "react-router-dom"
import { useState,useEffect } from "react";
function Header()
{
    // This component is used to display the header of the application
    const [cartItems,setCartItems]=useState([]);
    const accessToken=localStorage.getItem("accessToken");
        useEffect(() => {
            fetch('http://localhost:5861/api/cartProducts', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                authorization: `JWT ${accessToken}`,
              },
            }).then((response) => response.json())
            .then((data) => {
                setCartItems(data);
                })
          });
    return(
        <>
            <div className="Header">
                <div className="Header_shipping">FREE SHIPPING | EXTRA 10% OFF ON PREPAID ORDERS</div>
                <div className="Header_div">
                    <Link to="/home"><button className="btn homeBtn" >Home</button></Link>
                    <span className="logo">SHOPPY GLOBE</span>
                    <div className="Header_btns">
                        <Link to="/search"><button className="btn">Search</button></Link>
                        <Link to="/cart"><button className="btn" >Cart <sup className="cart_quantity">{cartItems.length}</sup></button></Link>
                    </div>
                </div>
                <div className="Header_sale">
                    <h1>DAILY SALE: UPTO 20% OFF</h1>
                </div>
            </div>
        </>
    )
}
export default Header