import PropTypes from 'prop-types';
Reviews.propTypes={
    data: PropTypes.object
};
function Reviews(props)
{
    
    const review=props.data
    const isoTimestamp = review.date;
    // This is used to convert the ISO timestamp to date
    const date = new Date(isoTimestamp).toLocaleDateString();
    var rating="";
    for(let i=0;i<review.rating;i++)
    {
        rating=rating+"⭐";
    }
    return(
            <div className="Review">
                <span>{review.comment}</span>
                <span>Rating: {rating}</span>
                <span>By: {review.reviewerName}</span>
                <small> Date: {date}</small>
            </div>
   )
}
export default Reviews