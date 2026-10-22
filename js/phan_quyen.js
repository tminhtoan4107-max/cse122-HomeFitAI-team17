
const accounts = {
    phuckhang: {
        name: "Phúc Khang",
        email: "phuckhang@example.com",
        role: "Môi giới",
        verified: false,
        checks: [false, false, false],
        reason: "Cấp quyền môi giới sau khi hoàn tất đối chiếu hồ sơ và xác minh danh tính Phúc Khang."
    },
    minhan: {
        name: "Minh An",
        email: "minhan@example.com",
        role: "Người tìm nhà",
        verified: true,
        checks: [true, true, true],
        reason: "Tài khoản người tìm nhà đã hoàn tất xác minh."
    },
    thanhha: {
        name: "Thanh Hà",
        email: "thanhha@example.com",
        role: "Môi giới",
        verified: true,
        checks: [true, true, true],
        reason: "Hồ sơ môi giới đã được kiểm tra."
    }
};

const rolePermissions = {
    "Người tìm nhà": [
        "Tìm nhà theo nhu cầu",
        "Lưu nhà của mình",
        "So sánh nhà",
        "AI hỗ trợ tìm, lưu và so sánh"
    ],
    "Môi giới": [
        "Quản lý tin đăng của mình",
        "Quản lý khách hàng của mình",
        "Tạo, sửa tin và gửi kiểm duyệt",
        "AI hỗ trợ môi giới"
    ],
    "Kiểm duyệt": [
        "Duyệt tin bằng xác nhận thủ công",
        "Xử lý báo cáo và xác minh bằng chứng",
        "Xem nhật ký xử lý",
        "AI hỗ trợ kiểm duyệt"
    ],
    "Quản trị": [
        "Quản lý danh mục",
        "Quản lý tài khoản",
        "Cấp và thu hồi quyền",
        "AI hỗ trợ quản trị"
    ]
};

const accountSelect = document.getElementById("accountSelect");
const accountStatus = document.getElementById("accountStatus");
const accountUpdated = document.getElementById("accountUpdated");
const currentRole = document.getElementById("currentRole");
const proposedRole = document.getElementById("proposedRole");
const permissionPreview = document.getElementById("permissionPreview");
const reason = document.getElementById("reason");

const identityCheck = document.getElementById("identityCheck");
const documentCheck = document.getElementById("documentCheck");
const contactCheck = document.getElementById("contactCheck");
const confirmCheck = document.getElementById("confirmCheck");

const verificationStatus = document.getElementById("verificationStatus");
const savePermission = document.getElementById("savePermission");

const noticeTitle = document.getElementById("noticeTitle");
const noticeText = document.getElementById("noticeText");

