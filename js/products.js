$(document).ready(function() {
    var products = '';

    if (window.location.pathname.indexOf("sony.html") !== -1) {
        products = JSON.parse(localStorage.getItem("sonyProductList")) || [];
    } else if (window.location.pathname.indexOf("Canon.html") !== -1) {
        products = JSON.parse(localStorage.getItem("canonProductList")) || [];
    } else if (window.location.pathname.indexOf("Panasonic.html") !== -1) {
        products = JSON.parse(localStorage.getItem("panasonicProductList")) || [];
    } else if (window.location.pathname.indexOf("Gopro.html") !== -1) {
        products = JSON.parse(localStorage.getItem("goproProductList")) || [];
    } else if (window.location.pathname.indexOf("Insta360.html") !== -1) {
        products = JSON.parse(localStorage.getItem("insta360ProductList")) || [];
    } else if (window.location.pathname.indexOf("JVC.html") !== -1) {
        products = JSON.parse(localStorage.getItem("JVCProductList")) || [];
    } else if (window.location.pathname.indexOf("sanpham.html") !== -1) {
        products = JSON.parse(localStorage.getItem("listOfAllProducts")) || [];
    }
    
    var html = '';
    products.forEach(function(product, index) { // Ensure you include the index parameter here
        if (index % 4 === 0) {
            html += '</div><div class="row mb-4">';
        }
    
        var discountHtml = '';
        if (product.percent) {
            discountHtml = '<div class="prodcut-discount">' +
                                '<p class="discount-detail">Giảm ' + product.percent + '</p>' +
                            '</div>';
        }
        var priceCrHtml = '';
        if (product.priceCr) {
            priceCrHtml = '<span class="price-cr">' + product.priceCr + '</span>';
        }
        html += '<div class="col-3">' +
                    '<div class="product" id=' + product.id + '>' +
                        '<a href="../html/chiTietSanPham.html">' +  
                            '<div class="product-top">' +
                                '<div class="img">' +
                                    '<img src="' + product.productImg + '" alt="">' +
                                '</div>' +
                                '<h4 class="name my-2">' + product.productName + '</h4>' +
                            '</div>' +
                            '<div class="product-body mt-2 mb-3">' +
                                '<div class="price">' +
                                    '<span class="price-dis">' + product.priceDis + '</span>' +
                                    priceCrHtml +
                                '</div>' +
                                '<div class="pay-price">' +
                                    'Giảm thêm Smember đến&nbsp;<span>93.000đ</span>' +
                                '</div>' +
                                '<div class="infor">' +
                                    '<p>' +
                                        'Không phí chuyển đổi khi trả góp 0% qua thẻ tín dụng kỳ hạn 3-6 tháng' +
                                    '</p>' +
                                '</div>' +
                            '</div>' +
                            discountHtml +
                            '<div class="install-0-tag">' +
                                'Trả góp 0%' +
                            '</div>' +
                        '</a>' +
                            '<div class="product-bottom d-flex align-items-center justify-content-between">' +
                                '<div class="hating">' +
                                    '<i class="bx bxs-star"></i>' +
                                    '<i class="bx bxs-star"></i>' +
                                    '<i class="bx bxs-star"></i>' +
                                    '<i class="bx bxs-star"></i>' +
                                    '<i class="bx bxs-star"></i>' +
                                '</div>' +
                                '<button type="button" class="float-right btn btn-outline-dark">Mua ngay</button>' +
                            '</div>' +
                    '</div>' +
                '</div>';
    });

    $('.filter-products').html(html);

    $(".mb-1").click(function (e) { 
        e.preventDefault();
        var buttonContent = $(this).find(".button-content");
        var wrapper = buttonContent.next(".wrapper");
        wrapper.toggleClass("active");
    });
    var products = JSON.parse(localStorage.getItem("cartItems")) || [];
    
    let index = products.length;
    
    $("#quality").html(index);

    $(".product").click(function (e) { 
        var productId = $(this).attr('id'); // Lấy id của sản phẩm
        localStorage.setItem("idGetLink",productId);
    });
});