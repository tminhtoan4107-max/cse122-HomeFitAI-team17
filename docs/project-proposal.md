BTL-17 – HomeFit AI: Khám phá nhà ở theo nhu cầu sống
Học phần: Phát triển ứng dụng Web cơ bản – CSE122
Nhóm thực hiện: 3 sinh viên
Loại sản phẩm: Web Frontend prototype có nhiều vai trò, CRUD mô phỏng, responsive, tương tác JavaScript và trải nghiệm AI.
Lưu ý: Đây là đề xuất/phạm vi dự án theo tài liệu yêu cầu. Chỉ đánh dấu tính năng là hoàn thành khi đã triển khai và kiểm thử thực tế.

1. Lĩnh vực
Bất động sản / PropTech.
2. Tóm tắt sản phẩm
HomeFit AI – Khám phá nhà ở theo nhu cầu sống là nguyên mẫu website hỗ trợ người dùng tìm nhà dựa trên nhu cầu sống, đồng thời hỗ trợ môi giới quản lý tin đăng và khách hàng tiềm năng, kiểm duyệt viên kiểm tra chất lượng tin đăng và quản trị viên quản lý danh mục, tài khoản.

Sản phẩm hướng đến việc mô phỏng các luồng nghiệp vụ từ đầu đến cuối bằng HTML, CSS và JavaScript. Dữ liệu có thể được cung cấp bằng JSON giả lập, LocalStorage, MockAPI hoặc API phù hợp. Không bắt buộc phải có máy chủ thật.
3. Bối cảnh và vấn đề
Bộ lọc truyền thống như giá và diện tích chưa thể hiện đầy đủ nhu cầu mềm của người tìm nhà, ví dụ: gần trường học, yên tĩnh, có chỗ làm việc hoặc phù hợp với gia đình. Môi giới có thể nhận yêu cầu tìm nhà ở dạng không có cấu trúc; người dùng cũng khó so sánh nhiều tin đăng, trong khi tin đăng cần được kiểm duyệt về chất lượng.

Các vấn đề chính:
- P1: Nhu cầu sống khó biểu diễn bằng bộ lọc truyền thống.
- P2: Môi giới nhận brief không có cấu trúc.
- P3: Khó so sánh nhiều tin đăng.
- P4: Tin đăng cần được kiểm duyệt chất lượng.
4. Mục tiêu
- O1: Biến bài toán thực tế thành sản phẩm Frontend có hành trình người dùng rõ ràng.
- O2: Thiết kế giao diện cho từng vai trò; mỗi vai trò có ít nhất 3 màn hình, đồng thời bảo đảm đủ màn hình cho các luồng nghiệp vụ cần thiết.
- O3: Mô phỏng thao tác CRUD hoặc trạng thái nghiệp vụ có ý nghĩa.
- O4: Dùng JavaScript/DOM cho tìm kiếm, lọc, kiểm tra hợp lệ, cửa sổ bật, thẻ, trạng thái và kết xuất dữ liệu.
- O5: Dùng JSON giả lập, LocalStorage, MockAPI hoặc API công khai khi phù hợp.
- O6: Có ít nhất 3 trải nghiệm AI có thể mô phỏng ở Frontend.
- O7: Tổ chức làm việc nhóm bằng Trello/Jira/Notion và Git/GitHub theo nhánh, pull request và đánh giá chéo.
5. Người dùng và hành trình tổng quát
Bốn vai trò chính:
1. Người tìm nhà: tìm kiếm, lưu và so sánh bất động sản.
2. Môi giới: quản lý tin đăng và khách hàng tiềm năng.
3. Kiểm duyệt viên: duyệt tin đăng và xử lý báo cáo.
4. Quản trị viên: quản lý taxonomy/danh mục và tài khoản.
Hành trình tổng quát:
Khám phá / đăng nhập
        ↓
Thực hiện nghiệp vụ chính theo vai trò
        ↓
Xem trạng thái / dữ liệu / phản hồi
        ↓
AI hỗ trợ phân tích hoặc gợi ý
        ↓
