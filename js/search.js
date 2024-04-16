$(document).ready(function () {
    var products = '';
    
    products = JSON.parse(localStorage.getItem("productSearch")) || [];
    valueSearch = JSON.parse(localStorage.getItem("valueSearch"));
    $("#txtLength").html(products.length);
    $("#keySearch").html(valueSearch);
    $("#txtResult").html(valueSearch);
    console.log(valueSearch);

    var html = '';
    products.forEach(function(product, index) {
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
                    '<div class="product">' +
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
                        discountHtml +
                        '<div class="install-0-tag">' +
                            'Trả góp 0%' +
                        '</div>' +
                    '</div>' +
                '</div>';
    });

    $('.filter-products').html(html);
});