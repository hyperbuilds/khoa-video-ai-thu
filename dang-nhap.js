// Đăng nhập bằng tài khoản Google công ty + đồng bộ tiến độ học về Google Sheet (06/11/2026).
// Chỉ chạy khi cau-hinh.js có google_client_id + may_chu. Không có thì để yên: web chạy như bản offline.
// Luồng: màn đăng nhập → vé Google (ID token) → kiểm tên miền → tải tiến độ đã lưu (học máy nào cũng tiếp được)
//        → mỗi lần ứng dụng lưu (KHOA_DONG_BO) gom 4 giây rồi gửi 1 lần; rời trang thì gửi nốt bằng sendBeacon.
// Máy chủ (may-chu-du-lieu.gs) kiểm lại vé với Google: đúng mã ứng dụng, đúng tên miền, email đã xác minh — mới ghi.
(function () {
  'use strict';
  var C = window.CAU_HINH || {}, APP = window.KHOA_APP;
  if (!C.google_client_id || !C.may_chu || !APP) return;
  var MIEN = (C.mien || '').toLowerCase(), ve = null, nguoi = null, hen = 0, dangGui = false, guiLai = false, chuaGui = false;
  var e = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  // ---------- màn đăng nhập (che nội dung tới khi đăng nhập xong)
  var man = document.createElement('div');
  man.className = 'man-dang-nhap';
  man.innerHTML = '<div class="mdn-the" role="dialog" aria-modal="true" aria-labelledby="mdn-tieu">' +
    '<svg class="mdn-logo" viewBox="0 0 363.18 81.52" aria-label="Hecatech"><use href="#hct-logo"/></svg>' +
    '<span class="nhan">Khoá nền tảng</span><h1 id="mdn-tieu">Làm video bán hàng <em class="ng">bằng AI</em></h1>' +
    '<p>Đăng nhập bằng email công ty <b>@' + e(MIEN) + '</b> để bắt đầu. Tiến độ xem, câu trả lời và điểm kiểm tra được lưu theo tài khoản — học ở máy nào cũng xem tiếp được, người hướng dẫn theo dõi được tiến độ của bạn.</p>' +
    '<div id="mdn-nut" class="mdn-nut"></div><p class="mdn-bao" role="alert" aria-live="polite"></p></div>';
  document.body.appendChild(man);
  document.documentElement.classList.add('chua-dang-nhap');
  var bao = man.querySelector('.mdn-bao');

  function giaiVe(t) { // đọc phần giữa của vé (chỉ để hiện tên; máy chủ mới là nơi kiểm thật)
    var p = t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'); while (p.length % 4) p += '=';
    var b = atob(p), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i);
    return JSON.parse(new TextDecoder().decode(u));
  }
  function nhanVe(r) {
    var p; try { p = giaiVe(r.credential); } catch (x) { bao.textContent = 'Không đọc được thông tin đăng nhập. Thử lại nhé.'; return; }
    var email = String(p.email || '').toLowerCase();
    if (MIEN && (p.hd || '').toLowerCase() !== MIEN && email.slice(-MIEN.length - 1) !== '@' + MIEN) {
      bao.textContent = 'Email ' + email + ' không phải email công ty. Hãy đăng nhập bằng email @' + MIEN + '.';
      try { google.accounts.id.disableAutoSelect(); } catch (x2) {}
      return;
    }
    ve = r.credential; var lanDau = !nguoi;
    nguoi = { email: email, ten: p.name || email, anh: p.picture || '' };
    if (lanDau) vaoHoc(); else if (guiLai) { guiLai = false; gui(); }
  }

  // ---------- gọi máy chủ: thân là chữ thường (text/plain) để trình duyệt không hỏi trước (CORS) — Apps Script nhận được
  function goi(loai, them) {
    var than = Object.assign({ loai: loai, token: ve }, them || {});
    return fetch(C.may_chu, { method: 'POST', body: JSON.stringify(than) }).then(function (r) { return r.json(); });
  }
  function vaoHoc() {
    document.documentElement.classList.remove('chua-dang-nhap'); man.remove();
    APP.datTen(nguoi.ten);
    veChip('dang-tai');
    goi('tai').then(function (kq) {
      if (kq && kq.ok) { if (kq.du_lieu) APP.ganDuLieu(kq.du_lieu); veChip('da-luu'); if (chuaGui) gui(); }
      else if (kq && kq.loi === 've') lamMoiVe(); else veChip('loi');
    }).catch(function () { veChip('loi'); });
  }

  // ---------- gửi tiến độ: gom các lần lưu gần nhau thành 1 lần gửi
  function gui() {
    if (!ve) { chuaGui = true; return; }
    if (dangGui) { chuaGui = true; return; }
    dangGui = true; chuaGui = false; veChip('dang-luu');
    goi('luu', { du_lieu: APP.duLieu(), tom_tat: APP.tomTat() }).then(function (kq) {
      dangGui = false;
      if (kq && kq.ok) { veChip('da-luu'); if (chuaGui) gui(); }
      else if (kq && kq.loi === 've') { guiLai = true; lamMoiVe(); }
      else veChip('loi');
    }).catch(function () { dangGui = false; veChip('loi'); });
  }
  window.KHOA_DONG_BO = function () { clearTimeout(hen); hen = setTimeout(gui, 4000); };
  // rời trang: gửi nốt phần chưa gửi (không chờ trả lời)
  window.addEventListener('pagehide', function () {
    if (!ve || !hen) return; clearTimeout(hen); hen = 0;
    try { navigator.sendBeacon(C.may_chu, new Blob([JSON.stringify({ loai: 'luu', token: ve, du_lieu: APP.duLieu(), tom_tat: APP.tomTat() })], { type: 'text/plain' })); } catch (x) {}
  });
  // vé Google sống khoảng 1 giờ: hết hạn thì xin vé mới (thường tự qua, không phải bấm lại)
  function lamMoiVe() { veChip('het-han'); try { google.accounts.id.prompt(); } catch (x) {} }

  // ---------- ô tài khoản trên thanh đầu: tên, trạng thái lưu, đăng xuất
  var TT = { 'dang-tai': 'Đang tải tiến độ…', 'dang-luu': 'Đang lưu…', 'da-luu': 'Đã lưu tiến độ', 'loi': 'Chưa lưu được — sẽ thử lại', 'het-han': 'Bấm để đăng nhập lại' };
  function veChip(tt) {
    var dau = document.querySelector('.dau'); if (!dau || !nguoi) return;
    var c = dau.querySelector('.tai-khoan');
    if (!c) {
      c = document.createElement('div'); c.className = 'tai-khoan';
      c.innerHTML = (nguoi.anh ? '<img alt="" referrerpolicy="no-referrer">' : '<i aria-hidden="true"></i>') + '<span><b></b><small></small></span><button type="button" class="nut vuong" aria-label="Đăng xuất" title="Đăng xuất">⎋</button>';
      var img = c.querySelector('img'); if (img) img.src = nguoi.anh; else c.querySelector('i').textContent = (nguoi.ten || '?').trim().charAt(0).toUpperCase();
      c.querySelector('b').textContent = nguoi.ten;
      c.querySelector('button').addEventListener('click', dangXuat);
      c.querySelector('small').addEventListener('click', function () { if (c.getAttribute('data-tt') === 'het-han') lamMoiVe(); else if (c.getAttribute('data-tt') === 'loi') gui(); });
      var gy = dau.querySelector('#nut-gop-y'); dau.insertBefore(c, gy);
    }
    c.setAttribute('data-tt', tt); c.querySelector('small').textContent = TT[tt] || '';
  }
  function dangXuat() {
    if (hen) { clearTimeout(hen); hen = 0; gui(); }
    try { google.accounts.id.disableAutoSelect(); } catch (x) {}
    setTimeout(function () { location.reload(); }, 600);
  }

  // ---------- nạp thư viện đăng nhập của Google, vẽ nút
  var s = document.createElement('script'); s.src = 'https://accounts.google.com/gsi/client'; s.async = true; s.defer = true;
  s.onload = function () {
    google.accounts.id.initialize({ client_id: C.google_client_id, callback: nhanVe, auto_select: true, hd: MIEN || undefined, itp_support: true, use_fedcm_for_prompt: true });
    google.accounts.id.renderButton(document.getElementById('mdn-nut'), { theme: 'outline', size: 'large', shape: 'pill', text: 'signin_with', locale: 'vi', logo_alignment: 'left' });
    google.accounts.id.prompt();
  };
  s.onerror = function () { bao.textContent = 'Không tải được nút đăng nhập Google. Kiểm tra mạng rồi tải lại trang.'; };
  document.head.appendChild(s);
})();
