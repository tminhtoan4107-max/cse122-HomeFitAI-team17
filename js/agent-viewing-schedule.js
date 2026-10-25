
/* =========================
   1. HỘP THÔNG BÁO
========================= */

const dialog = document.querySelector("#messageDialog");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogMessage = document.querySelector("#dialogMessage");

function showMessage(title, message) {
    dialogTitle.textContent = title;
    dialogMessage.textContent = message;

    if (typeof dialog.showModal === "function") {
        dialog.showModal();
    } else {
        alert(title + "\n\n" + message);
    }
}

/* =========================
   2. NÚT TẠO TIN ĐĂNG
========================= */

document.querySelector("#createListingBtn")
    .addEventListener("click", function () {
        showMessage(
            "Tạo tin đăng",
            "Đây là giao diện minh họa. Bạn có thể bổ sung form tạo tin ở bước tiếp theo."
        );
    });

/* =========================
   3. NÚT XEM CHI TIẾT
========================= */

document.querySelectorAll(".detail-btn").forEach(function (button) {
    button.addEventListener("click", function () {
        const listingName = button.dataset.listing;

        showMessage(
            "Chi tiết tin đăng",
            "Bạn đã chọn tin: " + listingName
        );
    });
});

/* =========================
   4. NÚT CHỈNH SỬA TIN
========================= */

document.querySelectorAll(".edit-btn").forEach(function (button) {
    button.addEventListener("click", function () {
        const listingName = button.dataset.listing;

        showMessage(
            "Chỉnh sửa tin đăng",
            "Mở form chỉnh sửa cho tin: " + listingName
        );
    });
});

/* =========================
   5. SỬA BẢN NHÁP AI
========================= */

document.querySelector("#editDraftBtn")
    .addEventListener("click", function () {
        const draftElement = document.querySelector("#draftText");

        const currentDraft = draftElement.textContent
            .replace(/^Bản nháp:\s*/, "")
            .trim();

        const updatedDraft = prompt(
            "Chỉnh sửa bản nháp tin nhắn:",
            currentDraft
        );

        if (updatedDraft !== null && updatedDraft.trim() !== "") {
            draftElement.textContent =
                "Bản nháp: " + updatedDraft.trim();
        }
    });

/* =========================
   6. NÚT DUYỆT BẢN NHÁP
========================= */

document.querySelector("#approveDraftBtn")
    .addEventListener("click", function () {
        showMessage(
            "Xác nhận bản nháp",
            "Bản nháp đã được xác nhận trong giao diện minh họa. Chưa có tin nhắn nào được gửi cho khách."
        );
    });

/* =========================
   7. ĐÓNG HỘP THÔNG BÁO
========================= */

document.querySelector("#closeDialogBtn")
    .addEventListener("click", function () {
        dialog.close();
    });

/* =========================
   8. KIỂM TRA CÁC MENU
========================= */

document.querySelectorAll(".top-nav a, .side-nav a")
    .forEach(function (link) {
        link.addEventListener("click", function (event) {
            const target = link.getAttribute("href");

            if (
                target &&
                target.startsWith("#") &&
                !document.querySelector(target)
            ) {
                event.preventDefault();

                showMessage(
                    "Chức năng đang xây dựng",
                    'Mục "' + link.textContent.trim() +
                    '" chưa được triển khai.'
                );
            }
        });
    });
