
const reportItems = document.querySelectorAll(".report-item");
const tabs = document.querySelectorAll(".tab");

const openCount = document.getElementById("open-count");
const resolvedCount = document.getElementById("resolved-count");
const pendingTabCount = document.getElementById("pending-tab-count");
const resolvedTabCount = document.getElementById("resolved-tab-count");

const detailTitle = document.getElementById("detail-title");
const detailSubtitle = document.getElementById("detail-subtitle");
const detailStatus = document.getElementById("detail-status");
const reportContent = document.getElementById("report-content");
const evidenceCount = document.getElementById("evidence-count");
const aiSuggestion = document.getElementById("ai-suggestion");

const decisionReason = document.getElementById("decision-reason");
const brokerResponse = document.getElementById("broker-response");
const decisionMessage = document.getElementById("decision-message");

const requestMoreButton = document.getElementById("request-more");
const hideListingButton = document.getElementById("hide-listing");
const rejectReportButton = document.getElementById("reject-report");
const saveDraftButton = document.getElementById("save-draft");

let currentReport = "RP-021";
let activeTab = "pending";

const reports = {
    "RP-021": {
        title: "RP-021 · Ảnh không đúng thực tế",
        subtitle: "Tin đăng HF-1027 · Studio An Phú",
        content: "“Ảnh phòng khách giống tin An Nhiên nhưng địa chỉ là studio An Phú. Nhờ kiểm tra lại.”",
        evidence: "2 phản ánh · 1 ảnh đính kèm",
        suggestion: "Phát hiện bố cục ảnh tương tự HF-1024. Đề xuất yêu cầu ảnh gốc và giấy ủy quyền trước khi cho hiển thị lại.",
        status: "Đang xem xét",
        state: "pending"
    },
    "RP-022": {
        title: "RP-022 · Thông tin giá chưa chính xác",
        subtitle: "Tin đăng HF-1028 · Căn hộ Riverside",
        content: "“Giá hiển thị trên tin đăng khác với giá môi giới thông báo. Đề nghị xác minh lại.”",
        evidence: "1 phản ánh · Chưa có ảnh đính kèm",
        suggestion: "Cần đối chiếu giá hiển thị với thông tin do môi giới cung cấp. AI chỉ đưa ra gợi ý, không tự kết luận vi phạm.",
        status: "Chờ xác minh",
        state: "pending"
    }
};

function updateCounts() {
    const pendingReports = Object.values(reports).filter(
        report => report.state === "pending"
    ).length;

    const resolvedReports = Object.values(reports).filter(
        report => report.state === "resolved"
    ).length;

    openCount.textContent = pendingReports;
    pendingTabCount.textContent = pendingReports;
    resolvedCount.textContent = 7 + resolvedReports;
    resolvedTabCount.textContent = 7 + resolvedReports;
}

function showReport(reportId) {
    const report = reports[reportId];

    if (!report) {
        return;
    }

    currentReport = reportId;

    detailTitle.textContent = report.title;
    detailSubtitle.textContent = report.subtitle;
    reportContent.textContent = report.content;
    evidenceCount.textContent = report.evidence;
    aiSuggestion.textContent = report.suggestion;
    detailStatus.textContent = report.status;

    detailStatus.className = "status";

    if (report.state === "resolved") {
        detailStatus.classList.add("status-neutral");
    } else if (report.status === "Chờ xác minh") {
        detailStatus.classList.add("status-pending");
    } else {
        detailStatus.classList.add("status-review");
    }

    reportItems.forEach(item => {
        item.classList.toggle(
            "selected",
            item.dataset.report === reportId
        );
    });

    decisionMessage.textContent =
        "Đang xem báo cáo " + reportId + ". Chọn hành động để xử lý.";
}

