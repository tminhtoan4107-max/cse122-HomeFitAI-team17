
const categoryItems = document.querySelectorAll(".category-item");
const taxonomyTitle = document.getElementById("taxonomyTitle");
const taxonomyDescription = document.getElementById("taxonomyDescription");
const taxonomyTable = document.getElementById("taxonomyTable");

const categoryData = {
    "Loại nhà ở": {
        count: 8,
        description: "8 mục · Các loại hình nhà ở",
        rows: [
            ["Căn hộ", "Loại nhà ở", "apartment", "Đang dùng"],
            ["Nhà phố", "Loại nhà ở", "townhouse", "Đang dùng"],
            ["Studio", "Loại nhà ở", "studio", "Đang dùng"]
        ]
    },
    "Nhu cầu sống": {
        count: 14,
        description: "14 mục · Nhãn được dùng trong bộ lọc và giải thích độ phù hợp AI",
        rows: [
            ["Gần nơi làm việc", "Di chuyển", "work_nearby", "Đang dùng"],
            ["Có công viên", "Không gian xanh", "park_nearby", "Đang dùng"],
            ["Cho nuôi thú cưng", "Sinh hoạt", "pet_friendly", "Đang dùng"],
            ["Làm việc tại nhà", "Sinh hoạt", "home_workspace", "Bản nháp"]
        ]
    },
    "Tiện ích": {
        count: 10,
        description: "10 mục · Các tiện ích của nơi ở",
        rows: [
            ["Có ban công", "Tiện ích", "balcony", "Đang dùng"],
            ["Có thang máy", "Tiện ích", "elevator", "Đang dùng"],
            ["Có chỗ để xe", "Tiện ích", "parking", "Đang dùng"]
        ]
    },
    "Khu vực": {
        count: 4,
        description: "4 mục · Các khu vực nhà ở",
        rows: [
            ["Thủ Đức", "Khu vực", "thu_duc", "Đang dùng"],
            ["Bình Thạnh", "Khu vực", "binh_thanh", "Đang dùng"],
            ["Quận 1", "Khu vực", "district_1", "Đang dùng"]
        ]
    }
};

function renderTable(category) {
    const data = categoryData[category];

    taxonomyTitle.textContent = "Taxonomy · " + category;
    taxonomyDescription.textContent = data.description;
    taxonomyTable.innerHTML = "";

    data.rows.forEach(function(row) {
        const tr = document.createElement("tr");

        row.forEach(function(value, index) {
            const td = document.createElement("td");

            if (index === 3) {
                const status = document.createElement("span");
                status.className = value === "Bản nháp"
                    ? "status draft"
                    : "status";
                status.textContent = value;
                td.appendChild(status);
            } else {
                td.textContent = value;
            }

            tr.appendChild(td);
        });

        const actionCell = document.createElement("td");
        const actionButton = document.createElement("button");

        actionButton.className = "text-btn";
        actionButton.textContent = row[3] === "Bản nháp"
            ? "Xem & duyệt"
            : "Chỉnh sửa";

        actionButton.addEventListener("click", function() {
            if (row[3] === "Bản nháp") {
                const approved = confirm(
                    "Bạn có muốn duyệt nhãn \"" + row[0] + "\" không?"
                );

                if (approved) {
                    row[3] = "Đang dùng";
                    renderTable(category);
                    alert("Đã cập nhật trạng thái minh họa.");
                }
            } else {
                const newName = prompt("Tên nhãn:", row[0]);

                if (newName && newName.trim()) {
                    row[0] = newName.trim();
                    renderTable(category);
                }
            }
        });

        actionCell.appendChild(actionButton);
        tr.appendChild(actionCell);
        taxonomyTable.appendChild(tr);
    });
}

categoryItems.forEach(function(item) {
    item.addEventListener("click", function() {
        categoryItems.forEach(function(category) {
            category.classList.remove("selected");
        });

        item.classList.add("selected");
        renderTable(item.dataset.category);
    });
});

document.getElementById("addCategoryBtn").addEventListener("click", function() {
    const name = prompt("Nhập tên nhóm danh mục mới:");

    if (name && name.trim()) {
        const categoryName = name.trim();

        if (categoryData[categoryName]) {
            alert("Nhóm danh mục này đã tồn tại.");
            return;
        }

        categoryData[categoryName] = {
            count: 0,
            description: "0 mục · Nhóm danh mục mới",
            rows: []
        };

        const button = document.createElement("button");
        button.className = "category-item";
        button.dataset.category = categoryName;

        const title = document.createElement("strong");
        title.textContent = categoryName;

        const description = document.createElement("span");
        description.textContent = "0 mục · Nhóm mới";

        button.appendChild(title);
        button.appendChild(description);

        button.addEventListener("click", function() {
            document.querySelectorAll(".category-item").forEach(function(category) {
                category.classList.remove("selected");
            });

            button.classList.add("selected");
            renderTable(categoryName);
        });

        document.querySelector(".category-panel .btn-add").before(button);

        button.click();
    }
});

document.getElementById("suggestionBtn").addEventListener("click", function() {
    alert(
        "Gợi ý AI: \"Làm việc tại nhà\".\n" +
        "Quản trị viên cần xem xét và xác nhận trước khi áp dụng."
    );
});

document.getElementById("adminLogBtn").addEventListener("click", function() {
    alert("Chức năng Nhật ký quản trị đang là giao diện minh họa.");
});

document.getElementById("logoutBtn").addEventListener("click", function() {
    alert("Bạn đã nhấn Đăng xuất.");
});

document.getElementById("sidebarLogout").addEventListener("click", function(event) {
    event.preventDefault();
    alert("Bạn đã nhấn Đăng xuất.");
});
