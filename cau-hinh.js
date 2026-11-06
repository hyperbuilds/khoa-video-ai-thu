// Cấu hình bản web online (06/11/2026). Để TRỐNG = chạy không đăng nhập, tiến độ chỉ lưu trên máy người học (bản thử / bản offline).
// Điền đủ 2 ô = bắt đăng nhập Google bằng email công ty, tiến độ + bài làm gửi về Google Sheet qua máy chủ Apps Script.
window.CAU_HINH = {
  // Mã OAuth Client ID loại "Web application" (Google Cloud Console), có nguồn được phép = địa chỉ web này
  google_client_id: '',
  // Địa chỉ Apps Script web app đã triển khai (kết thúc bằng /exec) — mã máy chủ ở may-chu-du-lieu.gs
  may_chu: '',
  // Chỉ nhận email thuộc tên miền này
  mien: 'hecatech.vn'
};
