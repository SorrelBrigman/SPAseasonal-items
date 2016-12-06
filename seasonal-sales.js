//Build Webpage lists
  //all products
  //department product is in
  //the price
//put a select element at the top of the page that contains
    //all possible values of the season_discount key in the categories file
    // as soon as you select the season
    // all prices should update to current discount by %

//assign products to var

var divForItems = document.getElementById("listOfItems");
var itemsToPage = "";
var products;
var salesData;




var loadProducts = function () {
  for (var i = 0; i < products.products.length; i++) {
    //assigns appropriate department
    if (products.products[i].category_id === 1) {
      products.products[i].category = "Apparel";
    } else if (products.products[i].category_id === 2) {
      products.products[i].category = "Furniture";
    } else if (products.products[i].category_id === 3) {
      products.products[i].category = "Household";
    }

//assign to div with product name, department and price and html elements in place
    itemsToPage += `<h3>${products.products[i].name}</h3><p>In the ${products.products[i].category} Department</p><p class="${products.products[i].category_id}">Price is: <span class="price">${products.products[i].price}</span></p>`;
}  //post to page
   divForItems.innerHTML = itemsToPage;

}

//function to parse JSON data for items and load into variable on page
var getProducts = function (e) {
  products = JSON.parse(e.target.responseText);
  //loads jSON list of data to page
  loadProducts();
}

//function to parse JSON data for seasonal sales
var getSales = function (e) {
  salesData = JSON.parse(e.target.responseText);
}

//aquire list of products by way of products.json page loading (trigger by file load completion)
var storeProducts = new XMLHttpRequest();
storeProducts.addEventListener("load", getProducts);
storeProducts.open("GET", "products.json");
storeProducts.send();

// aquire seasonal discount by way of categories.json page loading (trigger by file load completion)
var storeCat = new XMLHttpRequest();
storeCat.addEventListener("load", getSales);
storeCat.open("GET", "categories.json");
storeCat.send();
console.log(storeCat);
//all prices should auto update to reflect discount (trigger by change of option below)
// write function to update prices
var changePrice = function (e) {

  for (var i = 0; i < 3; i++) {
    if (document.getElementById("seasons").value === salesData.categories[i].season_discount) {
      var currentClass = salesData.categories[i].id;
      var whichClass =  document.getElementsByClassName(currentClass);
      for (var j = 0; j < whichClass.length; j++) {
        // var seasonProduct = whichClass[j].toString();
        var price = parseFloat(whichClass[j].getElementsByTagName("span")[0].innerHTML);
        console.log("price" + price)
        var newPrice = price * (1 - (parseFloat(salesData.categories[i].discount)));
        console.log("price after discount" + Math.round(newPrice) * 100)/100;
        newPrice = Math.round(newPrice * 100) / 100;
        whichClass[j].getElementsByTagName("span")[0].innerHTML = newPrice;
      }
    }
  }
}



//Two things happen on change of selection:

//clear previous changed content by reloading page before changes
document.querySelector("select").addEventListener("change", function (e) {
  loadProducts();
  changePrice();
});



// //call function
// document.querySelector("select").addEventListener("change", function (e) {
//   //aquire seasons and discounts
//   var storeCat = new XMLHttpRequest();
//   storeCat.addEventListener("load", changePrice);
//   storeCat.open("GET", "categories.json");
//   storeCat.send();
//   console.log(storeCat);
// });
