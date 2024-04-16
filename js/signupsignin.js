$(document).ready(function () {
    var listUser = JSON.parse(localStorage.getItem("listUser")) || [];
    $("#register").click(function (e) { 
        e.preventDefault();
        $("#container").addClass("active");
    });

    $("#login").click(function (e) { 
        e.preventDefault();
        $("#container").removeClass("active");
    });

    function checkName(value, id){
        let check = /^([A-Z][a-z]*)$/;
        if(!check.test(value)){
            $(id).html("Tên chữ đầu tiên phải viết hoa");
            $(id).addClass("red");
            return false;
        }else{
            $(id).html("");
            $(id).removeClass("red");
            return true;
        }
    }

    $("#txtName").blur(function (e) { 
        e.preventDefault();
        let name = $("#txtName").val();
        checkName(name,"#erName");
    });

    function checkEmail(value, id){
        let check = /^\w+@gmail\.com$/;
        if(!check.test(value)){
            $(id).html("Email phải đúng theo form");
            $(id).addClass("red");
            return false;
        }else{
            $(id).html("");
            $(id).removeClass("red");
            return true;
        }
    }

    $("#txtEmail").blur(function (e) { 
        e.preventDefault();
        let email = $("#txtEmail").val();
        checkEmail(email,"#erEmail");
    });

    function checkPass(value, id){
        let check = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*()]).{8,}$/;
        if(!check.test(value)){
            $(id).html("Mật khẩu từ 8 ký tự trở lên, ít nhất 1 ký tự só, 1 ký tự viết hoa, 1 ký tự đặt biệt");
            $(id).addClass("red");
            return false;
        }else{
            $(id).html("");
            $(id).removeClass("red");
            return true;
        }
    }

    $("#txtPass").blur(function (e) { 
        e.preventDefault();
        let pass = $("#txtPass").val();
        checkPass(pass,"#erPass");
    });

    $("#txtPassLoginReg").blur(function (e) { 
        e.preventDefault();
        let pass = $("#txtPassLoginReg").val();
        checkPass(pass,"#erPassLoginReg");
    });

    function checkStorageEmail(email){
        return listUser.some(function(user){
            return user.email === email;
        });
    }
    
    $("#btnDangKy").click(function (e) { 
        
        let name = $("#txtName").val();
        let email = $("#txtEmail").val();
        let pass = $("#txtPass").val();
        let passReg = $("#txtPassLoginReg").val();
        console.log(name,email,pass);
        // Tạo một đối tượng đại user
        var user = {
            name: name,
            email: email,
            password: pass
        };

        if(!checkName(name,"#erName")){
            $("#txtName").focus();
            return false;
        }else if(!checkEmail(email,"#erEmail")){
            $("#txtEmail").focus();
            return false;
        }else if(!checkPass(pass,"#erPass")){
            $("#txtPass").focus();
            return false;
        }else if(!checkPass(passReg,"#erPassLoginReg")){
            $("#txtPassLoginReg").focus();
            return false;
        }else if(checkEmail(email,"#erEmail")){
            if(checkStorageEmail(email)){
                $("#erEmail").html("Email đã tồn tại");
                $("#erEmail").addClass("red");
                return false;
            }else{
                $("#erEmail").html("");
                $("#erEmail").removeClass("red");
            }
        }
        
        // Thêm sản phẩm vào mảng listUser
        listUser.push(user);

        // Lưu mảng listUser vào localStorage
        localStorage.setItem("listUser", JSON.stringify(listUser));

        // Xóa trắng
        $("#txtName").val("");
        $("#txtEmail").val("");
        $("#txtPass").val("");

        $("#container").removeClass("active");
        
        alert("Bạn đăng kí tài khoản thành công");
    });

    var name = '';

    function checkInStorage(userLogin, id, passLogin, id_2) {
        let isValid = false; // Biến cờ để xác định kết quả kiểm tra
    
        listUser.forEach(function(user) {
            console.log(user.email);
            console.log(user.password); // Truy cập thuộc tính mật khẩu
            if (user.email === userLogin && user.password === passLogin) {
                isValid = true;
                name = user.name;
            }
        });
        
        if (!isValid) {
            $(id).html("Vui lòng kiểm tra lại email");
            $(id).addClass("red");
        } else {
            $(id).html("");
            $(id).removeClass("red");
        }

        if (!isValid) {
            $(id_2).html("Vui lòng kiểm tra lại pass");
            $(id_2).addClass("red");
        } else {
            $(id_2).html("");
            $(id_2).removeClass("red");
        }

        return isValid;
    }  
    
    $("#btnDangNhap").click(function(e) {
        let userLogin = $("#txtEmailLogin").val();
        let passLogin = $("#txtPassLogin").val();
        let isValid = checkInStorage(userLogin, "#erEmailLogin", passLogin, "#erPassLogin");
        if (isValid) {
            // Thay đổi liên kết của nút "Đăng nhập"
            window.location.href = "../html/trangchu.html";
            localStorage.setItem("name", JSON.stringify(name));
        }
    });

});