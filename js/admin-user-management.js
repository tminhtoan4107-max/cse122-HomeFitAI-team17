
const searchInput = document.getElementById("search-account");
const roleFilter = document.getElementById("role-filter");
const statusFilter = document.getElementById("status-filter");
const accountList = document.getElementById("account-list");

const activeCount = document.getElementById("active-count");
const totalCount = document.getElementById("total-count");
const waitingCount = document.getElementById("waiting-count");
const roleCount = document.getElementById("role-count");
const resultCount = document.getElementById("result-count");

const inviteDialog = document.getElementById("invite-dialog");
const inviteForm = document.getElementById("invite-form");

let accounts = JSON.parse(
    localStorage.getItem("homefit_accounts") || "null"
);

if (!Array.isArray(accounts)) {
    accounts = [
        {
            id: 1,
            name: "Nguyễn Minh An",
            email: "minhan@example.com",
            role: "Người tìm nhà",
            status: "Hoạt động",
            updated: "01/10/2026"
        },
        {
            id: 2,
            name: "Trần Lan Anh",
            email: "lananh@example.com",
            role: "Môi giới",
            status: "Hoạt động",
            updated: "01/10/2026"
        },
        {
            id: 3,
            name: "Nguyễn Hà",
            email: "nguyenha@example.com",
            role: "Kiểm duyệt viên",
            status: "Hoạt động",
            updated: "30/09/2026"
        },
        {
            id: 4,
            name: "Phúc Khang",
            email: "phuckhang@example.com",
            role: "Môi giới",
            status: "Chờ xác minh",
            updated: "01/10/2026"
        }
    ];

    saveAccounts();
}

function saveAccounts() {
    localStorage.setItem("homefit_accounts", JSON.stringify(accounts));
}

function getStatusClass(status) {
    if (status === "Hoạt động") {
        return "status-active";
    }

    if (status === "Chờ xác minh") {
        return "status-pending";
    }

    return "status-locked";
}

