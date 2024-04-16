$(document).ready(function () {
    function randomImg() {
        var list = []; // Khai báo một mảng rỗng
        list[0] = "../img/Slider/Slider_1.jpg";
        list[1] = "../img/Slider/Slider_2.jpg";
        list[2] = "../img/Slider/Slider3.jpg";
    
        var randomIndex = Math.floor(Math.random() * list.length); 
        var value = list[randomIndex];
    
        $("#slider").attr("src", value); 
    }
    setInterval(randomImg, 3000);

    var products = '';

    products = JSON.parse(localStorage.getItem("listOfAllProducts")) || [];

    $(".product").click(function (e) { 
        var productId = $(this).attr('id'); // Lấy id của sản phẩm
        localStorage.setItem("idGetLink",productId);
        console.log(productId);
    });
});