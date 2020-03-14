const TIMEOUT = 50000;
const ITEM_PER_PAGE = 10;
let pageIndex = 0;
let responseData;

function checkEnter() {
    if(event.key === 'Enter') {
        getProducts();        
    }
}

function getProducts() {
    let input = document.getElementById('searchInput');
    console.log(input.value);
    const theUrl = "https://dummy.restapiexample.com/api/v1/employees"
    
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.timeout = TIMEOUT;
    xmlHttp.open( "GET", theUrl, true );
    xmlHttp.ontimeout = function () {
        console.error("The request for " + theUrl + " timed out.");
    };
    xmlHttp.onload = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                let header = document.getElementById("searchHeader");
                header.classList.add("small");
                responseData = JSON.parse(xmlHttp.response).data;
                pageIndex = 0;
                loadProducts();      

            } else {
                console.error(xmlHttp.statusText);
            }
        }
    };
    xmlHttp.send( null );
}

function nextPage() {
    if(pageIndex > ((responseData.length / ITEM_PER_PAGE) - 1) ) {
        return;
    }
    document.getElementById("pageIndicator").value = pageIndex;
    pageIndex++;
    loadProducts();
}

function prevPage() {
    if( pageIndex === 0 ) {
        return;
    }
    document.getElementById("pageIndicator").value = pageIndex;
    pageIndex--;
    loadProducts();
}

function loadProducts() {
    if (!responseData) {
        return;
    }

    ul = document.getElementById("productList");
    ul.innerHTML = '';
    
    responseData.slice(pageIndex * ITEM_PER_PAGE, (pageIndex + 1) * ITEM_PER_PAGE).map((item) => {
        let node = document.createElement("LI");;
        
        let productName = document.createElement("P");                      
        let productNameText = document.createTextNode(`${item.employee_name}`);
        productName.appendChild(productNameText);
        productName.classList.add("productName");
    
        let productPrice = document.createElement("P");                      
        let productPriceText = document.createTextNode(`TRY ${item.employee_salary}`);
        productPrice.appendChild(productPriceText);
        productPrice.classList.add("productPrice");
    
        let productImage = document.createElement('IMG'); 
        productImage.src = 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSiwP3dXCx3zlpelCi8pcX96xEJGZQUhilLgvRMULhpy_mw9U3mXE6lgFhrx8mK&usqp=CAc'; 
        
        let link = document.createElement("A")
        link.setAttribute('target', '_blank');
        link.setAttribute('href', 'https://www.google.com')
        
        link.appendChild(productImage);                              
        link.appendChild(productName);                              
        link.appendChild(productPrice);                       
        node.appendChild(link);
        ul.appendChild(node);   
    });
    
    document.getElementById("pageInfo").style.display = 'flex';
    document.getElementById("pageIndicator").value = pageIndex + 1;
}