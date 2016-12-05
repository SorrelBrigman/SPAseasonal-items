//Build Webpage lists
  //all products
  //department product is in
  //the price
//put a select element at the top of the page that contains
    //all possible values of the season_discount key in the categories file
    // as soon as you select the season
    // all prices should update to current discount by %


var divForItems = document.getElementById("listOfItems");
var itemsToPage = "";


//function to fill in the items on the page
// var fillItems = function() {
//   for (var i = 0; i < products.length; i++) {
//     var itemsToPage;
//     itemsToPage += `<h4>${products[i].name}</h4>`;
//     console.log(itemsToPage);
//   }
//   // divForItems.innerHTML = itemsToPage;
// };

//function to parse JOSN data for items
var getProducts = function (e) {
  var products = JSON.parse(e.target.responseText);
  for (var i = 0; i < products.products.length; i++) {
    if (products.products[i].category_id === 1) {
      products.products[i].category = "Apparel";
    } else if (products.products[i].category_id === 2) {
      products.products[i].category = "Furniture";
    } else if (products.products[i].category_id === 3) {
      products.products[i].category = "Household";
    }
    itemsToPage += `<h3>${products.products[i].name}</h3><p>In the ${products.products[i].category} Department</p><p class="${products.products[i].category_id}">Price is: ${products.products[i].price}</p>`;
  }
   divForItems.innerHTML = itemsToPage;
}




//aquire list of products
var storeProducts = new XMLHttpRequest();
storeProducts.addEventListener("load", getProducts);
storeProducts.open("GET", "products.json");
storeProducts.send();

console.log(storeProducts);

//assign products to var
//assign to div with product name, department and price


//aquire seasons and discounts
// var storeCat = new XMLHttpRequest();
// storeCat.addEventListener("load", ???);
// storeCat.open("GET", "categories.json");
// storeCat.send();

// console.log(storeCat);


//on selection of season
//all prices should auto update to reflect discount


// write function to update prices


//call function
