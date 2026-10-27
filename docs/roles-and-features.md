BTL-17 – HomeFit AI: Roles and Features
Học phần: PHÁT TRIỂN ỨNG DỤNG WEB CƠ BẢN – CSE122
Sản phẩm: HomeFit AI – Khám phá nhà ở theo nhu cầu sống
Loại sản phẩm: Frontend prototype có nhiều vai trò, CRUD, responsive, JavaScript và trải nghiệm AI.
1. Mục tiêu sản phẩm
HomeFit AI hỗ trợ người dùng tìm nhà phù hợp với nhu cầu sống, giúp môi giới quản lý tin đăng và khách hàng, đồng thời cung cấp quy trình kiểm duyệt và quản trị nền tảng.

Sản phẩm tập trung giải quyết:
- Bộ lọc truyền thống chưa thể hiện đầy đủ nhu cầu mềm như gần nơi làm việc, yên tĩnh, không gian xanh hoặc phù hợp với gia đình.
- Môi giới cần quản lý tin đăng và thông tin khách hàng có hệ thống.
- Người dùng cần so sánh nhiều bất động sản theo tiêu chí cá nhân.
- Tin đăng và báo cáo cần có quy trình kiểm duyệt, xử lý và lưu vết.
2. Các vai trò
Vai trò	Mục tiêu	Nhiệm vụ chính
Người tìm nhà	Tìm nhà phù hợp và đưa ra quyết định	Tìm kiếm, lọc, xem chi tiết, lưu nhà, so sánh, nhập nhu cầu sống và nhận gợi ý AI
Môi giới	Quản lý tin đăng và khách hàng	Theo dõi tin, tạo/sửa tin, cập nhật trạng thái, quản lý khách hàng tiềm năng
Kiểm duyệt viên	Duy trì chất lượng tin đăng và xử lý vi phạm	Duyệt/từ chối tin, xử lý báo cáo, ghi nhật ký quyết định
Quản trị viên	Quản lý dữ liệu nền tảng và quyền truy cập	Quản lý danh mục, tài khoản và phân quyền


3. Danh sách task và người phụ trách
Phân công theo bảng Trello hiện tại, không chia thành các nhóm chỉ làm HTML, CSS hoặc JavaScript. Mỗi thành viên chịu trách nhiệm hoàn thiện toàn bộ lát cắt dọc của task được giao.
Task	Tên task	Người phụ trách chính	Phạm vi
TASK-01	Xây dựng trang đăng nhập	Tô Minh Toàn	Form đăng nhập, kiểm tra dữ liệu, phản hồi lỗi/thành công
TASK-02	Giao diện đăng ký	Tô Minh Toàn	Form đăng ký, xác thực trường nhập, lưu dữ liệu mô phỏng
TASK-03	Trang tìm nhà của người dùng	Tô Minh Toàn	Hiển thị danh sách nhà và điều hướng
TASK-04	Chức năng tìm kiếm/lọc nhà	Tô Minh Toàn	Tìm kiếm, lọc, sắp xếp và trạng thái kết quả rỗng
TASK-05	Nhà đã lưu	Tô Minh Toàn	Thêm/bỏ lưu, hiển thị danh sách và số lượng
TASK-06	So sánh nhà	Tô Minh Toàn	Chọn nhà, so sánh tiêu chí, bỏ nhà khỏi bảng so sánh
TASK-07	AI hỗ trợ	Tô Minh Toàn	Lifestyle Matcher: nhập brief, xử lý mô phỏng, kết quả có giải thích và thao tác tiếp theo
TASK-08	404 Not Found	Tô Minh Toàn	Trang lỗi, điều hướng về trang phù hợp
TASK-09	Trang thông tin tài khoản	Trần Văn Tỉnh	Hiển thị/cập nhật thông tin tài khoản phù hợp với vai trò
TASK-10	Quản lý tin đăng môi giới	Trần Văn Tỉnh	Danh sách tin, tìm/lọc, trạng thái tin
TASK-11	Quản lý khách hàng	Trần Văn Tỉnh	Danh sách lead, xem/cập nhật trạng thái và thông tin
TASK-12	Tạo và sửa tin đăng	Trần Văn Tỉnh	Form tạo/sửa tin, validation, lưu dữ liệu mô phỏng
TASK-13	Duyệt tin	Trần Văn Tỉnh phối hợp Nguyễn Minh Trường	Giao diện hàng đợi và thao tác duyệt/từ chối; thống nhất trạng thái với phần kiểm duyệt
TASK-14	Xử lý báo cáo	Nguyễn Minh Trường	Danh sách báo cáo, xem chi tiết, cập nhật trạng thái xử lý
TASK-15	Nhật ký xử lý	Nguyễn Minh Trường	Hiển thị lịch sử thao tác/quyết định kiểm duyệt
TASK-16	Quản lý danh mục	Nguyễn Minh Trường	CRUD danh mục/taxonomy bằng dữ liệu mô phỏng
TASK-17	Quản lý tài khoản	Nguyễn Minh Trường	Danh sách tài khoản, tìm/lọc, cập nhật trạng thái phù hợp
TASK-18	Phân quyền	Nguyễn Minh Trường	Gán vai trò mô phỏng và hiển thị quyền tương ứng


