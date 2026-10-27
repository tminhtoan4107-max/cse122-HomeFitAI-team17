BTL-17 – HomeFit AI: Team Assignment
1. Thành viên và phạm vi phụ trách
Thành viên	Task	Phạm vi chính	Trách nhiệm xuyên suốt
Tô Minh Toàn	TASK-01 đến TASK-08 (8 task)	Đăng nhập/đăng ký, tìm nhà, tìm kiếm/lọc, nhà đã lưu, so sánh, AI hỗ trợ, 404	Điều hướng phía người tìm nhà, dữ liệu nhà đã lưu/so sánh và AI Lifestyle Matcher
Trần Văn Tỉnh	TASK-09 đến TASK-13 (5 task)	Thông tin tài khoản, quản lý tin đăng, quản lý khách hàng, tạo/sửa tin, giao diện duyệt tin	Luồng môi giới, validation form tin đăng và AI Listing Summary
Nguyễn Minh Trường	TASK-14 đến TASK-18 (5 task)	Xử lý báo cáo, nhật ký xử lý, quản lý danh mục, quản lý tài khoản, phân quyền	Luồng kiểm duyệt/quản trị, tính nhất quán trạng thái và quyền truy cập mô phỏng


2. Danh sách task chi tiết
Tô Minh Toàn — TASK-01 đến TASK-08
1. TASK-01 — Xây dựng trang đăng nhập
   - Tệp dự kiến: pages/dang_nhap.html, CSS/JS tương ứng.
   - Phạm vi: kiểm tra trường bắt buộc, xác thực mô phỏng, thông báo lỗi/thành công và điều hướng theo vai trò đã chọn/lưu.
2. TASK-02 — Giao diện đăng ký
   - Tệp dự kiến: pages/tao_tk.html, CSS/JS tương ứng.
   - Phạm vi: họ tên, số điện thoại/email, mật khẩu, xác nhận mật khẩu, đồng ý điều khoản và kiểm tra hợp lệ.
3. TASK-03 — Trang tìm nhà của người dùng
   - Tệp dự kiến: trang tìm kiếm nhà thuộc pages/ và tài nguyên tương ứng.
   - Phạm vi: danh sách/card nhà, điều hướng đến chức năng liên quan.
4. TASK-04 — Chức năng tìm kiếm/lọc nhà
   - Phạm vi: từ khóa, khu vực, ngân sách, diện tích/phòng ngủ, sắp xếp, đặt lại bộ lọc và thông báo không có kết quả.
5. TASK-05 — Nhà đã lưu
   - Phạm vi: thêm/bỏ lưu, kết xuất danh sách, số lượng, trạng thái rỗng; lưu bằng localStorage nếu phù hợp.
6. TASK-06 — So sánh nhà
   - Phạm vi: chọn/bỏ chọn bất động sản, so sánh tiêu chí, xử lý khi chưa chọn đủ nhà và thao tác xóa khỏi danh sách.
7. TASK-07 — AI hỗ trợ
   - Phạm vi: Lifestyle Matcher; nhập nhu cầu, trạng thái xử lý, kết quả, giải thích và thao tác lưu/sửa/tạo lại.
8. TASK-08 — 404 Not Found
   - Phạm vi: thông báo trang không tồn tại, nút quay về trang phù hợp, responsive.
Trần Văn Tỉnh — TASK-09 đến TASK-13
9. TASK-09 — Trang thông tin tài khoản
   - Phạm vi: hiển thị và cập nhật thông tin cơ bản; kiểm tra dữ liệu nhập.
10. TASK-10 — Quản lý tin đăng môi giới
    - Phạm vi: danh sách tin, tìm/lọc, trạng thái nháp/chờ duyệt/đã duyệt/từ chối nếu được dùng trong prototype.
11. TASK-11 — Quản lý khách hàng
    - Phạm vi: danh sách khách hàng tiềm năng, tìm kiếm, xem thông tin và cập nhật trạng thái liên hệ.
12. TASK-12 — Tạo và sửa tin đăng
    - Phạm vi: form thông tin bất động sản, trường bắt buộc, kiểm tra giá/diện tích, lưu dữ liệu mock và thông báo kết quả.
13. TASK-13 — Duyệt tin
    - Phạm vi chính do Tỉnh triển khai theo Trello; phối hợp với Trường để thống nhất trạng thái tin, lý do từ chối và dữ liệu chuyển sang nhật ký xử lý.
