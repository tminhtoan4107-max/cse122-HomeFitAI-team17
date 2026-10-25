
function togglePassword() {
    const password = document.getElementById("password");

    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const remember = document.getElementById("remember");
    const loginMessage = document.getElementById("loginMessage");

    loginMessage.textContent = "";
    loginMessage.className = "";

    let danhSachTaiKhoan = [];

    try {
        danhSachTaiKhoan = JSON.parse(
            localStorage.getItem("danhSachTaiKhoan")
        ) || [];
    } catch (error) {
        loginMessage.textContent = "Không thể đọc dữ liệu tài khoản.";
        loginMessage.className = "failure";
        return;
    }

    if (!Array.isArray(danhSachTaiKhoan) || danhSachTaiKhoan.length === 0) {
        loginMessage.textContent =
            "Chưa có tài khoản. Vui lòng tạo tài khoản trước.";
        loginMessage.className = "failure";
        return;
    }

    const taiKhoan = danhSachTaiKhoan.find(function (item) {
        return item.email.toLowerCase() === email.toLowerCase()
            && item.password === password;
    });

    if (!taiKhoan) {
        loginMessage.textContent = "Email hoặc mật khẩu không chính xác.";
        loginMessage.className = "failure";
        return;
    }

    const thongTinNguoiDung = {
        fullname: taiKhoan.fullname,
        phone: taiKhoan.phone,
        email: taiKhoan.email,
        vaiTro: taiKhoan.vaiTro,
        nhuCau: taiKhoan.nhuCau
    };

    try {
        sessionStorage.removeItem("nguoiDungDangNhap");
        localStorage.removeItem("nguoiDungDangNhap");

        if (remember.checked) {
            localStorage.setItem(
                "nguoiDungDangNhap",
                JSON.stringify(thongTinNguoiDung)
            );
        } else {
            sessionStorage.setItem(
                "nguoiDungDangNhap",
                JSON.stringify(thongTinNguoiDung)
            );
        }
    } catch (error) {
        loginMessage.textContent =
            "Không thể lưu phiên đăng nhập. Vui lòng thử lại.";
        loginMessage.className = "failure";
        return;
    }

    loginMessage.textContent = "Đăng nhập thành công!";
    loginMessage.className = "success";

    if (taiKhoan.vaiTro === "Môi giới") {
        window.location.href = "../moi_gioi/agent-viewing-schedule";
    } else if (taiKhoan.vaiTro === "Người tìm nhà") {
        window.location.href = "../nguoi_dung/seeker-property-search.html";
    } else {
        loginMessage.textContent =
            "Vai trò tài khoản không hợp lệ. Vui lòng liên hệ quản trị viên.";
        loginMessage.className = "failure";
    }
});
