

$(document).ready(function() {
    function addItemToCart(products) {
        if(products.length > 0){
            var chooseAll = '<div class="header-action">' +
                '<input type="radio">' +
                '<p>Chọn tất cả</p>' +
                '</div>'
            $("#listCart").append(chooseAll);
        }
    
        function check(priceCr){
            if(priceCr){
                return '<p class="price-current">' + priceCr + '</p>';
            }
            return ''; // Trả về chuỗi rỗng nếu không có giá
        }

        
    
        products.forEach(function(product) {
            var priceCr = check(product.priceCr); // Gọi hàm check và gán kết quả cho biến priceCr
            var item = '<div class="block-product">' +
                '<div class="block-product-item">' +
                '<div class="checkbox-product">' +
                '<div class="select-product-action">' +
                '<input type="radio" value="0">' +
                '<div class="img">' +
                '<img src="' + product.productImg + '" class="product-img" alt="">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="product-info">' +
                '<div class="d-flex justify-content-between align-items-start mb-2">' +
                '<a href="#" class="product-name">' + product.productName + '</a>' +
                '<button class="remove-item">' +
                '<i class="bx bx-trash"></i>' +
                '</button>' +
                '</div>' +
                '<div class="d-flex justify-content-between align-items-center">' +
                '<div class="block-box-price">' +
                '<div class="box-price">' +
                '<p class="price-discount">' + product.priceDis + '</p>' +
                priceCr + // Sử dụng giá trị của priceCr ở đây
                '</div>' +
                '</div>' +
                '<div class="action">' +
                '<button class="btn_click btn_inc">+</button>' +
                '<input type="text" value="1">' +
                '<button class="btn_click btn_disinc">-</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
            $("#listCart").append(item);
        });
    }
    
    function removeDisabled(value, id, error){
        if(value > 0) {
            $(id).attr("disabled", false); // Kích hoạt nút
            $(id).removeClass(error);
            return true;
        } else {
            $(id).attr("disabled", true); // Vô hiệu hóa nút
            $(id).addClass(error);
            return false;
        }
    };
    
    function calculateTotal() {
        let totalMoney = 0;
        // Lặp qua tất cả các sản phẩm
        $(".block-product-item").each(function() {
            // Kiểm tra xem radio button có được chọn không
            if ($(this).find("input[type='radio']").is(":checked")) {
                // Lấy giá tiền và số lượng của sản phẩm
                var price = parseFloat($(this).find(".price-discount").text().replace(/\D/g, '')); // Lấy giá tiền, loại bỏ ký tự không phải là số
                var quantity = parseInt($(this).find("input[type='text']").val()); // Lấy số lượng
                // Kiểm tra nếu số lượng lớn hơn 0 thì thêm vào tổng tiền
                if (quantity > 0) {
                    totalMoney += price * quantity; // Nhân giá tiền với số lượng và cộng vào tổng tiền
                }
            }
        });
        return totalMoney;
    }
    // Lấy danh sách sản phẩm từ localStorage
    var products = JSON.parse(localStorage.getItem("cartItems")) || [];
    // Thêm sản phẩm vào giỏ hàng
    addItemToCart(products);
    let index = products.length;
    
    $("#quality").html(index);

    var lastChecked = null;

    var totalMoney = 0;

    $(".block-product-item input[type='radio']").click(function() {
        totalMoney = 0;
        if (this !== lastChecked) {
            lastChecked = this;
        } else {
            this.checked = false;
            lastChecked = null;
        }
        totalMoney = calculateTotal();
        updateFormattedMoney(totalMoney);
        removeDisabled(totalMoney,"#btnBuy","btn-disabled");
    });

    $(".remove-item").click(function() {
        // Xóa phần tử cha của nút remove-item (tức là phần tử có lớp CSS là block-product)
        $(this).closest(".block-product").remove();
        // Lấy danh sách sản phẩm từ localStorage
        var products = JSON.parse(localStorage.getItem("cartItems")) || [];
        // Xóa sản phẩm khỏi danh sách dựa trên index của phần tử được click
        var indexToRemove = $(this).closest(".block-product").index();
        products.splice(indexToRemove, 1);
        // Lưu lại danh sách sản phẩm sau khi xóa vào localStorage
        localStorage.setItem("cartItems", JSON.stringify(products));
        
        // Cập nhật lại số lượng sản phẩm trong giỏ hàng
        var index = products.length;
        $("#quality").html(index);
        
        totalMoney = calculateTotal();
        updateFormattedMoney(totalMoney);
    });

    // Xử lý sự kiện click cho nút btn_inc
    $(".btn_inc").click(function() {
        // Tìm input type="text" trong cùng một phần tử cha
        var inputField = $(this).siblings("input[type='text']");
        // Lấy giá trị hiện tại của input
        var currentValue = parseInt(inputField.val());
        // Tăng giá trị lên 1
        currentValue++;
        // Cập nhật giá trị mới vào input
        inputField.val(currentValue);
        totalMoney = calculateTotal();
        updateFormattedMoney(totalMoney);
    });

    // Xử lý sự kiện click cho nút btn_disinc
    $(".btn_disinc").click(function() {
        // Tìm input type="text" trong cùng một phần tử cha
        var inputField = $(this).siblings("input[type='text']");
        // Lấy giá trị hiện tại của input
        var currentValue = parseInt(inputField.val());
        // Giảm giá trị đi 1, nhưng đảm bảo giá trị không nhỏ hơn 0
        if (currentValue > 0) {
            currentValue--;
            // Cập nhật giá trị mới vào input
            inputField.val(currentValue);
        }
        totalMoney = calculateTotal();
        updateFormattedMoney(totalMoney);
    });

    var firstChecked = null;

   // Xử lý sự kiện click cho checkbox "Chọn tất cả"
   $("#listCart .header-action input[type='radio']").click(function() {
       // Đảo ngược trạng thái của biến selectAllChecked
       if (this !== firstChecked) {
            firstChecked = this;
            $("#btnBuy").removeClass("btn-disabled"); 
        } else {
            this.checked = false;
            firstChecked = null;
            $("#btnBuy").addClass("btn-disabled");
        }
       // Lấy trạng thái của checkbox "Chọn tất cả"
       var isChecked = $(this).prop("checked");
       
       // Lặp qua tất cả các checkbox trong #listCart trừ checkbox chọn tất cả
       $("#listCart .checkbox-product input[type='radio']").not(this).prop("checked", isChecked);
       // Nếu checkbox "Chọn tất cả" bị chọn lần thứ hai (bỏ chọn), tính lại tổng tiền
        totalMoney = calculateTotal();
        updateFormattedMoney(totalMoney);

        $("#btnBuy").attr("disabled", false);  
   });

    removeDisabled(totalMoney,"#btnBuy","btn-disabled");

    function updateFormattedMoney(total) {
        var formattedMoney = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total);
        $(".money").html(formattedMoney);
    }

    $("#btnBuy").click(function (e) { 
        e.preventDefault();
        // Lấy danh sách sản phẩm từ localStorage
        var products = JSON.parse(localStorage.getItem("cartItems")) || [];

        var temps = JSON.parse(localStorage.getItem("temps")) || { quantity: 0, price: 0 };

        // Xác định các phần tử radio được chọn trong .block-product-item
        $(".block-product-item input[type='radio']:checked").each(function () {            
            // Lấy chỉ số của sản phẩm từ thuộc tính dữ liệu data-product-index
            var indexToRemove = $(this).closest(".block-product").data("product-index");

            var temp = $(this).closest(".block-product-item").find("input[type='text']").val();

            if (!isNaN(parseInt(temp))) {
                temps.quantity += parseInt(temp);
                temps.price += parseInt(totalMoney);
            }

            // Xóa sản phẩm khỏi danh sách sản phẩm
            products.splice(indexToRemove, 1);

            // Xóa phần tử .block-product chứa radio button được chọn
            $(this).closest(".block-product").remove();
        });

        // Lưu lại số lượng danh sách sản phẩm
        localStorage.setItem("temps", JSON.stringify(temps));

        // Lưu lại danh sách sản phẩm sau khi xóa vào localStorage
        localStorage.setItem("cartItems", JSON.stringify(products));

        // Cập nhật lại số lượng sản phẩm trong giỏ hàng
        var index = products.length;
        $("#quality").html(index);

        // Tính toán và cập nhật lại tổng số tiền
        totalMoney = calculateTotal(); 
           
        updateFormattedMoney(totalMoney);

        window.location.href = "../html/thutucthanhtoan.html";        
    });

    updateFormattedMoney(totalMoney);
});

