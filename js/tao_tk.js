
const form = document.getElementById("registerForm");

const fullname = document.getElementById("fullname");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");

const fullnameError = document.getElementById("fullnameError");
const phoneError = document.getElementById("phoneError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const termsError = document.getElementById("termsError");
const formMessage = document.getElementById("formMessage");

const roleOptions = document.querySelectorAll(".role-option");
const toggleButtons = document.querySelectorAll(".toggle-password");

function clearErrors() {
    fullnameError.textContent = "";
    phoneError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    termsError.textContent = "";
    formMessage.textContent = "";
    formMessage.className = "";
}

function updateRoleStyle() {
    roleOptions.forEach(function (option) {
        const radio = option.querySelector('input[type="radio"]');

        if (radio.checked) {
            option.classList.add("selected");
        } else {
            option.classList.remove("selected");
        }
    });
}

roleOptions.forEach(function (option) {
    option.addEventListener("change", updateRoleStyle);
});

toggleButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const input = document.getElementById(button.dataset.target);

        if (input.type === "password") {
            input.type = "text";
            button.setAttribute("aria-label", "Ẩn mật khẩu");
        } else {
            input.type = "password";
            button.setAttribute("aria-label", "Hiện mật khẩu");
        }
    });
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    clearErrors();

    let isValid = true;

    const fullnameValue = fullname.value.trim();
    const phoneValue = phone.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;

    if (fullnameValue.length < 2) {
        fullnameError.textContent = "Vui lòng nhập họ và tên hợp lệ.";
        isValid = false;
    }

    const phonePattern = /^(0|\+84)[0-9]{9}$/;
    const normalizedPhone = phoneValue.replace(/[\s.-]/g, "");

    if (!phonePattern.test(normalizedPhone)) {
        phoneError.textContent = "Số điện thoại không hợp lệ.";
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailValue)) {
        emailError.textContent = "Vui lòng nhập email hợp lệ.";
        isValid = false;
    }

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

    if (!passwordPattern.test(passwordValue)) {
        passwordError.textContent =
            "Mật khẩu phải có ít nhất 8 ký tự, gồm chữ và số.";
        isValid = false;
    } else if (passwordValue !== confirmPasswordValue) {
        passwordError.textContent = "Mật khẩu xác nhận không khớp.";
        isValid = false;
    }

    if (!terms.checked) {
        termsError.textContent =
            "Bạn cần đồng ý với điều khoản để tiếp tục.";
        isValid = false;
    }

    if (!isValid) {
        formMessage.textContent = "Vui lòng kiểm tra lại thông tin.";
        formMessage.className = "failure";
        return;
    }

    const selectedRole = document.querySelector(
        'input[name="role"]:checked'
    ).value;

    const selectedNeeds = Array.from(
        document.querySelectorAll('input[name="needs"]:checked')
    ).map(function (item) {
        return item.value;
    });

    formMessage.textContent =
        "Kiểm tra thông tin thành công! Đây là bản minh họa, tài khoản chưa được lưu.";
    formMessage.className = "success";

    console.log("Họ và tên:", fullnameValue);
    console.log("Số điện thoại:", normalizedPhone);
    console.log("Email:", emailValue);
    console.log("Vai trò:", selectedRole);
    console.log("Nhu cầu sống:", selectedNeeds);
});

updateRoleStyle();
