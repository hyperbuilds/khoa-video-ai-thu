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
      // 06/11 tối, bản 3 (user: "chiếc lá chưa ra logo, chưa thấy chuyển động, bố cục / màu chưa sang"; gu đã ghi: nền SÁNG kiểu biên tập,
      // ghét "logo mờ khổng lồ", chuyển động phải THẤY RÕ, nhiều chi tiết cùng động — như khung mở bài video đã duyệt):
      // toàn màn hình nền ngà loang bạc hà / vàng; trái = thương hiệu NỀN TẢNG (chung mọi khoá) + HUY HIỆU sứ nổi khối, lá Hecatech men xanh
      // khắc chìm giữa, quỹ đạo nghiêng có hạt sáng chạy vòng (nửa sau khuất sau huy hiệu), vệt sáng lướt, bong bóng kính trôi, cả khối lơ lửng
      // + nghiêng theo chuột; phải = thẻ đăng nhập trắng (khoá đang mở + Google + nhớ đăng nhập). Logo chữ góc trái giữ PHẲNG (guideline).
      var K = APP.khoa || {}, soBuoi = (K.buoi && K.buoi.length) || 0, soBai = (APP.ds && APP.ds.length) || 0;
      var IC = {
        lo: '<path d="M5 19c3 0 3-6 7-6s4 6 7 6" /><circle cx="5" cy="19" r="2"/><circle cx="19" cy="5" r="2"/><path d="M12 13V8a3 3 0 0 1 3-3h2"/>',
        phat: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10.5 9.5v5l4-2.5z"/>',
        cham: '<path d="M9 12.5l2 2 4-4.5"/><circle cx="12" cy="12" r="8.5"/>',
        may: '<rect x="2.5" y="5" width="13" height="10" rx="1.6"/><path d="M6 19h6"/><rect x="17" y="8" width="4.5" height="11" rx="1.2"/>'
      };
      var loi = function (ic, tieu, chu) { return '<li><i aria-hidden="true"><svg viewBox="0 0 24 24">' + IC[ic] + '</svg></i><span><b>' + tieu + '</b>' + chu + '</span></li>'; };
      var ELIP = 'M12,180 a168,50 0 1,0 336,0 a168,50 0 1,0 -336,0';
      var hat = function (cat) { return '<g clip-path="url(#' + cat + ')"><circle r="7" fill="url(#mdn-hat)"><animateMotion dur="7s" repeatCount="indefinite" path="' + ELIP + '"/></circle></g>'; };
      var huy = '<svg class="mdn-huy" viewBox="0 0 360 360" aria-hidden="true" focusable="false"><defs>' +
          '<radialGradient id="mdn-su" cx=".34" cy=".28" r=".85"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#f3f6f0"/><stop offset="1" stop-color="#dbe3d8"/></radialGradient>' +
          '<linearGradient id="mdn-mat" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e4e9e1"/><stop offset="1" stop-color="#fbfcf9"/></linearGradient>' +
          '<linearGradient id="mdn-men" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#47b783"/><stop offset=".5" stop-color="#2E9A68"/><stop offset="1" stop-color="#17603f"/></linearGradient>' +
          '<linearGradient id="mdn-quy" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2E9A68" stop-opacity=".1"/><stop offset=".55" stop-color="#E2B33C" stop-opacity=".85"/><stop offset="1" stop-color="#2E9A68" stop-opacity=".25"/></linearGradient>' +
          '<radialGradient id="mdn-hat"><stop offset="0" stop-color="#fffbe8"/><stop offset=".35" stop-color="#F2C94C"/><stop offset="1" stop-color="#F2C94C" stop-opacity="0"/></radialGradient>' +
          '<radialGradient id="mdn-bot" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".4" stop-color="#e6f6ec" stop-opacity=".35"/><stop offset="1" stop-color="#9fd7b7" stop-opacity=".25"/></radialGradient>' +
          '<linearGradient id="mdn-vet" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>' +
          // đĩa sứ nổi: bóng tối dưới-phải + bóng sáng trên-trái
          '<filter id="mdn-noi" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur in="SourceAlpha" stdDeviation="11"/><feOffset dx="12" dy="15" result="b"/><feFlood flood-color="#1b4a30" flood-opacity=".26"/><feComposite in2="b" operator="in" result="toi"/>' +
            '<feGaussianBlur in="SourceAlpha" stdDeviation="9"/><feOffset dx="-10" dy="-10" result="b2"/><feFlood flood-color="#fff" flood-opacity=".95"/><feComposite in2="b2" operator="in" result="sang"/>' +
            '<feMerge><feMergeNode in="toi"/><feMergeNode in="sang"/><feMergeNode in="SourceGraphic"/></feMerge></filter>' +
          // mặt lõm: bóng trong trên-trái
          '<filter id="mdn-lom" x="-10%" y="-10%" width="120%" height="120%"><feFlood flood-color="#264f39" flood-opacity=".3"/><feComposite in2="SourceAlpha" operator="out"/><feOffset dx="5" dy="7"/><feGaussianBlur stdDeviation="6"/><feComposite in2="SourceAlpha" operator="in" result="toi"/>' +
            '<feFlood flood-color="#fff" flood-opacity=".9"/><feComposite in2="SourceAlpha" operator="out"/><feOffset dx="-4" dy="-5"/><feGaussianBlur stdDeviation="4"/><feComposite in2="SourceAlpha" operator="in" result="sang"/>' +
            '<feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="toi"/><feMergeNode in="sang"/></feMerge></filter>' +
          // lá men xanh khắc chìm (hệ toạ độ gốc của lá): bóng trong trên-trái + mép sáng dưới-phải
          '<filter id="mdn-khac" x="-20%" y="-20%" width="140%" height="140%"><feFlood flood-color="#06301d" flood-opacity=".75"/><feComposite in2="SourceAlpha" operator="out"/><feOffset dx="1.1" dy="1.5"/><feGaussianBlur stdDeviation=".9"/><feComposite in2="SourceAlpha" operator="in" result="toi"/>' +
            '<feFlood flood-color="#d6ffe8" flood-opacity=".55"/><feComposite in2="SourceAlpha" operator="out"/><feOffset dx="-.6" dy="-.8"/><feGaussianBlur stdDeviation=".5"/><feComposite in2="SourceAlpha" operator="in" result="sang"/>' +
            '<feMorphology in="SourceAlpha" operator="dilate" radius=".55" result="to"/><feComposite in="to" in2="SourceAlpha" operator="out" result="mep"/><feOffset in="mep" dx="-.35" dy="-.45" result="m2"/><feFlood flood-color="#1b4a30" flood-opacity=".28"/><feComposite in2="m2" operator="in" result="mepToi"/>' +
            '<feMerge><feMergeNode in="mepToi"/><feMergeNode in="SourceGraphic"/><feMergeNode in="toi"/><feMergeNode in="sang"/></feMerge></filter>' +
          '<clipPath id="mdn-mat-cat"><circle cx="180" cy="180" r="114"/></clipPath>' +
          '<clipPath id="mdn-sau"><rect x="-60" y="-60" width="480" height="240"/></clipPath><clipPath id="mdn-truoc"><rect x="-60" y="180" width="480" height="240"/></clipPath>' +
        '</defs>' +
        // quỹ đạo nửa SAU (khuất sau huy hiệu) + hạt sáng
        '<g transform="rotate(-16 180 180)"><path class="mdn-quy" d="' + ELIP + '" pathLength="1000" fill="none" stroke="url(#mdn-quy)" stroke-width="1.6" clip-path="url(#mdn-sau)"/>' + hat('mdn-sau') + '</g>' +
        '<circle cx="180" cy="180" r="132" fill="url(#mdn-su)" filter="url(#mdn-noi)"/>' +
        '<circle cx="180" cy="180" r="132" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="1.2"/>' +
        '<circle cx="180" cy="180" r="114" fill="url(#mdn-mat)" filter="url(#mdn-lom)"/>' +
        '<g transform="translate(180 182) scale(2.3) translate(-236.15 -305.1)"><use href="#hct-la-path" fill="url(#mdn-men)" filter="url(#mdn-khac)"/></g>' +
        '<g clip-path="url(#mdn-mat-cat)"><rect x="40" y="40" width="34" height="300" fill="url(#mdn-vet)" transform="skewX(-22)" opacity=".7"><animate attributeName="x" values="-60;470;470" keyTimes="0;.55;1" dur="5.5s" begin="1s" repeatCount="indefinite"/></rect></g>' +
        // quỹ đạo nửa TRƯỚC (đè lên huy hiệu) + hạt sáng
        '<g transform="rotate(-16 180 180)"><path class="mdn-quy" d="' + ELIP + '" pathLength="1000" fill="none" stroke="url(#mdn-quy)" stroke-width="2" clip-path="url(#mdn-truoc)"/>' + hat('mdn-truoc') + '</g>' +
        // bong bóng kính trôi
        '<circle class="mdn-bot b1" cx="318" cy="96" r="13" fill="url(#mdn-bot)" stroke="#fff" stroke-opacity=".9"/>' +
        '<circle class="mdn-bot b2" cx="52" cy="270" r="9" fill="url(#mdn-bot)" stroke="#fff" stroke-opacity=".9"/>' +
        '<circle class="mdn-bot b3" cx="300" cy="300" r="6" fill="url(#mdn-bot)" stroke="#fff" stroke-opacity=".9"/>' +
      '</svg>';
      man.innerHTML = '<div class="mdn-nen" aria-hidden="true"><i></i><i></i><i></i></div>' +
        '<div class="mdn-khung" role="dialog" aria-modal="true" aria-labelledby="mdn-tieu">' +
        '<section class="mdn-ben" aria-label="Nền tảng đào tạo Hecatech">' +
          '<svg class="mdn-logo" viewBox="0 0 363.18 81.52" aria-label="Hecatech"><use href="#hct-logo"/></svg>' +
          '<div class="mdn-huy-o"><div class="mdn-huy-nghieng">' + huy + '</div><span class="mdn-huy-bong" aria-hidden="true"></span></div>' +
          '<div class="mdn-noi">' +
            '<span class="mdn-nhan">Nền tảng đào tạo Hecatech</span>' +
            '<p class="mdn-slogan"><span>Học để làm được.</span><em>Không chỉ để biết.</em></p>' +
            '<p class="mdn-phu">Kỹ năng dùng được ngay trong việc hằng ngày — học từng bước ngắn, làm bài thật, thấy rõ mình tiến tới đâu.</p>' +
            '<ul class="mdn-loi">' + loi('lo', 'Lộ trình rõ ràng', 'Mỗi bài mở khi bạn sẵn sàng.') + loi('phat', 'Bài học ngắn', 'Có phụ đề, xem lại thoải mái.') +
              loi('cham', 'Biết kết quả ngay', 'Kiểm tra chấm tự động khi nộp.') + loi('may', 'Mọi thiết bị', 'Tiến độ theo tài khoản.') + '</ul>' +
          '</div></section>' +
        '<section class="mdn-the">' +
          (K.ten ? '<div class="mdn-khoa"><span>Khoá đang mở</span><b>' + e(K.ten) + '</b><small>' + (soBuoi ? soBuoi + ' buổi' : '') + (soBai ? ' · ' + soBai + ' bài' : '') + ' · kiểm tra cuối mỗi buổi</small></div>' : '') +
          '<h1 id="mdn-tieu">Đăng nhập để học tiếp</h1>' +
          '<p>Dùng tài khoản Google công ty <b>@' + e(MIEN) + '</b> — một chạm, không cần mật khẩu riêng. Học tiếp đúng chỗ đã dừng, ở bất kỳ máy nào.</p>' +
          '<div id="mdn-nut" class="mdn-nut"></div>' +
          '<label class="mdn-nho"><input type="checkbox"' + (nhoDN() ? ' checked' : '') + '><span><b>Nhớ đăng nhập trên máy này</b><small>30 ngày không phải đăng nhập lại · bỏ tích nếu đang dùng máy chung</small></span></label>' +
          '<p class="mdn-bao" role="alert" aria-live="polite"></p>' +
          '<p class="mdn-rieng"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2.2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></svg>Đăng nhập an toàn qua Google — web không nhận và không lưu mật khẩu của bạn.</p></section></div>';
      // huy hiệu nghiêng theo chuột (2.5D) — chạy cả khi máy bật "giảm chuyển động" (user muốn thấy chuyển động; biên độ nhỏ)
      var ben = man.querySelector('.mdn-ben'), ng = man.querySelector('.mdn-huy-nghieng');
      man.addEventListener('pointermove', function (ev) { var r = ben.getBoundingClientRect(), x = (ev.clientX - r.left) / r.width - .5, y = (ev.clientY - r.top) / r.height - .5; ng.style.setProperty('--ry', Math.max(-1, Math.min(1, x)) * 16 + 'deg'); ng.style.setProperty('--rx', Math.max(-1, Math.min(1, -y)) * 12 + 'deg'); });
      man.addEventListener('pointerleave', function () { ng.style.removeProperty('--rx'); ng.style.removeProperty('--ry'); });
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
