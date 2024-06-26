const searchText = document.getElementById('product-name');
const searchButton = document.getElementById('search-button');
const productsListEl =  document.getElementById('products-container');
const productsSearchTextEl =  document.getElementById('products-search');

// add Click event on search button to invoke API and fetch products

searchButton.addEventListener('click', fetchProducts);

async function fetchProducts(event){
    event.preventDefault();
    const productName = searchText.value;
    const requestURL = `https://amazon-product-data6.p.rapidapi.com/product-by-text?keyword=${productName}&page=1&country=US&sort_by=feature`;
    const options = {
        method:'GET',
        headers:{
            'X-RapidAPI-Key':'77c3077d56mshb8de8e859891fdep1619d0jsn65f6d9cb5161',
            'X-RapidAPI-Host':'amazon-product-data6.p.rapidapi.com'
        }
    }
    await fetch(requestURL,options)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        return data.data;      
    })
    .then(function (products){
        const productsList =  document.getElementById('products-container');
        productsList.textContent = '';
        productsSearchTextEl.textContent = `Showing products for: ${productName}`;
        // Manipulate DOM to present with list of product search results
        for(let i = 0; i<products.length;i++){
            const productEl = document.createElement('button');
            productEl.setAttribute('data-index',i);
            productEl.setAttribute('class','w3-btn w3-block w3-grey w3-left-align');
            let title = products[i].title.length > 100 ? products[i].title.substring(0,100) : products[i].title;
            const lastIndex = title.lastIndexOf(' ');
            title = title.substring(0,lastIndex);
            productEl.textContent = title;
            productsListEl.appendChild(productEl);
            const divEl = document.createElement('div');
            divEl.setAttribute('class','w3-container w3-hide');
            divEl.setAttribute('id',i);
            divEl.innerHTML=`<p>Price: ${products[i].price}.</p>
            <img src=${products[i].image}>
            <p>Rating: ${products[i].stars}/5</p>
            <a id = ${products[i].asin} href="review.html" target="_blank">Click here for ratings and reviews</a>`
            productsListEl.appendChild(divEl);

}
})
.catch(function (error){
    productsSearchTextEl.textContent = 'Unable to retrieve Product Search results. Please try again';
})
    
}

// Delegate event listener to the parent element, <div id="products-container">
// Expand and Collapse the accordion on click to view product information

productsListEl.addEventListener('click', function(event){
    const targetEl = event.target;
    const targetElType = event.target.tagName;
    if(targetElType.startsWith('A')){
        const productId =  targetEl.getAttribute('id');
        // Instantiate productInfo object
        const productInfo = {id:productId};
        localStorage.clear();
        // Save productInfo object to local storage
        localStorage.setItem('productInfo',JSON.stringify(productInfo));
    }else{
        const indexAttribute = targetEl.getAttribute('data-index');
        const productInfoEl = document.getElementById(indexAttribute);
        //Expand/collapse the accordion by updating the class name
        if(productInfoEl.className.indexOf("w3-show")==-1){
            productInfoEl.className = productInfoEl.className.replace(" w3-hide","");
            productInfoEl.className += " w3-show";
        } else{
            productInfoEl.className = productInfoEl.className.replace(" w3-show","");
            productInfoEl.className += " w3-hide";
        }
    }
});


