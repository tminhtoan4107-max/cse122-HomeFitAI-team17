
const historyData = [
    {
        date: "2026-09-30",
        time: "16:40",
        displayTime: "30/09 · 16:40",
        object: "RP-018 · HF-1026",
        code: "RP-018 HF-1026",
        action: "Bác báo cáo",
        person: "Nguyễn Hà",
        reason: "Thông tin phí khớp tài liệu đã đối chiếu.",
        evidence: "Bảng phí · tài liệu đối chiếu",
        badge: "Đã xác nhận"
    },
    {
        date: "2026-09-29",
        time: "14:15",
        displayTime: "29/09 · 14:15",
        object: "HF-1025 · bản cũ",
        code: "HF-1025",
        action: "Duyệt tin",
        person: "Nguyễn Hà",
        reason: "Ảnh gốc, địa chỉ, giá và phí đã xác minh.",
        evidence: "Ảnh gốc · giấy ủy quyền · bảng phí bản cũ",
        badge: "Lần xử lý trước · Bản cũ"
    },
    {
        date: "2026-09-28",
        time: "10:20",
        displayTime: "28/09 · 10:20",
        object: "HF-1024",
        code: "HF-1024",
        action: "Duyệt tin",
        person: "Nguyễn Hà",
        reason: "Đủ thông tin và giấy ủy quyền hợp lệ.",
        evidence: "Thông tin tin đăng · giấy ủy quyền",
        badge: "Đã xác nhận"
    },
    {
        date: "2026-09-27",
        time: "15:05",
        displayTime: "27/09 · 15:05",
        object: "RP-016 · HF-1019",
        code: "RP-016 HF-1019",
        action: "Yêu cầu bổ sung",
        person: "Nguyễn Hà",
        reason: "Thiếu thông tin nguồn ảnh và giá thuê.",
        evidence: "Nguồn ảnh · thông tin giá thuê",
        badge: "Đã xác nhận"
    },
    {
        date: "2026-09-25",
        time: "09:30",
        displayTime: "25/09 · 09:30",
        object: "HF-1026",
        code: "HF-1026",
        action: "Duyệt tin",
        person: "Nguyễn Hà",
        reason: "Đã xác minh địa chỉ, ảnh và bảng phí.",
        evidence: "Địa chỉ · ảnh · bảng phí",
        badge: "Đã xác nhận"
    },
    {
        date: "2026-09-24",
        time: "16:10",
        displayTime: "24/09 · 16:10",
        object: "HF-1022",
        code: "HF-1022",
        action: "Yêu cầu bổ sung",
        person: "Trần Minh",
        reason: "Cần bổ sung hình ảnh và thông tin liên hệ.",
        evidence: "Hình ảnh · thông tin liên hệ",
        badge: "Đã xác nhận"
    },
    {
        date: "2026-09-24",
        time: "09:15",
        displayTime: "24/09 · 09:15",
        object: "RP-014 · HF-1018",
        code: "RP-014 HF-1018",
        action: "Bác báo cáo",
        person: "Nguyễn Hà",
        reason: "Nội dung báo cáo chưa có bằng chứng phù hợp.",
        evidence: "Nội dung báo cáo · tài liệu liên quan",
        badge: "Đã xác nhận"
    }
];

const filterForm = document.getElementById("filterForm");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const actionFilter = document.getElementById("actionFilter");
const personFilter = document.getElementById("personFilter");
const codeFilter = document.getElementById("codeFilter");

const historyTable = document.getElementById("historyTable");
const pagination = document.getElementById("pagination");
const historyTitle = document.getElementById("historyTitle");
const historyDescription = document.getElementById("historyDescription");

let filteredData = [...historyData];
let currentPage = 1;
const pageSize = 5;

