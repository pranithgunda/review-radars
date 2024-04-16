const searchText = document.getElementById('product-name');
const searchButton = document.getElementById('search-button');

// add Click event on search button

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
        for(let i = 0; i<products.length;i++){
            console.log(products[i].asin);
        }
    })
    
}

