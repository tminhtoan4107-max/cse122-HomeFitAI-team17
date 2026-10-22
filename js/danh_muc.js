document.addEventListener("DOMContentLoaded", function () {

    // Thêm nhóm danh mục
    const addButton = document.querySelector(".add-category");

    addButton.addEventListener("click", function () {
        const name = prompt("Nhập tên nhóm danh mục:");

        if (name && name.trim() !== "") {
            alert("Đã thêm nhóm danh mục: " + name);

            const item = document.createElement("div");
            item.className = "category-item";

            const title = document.createElement("strong");
            title.textContent = name.trim();

            const description = document.createElement("p");
            description.textContent = "0 mục";

            item.appendChild(title);
            item.appendChild(description);

            addButton.before(item);
        }
    });

    // Nhật ký quản trị
    document.querySelector(".audit").addEventListener("click", function () {
        alert("Chức năng nhật ký quản trị.");
    });

    // Xem gợi ý AI
    document.querySelector(".suggestion").addEventListener("click", function () {
        alert('AI đề xuất nhãn "Làm việc tại nhà".');
    });

    // Chỉnh sửa nhãn
    document.querySelectorAll(".edit").forEach(function (button) {
        button.addEventListener("click", function () {
            const row = button.closest("tr");
            const oldName = row.cells[0].textContent;

            const newName = prompt("Nhập tên nhãn mới:", oldName);

            if (newName && newName.trim() !== "") {
                row.cells[0].textContent = newName.trim();
                alert("Đã cập nhật tên nhãn.");
            }
        });
    });

    // Duyệt nhãn AI
    document.querySelectorAll(".review").forEach(function (button) {
        button.addEventListener("click", function () {
            const row = button.closest("tr");

            const confirmReview = confirm(
                'Bạn có muốn duyệt nhãn "' +
                row.cells[0].textContent + '" không?'
            );

            if (confirmReview) {
                row.cells[3].textContent = "Đang dùng";
                row.cells[3].className = "";
                button.textContent = "Chỉnh sửa";
                button.classList.remove("review");
                button.classList.add("edit");

                button.addEventListener("click", function () {
                    const oldName = row.cells[0].textContent;
                    const newName = prompt("Nhập tên nhãn mới:", oldName);

                    if (newName && newName.trim()) {
                        row.cells[0].textContent = newName.trim();
                    }
                });

                alert("Đã duyệt nhãn thành công.");
            }
        });
    });

    // Đăng xuất
    document.querySelectorAll(".logout").forEach(function (button) {
        button.addEventListener("click", function () {
            const confirmLogout = confirm(
                "Bạn có chắc chắn muốn đăng xuất?"
            );

            if (confirmLogout) {
                alert("Chức năng đăng xuất cần được kết nối với hệ thống.");
            }
        });
    });

});