function renderTable() {
    const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));

    if (currentPage > totalPages) {
        currentPage = totalPages;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const pageData = filteredData.slice(startIndex, startIndex + pageSize);

    historyTable.innerHTML = "";

    if (pageData.length === 0) {
        historyTable.innerHTML = `
            <tr>
                <td colspan="6" class="empty-message">
                    Không tìm thấy nhật ký phù hợp.
                </td>
            </tr>
        `;
    } else {
        pageData.forEach((item) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.displayTime}</td>
                <td>${item.object}</td>
                <td>${item.action}</td>
                <td>${item.person}</td>
                <td>${item.reason}</td>
                <td>
                    <button class="view-button" type="button">
                        Xem ↗
                    </button>
                </td>
            `;

            row.querySelector(".view-button").addEventListener("click", () => {
                showDetail(item);
            });

            historyTable.appendChild(row);
        });
    }

    historyTitle.textContent =
        `Lịch sử quyết định · ${filteredData.length} mục trong tuần`;

    const shownCount = Math.min(pageSize, pageData.length);

    historyDescription.textContent =
        `Hiển thị ${shownCount} / ${filteredData.length} mục · Sắp xếp theo thời gian mới nhất · Nhấn Xem để đọc chi tiết`;

    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    pagination.innerHTML = "";

    const previousButton = document.createElement("button");
    previousButton.textContent = "Trước";
    previousButton.disabled = currentPage === 1;
    previousButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    pagination.appendChild(previousButton);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");

        pageButton.textContent = i;

        if (i === currentPage) {
            pageButton.classList.add("active");
        }

        pageButton.addEventListener("click", () => {
            currentPage = i;
            renderTable();
        });

        pagination.appendChild(pageButton);
    }

    const nextButton = document.createElement("button");
    nextButton.textContent = "Sau →";
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
        }
    });

    pagination.appendChild(nextButton);
}

function showDetail(item) {
    document.getElementById("detailTitle").textContent =
        `Chi tiết quyết định · ${item.object}`;

    document.getElementById("detailBadge").textContent = item.badge;

    document.getElementById("detailTime").textContent =
        `${item.displayTime} · ${item.date.split("-")[0]}`;

    document.getElementById("detailPerson").textContent =
        item.person + " · Kiểm duyệt viên";

    document.getElementById("detailAction").textContent = item.action;
    document.getElementById("detailReason").textContent = item.reason;
    document.getElementById("detailEvidence").textContent = item.evidence;

    document.querySelector(".detail-panel").scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}

function applyFilter() {
    const start = startDate.value;
    const end = endDate.value;
    const action = actionFilter.value;
    const person = personFilter.value;
    const code = codeFilter.value.trim().toLowerCase();

    if (start && end && start > end) {
        alert("Ngày bắt đầu không được sau ngày kết thúc.");
        return;
    }

    filteredData = historyData.filter((item) => {
        const matchStart = !start || item.date >= start;
        const matchEnd = !end || item.date <= end;
        const matchAction = !action || item.action === action;
        const matchPerson = !person || item.person === person;
        const matchCode = !code || item.code.toLowerCase().includes(code);

        return matchStart && matchEnd && matchAction &&
            matchPerson && matchCode;
    });

    currentPage = 1;
    renderTable();
}

filterForm.addEventListener("submit", (event) => {
    event.preventDefault();
    applyFilter();
});

document.getElementById("clearFilter").addEventListener("click", () => {
    startDate.value = "2026-09-24";
    endDate.value = "2026-10-01";
    actionFilter.value = "";
    personFilter.value = "";
    codeFilter.value = "";

    filteredData = [...historyData];
    currentPage = 1;

    renderTable();
});

document.getElementById("exportCSV").addEventListener("click", () => {
    if (filteredData.length === 0) {
        alert("Không có dữ liệu để xuất.");
        return;
    }

    const headers = [
        "Thời gian",
        "Đối tượng",
        "Quyết định",
        "Người xử lý",
        "Lý do",
        "Bằng chứng"
    ];

    const rows = filteredData.map((item) => [
        `${item.date} ${item.time}`,
        item.object,
        item.action,
        item.person,
        item.reason,
        item.evidence
    ]);

    const escapeCSV = (value) =>
        `"${String(value).replace(/"/g, '""')}"`;

    const csvContent = [headers, ...rows]
        .map((row) => row.map(escapeCSV).join(","))
        .join("\r\n");

    const blob = new Blob(
        ["\uFEFF" + csvContent],
        { type: "text/csv;charset=utf-8;" }
    );

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "nhat_ky_xu_ly.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
});

document.getElementById("openAI").addEventListener("click", () => {
    alert(
        "AI hỗ trợ tra cứu nhật ký. " +
        "Chức năng kết nối AI cần được tích hợp thêm ở phía hệ thống."
    );
});

document.getElementById("summaryAI").addEventListener("click", () => {
    const summary = filteredData.reduce((result, item) => {
        result[item.action] = (result[item.action] || 0) + 1;
        return result;
    }, {});

    const summaryText = Object.entries(summary)
        .map(([action, count]) => `${action}: ${count} mục`)
        .join("\n");

    alert(
        `Tóm tắt ${filteredData.length} mục nhật ký:\n` +
        (summaryText || "Không có dữ liệu phù hợp.")
    );
});

renderTable();

showDetail(
    historyData.find((item) => item.code.includes("HF-1025"))
);
