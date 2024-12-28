
import PropTypes from 'prop-types';
Product.propTypes={
    item: PropTypes.object
};
function Product(props)
{
    const product=props.item;
    const price=product.price;
    const discount=product.discountPercentage;
    const discountPrice=(price-(price*discount/100))
    return(
        <>
            <div className='product_image'>
                <img src={product.images[0]} alt="Product Image" width="250px" height="250px" className='image'/>
            </div>
            <div className='product_detail'>
                <span>{product.title}</span>
                <div style={{display:"flex", gap:"10px"}}>
                    <span style={{textDecoration:"line-through"}}>${product.price}</span>
                    <span style={{color:"red"}}>${discountPrice.toFixed(2)}</span>
                    <span style={{background:"black", color:"white", padding:"0px 3px 0px 3px"}}>-{product.discountPercentage}% OFF</span>
                </div>
                <span>Rating: {product.rating}</span>
            </div>
        </>
    )
}
export default Product