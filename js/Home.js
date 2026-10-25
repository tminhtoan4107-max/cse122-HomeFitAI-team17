
const searchForm = document.getElementById("searchForm");
const areaSelect = document.getElementById("area");
const budgetSelect = document.getElementById("budget");
const spaceSelect = document.getElementById("space");
const sortSelect = document.getElementById("sortBy");
const propertyGrid = document.getElementById("propertyGrid");
const resultSummary = document.getElementById("resultSummary");
const resetFilters = document.getElementById("resetFilters");
const saveSuggestion = document.getElementById("saveSuggestion");
const toast = document.getElementById("toast");

const tabs = document.querySelectorAll(".tab");
const priorityInputs = document.querySelectorAll(
    'input[name="priority"]'
);

let houseType = "rent";
let currentSuggestion = "HF-1024";
let toastTimer;

const properties = Array.from(
    propertyGrid.querySelectorAll(".property-card")
);

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

function getPrice(card) {
    return Number(
        card.querySelector(".price").dataset[houseType]
    );
}

function formatPrice(price) {
    return price.toLocaleString("vi-VN", {
        maximumFractionDigits: 2
    });
}

function updatePriceLabels() {
    properties.forEach(card => {
        const priceElement = card.querySelector(".price");
        const price = getPrice(card);

        priceElement.textContent = houseType === "rent"
            ? `${formatPrice(price)} triệu/tháng`
            : `${formatPrice(price)} tỷ`;
    });

    const budgetLabel = document.querySelector(
        'label[for="budget"]'
    );

    budgetLabel.textContent = houseType === "rent"
        ? "Ngân sách / tháng"
        : "Ngân sách mua nhà";

    const budgetOptions = budgetSelect.options;

    budgetOptions[1].textContent = houseType === "rent"
        ? "Dưới 10 triệu"
        : "Dưới 2 tỷ";

    budgetOptions[2].textContent = houseType === "rent"
        ? "10 – 15 triệu"
        : "2 – 3 tỷ";

    budgetOptions[3].textContent = houseType === "rent"
        ? "15 – 20 triệu"
        : "3 – 4 tỷ";

    budgetOptions[4].textContent = houseType === "rent"
        ? "Trên 20 triệu"
        : "Trên 4 tỷ";
}

function matchesBudget(price, budget) {
    if (budget === "all") return true;

    if (budget === "10") return price < 10;

    if (budget === "15") {
        return price >= 10 && price <= 15;
    }

    if (budget === "20") {
        return price > 15 && price <= 20;
    }

    if (budget === "30") return price > 20;

    return true;
}

function getActivePriorities() {
    return Array.from(priorityInputs)
        .filter(input => input.checked)
        .map(input => input.value);
}

function getMatchScore(card) {
    const priorities = getActivePriorities();

    const score = Number(card.dataset.match);
    const bonus = priorities.reduce((total, priority) => {
        return total + (
            card.dataset[priority] === "true" ? 2 : 0
        );
    }, 0);

    return Math.min(99, score + bonus);
}

function renderProperties() {
    const area = areaSelect.value;
    const budget = budgetSelect.value;
    const space = spaceSelect.value;

    const filteredProperties = properties.filter(card => {
        const matchesArea =
            area === "all" || card.dataset.area === area;

        const matchesSpace =
            space === "all" || card.dataset.space === space;

        const matchesType =
            card.dataset.houseType === houseType;

        const matchesPrice = matchesBudget(
            getPrice(card),
            budget
        );

        return (
            matchesArea &&
            matchesSpace &&
            matchesType &&
            matchesPrice
        );
    });

    filteredProperties.sort((a, b) => {
        if (sortSelect.value === "priceAsc") {
            return getPrice(a) - getPrice(b);
        }

        if (sortSelect.value === "priceDesc") {
            return getPrice(b) - getPrice(a);
        }

        if (sortSelect.value === "areaDesc") {
            return Number(b.dataset.size) -
                Number(a.dataset.size);
        }

        return getMatchScore(b) - getMatchScore(a);
    });

    properties.forEach(card => {
        card.hidden = !filteredProperties.includes(card);
    });

    const emptyMessage = propertyGrid.querySelector(
        ".empty-message"
    );

    if (emptyMessage) {
        emptyMessage.remove();
    }

    if (filteredProperties.length === 0) {
        const message = document.createElement("p");

        message.className = "empty-message";
        message.textContent =
            "Không tìm thấy nhà phù hợp. Hãy thử thay đổi bộ lọc.";

        propertyGrid.appendChild(message);
    }

    resultSummary.textContent =
        `Tìm thấy ${filteredProperties.length} căn nhà phù hợp`;

    updateSuggestion(filteredProperties);
}

