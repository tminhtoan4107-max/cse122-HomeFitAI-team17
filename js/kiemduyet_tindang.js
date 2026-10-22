document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // LẤY CÁC ELEMENT
    // =========================

    const sideItems =
        document.querySelectorAll(".side-item");

    const filterTabs =
        document.querySelectorAll(".filter-tab");

    const listingCards =
        document.querySelectorAll(".listing-card");

    const approveButtons =
        document.querySelectorAll(".approve-btn");

    const supplementButtons =
        document.querySelectorAll(".supplement-btn");

    const draftButtons =
        document.querySelectorAll(".draft-btn");

    const logoutButton =
        document.querySelector(".logout-btn");

    const detailId =
        document.querySelector("#detail-id");

    const detailContent =
        document.querySelector("#detail-content");


    // =========================
    // DỮ LIỆU TIN
    // =========================

    const listings = {

        "HF-1025": {
            title: "Riverside · HF-1025",

            content:
                "Bản cập nhật Riverside · Đủ thông tin cơ bản."
        },

        "HF-1028": {
            title: "Nhà phố Linh Đông · HF-1028",

            content:
                "Tin đăng đang chờ xác minh địa chỉ."
        }

    };


    // =========================
    // CHỌN TIN
    // =========================

    function selectListing(id) {

        listingCards.forEach(card => {

            card.classList.toggle(
                "selected",
                card.dataset.id === id
            );

        });


        const listing = listings[id];


        if (listing) {

            detailId.textContent = id;

            detailContent.textContent =
                listing.content;

        }

    }


    // =========================
    // CLICK VÀO TIN
    // =========================

    listingCards.forEach(card => {

        card.addEventListener("click", () => {

            selectListing(
                card.dataset.id
            );

        });

    });


    // =========================
    // SIDEBAR
    // =========================

    sideItems.forEach(item => {

        item.addEventListener("click", () => {

            sideItems.forEach(button => {

                button.classList.remove("active");

            });


            item.classList.add("active");

        });

    });


    // =========================
    // FILTER TAB
    // =========================

    filterTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            filterTabs.forEach(button => {

                button.classList.remove("active");

            });


            tab.classList.add("active");


            if (
                tab.dataset.filter === "processed"
            ) {

                alert(
                    "Khu vực 'Đã xử lý' đang là dữ liệu minh họa."
                );

            }

        });

    });


    // =========================
    // DUYỆT TIN
    // =========================

    approveButtons.forEach(button => {

        button.addEventListener("click", () => {

            alert(
                `Đã duyệt tin ${detailId.textContent}.`
            );

        });

    });


    // =========================
    // BỔ SUNG
    // =========================

    supplementButtons.forEach(button => {

        button.addEventListener("click", () => {

            alert(
                `Tin ${detailId.textContent} cần được bổ sung thông tin.`
            );

        });

    });


    // =========================
    // LƯU NHÁP
    // =========================

    draftButtons.forEach(button => {

        button.addEventListener("click", () => {

            alert(
                `Đã lưu nháp quyết định cho ${detailId.textContent}.`
            );

        });

    });


    // =========================
    // ĐĂNG XUẤT
    // =========================

    if (logoutButton) {

        logoutButton.addEventListener("click", () => {

            alert(
                "Chức năng đăng xuất đang là giao diện minh họa."
            );

        });

    }


    // =========================
    // TIN MẶC ĐỊNH
    // =========================

    selectListing("HF-1025");

});