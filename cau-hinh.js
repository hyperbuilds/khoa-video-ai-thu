// Cấu hình bản web online (06/11/2026). Để TRỐNG = chạy không đăng nhập, tiến độ chỉ lưu trên máy người học (bản thử / bản offline).
// Điền đủ 2 ô = bắt đăng nhập Google bằng email công ty, tiến độ + bài làm gửi về Google Sheet qua máy chủ Apps Script.
window.CAU_HINH = {
  // Mã OAuth Client ID loại "Web application" (Google Cloud Console), có nguồn được phép = địa chỉ web này
  google_client_id: '266100608585-rejj5kl9un5m3h7ufohpdsloc23avdud.apps.googleusercontent.com',
  // Địa chỉ Apps Script web app đã triển khai (kết thúc bằng /exec) — mã máy chủ ở may-chu-du-lieu.gs
  may_chu: 'https://script.google.com/macros/s/AKfycbxffAsQGlKdglINdQt8UDl6ZCL0C4CJVOan-aQk-6gJQZO1KsEmQn-GVnVtsfTbMyX-/exec',
  // Chỉ nhận email thuộc tên miền này
  mien: 'hecatech.vn',
  // Google Sheet chứa dữ liệu (chỉ hiện nút mở ở trang Quản trị; ai mở được Sheet do quyền chia sẻ của Google quyết định)
  sheet: 'https://docs.google.com/spreadsheets/d/1jKx4rV79qk72PmZgTQq_DOGn_uCsNVs4zKfFpll6l94/edit'
};
