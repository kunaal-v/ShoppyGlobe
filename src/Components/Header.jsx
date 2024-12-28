import { Link } from "react-router-dom"
import { useSelector } from "react-redux";
function Header()
{
    // This component is used to display the header of the application
    const cartItems=useSelector(store=>store.cart.items);
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