function renderReports() {
    reportItems.forEach(item => {
        const report = reports[item.dataset.report];

        if (!report) {
            item.hidden = true;
            return;
        }

        item.hidden = report.state !== activeTab;
    });

    const visibleReports = Object.values(reports).filter(
        report => report.state === activeTab
    );

    if (visibleReports.length > 0) {
        const firstVisibleItem = Array.from(reportItems).find(item => {
            const report = reports[item.dataset.report];
            return report && report.state === activeTab;
        });

        if (firstVisibleItem) {
            showReport(firstVisibleItem.dataset.report);
        }
    } else {
        detailTitle.textContent = "Không có báo cáo";
        detailSubtitle.textContent = "";
        reportContent.textContent = "";
        evidenceCount.textContent = "";
        aiSuggestion.textContent = "Hiện không có báo cáo trong danh mục này.";
        detailStatus.textContent = activeTab === "resolved"
            ? "Đã xử lý"
            : "Không có dữ liệu";
        detailStatus.className = "status status-neutral";
        decisionMessage.textContent = "Chưa có báo cáo để xử lý.";
    }

    updateCounts();
}

reportItems.forEach(item => {
    item.addEventListener("click", () => {
        showReport(item.dataset.report);
    });
});

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        activeTab = tab.dataset.tab;

        tabs.forEach(button => {
            button.classList.toggle("active", button === tab);
        });

        renderReports();
    });
});

function processReport(status, message) {
    if (!reports[currentReport]) {
        alert("Không tìm thấy báo cáo cần xử lý.");
        return;
    }

    const report = reports[currentReport];
    const reason = decisionReason.value;
    const response = brokerResponse.value.trim();

    if (status === "Cần bổ sung" && response === "") {
        alert("Vui lòng nhập phản hồi gửi môi giới.");
        brokerResponse.focus();
        return;
    }

    const log = {
        reportId: currentReport,
        title: report.title,
        status: status,
        reason: reason,
        response: response,
        time: new Date().toLocaleString("vi-VN")
    };

    const oldLogs = JSON.parse(
        localStorage.getItem("homefit_report_logs") || "[]"
    );

    oldLogs.unshift(log);

    localStorage.setItem(
        "homefit_report_logs",
        JSON.stringify(oldLogs)
    );

    report.status = status;
    report.state = "resolved";

    decisionMessage.textContent =
        message + " Lý do: " + reason + ".";

    alert(message);

    renderReports();
}

requestMoreButton.addEventListener("click", () => {
    processReport(
        "Cần bổ sung",
        "Đã ghi nhận yêu cầu bổ sung thông tin."
    );
});

hideListingButton.addEventListener("click", () => {
    const confirmed = confirm(
        "Bạn có chắc chắn muốn ẩn tin đăng này không?"
    );

    if (confirmed) {
        processReport(
            "Đã ẩn tin",
            "Tin đăng đã được đánh dấu để ẩn."
        );
    }
});

rejectReportButton.addEventListener("click", () => {
    const confirmed = confirm(
        "Bạn có chắc chắn muốn bác báo cáo này không?"
    );

    if (confirmed) {
        processReport(
            "Đã bác báo cáo",
            "Báo cáo đã được đánh dấu là đã bác."
        );
    }
});

saveDraftButton.addEventListener("click", () => {
    const draft = {
        reportId: currentReport,
        reason: decisionReason.value,
        response: brokerResponse.value,
        time: new Date().toLocaleString("vi-VN")
    };

    const drafts = JSON.parse(
        localStorage.getItem("homefit_report_drafts") || "[]"
    );

    const existingIndex = drafts.findIndex(
        item => item.reportId === currentReport
    );

    if (existingIndex >= 0) {
        drafts[existingIndex] = draft;
    } else {
        drafts.push(draft);
    }

    localStorage.setItem(
        "homefit_report_drafts",
        JSON.stringify(drafts)
    );

    decisionMessage.textContent =
        "Đã lưu nháp báo cáo " + currentReport + ".";

    alert("Đã lưu nháp.");
});

document.getElementById("logout-link").addEventListener("click", event => {
    const confirmed = confirm("Bạn có muốn đăng xuất không?");

    if (!confirmed) {
        event.preventDefault();
    }
});

renderReports();
