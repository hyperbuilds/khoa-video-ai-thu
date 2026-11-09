// Khoá nền tảng Video AI — ứng dụng một trang (03/11/2026).
// Trang: #/ tổng quan · #/bai/<id> bài học · #/kiem-tra/<buổi> kiểm tra + nộp kết quả · #/thuat-ngu.
// Trình chiếu: cảnh motion vẽ bằng HTML/CSS trên khung 1280×720; thời lượng mỗi cảnh = độ dài giọng (window.GIONG) hoặc nhịp đọc ước tính.
(function () {
  'use strict';
  var K = window.KHOA;
  var GIONG = window.GIONG || {};
  var KHO = 'khoa-nguyen-ly-v1';
  var D = (function () { try { return JSON.parse(localStorage.getItem(KHO) || '{}') || {}; } catch (x) { return {}; } })();
  ['bai', 'kt', 'tl', 'ck', 'kiem', 'ghi', 'hn', 'hnl'].forEach(function (k) { D[k] = D[k] || {}; });
  D.chung = D.chung || {};
  // lưu trên máy; đã đăng nhập thì dang-nhap.js gửi thêm lên máy chủ (KHOA_DONG_BO, tự gom nhiều lần lưu thành 1 lần gửi)
  function luu() { try { localStorage.setItem(KHO, JSON.stringify(D)); } catch (x) {} if (window.KHOA_DONG_BO) { try { window.KHOA_DONG_BO(); } catch (x2) {} } }
  function caiDat(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (x) { return null; } }

  var e = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var so = function (v) { return Math.round(v).toLocaleString('vi-VN'); };
  var hai = function (n) { return ('0' + n).slice(-2); };
  // chữ nhấn Fraunces nghiêng cho vài chữ cuối tiêu đề (như video mới): phần sau dấu phẩy / hai chấm nếu ngắn, không thì 2 chữ cuối
  function chiaNghieng(t) {
    t = String(t || '');
    var cat = Math.max(t.lastIndexOf(', '), t.lastIndexOf(': '));
    if (cat > 0 && t.slice(cat + 2).split(' ').length <= 3) return [t.slice(0, cat + 2), t.slice(cat + 2)];
    var w = t.split(' ');
    if (w.length <= 1) return ['', t];
    var n = w.length <= 3 ? 1 : 2;
    if (w.length > n + 1 && /^\d+$/.test(w[w.length - n - 1])) n++;
    if (n > 1 && /^(và|là)$/i.test(w[w.length - n])) n--;
    return [w.slice(0, w.length - n).join(' ') + ' ', w.slice(w.length - n).join(' ')];
  }
  function nghieng(t) { var p = chiaNghieng(t); return e(p[0]) + '<em class="ng">' + e(p[1]) + '</em>'; }

  var DS = [];
  K.buoi.forEach(function (b) { b.bai.forEach(function (bai, i) { DS.push({ b: b, bai: bai, i: i }); }); });
  var timBai = function (id) { return DS.filter(function (x) { return x.bai.id === id; })[0]; };
  var timBuoi = function (id) { return K.buoi.filter(function (b) { return b.id === id; })[0]; };
  var baiXong = function (id) { return !!(D.bai[id] && D.bai[id].xong); };
  var baiXem = function (id) { return !!(D.bai[id] && D.bai[id].xem); };
  var ktDat = function (bid) { return !!(D.kt[bid] && D.kt[bid].dat); };

  // ================================================================ QUY CHẾ HỌC + THI (06/11, user: "như thi online")
  // Học tuần tự: xong bài trước (xem hết video + nộp câu hỏi nhanh + bấm Hoàn thành) mới mở bài sau; đạt kiểm tra buổi trước mới mở buổi sau.
  // Đáp án chỉ hiện khi đã bấm Nộp. Kiểm tra cuối buổi: có giờ, giới hạn lượt, xáo câu, đếm số lần rời trang (quá ngưỡng thì tự nộp).
  // Điểm buổi (100) = kiểm tra 70 (điểm cao nhất) + chuyên cần 20 (thời gian xem video thật, tối đa 100 %) + câu hỏi nhanh lần nộp đầu 10.
  // Thời gian làm bài và số lần rời trang KHÔNG cộng / trừ điểm (như Moodle, Canvas): chỉ ghi lại và gắn cờ cho người chấm xem.
  var QC = { kt_phut: 10, kt_lan: 2, kt_cach_phut: 60, kt_dat: .8, giay_moi_cau_toi_thieu: 3, roi_gan_co: 3, toc_max: 1.1 };
  // mở toàn bộ bài (bỏ khoá tuần tự, bỏ chờ giữa 2 lượt thi): localStorage 'khoa-mo-het' = '1'.
  // 09/11 (user: "thêm nút đóng, mở toàn bộ bài học cho admin"): nút trên đầu trang chỉ hiện với quản trị (dang-nhap.js);
  // đã đăng nhập mà KHÔNG phải quản trị thì cờ không có tác dụng (người học tự đặt localStorage cũng không mở được).
  function moHet() { if (caiDat('khoa-mo-het') !== '1') return false; var mc = window.KHOA_MAY_CHU; return !(mc && mc.daVao && mc.daVao() && !mc.laQuanTri()); }
  var hnNop = function (id) { var h = D.hnl[id]; return !!(h && h.lan); };
  function viTriBai(id) { for (var i = 0; i < DS.length; i++) if (DS[i].bai.id === id) return i; return -1; }
  // điều còn thiếu để mở bài id (null = đã mở)
  // 09/11 (Phần 3 hai con đường): buổi có mo_sau thì mở khi ĐẠT kiểm tra buổi đó (Buổi 6 và 8 cùng mở sau Buổi 5; 7 sau 6; 9 sau 8);
  // buổi không có mo_sau thì mở sau buổi liền trước như cũ. Trong một buổi vẫn học tuần tự từng bài.
  function buoiTruoc(b) { if (b.mo_sau) return timBuoi(b.mo_sau); var k = K.buoi.indexOf(b); return k > 0 ? K.buoi[k - 1] : null; }
  // nút cuối trang kiểm tra: các buổi mở ra nhờ buổi này (Buổi 5 → cả hai con đường); hết nhánh thì gợi ý con đường còn lại chưa học
  function nutBuoiSau(b) {
    var ten = function (x) { return 'Sang Buổi ' + x.so + (x.con_duong && K.con_duong ? ' · ' + K.con_duong[x.con_duong] : x.phan === 2 && (b.phan || 1) === 1 ? ' · thực hành trên Xưởng' : ''); };
    var con = K.buoi.filter(function (x) { return buoiTruoc(x) === b; });
    if (con.length) return con.map(function (x, k) { return '<a class="nut' + (k === 0 ? ' chinh' : '') + '" href="#/bai/' + x.bai[0].id + '">' + e(ten(x)) + ' →</a>'; }).join('');
    var khac = K.buoi.filter(function (x) { return x.con_duong && x.con_duong !== b.con_duong && !ktDat(x.id) && !chuaMo(x.bai[0].id); })[0];
    if (b.con_duong && khac) return '<a class="nut chinh" href="#/bai/' + khac.bai[0].id + '">Học thêm ' + e(K.con_duong[khac.con_duong]) + ' →</a>';
    return '<a class="nut chinh" href="#/">Về trang khoá học →</a>';
  }
  function chuaMo(id) {
    var i = viTriBai(id); if (moHet() || i <= 0) return null;
    var cur = DS[i];
    if (cur.i === 0) {
      var tb = buoiTruoc(cur.b); if (!tb) return null;
      if (!ktDat(tb.id)) return { chu: 'Đạt bài kiểm tra cuối Buổi ' + tb.so + ' để mở Buổi ' + cur.b.so + '.', link: '#/kiem-tra/' + tb.id, nut: 'Làm kiểm tra Buổi ' + tb.so };
      // 09/11: gửi đánh giá buổi trước mới mở buổi sau (danh-gia.js). Ai đã vào buổi sau từ trước khi có đánh giá thì không bị khoá lại.
      if (canDanhGia(tb.id) && !(D.bai[cur.bai.id] && D.bai[cur.bai.id].mo)) return { chu: 'Gửi đánh giá Buổi ' + tb.so + ' (khoảng 3 phút) để mở Buổi ' + cur.b.so + '.', link: '#/kiem-tra/' + tb.id + '/danh-gia', nut: 'Đánh giá Buổi ' + tb.so };
      return null;
    }
    var tr = DS[i - 1];
    return baiXong(tr.bai.id) ? null : { chu: 'Hoàn thành bài ' + tr.b.so + '.' + (tr.i + 1) + ' (xem hết video, nộp câu hỏi nhanh, bấm Hoàn thành) để mở bài này.', link: '#/bai/' + tr.bai.id, nut: 'Về bài ' + tr.b.so + '.' + (tr.i + 1) };
  }
  // còn phải gửi đánh giá buổi bid không (chỉ khi có mô-đun đánh giá — bản offline không có — và không ở chế độ mở toàn bộ)
  function canDanhGia(bid) { var G = window.KHOA_DANH_GIA; return !!G && !moHet() && !G.daGui(D, bid); }
  function chuaMoKt(bid) {
    var b = timBuoi(bid); if (moHet() || !b) return null;
    var thieu = b.bai.filter(function (x) { return !baiXong(x.id); })[0];
    if (thieu) return { chu: 'Hoàn thành đủ ' + b.bai.length + ' bài của Buổi ' + b.so + ' để mở bài kiểm tra.', link: '#/bai/' + thieu.id, nut: 'Học tiếp bài còn thiếu' };
    var vt = viTriBai(b.bai[0].id); return vt >= 0 ? chuaMo(b.bai[0].id) : null;
  }
  function daiBai(x) { var v = VIDEO_BAI[x.bai.id]; if (v) return v.dai; return x.bai.canh.reduce(function (s, c, k) { var g = GIONG[x.bai.id + '-' + (k + 1)]; return s + (g && g.dai ? g.dai + .45 : Math.max(3.6, c.loi.length / 14.5 + .9)); }, 0); }
  function diemBuoi(b) {
    var kt = D.kt[b.id] || {}, ds = DS.filter(function (x) { return x.b === b; }), tong = b.kiem_tra.length;
    var tn = kt.tot != null ? kt.tot : (kt.nop ? kt.dung || 0 : 0);
    var hoc = ds.reduce(function (s, x) { var r = D.bai[x.bai.id] || {}; return s + Math.min(1, (+r.giay || 0) / (daiBai(x) / QC.toc_max * .95)); }, 0) / ds.length;
    var hnD = 0, hnT = 0; ds.forEach(function (x) { var h = D.hnl[x.bai.id]; if (h && h.lan1) { hnD += h.lan1.dung; hnT += h.lan1.tong; } else hnT += x.bai.hoi_nhanh.length; });
    var lich = kt.lich || [], roi = lich.reduce(function (s, l) { return s + (+l.roi || 0); }, 0), nhanh = lich.some(function (l) { return l.qua_nhanh; });
    var p = { kt: Math.round(tn / tong * 70), hoc: Math.round(hoc * 20), hn: hnT ? Math.round(hnD / hnT * 10) : 0 };
    p.tong = p.kt + p.hoc + p.hn;
    p.co = []; if (roi >= QC.roi_gan_co) p.co.push('rời trang ' + roi + ' lần khi làm bài'); if (nhanh) p.co.push('có lượt làm quá nhanh (dưới ' + QC.giay_moi_cau_toi_thieu + ' giây / câu)');
    p.loai = !kt.nop ? 'Chưa làm' : p.tong >= 85 ? 'Giỏi' : p.tong >= 70 ? 'Khá' : p.tong >= 50 ? 'Đạt' : 'Chưa đạt';
    return p;
  }
  function phutGiay(s) { s = Math.round(+s || 0); return Math.floor(s / 60) + '′' + ('0' + s % 60).slice(-2) + '″'; }
  function trangKhoa(tieu, thieu) {
    main.innerHTML = '<div class="trang-kt"><header class="dau-bai"><span class="nhan">Chưa mở</span><h1>' + nghieng(tieu) + '</h1></header>' +
      '<div class="khoa-the"><i aria-hidden="true"></i><div><b>Học theo thứ tự</b><p>' + e(thieu.chu) + '</p></div><a class="nut chinh" href="' + thieu.link + '">' + e(thieu.nut) + ' →</a></div></div>';
  }
  // thời gian trên trang bài (chỉ đếm khi trang đang hiện và đang được chọn)
  var demTrang = 0;
  function batDemTrang(id) {
    var r = D.bai[id] = D.bai[id] || {}, n = 0;
    demTrang = setInterval(function () { if (document.visibilityState === 'visible' && document.hasFocus()) { r.tg_trang = (+r.tg_trang || 0) + 1; if (++n % 20 === 0) luu(); } }, 1000);
  }
  function capNhatNutXong() {
    var nut = document.getElementById('xong-bai'); if (!nut) return;
    var id = nut.getAttribute('data-bai'), x = timBai(id), thieu = [];
    if (!baiXem(id)) thieu.push('xem hết video');
    if (x && x.bai.hoi_nhanh.length && !hnNop(id)) thieu.push('nộp câu hỏi nhanh');
    nut.disabled = thieu.length > 0;
    var g = document.querySelector('.khoa-xong'); if (g) g.textContent = thieu.length ? 'Cần ' + thieu.join(' và ') + ' để mở nút này' : '';
  }
  document.addEventListener('da-xem-bai', capNhatNutXong);
  document.addEventListener('da-nop-hoi-nhanh', capNhatNutXong);
  var donKT = null; // dọn bài thi đang mở khi chuyển trang

  // ================================================================ khung trang
  var app = document.getElementById('app');
  app.innerHTML =
    '<a class="bo-qua" href="#noi-dung">Bỏ qua, tới nội dung</a>' +
    '<header class="dau">' +
      '<button class="nut vuong nut-menu" type="button" aria-label="Mở mục lục" aria-controls="muc-luc" aria-expanded="false">☰</button>' +
      '<a class="logo" href="#/" aria-label="Hecatech · ' + e(K.ten) + ' — về trang khoá học"><svg class="logo-hct" viewBox="0 0 363.18 81.52" aria-hidden="true"><use href="#hct-logo"/></svg><span class="logo-ke" aria-hidden="true"></span><span><b>' + e(K.ten) + '</b><small>Khoá nền tảng · ' + K.buoi.length + ' buổi</small></span></a>' +
      '<span class="gian"></span>' +
      '<div class="tien-khoa" title="Tiến độ khoá học"><svg class="vong-tien" viewBox="0 0 34 34" aria-hidden="true"><circle class="nen-v" cx="17" cy="17" r="14"/><circle class="day-v" cx="17" cy="17" r="14" stroke-dasharray="87.96" stroke-dashoffset="87.96"/></svg><span id="tien-chu"></span></div>' +
      '<button class="nut vuong nut-gon" type="button" aria-label="Thu gọn mục lục" title="Thu gọn / mở mục lục">⇤</button>' +
      '<button class="nut vuong" type="button" id="nut-gd" aria-label="Đổi giao diện sáng / tối"></button>' +
      '<a class="nut" id="nut-gop-y" href="#" target="_blank" rel="noopener">Góp ý</a>' +
    '</header>' +
    '<div class="vo"><nav class="muc-luc" id="muc-luc" aria-label="Mục lục khoá học"></nav><main class="chinh-trang" id="noi-dung" tabindex="-1"></main></div>';
  var main = $('#noi-dung'), mucLuc = $('#muc-luc');

  // giao diện sáng / tối — dùng chung lựa chọn với Xưởng ('giao-dien' = sang · toi)
  var nutGd = $('#nut-gd');
  function datGd(v) { if (v) document.documentElement.setAttribute('data-theme', v === 'toi' ? 'dark' : 'light'); veGd(); }
  function laToi() { var t = document.documentElement.getAttribute('data-theme'); return t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches; }
  function veGd() { nutGd.textContent = laToi() ? '☀' : '☾'; nutGd.title = laToi() ? 'Sang giao diện sáng' : 'Sang giao diện tối'; }
  datGd(caiDat('giao-dien'));
  nutGd.addEventListener('click', function () { var v = laToi() ? 'sang' : 'toi'; caiDat('giao-dien', v); datGd(v); });
  $('.nut-gon').addEventListener('click', function () { var on = document.documentElement.classList.toggle('gon-muc'); caiDat('gon-muc', on ? '1' : '0'); });
  if (caiDat('gon-muc') === '1') document.documentElement.classList.add('gon-muc');
  if (caiDat('khung-rong') !== '0') document.documentElement.classList.add('khung-rong'); // khung video rộng hết trang = MẶC ĐỊNH (06/11: khung cạnh tài liệu chỉ ~720 điểm ảnh → chữ trong video mờ); nút trên trình phát để tắt
  var nutMenu = $('.nut-menu');
  nutMenu.addEventListener('click', function () { var on = document.documentElement.classList.toggle('mo-muc'); nutMenu.setAttribute('aria-expanded', on ? 'true' : 'false'); });

  // ================================================================ tiến độ + mục lục
  function demTien() {
    var tong = DS.length + K.buoi.length, xong = 0;
    DS.forEach(function (x) { if (baiXong(x.bai.id)) xong++; });
    K.buoi.forEach(function (b) { if (ktDat(b.id)) xong++; });
    return { tong: tong, xong: xong, pct: Math.round(xong / tong * 100) };
  }
  function veTien() {
    var t = demTien();
    $('.day-v').setAttribute('stroke-dashoffset', (87.96 * (1 - t.xong / t.tong)).toFixed(2));
    $('#tien-chu').textContent = t.pct + '% · ' + t.xong + '/' + t.tong + ' mục';
  }
  function veMucLuc(dang) {
    var h = '<a class="ml-tong" href="#/"' + (dang === 'tong' ? ' aria-current="page"' : '') + '>Tổng quan khoá học</a>', phanTruoc = 0, cdTruoc = 0;
    K.buoi.forEach(function (b) {
      var xong = b.bai.filter(function (x) { return baiXong(x.id); }).length + (ktDat(b.id) ? 1 : 0);
      var phan = b.phan || 1;
      if (phan !== phanTruoc && K.phan) { h += '<p class="ml-phan">' + e(K.phan[phan]) + '</p>'; phanTruoc = phan; }
      // Phần 3: tiêu đề từng con đường (09/11)
      if (b.con_duong && b.con_duong !== cdTruoc && K.con_duong) { h += '<p class="ml-con-duong"><span>' + e(K.con_duong[b.con_duong]) + '</span>' + (b.mo_sau ? '<small>mở sau Buổi ' + (timBuoi(b.mo_sau) || {}).so + '</small>' : '') + '</p>'; cdTruoc = b.con_duong; }
      h += '<div class="ml-buoi"><div class="ml-buoi-dau"><small>Buổi ' + hai(b.so) + '</small><b>' + e(b.ten) + '</b>' +
        '<div class="ml-thanh" title="' + xong + '/' + (b.bai.length + 1) + ' mục"><i style="width:' + Math.round(xong / (b.bai.length + 1) * 100) + '%"></i></div></div><ol>';
      b.bai.forEach(function (x, i) {
        var khoaB = !!chuaMo(x.id), tt = baiXong(x.id) ? 'xong' : khoaB ? 'khoa' : baiXem(x.id) ? 'xem' : '';
        h += '<li><a href="#/bai/' + x.id + '"' + (dang === x.id ? ' aria-current="page"' : '') + (khoaB ? ' class="bi-khoa" title="Hoàn thành bài trước để mở"' : '') + '><span class="dau-tt ' + tt + '" aria-hidden="true"></span><span><span class="ml-so">' + b.so + '.' + (i + 1) + '</span>' + e(x.ten) +
          '<span class="an-sr">' + (tt === 'xong' ? ' (đã xong)' : tt === 'khoa' ? ' (chưa mở)' : tt === 'xem' ? ' (đã xem video)' : '') + '</span></span><small>' + x.phut + ' phút</small></a></li>';
      });
      var khoaK = !!chuaMoKt(b.id);
      h += '<li><a href="#/kiem-tra/' + b.id + '"' + (dang === 'kt-' + b.id ? ' aria-current="page"' : '') + (khoaK ? ' class="bi-khoa" title="Hoàn thành đủ bài trong buổi để mở"' : '') + '><span class="dau-tt kt ' + (ktDat(b.id) ? 'xong' : khoaK ? 'khoa' : '') + '" aria-hidden="true"></span><span>Kiểm tra &amp; đánh giá</span><small>' + QC.kt_phut + ' phút</small></a></li></ol></div>';
    });
    h += '<div class="ml-them"><b>Thuật ngữ</b><span>' + K.thuat_ngu.length + ' từ hay gặp trong khoá học.</span><a href="#/thuat-ngu">Xem bảng thuật ngữ →</a></div>';
    if (window.KHOA_DANH_GIA) h += '<div class="ml-them"><b>Góp ý chung</b><span>' + (window.KHOA_DANH_GIA.daGuiChung(D) ? 'Bạn đã gửi. Cảm ơn bạn!' : 'Các buổi đào tạo từ trước tới giờ — khoảng 4 phút.') + '</span><a href="#/gop-y-chung"' + (dang === 'gy' ? ' aria-current="page"' : '') + '>' + (window.KHOA_DANH_GIA.daGuiChung(D) ? 'Xem / sửa góp ý →' : 'Góp ý ngay →') + '</a></div>';
    mucLuc.innerHTML = h;
    veTien();
  }

  // góp ý: form Google điền sẵn buổi + mục đang xem
  var gopY = { buoi: K.buoi[0].gop_y_ten, muc: 'Tổng quan khoá học' };
  var nutGopY = $('#nut-gop-y');
  function linkGopY() {
    var g = K.gop_y;
    return g.url + '?usp=pp_url&' + g.buoi + '=' + encodeURIComponent(gopY.buoi) + '&' + g.muc + '=' + encodeURIComponent(gopY.muc);
  }
  // 09/11: có mô-đun đánh giá (bản online) → nút Góp ý mở hộp "Báo chỗ chưa ổn" ghi thẳng vào Sheet; bản offline vẫn mở Google Form cũ
  ['pointerdown', 'focus', 'click'].forEach(function (ev) {
    nutGopY.addEventListener(ev, function (x) {
      if (window.KHOA_DANH_GIA) { nutGopY.removeAttribute('target'); nutGopY.setAttribute('href', '#'); if (ev === 'click') { x.preventDefault(); window.KHOA_DANH_GIA.moBao(); } return; }
      nutGopY.href = linkGopY();
    });
  });
  if (window.KHOA_DANH_GIA) { nutGopY.setAttribute('role', 'button'); nutGopY.removeAttribute('target'); nutGopY.title = 'Báo chỗ chưa ổn trên trang đang xem'; }

  // ================================================================ đồ hoạ dùng chung
  var NUT_VONG = [
    { t: 'Dữ liệu lớn', g: 'Hàng trăm video bán chạy nhất: TikTok Shop (Kalodata, FastMoss), Douyin (Chanmama), sàn Amazon, quảng cáo Facebook. Cùng video thắng của chính brand từ shop TikTok và GMV Max, công thức hook đã thắng, cảnh quay đã gắn nhãn, hồ sơ sản phẩm và toàn bộ video team đã làm kèm số đơn thật. Đây là lợi thế lớn nhất so với trước đây.' },
    { t: 'Agent học\ncông thức', g: 'Agent rút ra video thắng mở đầu thế nào, chứng minh thế nào, kêu gọi thế nào. Đầu vào càng đủ và đúng, công thức càng chuẩn.' },
    { t: 'Kịch bản', d: 1, g: 'Điểm quan trọng nhất: giọng, cảnh, chữ đều căn cứ từ kịch bản. Bạn duyệt kịch bản kỹ nhất — sửa ở đây rẻ nhất.' },
    { t: 'Giọng + hình', g: 'Máy đọc giọng theo lời, chọn cảnh theo ý từng câu, chèn chữ từ câu then chốt.' },
    { t: 'Video', d: 1, g: 'Bạn xem lần cuối trước khi đăng. Sửa ở đây đắt hơn sửa ở kịch bản, nên lỗi nào bắt được sớm thì bắt sớm.' },
    { t: 'Đăng + đo', g: 'Đăng có link TikTok, gắn giỏ. Đo bằng nhiều chỉ số: lượt xem, bấm giỏ, đơn hàng, CTR (tỉ lệ click vào quảng cáo), CVR (tỉ lệ ra đơn), CPM, CPA (chi phí quảng cáo)… để biết video nào thật sự bán được.' },
    { t: 'Học lại', g: 'Kaizen — cải tiến liên tục. Bài học từ số đo và từ những lần bạn sửa được ghi lại, Agent nhớ, nên lỗi chỉ phải sửa một lần. Vòng sau bắt đầu từ chỗ giỏi hơn vòng trước.' }
  ];
  function svgVong(sang, kieu) {
    var h = '<svg viewBox="0 0 640 400" role="img" aria-label="Vòng workflow 7 bước: dữ liệu lớn, Agent học công thức, kịch bản, giọng và hình, video, đăng và đo, học lại.">' +
      '<path class="duong-v' + (kieu === 's' ? '' : '') + '" d="M 320 60 A 250 140 0 1 1 319.9 60 Z"/>' +
      '<text class="giua1" x="320" y="198" text-anchor="middle">1 vòng</text><text class="giua2" x="320" y="222" text-anchor="middle">mỗi vòng giỏi hơn vòng trước</text>';
    NUT_VONG.forEach(function (n, i) {
      var g = (-90 + i * 360 / 7) * Math.PI / 180, x = 320 + 250 * Math.cos(g), y = 200 + 140 * Math.sin(g);
      var dong = n.t.split('\n'), cao = dong.length > 1 ? 58 : 46;
      var on = sang && sang.indexOf(i) >= 0;
      var tre = kieu === 's' && on ? ' class="a" style="--kieu:s-no;--tre:.35s"' : '';
      h += '<g class="o-vong' + (n.d ? ' duyet' : '') + (on ? ' sang' : '') + '" data-i="' + i + '" transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ')"' +
        (kieu === 'tl' ? ' tabindex="0" role="button" aria-label="' + e(n.t.replace('\n', ' ')) + '"' : '') + '><g' + tre + '>' +
        '<rect x="-74" y="' + (-cao / 2) + '" width="148" height="' + cao + '" rx="14"/>' +
        dong.map(function (d, k) { return '<text text-anchor="middle" y="' + (dong.length > 1 ? (k === 0 ? -4 : 16) : 6) + '">' + e(d) + '</text>'; }).join('') +
        (n.d ? '<text class="sao" text-anchor="middle" y="' + (-cao / 2 - 8) + '">★ NGƯỜI DUYỆT</text>' : '') + '</g></g>';
    });
    return h + '</svg>';
  }

  // ================================================================ cảnh motion
  function st(kieu, tre, dai) { return 'style="--kieu:' + kieu + ';--tre:' + tre.toFixed(2) + 's' + (dai ? ';--dai:' + dai + 's' : '') + '"'; }
  function dem(den, bd, dai, hau) { return '<span class="dem" data-den="' + den + '" data-bd="' + bd.toFixed(2) + '" data-dai="' + (dai || 1.4) + '" data-hau="' + e(hau || '') + '">0' + e(hau || '') + '</span>'; }
  // 5 hook = 5 màu trong họ nhận diện (vàng đất · xanh 700 · xám slate · xanh 900 · nâu đỏ), chữ trắng đều đạt AA
  var MAU_HOOK = ['#8A5A00', '#1F714B', '#58585A', '#14462E', '#9C4221'];
  var CANH = {
    'tieu-de': function (h) {
      var tu = h.tieu.split(' '), soThuong = chiaNghieng(h.tieu)[0].trim().split(' ').filter(Boolean).length;
      // hiện ngay từ khung đầu (khung 0 không được trống — người xem / ảnh bìa thấy chữ liền); vài chữ cuối Fraunces nghiêng xanh như video mới
      return '<div class="c-nhan a" ' + st('s-trai', -.2) + '>' + e(h.nhan) + '</div>' +
        '<h1 class="c-h1">' + tu.map(function (w, k) { return '<span class="a' + (k >= soThuong ? ' ng' : '') + '" ' + st('s-chu', -.15 + k * .07, .45) + '>' + e(w) + '</span>'; }).join('') + '</h1>' +
        '<div class="c-gach a" ' + st('s-gach', .15 + tu.length * .07, .5) + '></div>' +
        (h.phu ? '<p class="c-phu a" ' + st('s-len', .4 + tu.length * .08) + '>' + e(h.phu) + '</p>' : '');
    },
    'so-sanh': function (h, d) {
      return '<div class="c-tieu a" ' + st('s-mo', .1) + '>' + e(h.tieu) + '</div><div class="ss">' +
        '<div class="ss-o cu a" ' + st('s-trai', .35) + '><small>' + e(h.nhan_truoc || 'Trước đây') + '</small><p>' + e(h.truoc) + '</p></div>' +
        '<div class="ss-mui a" ' + st('s-no', d * .4) + '>→</div>' +
        '<div class="ss-o moi a" ' + st('s-phai', d * .44) + '><small>' + e(h.nhan_nay || 'Bây giờ') + '</small><p>' + e(h.nay) + '</p></div></div>';
    },
    'so': function (h, d) {
      var mot = h.muc.length === 1;
      return (h.tieu ? '<div class="c-tieu a" ' + st('s-mo', .1) + '>' + e(h.tieu) + '</div>' : '') +
        '<div class="so-hang' + (mot ? ' mot' : '') + '">' + h.muc.map(function (m, k) {
          var t = .35 + k * .55;
          return '<div class="so-o a" ' + st('s-len', t) + '><div class="so-trai">' + (m.tu ? '<div class="tu"><s>' + e(m.tu) + '</s> →</div>' : '') +
            '<div class="so">' + dem(m.so, t + .15, 1) + (m.hau ? '<small>' + e(m.hau) + '</small>' : '') + '</div></div>' +
            '<div class="so-phai"><div class="don">' + e(m.don) + '</div>' + (m.phu ? '<div class="phu">' + e(m.phu) + '</div>' : '') + '</div></div>';
        }).join('') + '</div>' +
        (h.dau ? '<div class="dau-cam a" ' + st('s-no', Math.max(2.2, d * .62)) + '>' + e(h.dau) + '</div>' : '');
    },
    'cot': function (h, d) {
      var max = Math.max.apply(null, h.cot.map(function (c) { return c.gt; })), n = h.cot.length;
      return '<div class="c-dau"><div class="c-tieu a" ' + st('s-mo', .1) + '>' + e(h.tieu) + '</div>' +
        (h.chu_cuoi ? '<div class="dau-cam a" ' + st('s-no', d * .72) + '>' + e(h.chu_cuoi) + '</div>' : '') + '</div><div><div class="cot-khung">' + h.cot.map(function (c, k) {
        var t = .4 + k * (d * .5 / n);
        return '<div class="cot-o' + (k === n - 1 ? ' cuoi' : '') + '"><div class="gt a" ' + st('s-mo', t + .2) + '>' + dem(c.gt, t + .1, .8, h.hau) + '</div>' +
          '<div class="than a" style="height:' + Math.round(210 * c.gt / max) + 'px;--kieu:s-moc;--tre:' + t.toFixed(2) + 's;--dai:.7s"></div></div>';
      }).join('') + '</div><div class="cot-x">' + h.cot.map(function (c) { return '<span>' + e(c.nhan) + '</span>'; }).join('') + '</div></div>';
    },
    'cot-ngang': function (h, d) {
      var max = Math.max.apply(null, h.cot.map(function (c) { return c.gt; })), n = h.cot.length;
      return '<div class="c-tieu a" ' + st('s-mo', .1) + '>' + e(h.tieu) + '</div><div class="cot-ngang">' + h.cot.map(function (c, k) {
        var t = .4 + k * (d * .45 / n);
        return '<div class="cn-dong a' + (c.gt >= 50 ? ' cao' : c.gt < 30 ? ' thap' : '') + '" ' + st('s-mo', t) + '><span class="ten">' + e(c.nhan) + '</span>' +
          '<span class="ray"><i class="a" style="width:' + (c.gt / max * 100).toFixed(1) + '%;--kieu:s-ngang;--tre:' + (t + .1).toFixed(2) + 's;--dai:.6s"></i></span><span class="gt">' + dem(c.gt, t + .1, 1, h.hau) + '</span></div>';
      }).join('') + '</div>';
    },
    'trich': function (h, d) {
      var tu = h.chu.split(' '), buoc = Math.min(.12, (d * .5) / tu.length);
      return '<div class="trich-s' + (h.to ? ' to' : '') + '"><span class="ngoac a" ' + st('s-no', .1) + '>“</span><p>' +
        tu.map(function (w, k) { return '<span class="a" ' + st('s-chu', .3 + k * buoc, .35) + '>' + e(w) + '</span>'; }).join('') + '</p>' +
        '<footer class="a" ' + st('s-mo', .5 + tu.length * buoc) + '>' + e(h.nguon) + '</footer></div>';
    },
    'danh-sach': function (h, d) {
      var n = h.muc.length;
      return '<div class="c-tieu a" ' + st('s-mo', .1) + '><b>' + e(h.tieu) + '</b></div><div class="ds-s' + (n >= 4 ? ' ngan' : '') + '">' + h.muc.map(function (m, k) {
        return '<div class="dong a" ' + st('s-trai', .6 + k * ((d * .8 - .6) / n)) + '><span class="ds-so">' + (k + 1) + '</span><div><b>' + e(m.tieu) + '</b><span>' + e(m.chu) + '</span></div></div>';
      }).join('') + '</div>';
    },
    'vong': function (h, d) {
      return '<div class="vong-s' + (h.chip ? ' co-chip' : '') + '">' + svgVong(h.sang, 's') + (h.chip ? '<div class="chip-s">' + h.chip.map(function (c, k) {
        return '<span class="a" ' + st('s-no', d * .3 + k * .45) + '>' + e(c) + '</span>';
      }).join('') + '</div>' : '') + '</div>';
    },
    'nhom': function (h, d) {
      if (h.ngan) {
        return '<div class="nhom-s"><div class="o n1 a" ' + st('s-trai', .4) + '><small>Nhóm 1 · Mở đường</small><p class="lon">' + e(h.n1) + '</p></div>' +
          '<div class="o n2 a" ' + st('s-phai', d * .42) + '><small>Nhóm 2 · Nhân rộng</small><p class="lon">' + e(h.n2) + '</p></div></div>';
      }
      var kn1 = ['Đạo diễn', 'Quay thêm cảnh', 'Dựng video chuyển đổi'], kn2 = ['Kịch bản', 'Nhận angle', 'Dùng Agent', 'Đánh giá + Kaizen'];
      var t2 = d * .5;
      return '<div class="nhom-s"><div class="o n1 a" ' + st('s-trai', .4) + '><small>Nhóm 1 · Mở đường</small><h3>Sản phẩm mới + sản phẩm đang giảm số</h3><p>Cần người toàn diện — sẽ cầm dự án mới</p><div class="kn">' +
        kn1.map(function (k, i) { return '<span class="a" ' + st('s-no', 1.2 + i * .5) + '>' + e(k) + '</span>'; }).join('') + '</div></div>' +
        '<div class="o n2 a" ' + st('s-phai', t2) + '><small>Nhóm 2 · Nhân rộng</small><h3>Sản phẩm đang win</h3><p>Nhân rộng cái đang bán tốt</p><div class="kn">' +
        kn2.map(function (k, i) { return '<span class="a" ' + st('s-no', t2 + .8 + i * .5) + '>' + e(k) + '</span>'; }).join('') + '</div></div></div>';
    },
    'bac-thang': function (h, d) {
      return '<div class="bac-s">' + h.muc.map(function (m, k) {
        var lop = k < h.o ? 'qua' : k === h.o ? 'day' : 'dich', co = k < h.o ? 'Đã vượt' : k === h.o ? 'Đang ở đây' : 'Đích';
        return '<div class="o ' + lop + ' a" style="--kieu:s-moc;--tre:' + (.4 + k * (d * .45 / 3)).toFixed(2) + 's;--dai:.55s"><span class="co a" ' + st('s-no', d * .72 + k * .2) + '>' + co + '</span>' +
          '<small>TẦNG ' + (k + 1) + '</small><b>' + e(m.tieu) + '</b><span>' + e(m.chu) + '</span></div>';
      }).join('') + '</div>';
    },
    'buoc': function (h, d) {
      var n = h.muc.length;
      return '<div class="buoc-s">' + h.muc.map(function (m, k) {
        return '<div class="o a" ' + st('s-len', .5 + k * ((d * .85 - .5) / n)) + '><i>' + (k + 1) + '</i><b>' + e(Array.isArray(m) ? m[0] : m) + '</b></div>';
      }).join('') + '</div>';
    },
    'thoi-gian': function (h, d) {
      var t = [d * .12, d * .38, d * .66];
      return '<div class="tg-s"><div class="vach">' +
        '<div class="h a" style="--kieu:s-ngang;--tre:' + t[0].toFixed(2) + 's;--dai:.5s">Hook<small>0–3 giây</small></div>' +
        '<div class="t a" style="--kieu:s-ngang;--tre:' + t[1].toFixed(2) + 's;--dai:.55s">Thân<small>3–25 giây · chứng minh</small></div>' +
        '<div class="k a" style="--kieu:s-ngang;--tre:' + t[2].toFixed(2) + 's;--dai:.5s">Kêu gọi<small>25–30 giây</small></div></div>' +
        '<div class="giai"><div class="a" ' + st('s-len', t[0] + .3) + '><b>Dừng tay</b>làm người xem ở lại</div><div class="a" ' + st('s-len', t[1] + .3) + '><b>Tin</b>bằng chứng thật</div><div class="a" ' + st('s-len', t[2] + .3) + '><b>Hành động</b>một việc rõ ràng</div></div></div>';
    },
    'nhan': function (h, d) {
      return '<div class="c-tieu a" ' + st('s-mo', .1) + '><b>1 thân đã thắng × 5 hook = 5 video mới</b></div><div class="nhan-s">' + ['A', 'B', 'C', 'D', 'E'].map(function (c, k) {
        var t = .5 + k * (d * .55 / 5);
        return '<div class="hang a" ' + st('s-trai', t) + '><span class="hk" style="background:' + MAU_HOOK[k] + '">Hook ' + c + '</span><span class="th">Thân video đã thắng</span><span class="mt">→</span><span class="kq">Video ' + (k + 1) + '</span></div>';
      }).join('') + '</div>';
    },
    'lo': function (h, d) {
      var t = d * .42, o = '';
      for (var k = 0; k < 10; k++) o += '<span class="a" ' + st('s-no', t + .2 + k * .14) + '>' + (k + 1) + '</span>';
      return '<div class="lo-s"><div class="mau a" ' + st('s-no', .3) + '><div class="tick">✓</div><b>Video mẫu</b><span>đã duyệt kỹ từng phần</span></div>' +
        '<div class="mui a" ' + st('s-trai', t) + '>→</div><div class="luoi-lo">' + o + '</div></div>';
    },
    'doc-so': function (h, d) {
      var c = [['h', 'Hook', 'Lượt xem', 'tỷ lệ giữ người xem vài giây đầu'], ['t', 'Thân', 'Thời gian xem', 'người xem ở lại bao lâu'], ['k', 'Kêu gọi', 'Bấm giỏ, đơn hàng', 'có hành động hay không']];
      return '<div class="c-tieu a" ' + st('s-mo', .1) + '><b>Đọc số theo từng phần</b></div><div class="dso-s">' + c.map(function (x, k) {
        return '<div class="o ' + x[0] + ' a" ' + st('s-len', .5 + k * (d * .24)) + '><small>' + x[1] + '</small><b>' + x[2] + '</b><span>' + x[3] + '</span></div>';
      }).join('') + '</div>';
    },
    'chip': function (h, d) {
      var n = h.muc.length;
      return '<div class="c-tieu a" ' + st('s-mo', .1) + '><b>' + e(h.tieu) + '</b></div><div class="chip-s lon">' + h.muc.map(function (c, k) {
        return '<span class="a" ' + st('s-no', .6 + k * (d * .75 / n)) + '>' + e(c) + '</span>';
      }).join('') + '</div>';
    },
    'vong-nho': function (h, d) {
      var n = h.muc.length, o = '';
      h.muc.forEach(function (m, k) {
        var g = (-90 + k * 360 / n) * Math.PI / 180, x = 50 + 39 * Math.cos(g), y = 50 + 37 * Math.sin(g);
        o += '<span class="nut-v' + (k === n - 1 ? ' cuoi' : '') + '" style="left:' + x.toFixed(1) + '%;top:' + y.toFixed(1) + '%"><span class="a" style="display:block;--kieu:s-no;--tre:' + (.5 + k * (d * .6 / n)).toFixed(2) + 's">' + e(m) + '</span></span>';
      });
      return '<div class="vn-s"><svg viewBox="0 0 640 470" aria-hidden="true"><ellipse class="duong lap" cx="320" cy="235" rx="250" ry="174"/></svg>' +
        '<div class="tam"><div class="a" ' + st('s-no', .2) + '><b>Kaizen</b><span>mỗi ngày một chút</span></div></div>' + o + '</div>';
    },
    'ket': function (h, d) {
      return '<div class="ket-s"><div class="c-h1 a" style="font-size:64px;--kieu:s-len;--tre:.1s">' + e(h.tieu) + '</div><div class="luoi">' + h.muc.map(function (m, k) {
        return '<div class="a" ' + st('s-len', .6 + k * (d * .5 / h.muc.length)) + '>' + e(m) + '</div>';
      }).join('') + '</div><div class="tiep a" ' + st('s-mo', d * .76) + '>Tiếp theo: thực hành trên Xưởng video →</div></div>';
    }
  };
  // ---- cảnh ẢNH MÀN HÌNH THẬT (Buổi 4–5): ảnh 1440×900 trong "máy quay" — phóng tới mục, khoanh, mũi tên + nhãn, con trỏ bấm
  var VI_TRI = window.VI_TRI || {}, AW = 1440, AH = 900;
  function anhSrc(k) { return (window.ANH_DATA && window.ANH_DATA[k]) || ('anh/' + k + '.webp'); }
  function rectMuc(anh, muc) { var v = VI_TRI[anh]; return (muc && v && v.muc && v.muc[muc]) || null; }
  function gopHop(ds) {
    if (!ds.length) return null;
    var x0 = Math.min.apply(null, ds.map(function (r) { return r.x; })), y0 = Math.min.apply(null, ds.map(function (r) { return r.y; }));
    var x1 = Math.max.apply(null, ds.map(function (r) { return r.x + r.w; })), y1 = Math.max.apply(null, ds.map(function (r) { return r.y + r.h; }));
    return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
  }
  /** Chỗ máy quay nhìn ở 1 nhịp (như trình phát gốc của khoá Xưởng): mục "nhìn", không có thì gom mục khoanh / chỉ / bấm; quá rộng thì cả ảnh. Thuần. */
  function rCam(h) {
    var rn = rectMuc(h.anh, h.nhin);
    var g = rn || gopHop((h.khoanh || []).concat(h.chi ? [h.chi] : [], h.bam ? [h.bam] : []).map(function (m) { return rectMuc(h.anh, m); }).filter(Boolean));
    return g && g.w < .85 && g.h < .85 ? g : (rn || null);
  }
  /** Vị trí máy quay để vùng r (hoặc cả ảnh) nằm gọn trong khung 1280×720, chừa chỗ phụ đề. Thuần. */
  function camLuc(r) {
    var s0 = 600 / AH;
    if (!r) return { s: s0, x: (1280 - AW * s0) / 2, y: 22 };
    var s = Math.max(s0, Math.min(1.9, 1280 * .62 / (r.w * AW), 470 * .62 / (r.h * AH)));
    var x = 640 - (r.x + r.w / 2) * AW * s, y = 300 - (r.y + r.h / 2) * AH * s, w = AW * s, h = AH * s;
    x = w >= 1280 ? Math.min(0, Math.max(1280 - w, x)) : (1280 - w) / 2;
    // nút sát mép trên (thanh menu): cho ảnh lùi xuống tới 110 px để không nằm dưới nhãn góc / nhãn tên cảnh
    y = h >= 640 ? Math.min(110, Math.max(640 - h, y)) : 22;
    return { s: s, x: x, y: y };
  }
  function camCss(c) { return 'translate(' + c.x.toFixed(1) + 'px,' + c.y.toFixed(1) + 'px) scale(' + c.s.toFixed(4) + ')'; }
  CANH.anh = function (h) {
    // t0: khoanh / mũi tên / vùng tối hiện SAU khi máy quay dừng (quay xong ~0,95 s) — phóng vào vùng sáng rồi tối ngay = chớp (qa-video 03/11)
    var s = camLuc(rCam(h)).s, px = function (v) { return (v / s).toFixed(2) + 'px'; }, o = '', t0 = .95;
    var hop = function (r, them) { return 'left:' + (r.x * AW - 8 / s).toFixed(1) + 'px;top:' + (r.y * AH - 8 / s).toFixed(1) + 'px;width:' + (r.w * AW + 16 / s).toFixed(1) + 'px;height:' + (r.h * AH + 16 / s).toFixed(1) + 'px;' + (them || ''); };
    (h.khoanh || []).forEach(function (m, k) {
      var r = rectMuc(h.anh, m); if (!r) return;
      o += '<div class="khoanh a' + (k === 0 ? ' den' : '') + '" style="' + hop(r, 'border-width:' + px(4) + ';border-radius:' + px(12) + ';--kieu:s-khoanh;--tre:' + (t0 + k * .15).toFixed(2) + 's;--dai:' + (k === 0 ? '.6s' : '.4s')) + '"></div>';
    });
    var rc = rectMuc(h.anh, h.chi);
    if (rc && h.nhan) {
      var cx = (rc.x + rc.w / 2) * AW, tren = rc.y * AH > 170, gap = 64 / s, y0 = tren ? rc.y * AH - 10 / s : (rc.y + rc.h) * AH + 10 / s, y1 = tren ? y0 - gap : y0 + gap;
      o += '<svg class="mui-s" viewBox="0 0 1440 900" aria-hidden="true"><line class="a" x1="' + cx.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + cx.toFixed(1) + '" y2="' + y0.toFixed(1) + '" pathLength="1" style="stroke-width:' + (5 / s).toFixed(2) + ';--kieu:s-ve;--tre:' + (t0 + .1).toFixed(2) + 's;--dai:.35s"/>' +
        '<circle class="a" cx="' + cx.toFixed(1) + '" cy="' + y0.toFixed(1) + '" r="' + (7 / s).toFixed(2) + '" style="--kieu:s-mo;--tre:' + (t0 + .35).toFixed(2) + 's;--dai:.2s"/></svg>' +
        '<div class="nhan-o" style="left:' + cx.toFixed(1) + 'px;top:' + y1.toFixed(1) + 'px;transform:translate(-50%,' + (tren ? '-100%' : '0') + ')"><span class="a" style="font-size:' + px(24) + ';--kieu:' + (tren ? 's-len' : 's-mo') + ';--tre:' + (t0 + .2).toFixed(2) + 's">' + e(h.nhan) + '</span></div>';
    }
    var rb = rectMuc(h.anh, h.bam);
    if (rb) {
      var bx = (rb.x + rb.w / 2) * AW, by = (rb.y + rb.h / 2) * AH, tb = t0 + (rc ? .35 : .1);
      o += '<div class="tro-o" style="left:' + bx.toFixed(1) + 'px;top:' + by.toFixed(1) + 'px"><svg class="a" viewBox="0 0 24 24" style="width:' + px(40) + ';--dx:' + px(150) + ';--dy:' + px(120) + ';--kieu:s-tro;--tre:' + tb.toFixed(2) + 's;--dai:.6s"><path d="M3 2l17 10-7.5 1.8L9 21z"/></svg></div>' +
        '<div class="gon-o" style="left:' + bx.toFixed(1) + 'px;top:' + by.toFixed(1) + 'px"><i class="a" style="width:' + px(56) + ';height:' + px(56) + ';border-width:' + px(4) + ';--kieu:s-gon;--tre:' + (tb + .6).toFixed(2) + 's;--dai:.55s"></i></div>';
    }
    return '<div class="anh-s"><div class="cam" style="transform:' + camCss(camLuc(rCam(h))) + '"><img src="' + anhSrc(h.anh) + '" width="1440" height="900" alt="" draggable="false">' + o + '</div>' +
      (h.tieu ? '<div class="anh-tieu a" ' + st('s-mo', .05) + '>' + e(h.tieu) + '</div>' : '') + '</div>';
  };
  function veCanhHtml(h, d) { var f = CANH[h.loai]; return f ? f(h, d) : '<div class="c-tieu">' + e(h.loai) + '</div>'; }

  function chiaCau(loi) {
    var cau = loi.match(/[^.!?…]+[.!?…]*\s*/g) || [loi], ra = [];
    cau.forEach(function (c) {
      c = c.trim(); if (!c) return;
      while (c.length > 92) {
        var cat = -1, j;
        for (j = Math.min(88, Math.floor(c.length / 2) + 18); j > 28; j--) if (c[j] === ',' || c[j] === ':') { cat = j + 1; break; }
        if (cat < 0) for (j = Math.min(86, c.length - 12); j > 28; j--) if (c[j] === ' ') { cat = j; break; }
        if (cat < 0) break;
        ra.push(c.slice(0, cat).trim()); c = c.slice(cat).trim();
      }
      ra.push(c);
    });
    return ra;
  }
  var dang = null; // trình chiếu đang mở
  function phut(s) { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + ('0' + s % 60).slice(-2); }

  // kieu: 'tinh' = vẽ trọn 1 khung làm ảnh (không điều khiển) · 'ghi' = máy xuất MP4 gọi khungLuc(t) từng khung · bỏ trống = trình chiếu thường
  function taoTrinh(host, x, kieu) {
    var tinh = kieu === 'tinh', ghi = kieu === 'ghi', tron = tinh || ghi;
    var bai = x.bai, ds = bai.canh, n = ds.length;
    var maG = function (i) { return bai.id + '-' + (i + 1); };
    var dai = ds.map(function (c, i) { var g = GIONG[maG(i)]; return g && g.dai ? g.dai + .45 : Math.max(3.6, c.loi.length / 14.5 + .9); });
    var bd = [], tong = 0; dai.forEach(function (d, i) { bd[i] = tong; tong += d; });
    var toc = tocLuu(), amL = amLuu(), tatAm = caiDat('trinh-tat-am') === '1', luuLuc = 0;
    // chỉ bài thật mới ghi tiến độ (ảnh bìa trang chủ, ảnh tĩnh, máy xuất MP4 thì không)
    var demXem = !tron && bai.id !== 'poster', R = demXem ? hoSoXem(bai.id) : { moc: 1e9, giay: 0, vi_tri: 0 }, lanNay = null;
    var tiep = demXem && R.vi_tri > 3 && R.vi_tri < tong - 3 ? Math.min(R.vi_tri, R.moc) : 0;
    var nhe = !ghi && caiDat('trinh-nhe') === '1', pd = ghi || caiDat('trinh-pd') !== '0';
    if (ghi) toc = 1;
    var S = { i: 0, ts: 0, chay: false, au: null, het: false, bdPd: [], dem: [] };
    var SVG = {
      phat: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>', dung: '<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>',
      lui: '<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>', toi: '<svg viewBox="0 0 24 24"><path d="M16 6h2v12h-2zM6 18l8.5-6L6 6z"/></svg>',
      chep: '<svg viewBox="0 0 24 24"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h10v2H4z"/></svg>', to: '<svg viewBox="0 0 24 24"><path d="M5 5h5v2H7v3H5zm9 0h5v5h-2V7h-3zM5 14h2v3h3v2H5zm12 3v-3h2v5h-5v-2z"/></svg>'
    };
    host.innerHTML = '<div class="trinh dung' + (nhe ? ' nhe' : '') + (pd ? '' : ' tat-pd') + '" tabindex="0" role="region" aria-label="Video bài học: ' + e(bai.ten) + '. Phím cách để phát hoặc dừng, mũi tên trái phải để chuyển cảnh.">' +
      '<div class="san"><div class="khung" aria-hidden="true"></div>' +
      (tron ? '' : '<div class="man-cho"><button type="button"><i></i><span>' + (tiep ? 'Xem tiếp từ ' + phut(tiep) : 'Xem bài') + '<small>' + phut(tong) + ' · ' + n + ' cảnh · có phụ đề</small></span></button></div>') + '</div>' +
      (tron ? '' : '<div class="dk">' +
        '<button type="button" data-l="phat" aria-label="Phát">' + SVG.phat + '</button>' +
        '<button type="button" data-l="lui" aria-label="Cảnh trước" class="an-nho">' + SVG.lui + '</button>' +
        '<span class="tg">0:00 / ' + phut(tong) + '</span>' +
        '<div class="thanh-tg" role="slider" tabindex="0" aria-label="Thanh thời gian" aria-valuemin="0" aria-valuemax="' + Math.round(tong) + '" aria-valuenow="0">' + ds.map(function () { return '<span><b></b><i></i></span>'; }).join('') + '</div>' +
        '<button type="button" data-l="toc" class="rong-chu" aria-label="Tốc độ phát (tối đa 1.1×)" title="Tốc độ: 1× hoặc 1.1×">' + toc + '×</button>' +
        oAmLuong(amL, tatAm) +
        '<button type="button" data-l="pd" class="rong-chu" aria-pressed="' + pd + '" aria-label="Phụ đề">CC</button>' +
        '<button type="button" data-l="nhe" class="rong-chu an-nho" aria-pressed="' + nhe + '" aria-label="Giảm chuyển động" title="Giảm chuyển động">Nhẹ</button>' +
        '<button type="button" data-l="chep" aria-pressed="false" aria-label="Bản chép lời">' + SVG.chep + '</button>' +
        '<button type="button" data-l="to" aria-label="Toàn màn hình" class="an-nho">' + SVG.to + '</button></div>') + '</div>';
    var tr = $('.trinh', host), san = $('.san', tr), khung = $('.khung', tr);
    function coGian() { var w = san.clientWidth; if (w) khung.style.transform = 'scale(' + (w / 1280) + ')'; }
    var ro = new ResizeObserver(coGian); ro.observe(san); coGian();
    var nhanBai = 'Buổi ' + x.b.so + ' · Bài ' + (x.i + 1);

    // nền (bóng mờ, lưới), nhãn góc, phụ đề nằm yên suốt bài — chỉ lớp cảnh thay, nên đổi cảnh không giật nền
    khung.innerHTML = '<div class="bong-trang b1 lap"></div><div class="bong-trang b2 lap"></div>' +
      '<svg class="logo-khung" viewBox="0 0 363.18 81.52" aria-hidden="true"><use href="#hct-logo"/></svg>' +
      '<div class="the-goc"><b>' + nhanBai + '</b><i></i><span>' + e(bai.ten) + '</span></div><div class="lop"></div><div class="phu-de"></div>';
    var lop = $('.lop', khung), theGoc = $('.the-goc', khung);
    S.pdEl = $('.phu-de', khung);

    function vao(i, ts, chay, chuyen) {
      S.i = i; S.ts = ts || 0; S.het = false; S.dau = false;
      if (S.au) { S.au.pause(); S.au = null; }
      var c = ds[i], cu = $('.canh:not(.cu)', lop), truoc = i > 0 ? ds[i - 1].hinh : null;
      // 2 nhịp liền nhau trên CÙNG ảnh màn hình: máy quay lướt từ mục cũ sang mục mới, không mờ chồng
      var cungAnh = !!(chuyen && c.hinh.loai === 'anh' && truoc && truoc.loai === 'anh' && truoc.anh === c.hinh.anh);
      $$('.canh.cu', lop).forEach(function (el) { el.remove(); });
      // máy quay của nhịp trước: ghi chốt vị trí cuối vào thẻ rồi bỏ hoạt ảnh (không thì máy xuất MP4 tua lại nó)
      (S.waapi || []).forEach(function (a) { try { a.commitStyles(); } catch (x) {} a.cancel(); });
      if (cu && cungAnh) {
        // cùng ảnh: khoanh / mũi tên / nhãn / vùng tối của nhịp trước MỜ DẦN 0,35 s — gỡ ngay thì vùng tối mất đột ngột = chớp (qa-video bắt 03/11)
        $$('.a', cu).forEach(function (el) { el.classList.remove('a'); });
        var anhCu = $('.cam img', cu); if (anhCu) anhCu.style.visibility = 'hidden';
        var tieuCu = $('.anh-tieu', cu); if (tieuCu) tieuCu.remove();
        cu.classList.add('cu', 'a'); cu.style.cssText = '--kieu:s-tat;--tre:0s;--dai:.35s';
      } else if (cu && chuyen) {
        // mờ chồng 0,45 s (luật: không cắt cứng, không chớp): cảnh cũ đứng ở khung cuối rồi mờ dần dưới cảnh mới
        $$('.a', cu).forEach(function (el) { el.classList.remove('a'); });
        var dd = $('.dau-doc', cu); if (dd) dd.style.left = '100%';
        // sang ảnh màn hình: ảnh cũ chờ ảnh mới phủ gần hết rồi mới mờ — mờ cùng lúc thì nền sáng lộ ra giữa 2 ảnh
        cu.classList.add('cu', 'a'); cu.style.cssText = '--kieu:s-tat;--tre:' + (c.hinh.loai === 'anh' ? '.15s;--dai:.4s' : '0s;--dai:.4s');
      } else if (cu) cu.remove();
      // không có chuyển động trôi chậm (user 03/11: "trôi chậm dễ buồn ngủ") — thẻ bật vào dứt khoát rồi đứng yên
      var moi = document.createElement('div'); moi.className = 'canh';
      moi.innerHTML = veCanhHtml(c.hinh, dai[i]);
      lop.appendChild(moi);
      S.waapi = [];
      // ảnh màn hình đục, nằm trên cảnh cũ → phải mờ dần vào, không thì thành cắt cứng (độ sáng nhảy 1 khung).
      // mờ ĐỀU 2 đầu 0,5 s: đường cong "nhanh đầu" dồn 60 % thay đổi vào 3 khung → ảnh tối → ảnh sáng thành cú bật (qa-video nhảy gắt 76)
      if (c.hinh.loai === 'anh' && cu && chuyen && !cungAnh) { var anhS = $('.anh-s', moi); anhS.classList.add('a'); anhS.style.cssText = '--kieu:s-mo;--tre:0s;--dai:.5s;animation-timing-function:ease-in-out'; }
      if (c.hinh.loai === 'anh') {
        // máy quay = Web Animation (đặt currentTime theo giờ cảnh → phát / dừng / tua / xuất MP4 đều khớp)
        var den = camLuc(rCam(c.hinh)), tu = cungAnh ? camLuc(rCam(truoc)) : camLuc(null);
        if (camCss(tu) !== camCss(den)) {
          var an = $('.cam', moi).animate([{ transform: camCss(tu) }, { transform: camCss(den) }], { duration: 800, delay: cungAnh ? 0 : 150, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'both' });
          an.playbackRate = toc; an.pause(); an.currentTime = S.ts * 1000; S.waapi.push(an);
        }
      }
      theGoc.style.opacity = c.hinh.loai === 'tieu-de' ? '0' : '1';
      khung.style.setProperty('--lech', (tinh ? 99 : S.ts) + 's');
      khung.style.setProperty('--toc', toc);
      S.dem = $$('.dem', moi);
      var cau = chiaCau(c.loi), L = cau.reduce(function (s, q) { return s + q.length; }, 0), g = GIONG[maG(i)];
      var noi = (g && g.dai ? g.dai : dai[i] - .7), cum = 0;
      // câu đầu hiện ngay từ 0 s để hộp phụ đề không tắt giữa 2 cảnh (tắt / bật hộp tối = chớp)
      S.bdPd = cau.map(function (q) { var r = { chu: q, tu: q.split(' '), bd: cum ? .2 + cum / L * noi : 0, kt: .2 + (cum + q.length) / L * noi }; cum += q.length; return r; });
      S.pdDang = -1;
      if (g && g.src && !tron) {
        S.au = new Audio(g.src); S.au.playbackRate = toc; S.au.volume = amL; S.au.muted = tatAm;
        try { S.au.currentTime = Math.min(S.ts, g.dai || 0); } catch (x2) {}
      }
      datChay(chay);
      veChep();
    }
    function datChay(on) {
      S.chay = on && !tinh;
      tr.classList.toggle('dung', !S.chay);
      var nut = $('[data-l=phat]', tr);
      if (nut) { nut.innerHTML = S.chay ? SVG.dung : SVG.phat; nut.setAttribute('aria-label', S.chay ? 'Dừng' : 'Phát'); }
      // độ dài tệp giọng chưa nạp xong thì là NaN — vẫn phát; chỉ thôi phát khi đã qua hết câu đọc
      if (S.au) { if (S.chay && !(S.ts >= (S.au.duration || 1e9))) S.au.play().catch(function () {}); else S.au.pause(); }
      (S.waapi || []).forEach(function (a) { if (S.chay) a.play(); else a.pause(); });
      var cho = $('.man-cho', tr); if (cho && S.chay) cho.remove();
      var het = $('.man-het', tr); if (het && S.chay) het.remove();
    }
    function ketThuc() {
      S.chay = false; S.het = true; tr.classList.add('dung');
      var nut = $('[data-l=phat]', tr); if (nut) { nut.innerHTML = SVG.phat; nut.setAttribute('aria-label', 'Phát'); }
      if (demXem) { R.moc = Math.max(R.moc, tong); if (!R.xem) { R.xem = true; R.xem_luc = new Date().toISOString(); } R.vi_tri = 0; luu(); veMucLuc(bai.id); baoDaXem(bai.id); }
      var m = document.createElement('div'); m.className = 'man-het';
      m.innerHTML = '<div><b>Đã xem hết bài</b><div class="hang"><button type="button" data-l="lai">↺ Xem lại</button><button type="button" class="chinh" data-l="hoi">Câu hỏi nhanh ↓</button></div></div>';
      san.appendChild(m);
    }
    function veTg() {
      var tg = $('.tg', tr); if (!tg) return;
      var t = bd[S.i] + Math.min(S.ts, dai[S.i]);
      tg.textContent = phut(t) + ' / ' + phut(tong);
      $$('.thanh-tg span i', tr).forEach(function (el, k) { el.style.width = (k < S.i ? 100 : k > S.i ? 0 : Math.min(100, S.ts / dai[k] * 100)) + '%'; });
      $$('.thanh-tg span b', tr).forEach(function (el, k) { el.style.width = Math.max(0, Math.min(100, (R.moc - bd[k]) / dai[k] * 100)) + '%'; });
      $('.thanh-tg', tr).setAttribute('aria-valuenow', Math.round(t));
    }
    function veDem() {
      S.dem.forEach(function (el) {
        var den = +el.getAttribute('data-den'), b = +el.getAttribute('data-bd'), dd = +el.getAttribute('data-dai');
        var p = tinh || S.dau ? 1 : Math.max(0, Math.min(1, (S.ts - b) / dd)); p = 1 - Math.pow(1 - p, 3);
        var v = so(den * p) + el.getAttribute('data-hau');
        if (el.textContent !== v) el.textContent = v;
      });
    }
    function vePd() {
      if (!S.pdEl || tinh || S.dau) return;
      var k = -1; S.bdPd.forEach(function (q, j) { if (S.ts >= q.bd - .05) k = j; });
      if (k < 0) { if (S.pdDang !== -1) { S.pdEl.innerHTML = ''; S.pdDang = -1; } return; }
      var q = S.bdPd[k];
      if (S.pdDang !== k) { S.pdEl.innerHTML = q.tu.map(function (w) { return '<span class="t">' + e(w) + '</span> '; }).join(''); S.pdDang = k; S.pdTu = $$('.t', S.pdEl); }
      var p = Math.max(0, Math.min(1, (S.ts - q.bd) / Math.max(.4, q.kt - q.bd))), lay = p * q.chu.length, c = 0;
      S.pdTu.forEach(function (sp, j) { c += q.tu[j].length + 1; sp.classList.toggle('da', c <= lay + q.tu[j].length * .6); });
    }
    var chep = $('.ban-chep', host.parentNode);
    function veChep() {
      if (!chep || chep.hidden) return;
      if (!chep.childElementCount) {
        chep.innerHTML = ds.map(function (c, k) { return '<button type="button" data-k="' + k + '"><span>' + phut(bd[k]) + '</span>' + e(c.loi) + '</button>'; }).join('');
        $$('button', chep).forEach(function (b) { b.addEventListener('click', function () { var k = +b.getAttribute('data-k'); if (bd[k] > R.moc + 1) return; vao(k, 0, true); }); });
      }
      $$('button', chep).forEach(function (b, k) { b.classList.toggle('dang', k === S.i); var khoa = bd[k] > R.moc + 1; b.disabled = khoa; b.classList.toggle('khoa', khoa); });
    }
    var cuoi = performance.now(), raf = 0;
    function nhip(now) {
      var dt = Math.min(.1, (now - cuoi) / 1000); cuoi = now;
      if (S.chay) {
        if (S.au && !S.au.paused && !S.au.ended) S.ts = S.au.currentTime; else S.ts += dt * toc;
        // thời gian xem thật: chỉ cộng khi trang đang hiện; mốc "đã xem tới" đi theo dòng chạy tự nhiên
        if (demXem && document.visibilityState === 'visible') {
          R.giay += dt; var tt = bd[S.i] + Math.min(S.ts, dai[S.i]); if (tt > R.moc && tt <= R.moc + 2.5) R.moc = tt;
          if (!lanNay) { lanNay = batDauLanHoc(R, tt); R.luot = (+R.luot || 0) + 1; } demLan(lanNay, dt, tt, tong);
          R.vi_tri = Math.round(tt * 10) / 10; if (Date.now() - luuLuc > 10000) { luuLuc = Date.now(); luu(); }
        }
        if (S.ts >= dai[S.i]) { if (S.i < n - 1) vao(S.i + 1, 0, true, true); else ketThuc(); }
      }
      veTg(); veDem(); vePd();
      raf = requestAnimationFrame(nhip);
    }
    vao(0, 0, false);
    if (tinh) { veDem(); S.waapi.forEach(function (a) { a.finish(); }); return { huy: function () { ro.disconnect(); } }; }
    if (ghi) {
      // xuất MP4: vẽ ĐÚNG khung ở giây t — mọi chuyển động (CSS animation + transition) đặt currentTime, không chạy theo đồng hồ
      S.daVe = false;
      host._trinh = {
        tong: tong, dai: dai, bd: bd,
        khungLuc: function (t) {
          var k = 0; while (k < n - 1 && bd[k + 1] <= t) k++;
          if (!S.daVe || k !== S.i) { vao(k, 0, false, S.daVe && k === S.i + 1); S.daVe = true; }
          S.ts = t - bd[k];
          khung.getAnimations({ subtree: true }).forEach(function (a) {
            a.pause();
            var el = a.effect && a.effect.target;
            a.currentTime = (el && el.classList && el.classList.contains('lap') ? t : S.ts) * 1000;
          });
          veDem(); vePd();
          return k;
        }
      };
      return { huy: function () { ro.disconnect(); } };
    }
    // chưa bấm xem: cảnh đầu vẽ trọn làm ảnh bìa; bấm xem thì chạy lại từ đầu
    S.dau = true; khung.style.setProperty('--lech', '99s'); S.pdEl.innerHTML = ''; S.waapi.forEach(function (a) { a.finish(); });
    host._trinh = { vao: vao, dai: dai, S: S }; // để kiểm thử: nhảy tới cảnh bất kỳ
    raf = requestAnimationFrame(nhip);

    function batTat() {
      if (S.dau) { S.dau = false; var kk = 0; while (kk < n - 1 && bd[kk + 1] <= tiep) kk++; vao(kk, tiep ? tiep - bd[kk] : 0, true); return; }
      if (S.het) { vao(0, 0, true); return; }
      datChay(!S.chay);
    }
    tr.addEventListener('click', function (ev) {
      if (ev.target.closest('.am-luong')) return;
      var b = ev.target.closest('[data-l]');
      if (!b) { if (ev.target.closest('.san')) batTat(); return; }
      var l = b.getAttribute('data-l');
      if (l === 'phat') batTat();
      else if (l === 'lui') vao(S.ts > 1.5 ? S.i : Math.max(0, S.i - 1), 0, S.chay || S.het);
      else if (l === 'toc') {
        toc = TOC_MUC[(TOC_MUC.indexOf(toc) + 1) % TOC_MUC.length]; caiDat('trinh-toc', toc); b.textContent = toc + '×';
        vao(S.i, S.ts, S.chay);
      } else if (l === 'pd') { pd = !pd; caiDat('trinh-pd', pd ? '1' : '0'); tr.classList.toggle('tat-pd', !pd); b.setAttribute('aria-pressed', pd); }
      else if (l === 'nhe') { nhe = !nhe; caiDat('trinh-nhe', nhe ? '1' : '0'); tr.classList.toggle('nhe', nhe); b.setAttribute('aria-pressed', nhe); vao(S.i, S.ts, S.chay); }
      else if (l === 'chep') { if (chep) { chep.hidden = !chep.hidden; b.setAttribute('aria-pressed', !chep.hidden); veChep(); } }
      else if (l === 'am') datAm(tatAm ? Math.max(amL, .6) : 0);
      else if (l === 'to') { try { if (document.fullscreenElement) document.exitFullscreen(); else if (tr.requestFullscreen) tr.requestFullscreen().catch(function () {}); } catch (x4) {} }
      else if (l === 'lai') vao(0, 0, true);
      else if (l === 'hoi') { var hn = $('.hoi-nhanh'); if (hn) hn.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      ev.stopPropagation();
    });
    var thanh = $('.thanh-tg', tr);
    thanh.addEventListener('click', function (ev) {
      var r = thanh.getBoundingClientRect(), f = (ev.clientX - r.left) / r.width, t = f * tong, k = 0;
      if (t > R.moc + 1) { baoNho(tr, 'Chỉ tua lại được phần đã xem'); t = Math.max(0, R.moc); }
      while (k < n - 1 && bd[k + 1] <= t) k++;
      vao(k, Math.max(0, t - bd[k]), S.chay || S.het); ev.stopPropagation();
    });
    tr.addEventListener('keydown', function (ev) {
      if (ev.target.closest('input,textarea,select')) return;
      var k = ev.key;
      if (k === ' ' || k === 'k' || k === 'K') { ev.preventDefault(); batTat(); }
      else if (k === 'ArrowLeft') { ev.preventDefault(); vao(Math.max(0, S.i - 1), 0, S.chay); }
      else if (k === 'ArrowUp') { ev.preventDefault(); datAm(amL + .1); }
      else if (k === 'ArrowDown') { ev.preventDefault(); datAm(amL - .1); }
      else if (k === 'm' || k === 'M') $('[data-l=am]', tr).click();
      else if (k === 'c' || k === 'C') $('[data-l=pd]', tr).click();
      else if (k === 'f' || k === 'F') $('[data-l=to]', tr).click();
    });
    // âm lượng: thanh kéo + nút tắt tiếng, áp ngay cho câu đang đọc
    var oAm = $('.am-luong', tr);
    function datAm(a) {
      amL = Math.max(0, Math.min(1, a)); tatAm = amL < .01; caiDat('trinh-am-luong', amL); caiDat('trinh-tat-am', tatAm ? '1' : '0');
      if (S.au) { S.au.volume = amL; S.au.muted = tatAm; } if (oAm) oAm.value = amL;
      var nb = $('[data-l=am]', tr); if (nb) { nb.innerHTML = tatAm ? BIEU.tat : BIEU.am; nb.setAttribute('aria-pressed', tatAm); }
    }
    if (oAm) oAm.addEventListener('input', function () { datAm(+oAm.value); });
    // chuyển tab / thu nhỏ / rời trang → dừng, lưu chỗ đang xem
    function anTrang() { if (document.visibilityState !== 'visible' && S.chay) { datChay(false); baoNho(tr, 'Đã tạm dừng vì bạn rời trang'); if (demXem) luu(); } }
    function roiTrang() { if (S.chay) datChay(false); if (demXem) luu(); }
    document.addEventListener('visibilitychange', anTrang); window.addEventListener('pagehide', roiTrang);
    return { huy: function () { document.removeEventListener('visibilitychange', anTrang); window.removeEventListener('pagehide', roiTrang); cancelAnimationFrame(raf); ro.disconnect(); if (S.au) S.au.pause(); if (demXem) luu(); } };
  }

  // ================================================================ video bài giảng MỚI (MP4 dựng sẵn, phụ đề in trong hình)
  // Chỉ bài có trong window.VIDEO_BAI (nap-video-moi.mjs tạo, user cho phép từng bài). Cùng kiểu nút với khung chiếu; tệp video lỗi → quay về khung chiếu.
  var VIDEO_BAI = window.VIDEO_BAI || {};
  var BIEU = {
    phat: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>', dung: '<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zm8 0h4v14h-4z"/></svg>',
    lui: '<svg viewBox="0 0 24 24"><path d="M12 5V2L7 6l5 4V7a6 6 0 1 1-6 6H4a8 8 0 1 0 8-8z"/><text x="12" y="16.2" text-anchor="middle" font-size="6.4" font-weight="700" font-family="system-ui,sans-serif">10</text></svg>',
    am: '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9zm11.5 3a3.5 3.5 0 0 0-2-3.15v6.3a3.5 3.5 0 0 0 2-3.15z"/></svg>',
    tat: '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9zm12.6 3 2.1-2.1-1.4-1.4-2.1 2.1-2.1-2.1-1.4 1.4 2.1 2.1-2.1 2.1 1.4 1.4 2.1-2.1 2.1 2.1 1.4-1.4z"/></svg>',
    chep: '<svg viewBox="0 0 24 24"><path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h10v2H4z"/></svg>', to: '<svg viewBox="0 0 24 24"><path d="M5 5h5v2H7v3H5zm9 0h5v5h-2V7h-3zM5 14h2v3h3v2H5zm12 3v-3h2v5h-5v-2z"/></svg>',
    rong: '<svg viewBox="0 0 24 24"><path fill-rule="evenodd" d="M2 6h20v12H2zm2 2v8h16V8z"/><path d="M7 11l-2 1 2 1zm10 0 2 1-2 1z"/></svg>'
  };
  // ---- CHẤT LƯỢNG (user 06/11): bản web có nhiều mức (v.chat, cao → thấp, do dong-goi-web.mjs ghi). Mặc định 2K; bài chưa có 2K thì lấy mức cao nhất có.
  //      Lựa chọn lưu trên máy người học (trinh-chat-luong). Mức đang chọn không tải được → tự lùi xuống mức thấp hơn.
  var MO_CL = { '2k': 'nét nhất', '1080': 'Full HD', '720': 'mạng yếu' };
  function chatDau(CL) { var m = caiDat('trinh-chat-luong') || '2k'; return CL.some(function (c) { return c.ma === m; }) ? m : (CL[0] && CL[0].ma); }
  // ---- LUẬT XEM (user 06/11): không tua tới phần chưa xem, chỉ xem lại; tốc độ tối đa 1.1×; chuyển tab / rời trang là dừng;
  //      chỉ cộng thời gian lúc video đang chạy và trang đang hiện; bài chỉ tính "đã xem" khi đã xem tới gần hết thật.
  var TOC_MUC = [1, 1.1], TOC_MAX = 1.1;
  function tocLuu() { var t = +(caiDat('trinh-toc') || 1) || 1; return TOC_MUC.indexOf(t) >= 0 ? t : (t > 1 ? TOC_MAX : 1); }
  function amLuu() { var a = parseFloat(caiDat('trinh-am-luong')); return isNaN(a) ? 1 : Math.max(0, Math.min(1, a)); }
  function oAmLuong(a, tat) { return '<span class="am-o"><button type="button" data-l="am" aria-pressed="' + tat + '" aria-label="Tắt / bật tiếng" title="Tắt / bật tiếng (M)">' + (tat ? BIEU.tat : BIEU.am) + '</button>' +
    '<input type="range" class="am-luong" min="0" max="1" step="0.05" value="' + (tat ? 0 : a) + '" aria-label="Âm lượng" title="Âm lượng (mũi tên lên / xuống)"></span>'; }
  function baoNho(tr, chu) { // dòng báo nhỏ trên khung video, tự tắt
    var b = $('.bao-nho', tr); if (!b) { b = document.createElement('div'); b.className = 'bao-nho'; b.setAttribute('role', 'status'); $('.san', tr).appendChild(b); }
    b.textContent = chu; b.classList.add('hien'); clearTimeout(b._t); b._t = setTimeout(function () { b.classList.remove('hien'); }, 2200);
  }
  function hoSoXem(id) { var r = D.bai[id] = D.bai[id] || {}; r.moc = +r.moc || 0; r.giay = +r.giay || 0; r.vi_tri = +r.vi_tri || 0; return r; }
  // LẦN HỌC (06/11, user: "user học lại nhiều lần thì ghi lại từng lần khác nhau — lần học 1 2 3"): mỗi lần mở bài và bấm phát = 1 lần học riêng
  // {bd: lúc bắt đầu (ms), giay: thời gian xem thật trong lần đó, tu / toi: xem từ giây … tới giây …, het: xem tới cuối trong lần đó}.
  // Khoá = lúc bắt đầu → gộp dữ liệu từ máy khác không lẫn lần; giữ 30 lần gần nhất mỗi bài.
  function batDauLanHoc(R, viTri) {
    R.lan_hoc = R.lan_hoc || {}; var k = String(Date.now()), v = Math.round(+viTri || 0);
    var l = R.lan_hoc[k] = { bd: +k, giay: 0, tu: v, toi: v, het: false };
    var ks = Object.keys(R.lan_hoc).sort(); while (ks.length > 30) delete R.lan_hoc[ks.shift()];
    return l;
  }
  function dsLanHoc(r) { var o = (r && r.lan_hoc) || {}; return Object.keys(o).sort().map(function (k) { return o[k]; }).filter(function (l) { return l && l.bd; }); }
  function demLan(l, dt, viTri, tong) { if (!l) return; l.giay = (+l.giay || 0) + dt; var v = Math.round(viTri); if (v > l.toi) l.toi = v; if (tong && viTri >= tong - 2.5) l.het = true; }
  function baoDaXem(id) { try { document.dispatchEvent(new CustomEvent('da-xem-bai', { detail: id })); } catch (x) {} }

  function taoVideo(host, x, v) {
    var bai = x.bai, ch = v.chuong || [], n = ch.length, tong = v.dai || 0, R = hoSoXem(bai.id);
    var bdC = ch.map(function (c, k) { return k ? c.t : 0; }), daiC = bdC.map(function (t, k) { return Math.max(.5, (k < n - 1 ? bdC[k + 1] : tong) - t); });
    var toc = tocLuu(), tat = caiDat('trinh-tat-am') === '1', amL = amLuu(), thay = null, raf = 0, cuoi = 0, luuLuc = 0, daMo = false, lanNay = null; // daMo: đếm 1 lượt xem cho mỗi lần mở bài; lanNay: lần học đang diễn ra
    var tiep = R.vi_tri > 3 && R.vi_tri < tong - 3 ? Math.min(R.vi_tri, R.moc) : 0;
    var CL = v.chat || [], clMa = chatDau(CL);
    function clCua(ma) { return CL.filter(function (c) { return c.ma === ma; })[0]; }
    host.innerHTML = '<div class="trinh trinh-video dung" tabindex="0" role="region" aria-label="Video bài học: ' + e(bai.ten) + '. Phím cách để phát hoặc dừng, mũi tên trái để lùi lại, lên xuống để chỉnh âm lượng.">' +
      '<div class="san"><video preload="metadata" playsinline disablepictureinpicture controlslist="nodownload noplaybackrate" poster="' + e(v.anh) + '" src="' + e(encodeURI(CL.length ? clCua(clMa).src : v.src)) + '"></video>' +
      '<div class="man-cho"><button type="button"><i></i><span>' + (tiep ? 'Xem tiếp từ ' + phut(tiep) : 'Xem bài') + '<small>' + phut(tong) + ' · ' + n + ' đoạn · có phụ đề</small></span></button></div></div>' +
      '<div class="dk"><button type="button" data-l="phat" aria-label="Phát">' + BIEU.phat + '</button>' +
        '<button type="button" data-l="lui" aria-label="Lùi 10 giây" title="Lùi 10 giây (mũi tên trái)">' + BIEU.lui + '</button>' +
        '<span class="tg">0:00 / ' + phut(tong) + '</span>' +
        '<div class="thanh-tg" role="slider" tabindex="0" aria-label="Thanh thời gian — chỉ tua lại phần đã xem" aria-valuemin="0" aria-valuemax="' + Math.round(tong) + '" aria-valuenow="0">' +
          daiC.map(function (d, k) { return '<span style="flex-grow:' + d.toFixed(2) + '" title="' + e(ch[k].phan) + '"><b></b><i></i></span>'; }).join('') + '</div>' +
        '<button type="button" data-l="toc" class="rong-chu" aria-label="Tốc độ phát (tối đa 1.1×)" title="Tốc độ: 1× hoặc 1.1×">' + toc + '×</button>' +
        oAmLuong(amL, tat) +
        (CL.length > 1 ? '<span class="cl-o"><button type="button" data-l="cl" aria-haspopup="menu" aria-expanded="false" aria-label="Chất lượng video" title="Chất lượng video">' + e(clCua(clMa).nhan) + '</button>' +
          '<div class="cl-menu" role="menu" aria-label="Chất lượng video" hidden><b>Chất lượng</b>' + CL.map(function (c) { return '<button type="button" role="menuitemradio" data-cl="' + e(c.ma) + '" aria-checked="' + (c.ma === clMa) + '">' + e(c.nhan) + '<small>' + (MO_CL[c.ma] || '') + '</small></button>'; }).join('') + '</div></span>' : '') +
        '<button type="button" data-l="chep" aria-pressed="false" aria-label="Bản chép lời">' + BIEU.chep + '</button>' +
        '<button type="button" data-l="rong" aria-pressed="' + document.documentElement.classList.contains('khung-rong') + '" aria-label="Khung rộng" title="Khung rộng: video to hết bề ngang trang, nhìn rõ chữ hơn" class="an-nho">' + BIEU.rong + '</button>' +
        '<button type="button" data-l="to" aria-label="Toàn màn hình" class="an-nho">' + BIEU.to + '</button></div></div>';
    var tr = $('.trinh', host), vd = $('video', tr), san = $('.san', tr), chep = $('.ban-chep', host.parentNode), oAm = $('.am-luong', tr);
    vd.playbackRate = toc; vd.defaultPlaybackRate = toc; vd.muted = tat; vd.volume = amL;
    if (tiep) vd.addEventListener('loadedmetadata', function () { try { vd.currentTime = tiep; } catch (x2) {} }, { once: true });
    function doanLuc(t) { var k = 0; while (k < n - 1 && bdC[k + 1] <= t + .05) k++; return k; }
    function ghi(ngay) { R.vi_tri = Math.round((vd.currentTime || 0) * 10) / 10; if (ngay || Date.now() - luuLuc > 10000) { luuLuc = Date.now(); luu(); } }
    function ve() {
      var t = vd.currentTime || 0, k = doanLuc(t);
      $('.tg', tr).textContent = phut(t) + ' / ' + phut(tong);
      $$('.thanh-tg span', tr).forEach(function (sp, j) {
        sp.children[1].style.width = (j < k ? 100 : j > k ? 0 : Math.min(100, (t - bdC[j]) / daiC[j] * 100)) + '%';
        sp.children[0].style.width = Math.max(0, Math.min(100, (R.moc - bdC[j]) / daiC[j] * 100)) + '%'; // phần đã xem tới
      });
      $('.thanh-tg', tr).setAttribute('aria-valuenow', Math.round(t));
      if (chep && !chep.hidden) {
        $$('button', chep).forEach(function (b, j) { b.classList.toggle('dang', j === k); var khoa = bdC[j] > R.moc + 1; b.disabled = khoa; b.classList.toggle('khoa', khoa); });
        var bk = chep.children[k];
        if (bk && k !== ve.k && (bk.offsetTop < chep.scrollTop || bk.offsetTop + bk.offsetHeight > chep.scrollTop + chep.clientHeight)) chep.scrollTop = bk.offsetTop - 6;
        ve.k = k;
      }
    }
    // mỗi khung hình lúc đang chạy: cộng thời gian xem thật (chỉ khi trang đang hiện), đẩy mốc "đã xem tới" theo dòng chạy tự nhiên
    // đếm theo đồng hồ thật giữa 2 lần gọi (sự kiện timeupdate của video + nhịp vẽ) — nhịp vẽ ngừng khi trang bị che, timeupdate thì không
    function dem() {
      var now = performance.now(), dt = cuoi ? Math.min(1, (now - cuoi) / 1000) : 0; cuoi = now;
      if (vd.paused || vd.seeking || document.visibilityState !== 'visible') return;
      R.giay += dt;
      var t = vd.currentTime || 0; if (t > R.moc && t <= R.moc + 2.5) R.moc = t;
      demLan(lanNay, dt, t, tong);
      if (!R.xem && tong && R.moc >= tong - 2.5) danhDauXem();
      ghi(false);
    }
    function vong() { dem(); ve(); if (!vd.paused) raf = requestAnimationFrame(vong); }
    vd.addEventListener('timeupdate', function () { dem(); if (document.hidden) ve(); });
    function danhDauXem() { if (R.xem) return; R.xem = true; R.xem_luc = new Date().toISOString(); luu(); veMucLuc(bai.id); baoDaXem(bai.id); }
    function nutPhat() { var b = $('[data-l=phat]', tr); b.innerHTML = vd.paused ? BIEU.phat : BIEU.dung; b.setAttribute('aria-label', vd.paused ? 'Phát' : 'Dừng'); tr.classList.toggle('dung', vd.paused); }
    vd.addEventListener('play', function () { var c = $('.man-cho', tr); if (c) c.remove(); var h = $('.man-het', tr); if (h) h.remove(); nutPhat(); cancelAnimationFrame(raf); cuoi = 0; raf = requestAnimationFrame(vong); if (!daMo) { daMo = true; R.luot = (+R.luot || 0) + 1; lanNay = batDauLanHoc(R, vd.currentTime); } });
    vd.addEventListener('pause', function () { nutPhat(); ve(); ghi(true); });
    // chặn tua tới phần chưa xem (mọi đường: thanh thời gian, phím, công cụ trình duyệt)
    vd.addEventListener('seeking', function () { if (vd.currentTime > R.moc + 1) { vd.currentTime = R.moc; baoNho(tr, 'Chỉ tua lại được phần đã xem'); } });
    vd.addEventListener('seeked', ve);
    vd.addEventListener('ratechange', function () { if (vd.playbackRate > TOC_MAX) vd.playbackRate = TOC_MAX; });
    vd.addEventListener('volumechange', function () { if (oAm) oAm.value = vd.muted ? 0 : vd.volume; });
    vd.addEventListener('ended', function () {
      R.moc = Math.max(R.moc, tong); if (lanNay) { lanNay.het = true; lanNay.toi = Math.round(tong); } danhDauXem(); R.vi_tri = 0; luu(); nutPhat();
      var m = document.createElement('div'); m.className = 'man-het';
      m.innerHTML = '<div><b>Đã xem hết bài</b><div class="hang"><button type="button" data-l="lai">↺ Xem lại</button><button type="button" class="chinh" data-l="hoi">Câu hỏi nhanh ↓</button></div></div>';
      san.appendChild(m);
    });
    // tệp video không mở được (thiếu tệp, máy không đọc được) → khung chiếu cũ của bài, không để trang trống
    vd.addEventListener('error', function () {
      if (thay) return;
      var iCl = CL.map(function (c) { return c.ma; }).indexOf(clMa);
      if (iCl >= 0 && iCl < CL.length - 1) { doiChat(CL[iCl + 1].ma, false); baoNho(tr, 'Mức ' + CL[iCl].nhan + ' không tải được — đã chuyển ' + CL[iCl + 1].nhan); return; }
      cancelAnimationFrame(raf);
      if (chep) { chep.innerHTML = ''; chep.hidden = true; }
      thay = taoTrinh(host, x, false);
    });
    function phatDung() { if (vd.paused || vd.ended) { var p = vd.play(); if (p && p.catch) p.catch(function () {}); } else vd.pause(); }
    function toi(t) { vd.currentTime = Math.max(0, Math.min(t, R.moc)); ve(); }
    function veChep() {
      if (!chep) return;
      if (!chep.childElementCount) {
        var phanTruoc = null;
        chep.innerHTML = ch.map(function (c, k) {
          var p = c.phan && c.phan !== phanTruoc ? '<em>' + e(c.phan) + '</em>' : ''; phanTruoc = c.phan;
          return '<button type="button" data-k="' + k + '" title="Bấm để xem lại đoạn này"><span>' + phut(bdC[k]) + '</span><div>' + p + e(c.loi) + '</div></button>';
        }).join('');
        $$('button', chep).forEach(function (b) { b.addEventListener('click', function () { var k = +b.getAttribute('data-k'); if (bdC[k] > R.moc + 1) return; toi(bdC[k] + (k ? .05 : 0)); if (vd.paused) phatDung(); }); });
      }
      ve();
    }
    // đổi chất lượng giữa chừng: giữ chỗ đang xem (không vượt mốc đã xem) và trạng thái đang phát
    function doiChat(ma, chon) {
      var c = clCua(ma); moMenu(false); if (!c) return;
      if (chon) caiDat('trinh-chat-luong', ma);
      if (ma === clMa) return;
      clMa = ma; var t = vd.currentTime || 0, chay = !vd.paused && !vd.ended;
      vd.defaultPlaybackRate = toc; vd.src = encodeURI(c.src);
      vd.addEventListener('loadedmetadata', function () { try { vd.currentTime = Math.min(t, R.moc); } catch (x5) {} vd.playbackRate = toc; if (chay) { var p = vd.play(); if (p && p.catch) p.catch(function () {}); } else nutPhat(); }, { once: true });
      var nb = $('[data-l=cl]', tr); if (nb) nb.textContent = c.nhan;
      $$('[data-cl]', tr).forEach(function (z) { z.setAttribute('aria-checked', z.getAttribute('data-cl') === ma); });
      if (chon) baoNho(tr, 'Chất lượng: ' + c.nhan);
    }
    function moMenu(mo) { var m = $('.cl-menu', tr), nb = $('[data-l=cl]', tr); if (!m) return; m.hidden = !mo; nb.setAttribute('aria-expanded', mo); if (mo) { var dang = $('[aria-checked=true]', m); if (dang) dang.focus(); } }
    var oCl = $('.cl-o', tr);
    if (oCl) {
      oCl.addEventListener('focusout', function (ev) { if (!oCl.contains(ev.relatedTarget)) moMenu(false); });
      oCl.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') { moMenu(false); $('[data-l=cl]', tr).focus(); ev.stopPropagation(); } });
    }
    tr.addEventListener('click', function (ev) {
      if (thay) return;
      if (ev.target.closest('.am-luong')) return;
      var bCl = ev.target.closest('[data-cl]'); if (bCl) { doiChat(bCl.getAttribute('data-cl'), true); ev.stopPropagation(); return; }
      if (!ev.target.closest('.cl-o')) moMenu(false);
      var b = ev.target.closest('[data-l]');
      if (!b) { if (ev.target.closest('.san')) phatDung(); return; }
      var l = b.getAttribute('data-l');
      if (l === 'phat') phatDung();
      else if (l === 'lui') toi((vd.currentTime || 0) - 10);
      else if (l === 'toc') { toc = TOC_MUC[(TOC_MUC.indexOf(toc) + 1) % TOC_MUC.length]; caiDat('trinh-toc', toc); b.textContent = toc + '×'; vd.playbackRate = toc; vd.defaultPlaybackRate = toc; }
      else if (l === 'cl') moMenu($('.cl-menu', tr).hidden);
      else if (l === 'rong') { var on = document.documentElement.classList.toggle('khung-rong'); caiDat('khung-rong', on ? '1' : '0'); b.setAttribute('aria-pressed', on); setTimeout(function () { tr.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }, 60); }
      else if (l === 'am') { tat = !tat; vd.muted = tat; if (!tat && vd.volume < .05) vd.volume = amL = .6; caiDat('trinh-tat-am', tat ? '1' : '0'); b.innerHTML = tat ? BIEU.tat : BIEU.am; b.setAttribute('aria-pressed', tat); }
      else if (l === 'chep') { if (chep) { chep.hidden = !chep.hidden; b.setAttribute('aria-pressed', !chep.hidden); veChep(); } }
      else if (l === 'to') { try { if (document.fullscreenElement) document.exitFullscreen(); else if (tr.requestFullscreen) tr.requestFullscreen().catch(function () {}); } catch (x3) {} }
      else if (l === 'lai') { vd.currentTime = 0; phatDung(); }
      else if (l === 'hoi') { var hn = $('.hoi-nhanh'); if (hn) hn.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      ev.stopPropagation();
    });
    function datAm(a) { amL = Math.max(0, Math.min(1, a)); vd.volume = amL; tat = amL < .01; vd.muted = tat; caiDat('trinh-am-luong', amL); caiDat('trinh-tat-am', tat ? '1' : '0'); var b = $('[data-l=am]', tr); b.innerHTML = tat ? BIEU.tat : BIEU.am; b.setAttribute('aria-pressed', tat); }
    oAm.addEventListener('input', function () { datAm(+oAm.value); });
    var thanh = $('.thanh-tg', tr);
    thanh.addEventListener('click', function (ev) {
      var r = thanh.getBoundingClientRect(), t = Math.max(0, Math.min(1, (ev.clientX - r.left) / r.width)) * tong;
      if (t > R.moc + 1) baoNho(tr, 'Chỉ tua lại được phần đã xem');
      toi(t); ev.stopPropagation();
    });
    tr.addEventListener('keydown', function (ev) {
      if (thay || ev.target.closest('input,textarea,select')) return;
      var k = ev.key;
      if (k === ' ' || k === 'k' || k === 'K') { ev.preventDefault(); phatDung(); }
      else if (k === 'ArrowLeft') { ev.preventDefault(); toi((vd.currentTime || 0) - 5); }
      else if (k === 'ArrowUp') { ev.preventDefault(); datAm(amL + .1); oAm.value = amL; }
      else if (k === 'ArrowDown') { ev.preventDefault(); datAm(amL - .1); oAm.value = amL; }
      else if (k === 'f' || k === 'F') $('[data-l=to]', tr).click();
      else if (k === 'm' || k === 'M') $('[data-l=am]', tr).click();
    });
    // chuyển tab / thu nhỏ / rời trang → dừng và lưu chỗ đang xem
    function anTrang() { if (document.visibilityState !== 'visible' && !vd.paused) { vd.pause(); baoNho(tr, 'Đã tạm dừng vì bạn rời trang'); } }
    function roiTrang() { if (!vd.paused) vd.pause(); ghi(true); }
    document.addEventListener('visibilitychange', anTrang);
    window.addEventListener('pagehide', roiTrang);
    return { huy: function () { document.removeEventListener('visibilitychange', anTrang); window.removeEventListener('pagehide', roiTrang); cancelAnimationFrame(raf); ghi(true); vd.pause(); vd.removeAttribute('src'); vd.load(); if (thay) thay.huy(); } };
  }

  // ================================================================ khối tài liệu
  function bieuCot(k) {
    var w = 560, h = 230, le = 8, max = Math.max.apply(null, k.cot.map(function (c) { return c.gt; })), n = k.cot.length, o = '';
    var bw = Math.min(64, (w - le * 2) / n * .5), buoc = (w - le * 2) / n;
    [.5, 1].forEach(function (f) { var y = h - 30 - (h - 60) * f; o += '<line class="luoi-k" x1="0" x2="' + w + '" y1="' + y + '" y2="' + y + '"/>'; });
    k.cot.forEach(function (c, i) {
      var ch = (h - 60) * c.gt / max, x = le + buoc * i + (buoc - bw) / 2, y = h - 30 - ch;
      var nhan = so(c.gt) + (k.hau || '');
      o += '<g class="cot-h" tabindex="0" data-go="' + e(c.nhan + ': ' + nhan + (k.don ? ' ' + k.don : '')) + '"><rect class="cot-d' + (i === n - 1 ? ' cuoi' : '') + '" x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + ch.toFixed(1) + '" rx="4"/>' +
        '<rect x="' + (le + buoc * i).toFixed(1) + '" y="0" width="' + buoc.toFixed(1) + '" height="' + (h - 30) + '" fill="transparent"/>' +
        '<text class="nhan-gt" x="' + (x + bw / 2).toFixed(1) + '" y="' + (y - 8).toFixed(1) + '" text-anchor="middle">' + nhan + '</text>' +
        '<text class="nhan-x" x="' + (x + bw / 2).toFixed(1) + '" y="' + (h - 10) + '" text-anchor="middle">' + e(c.nhan) + '</text></g>';
    });
    o += '<line class="truc" x1="0" x2="' + w + '" y1="' + (h - 30) + '" y2="' + (h - 30) + '"/>';
    return '<figure class="bieu" style="margin:0"><svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + e(k.tieu + ': ' + k.cot.map(function (c) { return c.nhan + ' ' + so(c.gt) + (k.hau || ''); }).join(', ')) + '">' + o + '</svg></figure>';
  }
  function bieuNgang(k) {
    var w = 560, hang = 38, h = k.cot.length * hang + 6, nhanW = 170, max = Math.max.apply(null, k.cot.map(function (c) { return c.gt; })), o = '';
    k.cot.forEach(function (c, i) {
      var y = i * hang + 6, bw = (w - nhanW - 60) * c.gt / max, nhan = so(c.gt) + (k.hau || '');
      o += '<g class="cot-h" tabindex="0" data-go="' + e(c.nhan + ': ' + nhan) + '"><text class="nhan-x" x="0" y="' + (y + 19) + '" style="font-size:13px;fill:currentColor">' + e(c.nhan) + '</text>' +
        '<rect class="cot-d" x="' + nhanW + '" y="' + (y + 4) + '" width="' + bw.toFixed(1) + '" height="22" rx="4"/>' +
        '<text class="nhan-gt" x="' + (nhanW + bw + 8).toFixed(1) + '" y="' + (y + 20) + '">' + nhan + '</text></g>';
    });
    return '<figure class="bieu" style="margin:0;color:var(--chu-2)"><svg viewBox="0 0 ' + w + ' ' + h + '" role="img" aria-label="' + e(k.tieu + ': ' + k.cot.map(function (c) { return c.nhan + ' ' + c.gt + (k.hau || ''); }).join(', ')) + '">' + o + '</svg></figure>';
  }
  var DO_TL = { muc: 0 };
  function veKhoi(k) {
    var tieu = k.tieu ? '<h3>' + e(k.tieu) + '</h3>' : '', phu = k.phu ? '<p class="phu">' + e(k.phu) + '</p>' : '';
    var trong = '';
    switch (k.loai) {
      case 'so-sanh':
        var nh = k.nhan || ['', 'Trước đây', 'Bây giờ'];
        trong = '<div class="cuon-ngang"><table class="bang-ss"><thead><tr><th>' + e(nh[0]) + '</th><th>' + e(nh[1]) + '</th><th class="moi">' + e(nh[2]) + '</th></tr></thead><tbody>' +
          k.dong.map(function (d) { return '<tr><td>' + e(d[0]) + '</td><td class="cu">' + e(d[1]) + '</td><td class="moi">' + e(d[2]) + '</td></tr>'; }).join('') + '</tbody></table></div>';
        break;
      case 'so':
        trong = '<div class="o-so">' + k.muc.map(function (m) { return '<div><b>' + e(m.so) + '</b><span>' + e(m.chu) + '</span>' + (m.phu ? '<small>' + e(m.phu) + '</small>' : '') + '</div>'; }).join('') + '</div>';
        break;
      case 'cot': trong = bieuCot(k); break;
      case 'cot-ngang': trong = bieuNgang(k); break;
      case 'luu-y': trong = '<div class="luu-y">' + k.chu + '</div>'; break;
      case 'trich':
        trong = '<div class="trich">' + k.muc.map(function (m) { return '<blockquote><p>“' + e(m.chu) + '”</p><footer>' + e(m.nguon) + '</footer></blockquote>'; }).join('') + '</div>';
        break;
      case 'the':
        trong = (k.muc ? '<div class="the-luoi">' + k.muc.map(function (m) { return '<div><b>' + e(m.tieu) + '</b><p>' + e(m.chu) + '</p></div>'; }).join('') + '</div>' : '') +
          (k.chip ? '<div class="chips">' + k.chip.map(function (c) { return '<span class="chip">' + e(c) + '</span>'; }).join('') + '</div>' : '');
        break;
      case 'vong':
        trong = '<div class="vong-tl">' + svgVong([], 'tl') + '<div class="vong-giai" aria-live="polite"></div></div>';
        break;
      case 'goc':
        var nh2 = k.nhanh;
        trong = '<div class="goc"><div class="nhanh"><b>' + e(nh2[0][0]) + '</b>' + e(nh2[0][1]) + '</div><div class="tam">Kịch bản<small>đã duyệt</small></div><div class="nhanh"><b>' + e(nh2[1][0]) + '</b>' + e(nh2[1][1]) + '</div>' +
          '<div class="nhanh"><b>' + e(nh2[2][0]) + '</b>' + e(nh2[2][1]) + '</div><div class="nhanh"><b>' + e(nh2[3][0]) + '</b>' + e(nh2[3][1]) + '</div><p class="loi-goc">' + e(k.chu) + '</p></div>';
        break;
      case 'hai-nhom':
        // nội dung chung cho người học cả công ty: không mã dự án, target, ngân sách hay cuộc họp (user 08/11)
        tieu = '<h3>Hai con đường, một tinh thần</h3>'; phu = '<p class="phu">Đi đường nào cũng chung giá trị cốt lõi: học tập và phát triển không ngừng.</p>';
        if (k.an_dau) { tieu = ''; phu = ''; }
        var hang = function (n, d) { return '<div class="nhom-o ' + n.lop + '"><header><small>' + n.nhan + '</small><h3>' + n.ten + '</h3><p>' + n.sp + '</p></header><dl>' +
          d.map(function (r) { return '<dt>' + r[0] + '</dt><dd>' + r[1] + '</dd>'; }).join('') + '</dl></div>'; };
        trong = '<div class="hai-nhom">' +
          hang({ lop: 'n1', nhan: 'Con đường 1', ten: 'Người tìm công thức', sp: 'Sản phẩm đang tìm chỗ đứng: mới ra, hoặc đang đi xuống' }, [
            ['Việc chính', 'Tìm ra video win: hiểu sản phẩm → chọn angle → lên cảnh quay → dựng video → đọc số, sửa tới khi ra đơn'],
            ['Kỹ năng trọng tâm', 'Hiểu sản phẩm, chọn angle, quay và dựng video chuyển đổi, đọc số'],
            ['Hợp với', 'Người thích tự tay làm từ đầu đến cuối'],
            ['Dẫn tới', 'Cầm trọn một dự án']]) +
          hang({ lop: 'n2', nhan: 'Con đường 2', ten: 'Người mở rộng', sp: 'Sản phẩm đang bán tốt: sản phẩm chủ lực của thương hiệu' }, [
            ['Việc chính', 'Vừa đưa sản phẩm tới nhiều người hơn (KOL, KOC, affiliate, nhiều nền tảng), vừa liên tục thử angle mới'],
            ['Kỹ năng trọng tâm', 'Kịch bản cho KOL, KOC, affiliate; duyệt video; đọc số; cần đủ kỹ năng của con đường 1'],
            ['Hợp với', 'Người thích nhìn bức tranh lớn và làm việc với nhiều người'],
            ['Dẫn tới', 'Dẫn dắt một đội làm nội dung']]) + '</div>';
        break;
      case 'nhip':
        trong = '<ol class="nhip">' + k.muc.map(function (m) { return '<li><b>' + e(m[0]) + '</b>' + e(m[1]) + '</li>'; }).join('') + '</ol>';
        break;
      case 'bac-thang':
        trong = '<div class="bac">' + k.muc.map(function (m, i) {
          var lop = i < k.o ? 'qua' : i === k.o ? 'day' : 'dich', co = i < k.o ? 'Đã vượt' : i === k.o ? 'Đang ở đây' : 'Đích';
          return '<div class="' + lop + '"><span class="co">' + co + '</span><small>Tầng ' + (i + 1) + '</small><b>' + e(m.tieu) + '</b><p>' + e(m.chu) + '</p></div>';
        }).join('') + '</div>';
        break;
      case 'buoc':
        trong = '<ol class="buoc">' + k.muc.map(function (m) { return '<li><div><b>' + e(m[0]) + '</b><p>' + e(m[1]) + '</p></div></li>'; }).join('') + '</ol>';
        break;
      case 'bang':
        trong = '<div class="cuon-ngang"><table class="bang-tl"><thead><tr>' + k.dau.map(function (d) { return '<th>' + e(d) + '</th>'; }).join('') + '</tr></thead><tbody>' +
          k.dong.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + e(c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
        break;
      case 'thoi-gian':
        trong = '<div class="dong-tg"><div class="vach"><div class="h">Hook</div><div class="t">Thân</div><div class="k">Kêu gọi</div></div><div class="moc"><span>0 giây</span><span>3 giây</span><span>25 giây</span><span>30 giây</span></div>' +
          '<div class="giai"><div><b>Hook · 0–3 giây</b>làm người xem dừng tay</div><div><b>Thân · chứng minh</b>làm người xem tin</div><div><b>Kêu gọi · cuối video</b>một hành động rõ</div></div></div>';
        break;
      case 'nhan':
        trong = '<div class="nhan-v">' + ['A', 'B', 'C', 'D', 'E'].map(function (c, i) {
          return '<div class="hang-v"><span class="hk" style="background:' + MAU_HOOK[i] + '">Hook ' + c + '</span><span class="th">Thân video đã thắng</span><span class="kq">Video ' + (i + 1) + '</span></div>';
        }).join('') + '</div>';
        break;
      case 'lo':
        var o = ''; for (var i = 1; i <= 10; i++) o += '<span>' + i + '</span>';
        trong = '<div class="lo-v"><div class="mau">✓ Video mẫu<small>đã duyệt kỹ từng phần</small></div><span class="mui" aria-hidden="true">→</span><div class="luoi-lo">' + o + '</div></div>';
        break;
      case 'doc-so':
        trong = '<div class="doc-so"><div class="h"><small>Hook</small><b>Lượt xem</b><p>Tỷ lệ giữ người xem vài giây đầu</p></div><div class="t"><small>Thân</small><b>Thời gian xem</b><p>Người xem ở lại bao lâu</p></div><div class="k"><small>Kêu gọi</small><b>Bấm giỏ, đơn hàng</b><p>Có hành động hay không</p></div></div>';
        break;
      case 'vong-nho':
        trong = '<div class="vong-nho-tl">' + k.muc.map(function (m, i) { return '<span' + (i === k.muc.length - 1 ? ' class="cuoi"' : '') + '>' + e(m) + '</span>' + (i < k.muc.length - 1 ? '<i aria-hidden="true">→</i>' : ''); }).join('') + '<span class="lai">↻ rồi quay lại từ đầu với video tiếp theo — lỗi chỉ phải sửa một lần.</span></div>';
        break;
      case 'kiem':
        var ma = 'kiem-' + (DO_TL.muc++);
        trong = '<div class="kiem-o">' + k.muc.map(function (m, i) { return '<label><input type="checkbox" data-kiem="' + ma + '-' + i + '"' + (D.kiem[ma + '-' + i] ? ' checked' : '') + '><span>' + e(m) + '</span></label>'; }).join('') + '</div>';
        break;
      case 'hoi-dap':
        trong = '<div class="hoi-dap">' + k.muc.map(function (m) { return '<details><summary>' + e(m[0]) + '</summary><p>' + e(m[1]) + '</p></details>'; }).join('') + '</div>';
        break;
      case 'cau-noi':
        trong = '<div class="cau-noi">' + k.muc.map(function (m) { return '<div><span>“' + e(m) + '”</span><button class="nut" type="button" data-chep="' + e(m) + '">Chép</button></div>'; }).join('') + '</div><p class="bao-chep" aria-live="polite"></p>';
        break;
      default: trong = '';
    }
    return '<section class="khoi">' + tieu + phu + trong + '</section>';
  }
  function ganKhoi(goc) {
    $$('.vong-tl', goc).forEach(function (v) {
      var giai = $('.vong-giai', v);
      function chon(i) {
        $$('.o-vong', v).forEach(function (g) { g.classList.toggle('chon', +g.getAttribute('data-i') === i); });
        giai.innerHTML = '<b>' + (i + 1) + '. ' + e(NUT_VONG[i].t.replace('\n', ' ')) + (NUT_VONG[i].d ? ' · người duyệt' : '') + '</b>' + e(NUT_VONG[i].g);
      }
      $$('.o-vong', v).forEach(function (g) {
        var i = +g.getAttribute('data-i');
        g.addEventListener('click', function () { chon(i); });
        g.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); chon(i); } });
      });
      chon(0);
    });
    $$('[data-chep]', goc).forEach(function (b) {
      b.addEventListener('click', function () {
        var bao = $('.bao-chep', b.closest('.khoi')), t = b.getAttribute('data-chep');
        var xong = function () { bao.textContent = 'Đã chép — dán vào ô chat với Agent.'; };
        if (navigator.clipboard) navigator.clipboard.writeText(t).then(xong, function () { bao.textContent = t; }); else bao.textContent = t;
      });
    });
    $$('[data-kiem]', goc).forEach(function (c) { c.addEventListener('change', function () { D.kiem[c.getAttribute('data-kiem')] = c.checked; luu(); }); });
    var goY = null;
    $$('.cot-h', goc).forEach(function (g) {
      var hien = function (ev) {
        if (!goY) { goY = document.createElement('div'); goY.className = 'go-y'; document.body.appendChild(goY); }
        goY.textContent = g.getAttribute('data-go'); goY.hidden = false;
        var r = g.getBoundingClientRect(), x = ev && ev.clientX ? ev.clientX : r.left + r.width / 2, y = ev && ev.clientY ? ev.clientY : r.top;
        goY.style.left = Math.min(window.innerWidth - 200, x + 12) + 'px'; goY.style.top = (y - 36) + 'px';
      };
      g.addEventListener('mousemove', hien); g.addEventListener('focus', hien);
      ['mouseleave', 'blur'].forEach(function (ev) { g.addEventListener(ev, function () { if (goY) goY.hidden = true; }); });
    });
  }

  // ================================================================ câu hỏi nhanh — chọn hết rồi Nộp; đáp án + giải thích chỉ hiện sau khi nộp
  // D.hn[mã câu] = lựa chọn (số) hoặc chỗ bấm {x, y} (câu bấm trên ảnh); D.hnl[bài] = { lan: số lần nộp, lan1: điểm lần đầu, cuoi, xem_kq }
  function hnDung(q, tl, ma) {
    if (q.loai !== 'bam') return tl === q.dap;
    if (tl === 1) return true; // dữ liệu cũ: đã bấm trúng
    if (!tl || typeof tl !== 'object') return false;
    var r = rectMuc(q.anh, q.dung), m = .012;
    return !!r && tl.x >= r.x - m && tl.x <= r.x + r.w + m && tl.y >= r.y - m && tl.y <= r.y + r.h + m;
  }
  function veHoiNhanh(bai) {
    var h = D.hnl[bai.id] || {}, kq = !!h.xem_kq;
    return '<section class="hoi-nhanh' + (kq ? ' da-nop' : '') + '" id="hoi-nhanh"><h2>Kiểm tra nhanh</h2>' +
      '<p class="phu">Chọn hết rồi bấm <b>Nộp</b> — đáp án và giải thích hiện sau khi nộp. Điểm lần nộp đầu tính vào điểm buổi.</p>' +
      bai.hoi_nhanh.map(function (q, k) {
        var ma = bai.id + '-hn' + k, da = D.hn[ma];
        if (q.loai === 'bam') {
          return '<fieldset class="cau bam-o" data-ma="' + ma + '"><legend><small>Câu ' + (k + 1) + ' / ' + bai.hoi_nhanh.length + ' · bấm đúng chỗ trên ảnh</small>' + e(q.hoi) + '</legend>' +
            '<div class="anh-bam" title="Bấm vào chỗ bạn sẽ bấm khi làm thật"><img src="' + anhSrc(q.anh) + '" alt="Ảnh màn hình Xưởng — bấm vào chỗ đúng" draggable="false"><i class="dung-o" hidden></i><i class="cham-chon" hidden></i></div>' +
            '<div class="phan-hoi" hidden></div></fieldset>';
        }
        return '<fieldset class="cau" data-ma="' + ma + '"><legend><small>Câu ' + (k + 1) + ' / ' + bai.hoi_nhanh.length + '</small>' + e(q.hoi) + '</legend>' +
          q.chon.map(function (c, j) { return '<label><input type="radio" name="' + ma + '" value="' + j + '"' + (da === j ? ' checked' : '') + '><span>' + e(c) + '</span></label>'; }).join('') +
          '<div class="phan-hoi" hidden></div></fieldset>';
      }).join('') +
      '<div class="hn-chan"><button type="button" class="nut chinh" data-hn="nop">Nộp câu trả lời</button><button type="button" class="nut" data-hn="lai" hidden>Làm lại để ôn</button><span class="hn-bao" aria-live="polite"></span></div></section>';
  }
  function ganHoiNhanh(goc, bai) {
    var sec = $('.hoi-nhanh', goc); if (!sec) return;
    var H = D.hnl[bai.id] = D.hnl[bai.id] || {}, bao = $('.hn-bao', sec), nNop = $('[data-hn=nop]', sec), nLai = $('[data-hn=lai]', sec);
    var ds = $$('.cau', sec);
    function khoa(on) { $$('input', sec).forEach(function (i) { i.disabled = on; }); sec.classList.toggle('da-nop', on); nNop.hidden = on; nLai.hidden = !on; }
    function veCham(fs, q, ma) { // chỗ đã bấm (chưa nói đúng sai)
      var tl = D.hn[ma], c = $('.cham-chon', fs); if (!c) return;
      if (tl && typeof tl === 'object') { c.hidden = false; c.style.left = (tl.x * 100) + '%'; c.style.top = (tl.y * 100) + '%'; } else c.hidden = true;
    }
    function hienKetQua() {
      var dung = 0;
      ds.forEach(function (fs, k) {
        var q = bai.hoi_nhanh[k], ma = fs.getAttribute('data-ma'), tl = D.hn[ma], ok = hnDung(q, tl, ma), ph = $('.phan-hoi', fs);
        if (ok) dung++;
        if (q.loai === 'bam') {
          var r = rectMuc(q.anh, q.dung), o = $('.dung-o', fs);
          if (r) { o.hidden = false; o.style.cssText = 'left:' + (r.x * 100) + '%;top:' + (r.y * 100) + '%;width:' + (r.w * 100) + '%;height:' + (r.h * 100) + '%'; }
          $('.cham-chon', fs).classList.toggle('sai', !ok);
        } else {
          $$('label', fs).forEach(function (l, i) { l.classList.toggle('dung', i === q.dap); l.classList.toggle('sai', i === tl && tl !== q.dap); });
        }
        ph.hidden = false; ph.className = 'phan-hoi ' + (ok ? 'dung' : 'sai');
        ph.innerHTML = '<b>' + (ok ? 'Đúng.' : q.loai === 'bam' ? 'Chưa đúng — chỗ đúng đã khoanh xanh.' : 'Chưa đúng — đáp án đúng tô xanh.') + '</b>' + e(ok ? q.giai : (q.giai || q.goi_y));
      });
      bao.textContent = 'Kết quả: ' + dung + '/' + ds.length + ' câu đúng' + (H.lan1 ? ' · điểm tính vào buổi (lần nộp đầu): ' + H.lan1.dung + '/' + H.lan1.tong : '');
      khoa(true);
      return dung;
    }
    ds.forEach(function (fs, k) {
      var q = bai.hoi_nhanh[k], ma = fs.getAttribute('data-ma');
      if (q.loai === 'bam') {
        var hop = $('.anh-bam', fs); veCham(fs, q, ma);
        hop.addEventListener('click', function (ev) {
          if (sec.classList.contains('da-nop')) return;
          var r = hop.getBoundingClientRect();
          D.hn[ma] = { x: (ev.clientX - r.left) / r.width, y: (ev.clientY - r.top) / r.height }; luu(); veCham(fs, q, ma); bao.textContent = '';
        });
      } else $$('input', fs).forEach(function (r) { r.addEventListener('change', function () { D.hn[ma] = +r.value; luu(); bao.textContent = ''; }); });
    });
    nNop.addEventListener('click', function () {
      var thieu = ds.filter(function (fs, k) { var tl = D.hn[fs.getAttribute('data-ma')]; return bai.hoi_nhanh[k].loai === 'bam' ? !(tl === 1 || (tl && typeof tl === 'object')) : typeof tl !== 'number'; }).length;
      if (thieu) { bao.textContent = 'Còn ' + thieu + ' câu chưa trả lời.'; return; }
      H.xem_kq = true; H.lan = (+H.lan || 0) + 1;
      var dung = 0; ds.forEach(function (fs, k) { if (hnDung(bai.hoi_nhanh[k], D.hn[fs.getAttribute('data-ma')])) dung++; });
      if (!H.lan1) H.lan1 = { dung: dung, tong: ds.length, luc: new Date().toISOString() };
      H.cuoi = { dung: dung, tong: ds.length };
      luu(); hienKetQua();
      try { document.dispatchEvent(new CustomEvent('da-nop-hoi-nhanh', { detail: bai.id })); } catch (x) {}
    });
    nLai.addEventListener('click', function () {
      H.xem_kq = false; ds.forEach(function (fs) { delete D.hn[fs.getAttribute('data-ma')]; }); luu();
      var moi = document.createElement('div'); moi.innerHTML = veHoiNhanh(bai); sec.replaceWith(moi.firstChild); ganHoiNhanh(goc, bai);
    });
    if (H.xem_kq) hienKetQua();
  }

  // ================================================================ các trang
  function huyTrinh() { if (dang) { dang.huy(); dang = null; } }
  function trangTong() {
    var t = demTien(), tiep = DS.filter(function (x) { return !baiXong(x.bai.id); })[0];
    // độ dài video THẬT (giọng từng cảnh + 0,45 s nghỉ, như trình phát) — bai.phut là thời gian học ước tính, không phải phút video
    var tongGiay = 0;
    DS.forEach(function (x) { if (VIDEO_BAI[x.bai.id]) { tongGiay += VIDEO_BAI[x.bai.id].dai; return; } x.bai.canh.forEach(function (c, i) { var g = GIONG[x.bai.id + '-' + (i + 1)]; tongGiay += g && g.dai ? g.dai + .45 : Math.max(3.6, c.loi.length / 14.5 + .9); }); });
    var tongPhut = Math.round(tongGiay / 60);
    // lụa xanh + sợi vàng mảnh dưới chân phần mở đầu (vẽ 1 lần, đứng yên, tự đổi màu theo sáng / tối)
    var soi = '<svg class="soi" viewBox="0 0 1400 150" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="lua-xanh" x1="0" y1="1" x2="1" y2="0">' +
      '<stop offset="0" style="stop-color:var(--lua-1);stop-opacity:0"/><stop offset=".55" style="stop-color:var(--lua-1);stop-opacity:.9"/><stop offset="1" style="stop-color:var(--trang-tri);stop-opacity:.28"/></linearGradient></defs>' +
      '<path class="lua" d="M420 150C760 140 980 112 1150 74S1340 18 1400 6V150Z"/><path class="chi" d="M300 149C700 140 960 110 1140 70S1338 14 1400 2" vector-effect="non-scaling-stroke"/></svg>';
    // trang chủ viết như trang giới thiệu (06/11): số thật → nỗi mệt trước/sau → bạn được gì → bằng chứng → lộ trình → nhóm → cách học → lời chốt
    var T = K.trang_chu, so2 = function (n) { return hai(n) + ' · '; };
    var dau = function (p) { return e(p[0]) + '<em class="ng">' + e(p[1]) + '</em>' + e(p[2] || ''); };
    var v0 = VIDEO_BAI[DS[0].bai.id], phut0 = v0 ? Math.max(1, Math.round(v0.dai / 60)) : DS[0].bai.phut;
    var nutHoc = '<a class="nut chinh to" href="#/bai/' + (tiep ? tiep.bai.id : DS[0].bai.id) + '">' + (t.xong ? 'Học tiếp: ' + e(tiep ? tiep.bai.ten : 'ôn lại') : 'Bắt đầu bài 1 · ' + phut0 + ' phút') + ' →</a>';
    var moKhoa = '<p class="mo-khoa"><i aria-hidden="true"></i>' + e(T.mo_khoa) + '</p>';
    main.innerHTML =
      '<section class="mo mo-qc">' + soi + '<div><span class="nhan">' + e(T.nhan) + '</span><h1>' + dau(T.tieu) + '</h1>' +
      '<ol class="loi-ich">' + T.loi_ich.map(function (x, k) { return '<li><i>' + hai(k + 1) + '</i>' + e(x) + '</li>'; }).join('') + '</ol><p class="loi">' + e(T.phu) + '</p>' +
      '<div class="hang">' + nutHoc + '<button class="nut to" type="button" data-cuon="lo-trinh">Xem lộ trình ' + K.buoi.length + ' buổi</button></div>' + moKhoa +
      '<p class="meta-nho">' + K.buoi.length + ' buổi · ' + DS.length + ' bài ngắn · ' + tongPhut + ' phút video · kiểm tra + report mỗi buổi' + (t.xong ? ' · bạn đã xong ' + t.pct + '%' : '') + '</p></div>' +
      '<div class="hinh" id="poster"></div></section>' +
      '<section class="bang-chung" aria-label="Số của chính team"><div class="bc-luoi">' + T.bang_chung.map(function (m) { return '<div><small>' + e(m.nhan) + '</small><b>' + e(m.so) + '</b><span>' + e(m.chu) + '</span></div>'; }).join('') + '</div><p class="bc-nguon">' + e(T.nguon) + '</p></section>' +
      '<section class="muc-tong"><header><span class="nhan">' + so2(1) + e(T.noi_dau.nhan) + '</span><h2>' + dau(T.noi_dau.tieu) + '</h2><p>' + e(T.noi_dau.phu) + '</p></header><div class="noi-dau">' +
      T.noi_dau.muc.map(function (m, k) { return '<div class="nd-o"><small>' + hai(k + 1) + ' · ' + e(m.cho) + '</small><p class="cu"><span>Kiểu cũ</span>' + e(m.cu) + '</p><p class="moi"><span>Cách mới</span>' + e(m.moi) + '</p></div>'; }).join('') + '</div></section>' +
      '<section class="muc-tong"><header><span class="nhan">' + so2(2) + e(T.duoc.nhan) + '</span><h2>' + dau(T.duoc.tieu) + '</h2></header><ul class="ds-ket-qua duoc">' +
      T.duoc.muc.map(function (m) { return '<li><span><b>' + e(m.tieu) + '</b>' + e(m.chu) + '</span></li>'; }).join('') + '</ul></section>' +
      '<section class="muc-tong"><header><span class="nhan">' + so2(3) + 'Người học nói gì</span><h2>Không phải lời hứa. <em class="ng">Là lời của chính đồng đội bạn.</em></h2><p>Trích bài thu hoạch người học tự viết sau mỗi buổi, 19/10–02/11/2026.</p></header>' +
      '<div class="loi-hv"><div class="hv-so"><b>' + e(T.hoc_vien.so) + '</b><span>' + e(T.hoc_vien.chu) + '</span></div>' + T.loi_ban_hoc.map(function (q) { return '<blockquote><p>' + e(q.chu) + '</p><footer>' + e(q.nguon) + '</footer></blockquote>'; }).join('') + '</div><p class="bc-nguon chang-tiep">' + e(T.chang_tiep) + '</p></section>' +
      '<section class="muc-tong" id="lo-trinh"><header><span class="nhan">' + so2(4) + 'Lộ trình</span><h2>' + K.buoi.length + ' buổi, <em class="ng">mỗi buổi gỡ một nút thắt</em></h2><p>3 buổi đầu: hiểu vì sao cách làm mới nhanh và trúng hơn. 2 buổi sau: làm thật trên Xưởng, từ yêu cầu tới video đã đăng.' +
        (K.phan && K.phan[3] ? ' Phần 3: học riêng theo con đường của bạn — học được cả hai.' : '') + ' Mỗi bài có tài liệu cạnh video và câu hỏi chấm ngay.</p></header>' +
      Object.keys(K.phan || { 1: '' }).map(Number).filter(function (ph) { return K.buoi.some(function (b) { return (b.phan || 1) === ph; }); }).map(function (ph) {
        var theBuoi = function (b) {
          return '<a class="the-buoi" href="#/bai/' + b.bai[0].id + '"><span class="nhan">Buổi ' + hai(b.so) + (b.mo_sau ? ' · mở sau Buổi ' + (timBuoi(b.mo_sau) || {}).so : '') + '</span><h3>' + e(b.ten) + '</h3><p>' + e(b.phu) + '</p><ol>' +
            b.bai.map(function (x, i) { return '<li><span class="so">' + b.so + '.' + (i + 1) + '</span><span>' + e(x.ten) + '</span><small>' + x.phut + ' phút</small></li>'; }).join('') + '</ol>' +
            '<div class="tdkn"><span><b>Tư duy:</b> ' + e(b.bai[0].tu_duy) + '</span><span><b>Kỹ năng:</b> ' + e((b.bai[1] || b.bai[0]).ky_nang) + '</span></div></a>';
        };
        var ds = K.buoi.filter(function (b) { return (b.phan || 1) === ph; });
        // Phần 3 (09/11): hai con đường cạnh nhau, mỗi con đường một cột các buổi nối tiếp
        if (ds.some(function (b) { return b.con_duong; })) {
          var cds = ds.map(function (b) { return b.con_duong; }).filter(function (c, i, a) { return c && a.indexOf(c) === i; });
          return '<p class="nhan nhan-phan">' + e(K.phan[ph]) + '</p><div class="ds-con-duong">' + cds.map(function (c) {
            var cac = ds.filter(function (b) { return b.con_duong === c; });
            return '<div class="con-duong cd-' + c + '"><h3 class="cd-tieu"><span>Con đường ' + c + '</span>' + e(String((K.con_duong || {})[c] || '').replace(/^Con đường \d+\s*·\s*/, '')) + '</h3><div class="cd-buoi">' + cac.map(theBuoi).join('') + '</div></div>';
          }).join('') + '</div>';
        }
        return '<p class="nhan nhan-phan">' + e(K.phan[ph]) + '</p><div class="ds-buoi">' + ds.map(theBuoi).join('') + '</div>';
      }).join('') + '</section>' +
      '<section class="muc-tong"><header><span class="nhan">' + so2(5) + 'Hai con đường</span><h2>Hai con đường, <em class="ng">một tinh thần</em></h2><p>Sản phẩm đang tìm chỗ đứng cần người tìm công thức. Sản phẩm đang bán tốt cần người mở rộng. Ai cũng học chung ' + K.buoi.filter(function (b) { return (b.phan || 1) < 3; }).length + ' buổi, rồi đi sâu vào con đường của mình.</p></header>' + veKhoi({ loai: 'hai-nhom', an_dau: true }) + '</section>' +
      '<section class="muc-tong"><header><span class="nhan">' + so2(6) + 'Cách học</span><h2>Nhẹ hơn <em class="ng">bạn nghĩ</em></h2><p>Mọi bài tập, bài kiểm tra làm trong giờ hành chính. Chưa kịp thì báo người hướng dẫn để lùi hạn.</p></header><div class="cach-hoc">' +
      K.cach_hoc.map(function (c) { return '<div><b>' + e(c.tieu) + '</b>' + e(c.chu) + '</div>'; }).join('') + '</div></section>' +
      '<section class="chot"><h2>' + dau(T.chot.tieu) + '</h2><p>' + e(T.chot.phu) + '</p><div class="hang">' + nutHoc + '</div>' + moKhoa + '</section>';
    $$('[data-cuon]', main).forEach(function (b) { b.addEventListener('click', function () { var d = document.getElementById(b.getAttribute('data-cuon')); if (d) d.scrollIntoView({ behavior: 'smooth', block: 'start' }); }); });
    // khung bên phải: video mới của bài 1 (nếu đã gắn), không thì cảnh vòng workflow vẽ tĩnh
    var p = $('#poster'); p.style.padding = '0'; p.style.display = 'block';
    if (v0) dang = taoVideo(p, DS[0], v0);
    else {
      p.setAttribute('aria-hidden', 'true');
      var bai0 = { b: K.buoi[0], i: 1, bai: { id: 'poster', ten: 'Nguyên lý một vòng', canh: [{ loi: '', hinh: { loai: 'vong', sang: [0, 1, 2, 3, 4, 5, 6], chip: ['Video GMV cao nhất · mình + đối thủ', 'Kalodata · FastMoss · Chanmama', 'Video của chính team'] } }] } };
      dang = taoTrinh(p, bai0, true);
    }
    ganKhoi(main);
    if (window.KHOA_DANH_GIA) window.KHOA_DANH_GIA.ganTong(main); // 09/11: thẻ mời Góp ý chung (chưa gửi thì hiện dưới phần mở đầu)
    gopY = { buoi: K.buoi[0].gop_y_ten, muc: 'Tổng quan khoá học' };
    document.title = K.ten + ' — Khoá nền tảng';
  }
  function trangBai(id) {
    var x = timBai(id); if (!x) return trangTong();
    var b = x.b, bai = x.bai, i = DS.indexOf(x), truoc = DS[i - 1], sau = DS[i + 1];
    var thieuMo = chuaMo(id);
    if (thieuMo) { trangKhoa(bai.ten, thieuMo); gopY = { buoi: b.gop_y_ten, muc: 'Bài ' + b.so + '.' + (x.i + 1) + ' · ' + bai.ten }; document.title = bai.ten + ' — chưa mở'; return; }
    D.bai[id] = D.bai[id] || {}; D.bai[id].mo = 1; luu();
    var coGiong = bai.canh.some(function (c, k) { return GIONG[id + '-' + (k + 1)]; });
    var vb = VIDEO_BAI[id], tongGiay = vb ? vb.dai : bai.canh.reduce(function (s, c, k) { var g = GIONG[id + '-' + (k + 1)]; return s + (g && g.dai ? g.dai + .45 : Math.max(3.6, c.loi.length / 14.5 + .9)); }, 0); // cùng cách tính với trình chiếu
    DO_TL.muc = 0;
    main.innerHTML =
      '<nav class="duong-dan" aria-label="Đang ở"><a href="#/">Khoá học</a><span>›</span><span>Buổi ' + b.so + ' · ' + e(b.ten) + '</span><span>›</span><span>Bài ' + (x.i + 1) + '</span></nav>' +
      '<header class="dau-bai co-so"><span class="so-bai" aria-hidden="true">' + b.so + '.' + (x.i + 1) + '</span><span class="nhan">Buổi ' + hai(b.so) + ' · Bài ' + (x.i + 1) + ' / ' + b.bai.length + '</span><h1>' + nghieng(bai.ten) + '</h1>' +
      '<div class="meta"><span>Video ' + phut(tongGiay) + '</span><span>Đọc khoảng ' + bai.phut + ' phút</span><span>' + bai.hoi_nhanh.length + ' câu hỏi nhanh</span>' + (dsLanHoc(D.bai[id]).length ? '<span title="Mỗi lần mở bài và bấm phát được ghi thành 1 lần học">Đã học ' + dsLanHoc(D.bai[id]).length + ' lần</span>' : '') + (baiXong(id) ? '<span class="xong-bai">✓ Đã hoàn thành</span>' : '') + '</div></header>' +
      '<div class="bai-luoi">' +
        '<div class="bai-tren"><section class="muc-tieu"><h2>Xem xong, bạn sẽ</h2><ul>' + bai.muc_tieu.map(function (m) { return '<li>' + e(m) + '</li>'; }).join('') + '</ul></section>' +
        '<div class="td-kn" style="margin-top:16px"><div class="td"><span>Tư duy</span><p>' + e(bai.tu_duy) + '</p></div><div class="kn"><span>Kỹ năng</span><p>' + e(bai.ky_nang) + '</p></div></div></div>' +
        '<div class="bai-trai"><div id="trinh-host"></div><div class="ban-chep" hidden aria-label="Bản chép lời"></div>' +
        (coGiong || vb ? '' : '<p class="ghi-trinh">Bản xem trước: phụ đề chạy theo nhịp đọc, chưa gắn giọng. Bấm ▤ để xem bản chép lời.</p>') + '</div>' +
        '<div class="bai-duoi"><section class="y-chinh"><h2>Ý chính</h2><ol>' + bai.y_chinh.map(function (m) { return '<li><span>' + e(m) + '</span></li>'; }).join('') + '</ol></section>' +
        bai.khoi.map(veKhoi).join('') + veHoiNhanh(bai) +
        '<div class="cuoi-bai">' + (truoc ? '<a class="nut" href="#/bai/' + truoc.bai.id + '">← ' + e(truoc.bai.ten) + '</a>' : '<a class="nut" href="#/">← Tổng quan</a>') +
        '<span class="xong-o"><button class="nut chinh to" type="button" id="xong-bai" data-bai="' + id + '" disabled>' + (sau && sau.b === b ? 'Hoàn thành, học bài tiếp →' : 'Hoàn thành, sang kiểm tra cuối buổi →') + '</button>' +
        '<small class="khoa-xong"></small></span></div>' +
        '<p class="ghi-nguon">Số liệu: Dashboard Video AI (đọc 03/11/2026), biên bản họp Team AI 02/11/2026, bảng target 2 nhóm, 89 bài thu hoạch 19/10–02/11. Trích lời nhân sự giữ nguyên ý, không ghi tên.</p></div>' +
      '</div>';
    dang = vb ? taoVideo($('#trinh-host'), x, vb) : taoTrinh($('#trinh-host'), x, false);
    ganKhoi(main); ganHoiNhanh(main, bai); capNhatNutXong(); batDemTrang(id);
    $('#xong-bai').addEventListener('click', function () {
      if ($('#xong-bai').disabled) return;
      D.bai[id].xong_luc = D.bai[id].xong_luc || new Date().toISOString();
      D.bai[id].xong = true; luu();
      location.hash = sau && sau.b === b ? '#/bai/' + sau.bai.id : '#/kiem-tra/' + b.id;
    });
    gopY = { buoi: b.gop_y_ten, muc: 'Bài ' + b.so + '.' + (x.i + 1) + ' · ' + bai.ten };
    document.title = bai.ten + ' — Buổi ' + b.so + ' · ' + K.ten;
  }
  function trangKiemTra(bid) {
    var b = timBuoi(bid); if (!b) return trangTong();
    var thieuKt = chuaMoKt(bid);
    if (thieuKt) { trangKhoa('Kiểm tra cuối buổi: ' + b.ten, thieuKt); gopY = { buoi: b.gop_y_ten, muc: 'Kiểm tra cuối Buổi ' + b.so }; document.title = 'Kiểm tra Buổi ' + b.so + ' — chưa mở'; return; }
    var kt = D.kt[bid] = D.kt[bid] || { tra: {} }, tl = D.tl[bid] = D.tl[bid] || [], ck = D.ck[bid] = D.ck[bid] || [], g = D.ghi[bid] = D.ghi[bid] || {};
    var can = Math.ceil(b.kiem_tra.length * QC.kt_dat);
    main.innerHTML = '<div class="trang-kt">' +
      '<div><nav class="duong-dan" aria-label="Đang ở"><a href="#/">Khoá học</a><span>›</span><span>Buổi ' + b.so + ' · ' + e(b.ten) + '</span><span>›</span><span>Kiểm tra</span></nav>' +
      '<header class="dau-bai"><span class="nhan">Buổi ' + hai(b.so) + ' · Kiểm tra &amp; đánh giá buổi học</span><h1>Kiểm tra cuối buổi: <em class="ng">' + e(b.ten) + '</em></h1>' +
      '<div class="meta"><span>' + b.kiem_tra.length + ' câu trắc nghiệm · ' + QC.kt_phut + ' phút · đạt từ ' + can + '/' + b.kiem_tra.length + '</span><span>' + b.tu_luan.length + ' câu tự luận</span><span>Bài tập + checklist</span><span>Làm trong giờ hành chính</span></div></header></div>' +
      '<section id="kt-tn"></section>' +
      '<section><h2><span class="so-muc">02</span>Tự luận</h2><p class="phu">Người hướng dẫn chấm phần này. Viết như đang nói với đồng nghiệp.</p>' +
      b.tu_luan.map(function (q, k) { return '<fieldset class="cau"><legend><small>Câu ' + (k + 1) + '</small>' + e(q) + '</legend><textarea rows="4" data-tl="' + k + '">' + e(tl[k] || '') + '</textarea></fieldset>'; }).join('') + '</section>' +
      '<section><h2><span class="so-muc">03</span>Bài tập</h2><p class="phu">Làm trong giờ hành chính của ngày làm việc. Chưa kịp thì báo người hướng dẫn để lùi hạn.</p>' +
      '<div class="cuon-ngang"><table class="bang-tl"><thead><tr><th>Việc</th><th>Thời gian</th><th>Đạt khi</th></tr></thead><tbody>' +
      b.bai_tap.map(function (r) { return '<tr><td>' + e(r[0]) + '</td><td>' + e(r[1]) + '</td><td>' + e(r[2]) + '</td></tr>'; }).join('') + '</tbody></table></div>' +
      '<div class="o-nhap"><label class="rong">Bài tập đã làm (link video, ghi chú cho người hướng dẫn) <textarea rows="2" data-ghi="bai_tap">' + e(g.bai_tap || '') + '</textarea></label></div></section>' +
      '<section><h2><span class="so-muc">04</span>Checklist</h2><div class="ds-check">' + b.checklist.map(function (c, k) { return '<label><input type="checkbox" data-ck="' + k + '"' + (ck[k] ? ' checked' : '') + '><span>' + e(c) + '</span></label>'; }).join('') + '</div></section>' +
      // 09/11: mục 05 = Đánh giá buổi học (danh-gia.js), thay "Nộp kết quả" (điền tay, in nộp) + "Góp ý" (Google Form 28/10). Bản offline không có mô-đun → chỉ nút sang buổi sau.
      (window.KHOA_DANH_GIA ? window.KHOA_DANH_GIA.mucBuoi(b) : '<section><h2><span class="so-muc">05</span>Sang bước tiếp</h2><div class="hang-nut">' + nutBuoiSau(b) + '</div></section>') +
      '<section class="kt-ban"><p class="phu">Bản bài làm của bạn (trắc nghiệm, tự luận, checklist) — để tự lưu, hoặc in khi người hướng dẫn cần.</p><p class="tom-tat" aria-live="polite"></p>' +
      '<div class="hang-nut"><button class="nut" type="button" id="in-bc">In / lưu PDF</button><button class="nut" type="button" id="tai-bc">Tải file bài làm</button></div></section></div>';

    // ---------------- 01 · Trắc nghiệm kiểu thi online (06/11): quy chế → bắt đầu → có giờ, xáo câu + đáp án, đếm rời trang → nộp → mới hiện đáp án + điểm buổi
    var sec = $('#kt-tn', main), tongCau = b.kiem_tra.length, dongHo = 0, dangRoi = false, vuaBatDau = false, hoiLaiNop = false;
    var H2 = '<h2><span class="so-muc">01</span>Trắc nghiệm</h2>';
    function tron(n) { var a = []; for (var i = 0; i < n; i++) a.push(i); for (var j = n - 1; j > 0; j--) { var r = Math.floor(Math.random() * (j + 1)), t = a[j]; a[j] = a[r]; a[r] = t; } return a; }
    function veTN() {
      if (kt.dang) veDangLam(); else if (kt.nop) veKetQua(); else veMoDau();
      var ck = $('[data-kt=cam-ket]', sec); if (ck) ck.addEventListener('change', function () { $('[data-kt=bat-dau]', sec).disabled = !ck.checked || choLai() > 0; });
      tomTat();
    }
    function veMoDau() {
      sec.innerHTML = H2 + '<div class="kt-quy-che"><h3>Quy chế làm bài</h3><ul>' +
        '<li><b>' + tongCau + ' câu</b> trắc nghiệm trong <b>' + QC.kt_phut + ' phút</b>. Hết giờ bài tự nộp.</li>' +
        '<li>Đạt từ <b>' + can + '/' + tongCau + '</b> câu. Được làm tối đa <b>' + luotToiDa() + ' lần</b>' + (+kt.them ? ' (đã được mở thêm ' + kt.them + ' lượt)' : '') + ', giữ điểm cao nhất.</li>' +
        '<li>Bài làm ở <b>chế độ toàn màn hình</b>. Đang làm thì <b>không rời trang</b>: chuyển tab, thoát toàn màn hình hay mở ứng dụng khác đều được ghi lại và báo cho người chấm.</li>' +
        '<li>Thứ tự câu và đáp án được xáo. Điểm hiện ngay khi nộp; đáp án đúng hiện khi bạn đã đạt hoặc dùng hết lượt. Hai lượt cách nhau ít nhất ' + QC.kt_cach_phut + ' phút.</li>' +
        '<li>Không chép / dán trong lúc làm.</li></ul>' +
        '<label class="kt-cam-ket"><input type="checkbox" data-kt="cam-ket"><span>Tôi cam kết tự làm bài, không nhờ người khác hay công cụ AI trả lời hộ.</span></label>' +
        (choLai() > 0 ? '<p class="tom-tat thieu">Làm lại được sau ' + gioPhut(Date.now() + choLai() * 1000) + ' (cách lượt trước ' + QC.kt_cach_phut + ' phút).</p>' : '') +
        '<button class="nut chinh to" type="button" data-kt="bat-dau" disabled>Bắt đầu làm bài · lần ' + ((+kt.lan || 0) + 1) + '/' + luotToiDa() + '</button></div>';
    }
    function veDangLam() {
      var dg = kt.dang;
      sec.innerHTML = H2 + '<div class="kt-dong-ho" role="timer" aria-live="off"><span>Còn lại <b class="kt-con">--:--</b></span><span class="kt-roi"></span></div>' +
        '<div class="kt-bai thi">' + dg.thu_tu.map(function (k, vt) {
          var q = b.kiem_tra[k];
          return '<fieldset class="cau" data-k="' + k + '"><legend><small>Câu ' + (vt + 1) + ' / ' + tongCau + '</small>' + e(q.hoi) + '</legend>' +
            dg.pa[k].map(function (j) { return '<label><input type="radio" name="' + bid + '-c' + k + '" value="' + j + '"' + (dg.tra[k] === j ? ' checked' : '') + '><span>' + e(q.chon[j]) + '</span></label>'; }).join('') + '</fieldset>';
        }).join('') + '</div><div class="hang-nut kt-nop"><button class="nut chinh to" type="button" data-kt="nop">Nộp bài</button><span class="kt-bao" aria-live="polite"></span></div>';
      $$('input', sec).forEach(function (r) { r.addEventListener('change', function () { dg.tra[+r.closest('fieldset').getAttribute('data-k')] = +r.value; hoiLaiNop = false; $('.kt-bao', sec).textContent = ''; luu(); tomTat(); }); });
      var vung = $('.kt-bai', sec);
      ['copy', 'cut', 'paste', 'contextmenu', 'dragstart'].forEach(function (ev) { vung.addEventListener(ev, function (x) { x.preventDefault(); }); });
      veRoi();
      if (!vuaBatDau) { danhDauRoi('tai-lai-trang'); dangRoi = false; veRoi(); } // vào lại giữa chừng (tải lại / quay lại trang) = 1 lần rời
      vuaBatDau = false;
      batTheoDoi();
      dem();
      dongHo = setInterval(dem, 1000);
    }
    function conLai() { return QC.kt_phut * 60 - (Date.now() - kt.dang.bd) / 1000; }
    function dem() { if (!kt.dang) return; var c = Math.max(0, Math.ceil(conLai())), o = $('.kt-con', sec); if (o) { o.textContent = phut(c); o.parentNode.classList.toggle('gap', c <= 60); } if (c <= 0) nop('het-gio'); }
    function veRoi() { var o = $('.kt-roi', sec); if (o && kt.dang) o.textContent = 'Rời trang: ' + (+kt.dang.roi || 0) + ' lần'; }
    var roiLuc = 0;
    function danhDauRoi(loai) { if (!kt.dang || dangRoi) return; dangRoi = true; roiLuc = Date.now(); kt.dang.roi = (+kt.dang.roi || 0) + 1; kt.dang.su_kien.push({ luc: new Date().toISOString(), loai: loai }); luu(); }
    function quayLai() {
      if (!dangRoi || !kt.dang) return; dangRoi = false;
      var sk = kt.dang.su_kien[kt.dang.su_kien.length - 1]; if (sk && roiLuc) { sk.giay = Math.round((Date.now() - roiLuc) / 1000); luu(); }
      veRoi();
      canhBao('Bạn vừa rời trang làm bài (lần thứ ' + kt.dang.roi + '). Việc này đã được ghi lại và báo cho người chấm. Hãy ở lại trang tới khi nộp bài.');
    }
    function onVis() { if (document.visibilityState === 'hidden') danhDauRoi('chuyen-tab'); else quayLai(); }
    function onBlur() { setTimeout(function () { if (kt.dang && !document.hasFocus() && document.visibilityState === 'visible') danhDauRoi('roi-cua-so'); }, 1200); }
    function onFocus() { quayLai(); }
    function onFs() { if (kt.dang && !document.fullscreenElement && daToanMan) { daToanMan = false; danhDauRoi('thoat-toan-man-hinh'); setTimeout(quayLai, 300); } else if (document.fullscreenElement) daToanMan = true; }
    var daToanMan = false;
    function batTheoDoi() { document.addEventListener('visibilitychange', onVis); window.addEventListener('blur', onBlur); window.addEventListener('focus', onFocus); document.addEventListener('fullscreenchange', onFs); }
    function thoTheoDoi() { document.removeEventListener('visibilitychange', onVis); window.removeEventListener('blur', onBlur); window.removeEventListener('focus', onFocus); document.removeEventListener('fullscreenchange', onFs); clearInterval(dongHo); dongHo = 0; try { if (document.fullscreenElement) document.exitFullscreen(); } catch (x) {} }
    // quản trị cho thêm lượt (06/11): kt.them = số lượt thêm, kt.cap_luc = lúc cho — lượt cho thêm sau lần làm cuối thì không phải chờ
    function luotToiDa() { return QC.kt_lan + (+kt.them || 0); }
    function choLai() { var l = kt.lich && kt.lich[kt.lich.length - 1]; if (!l || kt.dat || moHet()) return 0; var xongLuc = new Date(l.bd).getTime() + (+l.giay || 0) * 1000; if (+kt.cap_luc > xongLuc) return 0; return Math.max(0, Math.ceil((xongLuc + QC.kt_cach_phut * 60000 - Date.now()) / 1000)); }
    function gioPhut(ms) { var d = new Date(ms); return ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2); }
    // rời sang trang khác trong web khi đang làm (vd mở lại bài học để tra) cũng tính 1 lần rời; bài vẫn chạy giờ
    donKT = function () { thoTheoDoi(); if (kt.dang) { kt.dang.roi = (+kt.dang.roi || 0) + 1; kt.dang.su_kien.push({ luc: new Date().toISOString(), loai: 'roi-sang-trang-khac' }); luu(); } };
    function canhBao(chu) {
      var m = document.createElement('div'); m.className = 'kt-canh-bao'; m.setAttribute('role', 'alertdialog'); m.setAttribute('aria-modal', 'true');
      m.innerHTML = '<div><b>Lưu ý</b><p></p><button type="button" class="nut chinh">Đã hiểu</button></div>';
      m.querySelector('p').textContent = chu; document.body.appendChild(m);
      var nut = m.querySelector('button'); nut.focus(); nut.addEventListener('click', function () { m.remove(); });
    }
    function nop(tuNop) {
      if (!kt.dang) return; thoTheoDoi();
      var dg = kt.dang, d = 0; b.kiem_tra.forEach(function (q, k) { if (dg.tra[k] === q.dap) d++; });
      var giay = Math.min(QC.kt_phut * 60, Math.round((Date.now() - dg.bd) / 1000));
      kt.lich = kt.lich || [];
      kt.lich.push({ bd: new Date(dg.bd).toISOString(), giay: giay, dung: d, tong: tongCau, roi: +dg.roi || 0, tu_nop: tuNop || '', qua_nhanh: giay < tongCau * QC.giay_moi_cau_toi_thieu, su_kien: dg.su_kien });
      kt.tra = dg.tra; kt.dung = d; kt.tot = Math.max(+kt.tot || 0, d); kt.lan = (+kt.lan || 0) + 1; kt.dat = !!kt.dat || d >= can; kt.nop = true; delete kt.dang;
      luu(); veMucLuc('kt-' + bid); veTN();
      if (window.KHOA_NHIP) window.KHOA_NHIP('nop-bai');
      sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    function veKetQua() {
      var p = diemBuoi(b), cuoi = kt.lich && kt.lich[kt.lich.length - 1], conLuot = (+kt.lan || 0) < luotToiDa();
      var lyDo = cuoi && cuoi.tu_nop === 'het-gio' ? ' · hết giờ, bài tự nộp' : '', hienDap = kt.dat || !conLuot;
      sec.innerHTML = H2 + '<div class="diem ' + (kt.dat ? 'dat' : 'chua') + '"><span class="so">' + kt.dung + '/' + tongCau + '</span><p><b>' + (kt.dat ? (canDanhGia(b.id) && K.buoi.some(function (x) { return buoiTruoc(x) === b; }) ? 'Đạt. Gửi đánh giá buổi học ở mục 05 để mở buổi tiếp theo.' : 'Đạt — đã mở buổi tiếp theo.') :'Chưa đạt — cần ' + can + '/' + tongCau + '.') + '</b><br>' +
        (cuoi ? 'Lần ' + kt.lan + '/' + luotToiDa() + ': làm trong ' + phutGiay(cuoi.giay) + ', rời trang ' + cuoi.roi + ' lần' + lyDo + '.' : '') + (kt.lan > 1 ? ' Điểm giữ lại: ' + kt.tot + '/' + tongCau + ' (cao nhất).' : '') + '</p></div>' +
        '<div class="diem-buoi"><h3>Điểm buổi ' + b.so + ': <span class="ng">' + p.tong + '</span>/100 · ' + e(p.loai) + '</h3><table class="bang-tl"><tbody>' +
        '<tr><td>Kiểm tra trắc nghiệm (điểm cao nhất)</td><td>' + p.kt + ' / 70</td></tr>' +
        '<tr><td>Chuyên cần — thời gian xem video thật các bài trong buổi</td><td>' + p.hoc + ' / 20</td></tr>' +
        '<tr><td>Câu hỏi nhanh — lần nộp đầu</td><td>' + p.hn + ' / 10</td></tr></tbody></table>' +
        (p.co.length ? '<p class="kt-co">Ghi chú cho người chấm: ' + e(p.co.join(' · ')) + '.</p>' : '') + '</div>' +
        '<div class="kt-xem-lai">' + b.kiem_tra.map(function (q, k) {
          var tl = (kt.tra || {})[k];
          return '<fieldset class="cau" data-k="' + k + '"><legend><small>Câu ' + (k + 1) + ' · ' + (tl === q.dap ? 'đúng' : typeof tl === 'number' ? 'sai' : 'chưa chọn') + '</small>' + e(q.hoi) + '</legend>' +
            q.chon.map(function (c, j) { return '<label class="' + (hienDap && j === q.dap ? 'dung' : j === tl ? (tl === q.dap ? 'dung' : 'sai') : '') + '"><input type="radio" disabled' + (j === tl ? ' checked' : '') + '><span>' + e(c) + '</span></label>'; }).join('') + '</fieldset>';
        }).join('') + '</div>' +
        (hienDap ? '' : '<p class="tom-tat">Đáp án đúng sẽ hiện khi bạn đạt hoặc đã dùng hết ' + luotToiDa() + ' lượt.</p>') +
        '<div class="hang-nut">' + (!kt.dat && conLuot ? '<button class="nut chinh" type="button" data-kt="lam-lai">Làm lại · lần ' + ((+kt.lan || 0) + 1) + '/' + luotToiDa() + '</button>' : '') +
        (!kt.dat && !conLuot ? '<p class="tom-tat thieu">Đã hết lượt làm bài. Báo người quản lý khoá học để được mở thêm lượt.</p>' : '') + '</div>';
    }
    sec.addEventListener('click', function (ev) {
      var n = ev.target.closest('[data-kt]'); if (!n) return;
      var l = n.getAttribute('data-kt');
      if (l === 'lam-lai') { veMoDau(); var ck0 = $('[data-kt=cam-ket]', sec); if (ck0) ck0.addEventListener('change', function () { $('[data-kt=bat-dau]', sec).disabled = !ck0.checked || choLai() > 0; }); sec.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
      if (l === 'bat-dau') {
        if ((+kt.lan || 0) >= luotToiDa() && !moHet()) return;
        if (choLai() > 0) return;
        var ck = $('[data-kt=cam-ket]', sec); if (ck && !ck.checked) return;
        try { var tm = document.documentElement.requestFullscreen && document.documentElement.requestFullscreen(); if (tm && tm.catch) tm.catch(function () {}); } catch (x) {}
        kt.dang = { bd: Date.now(), thu_tu: tron(tongCau), pa: b.kiem_tra.map(function (q) { return tron(q.chon.length); }), tra: {}, roi: 0, su_kien: [], cam_ket: true };
        vuaBatDau = true; luu(); veTN(); sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.KHOA_NHIP) window.KHOA_NHIP('bat-dau-thi'); // trang Quản trị thấy ngay "Đang thi"
      } else if (l === 'nop') {
        var chua = tongCau - Object.keys(kt.dang.tra).length;
        if (chua > 0 && !hoiLaiNop) { hoiLaiNop = true; $('.kt-bao', sec).textContent = 'Còn ' + chua + ' câu chưa chọn. Bấm Nộp bài lần nữa để nộp luôn.'; return; }
        nop('');
      }
    });
    veTN();
    $$('[data-tl]', main).forEach(function (t) { t.addEventListener('input', function () { tl[+t.getAttribute('data-tl')] = t.value; luu(); tomTat(); }); });
    // dán chữ vào tự luận: không chặn, chỉ ghi lại số lần để người chấm biết
    $$('[data-tl]', main).forEach(function (t) { t.addEventListener('paste', function () { kt.dan_tu_luan = (+kt.dan_tu_luan || 0) + 1; luu(); }); });
    $$('[data-ck]', main).forEach(function (c) { c.addEventListener('change', function () { ck[+c.getAttribute('data-ck')] = c.checked; luu(); tomTat(); }); });
    $$('[data-ghi]', main).forEach(function (t) { t.addEventListener('input', function () { g[t.getAttribute('data-ghi')] = t.value; luu(); tomTat(); }); });
    $$('[data-chung]', main).forEach(function (t) { t.addEventListener(t.tagName === 'SELECT' ? 'change' : 'input', function () { D.chung[t.getAttribute('data-chung')] = t.value; luu(); }); });
    function tomTat() {
      var tlx = b.tu_luan.filter(function (q, k) { return (tl[k] || '').trim().length >= 10; }).length, ckx = ck.filter(Boolean).length, daChon = Object.keys(kt.dang ? kt.dang.tra : {}).length;
      var p = $('.kt-ban .tom-tat', main); if (!p) return; // 09/11: đúng ô tóm tắt cuối trang (trước đây lấy ô .tom-tat đầu tiên — có thể là dòng nhắc trong mục trắc nghiệm)
      p.textContent = 'Đang có: trắc nghiệm ' + (kt.nop ? 'đã nộp, ' + kt.tot + '/' + b.kiem_tra.length + ' câu đúng' : kt.dang ? 'đang làm, ' + daChon + '/' + b.kiem_tra.length + ' câu đã chọn' : 'chưa làm') + ' · tự luận ' + tlx + '/' + b.tu_luan.length + ' · checklist ' + ckx + '/' + b.checklist.length + ' · bài tập ' + ((g.bai_tap || '').trim() ? 'đã ghi' : 'chưa ghi') + (window.KHOA_DANH_GIA ? ' · đánh giá buổi ' + (window.KHOA_DANH_GIA.daGui(D, b.id) ? 'đã gửi' : 'chưa gửi') : '') + '.';
      p.classList.toggle('thieu', !kt.nop || tlx < b.tu_luan.length);
    }
    tomTat();
    // 09/11: bỏ ô họ tên tự điền — tên lấy từ tài khoản Google đã đăng nhập (dang-nhap.js · datTen)
    function canTen() { if (!(D.chung.ten || '').trim()) { var mc = window.KHOA_MAY_CHU, n = mc && mc.nguoi && mc.nguoi(); D.chung.ten = (n && n.ten) || 'Người học'; } return true; }
    $('#in-bc').addEventListener('click', function () { if (!canTen()) return; $('#phieu-in').innerHTML = '<style>' + CSS_BC + '</style>' + phieu(b); document.documentElement.classList.add('in-phieu'); window.print(); });
    $('#tai-bc').addEventListener('click', function () {
      if (!canTen()) return;
      var doc = '<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Report Buổi ' + b.so + ' — ' + e(D.chung.ten) + '</title><style>:root{color-scheme:light}body{margin:0;padding:24px 16px;background:#fff}' + CSS_BC + '</style></head><body>' + phieu(b) + '</body></html>';
      var url = URL.createObjectURL(new Blob([doc], { type: 'text/html;charset=utf-8' })), a = document.createElement('a');
      a.href = url; a.download = 'report-nguyen-ly-buoi-' + b.so + '-' + khongDau(D.chung.ten) + '.html'; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
    });
    gopY = { buoi: b.gop_y_ten, muc: 'Kiểm tra cuối Buổi ' + b.so };
    if (window.KHOA_DANH_GIA) window.KHOA_DANH_GIA.ganBuoi(main, b, {
      D: D, luu: luu, nutSau: function () { return nutBuoiSau(b); }, coBuoiSau: K.buoi.some(function (x) { return buoiTruoc(x) === b; }),
      dangThi: function () { return !!kt.dang; },
      capNhat: function () { veMucLuc('kt-' + bid); tomTat(); if (kt.nop && !kt.dang) veTN(); }
    });
    document.title = 'Kiểm tra Buổi ' + b.so + ' — ' + K.ten;
  }
  function khongDau(t) { return String(t || 'nguoi-hoc').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[đĐ]/g, 'd').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  var CSS_BC = '.bc{font-family:"Be Vietnam Pro","Segoe UI",system-ui,Arial,sans-serif;color:#111;background:#fff;font-size:13px;line-height:1.5;max-width:820px;margin:0 auto}.bc h1{font-size:20px;margin:0 0 10px}.bc h2{font-size:15px;margin:20px 0 8px;border-bottom:1.5px solid #111;padding-bottom:3px}' +
    '.bc table{width:100%;border-collapse:collapse}.bc th,.bc td{border:1px solid #999;padding:4px 6px;text-align:left;vertical-align:top}.bc th{background:#eee}.bc .tt{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:10px}.bc .tt div{border:1.5px solid #111;padding:6px 10px}.bc .tt b{display:block;font-size:20px}' +
    '.bc .tl{border:1px solid #999;padding:8px 10px;margin-bottom:8px;break-inside:avoid}.bc .tra{white-space:pre-wrap;margin-top:6px}.bc .dung{color:#1F714B;font-weight:700}.bc .sai{color:#b42318;font-weight:700}.bc ul{margin:0;padding-left:0;list-style:none}' +
    '.bc .ky{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:32px;text-align:center}.bc .ky span{display:block;margin-top:56px;border-top:1px dotted #777;padding-top:4px;color:#555}@page{margin:14mm}';
  function phieu(b) {
    var kt = D.kt[b.id] || { tra: {} }, tl = D.tl[b.id] || [], ck = D.ck[b.id] || [], g = D.ghi[b.id] || {}, dung = 0;
    var n = new Date(), hai = function (x) { return ('0' + x).slice(-2); }, ngay = hai(n.getDate()) + '/' + hai(n.getMonth() + 1) + '/' + n.getFullYear() + ' ' + hai(n.getHours()) + ':' + hai(n.getMinutes());
    var dong = b.kiem_tra.map(function (q, k) { var c = kt.tra[k], d = c === q.dap; if (d) dung++; return '<tr><td>' + (k + 1) + '</td><td>' + e(q.hoi) + '</td><td>' + (typeof c === 'number' ? e(q.chon[c]) : '<i>chưa chọn</i>') + '</td><td>' + e(q.chon[q.dap]) + '</td><td class="' + (d ? 'dung">Đúng' : 'sai">Sai') + '</td></tr>'; }).join('');
    var trong = '<i style="color:#888">(chưa viết)</i>';
    return '<div class="bc"><p>' + e(K.ten) + ' · Khoá nền tảng</p><h1>Report Buổi ' + b.so + ': ' + e(b.ten) + '</h1>' +
      '<table><tr><th>Họ tên</th><td>' + e(D.chung.ten) + '</td><th>Ngày xuất</th><td>' + ngay + '</td></tr></table>' +
      '<div class="tt"><div>Trắc nghiệm<b>' + dung + '/' + b.kiem_tra.length + '</b>' + (dung >= Math.ceil(b.kiem_tra.length * .8) ? 'Đạt' : 'Chưa đạt') + '</div><div>Tự luận đã viết<b>' + b.tu_luan.filter(function (q, k) { return (tl[k] || '').trim().length >= 10; }).length + '/' + b.tu_luan.length + '</b>người hướng dẫn chấm</div><div>Checklist<b>' + ck.filter(Boolean).length + '/' + b.checklist.length + '</b>ô đã tick</div></div>' +
      '<h2>1. Bài học đã xong</h2><ul>' + b.bai.map(function (x) { return '<li>' + (baiXong(x.id) ? '☑ ' : '☐ ') + e(x.ten) + (baiXem(x.id) ? ' · đã xem video' : '') + '</li>'; }).join('') + '</ul>' +
      '<h2>2. Trắc nghiệm</h2><table><tr><th>Câu</th><th>Câu hỏi</th><th>Bạn chọn</th><th>Đáp án</th><th>Kết quả</th></tr>' + dong + '</table>' +
      '<h2>3. Tự luận</h2>' + b.tu_luan.map(function (q, k) { return '<div class="tl"><p><b>Câu ' + (k + 1) + '.</b> ' + e(q) + '</p><p class="tra">' + (tl[k] ? e(tl[k]) : trong) + '</p><p style="color:#555;margin-top:8px">Người hướng dẫn chấm: ........ · Nhận xét: ..........................................</p></div>'; }).join('') +
      '<h2>4. Checklist</h2><ul>' + b.checklist.map(function (c, k) { return '<li>' + (ck[k] ? '☑ ' : '☐ ') + e(c) + '</li>'; }).join('') + '</ul>' +
      // 09/11: chỉ còn ô "Bài tập đã làm"; ghi chép cũ (nghe / rút ra / áp dụng) vẫn in nếu đã viết
      '<h2>5. Bài tập đã làm</h2><table>' + [['nghe', 'Nghe được gì'], ['rut', 'Rút ra gì'], ['ap_dung', 'Áp dụng gì vào việc']].filter(function (k) { return (g[k[0]] || '').trim(); }).map(function (k) { return '<tr><th style="width:28%">' + k[1] + '</th><td style="white-space:pre-wrap">' + e(g[k[0]]) + '</td></tr>'; }).join('') +
      '<tr><th style="width:28%">Bài tập đã làm</th><td style="white-space:pre-wrap">' + (g.bai_tap ? e(g.bai_tap) : trong) + '</td></tr></table>' +
      '<div class="ky"><div>Người học<span>' + e(D.chung.ten) + '</span></div><div>Người hướng dẫn<span>&nbsp;</span></div></div></div>';
  }
  window.addEventListener('afterprint', function () { document.documentElement.classList.remove('in-phieu'); });
  function trangThuatNgu() {
    main.innerHTML = '<div class="trang-kt"><div><nav class="duong-dan"><a href="#/">Khoá học</a><span>›</span><span>Thuật ngữ</span></nav><header class="dau-bai"><span class="nhan">Tra cứu</span><h1>Bảng <em class="ng">thuật ngữ</em></h1><div class="meta"><span>' + K.thuat_ngu.length + ' từ hay gặp trong khoá học</span></div></header></div>' +
      '<dl class="tn">' + K.thuat_ngu.map(function (t) { return '<dt>' + e(t[0]) + '</dt><dd>' + e(t[1]) + '</dd>'; }).join('') + '</dl></div>';
    gopY = { buoi: K.buoi[0].gop_y_ten, muc: 'Thuật ngữ' };
    document.title = 'Thuật ngữ — ' + K.ten;
  }

  // trang cho máy xuất MP4: #/ghi/<bài> → window.KHUNG.khungLuc(t)
  function trangGhi(id) {
    var x = timBai(id); if (!x) return;
    document.documentElement.classList.add('ghi');
    main.innerHTML = '<div id="ghi-host"></div>';
    dang = taoTrinh($('#ghi-host'), x, 'ghi');
    window.KHUNG = $('#ghi-host')._trinh;
  }

  // ================================================================ cửa cho phần đăng nhập + đồng bộ (dang-nhap.js)
  // Không đăng nhập (bản offline, chưa cấu hình) thì cửa này không ai dùng: mọi thứ vẫn lưu trên máy như cũ.
  // gộp dữ liệu học ở máy khác vào máy này: số lấy lớn nhất, đúng/sai lấy "đã làm", chữ giữ bản đang có (trống thì lấy bản kia)
  function gop(a, b) {
    Object.keys(b || {}).forEach(function (k) {
      var x = a[k], y = b[k];
      if (x === undefined || x === null || x === '') a[k] = y;
      else if (typeof x === 'number' && typeof y === 'number') a[k] = Math.max(x, y);
      else if (typeof x === 'boolean' && typeof y === 'boolean') a[k] = x || y;
      else if (x && y && typeof x === 'object' && typeof y === 'object') gop(x, y);
    });
    return a;
  }
  // bản tóm tắt gửi kèm, để Sheet có cột đọc được ngay (không phải mở JSON)
  function tomTat() {
    var t = demTien(), giay = 0, xemHet = 0, xong = 0, bai = [];
    DS.forEach(function (x) {
      var r = D.bai[x.bai.id] || {}, v = VIDEO_BAI[x.bai.id], dai = v ? v.dai : 0;
      giay += +r.giay || 0; if (r.xem) xemHet++; if (r.xong) xong++;
      var hn = x.bai.hoi_nhanh.map(function (q, k) { var tl = D.hn[x.bai.id + '-hn' + k]; return q.loai === 'bam' ? (tl === 1 ? 1 : 0) : (tl === q.dap ? 1 : 0); });
      bai.push({ id: x.bai.id, ten: 'Bài ' + x.b.so + '.' + (x.i + 1) + ' · ' + x.bai.ten, phut_xem: Math.round((+r.giay || 0) / 6) / 10,
        da_xem_toi: dai ? Math.min(100, Math.round((+r.moc || 0) / dai * 100)) : null, xem_het: !!r.xem, hoan_thanh: !!r.xong,
        hoi_nhanh: (D.hnl[x.bai.id] && D.hnl[x.bai.id].lan1 ? D.hnl[x.bai.id].lan1.dung + '/' + D.hnl[x.bai.id].lan1.tong + ' (lần đầu)' : 'chưa nộp'), luot: +r.luot || 0,
        phut_trang: Math.round((+r.tg_trang || 0) / 6) / 10, mo_khoa: !chuaMo(x.bai.id),
        so_lan_hoc: dsLanHoc(r).length,
        lan_hoc: dsLanHoc(r).map(function (l, k) { var d = new Date(l.bd); return 'L' + (k + 1) + ' ' + hai(d.getDate()) + '/' + hai(d.getMonth() + 1) + ' ' + hai(d.getHours()) + ':' + hai(d.getMinutes()) + ' xem ' + phutGiay(l.giay) + ' (' + phut(l.tu) + '→' + phut(l.toi) + (l.het ? ', hết' : '') + ')'; }).join(' · ') });
    });
    var kt = {};
    var tongDiem = 0, soBuoi = 0;
    K.buoi.forEach(function (b) {
      var k = D.kt[b.id]; if (!k || !k.nop) { kt['Buổi ' + b.so] = k && k.dang ? 'đang làm' : ''; return; }
      var p = diemBuoi(b), lich = k.lich || [], roi = lich.reduce(function (s, l) { return s + (+l.roi || 0); }, 0), giayLam = lich.reduce(function (s, l) { return s + (+l.giay || 0); }, 0);
      tongDiem += p.tong; soBuoi++;
      if (+k.dan_tu_luan) p.co.push('dán ' + k.dan_tu_luan + ' lần vào tự luận');
      kt['Buổi ' + b.so] = p.tong + ' ' + p.loai + ' · TN ' + k.tot + '/' + b.kiem_tra.length + (k.dat ? ' đạt' : ' chưa đạt') + ' · ' + (+k.lan || 1) + ' lần · làm ' + phutGiay(giayLam) + ' · rời trang ' + roi + (p.co.length ? ' · ⚑ ' + p.co.join(', ') : '');
    });
    return { ten: D.chung.ten || '', bo_phan: D.chung.bo_phan || '', nhom: D.chung.nhom || '', tien_do: t.pct, muc_xong: t.xong + '/' + t.tong,
      diem_tb: soBuoi ? Math.round(tongDiem / soBuoi) : '', phut_trang: Math.round(DS.reduce(function (s, x) { return s + (+((D.bai[x.bai.id] || {}).tg_trang) || 0); }, 0) / 6) / 10,
      bai_xem_het: xemHet + '/' + DS.length, bai_hoan_thanh: xong + '/' + DS.length, phut_xem: Math.round(giay / 6) / 10, kiem_tra: kt, bai: bai };
  }
  function voiDuLieu(Dx, fn) {
    var cu = D; D = Dx && typeof Dx === 'object' ? Dx : {};
    ['bai', 'kt', 'tl', 'ck', 'kiem', 'ghi', 'hn', 'hnl', 'chung'].forEach(function (k) { D[k] = D[k] || {}; });
    try { return fn(); } finally { D = cu; }
  }
  // ================================================================ MÀN CHỜ dùng chung (07/11, user: "lấy data từ sheet nên hơi lâu mà motion và effect
  // loading nhìn tù, thiếu chuyên nghiệp — thiết kế lại cho smooth, mắt có điểm như đoạn phim loop để xem").
  // Điểm nhìn = lá Hecatech TỰ VẼ → đổ màu → vệt sáng lướt → tan, lặp 3,2 s, trong vòng sáng xoay + quầng thở; dưới là các bước
  // (chữ trượt lên lần lượt, bước cuối đứng yên) + thanh tiến độ chạy chậm dần. Sau lưng: khung xương đúng bố cục trang sắp hiện,
  // có dải sáng lướt đồng bộ. Toàn bộ là CSS (không hẹn giờ) → vẽ đè trang mới là xong, không phải dọn.
  var demCho = 0;
  function dauCho(lop) {
    var p = document.getElementById('hct-la-path'), d = p ? p.getAttribute('d') : '', id = 'cho-g' + (++demCho);
    return '<span class="cho-dau' + (lop ? ' ' + lop : '') + '" aria-hidden="true"><i class="cho-quang"></i><i class="cho-vong"></i>' +
      (d ? '<svg class="cho-la" viewBox="204 262 64 86"><defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="#1F714B"/><stop offset=".45" stop-color="#2E9A68"/><stop offset=".55" stop-color="#A8E8C4"/><stop offset=".65" stop-color="#2E9A68"/><stop offset="1" stop-color="#1F714B"/>' +
        '<animateTransform attributeName="gradientTransform" type="translate" values="-1 -1;1 1" dur="3.2s" repeatCount="indefinite"/></linearGradient></defs>' +
        '<path class="cho-la-nen" fill="url(#' + id + ')" d="' + d + '"/><path class="cho-la-vien" pathLength="1" d="' + d + '"/></svg>' : '') + '</span>';
  }
  var XUONG = {
    'qt-tong': function () {
      var hang = function (n, lop) { var s = ''; for (var i = 0; i < n; i++) s += '<i class="xg ' + lop + '"></i>'; return s; };
      return '<div class="cho-xuong" aria-hidden="true"><i class="xg xg-nhan"></i><i class="xg xg-tieu"></i><i class="xg xg-meta"></i>' +
        '<div class="xg-luoi">' + hang(5, 'xg-the') + '</div><i class="xg xg-khoi"></i><div class="xg-loc">' + hang(4, 'xg-o') + '</div>' +
        '<div class="xg-bang">' + hang(7, 'xg-dong') + '</div></div>';
    },
    'qt-nguoi': function () {
      return '<div class="cho-xuong" aria-hidden="true"><i class="xg xg-nho"></i><i class="xg xg-tieu"></i><i class="xg xg-meta"></i>' +
        '<div class="xg-luoi">' + '<i class="xg xg-the"></i><i class="xg xg-the"></i><i class="xg xg-the"></i>' + '</div><i class="xg xg-khoi"></i><i class="xg xg-khoi xg-cao"></i></div>';
    },
    'o': function () { return '<div class="cho-xuong cho-xuong-o" aria-hidden="true"><div class="xg-luoi xg-hai"><i class="xg xg-the xg-cao"></i><i class="xg xg-the xg-cao"></i></div><i class="xg xg-khoi"></i></div>'; }
  };
  // cho({ tieu, buoc: [...], nhip: giây mỗi bước, khung: 'qt-tong' | 'qt-nguoi' | 'o', co: 'to' | 'vua' }) → HTML
  function cho(o) {
    o = o || {};
    var buoc = o.buoc && o.buoc.length ? o.buoc : ['Đang tải…'], T = o.nhip || 1.9;
    return '<div class="cho cho-' + (o.co || 'to') + (o.khung ? ' cho-co-xuong' : '') + '" role="status" aria-live="polite" aria-label="' + e(o.tieu || buoc[0]) + '">' +
      (o.khung && XUONG[o.khung] ? XUONG[o.khung]() : '') +
      '<div class="cho-the">' + dauCho() + (o.tieu ? '<b class="cho-tieu">' + e(o.tieu) + '</b>' : '') +
        '<span class="cho-chu" aria-hidden="true">' + buoc.map(function (b, i) {
          return '<span class="' + (i === buoc.length - 1 ? 'cuoi' : '') + '" style="animation-delay:' + (i * T).toFixed(2) + 's;animation-duration:' + T + 's">' + e(b) + '</span>';
        }).join('') + '</span>' +
        '<span class="cho-thanh" aria-hidden="true"><i style="animation-duration:' + Math.max(6, buoc.length * T * 1.6).toFixed(1) + 's"></i></span></div></div>';
  }

  window.KHOA_APP = {
    cho: cho, dauCho: dauCho,
    duLieu: function () { return D; },
    luu: luu, // 09/11: danh-gia.js lưu đánh giá / báo chỗ chưa ổn vào bài làm (đồng bộ máy chủ như tiến độ)
    tomTat: tomTat,
    // trang quản trị (quan-tri.js): tóm tắt + điểm từng buổi trên bài làm tải từ máy chủ; dùng chung khoá học, công thức điểm, quy chế
    tomTatCua: function (Dx) { return voiDuLieu(Dx, tomTat); },
    diemCua: function (Dx, bid) { return voiDuLieu(Dx, function () { var b = timBuoi(bid); return b ? diemBuoi(b) : null; }); },
    khoa: K, ds: DS, qc: QC, video: VIDEO_BAI, e: e, nghieng: nghieng, phutGiay: phutGiay, phut: phut, dsLanHoc: dsLanHoc, veLai: function () { dinhTuyen(); },
    // nhịp hoạt động (dang-nhap.js gửi máy chủ mỗi 60 giây): đang ở trang nào, đang làm gì — để trang Quản trị xem trực tiếp
    hoatDong: function () {
      var h = (location.hash || '#/').slice(1) || '/', m, o = { ma: h, trang: 'Trang khoá học', viec: 'doc', chi_tiet: '', tien_do: demTien().pct };
      if ((m = h.match(/^\/bai\/([\w-]+)/))) {
        var x = timBai(m[1]); if (x) o.trang = 'Bài ' + x.b.so + '.' + (x.i + 1) + ' · ' + x.bai.ten;
        var v = document.querySelector('.trinh-video video');
        if (v && !v.paused && !v.ended) { o.viec = 'xem-video'; o.chi_tiet = 'đang xem ' + phut(v.currentTime || 0) + ' / ' + phut(v.duration || (VIDEO_BAI[m[1]] || {}).dai || 0); }
        else if (v && v.currentTime > 0) o.chi_tiet = 'video dừng ở ' + phut(v.currentTime);
      } else if ((m = h.match(/^\/kiem-tra\/(\w+)/))) {
        var b = timBuoi(m[1]), k = D.kt[m[1]]; o.trang = 'Kiểm tra Buổi ' + (b ? b.so : '?');
        if (b && k && k.dang) {
          var con = Math.max(0, QC.kt_phut * 60 - Math.round((Date.now() - k.dang.bd) / 1000));
          o.viec = 'dang-thi'; o.chi_tiet = 'lần ' + ((+k.lan || 0) + 1) + ' · đã chọn ' + Object.keys(k.dang.tra || {}).length + '/' + b.kiem_tra.length + ' câu · còn ' + phutGiay(con) + (k.dang.roi ? ' · rời trang ' + k.dang.roi + ' lần' : '');
        } else if (b && k && k.nop) o.chi_tiet = 'đã nộp · ' + (k.tot || 0) + '/' + b.kiem_tra.length + ' câu' + (k.dat ? ' · đạt' : ' · chưa đạt');
      } else if (h === '/thuat-ngu') o.trang = 'Bảng thuật ngữ';
      else if (h === '/gop-y-chung') o.trang = 'Góp ý chung';
      else if (/^\/quan-tri/.test(h)) o.trang = 'Trang Quản trị';
      else if (/^\/ghi\//.test(h)) o.trang = 'Ghi chép buổi học';
      return o;
    },
    // dữ liệu tải về từ máy chủ sau khi đăng nhập: gộp, lưu, vẽ lại trang đang mở
    ganDuLieu: function (moi) { if (moi && typeof moi === 'object') { gop(D, moi); ['bai', 'kt', 'tl', 'ck', 'kiem', 'ghi', 'hn', 'hnl', 'chung'].forEach(function (k) { D[k] = D[k] || {}; }); luu(); dinhTuyen(); } },
    datTen: function (ten) { if (ten && !D.chung.ten) { D.chung.ten = ten; luu(); } }
  };

  // ================================================================ điều hướng
  function dinhTuyen() {
    huyTrinh();
    if (demTrang) { clearInterval(demTrang); demTrang = 0; luu(); }
    if (donKT) { var d0 = donKT; donKT = null; d0(); }
    var h = (location.hash || '#/').slice(1), m, dangO = 'tong';
    if ((m = h.match(/^\/ghi\/([\w-]+)/))) { trangGhi(m[1]); return; }
    if ((m = h.match(/^\/quan-tri(?:\/(.+))?$/)) && window.KHOA_QUAN_TRI) { window.KHOA_QUAN_TRI(main, m[1] ? decodeURIComponent(m[1]) : ''); veMucLuc('qt'); document.documentElement.classList.remove('mo-muc'); window.scrollTo(0, 0); return; }
    if ((m = h.match(/^\/bai\/([\w-]+)/))) { trangBai(m[1]); dangO = m[1]; }
    else if ((m = h.match(/^\/kiem-tra\/(\w+)/))) { trangKiemTra(m[1]); dangO = 'kt-' + m[1]; }
    else if (h === '/thuat-ngu') { trangThuatNgu(); dangO = 'tn'; }
    else if (h === '/gop-y-chung' && window.KHOA_DANH_GIA) { window.KHOA_DANH_GIA.trangChung(main); dangO = 'gy'; } // 09/11: góp ý chung về các buổi đào tạo từ trước tới giờ
    else trangTong();
    veMucLuc(dangO);
    document.documentElement.classList.remove('mo-muc'); nutMenu.setAttribute('aria-expanded', 'false');
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }
  window.addEventListener('hashchange', dinhTuyen);
  dinhTuyen();
})();
