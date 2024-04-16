$(document).ready(function () {
    $("#btnSearch").click(function (e) { 
        e.preventDefault();
        let valueSearch = $('#txtSearch').val();
        let list = JSON.parse(localStorage.getItem("listOfAllProducts")) || []; 
        let productSearch;
        if (valueSearch.trim() === '') {
            productSearch = []; // Nếu valueSearch rỗng, productSearch là mảng rỗng
        } else {
            productSearch = list.filter(product => {
                return product.productName.toLowerCase().includes(valueSearch.toLowerCase());
            });
        }
        console.log(productSearch);  
        localStorage.setItem("productSearch", JSON.stringify(productSearch));
        localStorage.setItem("valueSearch", JSON.stringify(valueSearch));
        window.location.href = "../html/timkiem.html";
    }); 
});