document.addEventListener("DOMContentLoaded", function () {
    const approveButton = document.getElementById("approve");
    const requestButton = document.getElementById("request");
    const saveDraftButton = document.getElementById("save-draft");
    const viewLogButton = document.getElementById("view-log");

    const reasonInput = document.getElementById("reason");
    const feedbackInput = document.getElementById("feedback-text");
    const detailId = document.getElementById("detail-id");
    const detailStatus = document.getElementById("detail-status");
    const description = document.getElementById("listing-description");

    const pendingCount = document.getElementById("pending-count");
    const processedCount = document.getElementById("processed-count");
    const pendingTabCount = document.getElementById("pending-tab-count");
    const processedTabCount = document.getElementById("processed-tab-count");

    const toast = document.getElementById("toast");

    let currentId = "HF-1025";

    let logs = JSON.parse(
        localStorage.getItem("homefit_moderation_log") || "[]"
    );

    let processed = JSON.parse(
        localStorage.getItem("homefit_processed_listings") || "[]"
    );

    let drafts = JSON.parse(
        localStorage.getItem("homefit_moderation_draft") || "{}"
    );

    function showMessage(message) {
        toast.textContent = message;
        toast.style.display = "block";

        clearTimeout(showMessage.timer);

        showMessage.timer = setTimeout(function () {
            toast.style.display = "none";
        }, 3000);
    }

    function saveLogs() {
        localStorage.setItem(
            "homefit_moderation_log",
            JSON.stringify(logs)
        );
    }

    function updateCounts() {
        const pending = Math.max(0, 3 - processed.length);
        const done = 7 + processed.length;

        pendingCount.textContent = pending;
        pendingTabCount.textContent = pending;

        processedCount.textContent = done;
        processedTabCount.textContent = done;
    }

    function recordAction(action) {
        logs.push({
            id: currentId,
            action: action,
            reason: reasonInput.value.trim(),
            time: new Date().toLocaleString("vi-VN")
        });

        saveLogs();
    }

    function markProcessed() {
        if (!processed.includes(currentId)) {
            processed.push(currentId);

            localStorage.setItem(
                "homefit_processed_listings",
                JSON.stringify(processed)
            );
        }

        detailStatus.textContent = "Đã duyệt";
        detailStatus.className = "status status-approved";

        updateCounts();
    }

    approveButton.addEventListener("click", function () {
        const confirmed = confirm(
            "Bạn có chắc chắn muốn duyệt tin " + currentId + "?"
        );

        if (!confirmed) {
            return;
        }

        if (processed.includes(currentId)) {
            showMessage("Tin này đã được xử lý trước đó.");
            return;
        }

        markProcessed();
        recordAction("Duyệt tin");

        showMessage("Đã ghi nhận thao tác duyệt tin " + currentId + ".");
    });

    requestButton.addEventListener("click", function () {
        const reason = reasonInput.value.trim();

        if (reason === "") {
            showMessage("Vui lòng nhập lý do yêu cầu bổ sung.");
            reasonInput.focus();
            return;
        }

        feedbackInput.value =
            "Vui lòng bổ sung thông tin cho tin " +
            currentId + ". Lý do: " + reason;

        detailStatus.textContent = "Yêu cầu bổ sung";
        detailStatus.className = "status status-pending";

        recordAction("Yêu cầu bổ sung");

        showMessage("Đã ghi nhận yêu cầu bổ sung cho " + currentId + ".");
    });

    saveDraftButton.addEventListener("click", function () {
        drafts[currentId] = {
            reason: reasonInput.value,
            feedback: feedbackInput.value,
            savedAt: new Date().toLocaleString("vi-VN")
        };

        localStorage.setItem(
            "homefit_moderation_draft",
            JSON.stringify(drafts)
        );

        recordAction("Lưu nháp");

        showMessage("Đã lưu nháp tin " + currentId + ".");
    });

    viewLogButton.addEventListener("click", function () {
        if (logs.length === 0) {
            showMessage("Chưa có thao tác nào trong nhật ký.");
            return;
        }

        const content = logs
            .slice()
            .reverse()
            .map(function (item) {
                return item.time + " | " + item.id + " | " + item.action;
            })
            .join("\n");

        alert("NHẬT KÝ XỬ LÝ\n\n" + content);
    });

    document.querySelectorAll(".listing").forEach(function (listing) {
        listing.addEventListener("click", function () {
            currentId = listing.dataset.listing;

            document.querySelectorAll(".listing").forEach(function (item) {
                item.classList.remove("selected-listing");
            });

            listing.classList.add("selected-listing");

            detailId.textContent = currentId;

            const isProcessed = processed.includes(currentId);

            detailStatus.textContent = isProcessed
                ? "Đã duyệt"
                : "Chờ duyệt";

            detailStatus.className = isProcessed
                ? "status status-approved"
                : "status status-pending";

            description.textContent = currentId === "HF-1025"
                ? "Bản cập nhật Riverside · Đủ thông tin cơ bản."
                : "Nhà phố Linh Đông · Cần xác minh địa chỉ.";

            if (drafts[currentId]) {
                reasonInput.value = drafts[currentId].reason;
                feedbackInput.value = drafts[currentId].feedback;
            } else if (currentId === "HF-1028") {
                reasonInput.value = "Cần xác minh địa chỉ trước khi duyệt.";
                feedbackInput.value =
                    "Vui lòng cung cấp thông tin xác minh địa chỉ.";
            } else {
                reasonInput.value =
                    "Duyệt tin sau khi kiểm tra ảnh và thông tin cơ bản";

                feedbackInput.value =
                    "Tin đăng đủ thông tin cơ bản. Đề xuất duyệt sau khi xác minh.";
            }
        });
    });

    document.querySelectorAll(".approve-btn").forEach(function (button) {
        button.addEventListener("click", function () {
            approveButton.click();
        });
    });

    document.querySelectorAll(".request-btn").forEach(function (button) {
        button.addEventListener("click", function () {
            requestButton.click();
        });
    });

    document.querySelectorAll(".tab").forEach(function (tab) {
        tab.addEventListener("click", function () {
            document.querySelectorAll(".tab").forEach(function (item) {
                item.classList.remove("active");
            });

            tab.classList.add("active");

            const type = tab.dataset.tab;

            document.querySelectorAll(".listing").forEach(function (listing) {
                const isProcessed = processed.includes(listing.dataset.listing);

                listing.style.display =
                    type === "processed"
                        ? (isProcessed ? "flex" : "none")
                        : (isProcessed ? "none" : "flex");
            });

            showMessage(
                type === "pending"
                    ? "Đang hiển thị tin chờ xử lý."
                    : "Đang hiển thị tin đã xử lý trong danh sách mẫu."
            );
        });
    });

    document.getElementById("show-more").addEventListener("click", function () {
        showMessage("Danh sách hiện tại chỉ chứa các tin minh họa.");
    });

    document.getElementById("logout").addEventListener("click", function (event) {
        event.preventDefault();

        if (confirm("Bạn có muốn đăng xuất khỏi giao diện minh họa?")) {
            showMessage("Đây là giao diện demo, chưa tích hợp đăng xuất thật.");
        }
    });

    updateCounts();
});