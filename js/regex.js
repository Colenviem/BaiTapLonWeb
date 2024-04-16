$(document).ready(function() {
    $("#kh_ten").focus();

    function checkFullName(){
        let firstname = $("#kh_ten").val();
        let regex= /^([A-Z][a-z]\s)+([A-Z][a-z]+)$/
        if(firstname===""){
            $("#errfullname").html("Không được để trống");
            $("#errfullname").addClass("mauDo");
            return false;
        }else if(regex.test(firstname)){
            $("#errfullname").html("");
            $("#errfullname").removeClass("mauDo");
            return true;
        }else{
            $("#errfullname").html("Họ và tên phải viết hoa");            
            $("#errfullname").addClass("mauDo");
            return false;
        }
    }

    function checkSex() {
        let sex = $("#kh_gioitinh").val();
        let regex = /^(Nam|Nữ)$/;
        if (sex === "") {
            $("#errSex").html("Giới tính không được để trống");
            $("#errSex").addClass("mauDo");
            return false;
        } else if (regex.test(sex)) {
            $("#errSex").html("");
            $("#errSex").removeClass("mauDo");
            return true;
        } else {
            $("#errSex").html("Giới tính phải là Nam hoặc Nữ");
            $("#errSex").addClass("mauDo");
            return false;
        }
    }

    function checkAddress() {
        let address = $("#kh_diachi").val();
        let regex = /^(\w+\s?)+$/;
        if (regex.test(address)) {
            $("#errAddress").html("");
            $("#errAddress").removeClass("mauDo");
            return true;
        } else {
            $("#errAddress").html("Địa chỉ điền sai thông tin");
            $("#errAddress").addClass("mauDo");
            return false;
        }
    }
    
    function checkPhone(){
        let phone = $("#kh_dienthoai").val();
        let regex = /^0\d{9}$/;
        if (phone === "") {
            $("#errPhone").html("Số điện thoại không được để trống");
            $("#errPhone").addClass("mauDo");
            return false;
        } else if (regex.test(phone)) {
            $("#errPhone").html("");
            $("#errPhone").removeClass("mauDo");
            return true;
        } else {
            $("#errPhone").html("Số điện thoại phải 10 số");
            $("#errPhone").addClass("mauDo");
            return false;
        }
    }
    

    function checkEmail (){
        let email = $("#kh_email").val();
        let regex = /^\w+@gmail\.com$/;
        if (email === "") {
            $("#errEmail").html("Email không được để trống");
            $("#errEmail").addClass("mauDo");
            return false;
        } else if (regex.test(email)) {
            $("#errEmail").html("");
            $("#errEmail").removeClass("mauDo");
            return true;
        } else {
            $("#errEmail").html("Email phải có đuôi là @gmail.com");
            $("#errEmail").addClass("mauDo");
            return false;
        }
    }

    function checkCCCD(){
        let CCCD = $("#kh_cmnd").val();
        let regex = /^CD\d{10}$/;
        if (CCCD === "") {
            $("#errCCCD").html("Căn cước công dân không được để trống");
            $("#errCCCD").addClass("mauDo");
            return false;
        } else if (regex.test(CCCD)) {
            $("#errCCCD").html("");
            $("#errCCCD").removeClass("mauDo");
            return true;
        } else {
            $("#errCCCD").html("Vui lòng đi đúng căn cước CDXXXXXXXXXX");
            $("#errCCCD").addClass("mauDo");
            return false;
        }
    }

    $("#kh_ten").blur(function (e) { 
        e.preventDefault();
        checkFullName();    
    });

    $("#kh_gioitinh").blur(function (e) { 
        e.preventDefault();
        checkSex();
    });

    $("#kh_diachi").blur(function (e) { 
        e.preventDefault();
        checkAddress();
    });

    $("#kh_dienthoai").blur(function (e) { 
        e.preventDefault();
        checkPhone();
    });

    $("#kh_email").blur(function (e) { 
        e.preventDefault();
        checkEmail();
    });

    $("#kh_cmnd").blur(function (e) { 
        e.preventDefault();
        checkCCCD();
    });

    $("#btn-order").click(function (e) { 
        e.preventDefault();
        if(!checkFullName()){
            $("#kh_ten").focus();
            return false;
        }

        if(!checkSex()){
            $("#kh_gioitinh").focus();
            return false;
        }

        if(!checkAddress()){
            $("#kh_diachi").focus();
            return false;
        }

        if(!checkPhone()){
            $("#kh_dienthoai").focus();
            return false;
        }

        if(!checkEmail()){
            $("#kh_email").focus();
            return false;
        }

        if(!checkCCCD()){
            $("#kh_ten").focus();
            return false;
        }

        var radioInputs = $("input[name='httt_ma']:checked").val();
        console.log(radioInputs);
        if(radioInputs.length <= 0){
            return false;
        }else{
            $("#btn-order").attr("type", "button");
            var selectedLabel = $('input[name="httt_ma"]:checked').next('label').text();
            var userInfo = {
                fullname: $('#kh_ten').val(),
                gioitinh: $('#kh_gioitinh').val(),
                diachi: $('#kh_diachi').val(),
                dienthoai: $('#kh_dienthoai').val(),
                email: $('#kh_email').val(),
                cmnd: $('#kh_cmnd').val(),
                selectedLabel : selectedLabel 
            };

            // Chuyển đối tượng thành chuỗi JSON và lưu vào localStorage
            window.location.href = "../html/thanhcong.html";
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            return true;
        }
    });
})