Chấp nhận / Sửa / Từ chối / Lưu
        ↓
Vai trò vận hành duyệt / xử lý
        ↓
Bảng điều khiển / báo cáo / hoàn tất
6. Phạm vi và nguyên tắc
- Ưu tiên độ đầy đủ của nghiệp vụ hơn số lượng giao diện.
- Lập bảng kiểm kê màn hình, luồng người dùng và thiết kế Figma/Canva để được duyệt trước khi triển khai code chính thức.
- Xem xét các trạng thái phù hợp: bình thường, đang tải, rỗng, thành công, lỗi, vô hiệu hóa, đang chờ, bị từ chối, hoàn thành, đã hủy hoặc lưu trữ.
- Mỗi màn hình cần có bố cục phù hợp, responsive, ít nhất một tương tác JavaScript có ý nghĩa và dữ liệu giả lập/API khi cần.
- Với tính năng AI, cần có luồng nhập dữ liệu, xử lý, kết quả, giải thích và quyền kiểm soát của người dùng.
- Mỗi sinh viên cần hoàn thành ít nhất một lát cắt dọc end-to-end: thiết kế → HTML → CSS → JavaScript → dữ liệu → responsive → Git → pull request → OBS.
7. Trải nghiệm AI dự kiến
- Lifestyle Matcher: chấm điểm mức phù hợp của bất động sản theo housing brief.
- Listing Summary: tóm tắt ưu điểm và nhược điểm của tin đăng.
- Comparison Assistant: xếp hạng các lựa chọn theo tiêu chí cá nhân.
Có thể mô phỏng bằng JSON, JavaScript theo quy tắc hoặc phản hồi định sẵn; gọi LLM API là tùy chọn. Khi AI không đủ dữ liệu hoặc không xử lý được, giao diện cần báo trạng thái phù hợp và cho phép người dùng sửa, thử lại, bỏ qua hoặc thao tác thủ công.
8. Công nghệ và dữ liệu dự kiến
- Frontend: HTML, CSS, JavaScript.
- Dữ liệu: JSON cục bộ, LocalStorage/SessionStorage, JSON Server, MockAPI hoặc public API.
- Thiết kế: Figma hoặc Canva.
- Quản lý mã nguồn: Git và GitHub.
- Quản lý công việc: Trello, Jira hoặc Notion.
- Minh chứng: video OBS cho từng giao diện đã được duyệt.
Các thực thể dữ liệu tối thiểu: properties, briefs, savedProperties, leads, viewings, reports.
9. Tiêu chí hoàn thành dự án
Cần có minh chứng xuyên suốt từ bối cảnh, vấn đề, mục tiêu, vai trò, màn hình, bản mô phỏng, công việc, nhánh, commit, pull request, OBS đến sản phẩm thực tế. Bảng kiểm kê màn hình cuối cùng quyết định số giao diện và số video cần nộp; không mặc định chỉ cần 12 giao diện.
10. Thông tin nhóm cần bổ sung
- Tên trường/lớp/giảng viên: Đại học Thủy Lợi / 67CNTT2 / Tạ Chí Hiếu
- Tên và mã sinh viên của các thành viên:
  SV01:Tô Minh Toàn - 2551060701
  SV02:Trần Văn Tỉnh - 2551060698
  SV03:Nguyễn Minh Trường - 2551060704
- Repository GitHub: https://github.com/tminhtoan4107-max/cse122-HomeFitAI-team17
- Bảng công việc Trello/Jira/Notion: https://trello.com/invite/b/6acb6845e88831b33ba6c851/ATTI46a68f65dc1a8fb5a04988185c0a118bB713A5EC/homefit-ai-team-17
- Thiết kế Figma/Canva: https://www.figma.com/design/23gRuPqABQIWU68kh21JP5/CSE122-BTL17_HOMEFIT-AI-Nh%C3%B3m-17?node-id=0-1&t=vQAkDPS8YulLfTig-1
- Tình trạng triển khai và kết quả kiểm thử thực tế: Tạm ồn nhưng còn nhiều tính năng cần khắc phục