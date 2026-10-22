
const tabs = document.querySelectorAll(".tab");
const panels = {
    saved: document.getElementById("savedPanel"),
    schedule: document.getElementById("schedulePanel"),
    needs: document.getElementById("needsPanel")
};

const savedHomes = document.getElementById("savedHomes");
const savedCount = document.getElementById("savedCount");

function switchTab(tabName) {
    tabs.forEach(function(tab) {
        tab.classList.toggle("active", tab.dataset.tab === tabName);
    });

    Object.keys(panels).forEach(function(name) {
        panels[name].classList.toggle("hidden", name !== tabName);
    });
}

tabs.forEach(function(tab) {
    tab.addEventListener("click", function() {
        switchTab(tab.dataset.tab);
    });
});

function getSelectedHomes() {
    const selected = [];

    document.querySelectorAll(".compare-input:checked").forEach(function(input) {
        const row = input.closest("tr");

        if (row) {
            selected.push(row.dataset.home);
        }
    });

    return selected;
}

function compareHomes() {
    const selected = getSelectedHomes();

    if (selected.length < 2) {
        alert("Chủ nhân hãy chọn ít nhất 2 căn nhà để so sánh.");
        return;
    }

    alert("Các căn nhà được chọn để so sánh:\n\n" + selected.join("\n"));
}

document.getElementById("compareTop").addEventListener("click", compareHomes);

document.querySelectorAll(".compare-input").forEach(function(input) {
    input.addEventListener("change", function() {
        const row = input.closest("tr");
        const label = input.closest(".compare-check");

        label.lastChild.textContent = input.checked ? " Đã chọn" : " Chưa chọn";
        row.classList.toggle("selected-row", input.checked);
    });
});

function updateSavedCount() {
    const count = savedHomes.querySelectorAll("tr").length;
    savedCount.textContent = count + " nhà · Cập nhật gần nhất 01/10/2026";
}

function removeHome(row) {
    const homeName = row.dataset.home;
    const confirmed = confirm("Bạn có chắc muốn bỏ lưu " + homeName + "?");

    if (confirmed) {
        row.remove();
        updateSavedCount();
        alert("Đã bỏ lưu " + homeName + ".");
    }
}

document.querySelectorAll(".remove-button").forEach(function(button) {
    button.addEventListener("click", function() {
        removeHome(button.closest("tr"));
    });
});

document.getElementById("aiCompare").addEventListener("click", function() {
    const firstRow = savedHomes.querySelector("tr");

    if (!firstRow) {
        alert("Danh sách nhà đã lưu hiện đang trống.");
        return;
    }

    const firstCheckbox = firstRow.querySelector(".compare-input");
    firstCheckbox.checked = true;
    firstCheckbox.dispatchEvent(new Event("change"));

    switchTab("saved");
    alert("Đã chọn An Nhiên HF-1024. Hãy chọn thêm nhà khác để so sánh.");
});

document.getElementById("aiRemove").addEventListener("click", function() {
    const firstRow = savedHomes.querySelector("tr");

    if (firstRow) {
        removeHome(firstRow);
    } else {
        alert("Danh sách nhà đã lưu hiện đang trống.");
    }
});

function editNote() {
    const currentNote = "Kiểm tra phí quản lý và quy định nuôi mèo trước khi đến.";
    const newNote = prompt("Nhập ghi chú mới:", currentNote);

    if (newNote !== null && newNote.trim() !== "") {
        alert("Ghi chú mới của bạn:\n" + newNote);
    }
}

document.getElementById("editNote").addEventListener("click", editNote);

document.getElementById("saveSuggestion").addEventListener("click", function() {
    const suggestion = {
        home: "An Nhiên HF-1024",
        match: "94%",
        savedAt: new Date().toLocaleDateString("vi-VN")
    };

    localStorage.setItem("homefitSuggestion", JSON.stringify(suggestion));
    alert("Đã lưu gợi ý An Nhiên HF-1024 trên trình duyệt.");
});

function openSchedule() {
    switchTab("schedule");
}

document.getElementById("viewSchedule").addEventListener("click", openSchedule);
document.getElementById("viewScheduleBottom").addEventListener("click", openSchedule);

document.getElementById("editNeeds").addEventListener("click", function() {
    alert(
        "Nhu cầu hiện tại:\n" +
        "- 2 phòng ngủ\n" +
        "- Ngân sách 12–18 triệu/tháng\n" +
        "- Gần nơi làm việc\n" +
        "- Gần công viên\n" +
        "- Cho phép nuôi mèo\n\n" +
        "Chức năng chỉnh sửa nhu cầu sẽ được kết nối với form khi phát triển tiếp."
    );
});
