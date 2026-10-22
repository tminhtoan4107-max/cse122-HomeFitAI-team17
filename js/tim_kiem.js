const searchForm = document.getElementById("searchForm");
const areaSelect = document.getElementById("area");
const budgetSelect = document.getElementById("budget");
const spaceSelect = document.getElementById("space");
const sortSelect = document.getElementById("sortBy");
const propertyGrid = document.getElementById("propertyGrid");
const resultSummary = document.getElementById("resultSummary");
const formMessage = document.getElementById("formMessage");
const compareTitle = document.getElementById("compareTitle");
const compareText = document.getElementById("compareText");
const compareDetails = document.getElementById("compareDetails");

const savedHomes = new Set(["HF-1024"]);
const comparedHomes = new Set(["HF-1024"]);

let transactionType = "rent";

const properties = Array.from(
    document.querySelectorAll(".property-card")
);

function getProperty(id) {
    return properties.find(
        (card) => card.dataset.id === id
    );
}

function updateSavedButton(card) {
    const button = card.querySelector(".save-property");
    const isSaved = savedHomes.has(card.dataset.id);

    button.textContent = isSaved ? "✓ Đã lưu nhà" : "Lưu nhà";
    button.setAttribute("aria-pressed", String(isSaved));

    document.getElementById("savedCountSide").textContent =
        savedHomes.size ? `(${savedHomes.size})` : "";
}

function updateCompareButton(card) {
    const button = card.querySelector(".compare-property");
    const isCompared = comparedHomes.has(card.dataset.id);

    button.textContent = isCompared
        ? "✓ Đã thêm vào so sánh"
        : "Thêm vào so sánh";

    button.setAttribute("aria-pressed", String(isCompared));
}

function updateComparePanel() {
    compareTitle.textContent =
        `Danh sách so sánh · ${comparedHomes.size} / 3 nhà`;

    if (comparedHomes.size === 0) {
        compareText.textContent =
            "Bạn chưa chọn căn nhà nào. Hãy thêm nhà để bắt đầu so sánh.";
    } else {
        const names = Array.from(comparedHomes)
            .map((id) => getProperty(id))
            .filter(Boolean)
            .map((card) => card.querySelector("h4").textContent);

        compareText.textContent =
            `${names.join(", ")} đã được chọn. Bạn có thể so sánh tối đa 3 căn nhà.`;
    }

    compareDetails.replaceChildren();

    const list = document.createElement("ul");

    Array.from(comparedHomes).forEach((id) => {
        const card = getProperty(id);

        if (!card) {
            return;
        }

        const item = document.createElement("li");

        item.textContent =
            `${card.querySelector("h4").textContent} — ${card.querySelector(".price").textContent}`;

        list.appendChild(item);
    });

    compareDetails.appendChild(list);
    compareDetails.hidden = true;

    properties.forEach(updateCompareButton);
}

function applyFilters() {
    const area = areaSelect.value;
    const budget = budgetSelect.value;
    const bedrooms = spaceSelect.value;

    const selectedFeatures = Array.from(
        document.querySelectorAll(".feature-filter:checked")
    ).map((input) => input.value);

    let visibleCount = 0;

    properties.forEach((card) => {
        const cardArea = card.dataset.area;
        const price = Number(card.dataset.price);
        const cardBedrooms = card.dataset.bedrooms;
        const features = card.dataset.features.split(" ");

        const areaMatches =
            area === "all" || cardArea === area;

        const budgetMatches =
            budget === "all" || price <= Number(budget);

        const bedroomMatches =
            bedrooms === "all" || cardBedrooms === bedrooms;

        const featuresMatch = selectedFeatures.every(
            (feature) => features.includes(feature)
        );

        const isVisible =
            areaMatches &&
            budgetMatches &&
            bedroomMatches &&
            featuresMatch;

        card.hidden = !isVisible;

        if (isVisible) {
            visibleCount++;
        }
    });

    resultSummary.textContent =
        `${visibleCount} căn nhà phù hợp · Dữ liệu minh họa 01/10/2026`;

    formMessage.textContent = visibleCount
        ? `Đã tìm thấy ${visibleCount} căn nhà theo bộ lọc hiện tại.`
        : "Không tìm thấy căn nhà phù hợp. Hãy thử thay đổi bộ lọc.";
}

