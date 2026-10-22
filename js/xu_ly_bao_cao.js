const message = document.getElementById("message");
const actionNote = document.getElementById("action-note");
const reportTitle = document.getElementById("report-title");
const reportSubtitle = document.getElementById("report-subtitle");
const reportContent = document.getElementById("report-content");
const reportStatus = document.getElementById("report-status");
const decisionStatus = document.getElementById("decision-status");
const reason = document.getElementById("reason");
const response = document.getElementById("response");

let currentReport = "HF-1027";
let resolvedCount = 7;

const reports = {
    "HF-1027": {
        title: "RP-021 · Ảnh không đúng thực tế",
        subtitle: "Tin đăng HF-1027 · Studio An Phú",
        content: "“Ảnh phòng khách giống tin An Nhiên nhưng địa chỉ là studio An Phú. Nhờ kiểm tra lại.”",
        status: "Đang xem xét",
        decision: "Chưa có quyết định cuối",
        response: "Vui lòng bổ sung ảnh gốc của Studio An Phú và giấy ủy quyền. Tin giữ trạng thái “Cần bổ sung” trong thời gian xác minh."
    },
    "HF-1024": {
        title: "RP-020 · Cần xác minh tin đăng",
        subtitle: "Tin đăng HF-1024 · Studio An Nhiên",
        content: "“Đề nghị kiểm tra lại thông tin và hình ảnh của tin đăng trước khi tiếp tục hiển thị.”",
        status: "Chờ xác minh",
        decision: "Chưa có quyết định cuối",
        response: "Vui lòng cung cấp thêm thông tin và hình ảnh để kiểm duyệt viên xác minh tin đăng."
    }
};

function showMessage(text) {
    message.textContent = text;
    message.classList.add("show");
}

function selectReport(id) {
    const report = reports[id];

    if (!report) {
        return;
    }

    currentReport = id;

    reportTitle.textContent = report.title;
    reportSubtitle.textContent = report.subtitle;
    reportContent.textContent = report.content;
    reportStatus.textContent = report.status;
    decisionStatus.textContent = report.decision;
    response.value = report.response;

    document.querySelectorAll(".report-item").forEach(function (item) {
        item.classList.toggle("selected", item.dataset.report === id);
    });

    message.classList.remove("show");
}

document.querySelectorAll(".report-item").forEach(function (item) {
    item.addEventListener("click", function () {
        selectReport(item.dataset.report);
    });
});

document.getElementById("show-more").addEventListener("click", function (event) {
    event.preventDefault();

    const secondReport = document.querySelector(".second-report");
    const isVisible = secondReport.classList.toggle("show");

    this.textContent = isVisible ? "Thu gọn ↑" : "Xem thêm 1 mục →";
});

document.querySelectorAll(".tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
        document.querySelectorAll(".tab").forEach(function (item) {
            item.classList.remove("active");
        });

        this.classList.add("active");

        if (this.dataset.tab === "resolved") {
            showMessage(
                "Danh sách đã xử lý: " + resolvedCount +
                " báo cáo. Dữ liệu hiện tại là dữ liệu minh họa."
            );
        } else {
            message.classList.remove("show");
        }
    });
});

document.getElementById("request-more").addEventListener("click", function () {
    const report = reports[currentReport];

    report.status = "Cần bổ sung";
    report.decision = "Đã yêu cầu bổ sung";

    reportStatus.textContent = report.status;
    decisionStatus.textContent = report.decision;

    actionNote.textContent = "Đã ghi nhận yêu cầu bổ sung trong bản mô phỏng.";

    showMessage(
        "Đã tạo yêu cầu bổ sung cho " + currentReport +
        ". Lý do: " + reason.value
    );
});

document.getElementById("hide-listing").addEventListener("click", function () {
    const confirmed = confirm(
        "Bạn có chắc chắn muốn ẩn tin " + currentReport + " không?"
    );

    if (!confirmed) {
        return;
    }

    reports[currentReport].status = "Đã ẩn tin";
    reportStatus.textContent = "Đã ẩn tin";
    decisionStatus.textContent = "Đã ghi nhận quyết định";

    actionNote.textContent = "Đã ghi nhận thao tác ẩn tin trong bản mô phỏng.";

    showMessage("Tin " + currentReport + " đã được đánh dấu ẩn trong giao diện.");
});

document.getElementById("reject-report").addEventListener("click", function () {
    const confirmed = confirm(
        "Bạn có chắc chắn muốn bác báo cáo " + currentReport + " không?"
    );

    if (!confirmed) {
        return;
    }

    reports[currentReport].status = "Đã bác báo cáo";
    reportStatus.textContent = "Đã bác báo cáo";
    decisionStatus.textContent = "Đã ghi nhận quyết định";

    actionNote.textContent = "Đã ghi nhận thao tác bác báo cáo trong bản mô phỏng.";

    showMessage("Báo cáo " + currentReport + " đã được đánh dấu bác.");
});

document.getElementById("save-draft").addEventListener("click", function () {
    reports[currentReport].response = response.value;
    reports[currentReport].decision = "Đã lưu nháp";

    decisionStatus.textContent = "Đã lưu nháp";
    actionNote.textContent = "Nội dung nháp được lưu tạm thời trong phiên hiện tại.";

    showMessage(
        "Đã lưu nháp cho " + currentReport +
        ". Lý do: " + reason.value
    );
});

function openLog() {
    showMessage(
        "NHẬT KÝ XỬ LÝ\n" +
        "Mã báo cáo: " + currentReport + "\n" +
        "Trạng thái: " + reportStatus.textContent + "\n" +
        "Lý do: " + reason.value + "\n" +
        "Người xử lý: Nguyễn Hà\n" +
        "Lưu ý: Đây là nhật ký minh họa, chưa lưu vào cơ sở dữ liệu."
    );
}

document.getElementById("view-log").addEventListener("click", openLog);

document.querySelectorAll('[data-view="nhatky"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        openLog();
    });
});

document.querySelectorAll('[data-view="duyet"], [data-view="ai"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        const view = this.dataset.view;

        showMessage(
            view === "duyet"
                ? "Bạn đang chọn chức năng Duyệt tin. Cần xây dựng màn hình riêng để hoàn thiện chức năng này."
                : "Bạn đang chọn chức năng AI. Đây là giao diện minh họa, chưa kết nối AI thực tế."
        );
    });
});

document.querySelectorAll('[data-view="baocao"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();
        message.classList.remove("show");
    });
});

document.getElementById("logout").addEventListener("click", function (event) {
    event.preventDefault();

    showMessage(
        "Đây là giao diện mô phỏng. Chức năng đăng xuất cần được kết nối với hệ thống đăng nhập."
    );
});