Quy ước: Toàn phụ trách TASK-01 đến TASK-08; Tỉnh phụ trách TASK-09 đến TASK-13; Trường phụ trách TASK-14 đến TASK-18. TASK-13 có phối hợp nghiệp vụ với Trường nhưng Tỉnh là người chịu trách nhiệm chính theo Trello.
4. Các tính năng AI
AI-1: Lifestyle Matcher
- Người phụ trách: Toàn.
- Đầu vào: Ngân sách, diện tích/phòng ngủ và nhu cầu mềm như gần nơi làm việc, không gian xanh, yên tĩnh hoặc phù hợp thú cưng.
- Luồng: Nhập dữ liệu → kiểm tra hợp lệ → trạng thái đang xử lý → danh sách gợi ý → điểm phù hợp và lý do → người dùng lưu, sửa hoặc tạo lại.
- Cách triển khai: JavaScript theo quy tắc và dữ liệu JSON/mock; không tuyên bố là AI API thật nếu không tích hợp API.
AI-2: Listing Summary
- Người phụ trách đề xuất: Tỉnh, tích hợp trong luồng quản lý/tạo tin đăng.
- Đầu vào: Nội dung mô tả tin đăng.
- Đầu ra: Tóm tắt, ưu điểm, điểm cần bổ sung/cảnh báo nội dung.
- Luồng: Nhập nội dung → xử lý mô phỏng → hiển thị kết quả và giải thích → môi giới chấp nhận/chỉnh sửa/bỏ qua.
- Cách triển khai: Mẫu phản hồi hoặc quy tắc JavaScript; ghi rõ là mock nếu không gọi dịch vụ AI thật.
AI-3: Comparison Assistant
- Người phụ trách đề xuất: Toàn, trong màn hình so sánh nhà.
- Đầu vào: Các bất động sản đã chọn và mức độ ưu tiên tiêu chí.
- Đầu ra: Xếp hạng theo tiêu chí, ưu/nhược điểm và lý do.
- Luồng: Chọn nhà/tiêu chí → xử lý mô phỏng → kết quả xếp hạng → người dùng xem giải thích, đổi tiêu chí hoặc lưu lựa chọn.
- Cách triển khai: Tính điểm bằng JavaScript dựa trên dữ liệu mock.
5. Quy tắc CRUD và trạng thái
- C: Tạo dữ liệu.
- R: Đọc/xem dữ liệu.
- U: Cập nhật dữ liệu.
- D: Xóa; có thể thay bằng hủy, lưu trữ hoặc vô hiệu hóa nếu hợp lý với nghiệp vụ.
Mỗi màn hình phải có các trạng thái phù hợp: bình thường, rỗng, thành công, lỗi, đang xử lý/đang tải, vô hiệu hóa, đang chờ, bị từ chối hoặc hoàn thành. Không bắt buộc mọi trang có tất cả trạng thái.
6. Dữ liệu mô phỏng
Các thực thể khuyến nghị:
- properties
- briefs
- savedProperties
- leads
- viewings
- reports
- users
- categories
Có thể dùng JSON cục bộ và localStorage/sessionStorage. Dữ liệu dùng chung giữa các trang cần thống nhất tên trường và cấu trúc.
7. Điều kiện hoàn thành task
Một task chỉ được coi là hoàn thành khi các mục phù hợp đã được kiểm tra:
- HTML đúng cấu trúc và liên kết CSS/JS chính xác.
- Giao diện nhất quán, có responsive desktop và màn hình nhỏ.
- JavaScript có tương tác thực tế, không chỉ là nút trang trí.
- Form có kiểm tra hợp lệ khi cần.
- Dữ liệu mock và trạng thái rỗng/lỗi/thành công phù hợp.
- Đã chạy thử luồng chính.
- Đã commit lên nhánh phù hợp, tạo PR và được duyệt/merge theo quy trình nhóm.
- Đã cập nhật tài liệu/bảng kiểm kê và ghi hình OBS theo yêu cầu môn học.