const TIMEOUT = 50000;
const ITEM_PER_PAGE = 10;
let pageIndex = 0;

function checkEnter() {
    console.log("key pressed")
    if(event.key === 'Enter') {
        getProducts();        
    }
}

function getProducts() {
    let input = document.getElementById('searchInput');
    console.log(input.value);
    const theUrl = "http://dummy.restapiexample.com/api/v1/employees"
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.timeout = TIMEOUT;
    xmlHttp.open( "GET", theUrl, true );
    xmlHttp.ontimeout = function () {
        console.error("The request for " + url + " timed out.");
    };
    xmlHttp.send( null );
    xmlHttp.onload = function() {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                let header = document.getElementById("searchHeader");
                header.classList.add("small");
                let responseData = JSON.parse(xmlHttp.response).data;
                let node = document.createElement("LI");
                let link = document.createElement("A")                 
                let textnode = document.createTextNode("Water");
                link.appendChild(textnode);                              
                node.appendChild(link);                              
                ul = document.getElementById("productList");
                ul.innerHTML = '';
                responseData.slice(pageIndex * ITEM_PER_PAGE, (pageIndex + 1) * ITEM_PER_PAGE).map((item) => {
                    let responseData = JSON.parse(xmlHttp.response).data;
                    let node = document.createElement("LI");
                    let link = document.createElement("A")
                    link.setAttribute('target', '_blank');
                    link.setAttribute('href', 'https://www.google.com');
                    let productName = document.createElement("P");                      
                    let productNameText = document.createTextNode(`${item.employee_name}`);
                    productName.appendChild(productNameText);
                    productName.classList.add("productName");
                
                    let productPrice = document.createElement("P");                      
                    let productPriceText = document.createTextNode(`TRY ${item.employee_salary}`);
                    productPrice.appendChild(productPriceText);
                    productPrice.classList.add("productPrice");
                
                    let productImage = document.createElement('img'); 
                    productImage.src = 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSiwP3dXCx3zlpelCi8pcX96xEJGZQUhilLgvRMULhpy_mw9U3mXE6lgFhrx8mK&usqp=CAc'; 
                    link.appendChild(productImage);                              
                    link.appendChild(productName);                              
                    link.appendChild(productPrice);                       
                    node.appendChild(link);
                    ul.appendChild(node);   
                });
                console.log(responseData[0])
                console.log(responseData)
            } else {
                console.error(xmlHttp.statusText);
            }
        }
    };
}