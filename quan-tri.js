// Trang QUẢN TRỊ khoá học (06/11/2026, user: "làm tài khoản admin quản lý toàn bộ kết quả").
// #/quan-tri           bảng kết quả mọi học viên: tìm, lọc bộ phận, chỉ người cần chú ý, sắp theo cột, xuất Excel (CSV).
// #/quan-tri/<email>   một học viên: điểm từng buổi (cùng công thức với trang học), các lượt thi + cờ, tự luận, ghi chép, từng bài;
//                      nút "Cho thêm 1 lượt thi" (bỏ luôn thời gian chờ) — máy chủ ghi vào bài làm + "Nhật ký quản trị".
// Quyền do MÁY CHỦ kiểm ở mọi lần gọi (email trong danh sách quản trị); trang này chỉ vẽ dữ liệu máy chủ trả về.
(function () {
  'use strict';
  var APP = window.KHOA_APP; if (!APP) return;
  var e = APP.e, K = APP.khoa, DS = APP.ds, QC = APP.qc, C = window.CAU_HINH || {};
  var duLieu = null, loi = '', loc = { tim: '', bo_phan: '', chu_y: false }, sap = { cot: 'lan_cuoi', nguoc: true };
  var MC = function () { return window.KHOA_MAY_CHU; };

  // giờ từ Sheet ("11/6/2026 15:45:06" kiểu en_US, hoặc "2026-11-06 15:45:06") và giờ ISO trong bài làm
  function ngay(s) { if (!s) return null; s = String(s); var d = new Date(/^\d{4}-\d\d-\d\d /.test(s) ? s.replace(' ', 'T') : s); return isNaN(d) ? null : d; }
  function ngayGio(s) { var d = ngay(s); if (!d) return s || ''; var h = function (n) { return ('0' + n).slice(-2); }; return h(d.getDate()) + '/' + h(d.getMonth() + 1) + ' ' + h(d.getHours()) + ':' + h(d.getMinutes()); }
  // "85 Giỏi · TN 9/10 đạt · 1 lần · làm 4′10″ · rời trang 0 · ⚑ …" (cột Buổi n trong Sheet) → số liệu cho bảng
  function docBuoi(s) {
    s = String(s || '').trim(); if (!s) return null;
    if (s === 'đang làm') return { dang: true };
    var m = s.match(/^(\d+)\s+(\S+(?:\s+đạt)?)/);
    return { diem: m ? +m[1] : null, loai: m ? m[2] : '', dat: /TN \d+\/\d+ đạt/.test(s), co: s.indexOf('⚑') >= 0, chu: s };
  }
  function hoc(r) { return { email: r['Email'], ten: r['Họ tên (tự điền)'] || r['Họ tên (Google)'] || r['Email'], bo_phan: r['Bộ phận / dự án'] || '', nhom: r['Nhóm'] || '',
    tien_do: +r['Tiến độ %'] || 0, bai_xong: r['Bài hoàn thành'] || '', phut: +r['Phút xem thật'] || 0, diem_tb: r['Điểm TB buổi'] === '' ? null : +r['Điểm TB buổi'],
    buoi: K.buoi.map(function (b) { return docBuoi(r['Buổi ' + b.so]); }), lan_dau: r['Lần đầu'], lan_cuoi: r['Lần cuối'], goc: r }; }

  function tai() {
    loi = ''; duLieu = null;
    return MC().goi('tong-hop').then(function (kq) {
      if (kq && kq.ok) duLieu = { nguoi: (kq.nguoi || []).map(hoc), bai: kq.bai || [], luc: kq.luc };
      else loi = kq && kq.loi === 'khong-quyen' ? 'Tài khoản này không có quyền quản trị.' : 'Không tải được dữ liệu (' + ((kq && kq.loi) || 'lỗi') + ').';
    }).catch(function () { loi = 'Không kết nối được máy chủ. Kiểm tra mạng rồi bấm Tải lại.'; });
  }

  window.KHOA_QUAN_TRI = function (main, email) {
    var mc = MC();
    if (!mc || !mc.daVao()) { main.innerHTML = '<div class="qt"><p class="phu">Đang đăng nhập…</p></div>'; return; }
    if (!mc.laQuanTri()) { main.innerHTML = '<div class="qt"><header class="dau-bai"><span class="nhan">Quản trị</span><h1>Không có quyền</h1></header><p class="phu">Trang này chỉ dành cho người quản lý khoá học.</p><a class="nut" href="#/">← Về khoá học</a></div>'; return; }
    document.title = 'Quản trị · ' + K.ten;
    if (email) trangNguoi(main, email); else trangTong(main);
  };

  // dữ liệu về muộn mà người dùng đã sang trang khác → không vẽ đè (06/11: trang chi tiết vẽ đè lên trang kiểm tra vừa mở)
  function vanO(email) { var h = location.hash.replace(/^#/, ''); return email ? h === '/quan-tri/' + encodeURIComponent(email) || decodeURIComponent(h) === '/quan-tri/' + email : h === '/quan-tri'; }

  // ================================================================ bảng tổng
  function trangTong(main) {
    main.innerHTML = '<div class="qt"><p class="phu">Đang tải kết quả…</p></div>';
    (duLieu ? Promise.resolve() : tai()).then(function () { if (vanO()) veTong(main); });
  }
  function veTong(main) {
    if (loi) { main.innerHTML = '<div class="qt"><header class="dau-bai"><span class="nhan">Quản trị</span><h1>Kết quả học viên</h1></header><p class="qt-loi">' + e(loi) + '</p><button class="nut chinh" type="button" data-qt="tai">↻ Tải lại</button></div>'; ganNut(main); return; }
    var ds = duLieu.nguoi, tuan = Date.now() - 7 * 864e5;
    var dangHoc = ds.filter(function (h) { var d = ngay(h.lan_cuoi); return d && d.getTime() >= tuan; }).length;
    var coDiem = ds.filter(function (h) { return h.diem_tb != null && !isNaN(h.diem_tb); });
    var tb = coDiem.length ? Math.round(coDiem.reduce(function (s, h) { return s + h.diem_tb; }, 0) / coDiem.length) : null;
    var chuY = ds.filter(canChuY).length, datB1 = ds.filter(function (h) { return h.buoi[0] && h.buoi[0].dat; }).length;
    var boPhan = ds.map(function (h) { return h.bo_phan; }).filter(function (x, i, a) { return x && a.indexOf(x) === i; }).sort();
    var soBuoi = Math.max(1, K.buoi.reduce(function (n, b, i) { return ds.some(function (h) { return h.buoi[i]; }) ? i + 1 : n; }, 0));
    main.innerHTML = '<div class="qt">' +
      '<header class="dau-bai"><span class="nhan">Quản trị · ' + e(K.ten) + '</span><h1>Kết quả <em class="ng">học viên</em></h1>' +
        '<div class="meta"><span>Cập nhật ' + e(ngayGio(duLieu.luc)) + '</span><span>' + ds.length + ' người đã đăng nhập học</span></div></header>' +
      '<div class="qt-the">' + the('Người học', ds.length, 'đã đăng nhập') + the('Đang học', dangHoc, 'vào học trong 7 ngày qua') +
        the('Đạt Buổi 1', datB1 + '/' + ds.length, 'qua bài kiểm tra cuối buổi') + the('Điểm TB buổi', tb == null ? '—' : tb, 'trên 100, người đã làm kiểm tra') +
        the('Cần chú ý', chuY, 'có cờ khi thi hoặc chưa đạt sau khi hết lượt', chuY ? 'qt-canh' : '') + '</div>' +
      '<div class="qt-loc"><input type="search" data-qt="tim" placeholder="Tìm tên hoặc email…" value="' + e(loc.tim) + '" aria-label="Tìm học viên">' +
        '<select data-qt="bo-phan" aria-label="Lọc theo bộ phận"><option value="">Mọi bộ phận</option>' + boPhan.map(function (b) { return '<option' + (b === loc.bo_phan ? ' selected' : '') + '>' + e(b) + '</option>'; }).join('') + '</select>' +
        '<label class="qt-chon"><input type="checkbox" data-qt="chu-y"' + (loc.chu_y ? ' checked' : '') + '> Chỉ người cần chú ý</label><span class="gian"></span>' +
        '<button class="nut" type="button" data-qt="tai">↻ Tải lại</button><button class="nut" type="button" data-qt="xuat">⬇ Xuất Excel</button>' +
        (C.sheet ? '<a class="nut" href="' + e(C.sheet) + '" target="_blank" rel="noopener">Mở Google Sheet ↗</a>' : '') + '</div>' +
      '<div class="qt-cuon"><table class="qt-bang"><thead><tr>' +
        cotDau('ten', 'Học viên') + cotDau('bo_phan', 'Bộ phận') + cotDau('tien_do', 'Tiến độ') + cotDau('phut', 'Phút xem') + cotDau('diem_tb', 'Điểm TB') +
        K.buoi.slice(0, soBuoi).map(function (b, i) { return cotDau('b' + i, 'Buổi ' + b.so); }).join('') + cotDau('lan_cuoi', 'Lần cuối') +
      '</tr></thead><tbody></tbody></table></div><p class="qt-ghi">Bấm vào một dòng để xem chi tiết bài làm, các lượt thi và cho thêm lượt thi.</p></div>';
    veDong(main, soBuoi);
    ganNut(main);
    $$('[data-cot]', main).forEach(function (th) { th.addEventListener('click', function () { var c = th.getAttribute('data-cot'); sap = { cot: c, nguoc: sap.cot === c ? !sap.nguoc : c !== 'ten' && c !== 'bo_phan' }; veTong(main); }); });
  }
  function the(nhan, so, phu, lop) { return '<div class="' + (lop || '') + '"><span>' + e(nhan) + '</span><b>' + e(so) + '</b><small>' + e(phu) + '</small></div>'; }
  function cotDau(c, chu) { var dang = sap.cot === c; return '<th scope="col" data-cot="' + c + '" aria-sort="' + (dang ? (sap.nguoc ? 'descending' : 'ascending') : 'none') + '" tabindex="0">' + e(chu) + (dang ? (sap.nguoc ? ' ↓' : ' ↑') : '') + '</th>'; }
  // cần chú ý = có cờ khi thi (rời trang nhiều, làm quá nhanh, dán vào tự luận) hoặc chưa đạt mà đã làm hết lượt cơ bản
  function canChuY(h) { return h.buoi.some(function (b) { if (!b || b.dang) return false; var lan = +((b.chu.match(/(\d+) lần/) || [])[1] || 0); return b.co || (b.diem != null && !b.dat && lan >= QC.kt_lan); }); }
  function giaTri(h, c) {
    if (c === 'ten') return (h.ten || '').toLowerCase(); if (c === 'bo_phan') return (h.bo_phan || '').toLowerCase();
    if (c === 'lan_cuoi') { var d = ngay(h.lan_cuoi); return d ? d.getTime() : 0; }
    if (/^b\d+$/.test(c)) { var b = h.buoi[+c.slice(1)]; return b ? (b.diem != null ? b.diem : b.dang ? -1 : -2) : -3; }
    var v = h[c]; return v == null || isNaN(v) ? -1 : v;
  }
  function veDong(main, soBuoi) {
    var q = loc.tim.trim().toLowerCase();
    var ds = duLieu.nguoi.filter(function (h) {
      if (q && (h.ten + ' ' + h.email).toLowerCase().indexOf(q) < 0) return false;
      if (loc.bo_phan && h.bo_phan !== loc.bo_phan) return false;
      if (loc.chu_y && !canChuY(h)) return false; return true;
    }).sort(function (a, b) { var x = giaTri(a, sap.cot), y = giaTri(b, sap.cot); return (x < y ? -1 : x > y ? 1 : 0) * (sap.nguoc ? -1 : 1); });
    $('tbody', main).innerHTML = ds.length ? ds.map(function (h) {
      return '<tr tabindex="0" data-email="' + e(h.email) + '"><td><b>' + e(h.ten) + '</b><small>' + e(h.email) + '</small></td><td>' + e(h.bo_phan || '—') + (h.nhom ? '<small>' + e(h.nhom) + '</small>' : '') + '</td>' +
        '<td><span class="qt-tien"><i style="width:' + Math.min(100, h.tien_do) + '%"></i></span>' + h.tien_do + '%<small>' + e(h.bai_xong ? 'bài xong ' + h.bai_xong : '') + '</small></td>' +
        '<td>' + h.phut + '′</td><td>' + (h.diem_tb == null || isNaN(h.diem_tb) ? '—' : '<b>' + h.diem_tb + '</b>') + '</td>' +
        h.buoi.slice(0, soBuoi).map(chipBuoi).join('') + '<td>' + e(ngayGio(h.lan_cuoi)) + '</td></tr>';
    }).join('') : '<tr><td colspan="' + (6 + soBuoi) + '" class="qt-trong">Không có học viên nào khớp bộ lọc.</td></tr>';
    $$('tbody tr[data-email]', main).forEach(function (tr) {
      var di = function () { location.hash = '#/quan-tri/' + encodeURIComponent(tr.getAttribute('data-email')); };
      tr.addEventListener('click', di); tr.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') di(); });
    });
  }
  function chipBuoi(b) {
    if (!b) return '<td><span class="qt-chip qt-mo">—</span></td>';
    if (b.dang) return '<td><span class="qt-chip qt-dang">đang làm</span></td>';
    return '<td><span class="qt-chip ' + (b.dat ? 'qt-dat' : 'qt-chua') + '" title="' + e(b.chu) + '">' + (b.diem != null ? b.diem : '?') + ' · ' + e(b.loai || '') + (b.co ? ' ⚑' : '') + '</span></td>';
  }
  function ganNut(main) {
    $$('[data-qt]', main).forEach(function (n) {
      var l = n.getAttribute('data-qt');
      if (l === 'tai') n.addEventListener('click', function () { duLieu = null; trangTong(main); });
      else if (l === 'xuat') n.addEventListener('click', xuatCsv);
      else if (l === 'tim') n.addEventListener('input', function () { loc.tim = n.value; veDong(main, $$('thead th[data-cot^=b]', main).length); });
      else if (l === 'bo-phan') n.addEventListener('change', function () { loc.bo_phan = n.value; veDong(main, $$('thead th[data-cot^=b]', main).length); });
      else if (l === 'chu-y') n.addEventListener('change', function () { loc.chu_y = n.checked; veDong(main, $$('thead th[data-cot^=b]', main).length); });
    });
  }
  // Excel mở được ngay (UTF-8 có BOM, dấu phẩy); 2 phần: từng học viên + từng bài
  function xuatCsv() {
    if (!duLieu) return;
    var o = function (v) { v = v == null ? '' : String(v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
    var cot = Object.keys((duLieu.nguoi[0] || {}).goc || {});
    var dong = [cot.map(o).join(',')].concat(duLieu.nguoi.map(function (h) { return cot.map(function (c) { return o(h.goc[c]); }).join(','); }));
    if (duLieu.bai.length) { var cb = Object.keys(duLieu.bai[0]); dong.push('', 'TỪNG BÀI', cb.map(o).join(',')); duLieu.bai.forEach(function (r) { dong.push(cb.map(function (c) { return o(r[c]); }).join(',')); }); }
    var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + dong.join('\r\n')], { type: 'text/csv;charset=utf-8' }));
    a.download = 'ket-qua-khoa-video-ai-' + new Date().toISOString().slice(0, 10) + '.csv'; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }

  // ================================================================ một học viên
  function trangNguoi(main, email) {
    main.innerHTML = '<div class="qt"><a class="qt-ve" href="#/quan-tri">← Tất cả học viên</a><p class="phu">Đang tải bài làm của ' + e(email) + '…</p></div>';
    MC().goi('chi-tiet', { email: email }).then(function (kq) {
      if (!vanO(email)) return;
      if (!kq || !kq.ok) { $('.qt .phu', main).textContent = kq && kq.loi === 'khong-quyen' ? 'Tài khoản này không có quyền quản trị.' : 'Không tải được (' + ((kq && kq.loi) || 'lỗi') + ').'; return; }
      veNguoi(main, email, kq.du_lieu || {}, kq.dong || {});
    }).catch(function () { if (vanO(email)) $('.qt .phu', main).textContent = 'Không kết nối được máy chủ.'; });
  }
  function veNguoi(main, email, D, dong) {
    ['bai', 'kt', 'tl', 'ck', 'kiem', 'ghi', 'hn', 'hnl', 'chung'].forEach(function (k) { D[k] = D[k] || {}; });
    var t = APP.tomTatCua(D), ten = dong['Họ tên (tự điền)'] || dong['Họ tên (Google)'] || D.chung.ten || email;
    var hoatDong = function (b) { return b.bai.some(function (x) { var r = D.bai[x.id]; return r && (r.giay || r.tg_trang || r.xong); }) || (D.kt[b.id] && (D.kt[b.id].nop || D.kt[b.id].dang)) || (D.tl[b.id] || []).some(Boolean); };
    var buoi = K.buoi.filter(hoatDong);
    main.innerHTML = '<div class="qt"><a class="qt-ve" href="#/quan-tri">← Tất cả học viên</a>' +
      '<header class="dau-bai"><span class="nhan">Học viên</span><h1>' + APP.nghieng(ten) + '</h1>' +
        '<div class="meta"><span>' + e(email) + '</span>' + (t.bo_phan ? '<span>' + e(t.bo_phan) + '</span>' : '') + (t.nhom ? '<span>Nhóm ' + e(t.nhom) + '</span>' : '') +
        '<span>Vào học lần đầu ' + e(ngayGio(dong['Lần đầu'])) + '</span><span>Lần cuối ' + e(ngayGio(dong['Lần cuối'])) + '</span></div></header>' +
      '<div class="qt-the">' + the('Tiến độ', t.tien_do + '%', 'mục đã xong ' + t.muc_xong) + the('Bài hoàn thành', t.bai_hoan_thanh, 'xem hết ' + t.bai_xem_het) +
        the('Phút xem thật', t.phut_xem, 'chỉ tính lúc video chạy, trang đang mở') + the('Điểm TB buổi', t.diem_tb === '' ? '—' : t.diem_tb, 'trên 100') + '</div>' +
      (buoi.length ? buoi.map(function (b) { return veBuoi(b, D, email, ten); }).join('') : '<p class="phu">Học viên chưa bắt đầu buổi nào.</p>') +
      '<section class="qt-muc"><h2>Từng bài</h2><div class="qt-cuon"><table class="qt-bang nho"><thead><tr><th>Bài</th><th>Phút xem</th><th>Xem tới</th><th>Xem hết</th><th>Hoàn thành</th><th>Câu hỏi nhanh</th><th>Lượt mở</th><th>Phút trên trang</th></tr></thead><tbody>' +
        t.bai.map(function (x) { return '<tr' + (x.mo_khoa ? '' : ' class="qt-khoa"') + '><td>' + e(x.ten) + '</td><td>' + x.phut_xem + '′</td><td>' + (x.da_xem_toi == null ? '—' : x.da_xem_toi + '%') + '</td><td>' + (x.xem_het ? '✓' : '') + '</td><td>' + (x.hoan_thanh ? '✓' : '') + '</td><td>' + e(x.hoi_nhanh) + '</td><td>' + x.luot + '</td><td>' + x.phut_trang + '′</td></tr>'; }).join('') +
      '</tbody></table></div></section></div>';
    $$('[data-them-luot]', main).forEach(function (n) {
      n.addEventListener('click', function () {
        var bid = n.getAttribute('data-them-luot'), b = K.buoi.filter(function (x) { return x.id === bid; })[0];
        if (!confirm('Cho ' + ten + ' thêm 1 lượt làm kiểm tra Buổi ' + b.so + ' (không phải chờ ' + QC.kt_cach_phut + ' phút)?')) return;
        n.disabled = true; n.textContent = 'Đang mở lượt…';
        MC().goi('them-luot', { email: email, buoi: bid }).then(function (kq) {
          if (kq && kq.ok) { duLieu = null; trangNguoi(main, email); }
          else { n.disabled = false; n.textContent = 'Chưa mở được (' + ((kq && kq.loi) || 'lỗi') + ') — thử lại'; }
        }).catch(function () { n.disabled = false; n.textContent = 'Mất kết nối — thử lại'; });
      });
    });
  }
  function veBuoi(b, D, email, ten) {
    var kt = D.kt[b.id] || {}, p = APP.diemCua(D, b.id), toiDa = QC.kt_lan + (+kt.them || 0), lich = kt.lich || [], tl = D.tl[b.id] || [], ck = D.ck[b.id] || [], g = D.ghi[b.id] || {};
    var can = Math.ceil(b.kiem_tra.length * QC.kt_dat);
    var trangThai = kt.dat ? '<span class="qt-chip qt-dat">Đạt</span>' : kt.dang ? '<span class="qt-chip qt-dang">Đang làm</span>' : kt.nop ? '<span class="qt-chip qt-chua">Chưa đạt</span>' : '<span class="qt-chip qt-mo">Chưa làm kiểm tra</span>';
    var co = (p && p.co) || []; if (+kt.dan_tu_luan) co = co.concat('dán ' + kt.dan_tu_luan + ' lần vào tự luận');
    var nhanGhi = { nghe: 'Nghe được gì', rut: 'Rút ra được gì', ap_dung: 'Sẽ áp dụng gì', bai_tap: 'Bài tập đã làm' };
    return '<section class="qt-muc"><h2>Buổi ' + b.so + ' · ' + e(b.ten) + ' ' + trangThai + '</h2>' +
      '<div class="qt-hai"><div><h3>Điểm buổi: <span class="ng">' + (p ? p.tong : 0) + '</span>/100 · ' + e(p ? p.loai : '') + '</h3><table class="bang-tl"><tbody>' +
        '<tr><td>Kiểm tra trắc nghiệm (cao nhất ' + (kt.tot != null ? kt.tot : 0) + '/' + b.kiem_tra.length + ', đạt từ ' + can + ')</td><td>' + (p ? p.kt : 0) + ' / 70</td></tr>' +
        '<tr><td>Chuyên cần — thời gian xem video thật</td><td>' + (p ? p.hoc : 0) + ' / 20</td></tr>' +
        '<tr><td>Câu hỏi nhanh — lần nộp đầu</td><td>' + (p ? p.hn : 0) + ' / 10</td></tr></tbody></table>' +
        (co.length ? '<p class="kt-co">⚑ ' + e(co.join(' · ')) + '</p>' : '') + '</div>' +
      '<div><h3>Lượt thi: ' + (+kt.lan || 0) + '/' + toiDa + (+kt.them ? ' <small>(đã mở thêm ' + kt.them + ')</small>' : '') + '</h3>' +
        (lich.length ? '<table class="qt-bang nho"><thead><tr><th>Lần</th><th>Bắt đầu</th><th>Làm trong</th><th>Đúng</th><th>Rời trang</th><th>Ghi chú</th></tr></thead><tbody>' +
          lich.map(function (l, i) { return '<tr><td>' + (i + 1) + '</td><td>' + e(ngayGio(l.bd)) + '</td><td>' + APP.phutGiay(l.giay) + '</td><td>' + l.dung + '/' + l.tong + '</td><td>' + (+l.roi || 0) + '</td><td>' + [l.tu_nop === 'het-gio' ? 'hết giờ, tự nộp' : '', l.qua_nhanh ? 'làm quá nhanh' : ''].filter(Boolean).join(' · ') + '</td></tr>'; }).join('') + '</tbody></table>' : '<p class="phu">Chưa nộp lượt nào.</p>') +
        (!kt.dat ? '<button class="nut chinh" type="button" data-them-luot="' + b.id + '">Cho thêm 1 lượt thi</button>' : '') + '</div></div>' +
      (b.tu_luan.length ? '<h3>Tự luận</h3>' + b.tu_luan.map(function (q, k) { return '<div class="qt-tl"><p><b>Câu ' + (k + 1) + '.</b> ' + e(q) + '</p><p class="tra">' + (tl[k] ? e(tl[k]) : '<i>Chưa viết</i>') + '</p></div>'; }).join('') : '') +
      (b.checklist && b.checklist.length ? '<h3>Checklist · ' + ck.filter(Boolean).length + '/' + b.checklist.length + '</h3><ul class="qt-ck">' + b.checklist.map(function (c, k) { return '<li class="' + (ck[k] ? 'co' : '') + '">' + (ck[k] ? '✓ ' : '○ ') + e(c) + '</li>'; }).join('') + '</ul>' : '') +
      (Object.keys(nhanGhi).some(function (k) { return (g[k] || '').trim(); }) ? '<h3>Ghi chép</h3>' + Object.keys(nhanGhi).filter(function (k) { return (g[k] || '').trim(); }).map(function (k) { return '<div class="qt-tl"><p><b>' + nhanGhi[k] + '</b></p><p class="tra">' + e(g[k]) + '</p></div>'; }).join('') : '') +
      '</section>';
  }

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  // tệp này nạp SAU ung-dung.js + dang-nhap.js: mở thẳng / F5 ở #/quan-tri thì lần vẽ đầu chưa có trang này → vẽ lại
  if (/^#\/quan-tri/.test(location.hash) && APP.veLai) APP.veLai();
})();
