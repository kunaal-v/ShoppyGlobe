import { useDispatch } from "react-redux";
import { AddToCart } from "../utils/CartSlice";
import useFetch from "../utils/useFetch";
import { useEffect,useState } from "react";
import Error from "./Error";
import { Link } from "react-router-dom";
import Product from "./Product";
function Search()
{
    const dispatch=useDispatch();
    const [searchedText,setSearchedText]=useState("");
    function handleCart(item)
    {
        dispatch(AddToCart(item));
    }  
    const {data,err,loading}=useFetch('https://dummyjson.com/products');
    const [products,setProducts]=useState([]);
    useEffect(()=>{
        if(data)
        {
            if(searchedText!="")
            {
                let newData=data.products.filter(product=>
                    product.title.toLowerCase().includes(searchedText.toLowerCase())
                )
                setProducts(newData);
            }
            else
            {
                setProducts(data.products);
            } 
        }
    },[data,searchedText])
    if(err)
    {
    <Error/>
    return 
    }
    if(loading)
    {
    return <h1>Loading......</h1>
    }

    return(<>
    <div className="Search">
        <input type="text" name="" id="" 
        className="search_input" 
        placeholder="Search..." 
        onChange={(e)=>setSearchedText(e.target.value)}/>
        {/* <button className="search_btn">Search</button> */}
    </div>
    <div className='products'>
        {products.map((product)=>(
            <li key={product.id}>
            <div className='product'>
            <Link to={`/product/${product.id}`}>
            <Product item={product}/></Link>
            <div >
                    <button className='product_addToCart_btn' onClick={()=>handleCart(product)}>Add To Cart</button>
                </div>
            </div>
        </li>
        ))}
        </div>
    </>)
}
export default Search