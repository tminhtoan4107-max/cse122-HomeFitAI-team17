
const searchInput = document.getElementById("searchInput");
const roleFilter = document.getElementById("roleFilter");
const statusFilter = document.getElementById("statusFilter");
const accountTable = document.getElementById("accountTable");
const resultCount = document.getElementById("resultCount");
const emptyMessage = document.getElementById("emptyMessage");

function filterAccounts() {
    const keyword = searchInput.value.trim().toLowerCase();
    const selectedRole = roleFilter.value;
    const selectedStatus = statusFilter.value;

    const rows = accountTable.querySelectorAll("tr");
    let visibleCount = 0;

    rows.forEach(function(row) {
        const accountInfo = row.cells[0].textContent.toLowerCase();
        const role = row.dataset.role;
        const status = row.dataset.status;

        const matchKeyword = accountInfo.includes(keyword);
        const matchRole = selectedRole === "" || role === selectedRole;
        const matchStatus = selectedStatus === "" || status === selectedStatus;

        if (matchKeyword && matchRole && matchStatus) {
            row.hidden = false;
            visibleCount++;
        } else {
            row.hidden = true;
        }
    });

    resultCount.textContent = "Hiển thị " + visibleCount + " / 1.048 tài khoản";
    emptyMessage.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", filterAccounts);
roleFilter.addEventListener("change", filterAccounts);
statusFilter.addEventListener("change", filterAccounts);

document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();
    filterAccounts();
});

document.getElementById("inviteBtn").addEventListener("click", function() {
    const name = prompt("Nhập họ tên tài khoản:");

    if (!name || !name.trim()) {
        return;
    }

    const email = prompt("Nhập email tài khoản:");

    if (!email || !email.trim()) {
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        alert("Email không hợp lệ!");
        return;
    }

    const role = prompt(
        "Nhập vai trò:\n1. Người tìm nhà\n2. Môi giới\n3. Kiểm duyệt viên\n4. Quản trị viên",
        "Người tìm nhà"
    );

    const validRoles = [
        "Người tìm nhà",
        "Môi giới",
        "Kiểm duyệt viên",
        "Quản trị viên"
    ];

    if (!role || !validRoles.includes(role.trim())) {
        alert("Vai trò không hợp lệ!");
        return;
    }

    const row = document.createElement("tr");
    row.dataset.role = role.trim();
    row.dataset.status = "Chờ xác minh";

    const accountCell = document.createElement("td");
    const accountName = document.createElement("strong");
    const accountEmail = document.createElement("span");

    accountName.textContent = name.trim();
    accountEmail.className = "email";
    accountEmail.textContent = email.trim();

    accountCell.append(accountName, accountEmail);

    const roleCell = document.createElement("td");
    roleCell.textContent = role.trim();

    const statusCell = document.createElement("td");
    const statusBadge = document.createElement("span");
    statusBadge.className = "status pending";
    statusBadge.textContent = "Chờ xác minh";
    statusCell.appendChild(statusBadge);

    const dateCell = document.createElement("td");
    dateCell.textContent = new Date().toLocaleDateString("vi-VN");

    const actionCell = document.createElement("td");
    const verifyButton = document.createElement("button");
    verifyButton.type = "button";
    verifyButton.className = "table-action verify-btn";
    verifyButton.textContent = "Xác minh & cấp quyền";
    actionCell.appendChild(verifyButton);

    row.append(
        accountCell,
        roleCell,
        statusCell,
        dateCell,
        actionCell
    );

    accountTable.appendChild(row);

    alert("Đã thêm tài khoản vào danh sách chờ xác minh.");
    filterAccounts();
});

accountTable.addEventListener("click", function(event) {
    const button = event.target.closest("button");

    if (!button) {
        return;
    }

    const row = button.closest("tr");
    const name = row.cells[0].querySelector("strong").textContent;

    if (button.classList.contains("profile-btn")) {
        const email = row.cells[0].querySelector(".email").textContent;

        alert(
            "Thông tin tài khoản\n" +
            "Họ tên: " + name + "\n" +
            "Email: " + email + "\n" +
            "Vai trò: " + row.dataset.role + "\n" +
            "Trạng thái: " + row.dataset.status
        );
    }

    if (button.classList.contains("permission-btn")) {
        const newRole = prompt(
            "Nhập vai trò mới cho " + name + ":",
            row.dataset.role
        );

        const validRoles = [
            "Người tìm nhà",
            "Môi giới",
            "Kiểm duyệt viên",
            "Quản trị viên"
        ];

        if (newRole && validRoles.includes(newRole.trim())) {
            row.dataset.role = newRole.trim();
            row.cells[1].textContent = newRole.trim();
            filterAccounts();
            alert("Đã cập nhật vai trò trong giao diện.");
        } else if (newRole !== null) {
            alert("Vai trò không hợp lệ!");
        }
    }

    if (button.classList.contains("verify-btn")) {
        const confirmed = confirm(
            "Bạn có muốn xác minh tài khoản " + name + " không?"
        );

        if (confirmed) {
            row.dataset.status = "Hoạt động";

            const statusBadge = row.querySelector(".status");
            statusBadge.textContent = "Hoạt động";
            statusBadge.className = "status";

            button.textContent = "Xem hồ sơ";

            button.classList.remove("verify-btn");
            button.classList.add("profile-btn");

            filterAccounts();
            alert("Đã cập nhật trạng thái tài khoản trên giao diện.");
        }
    }
});

document.getElementById("auditBtn").addEventListener("click", function() {
    alert(
        "NHẬT KÝ QUẢN TRỊ\n\n" +
        "Đây là giao diện minh họa. " +
        "Nhật ký thực tế cần được lưu và truy xuất từ hệ thống."
    );
});

document.querySelectorAll(".logout").forEach(function(button) {
    button.addEventListener("click", function() {
        const confirmed = confirm("Bạn có muốn đăng xuất không?");

        if (confirmed) {
            alert("Chức năng đăng xuất cần được kết nối với hệ thống đăng nhập.");
        }
    });
});

document.getElementById("prevPage").addEventListener("click", function() {
    alert("Đây là trang đầu tiên trong dữ liệu minh họa.");
});

document.getElementById("nextPage").addEventListener("click", function() {
    alert("Chức năng chuyển trang cần được bổ sung khi có dữ liệu đầy đủ.");
});