const messageDialog = document.getElementById("messageDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogMessage = document.getElementById("dialogMessage");

let auditLog = [];

function showMessage(title, message) {
    dialogTitle.textContent = title;
    dialogMessage.textContent = message;
    messageDialog.showModal();
}

function getAccount() {
    return accounts[accountSelect.value];
}

function renderPermissions() {
    const role = proposedRole.value;
    permissionPreview.replaceChildren();

    rolePermissions[role].forEach(function (permission) {
        const item = document.createElement("li");
        item.textContent = "✓ " + permission;
        permissionPreview.appendChild(item);
    });

    const denied = document.createElement("li");
    denied.className = "denied";

    if (role !== "Quản trị") {
        denied.textContent = "— Quản lý danh mục và cấp quyền quản trị";
        permissionPreview.appendChild(denied);
    }

    if (role !== "Kiểm duyệt") {
        const moderation = document.createElement("li");
        moderation.className = "denied";
        moderation.textContent = "— Duyệt tin và xử lý báo cáo";
        permissionPreview.appendChild(moderation);
    }
}

function updateVerificationStatus() {
    const checks = [
        identityCheck.checked,
        documentCheck.checked,
        contactCheck.checked
    ];

    const complete = checks.every(Boolean);
    const account = getAccount();

    verificationStatus.classList.toggle("success", complete);
    verificationStatus.classList.toggle("error", !complete);

    verificationStatus.textContent = complete
        ? "Đã hoàn tất các bước xác minh."
        : "Còn thiếu " + checks.filter(function (value) {
            return !value;
        }).length + " bước xác minh.";

    const roleIsSafe = proposedRole.value === "Người tìm nhà" ||
        proposedRole.value === "Môi giới";

    const canSave = complete &&
        confirmCheck.checked &&
        reason.value.trim().length > 0 &&
        roleIsSafe;

    savePermission.disabled = !canSave;

    if (!roleIsSafe) {
        verificationStatus.textContent =
            "Bản minh họa không cho phép cấp quyền kiểm duyệt hoặc quản trị qua biểu mẫu này.";
    }

    if (account.verified && roleIsSafe) {
        verificationStatus.textContent =
            "Hồ sơ đã xác minh. Vẫn cần xác nhận trước khi lưu thay đổi.";
    }
}

function loadAccount() {
    const account = getAccount();

    currentRole.value = account.verified
        ? account.role + " · Đã xác minh"
        : account.role + " · Chờ xác minh";

    proposedRole.value = account.role;
    reason.value = account.reason;

    identityCheck.checked = account.checks[0];
    documentCheck.checked = account.checks[1];
    contactCheck.checked = account.checks[2];

    confirmCheck.checked = false;

    accountStatus.textContent = account.verified
        ? account.role + " · Đã xác minh"
        : account.role + " · Chờ xác minh";

    accountUpdated.textContent = account.verified
        ? "Hồ sơ đã hoàn tất xác minh."
        : "Quyền vận hành chưa được kích hoạt.";

    renderPermissions();
    updateVerificationStatus();

    noticeTitle.textContent = "Đã chọn tài khoản " + account.name;
    noticeText.textContent =
        "Vai trò hiện tại: " + account.role +
        ". Hãy kiểm tra hồ sơ trước khi xác nhận thay đổi.";
}

function saveDraft() {
    const account = getAccount();

    account.checks = [
        identityCheck.checked,
        documentCheck.checked,
        contactCheck.checked
    ];

    account.reason = reason.value;

    noticeTitle.textContent = "Đã lưu nháp trong phiên hiện tại";
    noticeText.textContent =
        "Đã cập nhật ghi chú và trạng thái kiểm tra trên dữ liệu minh họa. " +
        "Thao tác này không cấp quyền và chưa lưu vào máy chủ.";

    showMessage(
        "Lưu nháp",
        "Thông tin nháp đã được cập nhật trong bộ nhớ của trang hiện tại. " +
        "Dữ liệu sẽ không được bảo đảm giữ lại khi tải lại trang."
    );
}

function confirmPermission() {
    const account = getAccount();

    updateVerificationStatus();

    if (savePermission.disabled) {
        showMessage(
            "Chưa thể xác nhận",
            "Hãy hoàn tất xác minh, nhập lý do và xác nhận hồ sơ trước khi tiếp tục."
        );
        return;
    }

    const oldRole = account.role;
    const newRole = proposedRole.value;

    if (oldRole !== newRole) {
        const accepted = window.confirm(
            "Bạn muốn đổi vai trò của " + account.name +
            " từ " + oldRole + " sang " + newRole + "?"
        );

        if (!accepted) {
            return;
        }
    }

    const logEntry = {
        account: account.name,
        email: account.email,
        oldRole: oldRole,
        newRole: newRole,
        reason: reason.value.trim(),
        operator: "Quản trị viên",
        time: new Date().toLocaleString("vi-VN")
    };

    auditLog.push(logEntry);

    account.role = newRole;
    account.verified = true;
    account.checks = [
        identityCheck.checked,
        documentCheck.checked,
        contactCheck.checked
    ];
    account.reason = reason.value.trim();

    currentRole.value = newRole + " · Đã xác minh";
    accountStatus.textContent = newRole + " · Đã xác minh";
    accountUpdated.textContent = "Hồ sơ đã hoàn tất xác minh.";

    confirmCheck.checked = false;

    noticeTitle.textContent = "Đã xác nhận thay đổi trong bản minh họa";
    noticeText.textContent =
        "Người xác nhận: Quản trị viên · " + account.name +
        " · Vai trò: " + oldRole + " → " + newRole +
        " · Thời gian: " + logEntry.time +
        ". Nhật ký hiện chỉ lưu trong bộ nhớ của trang.";

    updateVerificationStatus();

    showMessage(
        "Xác nhận thành công",
        "Bản minh họa đã cập nhật vai trò " + newRole +
        " cho " + account.name +
        " và thêm một mục nhật ký trong phiên hiện tại. " +
        "Đây chưa phải thao tác cấp quyền thực tế trên máy chủ."
    );
}

document.getElementById("closeDialog").addEventListener("click", function () {
    messageDialog.close();
});

accountSelect.addEventListener("change", loadAccount);

proposedRole.addEventListener("change", function () {
    renderPermissions();
    confirmCheck.checked = false;
    updateVerificationStatus();
});

[
    identityCheck,
    documentCheck,
    contactCheck,
    confirmCheck
].forEach(function (checkbox) {
    checkbox.addEventListener("change", updateVerificationStatus);
});

reason.addEventListener("input", updateVerificationStatus);

document.getElementById("saveDraft").addEventListener("click", saveDraft);

savePermission.addEventListener("click", confirmPermission);

document.getElementById("viewVerification").addEventListener("click", function () {
    const account = getAccount();

    showMessage(
        "Hồ sơ xác minh",
        "Tài khoản: " + account.name +
        " · Email: " + account.email +
        ". Đây là dữ liệu minh họa, chưa kết nối hồ sơ giấy tờ thực tế."
    );
});

document.getElementById("reviewAI").addEventListener("click", function () {
    const role = proposedRole.value;
    const checks = [
        identityCheck.checked,
        documentCheck.checked,
        contactCheck.checked
    ];

    if (checks.every(Boolean)) {
        showMessage(
            "Gợi ý rà soát quyền",
            "Các bước xác minh đã được đánh dấu hoàn tất. " +
            "Quyền đề xuất: " + role +
            ". Quản trị viên vẫn phải kiểm tra và xác nhận."
        );
    } else {
        showMessage(
            "Gợi ý rà soát quyền",
            "Chưa đủ thông tin để đề xuất cấp quyền " + role +
            ". Hãy hoàn tất các bước xác minh còn thiếu trước khi xác nhận."
        );
    }
});

document.getElementById("openAI").addEventListener("click", function () {
    showMessage(
        "AI hỗ trợ HomeFit",
        "AI có thể hỗ trợ rà soát thông tin và gợi ý quyền. " +
        "Quyết định cuối cùng vẫn thuộc về quản trị viên."
    );
});

document.getElementById("logoutBtn").addEventListener("click", function (event) {
    event.preventDefault();

    showMessage(
        "Đăng xuất",
        "Chức năng đăng xuất cần được kết nối với hệ thống xác thực của dự án."
    );
});

loadAccount();
