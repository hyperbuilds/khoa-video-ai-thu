// Đăng nhập bằng tài khoản Google công ty + đồng bộ tiến độ học về Google Sheet (06/11/2026).
// Chỉ chạy khi cau-hinh.js có google_client_id + may_chu. Không có thì để yên: web chạy như bản offline.
// Luồng: màn đăng nhập → vé Google (ID token) → kiểm tên miền → tải tiến độ đã lưu (học máy nào cũng tiếp được)
//        → mỗi lần ứng dụng lưu (KHOA_DONG_BO) gom 4 giây rồi gửi 1 lần; rời trang thì gửi nốt bằng sendBeacon.
// Máy chủ (may-chu-du-lieu.gs) kiểm lại vé với Google: đúng mã ứng dụng, đúng tên miền, email đã xác minh — mới ghi.
// NHỚ ĐĂNG NHẬP (06/11, user: "cho web nhớ mật khẩu"): đăng nhập Google xong máy chủ cấp PHIÊN 30 ngày (lưu localStorage 'khoa-phien');
//   lần sau mở web là vào thẳng, không hiện màn đăng nhập. Phiên tự gia hạn khi còn dưới 7 ngày. Đăng xuất = xoá phiên trên máy này.
// QUẢN TRỊ: máy chủ báo quan_tri → hiện nút "Quản trị" trên thanh đầu (trang do quan-tri.js vẽ; máy chủ kiểm quyền mỗi lần gọi).
// 06/11 tối (user: "thêm tích chọn nhớ đăng nhập hay không, thiết kế lại ui đăng nhập với slogan đẹp hơn" + "xem ai đang đăng nhập, ai đang làm bài, đến đâu"):
//   - ô "Nhớ đăng nhập trên máy này" (mặc định tích, lưu 'khoa-nho-dn'): bỏ tích = phiên chỉ sống tới khi đóng trình duyệt (sessionStorage)
//     + tắt tự đăng nhập Google lần sau (máy dùng chung).
//   - NHỊP HOẠT ĐỘNG: đang mở trang thì mỗi 60 giây (và lúc đổi trang / rời tab / quay lại / đóng trang) gửi máy chủ đang ở đâu, đang làm gì
//     (KHOA_APP.hoatDong: xem video, đang thi — đã chọn mấy câu, còn bao lâu…) + bao lâu không thao tác → trang Quản trị xem trực tiếp.
(function () {
  'use strict';
  var C = window.CAU_HINH || {}, APP = window.KHOA_APP;
  if (!C.google_client_id || !C.may_chu || !APP) return;
  var MIEN = (C.mien || '').toLowerCase(), KHO_PHIEN = 'khoa-phien';
  var ve = null, phien = null, nguoi = null, quanTri = false, daVao = false, daTai = false, hen = 0, dangGui = false, guiLai = false, chuaGui = false;
  var man = null, bao = null, gisNap = false;
  var e = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  // ---------- phiên nhớ đăng nhập
  function nhoDN() { try { return localStorage.getItem('khoa-nho-dn') !== '0'; } catch (x) { return true; } }
  function kho() { try { return nhoDN() ? localStorage : sessionStorage; } catch (x) { return null; } }
  function docPhien() {
    var ds = []; try { ds = [localStorage, sessionStorage]; } catch (x) {}
    for (var i = 0; i < ds.length; i++) { try { var p = JSON.parse(ds[i].getItem(KHO_PHIEN) || 'null'); if (p && p.phien && +p.het > Date.now() + 60000 && p.email) return p; } catch (x2) {} }
    return null;
  }
  function luuPhien(kq) {
    if (!kq || !kq.phien || !nguoi) return; phien = kq.phien;
    var k = kho(); if (!k) return;
    try { boPhienKho(); k.setItem(KHO_PHIEN, JSON.stringify({ phien: kq.phien, het: kq.het, email: nguoi.email, ten: nguoi.ten, anh: nguoi.anh, quan_tri: !!kq.quan_tri })); } catch (x) {}
  }
  function boPhienKho() { try { localStorage.removeItem(KHO_PHIEN); } catch (x) {} try { sessionStorage.removeItem(KHO_PHIEN); } catch (x2) {} }
  function boPhien() { phien = null; boPhienKho(); }

  // ---------- màn đăng nhập (chỉ hiện khi chưa có phiên còn hạn)
  function moManDangNhap(loiNhan) {
    if (!man) {
      man = document.createElement('div');
      man.className = 'man-dang-nhap';
      // 06/11 tối, bản 4 (user gửi ảnh mẫu: "background đó ok. nhưng khung đăng nhập nên popup kiểu này. và phối màu khác 1 chút. logo có thể in chìm"):
      // GIỮ nền sáng loang của bản 3 (toàn màn hình, mảng màu trôi); khung đăng nhập = POPUP 2 nửa nổi giữa màn hình:
      // trái xanh lục bảo sâu (quầng sáng theo chuột) + logo chữ phẳng + slogan NỀN TẢNG + 4 tiện ích biểu tượng tròn + LÁ HECATECH IN CHÌM trọn hình
      // (bộ lọc #mdn-chim, lá đặc làm khuôn) có vệt sáng lướt + nghiêng nhẹ theo chuột; phải trắng = khoá đang mở + đăng nhập.
      var K = APP.khoa || {}, soBuoi = (K.buoi && K.buoi.length) || 0, soBai = (APP.ds && APP.ds.length) || 0;
      var IC = {
        lo: '<path d="M4 17l5-5 4 4 7-7"/><path d="M15 9h5v5"/>',
        phat: '<path d="M9 6.8v10.4l8.2-5.2z"/>',
        cham: '<path d="M6.5 12.5l3.6 3.6 7.4-8"/>',
        may: '<rect x="4" y="6.5" width="11" height="8" rx="1.3"/><path d="M7 17.5h5"/><rect x="16.5" y="9" width="3.8" height="8.5" rx="1"/>'
      };
      var loi = function (ic, tieu, chu) { return '<li><i aria-hidden="true"><svg viewBox="0 0 24 24">' + IC[ic] + '</svg></i><span><b>' + tieu + '</b>' + chu + '</span></li>'; };
      var la = '<svg class="mdn-dau" viewBox="206 264 60 82" aria-hidden="true" focusable="false"><defs>' +
          '<filter id="mdn-chim" x="-20%" y="-20%" width="140%" height="140%">' +
            '<feFlood flood-color="#03271a" flood-opacity=".3"/><feComposite in2="SourceAlpha" operator="in" result="nen"/>' +
            '<feFlood flood-color="#011a10" flood-opacity=".85"/><feComposite in2="SourceAlpha" operator="out"/><feOffset dx=".9" dy="1.2"/><feGaussianBlur stdDeviation=".75"/><feComposite in2="SourceAlpha" operator="in" result="toi"/>' +
            '<feFlood flood-color="#c4f5da" flood-opacity=".34"/><feComposite in2="SourceAlpha" operator="out"/><feOffset dx="-.55" dy="-.75"/><feGaussianBlur stdDeviation=".5"/><feComposite in2="SourceAlpha" operator="in" result="sang"/>' +
            '<feMorphology in="SourceAlpha" operator="dilate" radius=".45" result="to"/><feComposite in="to" in2="SourceAlpha" operator="out" result="mep"/><feOffset in="mep" dx=".35" dy=".45" result="m2"/><feFlood flood-color="#c4f5da" flood-opacity=".15"/><feComposite in2="m2" operator="in" result="vien"/>' +
            '<feMerge><feMergeNode in="vien"/><feMergeNode in="nen"/><feMergeNode in="toi"/><feMergeNode in="sang"/></feMerge></filter>' +
          '<linearGradient id="mdn-vet" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#eafff3" stop-opacity=".38"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
          '<clipPath id="mdn-cat"><use href="#hct-la-path"/></clipPath></defs>' +
        '<use href="#hct-la-path" fill="#000" filter="url(#mdn-chim)"/>' +
        '<g clip-path="url(#mdn-cat)"><rect x="180" y="258" width="12" height="96" fill="url(#mdn-vet)" transform="skewX(-20)"><animate attributeName="x" values="160;310;310" keyTimes="0;.6;1" dur="6s" begin="1.2s" repeatCount="indefinite"/></rect></g>' +
      '</svg>';
      man.innerHTML = '<div class="mdn-nen" aria-hidden="true"><i></i><i></i><i></i></div>' +
        '<div class="mdn-khung" role="dialog" aria-modal="true" aria-labelledby="mdn-tieu">' +
        '<section class="mdn-ben" aria-label="Nền tảng đào tạo Hecatech">' + la +
          '<div class="mdn-noi">' +
            '<svg class="mdn-logo" viewBox="0 0 363.18 81.52" aria-label="Hecatech"><use href="#hct-logo"/></svg>' +
            '<span class="mdn-nhan">Nền tảng đào tạo Hecatech</span>' +
            '<p class="mdn-slogan"><span>Học để làm được.</span><em>Không chỉ để biết.</em></p>' +
            '<p class="mdn-phu">Kỹ năng dùng được ngay trong việc hằng ngày — học từng bước ngắn, làm bài thật, thấy rõ mình tiến tới đâu.</p>' +
            '<ul class="mdn-loi">' + loi('lo', 'Lộ trình rõ ràng', 'Học theo thứ tự, mỗi bài mở khi bạn sẵn sàng.') + loi('phat', 'Bài học ngắn, có phụ đề', 'Xem lại bao nhiêu lần cũng được.') +
              loi('cham', 'Làm bài, biết kết quả ngay', 'Kiểm tra cuối buổi, chấm tự động khi nộp.') + loi('may', 'Học trên mọi thiết bị', 'Tiến độ đi theo tài khoản của bạn.') + '</ul>' +
          '</div></section>' +
        '<section class="mdn-the">' +
          (K.ten ? '<div class="mdn-khoa"><i aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8.5 5.8v12.4l9.8-6.2z"/></svg></i><span><span>Khoá đang mở</span><b>' + e(K.ten) + '</b><small>' + (soBuoi ? soBuoi + ' buổi' : '') + (soBai ? ' · ' + soBai + ' bài' : '') + ' · kiểm tra cuối mỗi buổi</small></span></div>' : '') +
          // 06/11 (user: "Đăng nhập để học tiếp — cta này không ổn. với người chưa học thì sao?" → "không cần câu hỏi đó. intro chung chung thôi.
          // nói ngọt ngào để người ta vào học kiểu 'học ngay'"): một lời mời chung cho mọi người, không chia người mới / người học dở.
          '<h1 id="mdn-tieu">Khám phá bài học ngay</h1>' +
          '<p>Mọi bài học đã sẵn sàng chờ bạn. Chỉ cần một chạm bằng tài khoản Google công ty <b>@' + e(MIEN) + '</b> — không cần nhớ thêm mật khẩu nào.</p>' +
          '<div id="mdn-nut" class="mdn-nut"></div>' +
          '<label class="mdn-nho"><input type="checkbox"' + (nhoDN() ? ' checked' : '') + '><span><b>Nhớ đăng nhập trên máy này</b><small>30 ngày không phải đăng nhập lại · bỏ tích nếu đang dùng máy chung</small></span></label>' +
          '<p class="mdn-bao" role="alert" aria-live="polite"></p>' +
          '<p class="mdn-rieng"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2.2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></svg>Đăng nhập an toàn qua Google — web không nhận và không lưu mật khẩu của bạn.</p></section></div>';
      // quầng sáng + lá nghiêng theo chuột (chạy cả khi máy bật "giảm chuyển động" — user muốn thấy chuyển động; biên độ nhỏ)
      var ben = man.querySelector('.mdn-ben');
      ben.addEventListener('pointermove', function (ev) {
        var r = ben.getBoundingClientRect(), x = (ev.clientX - r.left) / r.width, y = (ev.clientY - r.top) / r.height;
        ben.style.setProperty('--mx', (x * 100).toFixed(1) + '%'); ben.style.setProperty('--my', (y * 100).toFixed(1) + '%');
        ben.style.setProperty('--ry', ((x - .5) * 16).toFixed(2) + 'deg'); ben.style.setProperty('--rx', ((.5 - y) * 12).toFixed(2) + 'deg');
      });
      ben.addEventListener('pointerleave', function () { ['--mx', '--my', '--rx', '--ry'].forEach(function (k) { ben.style.removeProperty(k); }); });
      bao = man.querySelector('.mdn-bao');
      man.querySelector('.mdn-nho input').addEventListener('change', function (ev) { try { localStorage.setItem('khoa-nho-dn', ev.target.checked ? '1' : '0'); } catch (x) {} });
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
      google.accounts.id.initialize({ client_id: C.google_client_id, callback: nhanVe, auto_select: nhoDN(), hd: MIEN || undefined, itp_support: true, use_fedcm_for_prompt: true });
      veNut(); google.accounts.id.prompt();
    };
    s.onerror = function () { if (bao) bao.textContent = 'Không tải được nút đăng nhập Google. Kiểm tra mạng rồi tải lại trang.'; };
    document.head.appendChild(s);
  }
  // nút Google có bề rộng cố định (mặc định ~400) → đo khung trước, điện thoại hẹp không bị tràn
  function veNut() { var o = document.getElementById('mdn-nut'); if (o && window.google && google.accounts && !o.childElementCount) google.accounts.id.renderButton(o, { theme: 'outline', size: 'large', shape: 'pill', text: 'signin_with', locale: 'vi', logo_alignment: 'left', width: Math.max(200, Math.min(400, Math.floor(o.clientWidth || 320))) }); }

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
    if (!nhoDN()) { try { google.accounts.id.disableAutoSelect(); } catch (x3) {} } // máy chung: lần sau không tự đăng nhập
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
      if (kq && kq.agent && window.KHOA_AGENT) window.KHOA_AGENT.dat(kq.agent); // 07/11: máy chủ báo Agent bật / tắt → hiện / ẩn nút "Hỏi Agent"
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
      if (kq && kq.ok) { daTai = true; if (kq.du_lieu) APP.ganDuLieu(kq.du_lieu); veChip('da-luu'); if (chuaGui || guiLai) { guiLai = false; gui(); } setTimeout(function () { guiNhip('vao'); }, 1500); }
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
  function moHetBat() { try { return localStorage.getItem('khoa-mo-het') === '1'; } catch (x) { return false; } }
  function veMoHet() {
    var m = document.getElementById('nut-mo-het'); if (!m) return;
    var bat = moHetBat();
    m.setAttribute('aria-pressed', bat ? 'true' : 'false');
    m.innerHTML = '<span aria-hidden="true">' + (bat ? '🔓' : '🔒') + '</span><span class="nut-chu">' + (bat ? 'Đang mở toàn bộ bài' : 'Mở toàn bộ bài') + '</span>';
    m.setAttribute('aria-label', bat ? 'Đang mở toàn bộ bài — bấm để khoá lại' : 'Mở toàn bộ bài');
    m.title = bat ? 'Mọi bài và bài kiểm tra đang mở (chỉ trên máy bạn). Bấm để khoá lại như người học.' : 'Mở mọi bài và bài kiểm tra để xem thử (chỉ trên máy bạn, người học không bị ảnh hưởng).';
  }
  // nút Quản trị (chỉ email quản trị — máy chủ vẫn kiểm quyền ở mọi lần gọi trang quản trị)
  function datQuanTri(b) {
    var cu = quanTri; quanTri = !!b;
    var dau = document.querySelector('.dau'); if (!dau) return;
    var n = dau.querySelector('#nut-quan-tri');
    if (quanTri && !n) { n = document.createElement('a'); n.className = 'nut'; n.id = 'nut-quan-tri'; n.href = '#/quan-tri'; n.textContent = 'Quản trị'; dau.insertBefore(n, dau.querySelector('.tai-khoan') || dau.querySelector('#nut-gop-y')); }
    else if (!quanTri && n) n.remove();
    // 09/11 (user: "thêm nút đóng, mở toàn bộ bài học cho admin"): bật = bỏ khoá tuần tự, bỏ chờ giữa 2 lượt thi — CHỈ trên máy này,
    // người học không bị ảnh hưởng. ung-dung.js · moHet() chỉ nghe cờ khi tài khoản là quản trị.
    var m = dau.querySelector('#nut-mo-het');
    if (quanTri && !m) {
      m = document.createElement('button'); m.type = 'button'; m.className = 'nut nut-mo-het'; m.id = 'nut-mo-het';
      dau.insertBefore(m, n);
      m.addEventListener('click', function () {
        var bat = !moHetBat(); try { localStorage.setItem('khoa-mo-het', bat ? '1' : '0'); } catch (x) {}
        veMoHet(); if (APP.veLai) APP.veLai();
      });
    } else if (!quanTri && m) m.remove();
    if (m) veMoHet();
    if (cu !== quanTri && !/^#\/quan-tri/.test(location.hash) && APP.veLai && moHetBat()) APP.veLai(); // quyền vừa xác nhận → áp cờ mở toàn bộ ngay
    // 07/11: chỉ vẽ lại trang Quản trị khi quyền THẬT SỰ đổi (trước đây mọi lần máy chủ trả lời đều vẽ lại cả trang → giật, mất hiệu ứng hiện mượt)
    if (cu !== quanTri && /^#\/quan-tri/.test(location.hash) && APP.veLai) APP.veLai();
  }
  function dangXuat() {
    if (hen) { clearTimeout(hen); hen = 0; gui(); }
    boPhien();
    try { google.accounts.id.disableAutoSelect(); } catch (x) {}
    setTimeout(function () { location.hash = '#/'; location.reload(); }, 600);
  }
  // ---------- nhịp hoạt động (trang Quản trị xem trực tiếp ai đang học, đang ở đâu, đang làm gì)
  var lanThaoTac = Date.now(), lanNhip = 0, henNhip = 0;
  ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll'].forEach(function (t) { window.addEventListener(t, function () { lanThaoTac = Date.now(); }, { passive: true, capture: true }); });
  function nhip(lyDo) {
    var hd = {}; try { hd = (APP.hoatDong && APP.hoatDong()) || {}; } catch (x) {}
    var an = document.visibilityState !== 'visible', im = Math.round((Date.now() - lanThaoTac) / 1000);
    var viec = lyDo === 'roi-trang' ? 'roi-trang' : an ? 'roi-tab' : (hd.viec === 'doc' && im >= 180 ? 'ngoi-im' : hd.viec || 'doc');
    return { trang: hd.trang || '', ma: hd.ma || '', viec: viec, chi_tiet: hd.chi_tiet || '', tien_do: hd.tien_do, im: im, ly_do: lyDo };
  }
  function guiNhip(lyDo) {
    if (!daTai || (!ve && !phien)) return;
    if (lyDo === 'roi-trang') { try { navigator.sendBeacon(C.may_chu, new Blob([JSON.stringify(Object.assign({ loai: 'nhip', hd: nhip(lyDo) }, phien ? { phien: phien } : { token: ve }))], { type: 'text/plain' })); } catch (x) {} return; }
    var bay = Date.now(); if (bay - lanNhip < 8000 && lyDo !== 'an') { clearTimeout(henNhip); henNhip = setTimeout(function () { guiNhip(lyDo); }, 8000 - (bay - lanNhip)); return; }
    lanNhip = bay; goi('nhip', { hd: nhip(lyDo) }).catch(function () {});
  }
  setInterval(function () { if (document.visibilityState === 'visible') guiNhip('dinh-ky'); }, 60000);
  document.addEventListener('visibilitychange', function () { guiNhip(document.visibilityState === 'visible' ? 'quay-lai' : 'an'); });
  window.addEventListener('hashchange', function () { setTimeout(function () { guiNhip('doi-trang'); }, 400); });
  window.addEventListener('pagehide', function () { guiNhip('roi-trang'); });
  document.addEventListener('play', function () { guiNhip('xem'); }, true); document.addEventListener('pause', function () { guiNhip('dung'); }, true);
  window.KHOA_NHIP = guiNhip; // ung-dung.js gọi lúc bắt đầu / nộp bài thi
  window.KHOA_MAY_CHU = { goi: goi, laQuanTri: function () { return quanTri; }, daVao: function () { return daVao; }, nguoi: function () { return nguoi; } };

  // ---------- bắt đầu: có phiên còn hạn → vào thẳng; chưa có → màn đăng nhập Google
  var pc = docPhien();
  if (pc) { phien = pc.phien; nguoi = { email: pc.email, ten: pc.ten || pc.email, anh: pc.anh || '' }; vaoHoc(); datQuanTri(pc.quan_tri); }
  else moManDangNhap();
})();
