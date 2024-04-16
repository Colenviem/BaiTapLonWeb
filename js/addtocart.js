$(document).ready(function () {
    $(".product .btn").click(function() {
        var name = localStorage.getItem("name");
        if(name === null){
            window.location.href = "../html/dangnhap.html";
            alert("Bạn hay đăng nhập để mua hàng nha !!!");
        }else{
            name = name.substring(1, name.length - 1);
            var product = $(this).closest('.product');
            var productName = product.find('.name').text();
            var priceDis = product.find('.price-dis').text();
            var priceCr = product.find('.price-cr').text();
            var productImg = product.find('img').attr('src');
    
            // Tạo một đối tượng đại diện cho sản phẩm
            var productObj = {
                productName: productName,
                priceDis: priceDis,
                priceCr: priceCr,
                productImg: productImg
            };
    
            // Kiểm tra xem liệu có mảng đã được lưu trữ trong localStorage chưa
            var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    
            // Thêm sản phẩm vào mảng cartItems
            cartItems.push(productObj);
    
            // Lưu mảng cartItems vào localStorage
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
    
            let index = cartItems.length;
        
            $("#quality").html(index);
    
            window.location.href = "../html/giohang.html";
        }
    });
});