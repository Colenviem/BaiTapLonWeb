$(document).ready(function () {
    let idGetLink = localStorage.getItem("idGetLink");
    
    let products = JSON.parse(localStorage.getItem("listOfAllProducts")) || [];

    let product = '';

    console.log(idGetLink);

    products.forEach(function(p){
        if(p.id == idGetLink){
            product = p; 
        }
    });

    $("#txtLink").attr("href", product.link);
    $("#txtTitle").html(product.title);

    let icons =  '';
    let iconDetails = product.imgDetails;

    iconDetails.forEach(function(icon){
        let url = Object.values(icon)[0];
        icons +=  '<li class="mb-2"><a href="#"><img src="' + url + '" alt=""></a></li>';
    });
    
    $("#imgMain").attr("src", product.productImg);
    $(".title").html(product.productName);

    let html =  '<ul>'+ icons + '</ul>';
    
    $(".proList").append(html);

    var priceDis = '';
    if (product.priceDis) {
        priceDis = '<tr>' +
            '    <td class="table-lable">Giá khuyến mãi</td>' +
            '    <td><span id="price-dis">' + product.priceDis + '</span></td>' +
            '</tr>';
    }
    
    var percent = '';
    if (product.percent) {
        percent = 'Tiết kiệm ' + product.percent;
    }
    
    var priceCr = '';
    if (product.priceCr) {
        priceCr = '<tr>' +
            '    <td class="table-lable">Giá bán</td>' +
            '    <td><span id="price-cr">' + product.priceCr + '</span>' + percent + '</td>' +
            '</tr>';
    }
    
    var price = priceCr +
        priceDis +
        '<tr>' +
        '    <td class="table-lable">Kết thúc sau</td>' +
        '    <td>' +
        '        <div class="time d-flex align-items-center">' +
        '            <div id="day">0</div><span>ngày</span>' +
        '            <div id="hour">0</div><span>giờ</span>' +
        '            <div id="minute">0</div><span>phút</span>' +
        '            <div id="second">0</div><span>giây</span>' +
        '        </div>' +
        '    </td>' +
        '</tr>' +
        '<tr>' +
        '    <td class="table-lable">Thương hiệu</td>' +
        '    <td>Gopro</td>' +
        '</tr>'; 
        
    $("#table-product").append(price);

    let endDate = new Date("04/30/2024 00:00:00").getTime(); // Corrected date format
    let check = setInterval(function(){
        let now = new Date().getTime();
        let distance = endDate - now;
        let day = Math.floor(distance / (24*60*60*1000));
        let hour = Math.floor((distance % (24*60*60*1000)) / (60*60*1000));
        let minute = Math.floor((distance % (60*60*1000)) / (60*1000)); 
        let seconds = Math.floor((distance % (60*1000)) / 1000);
        $('#day').text(day);
        $('#hour').text(hour);
        $('#minute').text(minute); 
        $('#second').text(seconds); // Corrected ID to "second"
        if(distance <= 0){
            clearInterval(check);
        }
    }, 1000);

    $(".proList").click(function(event) { 
        event.preventDefault();
        var imgItem = $(event.target);
        var img = imgItem.parent();
        var imgUrl = img.find("img").attr("src");
        $("#imgMain").attr("src", imgUrl);
    });

    // Kiểm tra xem liệu có mảng đã được lưu trữ trong localStorage chưa
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    let indexs = cartItems.length;

    $("#quality").html(indexs);

    $(".btnBuy").click(function() {
        var productName = product.productName;
        var priceDis = product.priceDis;
        var priceCr = product.priceCr;
        var productImg = product.productImg;

        // Tạo một đối tượng đại diện cho sản phẩm
        var productObj = {
            productName: productName,
            priceDis: priceDis,
            priceCr: priceCr,
            productImg: productImg
        };

        // Thêm sản phẩm vào mảng cartItems
        cartItems.push(productObj);

        // Lưu mảng cartItems vào localStorage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        indexs = cartItems.length;

        $("#quality").html(indexs);
    });

    $(".btnCart").click(function() {
        var productName = product.productName;
        var priceDis = product.priceDis;
        var priceCr = product.priceCr;
        var productImg = product.productImg;

        // Tạo một đối tượng đại diện cho sản phẩm
        var productObj = {
            productName: productName,
            priceDis: priceDis,
            priceCr: priceCr,
            productImg: productImg
        };

        // Thêm sản phẩm vào mảng cartItems
        cartItems.push(productObj);

        // Lưu mảng cartItems vào localStorage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));

        indexs = cartItems.length;
    
        $("#quality").html(indexs);
    });

    $("#txtHeader").html(product.productName);

    $(".product").click(function (e) { 
        var productId = $(this).attr('id'); // Lấy id của sản phẩm
        localStorage.setItem("idGetLink",productId);
        console.log(productId);
    });

    $(".mb-1").click(function (e) { 
        e.preventDefault();
        var buttonContent = $(this).find(".button-content");
        var wrapper = buttonContent.next(".wrapper");
        wrapper.toggleClass("active");
    });

    $("#title").text(product.productName);
});