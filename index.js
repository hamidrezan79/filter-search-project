//http://localhost:3000/items
let allProductData = [];
const filters = {
    searchItem: "",
};
const searchInput = document.querySelector("#search");
const productsDOM = document.querySelector(".products-center");
const btn = document.querySelectorAll(".btn");

document.addEventListener("DOMContentLoaded", () => {
    axios.get("  http://localhost:3000/items")
        .then(res => {
            allProductData = res.data;
            //render products on dom
            renderProducts(res.data, filters)
        }) 
        .catch(err => console.log(err));
})

function renderProducts(_products, _filters) {
    const filteredProducts = _products.filter((p) => {
        return p.title.toLowerCase().includes(_filters.searchItem.toLowerCase());
    })
    productsDOM.innerHTML = "";
    filteredProducts.forEach((item, index) => {
        //create
        //content
        //append products
        const productsDiv = document.createElement("div");
        productsDiv.classList.add("product");
        productsDiv.innerHTML = `<div class="img-container">
        <img src=${item.image} alt="p-${index}">
      </div>
      <div class="img-desc">
        <p class="product-price"> ${item.price} $ </p>
        <p class="product-title">${item.title}</p>
      </div>`;
        productsDOM.appendChild(productsDiv);
    });
};


searchInput.addEventListener("input", (e) => {
    filters.searchItem = e.target.value;
    renderProducts(allProductData, filters)
});
btn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const filter = e.target.dataset.filter;
        filters.searchItem = filter;
        renderProducts(allProductData,filters);
    })
})