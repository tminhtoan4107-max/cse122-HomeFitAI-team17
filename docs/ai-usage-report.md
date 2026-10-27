BTL-17 – HomeFit AI: AI Usage Report
1. Mục đích báo cáo
Tài liệu này ghi nhận việc sử dụng công cụ AI trong quá trình phân tích, thiết kế, lập trình và kiểm thử HomeFit AI. Nội dung phải được cập nhật theo đúng những gì nhóm thực tế đã dùng; không ghi rằng đã dùng API thật nếu sản phẩm chỉ chạy bằng dữ liệu giả lập hoặc quy tắc JavaScript.
2. Công cụ AI sử dụng
Điền tên công cụ thực tế đã dùng:
- Công cụ: Chat GPT
- Mục đích: Hỗ trợ phân tích yêu cầu, gợi ý cấu trúc HTML/CSS/JavaScript, giải thích lỗi, đề xuất dữ liệu mock và xây dựng kịch bản kiểm thử.
- Người sử dụng: Các thành viên trong nhóm theo phần việc được giao.
Không giữ lại mục nào nếu nhóm không sử dụng công cụ tương ứng.
3. Các tính năng AI trong sản phẩm
AI-1 — Lifestyle Matcher
- Task/người phụ trách: TASK-07 — Tô Minh Toàn.
- Mục tiêu: Gợi ý nhà dựa trên ngân sách, diện tích/phòng ngủ và nhu cầu sống như gần nơi làm việc, không gian xanh, yên tĩnh hoặc phù hợp thú cưng.
- Đầu vào: Brief do người dùng nhập/chọn.
- Xử lý: JavaScript chấm điểm theo quy tắc trên dữ liệu bất động sản giả lập.
- Đầu ra: Danh sách gợi ý, điểm phù hợp và lý do giải thích.
- Kiểm soát của người dùng: Có thể sửa tiêu chí, tạo lại kết quả hoặc lưu nhà.
- Trạng thái thất bại cần có: Brief thiếu dữ liệu hoặc không có nhà phù hợp; hiển thị thông báo và cho phép chỉnh sửa tiêu chí.
- Mức độ triển khai: [Mock/JavaScript theo quy tắc/API thật — chọn đúng thực tế].
AI-2 — Listing Summary
- Người phụ trách đề xuất: Trần Văn Tỉnh, gắn với luồng tạo/sửa tin đăng.
- Mục tiêu: Hỗ trợ môi giới tóm tắt mô tả, nêu ưu điểm và chỉ ra thông tin còn thiếu.
- Đầu vào: Nội dung tin đăng.
- Đầu ra: Bản tóm tắt và gợi ý chỉnh sửa.
- Kiểm soát của người dùng: Môi giới có thể chấp nhận, chỉnh sửa hoặc bỏ qua gợi ý.
- Trạng thái thất bại cần có: Nội dung trống/quá ngắn hoặc không đủ thông tin; thông báo rõ giới hạn và cho phép nhập lại.
- Mức độ triển khai: [Mock/JavaScript theo quy tắc/API thật — chọn đúng thực tế].
AI-3 — Comparison Assistant
- Người phụ trách đề xuất: Tô Minh Toàn, gắn với màn hình so sánh nhà.
- Mục tiêu: Xếp hạng nhà theo các tiêu chí cá nhân như giá, diện tích, vị trí và tiện ích.
- Đầu vào: Danh sách nhà được chọn và mức độ ưu tiên tiêu chí.
- Đầu ra: Thứ tự gợi ý, ưu/nhược điểm và giải thích điểm số.
- Kiểm soát của người dùng: Đổi mức ưu tiên, chạy lại hoặc tự quyết định dựa trên bảng so sánh.
- Trạng thái thất bại cần có: Chưa chọn đủ nhà hoặc dữ liệu thiếu; yêu cầu người dùng chọn thêm nhà/điều chỉnh tiêu chí.
- Mức độ triển khai: [Mock/JavaScript theo quy tắc/API thật — chọn đúng thực tế].
4. Prompt tiêu biểu
Chỉ đưa vào báo cáo các prompt nhóm thực sự đã dùng. Có thể ghi theo mẫu:
Prompt phân tích yêu cầu
Phân tích yêu cầu HomeFit AI theo vai trò Người tìm nhà, Môi giới, Kiểm duyệt viên và Quản trị viên. Đề xuất luồng nghiệp vụ, màn hình, trạng thái và CRUD cần có; không tách trang chỉ để tăng số lượng.

Prompt hỗ trợ lập trình
Giải thích và đề xuất cách triển khai tương tác JavaScript cho trang [tên trang] bằng kiến thức phù hợp với sinh viên mới học. Giữ nguyên cấu trúc dự án hiện tại, chỉ rõ tệp cần sửa và cách kiểm tra kết quả.

Prompt hỗ trợ kiểm thử
Lập danh sách trường hợp kiểm thử cho [tên chức năng], gồm trường hợp hợp lệ, dữ liệu rỗng, dữ liệu sai, trạng thái không có kết quả và kích thước màn hình nhỏ.

