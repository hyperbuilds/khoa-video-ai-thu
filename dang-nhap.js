// Đăng nhập bằng tài khoản Google công ty + đồng bộ tiến độ học về Google Sheet (06/11/2026).
// Chỉ chạy khi cau-hinh.js có google_client_id + may_chu. Không có thì để yên: web chạy như bản offline.
// Luồng: màn đăng nhập → vé Google (ID token) → kiểm tên miền → tải tiến độ đã lưu (học máy nào cũng tiếp được)
//        → mỗi lần ứng dụng lưu (KHOA_DONG_BO) gom 4 giây rồi gửi 1 lần; rời trang thì gửi nốt bằng sendBeacon.
// Máy chủ (may-chu-du-lieu.gs) kiểm lại vé với Google: đúng mã ứng dụng, đúng tên miền, email đã xác minh — mới ghi.
// NHỚ ĐĂNG NHẬP (06/11, user: "cho web nhớ mật khẩu"): đăng nhập Google xong máy chủ cấp PHIÊN 30 ngày (lưu localStorage 'khoa-phien');
//   lần sau mở web là vào thẳng, không hiện màn đăng nhập. Phiên tự gia hạn khi còn dưới 7 ngày. Đăng xuất = xoá phiên trên máy này.
// QUẢN TRỊ: máy chủ báo quan_tri → hiện nút "Quản trị" trên thanh đầu (trang do quan-tri.js vẽ; máy chủ kiểm quyền mỗi lần gọi).
(function () {
  'use strict';
  var C = window.CAU_HINH || {}, APP = window.KHOA_APP;
  if (!C.google_client_id || !C.may_chu || !APP) return;
  var MIEN = (C.mien || '').toLowerCase(), KHO_PHIEN = 'khoa-phien';
  var ve = null, phien = null, nguoi = null, quanTri = false, daVao = false, daTai = false, hen = 0, dangGui = false, guiLai = false, chuaGui = false;
  var man = null, bao = null, gisNap = false;
  var e = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  // ---------- phiên nhớ đăng nhập
  function docPhien() { try { var p = JSON.parse(localStorage.getItem(KHO_PHIEN) || 'null'); if (p && p.phien && +p.het > Date.now() + 60000 && p.email) return p; } catch (x) {} return null; }
  function luuPhien(kq) {
    if (!kq || !kq.phien || !nguoi) return; phien = kq.phien;
    try { localStorage.setItem(KHO_PHIEN, JSON.stringify({ phien: kq.phien, het: kq.het, email: nguoi.email, ten: nguoi.ten, anh: nguoi.anh, quan_tri: !!kq.quan_tri })); } catch (x) {}
  }
  function boPhien() { phien = null; try { localStorage.removeItem(KHO_PHIEN); } catch (x) {} }

  // ---------- màn đăng nhập (chỉ hiện khi chưa có phiên còn hạn)
  function moManDangNhap(loiNhan) {
    if (!man) {
      man = document.createElement('div');
      man.className = 'man-dang-nhap';
      man.innerHTML = '<div class="mdn-the" role="dialog" aria-modal="true" aria-labelledby="mdn-tieu">' +
        '<svg class="mdn-logo" viewBox="0 0 363.18 81.52" aria-label="Hecatech"><use href="#hct-logo"/></svg>' +
        '<span class="nhan">Khoá nền tảng</span><h1 id="mdn-tieu">Làm video bán hàng <em class="ng">bằng AI</em></h1>' +
        '<p>Đăng nhập bằng email công ty <b>@' + e(MIEN) + '</b> để bắt đầu. Tiến độ xem, câu trả lời và điểm kiểm tra được lưu theo tài khoản — học ở máy nào cũng xem tiếp được, người hướng dẫn theo dõi được tiến độ của bạn.</p>' +
        '<div id="mdn-nut" class="mdn-nut"></div><p class="mdn-bao" role="alert" aria-live="polite"></p>' +
        '<p class="mdn-nho">Máy này sẽ nhớ đăng nhập ' + 30 + ' ngày.</p></div>';
      bao = man.querySelector('.mdn-bao');
    }
    if (!man.parentNode) document.body.appendChild(man);
    document.documentElement.classList.add('chua-dang-nhap');
    bao.textContent = loiNhan || '';
    napGIS();
  }
  function napGIS() {
    if (gisNap) { veNut(); return; } gisNap = true;
    var s = document.createElement('script'); s.src = 'https://accounts.google.com/gsi/client'; s.async = true; s.defer = true;
    s.onload = function () {
      google.accounts.id.initialize({ client_id: C.google_client_id, callback: nhanVe, auto_select: true, hd: MIEN || undefined, itp_support: true, use_fedcm_for_prompt: true });
      veNut(); google.accounts.id.prompt();
    };
    s.onerror = function () { if (bao) bao.textContent = 'Không tải được nút đăng nhập Google. Kiểm tra mạng rồi tải lại trang.'; };
    document.head.appendChild(s);
  }
  function veNut() { var o = document.getElementById('mdn-nut'); if (o && window.google && google.accounts && !o.childElementCount) google.accounts.id.renderButton(o, { theme: 'outline', size: 'large', shape: 'pill', text: 'signin_with', locale: 'vi', logo_alignment: 'left' }); }

  function giaiVe(t) { // đọc phần giữa của vé (chỉ để hiện tên; máy chủ mới là nơi kiểm thật)
    var p = t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'); while (p.length % 4) p += '=';
    var b = atob(p), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i);
    return JSON.parse(new TextDecoder().decode(u));
  }
  function nhanVe(r) {
    var p; try { p = giaiVe(r.credential); } catch (x) { if (bao) bao.textContent = 'Không đọc được thông tin đăng nhập. Thử lại nhé.'; return; }
    var email = String(p.email || '').toLowerCase();
    if (MIEN && (p.hd || '').toLowerCase() !== MIEN && email.slice(-MIEN.length - 1) !== '@' + MIEN) {
      if (bao) bao.textContent = 'Email ' + email + ' không phải email công ty. Hãy đăng nhập bằng email @' + MIEN + '.';
      try { google.accounts.id.disableAutoSelect(); } catch (x2) {}
      return;
    }
    ve = r.credential; phien = null; // vé mới: lần gọi tới đi bằng vé Google, máy chủ trả phiên mới
    nguoi = { email: email, ten: p.name || email, anh: p.picture || '' };
    if (!daVao || !daTai) vaoHoc(); else { dongMan(); if (guiLai) { guiLai = false; gui(); } }
  }
  function dongMan() { document.documentElement.classList.remove('chua-dang-nhap'); if (man && man.parentNode) man.remove(); }

  // ---------- gọi máy chủ: thân là chữ thường (text/plain) để trình duyệt không hỏi trước (CORS) — Apps Script nhận được
  function goi(loai, them) {
    var than = Object.assign({ loai: loai }, phien ? { phien: phien } : { token: ve }, them || {});
    return fetch(C.may_chu, { method: 'POST', body: JSON.stringify(than) }).then(function (r) { return r.json(); }).then(function (kq) {
      if (kq && kq.phien) luuPhien(kq);
      if (kq && typeof kq.quan_tri === 'boolean') datQuanTri(kq.quan_tri);
      if (kq && (kq.loi === 'phien' || kq.loi === 've')) hetPhien();
      return kq;
    });
  }
  // phiên / vé không còn dùng được → đăng nhập lại (giữ nguyên bài đang học trên máy, đăng nhập xong gửi tiếp)
  function hetPhien() { boPhien(); ve = null; guiLai = true; veChip('het-han'); moManDangNhap('Phiên đăng nhập đã hết hạn — đăng nhập lại để tiếp tục lưu tiến độ.'); }
  function vaoHoc() {
    daVao = true; dongMan();
    APP.datTen(nguoi.ten);
    veChip('dang-tai');
    goi('tai').then(function (kq) {
      if (kq && kq.ok) { daTai = true; if (kq.du_lieu) APP.ganDuLieu(kq.du_lieu); veChip('da-luu'); if (chuaGui || guiLai) { guiLai = false; gui(); } }
      else if (!(kq && (kq.loi === 'phien' || kq.loi === 've'))) veChip('loi');
    }).catch(function () { veChip('loi'); });
  }

  // ---------- gửi tiến độ: gom các lần lưu gần nhau thành 1 lần gửi
  function gui() {
    if ((!ve && !phien) || !daTai) { chuaGui = true; return; } // chưa tải bản trên máy chủ về thì chưa gửi (tránh đè tiến độ học ở máy khác)
    if (dangGui) { chuaGui = true; return; }
    dangGui = true; chuaGui = false; veChip('dang-luu');
    goi('luu', { du_lieu: APP.duLieu(), tom_tat: APP.tomTat() }).then(function (kq) {
      dangGui = false;
      if (kq && kq.ok) { veChip('da-luu'); if (chuaGui) gui(); }
      else if (!(kq && (kq.loi === 'phien' || kq.loi === 've'))) veChip('loi');
    }).catch(function () { dangGui = false; veChip('loi'); });
  }
  window.KHOA_DONG_BO = function () { clearTimeout(hen); hen = setTimeout(gui, 4000); };
  // rời trang: gửi nốt phần chưa gửi (không chờ trả lời)
  window.addEventListener('pagehide', function () {
    if ((!ve && !phien) || !hen || !daTai) return; clearTimeout(hen); hen = 0;
    var than = Object.assign({ loai: 'luu', du_lieu: APP.duLieu(), tom_tat: APP.tomTat() }, phien ? { phien: phien } : { token: ve });
    try { navigator.sendBeacon(C.may_chu, new Blob([JSON.stringify(than)], { type: 'text/plain' })); } catch (x) {}
  });

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
      c.querySelector('small').addEventListener('click', function () { if (c.getAttribute('data-tt') === 'het-han') moManDangNhap(); else if (c.getAttribute('data-tt') === 'loi') gui(); });
      var gy = dau.querySelector('#nut-gop-y'); dau.insertBefore(c, gy);
    }
    c.setAttribute('data-tt', tt); c.querySelector('small').textContent = TT[tt] || '';
  }
  // nút Quản trị (chỉ email quản trị — máy chủ vẫn kiểm quyền ở mọi lần gọi trang quản trị)
  function datQuanTri(b) {
    quanTri = !!b;
    var dau = document.querySelector('.dau'); if (!dau) return;
    var n = dau.querySelector('#nut-quan-tri');
    if (quanTri && !n) { n = document.createElement('a'); n.className = 'nut'; n.id = 'nut-quan-tri'; n.href = '#/quan-tri'; n.textContent = 'Quản trị'; dau.insertBefore(n, dau.querySelector('.tai-khoan') || dau.querySelector('#nut-gop-y')); }
    else if (!quanTri && n) n.remove();
    if (/^#\/quan-tri/.test(location.hash) && APP.veLai) APP.veLai();
  }
  function dangXuat() {
    if (hen) { clearTimeout(hen); hen = 0; gui(); }
    boPhien();
    try { google.accounts.id.disableAutoSelect(); } catch (x) {}
    setTimeout(function () { location.hash = '#/'; location.reload(); }, 600);
  }
  window.KHOA_MAY_CHU = { goi: goi, laQuanTri: function () { return quanTri; }, daVao: function () { return daVao; }, nguoi: function () { return nguoi; } };

  // ---------- bắt đầu: có phiên còn hạn → vào thẳng; chưa có → màn đăng nhập Google
  var pc = docPhien();
  if (pc) { phien = pc.phien; nguoi = { email: pc.email, ten: pc.ten || pc.email, anh: pc.anh || '' }; vaoHoc(); datQuanTri(pc.quan_tri); }
  else moManDangNhap();
})();
