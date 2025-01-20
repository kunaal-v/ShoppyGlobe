import { Link } from "react-router-dom"
import { useState,useEffect, useRef } from "react";
import PropTypes from 'prop-types';;
Header.propTypes={
    signedInfunction:PropTypes.func,
};
function Header(props)
{
    // This component is used to display the header of the application
    const [cartItems,setCartItems]=useState([]);
    const [isSignedIn,setIsSignedIn]=useState(true);
    const render=useRef(null);
    const accessToken=localStorage.getItem("accessToken");
    //this useEffect is used to fetch the cart products form cart collection if the user is logged in
        useEffect(() => {
            fetch('http://localhost:5861/api/cartProducts', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                authorization: `JWT ${accessToken}`,
              },
            }).then((response) => response.json())
            .then((data) => {
                if(isSignedIn&&render==null)
                {
                    if(data=="Token has expired")
                    {
                    alert("your access to the website has been expired, Kindely refresh the page and login again");
                    props.signedInfunction();
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