//Build Webpage lists
  //all products
  //department product is in
  //the price
//put a select element at the top of the page that contains
    //all possible values of the season_discount key in the categories file
    // as soon as you select the season
    // all prices should update to current discount by %

//declare global variables

// var for DOM div that will be filled with product information
var divForItems = document.getElementById("listOfItems");
// var for future concat string that will hold information
var itemsToPage = "";
// var to store parsed product information
var products;
// var to store parsed sales information
var salesData;



// function that will put parsed product information to page and print which department the product is in
var loadProducts = function () {
  //clears previous content
  itemsToPage= "";
  for (var i = 0; i < products.length; i++) {
    //assigns appropriate department
    if (products[i].category_id === 1) {
      products[i].category = "Apparel";
    } else if (products[i].category_id === 2) {
      products[i].category = "Furniture";
    } else if (products[i].category_id === 3) {
      products[i].category = "Household";
    }

//assign to div with product name, department and price and html elements in place
    itemsToPage += `<h3>${products[i].name}</h3><p>In the ${products[i].category} Department</p><p class="${products[i].category_id}">Price is: <span class="price">${products[i].price}</span></p>`;
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
storeProducts.open("GET", "https://seasonalsalessb.firebaseio.com/folder2/products.json");
storeProducts.send();

// aquire seasonal discount by way of categories.json page loading (trigger by file load completion)
var storeCat = new XMLHttpRequest();
storeCat.addEventListener("load", getSales);
storeCat.open("GET", "https://seasonalsalessb.firebaseio.com/folder/categories.json");
storeCat.send();
console.log(storeCat);

//all prices should auto update to reflect discount (trigger by change of option below)
// write function to update prices
var changePrice = function () {
  for (var i = 0; i < 3; i++) {
    //if the product's class matches the currently selected season
    if (document.getElementById("seasons").value === salesData[i].season_discount) {
      //the currently selected season class
      var currentClass = salesData[i].id;
      //selects all prices with that class name and creates an array of those paragraphs with the current class
      var whichClass =  document.getElementsByClassName(currentClass);
      //cycles through all of the paragraphs with the current class and does the following:
      for (var j = 0; j < whichClass.length; j++) {
        // gather that price (which is housed inside of a span)
        var price = parseFloat(whichClass[j].getElementsByTagName("span")[0].innerHTML);
        //applies the discount to the price
        var newPrice = price * (1 - (parseFloat(salesData[i].discount)));
        //rounds new price to the nearest cent
        newPrice = Math.round(newPrice * 100) / 100;
        //replaces old price on page with the new price
        whichClass[j].getElementsByTagName("span")[0].innerHTML = newPrice;
      }
    }
  }
}



//Two things happen on change of selection of season:

//clear previous changed content by reloading page before changes
document.querySelector("select").addEventListener("change", function (e) {
  loadProducts();
  //loading changed prices
  changePrice();
});