Lưu ý: Các prompt trên là mẫu tham khảo, không được báo cáo là lịch sử sử dụng thực tế nếu nhóm chưa dùng.
5. Phần AI tạo ra và phần sinh viên tự chỉnh sửa
Hạng mục	AI hỗ trợ	Sinh viên phải tự thực hiện/kiểm tra
Phân tích yêu cầu	Gợi ý vai trò, luồng và trạng thái	Đối chiếu đề bài, chốt phạm vi và phân công
HTML/CSS	Gợi ý cấu trúc và cách trình bày	Kiểm tra ngữ nghĩa, đường dẫn, responsive và tính nhất quán
JavaScript	Gợi ý thuật toán, xử lý sự kiện và validation	Chạy thử, sửa lỗi, giải thích được logic và tự thay đổi khi bảo vệ
Dữ liệu mock	Gợi ý cấu trúc JSON	Kiểm tra dữ liệu giữa các trang và xử lý trường hợp thiếu dữ liệu
Kiểm thử	Gợi ý test case	Tự chạy trên trình duyệt và ghi lại kết quả thật
Tài liệu	Gợi ý cách trình bày	Xác minh mọi thông tin về commit, PR, video và tính năng thực tế


6. Lỗi AI gặp phải và cách kiểm chứng
Ghi lại các lỗi thực tế trong quá trình làm, chẳng hạn:
- Đường dẫn CSS/JS hoặc đường dẫn chuyển trang không khớp cấu trúc thư mục.
- JavaScript tham chiếu ID không tồn tại trong HTML.
- Nút có giao diện nhưng chưa có hành động thực sự.
- Dữ liệu mock giữa các trang dùng tên trường khác nhau.
- Bố cục tràn ngang hoặc chưa phù hợp với điện thoại.
- Kết quả AI mô phỏng chưa có lý do giải thích hoặc trạng thái thất bại.
Với mỗi lỗi, ghi: lỗi quan sát được → nguyên nhân → cách sửa → cách kiểm chứng. Chỉ giữ các lỗi nhóm thực sự gặp phải.
7. Phương pháp kiểm chứng
- Mở trang bằng trình duyệt và chạy từng luồng chính.
- Kiểm tra console để phát hiện lỗi JavaScript.
- Kiểm tra các đường dẫn tương đối đến HTML, CSS, JS, ảnh và dữ liệu.
- Thử dữ liệu hợp lệ, để trống, sai định dạng, danh sách rỗng và thao tác lặp lại.
- Kiểm tra responsive bằng công cụ thiết bị của trình duyệt.
- Đối chiếu giao diện và hành vi với bảng kiểm kê màn hình.
- Review thay đổi qua Pull Request trước khi merge.
- Quay OBS, trình bày được logic và thực hiện một chỉnh sửa trực tiếp.
8. Phân biệt mock và API thật
Tính năng	Cách triển khai dự kiến	Cách ghi trong báo cáo
Lifestyle Matcher	JavaScript + dữ liệu nhà giả lập	AI mô phỏng theo quy tắc, không phải API LLM thật
Listing Summary	Mẫu phản hồi hoặc quy tắc JavaScript, trừ khi có tích hợp API	Ghi rõ mock hoặc API thật theo phiên bản thực tế
Comparison Assistant	Chấm điểm theo trọng số trên dữ liệu mock	Trợ lý so sánh mô phỏng bằng thuật toán phía Frontend


Nếu nhóm tích hợp API thật, hãy ghi tên dịch vụ, phần dữ liệu gửi/nhận, cách bảo vệ khóa API và cách xử lý lỗi. Không đưa khóa bí mật vào GitHub.
9. Điều nhóm học được
Cập nhật sau khi hoàn thành:
- AI có thể tăng tốc việc phân tích và gợi ý mã nhưng kết quả phải được kiểm chứng.
- Sinh viên cần hiểu mã mình nộp, không chỉ sao chép đầu ra.
- Giao diện AI cần có đầu vào, trạng thái xử lý, kết quả, giải thích và quyền kiểm soát của người dùng.
- Các chức năng quan trọng phải xử lý dữ liệu thiếu, kết quả rỗng và lỗi.
- Báo cáo cần phân biệt rõ tính năng mô phỏng với dịch vụ AI/API thật.
10. Xác nhận của nhóm
Trước khi nộp, nhóm rà soát và cập nhật:
- [ ] Tên công cụ và prompt phản ánh đúng việc đã sử dụng.
- [ ] Các phần AI tạo ra và phần sinh viên chỉnh sửa được mô tả trung thực.
- [ ] Lỗi và cách kiểm chứng là các trường hợp thực tế.
- [ ] Mức độ mock/API thật khớp với mã nguồn hiện tại.
- [ ] Không có API key, mật khẩu hoặc dữ liệu cá nhân nhạy cảm trong tài liệu.