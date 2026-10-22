// ===============================
// HOMEFIT AI - JAVASCRIPT
// ===============================


// Nút mở AI
const openAI = document.getElementById("openAI");

openAI.addEventListener("click", function () {
    alert("AI hỗ trợ đang được mở...");
});


// AI gợi ý mô tả
const aiDescription = document.getElementById("aiDescription");

aiDescription.addEventListener("click", function () {

    const textarea = document.querySelector("textarea");

    textarea.value =
        "Studio 38 m² tại An Phú, không gian gọn gàng và đầy đủ nội thất cơ bản, phù hợp cho 1–2 người. " +
        "Căn hộ có điều hòa, thang máy, vị trí thuận tiện tại Thủ Đức. " +
        "Giá thuê 9 triệu đồng/tháng, phí quản lý 400.000 đồng/tháng. " +
        "Quy định về thú cưng cần được xác nhận với chủ nhà.";

});


// Nút tải ảnh
const uploadImage = document.getElementById("uploadImage");

uploadImage.addEventListener("click", function () {

    const input = document.createElement("input");

    input.type = "file";
    input.accept = "image/png, image/jpeg";

    input.click();

    input.addEventListener("change", function () {

        if (input.files.length > 0) {

            alert(
                "Đã chọn ảnh: " +
                input.files[0].name
            );

        }

    });

});


// Nút tải giấy ủy quyền
const uploadDocument = document.getElementById("uploadDocument");

uploadDocument.addEventListener("click", function () {

    const input = document.createElement("input");

    input.type = "file";

    input.accept = ".pdf,.jpg,.jpeg,.png";

    input.click();

    input.addEventListener("change", function () {

        if (input.files.length > 0) {

            alert(
                "Đã chọn tài liệu: " +
                input.files[0].name
            );

        }

    });

});


// Lưu nháp
const saveDraft = document.getElementById("saveDraft");

saveDraft.addEventListener("click", function () {

    alert("Đã lưu tin đăng dưới dạng bản nháp.");

});


// Gửi kiểm duyệt
const submitReview = document.getElementById("submitReview");

submitReview.addEventListener("click", function () {

    alert(
        "Tin chưa thể gửi kiểm duyệt vì còn thiếu ảnh gốc và giấy ủy quyền."
    );

});


// Hủy thay đổi
const cancelChanges = document.getElementById("cancelChanges");

cancelChanges.addEventListener("click", function () {

    const confirmCancel = confirm(
        "Bạn có chắc muốn hủy các thay đổi?"
    );

    if (confirmCancel) {

        location.reload();

    }

});


// Mở AI môi giới
const openBrokerAI = document.getElementById("openBrokerAI");

openBrokerAI.addEventListener("click", function () {

    alert("AI môi giới đang được mở...");

});