const backButton = document.getElementById("backButton");

backButton.addEventListener("click", function () {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "../Login/trang_chu.html";
    }
});
