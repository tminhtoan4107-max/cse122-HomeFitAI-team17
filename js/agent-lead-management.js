
// Lấy các phần tử HTML cần sử dụng
const addCustomerBtn = document.getElementById("addCustomerBtn");
const customerDialog = document.getElementById("customerDialog");
const customerForm = document.getElementById("customerForm");
const customerTable = document.getElementById("customerTable");
const dialogTitle = document.getElementById("dialogTitle");

const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const emptyMessage = document.getElementById("emptyMessage");
const totalCustomers = document.getElementById("totalCustomers");

let editingRow = null;

// Mở form thêm khách hàng
addCustomerBtn.addEventListener("click", function () {
    editingRow = null;
    customerForm.reset();

    dialogTitle.textContent = "Thêm khách hàng";
    customerDialog.showModal();
});

// Đóng form
function closeDialog() {
    customerDialog.close();
}

document.getElementById("closeDialog")
    .addEventListener("click", closeDialog);

document.getElementById("cancelDialog")
    .addEventListener("click", closeDialog);

// Tạo một ô trong bảng
function createCell(text) {
    const cell = document.createElement("td");
    cell.textContent = text;
    return cell;
}

// Thêm nhãn trạng thái
function createStatusCell(status) {
    const cell = document.createElement("td");
    const badge = document.createElement("span");

    badge.className = "status";
    badge.textContent = status;

    cell.appendChild(badge);
    return cell;
}

// Tạo nút sửa
function createEditButton() {
    const cell = document.createElement("td");
    const button = document.createElement("button");

    button.type = "button";
    button.className = "edit-button";
    button.textContent = "Sửa";

    cell.appendChild(button);
    return cell;
}

// Lưu hoặc cập nhật khách hàng
customerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const property = document.getElementById("propertyName").value.trim();
    const need = document.getElementById("customerNeed").value.trim();
    const status = document.getElementById("customerStatus").value;
    const response =
        document.getElementById("customerResponse").value.trim()
        || "Chưa có phản hồi";

    if (!name || !property || !need) {
        alert("Vui lòng nhập đầy đủ thông tin bắt buộc.");
        return;
    }

    let row = editingRow;

    // Nếu chưa có dòng đang sửa thì tạo khách hàng mới
    if (!row) {
        row = document.createElement("tr");
        customerTable.appendChild(row);
    }

    // Cập nhật dữ liệu của dòng
    row.replaceChildren(
        createCell(name),
        createCell(property),
        createCell(need),
        createStatusCell(status),
        createCell(response),
        createEditButton()
    );

    updateCustomerCount();
    filterCustomers();
    closeDialog();
});

// Bắt sự kiện nút Sửa trong bảng
customerTable.addEventListener("click", function (event) {
    const button = event.target.closest(".edit-button");

    if (!button) return;

    editingRow = button.closest("tr");

    const cells = editingRow.cells;

    document.getElementById("customerName").value =
        cells[0].textContent.trim();

    document.getElementById("propertyName").value =
        cells[1].textContent.trim();

    document.getElementById("customerNeed").value =
        cells[2].textContent.replace(/\s+/g, " ").trim();

    document.getElementById("customerStatus").value =
        cells[3].textContent.trim();

    document.getElementById("customerResponse").value =
        cells[4].textContent.replace(/\s+/g, " ").trim();

    dialogTitle.textContent = "Sửa thông tin khách hàng";
    customerDialog.showModal();
});

// Tìm kiếm và lọc khách hàng
function filterCustomers() {
    const keyword = searchInput.value.trim().toLowerCase();
    const selectedStatus = statusFilter.value;
    const rows = customerTable.querySelectorAll("tr");

    let visibleCount = 0;

    rows.forEach(function (row) {
        const text = row.textContent.toLowerCase();
        const status = row.cells[3].textContent.trim();

        const matchesKeyword = text.includes(keyword);
        const matchesStatus =
            selectedStatus === "" || status === selectedStatus;

        const visible = matchesKeyword && matchesStatus;

        row.hidden = !visible;

        if (visible) {
            visibleCount++;
        }
    });

    emptyMessage.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", filterCustomers);
statusFilter.addEventListener("change", filterCustomers);

// Cập nhật số khách hàng đang có trong bảng
function updateCustomerCount() {
    const count = customerTable.querySelectorAll("tr").length;

    totalCustomers.textContent = count;
}

// Thông báo cho những trang chưa được kết nối
document.querySelectorAll("[data-message]").forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        alert(link.dataset.message + " chưa được kết nối.");
    });
});

// Đăng xuất minh họa
document.getElementById("logout").addEventListener("click", function (event) {
    event.preventDefault();
    alert("Chức năng đăng xuất chưa được kết nối.");
});

// Khởi tạo tìm kiếm và thống kê
filterCustomers();
