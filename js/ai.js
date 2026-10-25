
const saveSession = document.getElementById("saveSession");
const editRequest = document.getElementById("editRequest");
const editArea = document.getElementById("editArea");
const requestText = document.getElementById("requestText");
const requestInput = document.getElementById("requestInput");
const updateRequest = document.getElementById("updateRequest");

const acceptBtn = document.getElementById("acceptBtn");
const reviseBtn = document.getElementById("reviseBtn");
const rejectBtn = document.getElementById("rejectBtn");
const saveAnalysis = document.getElementById("saveAnalysis");
const analysisStatus = document.getElementById("analysisStatus");

const questionBtn = document.getElementById("questionBtn");
const questionArea = document.getElementById("questionArea");
const questionInput = document.getElementById("questionInput");
const sendQuestion = document.getElementById("sendQuestion");
const answerText = document.getElementById("answerText");

const actionMessage = document.getElementById("actionMessage");

saveSession.addEventListener("click", function () {
    const session = {
        yeuCau: requestText.textContent,
        thoiGian: new Date().toLocaleString("vi-VN")
    };

    localStorage.setItem("homeFitSession", JSON.stringify(session));

    actionMessage.textContent = "Đã lưu phiên hỗ trợ trên trình duyệt.";
});

editRequest.addEventListener("click", function () {
    editArea.classList.toggle("hidden");
    requestInput.value = requestText.textContent.trim();
});

updateRequest.addEventListener("click", function () {
    const newRequest = requestInput.value.trim();

    if (newRequest === "") {
        alert("Vui lòng nhập nội dung yêu cầu.");
        return;
    }

    requestText.textContent = newRequest;
    editArea.classList.add("hidden");
    actionMessage.textContent = "Đã cập nhật yêu cầu tìm nhà.";
});

acceptBtn.addEventListener("click", function () {
    actionMessage.textContent =
        "Bạn đã chấp nhận gợi ý An Nhiên HF-1024.";
});

reviseBtn.addEventListener("click", function () {
    editArea.classList.remove("hidden");
    requestInput.value = requestText.textContent.trim();
    requestInput.focus();

    actionMessage.textContent =
        "Bạn có thể chỉnh sửa yêu cầu để nhận gợi ý phù hợp hơn.";
});

rejectBtn.addEventListener("click", function () {
    const confirmReject = confirm(
        "Bạn có muốn từ chối gợi ý An Nhiên không?"
    );

    if (confirmReject) {
        actionMessage.textContent =
            "Bạn đã từ chối gợi ý An Nhiên.";
    }
});

saveAnalysis.addEventListener("click", function () {
    const analysis = {
        tenCanHo: "An Nhiên HF-1024",
        doPhuHop: "94%",
        chiPhiDuKien: "15,8 triệu đồng/tháng"
    };

    localStorage.setItem(
        "homeFitAnalysis",
        JSON.stringify(analysis)
    );

    analysisStatus.textContent = "✓ Đã lưu phân tích";
    actionMessage.textContent =
        "Đã lưu phân tích căn hộ vào trình duyệt.";
});

questionBtn.addEventListener("click", function () {
    questionArea.classList.toggle("hidden");

    if (!questionArea.classList.contains("hidden")) {
        questionInput.focus();
    }
});

sendQuestion.addEventListener("click", function () {
    const question = questionInput.value.trim();

    if (question === "") {
        alert("Vui lòng nhập câu hỏi.");
        return;
    }

    answerText.textContent =
        "Với nhu cầu hiện tại, bạn nên ưu tiên căn hộ An Nhiên " +
        "vì đạt mức phù hợp 94%. Hãy kiểm tra thêm phí quản lý, " +
        "quy định nuôi mèo và khoảng cách đến nơi làm việc. " +
        "Đây là phản hồi minh họa, chưa kết nối AI thực tế.";

    questionInput.value = "";
});

const role = localStorage.getItem("role");
const homeLink = document.getElementById("home-link");
if (role === "admin") {
     homeLink.href = "../admin/index.html";
} 
else if (role === "moderator") {
    homeLink.href = "../moderator/duyet_tin.html";
} 
else {
     homeLink.href = "../pages/nguoi_dung/seeker-property-search.html";
}