function sortProperties() {
    const sorted = [...properties];
    const mode = sortSelect.value;

    sorted.sort((a, b) => {
        if (mode === "price-asc") {
            return Number(a.dataset.price) - Number(b.dataset.price);
        }

        if (mode === "price-desc") {
            return Number(b.dataset.price) - Number(a.dataset.price);
        }

        return Number(b.dataset.match) - Number(a.dataset.match);
    });

    sorted.forEach((card) => propertyGrid.appendChild(card));
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    applyFilters();
});

sortSelect.addEventListener("change", sortProperties);

document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach((tab) => {
            tab.classList.remove("active");
        });

        button.classList.add("active");
        transactionType = button.dataset.transaction;

        const budgetLabel = document.getElementById("budgetLabel");

        budgetLabel.firstChild.textContent =
            transactionType === "rent"
                ? "Ngân sách / tháng"
                : "Ngân sách mua nhà";

        formMessage.textContent =
            transactionType === "rent"
                ? "Đang tìm nhà cho thuê."
                : "Đang chọn nhu cầu mua nhà (dữ liệu minh họa).";
    });
});

properties.forEach((card) => {
    updateSavedButton(card);
    updateCompareButton(card);

    card.querySelector(".save-property").addEventListener("click", () => {
        const id = card.dataset.id;

        if (savedHomes.has(id)) {
            savedHomes.delete(id);
        } else {
            savedHomes.add(id);
        }

        updateSavedButton(card);
    });

    card.querySelector(".compare-property").addEventListener("click", () => {
        const id = card.dataset.id;

        if (comparedHomes.has(id)) {
            comparedHomes.delete(id);
        } else if (comparedHomes.size < 3) {
            comparedHomes.add(id);
        } else {
            formMessage.textContent =
                "Bạn chỉ có thể so sánh tối đa 3 căn nhà.";
            return;
        }

        updateComparePanel();
    });
});

document.getElementById("saveNeeds").addEventListener("click", () => {
    const selectedFeatures = Array.from(
        document.querySelectorAll(".feature-filter:checked")
    ).map((input) => input.parentElement.textContent.trim());

    formMessage.textContent =
        `Đã lưu nhu cầu: ${areaSelect.options[areaSelect.selectedIndex].text}; ` +
        `${budgetSelect.options[budgetSelect.selectedIndex].text}; ` +
        `${selectedFeatures.join(", ") || "không có tiện ích bổ sung"}.`;
});

document.getElementById("moreFilters").addEventListener("click", () => {
    const unchecked = Array.from(
        document.querySelectorAll(".feature-filter:not(:checked)")
    );

    if (unchecked.length) {
        unchecked[0].checked = true;

        formMessage.textContent =
            "Đã thêm tiêu chí tiện ích. Nhấn “Tìm nhà phù hợp” để cập nhật kết quả.";
    } else {
        document.querySelectorAll(".feature-filter").forEach((input) => {
            input.checked = false;
        });

        formMessage.textContent =
            "Đã bỏ chọn các tiêu chí tiện ích bổ sung.";
    }
});

document.getElementById("viewCompare").addEventListener("click", () => {
    compareDetails.hidden = !compareDetails.hidden;

    document.getElementById("viewCompare").textContent =
        compareDetails.hidden
            ? "Xem bảng so sánh"
            : "Ẩn bảng so sánh";
});

document.getElementById("goAI").addEventListener("click", () => {
    document.getElementById("aiMessage").textContent =
        "Khu vực AI sẽ được kết nối khi hoàn thiện giao diện AI người tìm nhà.";
});

document.getElementById("logoutLink").addEventListener("click", (event) => {
    event.preventDefault();

    formMessage.textContent =
        "Đây là giao diện minh họa; chức năng đăng xuất chưa kết nối hệ thống tài khoản.";
});

document.getElementById("mobileMenu").addEventListener("click", () => {
    document.querySelector(".topbar").classList.toggle("menu-open");
    document.getElementById("sidebar").classList.toggle("open");
});

updateComparePanel();
