
const displayHeaderEl = document.getElementById('display-heading');
// EventListener to show loader icon while document load is still in progress
document.addEventListener("readystatechange",(event) =>{
    if(document.readyState !== "complete"){
        document.querySelector("main").style.visibility = "hidden";
        document.querySelector("#loader").style.visibility="visible";
    }else{
        document.querySelector("#loader").style.display="none";
        document.querySelector("main").style.visibility = "visible";
    }
});


// Invoke API On document load
document.getElementById('rating-review-container').onload = fetchProductRatingsAndReviews();

// Function to retrieve product ratings and reviews
async function fetchProductRatingsAndReviews(){
    const ratingReviewEl = document.getElementById('rating-review-container');
    let productInfo = {};
    productInfo =  JSON.parse(localStorage.getItem('productInfo'));
    const productId = productInfo.id;
    const requestURL = `https://amazon-product-data6.p.rapidapi.com/product-review?asin=${productId}&page=1&country=US&reviewer_type=all_reviews&filter_by_star=all_stars&sort_by=helpful`;
    const options = {
        method:'GET',
        headers:{
            'X-RapidAPI-key':'77c3077d56mshb8de8e859891fdep1619d0jsn65f6d9cb5161',
            'X-RapidAPI-Host':'amazon-product-data6.p.rapidapi.com'
        }
    }
    // Call the API to fetch product review and ratings
    await fetch(requestURL,options)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        console.log(data.data);
        return data.data;
    })
    .then(function (result){
        // Manipulate the DOM to present Ratings and Review Info
        ratingReviewEl.innerHTML=`<h5>Ratings Summary</h5>
        <ul>
        <li>Total Ratings:${result.total_ratings}</li>
        <li>Total Reviews:${result.total_reviews}</li>
        <li>5 Star Rating:${result.stars['5 star']}</li>
        <li>4 Star Rating:${result.stars['4 star']}</li>
        <li>3 Start Rating:${result.stars['3 star']}</li>
        <li>2 Star Rating:${result.stars['2 star']}</li>
        <li>1 Star Rating:${result.stars['1 star']}</li>
        </ul>
        <h5>Reviews</h5>
        <ul id=reviews></ul>`
        for(let i=0;i<result.reviews.length;i++){
            const reviewsEl = document.getElementById('reviews');
            const reviewEl = document.createElement('li');
            reviewEl.textContent = `${result.reviews[i].title}       --${result.reviews[i].profile_name}`;
            reviewsEl.appendChild(reviewEl);
        }
    } )
    .catch(function (error){
        displayHeaderEl.textContent = 'Unable to retrieve Product Ratings & Reviews. Please try again.'
    })
}