Nguyễn Minh Trường — TASK-14 đến TASK-18
14. TASK-14 — Xử lý báo cáo
    - Phạm vi: danh sách báo cáo, xem nội dung, cập nhật trạng thái và ghi nhận kết quả xử lý.
15. TASK-15 — Nhật ký xử lý
    - Phạm vi: bảng/danh sách lịch sử, người xử lý mô phỏng, thời điểm, hành động và kết quả.
16. TASK-16 — Quản lý danh mục
    - Phạm vi: thêm/xem/sửa/vô hiệu hóa danh mục; kiểm tra dữ liệu trùng hoặc để trống.
17. TASK-17 — Quản lý tài khoản
    - Phạm vi: danh sách tài khoản, tìm/lọc, xem thông tin và cập nhật trạng thái tài khoản.
18. TASK-18 — Phân quyền
    - Phạm vi: gán vai trò Người tìm nhà/Môi giới/Kiểm duyệt viên/Quản trị viên trong prototype; hiển thị quyền tương ứng.
3. Nguyên tắc phối hợp
- Mỗi thành viên làm đầy đủ HTML + CSS + JavaScript + dữ liệu cần thiết cho task của mình; không phân công một người chỉ làm HTML, một người chỉ làm CSS, một người chỉ làm JavaScript.
- TASK-13 có quan hệ nghiệp vụ với TASK-14 và TASK-15. Tỉnh chịu trách nhiệm màn hình duyệt tin; Trường thống nhất cách ghi nhật ký và trạng thái xử lý.
- Toàn và Tỉnh thống nhất cấu trúc dữ liệu properties để tin đăng do môi giới tạo có thể xuất hiện trong khu vực tìm nhà khi cần.
- Toàn thống nhất cấu trúc users/vai trò với Trường để đăng nhập mô phỏng và quản trị tài khoản không dùng các quy ước mâu thuẫn.
- Cả nhóm thống nhất header, điều hướng, tên class CSS, cách thông báo, cấu trúc mock data và đường dẫn tài nguyên trước khi tích hợp.
- Ba tính năng AI là mô phỏng Frontend trừ khi nhóm thật sự tích hợp API; tài liệu và video phải nói đúng mức độ triển khai.
4. Quy trình Git/GitHub
1. Cập nhật dev trước khi tạo nhánh.
2. Tạo nhánh riêng cho task, ví dụ feature/tmtoan, feature/tinhr, feature/minhtruong.
3. Commit theo từng thay đổi có ý nghĩa; không dùng các thông điệp chung chung như update, done, final.
4. Push nhánh lên GitHub và tạo Pull Request vào dev.
5. Thành viên khác kiểm tra đường dẫn, giao diện, responsive, tương tác và xung đột trước khi merge.
6. Chạy thử tích hợp trên dev; chỉ người phụ trách phát hành/được nhóm thống nhất mới merge dev vào main.
7. Không làm trực tiếp trên main; không ghi đè lịch sử hoặc force-push nếu chưa được cả nhóm thống nhất.
Mẫu commit
- feat: add login form validation
- feat: add saved properties interactions
- feat: add listing create and edit form
- feat: add report status management
- fix: correct responsive navigation
- docs: update screen inventory and obs links
5. OBS và bằng chứng hoàn thành
Mỗi giao diện độc lập trong bảng kiểm kê cuối cùng cần video OBS riêng theo yêu cầu giảng viên. Trong video:
- Sinh viên xuất hiện theo yêu cầu môn học.
- Giới thiệu màn hình và luồng nghiệp vụ.
- Mở tệp HTML, CSS và JavaScript liên quan.
- Giải thích một đoạn logic quan trọng.
- Chạy thử ít nhất một tương tác.
- Thực hiện một chỉnh sửa nhỏ trực tiếp.
- Nêu task, nhánh và commit/PR liên quan.
Tên video đề xuất:
- SV1-01-login.mp4
- SV1-02-register.mp4
- SV2-01-listing-management.mp4
- SV3-01-report-center.mp4
Số video cuối cùng được xác định theo số giao diện độc lập đã duyệt, không mặc định bằng 18 task.
6. Định nghĩa hoàn thành
Task được chuyển sang HOÀN THÀNH khi:
- Chức năng chính chạy được và không có lỗi nghiêm trọng.
- Responsive đã được kiểm tra.
- Các trạng thái phù hợp (rỗng, lỗi, thành công, chờ duyệt...) được xử lý.
- Dữ liệu mô phỏng nhất quán với các trang liên quan.
- Commit/PR đã được review và merge vào dev.
- Bảng kiểm kê màn hình/tài liệu và liên kết OBS đã cập nhật.