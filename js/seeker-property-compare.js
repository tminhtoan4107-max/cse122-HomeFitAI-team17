
const houseList = document.getElementById("houseList");
const comparisonTable = document.getElementById("comparisonTable");
const message = document.getElementById("message");

// Hiển thị thông báo
function showMessage(content) {
    message.textContent = content;
}

// Bỏ căn nhà khỏi danh sách so sánh
const removeButtons = document.querySelectorAll(".remove-house");

removeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const houseCard = button.closest(".house-card");
        const houseId = houseCard.dataset.house;

        houseCard.classList.add("is-hidden");

        const columns = comparisonTable.querySelectorAll(
            '[data-column="' + houseId + '"]'
        );

        columns.forEach(function (column) {
            column.remove();
        });

        showMessage("Đã bỏ căn nhà khỏi bảng so sánh.");
    });
});

// Chọn căn nhà
const selectButtons = document.querySelectorAll(".select-house");

selectButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const houseName = button.dataset.name;

        showMessage("Bạn đã chọn căn nhà " + houseName + ".");
    });
});

// Lưu căn nhà để xem sau
const saveButtons = document.querySelectorAll(".save-house");

saveButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const houseName = button.dataset.name;

        try {
            const savedHouses = JSON.parse(
                localStorage.getItem("savedHouses") || "[]"
            );

            if (!savedHouses.includes(houseName)) {
                savedHouses.push(houseName);

                localStorage.setItem(
                    "savedHouses",
                    JSON.stringify(savedHouses)
                );

                showMessage("Đã lưu " + houseName + " để xem sau.");
            } else {
                showMessage(houseName + " đã có trong danh sách lưu.");
            }
        } catch (error) {
            showMessage("Không thể lưu căn nhà trên trình duyệt này.");
        }
    });
});

// Mở phần giải thích của AI
document.getElementById("openAI").addEventListener("click", function () {
    document.getElementById("aiExplanation").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

    showMessage("Đang xem phần giải thích lựa chọn của AI.");
});

// Đến phần AI giải thích so sánh
document.getElementById("explainComparison").addEventListener(
    "click",
    function () {
        document.getElementById("aiExplanation").scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        showMessage(
            "AI gợi ý An Nhiên cân bằng giữa ngân sách và nhu cầu. " +
            "Hãy xác nhận lại thông tin với bên cho thuê."
        );
    }
);

// Lưu bảng so sánh
document.getElementById("saveComparison").addEventListener(
    "click",
    function () {
        try {
            const tableData = comparisonTable.innerText;

            localStorage.setItem("comparisonTable", tableData);

            showMessage("Đã lưu nội dung bảng so sánh trên trình duyệt.");
        } catch (error) {
            showMessage("Không thể lưu bảng so sánh.");
        }
    }
);

// Tiếp tục tìm nhà
document.getElementById("continueSearch").addEventListener(
    "click",
    function () {
        showMessage(
            "Bạn có thể quay lại mục Tìm nhà để khám phá thêm căn hộ."
        );
    }
);