function renderAccounts() {
    const keyword = searchInput.value.trim().toLowerCase();
    const selectedRole = roleFilter.value;
    const selectedStatus = statusFilter.value;

    const filteredAccounts = accounts.filter(account => {
        const matchesKeyword =
            account.name.toLowerCase().includes(keyword) ||
            account.email.toLowerCase().includes(keyword);

        const matchesRole =
            selectedRole === "" || account.role === selectedRole;

        const matchesStatus =
            selectedStatus === "" || account.status === selectedStatus;

        return matchesKeyword && matchesRole && matchesStatus;
    });

    accountList.innerHTML = "";

    if (filteredAccounts.length === 0) {
        accountList.innerHTML = `
            <tr>
                <td colspan="5" class="empty-row">
                    Không tìm thấy tài khoản phù hợp.
                </td>
            </tr>
        `;
    } else {
        filteredAccounts.forEach(account => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>
                    <div class="account-name"></div>
                    <div class="account-email"></div>
                </td>
                <td class="account-role"></td>
                <td>
                    <span class="status"></span>
                </td>
                <td class="account-updated"></td>
                <td>
                    <button class="action-link profile-btn">Xem hồ sơ</button>
                    <button class="action-link permission-btn">Quản lý quyền</button>
                    <button class="action-link status-btn"></button>
                </td>
            `;

            row.querySelector(".account-name").textContent = account.name;
            row.querySelector(".account-email").textContent = account.email;
            row.querySelector(".account-role").textContent = account.role;
            row.querySelector(".account-updated").textContent = account.updated;

            const statusElement = row.querySelector(".status");
            statusElement.textContent = account.status;
            statusElement.classList.add(getStatusClass(account.status));

            const statusButton = row.querySelector(".status-btn");

            if (account.status === "Hoạt động") {
                statusButton.textContent = "Tạm khóa";
            } else if (account.status === "Tạm khóa") {
                statusButton.textContent = "Mở khóa";
            } else {
                statusButton.textContent = "Xác minh";
            }

            row.querySelector(".profile-btn").addEventListener("click", () => {
                alert(
                    "Thông tin tài khoản\n\n" +
                    "Họ tên: " + account.name + "\n" +
                    "Email: " + account.email + "\n" +
                    "Vai trò: " + account.role + "\n" +
                    "Trạng thái: " + account.status
                );
            });

            row.querySelector(".permission-btn").addEventListener("click", () => {
                const newRole = prompt(
                    "Nhập vai trò mới:\n" +
                    "1. Người tìm nhà\n" +
                    "2. Môi giới\n" +
                    "3. Kiểm duyệt viên\n" +
                    "4. Quản trị viên",
                    account.role
                );

                if (newRole === null || newRole.trim() === "") {
                    return;
                }

                const validRoles = [
                    "Người tìm nhà",
                    "Môi giới",
                    "Kiểm duyệt viên",
                    "Quản trị viên"
                ];

                if (!validRoles.includes(newRole.trim())) {
                    alert("Vai trò không hợp lệ.");
                    return;
                }

                if (newRole.trim() === "Quản trị viên") {
                    const confirmed = confirm(
                        "Bạn có chắc chắn muốn cấp quyền quản trị viên?"
                    );

                    if (!confirmed) {
                        return;
                    }
                }

                account.role = newRole.trim();
                account.updated = new Date().toLocaleDateString("vi-VN");

                saveAccounts();
                renderAccounts();

                alert("Đã cập nhật vai trò tài khoản.");
            });

            statusButton.addEventListener("click", () => {
                if (account.status === "Chờ xác minh") {
                    const confirmed = confirm(
                        "Xác minh tài khoản " + account.email + "?"
                    );

                    if (!confirmed) {
                        return;
                    }

                    account.status = "Hoạt động";
                } else if (account.status === "Hoạt động") {
                    const confirmed = confirm(
                        "Bạn có chắc chắn muốn tạm khóa tài khoản này?"
                    );

                    if (!confirmed) {
                        return;
                    }

                    account.status = "Tạm khóa";
                } else {
                    const confirmed = confirm(
                        "Bạn có muốn mở khóa tài khoản này?"
                    );

                    if (!confirmed) {
                        return;
                    }

                    account.status = "Hoạt động";
                }

                account.updated = new Date().toLocaleDateString("vi-VN");

                saveAccounts();
                renderAccounts();
            });

            accountList.appendChild(row);
        });
    }

    updateStatistics();
    resultCount.textContent =
        "Hiển thị " + filteredAccounts.length +
        " / " + accounts.length + " tài khoản";
}

function updateStatistics() {
    const activeAccounts = accounts.filter(
        account => account.status === "Hoạt động"
    ).length;

    const pendingAccounts = accounts.filter(
        account => account.status === "Chờ xác minh"
    ).length;

    const lockedAccounts = accounts.filter(
        account => account.status === "Tạm khóa"
    ).length;

    const usedRoles = new Set(accounts.map(account => account.role));

    activeCount.textContent = activeAccounts;
    totalCount.textContent = accounts.length + " tài khoản tổng cộng";
    waitingCount.textContent = pendingAccounts + " / " + lockedAccounts;
    roleCount.textContent = usedRoles.size;
}

searchInput.addEventListener("input", renderAccounts);
roleFilter.addEventListener("change", renderAccounts);
statusFilter.addEventListener("change", renderAccounts);

document.getElementById("invite-btn").addEventListener("click", () => {
    inviteForm.reset();
    inviteDialog.showModal();
});

document.getElementById("close-dialog").addEventListener("click", () => {
    inviteDialog.close();
});

document.getElementById("cancel-invite").addEventListener("click", () => {
    inviteDialog.close();
});

inviteForm.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("invite-name").value.trim();
    const email = document.getElementById("invite-email").value.trim();
    const role = document.getElementById("invite-role").value;

    const emailExists = accounts.some(
        account => account.email.toLowerCase() === email.toLowerCase()
    );

    if (emailExists) {
        alert("Email này đã tồn tại trong hệ thống.");
        return;
    }

    const newAccount = {
        id: Date.now(),
        name: name,
        email: email,
        role: role,
        status: "Chờ xác minh",
        updated: new Date().toLocaleDateString("vi-VN")
    };

    accounts.push(newAccount);
    saveAccounts();

    searchInput.value = "";
    roleFilter.value = "";
    statusFilter.value = "";

    renderAccounts();
    inviteDialog.close();

    alert("Đã tạo tài khoản demo. Tài khoản đang chờ xác minh.");
});

document.getElementById("audit-btn").addEventListener("click", () => {
    const logs = JSON.parse(
        localStorage.getItem("homefit_admin_logs") || "[]"
    );

    if (logs.length === 0) {
        alert("Chưa có nhật ký quản trị được lưu.");
        return;
    }

    alert(
        logs.map(log =>
            log.time + " - " + log.action
        ).join("\n")
    );
});

function logout() {
    const confirmed = confirm("Bạn có chắc chắn muốn đăng xuất không?");

    if (confirmed) {
        window.location.href = "../Login/dang_nhap.html";
    }
}

document.getElementById("logout-btn").addEventListener("click", logout);
document.getElementById("sidebar-logout").addEventListener("click", logout);

renderAccounts();