function updateSuggestion(filteredProperties) {
    const aiName = document.getElementById("aiPropertyName");
    const aiExplanation = document.getElementById("aiExplanation");

    const bestProperty = filteredProperties
        .slice()
        .sort((a, b) => getMatchScore(b) - getMatchScore(a))[0];

    if (!bestProperty) {
        currentSuggestion = null;
        aiName.textContent = "Chưa có nhà phù hợp";
        aiExplanation.textContent =
            "Hãy thay đổi khu vực hoặc ngân sách để xem gợi ý khác.";

        saveSuggestion.disabled = true;
        saveSuggestion.textContent = "Không có gợi ý";
        return;
    }

    currentSuggestion = bestProperty.dataset.id;

    const name = bestProperty.querySelector("h4").textContent;
    const score = getMatchScore(bestProperty);
    const priorities = getActivePriorities();

    const descriptions = {
        work: "gần nơi làm việc",
        green: "có không gian xanh",
        pet: "cho phép nuôi thú cưng"
    };

    const reasons = priorities.map(
        priority => descriptions[priority]
    );

    aiName.textContent = `${name} hợp với bạn nhất`;

    aiExplanation.textContent = reasons.length
        ? `Phù hợp ${score}% theo điểm minh họa, ưu tiên ${reasons.join(", ")}.`
        : `Điểm phù hợp minh họa: ${score}%. Bạn chưa chọn ưu tiên cụ thể.`;

    saveSuggestion.disabled = false;
    saveSuggestion.textContent = "♡ Lưu gợi ý";
}

searchForm.addEventListener("submit", event => {
    event.preventDefault();
    renderProperties();
    showToast("Đã cập nhật danh sách nhà phù hợp!");
});

[areaSelect, budgetSelect, spaceSelect, sortSelect]
    .forEach(control => {
        control.addEventListener("change", renderProperties);
    });

priorityInputs.forEach(input => {
    input.addEventListener("change", renderProperties);
});

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(item => item.classList.remove("active"));

        tab.classList.add("active");
        houseType = tab.dataset.type;

        updatePriceLabels();
        renderProperties();
    });
});

resetFilters.addEventListener("click", () => {
    areaSelect.value = "all";
    budgetSelect.value = "all";
    spaceSelect.value = "all";
    sortSelect.value = "match";

    priorityInputs.forEach(input => {
        input.checked = false;
    });

    renderProperties();
    showToast("Đã đặt lại bộ lọc!");
});

properties.forEach(card => {
    const favoriteButton = card.querySelector(".favorite-btn");

    favoriteButton.addEventListener("click", () => {
        const saved = favoriteButton.classList.toggle("saved");

        favoriteButton.textContent = saved ? "♥" : "♡";
        favoriteButton.setAttribute("aria-pressed", String(saved));

        showToast(
            saved
                ? "Đã lưu nhà yêu thích!"
                : "Đã bỏ lưu nhà."
        );
    });

    card.querySelector(".detail-btn").addEventListener(
        "click",
        () => {
            const name = card.querySelector("h4").textContent;
            const id = card.dataset.id;

            showToast(`${name} · Mã tin ${id}`);
        }
    );
});

saveSuggestion.addEventListener("click", () => {
    if (!currentSuggestion) return;

    const suggestedCard = properties.find(
        card => card.dataset.id === currentSuggestion
    );

    if (!suggestedCard) return;

    const favoriteButton = suggestedCard.querySelector(
        ".favorite-btn"
    );

    if (!favoriteButton.classList.contains("saved")) {
        favoriteButton.classList.add("saved");
        favoriteButton.textContent = "♥";
        favoriteButton.setAttribute("aria-pressed", "true");
    }

    showToast("Đã lưu gợi ý nhà phù hợp!");
});

document.querySelectorAll(
    '.nav-actions a, .account-banner a'
).forEach(link => {
    link.addEventListener("click", () => {
        const href = link.getAttribute("href");

        if (!href || href === "#") {
            showToast("Liên kết này chưa được thiết lập.");
        }
    });
});

updatePriceLabels();
renderProperties();
