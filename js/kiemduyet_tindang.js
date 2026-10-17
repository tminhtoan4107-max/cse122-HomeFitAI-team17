/* =====================================
   HOMEFIT AI
   QUẢN LÝ TIN ĐĂNG
===================================== */


/* =====================================
   LẤY CÁC ELEMENT
===================================== */

const createPostBtn =
    document.getElementById("createPostBtn");

const createModal =
    document.getElementById("createModal");

const closeModal =
    document.getElementById("closeModal");

const postForm =
    document.getElementById("postForm");

const editDraftBtn =
    document.getElementById("editDraftBtn");

const sendDraftBtn =
    document.getElementById("sendDraftBtn");

const logoutBtn =
    document.getElementById("logoutBtn");


/* =====================================
   MỞ MODAL
===================================== */

function openModal() {

    createModal.classList.remove("hidden");

    const postName =
        document.getElementById("postName");

    postName.focus();
}


/* =====================================
   ĐÓNG MODAL
===================================== */

function closeCreateModal() {

    createModal.classList.add("hidden");
}


/* =====================================
   BUTTON TẠO TIN ĐĂNG
===================================== */

createPostBtn.addEventListener(
    "click",
    openModal
);


/* =====================================
   BUTTON ĐÓNG MODAL
===================================== */

closeModal.addEventListener(
    "click",
    closeCreateModal
);


/* =====================================
   CLICK RA NGOÀI MODAL
===================================== */

createModal.addEventListener(
    "click",
    function(event) {

        if (event.target === createModal) {

            closeCreateModal();

        }

    }
);


/* =====================================
   THÊM TIN ĐĂNG
===================================== */

postForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document
                .getElementById("postName")
                .value
                .trim();


        const price =
            document
                .getElementById("postPrice")
                .value
                .trim();


        /* KIỂM TRA DỮ LIỆU */

        if (!name || !price) {

            alert(
                "Vui lòng nhập đầy đủ thông tin."
            );

            return;
        }


        /* TẠO MÃ TIN NGẪU NHIÊN */

        const postId =
            Math.floor(
                1000 +
                Math.random() * 9000
            );


        /* LẤY TABLE */

        const table =
            document.querySelector(".table");


        /* TẠO ROW */

        const row =
            document.createElement("div");


        row.className =
            "table-row";


        /* NỘI DUNG */

        row.innerHTML = `

            <div class="post-name">

                ${name}

                <br>

                <span>
                    HF-${postId} · Tin mới
                </span>

            </div>


            <div>
                ${price}
            </div>


            <div>

                <span class="status">
                    Chờ duyệt
                </span>

            </div>


            <div>

                <button
                    class="action-btn"
                >
                    Theo dõi ↗
                </button>

            </div>

        `;


        /* THÊM VÀO TABLE */

        table.appendChild(row);


        /* RESET FORM */

        postForm.reset();


        /* ĐÓNG MODAL */

        closeCreateModal();


        /* THÔNG BÁO */

        alert(
            "Đã thêm tin đăng mới."
        );

    }
);


/* =====================================
   SỬA BẢN NHÁP AI
===================================== */

editDraftBtn.addEventListener(
    "click",
    function() {

        const draft =
            document.querySelector(".draft");


        const newDraft =
            prompt(
                "Chỉnh sửa bản nháp:",
                draft.textContent
            );


        if (
            newDraft !== null &&
            newDraft.trim() !== ""
        ) {

            draft.textContent =
                newDraft;

        }

    }
);


/* =====================================
   DUYỆT & GỬI
===================================== */

sendDraftBtn.addEventListener(
    "click",
    function() {

        const confirmed =
            confirm(
                "Bạn có chắc muốn duyệt và gửi tin nhắn này không?"
            );


        if (!confirmed) {
            return;
        }


        sendDraftBtn.textContent =
            "Đã gửi ✓";


        sendDraftBtn.disabled =
            true;


        sendDraftBtn.style.opacity =
            "0.7";


        alert(
            "Bản nháp đã được duyệt và gửi."
        );

    }
);


/* =====================================
   ĐĂNG XUẤT
===================================== */

logoutBtn.addEventListener(
    "click",
    function() {

        const confirmed =
            confirm(
                "Bạn có chắc muốn đăng xuất không?"
            );


        if (confirmed) {

            alert(
                "Đã đăng xuất."
            );

        }

    }
);


/* =====================================
   MENU BÊN TRÁI
===================================== */

const navItems =
    document.querySelectorAll(
        ".nav-item"
    );


navItems.forEach(
    function(item) {

        item.addEventListener(
            "click",
            function() {


                /* XÓA ACTIVE */

                navItems.forEach(
                    function(nav) {

                        nav.classList.remove(
                            "active"
                        );

                    }
                );


                /* THÊM ACTIVE */

                item.classList.add(
                    "active"
                );


                /* LẤY TÊN MENU */

                const pageName =
                    item
                        .querySelector("span:last-child")
                        .textContent;


                /* TẠM THÔNG BÁO */

                if (
                    pageName !== "Tin đăng"
                ) {

                    alert(
                        "Bạn vừa chọn: " +
                        pageName
                    );

                }

            }
        );

    }
);


/* =====================================
   CÁC BUTTON THAO TÁC
===================================== */

function addActionEvents() {

    const actionButtons =
        document.querySelectorAll(
            ".action-btn"
        );


    actionButtons.forEach(
        function(button) {

            button.addEventListener(
                "click",
                function() {

                    alert(
                        "Chức năng: " +
                        button.textContent.trim()
                    );

                }
            );

        }
    );

}


addActionEvents();