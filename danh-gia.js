// ĐÁNH GIÁ BUỔI HỌC + BÁO CHỖ CHƯA ỔN + BÁO CÁO QUẢN TRỊ (09/11/2026).
// User: "cần góp ý chuyên về buổi đào tạo, kiến thức, chuyên môn, giá trị… để cho lên web làm report luôn";
//       "cần khai thác chê nhiều hơn xem họ chê gì, nói gì về mình, nhận thức như nào về mình để mình cải thiện. thu thập insight của họ";
//       "làm gắn tên" (câu trả lời gắn với tài khoản đăng nhập; trang học không nhắc gì tới tên — và KHÔNG hứa ẩn danh).
// - Cuối mỗi buổi (trang kiểm tra, mục 05): 9 câu, 5 câu bắt buộc. Gửi xong mới mở buổi sau (ung-dung.js · chuaMo).
// - 7 ngày sau khi gửi: thẻ nhỏ góc trái hỏi lại "đã dùng được gì, vướng ở đâu" (để sau = hỏi lại sau 1 ngày).
// - Nút "Góp ý" trên đầu trang: hộp Báo chỗ chưa ổn (thay Google Form 28/10), tự ghi trang đang xem.
// Dữ liệu nằm trong bài làm (D.dg, D.bao) → đồng bộ như tiến độ; máy chủ bản 7 chép ra trang tính "Đánh giá buổi học", "Báo chỗ chưa ổn".
// - #/quan-tri/danh-gia: báo cáo cho quản trị (có tên người), lọc theo buổi, Agent gom ý kiến thành chủ đề, in / xuất Excel.
// Nạp TRƯỚC ung-dung.js (ung-dung cần biết có mô-đun này để khoá buổi sau); mọi chỗ dùng KHOA_APP / KHOA_MAY_CHU đều gọi lúc chạy.
(function () {
  'use strict';
  var K = window.KHOA; if (!K) return;
  var APP = function () { return window.KHOA_APP; };
  var MC = function () { return window.KHOA_MAY_CHU; };
  var e = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var hai = function (n) { return ('0' + n).slice(-2); };
  function ngayGio(s) { var d = s ? new Date(String(s).replace(/^(\d{4}-\d\d-\d\d) /, '$1T')) : null; return d && !isNaN(d) ? hai(d.getDate()) + '/' + hai(d.getMonth() + 1) + ' ' + hai(d.getHours()) + ':' + hai(d.getMinutes()) : String(s || ''); }

  var SUA = ['Khó hiểu', 'Không dùng được vào việc của mình', 'Dài, lan man', 'Thiếu ví dụ thật', 'Video, giọng đọc', 'Bài kiểm tra', 'Web khó dùng', 'Khác'];
  var GIA_TRI = ['Phí hơn', 'Ngang nhau', 'Đáng hơn'];
  var AI = ['Công cụ giúp mình làm nhanh hơn', 'Thêm việc phải học', 'Điều mình còn lo', 'Chưa rõ'];
  var DUNG = ['Đã dùng và có kết quả', 'Đã thử nhưng chưa được', 'Chưa dùng'];
  var LOAI_BAO = ['Nội dung sai', 'Khó hiểu', 'Video, giọng đọc', 'Lỗi trang web', 'Ý tưởng thêm'];
  var KHONG_PHI = 'Không có đoạn nào';
  // góp ý chung (09/11, user: "đấy là đóng góp từng bài, thêm cả đóng góp chung từ trước đến giờ vì đã đào tạo nhiều buổi rồi mà")
  var BUOI_CU = ['Làm video bán hàng (19/10)', 'Sửa hook trên bản 1.0 (20/10)', 'Cắt video Livestream (21/10)', 'Sửa video bằng trình sửa (31/10)', 'Xưởng video (02/11)', 'Khoá học trên web này', 'Buổi khác'];
  var VUONG = ['Chưa hiểu đủ để tự làm', 'Máy yếu, công cụ hay lỗi', 'Không có thời gian trong giờ làm', 'Không hợp việc của mình', 'Cần người kèm khi làm', 'Kết quả chưa tốt nên ngại dùng', 'Không vướng gì', 'Khác'];
  var CACH_HOC = ['Học trực tiếp có người hướng dẫn', 'Xem video tự học', 'Làm bài tập trên việc thật', 'Có người kèm 1-1', 'Tài liệu đọc nhanh 1 trang'];
  var NGAY_HOI_LAI = 7;
  var tenBai = function (b, i, bai) { return 'Bài ' + b.so + '.' + (i + 1) + ' · ' + String(bai.ten || '').trim(); };
  var timBuoi = function (id) { return K.buoi.filter(function (b) { return b.id === id; })[0]; };

  function daGui(D, bid) { return !!(D && D.dg && D.dg[bid] && D.dg[bid].sau); }
  function chip(ten, gt, chon, them) { return '<label class="dg-chip"><input type="radio" name="' + ten + '" value="' + e(gt) + '"' + (chon === gt ? ' checked' : '') + (them || '') + '><span>' + e(gt) + '</span></label>'; }
  function cau(so, bat, hoi, than, ghi) {
    return '<fieldset class="dg-cau" data-cau="' + so + '"><legend><small>Câu ' + so + (bat ? ' · bắt buộc' : '') + '</small>' + hoi + '</legend>' + (ghi ? '<p class="dg-ghi">' + ghi + '</p>' : '') + than + '</fieldset>';
  }

  // ================================================================ 1. mục 05 trang kiểm tra cuối buổi
  // ctx (ung-dung.js · trangKiemTra): { D, luu, dangThi(): đang làm trắc nghiệm?, nutSau(): HTML nút sang buổi sau, coBuoiSau, capNhat() }
  function mucBuoi(b) {
    return '<section id="dg-buoi" class="dg-muc"><h2><span class="so-muc">05</span>Đánh giá buổi học</h2><div class="dg-than"></div></section>';
  }
  function ganBuoi(main, b, ctx) {
    var sec = $('#dg-buoi', main); if (!sec) return;
    var than = $('.dg-than', sec), D = ctx.D;
    D.dg = D.dg || {}; D.dg_nhap = D.dg_nhap || {};
    var sua = false;
    function ve() {
      var x = D.dg[b.id];
      if (x && x.sau && !sua) return veXong(x);
      veForm(D.dg_nhap[b.id] || (x && x.sau ? JSON.parse(JSON.stringify(x.sau)) : {}));
    }
    function veXong(x) {
      var s = x.sau, w = x.tuan;
      than.innerHTML = '<div class="dg-xong"><span class="dg-xong-dau" aria-hidden="true">✓</span><div><b>Đã gửi đánh giá Buổi ' + b.so + '</b>' +
        '<p>Lúc ' + e(ngayGio(s.sua_luc || s.luc)) + '. Cảm ơn bạn đã góp ý thẳng — người làm khoá học sẽ đọc và sửa theo những điều bạn chỉ ra.' +
        (w ? ' Bạn cũng đã trả lời phần hỏi lại sau ' + NGAY_HOI_LAI + ' ngày.' : ' Khoảng ' + NGAY_HOI_LAI + ' ngày nữa, web sẽ hỏi lại bạn đã dùng được gì từ buổi này.') + '</p></div></div>' +
        (daGuiChung(D) ? '' : '<div class="dg-chung-the"><div><small>Góp ý chung · khoảng 4 phút</small><b>Còn các buổi đào tạo trước đó thì sao?</b><p>Góp ý chung về tất cả các buổi bạn đã học, trực tiếp hoặc trên web.</p></div><a class="nut" href="#/gop-y-chung">Góp ý chung →</a></div>') +
        '<div class="hang-nut">' + ctx.nutSau() + '<button class="nut" type="button" data-dg="sua">Sửa đánh giá</button></div>';
      $('[data-dg=sua]', than).addEventListener('click', function () { sua = true; ve(); sec.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    }
    function veForm(n) {
      var tt = n.tu_tin || [], ttCua = function (id) { return tt.filter(function (k) { return k.id === id; })[0] || {}; };
      var nut15 = function (ten, chon) { var s = ''; for (var i = 1; i <= 5; i++) s += '<label><input type="radio" name="' + ten + '" value="' + i + '"' + (+chon === i ? ' checked' : '') + '><span>' + i + '</span></label>'; return '<span class="dg-thang" role="radiogroup">' + s + '</span>'; };
      var phiDs = [KHONG_PHI].concat(b.bai.map(function (bai, i) { return tenBai(b, i, bai); }), ['Kiểm tra cuối buổi']);
      than.innerHTML = '<p class="phu">Khoảng 3 phút. Góp ý càng thẳng, buổi sau càng sát việc của bạn' + (ctx.coBuoiSau ? '. Gửi đánh giá để mở buổi tiếp theo.' : '.') + '</p>' +
        '<form class="dg-form" novalidate>' +
        cau(1, true, 'Nếu được sửa đúng 1 thứ của buổi này, bạn sửa gì?',
          '<div class="dg-chips">' + SUA.map(function (s) { return chip('dg-sua', s, n.sua); }).join('') + '</div>' +
          '<textarea rows="2" data-o="sua_chu" placeholder="Sửa thế nào, ở chỗ nào? Viết 1–2 câu.">' + e(n.sua_chu || '') + '</textarea>') +
        cau(2, false, 'Đoạn nào bạn thấy phí thời gian, hoặc suýt bỏ ngang?',
          '<select data-o="phi_bai">' + phiDs.map(function (p) { return '<option' + (n.phi_bai === p ? ' selected' : '') + '>' + e(p) + '</option>'; }).join('') + '</select>' +
          '<textarea rows="2" data-o="phi_chu" placeholder="Vì sao? (không bắt buộc)">' + e(n.phi_chu || '') + '</textarea>') +
        cau(3, true, 'So với 1 giờ làm việc bình thường, 1 giờ học buổi này…',
          '<div class="dg-chips">' + GIA_TRI.map(function (s) { return chip('dg-gia_tri', s, n.gia_tri); }).join('') + '</div>') +
        cau(4, false, 'Điều gì buổi này nói mà bạn thấy không đúng với thực tế công việc?',
          '<textarea rows="2" data-o="khong_dung" placeholder="Ví dụ: bài nói…, nhưng thực tế mình thường gặp… (không có thì để trống)">' + e(n.khong_dung || '') + '</textarea>') +
        cau(5, true, 'Bạn tự tin làm được những việc này ở mức nào?',
          '<div class="dg-tt">' + b.bai.map(function (bai, i) {
            var k = ttCua(bai.id);
            return '<div class="dg-tt-dong" data-tt="' + e(bai.id) + '"><p><small>Bài ' + b.so + '.' + (i + 1) + '</small>' + e(bai.ky_nang || bai.ten) + '</p>' +
              '<div><span class="dg-tt-nhan">Trước buổi</span>' + nut15('dg-tt-' + bai.id + '-truoc', k.truoc) + '</div>' +
              '<div><span class="dg-tt-nhan">Sau buổi</span>' + nut15('dg-tt-' + bai.id + '-sau', k.sau) + '</div></div>';
          }).join('') + '</div>', '1 = chưa làm được · 3 = làm được khi có người chỉ · 5 = tự làm tốt') +
        cau(6, true, 'Ba từ bạn dùng để tả khoá học này?',
          '<input type="text" data-o="ba_tu" maxlength="120" placeholder="Ví dụ: thực tế, hơi dài, dễ hiểu" value="' + e(n.ba_tu || '') + '">') +
        cau(7, false, 'Một đồng nghiệp hỏi “khoá này có đáng học không?”, bạn trả lời thật thế nào?',
          '<textarea rows="2" data-o="dong_nghiep" placeholder="Viết như đang nhắn cho đồng nghiệp.">' + e(n.dong_nghiep || '') + '</textarea>') +
        cau(8, false, 'Bạn muốn người làm khoá học làm khác đi điều gì?',
          '<textarea rows="2" data-o="lam_khac" placeholder="Cách giảng, độ dài, ví dụ, cách hỗ trợ…">' + e(n.lam_khac || '') + '</textarea>') +
        cau(9, false, 'Học xong, AI với bạn là…',
          '<div class="dg-chips">' + AI.map(function (s) { return chip('dg-ai', s, n.ai); }).join('') + '</div>') +
        '<p class="dg-bao tom-tat" aria-live="polite"></p>' +
        '<div class="hang-nut"><button class="nut chinh to" type="submit">' + (D.dg[b.id] && D.dg[b.id].sau ? 'Gửi lại đánh giá' : 'Gửi đánh giá') + '</button>' +
        (sua ? '<button class="nut" type="button" data-dg="huy">Huỷ sửa</button>' : '') + '</div></form>';
      var f = $('form', than);
      function doc() {
        var o = {};
        $$('[data-o]', f).forEach(function (t) { o[t.getAttribute('data-o')] = t.value; });
        ['sua', 'gia_tri', 'ai'].forEach(function (k) { var r = $('input[name="dg-' + k + '"]:checked', f); if (r) o[k] = r.value; });
        o.tu_tin = b.bai.map(function (bai, i) {
          var t = $('input[name="dg-tt-' + bai.id + '-truoc"]:checked', f), s = $('input[name="dg-tt-' + bai.id + '-sau"]:checked', f);
          return { id: bai.id, ma: b.so + '.' + (i + 1), truoc: t ? +t.value : 0, sau: s ? +s.value : 0 };
        });
        return o;
      }
      var hen = 0;
      f.addEventListener('input', function () { clearTimeout(hen); hen = setTimeout(function () { D.dg_nhap[b.id] = doc(); ctx.luu(); }, 600); });
      f.addEventListener('change', function (ev) { if (ev.target.matches('input[type=radio]')) { D.dg_nhap[b.id] = doc(); ctx.luu(); $$('.dg-cau.thieu', f).forEach(function (c) { if (!thieuCau(c, doc())) c.classList.remove('thieu'); }); } });
      var huy = $('[data-dg=huy]', f); if (huy) huy.addEventListener('click', function () { sua = false; delete D.dg_nhap[b.id]; ctx.luu(); ve(); });
      function thieuCau(c, o) {
        var so = +c.getAttribute('data-cau');
        if (so === 1) return !o.sua || (o.sua_chu || '').trim().length < 8;
        if (so === 3) return !o.gia_tri;
        if (so === 5) return o.tu_tin.some(function (k) { return !k.truoc || !k.sau; });
        if (so === 6) return (o.ba_tu || '').trim().length < 3;
        return false;
      }
      f.addEventListener('submit', function (ev) {
        ev.preventDefault(); clearTimeout(hen); // bản nháp hẹn lưu sau 600 ms không được ghi đè lại sau khi gửi
        var bao = $('.dg-bao', f), o = doc();
        if (ctx.dangThi()) { bao.textContent = 'Bạn đang làm trắc nghiệm — nộp bài xong rồi gửi đánh giá.'; bao.classList.add('thieu'); return; }
        var thieu = $$('.dg-cau', f).filter(function (c) { var t = thieuCau(c, o); c.classList.toggle('thieu', t); return t; });
        if (thieu.length) {
          var so = thieu.map(function (c) { return c.getAttribute('data-cau'); });
          bao.textContent = 'Còn thiếu câu ' + so.join(', ') + (so.indexOf('1') >= 0 && o.sua && (o.sua_chu || '').trim().length < 8 ? ' (câu 1: viết thêm sửa thế nào, ở chỗ nào)' : '') + '.';
          bao.classList.add('thieu'); thieu[0].scrollIntoView({ behavior: 'smooth', block: 'center' }); return;
        }
        var cu = D.dg[b.id] || {}, bay = new Date().toISOString();
        o.phi_bai = o.phi_bai || KHONG_PHI;
        o.luc = cu.sau && cu.sau.luc ? cu.sau.luc : bay; if (cu.sau) o.sua_luc = bay;
        D.dg[b.id] = Object.assign({}, cu, { so: b.so, ten: b.ten, sau: o });
        delete D.dg_nhap[b.id]; sua = false; ctx.luu();
        ve(); ctx.capNhat(); sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
    ve();
    if (/\/danh-gia$/.test(location.hash)) setTimeout(function () { sec.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 150);
  }

  // ================================================================ 2. hỏi lại sau 7 ngày (thẻ góc trái)
  var theTuan = null;
  function canHoiLai(D) {
    var bay = Date.now();
    return Object.keys((D && D.dg) || {}).filter(function (bid) {
      var x = D.dg[bid]; if (!x || !x.sau || x.tuan) return false;
      var luc = new Date(x.sau.luc).getTime(); if (!luc || bay - luc < NGAY_HOI_LAI * 864e5) return false;
      return !(x.hoan && bay < x.hoan);
    }).sort(function (a, b) { return new Date(D.dg[a].sau.luc) - new Date(D.dg[b].sau.luc); })[0];
  }
  function dangThiDau(D) { return Object.keys((D && D.kt) || {}).some(function (k) { return D.kt[k] && D.kt[k].dang; }); }
  function xemHoiLai() {
    var A = APP(), mc = MC(); if (!A || !mc || !mc.daVao || !mc.daVao()) return;
    // không hiện ở trang bài học (đang xem video — thẻ đè lên thanh điều khiển) và trang Quản trị; hiện ở trang khoá học, kiểm tra, thuật ngữ
    if (/^#\/(quan-tri|bai\/)/.test(location.hash) || document.documentElement.classList.contains('chua-dang-nhap')) { dongTuan(); return; }
    var D = A.duLieu(); if (dangThiDau(D)) { dongTuan(); return; }
    var bid = canHoiLai(D), b = bid && timBuoi(bid);
    if (!b) { // không có buổi đến hạn hỏi lại → mời góp ý chung (người đã xong ít nhất 1 bài, chưa gửi, không đang hẹn để sau)
      var daHoc = Object.keys(D.bai || {}).some(function (k) { return D.bai[k] && D.bai[k].xong; });
      // trang khoá học đã có thẻ mời ngay dưới phần mở đầu, trang kiểm tra có lời mời sau khi gửi đánh giá → thẻ nổi chỉ ở các trang còn lại
      var trangChu = /^#?\/?$/.test(location.hash);
      if (daHoc && !trangChu && !daGuiChung(D) && !(D.dg_chung_hoan && Date.now() < D.dg_chung_hoan) && !/^#\/(gop-y-chung|kiem-tra)/.test(location.hash)) moiChung(D, A); else dongTuan();
      return;
    }
    if (theTuan && theTuan.getAttribute('data-buoi') === bid) return;
    dongTuan();
    var x = D.dg[bid];
    theTuan = document.createElement('div'); theTuan.className = 'dg-tuan'; theTuan.setAttribute('role', 'dialog'); theTuan.setAttribute('aria-label', 'Hỏi lại sau ' + NGAY_HOI_LAI + ' ngày'); theTuan.setAttribute('data-buoi', bid);
    theTuan.innerHTML = '<button type="button" class="dg-tuan-dong" data-t="sau" aria-label="Để sau">×</button>' +
      '<small>Hỏi lại sau ' + NGAY_HOI_LAI + ' ngày · Buổi ' + b.so + '</small>' +
      '<b>Tuần qua bạn đã dùng gì từ buổi “' + e(b.ten) + '”?</b>' +
      '<div class="dg-chips">' + DUNG.map(function (s) { return chip('dg-dung', s, ''); }).join('') + '</div>' +
      '<textarea rows="2" data-t="dung_gi" placeholder="Đã dùng gì, kết quả ra sao? (không bắt buộc)"></textarea>' +
      '<textarea rows="2" data-t="vuong" placeholder="Vướng ở đâu? Cần hỗ trợ gì?"></textarea>' +
      '<p class="dg-bao" aria-live="polite"></p>' +
      '<div class="hang-nut"><button class="nut chinh" type="button" data-t="gui">Gửi</button><button class="nut" type="button" data-t="sau">Để mai</button></div>';
    document.body.appendChild(theTuan);
    requestAnimationFrame(function () { if (theTuan) theTuan.classList.add('hien'); });
    theTuan.addEventListener('click', function (ev) {
      var n = ev.target.closest('[data-t]'); if (!n || n.tagName === 'TEXTAREA') return;
      var l = n.getAttribute('data-t');
      if (l === 'sau') { x.hoan = Date.now() + 864e5; A.luu(); dongTuan(); return; }
      if (l === 'gui') {
        var r = $('input[name="dg-dung"]:checked', theTuan);
        if (!r) { var bao = $('.dg-bao', theTuan); bao.textContent = 'Chọn một ý ở trên trước đã.'; return; }
        x.tuan = { luc: new Date().toISOString(), dung: r.value, dung_gi: $('[data-t=dung_gi]', theTuan).value.trim(), vuong: $('[data-t=vuong]', theTuan).value.trim() };
        delete x.hoan; A.luu();
        theTuan.innerHTML = '<small>Hỏi lại sau ' + NGAY_HOI_LAI + ' ngày · Buổi ' + b.so + '</small><b>Đã gửi. Cảm ơn bạn!</b>';
        setTimeout(function () { dongTuan(); setTimeout(xemHoiLai, 800); }, 1800);
      }
    });
  }
  function moiChung(D, A) {
    if (theTuan && theTuan.getAttribute('data-buoi') === 'chung') return;
    dongTuan();
    theTuan = document.createElement('div'); theTuan.className = 'dg-tuan'; theTuan.setAttribute('role', 'dialog'); theTuan.setAttribute('aria-label', 'Góp ý chung'); theTuan.setAttribute('data-buoi', 'chung');
    theTuan.innerHTML = '<button type="button" class="dg-tuan-dong" data-t="sau" aria-label="Để sau">×</button><small>Góp ý chung · khoảng 4 phút</small>' +
      '<b>Bạn đã học nhiều buổi đào tạo rồi — điều gì giúp được việc, điều gì chưa?</b><p class="dg-ghi">Nói thẳng để các buổi sau sát việc của bạn hơn.</p>' +
      '<div class="hang-nut"><a class="nut chinh" href="#/gop-y-chung" data-t="di">Góp ý ngay</a><button class="nut" type="button" data-t="sau">Để sau</button></div>';
    document.body.appendChild(theTuan);
    requestAnimationFrame(function () { if (theTuan) theTuan.classList.add('hien'); });
    theTuan.addEventListener('click', function (ev) {
      var n = ev.target.closest('[data-t]'); if (!n) return;
      if (n.getAttribute('data-t') === 'sau') { D.dg_chung_hoan = Date.now() + 2 * 864e5; A.luu(); }
      dongTuan();
    });
  }
  function dongTuan() { if (theTuan) { var t = theTuan; theTuan = null; t.classList.remove('hien'); setTimeout(function () { t.remove(); }, 260); } }
  window.addEventListener('hashchange', function () { setTimeout(xemHoiLai, 1500); });
  setInterval(xemHoiLai, 60000);
  setTimeout(xemHoiLai, 4000);

  // ================================================================ 3. hộp "Báo chỗ chưa ổn" (nút Góp ý trên đầu trang)
  var hop = null;
  function moBao() {
    var A = APP(); if (!A) return;
    if (hop) { dongBao(); return; }
    var trangDang = (A.hoatDong && A.hoatDong().trang) || 'Trang khoá học';
    hop = document.createElement('div'); hop.className = 'dg-hop-nen';
    hop.innerHTML = '<div class="dg-hop" role="dialog" aria-modal="true" aria-labelledby="dg-hop-tieu">' +
      '<button type="button" class="dg-tuan-dong" data-h="dong" aria-label="Đóng">×</button>' +
      '<h2 id="dg-hop-tieu">Báo chỗ chưa ổn</h2>' +
      '<p class="dg-ghi">Bạn đang ở: <b>' + e(trangDang) + '</b></p>' +
      '<div class="dg-chips">' + LOAI_BAO.map(function (s) { return chip('dg-loai', s, ''); }).join('') + '</div>' +
      '<textarea rows="4" data-h="chu" placeholder="Chỗ nào chưa ổn, chưa ổn thế nào? Muốn sửa thành gì?"></textarea>' +
      '<p class="dg-bao" aria-live="polite"></p>' +
      '<div class="hang-nut"><button class="nut chinh" type="button" data-h="gui">Gửi</button><button class="nut" type="button" data-h="dong">Huỷ</button></div>' +
      '<p class="dg-ghi">Muốn góp ý về cả chương trình đào tạo từ trước tới giờ? <a href="#/gop-y-chung" data-h="dong">Mở Góp ý chung →</a></p></div>';
    document.body.appendChild(hop);
    requestAnimationFrame(function () { if (hop) hop.classList.add('hien'); });
    var o = $('[data-h=chu]', hop); setTimeout(function () { var r = $('input[name="dg-loai"]', hop); if (r) r.focus(); }, 60);
    hop.addEventListener('click', function (ev) {
      if (ev.target === hop) { dongBao(); return; }
      var n = ev.target.closest('[data-h]'); if (!n || n === o) return;
      var l = n.getAttribute('data-h');
      if (l === 'dong') { dongBao(); return; }
      if (l === 'gui') {
        var r = $('input[name="dg-loai"]:checked', hop), bao = $('.dg-bao', hop), chu = o.value.trim();
        if (!r || chu.length < 6) { bao.textContent = !r ? 'Chọn loại góp ý trước đã.' : 'Viết rõ hơn một chút để người làm khoá sửa đúng chỗ.'; return; }
        var D = A.duLieu(); D.bao = D.bao || {};
        var ma = 'b' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
        D.bao[ma] = { luc: new Date().toISOString(), trang: trangDang, loai: r.value, chu: chu.slice(0, 2000) };
        var ds = Object.keys(D.bao).sort(function (a, b) { return String(D.bao[a].luc).localeCompare(String(D.bao[b].luc)); });
        while (ds.length > 40) delete D.bao[ds.shift()]; // máy chủ đã chép ra trang tính; trên máy chỉ giữ 40 lần gần nhất
        A.luu();
        $('.dg-hop', hop).innerHTML = '<h2>Đã gửi</h2><p>Cảm ơn bạn. Người làm khoá học sẽ xem và sửa.</p><div class="hang-nut"><button class="nut chinh" type="button" data-h="dong">Đóng</button></div>';
        setTimeout(dongBao, 2600);
      }
    });
    hop.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') dongBao(); });
  }
  function dongBao() { if (hop) { var h = hop; hop = null; h.classList.remove('hien'); setTimeout(function () { h.remove(); }, 220); var n = document.getElementById('nut-gop-y'); if (n) n.focus(); } }

  // ================================================================ 3b. GÓP Ý CHUNG về các buổi đào tạo từ trước tới giờ  #/gop-y-chung
  // Không khoá bài nào; mời ở trang khoá học (thẻ dưới phần mở đầu), thẻ nhắc góc trái (để sau = 2 ngày) và trong hộp Báo chỗ chưa ổn.
  function chipNhieu(ten, gt, ds) { return '<label class="dg-chip"><input type="checkbox" name="' + ten + '" value="' + e(gt) + '"' + ((ds || []).indexOf(gt) >= 0 ? ' checked' : '') + '><span>' + e(gt) + '</span></label>'; }
  function daGuiChung(D) { return !!(D && D.dg_chung && D.dg_chung.luc); }
  var suaChung = false;
  function trangChung(main) {
    var A = APP(), D = A.duLieu(), x = D.dg_chung;
    document.title = 'Góp ý chung · ' + K.ten;
    var dau = '<nav class="duong-dan" aria-label="Đang ở"><a href="#/">Khoá học</a><span>›</span><span>Góp ý chung</span></nav>' +
      '<header class="dau-bai"><span class="nhan">Góp ý chung · khoảng 4 phút</span><h1>Các buổi đào tạo <em class="ng">từ trước tới giờ</em></h1>' +
      '<p class="phu">Từ buổi đầu tiên tới khoá học trên web này, điều gì đã giúp được việc của bạn, điều gì chưa? Nói thẳng — người làm đào tạo đọc từng câu để sửa các buổi sau.</p></header>';
    if (x && x.luc && !suaChung) {
      main.innerHTML = '<div class="trang-kt dg-trang-chung">' + dau + '<div class="dg-xong"><span class="dg-xong-dau" aria-hidden="true">✓</span><div><b>Đã gửi góp ý chung</b><p>Lúc ' + e(ngayGio(x.sua_luc || x.luc)) + '. Cảm ơn bạn đã nói thẳng.</p></div></div>' +
        '<div class="hang-nut"><a class="nut chinh" href="#/">Về trang khoá học</a><button class="nut" type="button" data-c="sua">Sửa góp ý</button></div></div>';
      $('[data-c=sua]', main).addEventListener('click', function () { suaChung = true; trangChung(main); });
      return;
    }
    var n = D.dg_chung_nhap || (x ? JSON.parse(JSON.stringify(x)) : {});
    var chonBuoi = function (ten, gt) { return '<select data-o="' + ten + '"><option value="">— chọn —</option>' + BUOI_CU.slice(0, -1).map(function (b) { return '<option' + (gt === b ? ' selected' : '') + '>' + e(b) + '</option>'; }).join('') + '</select>'; };
    main.innerHTML = '<div class="trang-kt dg-trang-chung">' + dau + '<form class="dg-form" novalidate>' +
      cau(1, true, 'Bạn đã tham gia những buổi đào tạo nào?', '<div class="dg-chips">' + BUOI_CU.map(function (b) { return chipNhieu('c-buoi', b, n.buoi); }).join('') + '</div>', 'Chọn tất cả các buổi bạn đã học, trực tiếp hoặc trên web.') +
      cau(2, true, 'Từ buổi đầu tới giờ, bạn đã thật sự dùng được gì vào việc của mình?', '<textarea rows="3" data-o="da_dung" placeholder="Việc cụ thể, kết quả ra sao. Chưa dùng được gì thì ghi rõ là chưa.">' + e(n.da_dung || '') + '</textarea>') +
      cau(3, true, 'Điều gì khiến bạn chưa dùng được nhiều hơn?', '<div class="dg-chips">' + VUONG.map(function (v) { return chipNhieu('c-vuong', v, n.vuong); }).join('') + '</div>' +
        '<textarea rows="2" data-o="vuong_chu" placeholder="Nói rõ hơn (không bắt buộc)">' + e(n.vuong_chu || '') + '</textarea>', 'Chọn được nhiều ý.') +
      cau(4, true, 'Nếu được sửa đúng 1 thứ của cả chương trình đào tạo, bạn sửa gì?', '<textarea rows="2" data-o="sua_chu" placeholder="Sửa gì, sửa thế nào.">' + e(n.sua_chu || '') + '</textarea>') +
      cau(5, true, 'So với thời gian bạn bỏ ra, các buổi đào tạo tới giờ…', '<div class="dg-chips">' + GIA_TRI.map(function (s) { return chip('c-gia_tri', s, n.gia_tri); }).join('') + '</div>') +
      cau(6, false, 'Buổi nào giúp bạn nhiều nhất, buổi nào ít nhất?', '<div class="dg-hai"><label><span class="dg-tt-nhan">Nhiều nhất</span>' + chonBuoi('buoi_nhieu', n.buoi_nhieu) + '</label><label><span class="dg-tt-nhan">Ít nhất</span>' + chonBuoi('buoi_it', n.buoi_it) + '</label></div>' +
        '<textarea rows="2" data-o="buoi_vi_sao" placeholder="Vì sao? (không bắt buộc)">' + e(n.buoi_vi_sao || '') + '</textarea>') +
      cau(7, false, 'Cách học nào hợp với bạn nhất?', '<div class="dg-chips">' + CACH_HOC.map(function (c) { return chipNhieu('c-cach', c, n.cach_hoc); }).join('') + '</div>', 'Chọn được nhiều ý.') +
      cau(8, true, 'Ba từ bạn dùng để tả các buổi đào tạo tới giờ?', '<input type="text" data-o="ba_tu" maxlength="120" placeholder="Ví dụ: thực tế, nhanh quá, cần thêm thực hành" value="' + e(n.ba_tu || '') + '">') +
      cau(9, true, 'Người làm đào tạo đang làm tốt điều gì, và chưa tốt điều gì?', '<div class="dg-hai"><label><span class="dg-tt-nhan">Làm tốt</span><textarea rows="3" data-o="tot" placeholder="Không bắt buộc">' + e(n.tot || '') + '</textarea></label>' +
        '<label><span class="dg-tt-nhan">Chưa tốt · bắt buộc</span><textarea rows="3" data-o="chua_tot" placeholder="Nói thẳng: cách giảng, tốc độ, hỗ trợ sau buổi, công cụ…">' + e(n.chua_tot || '') + '</textarea></label></div>') +
      cau(10, false, 'Theo bạn, công ty mở các buổi đào tạo AI này để làm gì?', '<textarea rows="2" data-o="muc_dich" placeholder="Bạn nghĩ sao thì viết vậy.">' + e(n.muc_dich || '') + '</textarea>') +
      cau(11, false, 'Tới giờ, AI với bạn là…', '<div class="dg-chips">' + AI.map(function (s) { return chip('c-ai', s, n.ai); }).join('') + '</div>') +
      cau(12, false, 'Buổi đào tạo tiếp theo, bạn muốn học gì?', '<textarea rows="2" data-o="muon_hoc" placeholder="Kỹ năng, công cụ, loại video, việc đang vướng…">' + e(n.muon_hoc || '') + '</textarea>') +
      '<p class="dg-bao tom-tat" aria-live="polite"></p><div class="hang-nut"><button class="nut chinh to" type="submit">' + (x ? 'Gửi lại góp ý' : 'Gửi góp ý') + '</button>' +
      (suaChung ? '<button class="nut" type="button" data-c="huy">Huỷ sửa</button>' : '<a class="nut" href="#/">Để sau</a>') + '</div></form></div>';
    var f = $('form', main), hen = 0;
    function doc() {
      var o = {}; $$('[data-o]', f).forEach(function (t) { o[t.getAttribute('data-o')] = t.value.trim(); });
      var nhieu = function (ten) { return $$('input[name="' + ten + '"]:checked', f).map(function (i) { return i.value; }); };
      o.buoi = nhieu('c-buoi'); o.vuong = nhieu('c-vuong'); o.cach_hoc = nhieu('c-cach');
      ['gia_tri', 'ai'].forEach(function (k) { var r = $('input[name="c-' + k + '"]:checked', f); if (r) o[k] = r.value; });
      return o;
    }
    function thieuCau(c, o) {
      var so = +c.getAttribute('data-cau');
      if (so === 1) return !o.buoi.length; if (so === 2) return o.da_dung.length < 4; if (so === 3) return !o.vuong.length;
      if (so === 4) return o.sua_chu.length < 6; if (so === 5) return !o.gia_tri; if (so === 8) return o.ba_tu.length < 3; if (so === 9) return o.chua_tot.length < 4;
      return false;
    }
    f.addEventListener('input', function () { clearTimeout(hen); hen = setTimeout(function () { D.dg_chung_nhap = doc(); A.luu(); }, 600); });
    f.addEventListener('change', function (ev) { if (ev.target.matches('input')) { D.dg_chung_nhap = doc(); A.luu(); var o = doc(); $$('.dg-cau.thieu', f).forEach(function (c) { if (!thieuCau(c, o)) c.classList.remove('thieu'); }); } });
    var huy = $('[data-c=huy]', f); if (huy) huy.addEventListener('click', function () { suaChung = false; delete D.dg_chung_nhap; A.luu(); trangChung(main); });
    f.addEventListener('submit', function (ev) {
      ev.preventDefault(); clearTimeout(hen);
      var o = doc(), bao = $('.dg-bao', f);
      var thieu = $$('.dg-cau', f).filter(function (c) { var t = thieuCau(c, o); c.classList.toggle('thieu', t); return t; });
      if (thieu.length) { bao.textContent = 'Còn thiếu câu ' + thieu.map(function (c) { return c.getAttribute('data-cau'); }).join(', ') + '.'; bao.classList.add('thieu'); thieu[0].scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
      var bay = new Date().toISOString();
      o.luc = x && x.luc ? x.luc : bay; if (x) o.sua_luc = bay;
      D.dg_chung = o; delete D.dg_chung_nhap; delete D.dg_chung_hoan; suaChung = false; A.luu();
      if (A.veLai) A.veLai(); else trangChung(main); // vẽ lại cả mục lục (khối Góp ý chung đổi thành "đã gửi")
      window.scrollTo({ top: 0, behavior: 'smooth' }); if (theTuan && theTuan.getAttribute('data-buoi') === 'chung') dongTuan();
    });
  }
  // thẻ mời ở trang khoá học (ngay dưới phần mở đầu)
  function ganTong(main) {
    var A = APP(), mc = MC(); if (!A || !mc || !mc.daVao || !mc.daVao()) return;
    if (daGuiChung(A.duLieu()) || $('.dg-chung-the', main)) return;
    var mo = $('.mo-qc', main); if (!mo) return;
    var s = document.createElement('section'); s.className = 'dg-chung-the';
    s.innerHTML = '<div><small>Góp ý chung · khoảng 4 phút</small><b>Bạn đã học nhiều buổi đào tạo rồi — điều gì giúp được việc, điều gì chưa?</b><p>Nói thẳng để các buổi sau sát việc của bạn hơn.</p></div><a class="nut chinh" href="#/gop-y-chung">Góp ý ngay →</a>';
    mo.parentNode.insertBefore(s, mo.nextSibling);
  }

  // ================================================================ 4. báo cáo quản trị  #/quan-tri/danh-gia
  var BC = null, bcLoi = '', bcTai = null, loc = { buoi: '', che: 'buoi' }, tomTat = {}, vuaCho = false;
  function oDay() { return /^#\/quan-tri\/danh-gia$/.test(location.hash); }
  function taiBC() {
    if (bcTai) return bcTai;
    bcLoi = '';
    bcTai = MC().goi('danh-gia').then(function (kq) {
      if (kq && kq.ok) BC = { dg: kq.dg || [], chung: kq.chung || [], bao: kq.bao || [], bai: kq.bai || [], hoi: kq.hoi || {}, luc: kq.luc };
      else bcLoi = kq && kq.loi === 'khong-quyen' ? 'Tài khoản này không có quyền quản trị.' : kq && kq.loi === 'loai' ? 'Máy chủ chưa lên bản 7 (chưa có báo cáo đánh giá).' : 'Không tải được dữ liệu (' + ((kq && kq.loi) || 'lỗi') + ').';
    }).catch(function () { bcLoi = 'Không kết nối được máy chủ. Kiểm tra mạng rồi bấm Tải lại.'; }).then(function () { bcTai = null; });
    return bcTai;
  }
  function baoCao(main) {
    document.title = 'Đánh giá buổi học · Quản trị · ' + K.ten;
    if (!BC && !$('.qt > .cho-co-xuong', main)) {
      vuaCho = true;
      main.innerHTML = '<div class="qt">' + APP().cho({ tieu: 'Đang mở đánh giá buổi học', khung: 'qt-tong', buoc: ['Kết nối máy chủ…', 'Đọc đánh giá của người học…', 'Ghép với số liệu từng bài…', 'Sắp xong rồi…'] }) + '</div>';
    }
    (BC ? Promise.resolve() : taiBC()).then(function () { if (oDay()) veBC(main); });
  }
  function mucDG() { // mỗi người × mỗi buổi đã gửi, theo bộ lọc
    return BC.dg.map(function (r) { var j = r.du_lieu || {}; return { ten: r.ten || r.email, email: r.email, bid: j.buoi, so: j.so, buoi: j.ten, s: j.sau, w: j.tuan }; })
      .filter(function (x) { return x.s && (!loc.buoi || x.bid === loc.buoi); });
  }
  function dem(ds, ham, nhan) { var c = {}; ds.forEach(function (x) { var v = ham(x); if (v) c[v] = (c[v] || 0) + 1; }); return (nhan || Object.keys(c)).map(function (k) { return { nhan: k, so: c[k] || 0 }; }); }
  function thanh(ds, tong, lop) {
    tong = tong || ds.reduce(function (s, x) { return s + x.so; }, 0) || 1;
    return '<ul class="dg-thanh' + (lop ? ' ' + lop : '') + '">' + ds.map(function (x) {
      var p = Math.round(x.so / tong * 100);
      return '<li><span>' + e(x.nhan) + '</span><i><b style="width:' + p + '%"></b></i><em>' + x.so + ' · ' + p + '%</em></li>';
    }).join('') + '</ul>';
  }
  function loi(ds, ham, rong) { // danh sách lời viết: tên · buổi · nội dung
    var co = ds.map(function (x) { var t = ham(x); return t ? { x: x, t: t } : null; }).filter(Boolean);
    if (!co.length) return '<p class="dg-rong">' + (rong || 'Chưa có ai viết.') + '</p>';
    return '<ul class="dg-loi">' + co.map(function (c) { return '<li><p>' + e(c.t) + '</p><small>' + e(c.x.ten) + (c.x.so ? ' · Buổi ' + c.x.so : '') + '</small></li>'; }).join('') + '</ul>';
  }
  function soTB(ds) { return ds.length ? ds.reduce(function (s, v) { return s + v; }, 0) / ds.length : null; }
  function f1(v) { return v == null ? '—' : (Math.round(v * 10) / 10).toLocaleString('vi-VN'); }
  function the(nhan, so, phu, lop) { return '<div class="' + (lop || '') + '"><span>' + e(nhan) + '</span><b>' + e(so) + '</b><small>' + e(phu) + '</small></div>'; }

  function soLieuBai(ds) { // nói (đánh giá) cạnh làm (xem, học lại, câu hỏi nhanh, hỏi Agent) — từng bài trong phạm vi lọc
    var A = APP();
    return A.ds.filter(function (x) { return !loc.buoi || x.b.id === loc.buoi; }).map(function (x) {
      var ten = 'Bài ' + x.b.so + '.' + (x.i + 1) + ' · ' + String(x.bai.ten || '').trim();
      var r = BC.bai.filter(function (o) { return o['Mã bài'] === x.bai.id; });
      var toi = r.map(function (o) { return o['Đã xem tới %'] === '' ? null : +o['Đã xem tới %']; }).filter(function (v) { return v != null && !isNaN(v); });
      var hn = r.map(function (o) { var m = String(o['Câu hỏi nhanh (lần đầu)'] || '').match(/(\d+)\/(\d+)/); return m ? [+m[1], +m[2]] : null; }).filter(Boolean);
      var hnD = hn.reduce(function (s, v) { return s + v[0]; }, 0), hnT = hn.reduce(function (s, v) { return s + v[1]; }, 0);
      var tt = []; ds.forEach(function (d) { (d.s.tu_tin || []).forEach(function (k) { if (k.id === x.bai.id && k.truoc && k.sau) tt.push(k.sau - k.truoc); }); });
      var truoc = [], sau = []; ds.forEach(function (d) { (d.s.tu_tin || []).forEach(function (k) { if (k.id === x.bai.id && k.truoc && k.sau) { truoc.push(k.truoc); sau.push(k.sau); } }); });
      var hoi = BC.hoi[ten] || { so: 0, cau: [] };
      return { x: x, ten: ten, mo: r.length, xemHet: r.length ? r.filter(function (o) { return o['Xem hết'] === 'Có'; }).length / r.length : null,
        toi: soTB(toi), hocLai: soTB(r.map(function (o) { return +o['Số lần học'] || 0; })), hn: hnT ? hnD / hnT : null,
        phi: ds.filter(function (d) { return d.s.phi_bai === ten; }).length, truoc: soTB(truoc), sau: soTB(sau), tang: soTB(tt), hoi: hoi };
    }).filter(function (r) { return loc.buoi || r.mo || r.phi || r.hoi.so || r.truoc != null; }); // cả khoá: chỉ bài đã có người học / có ý kiến
  }
  function chuDeGemini(ds, bao) { // phần chữ gửi Agent gom chủ đề
    var dong = [];
    ds.forEach(function (x) {
      var s = x.s, t = x.ten + ' · Buổi ' + x.so + ' · ';
      dong.push(t + 'Sửa 1 thứ (' + s.sua + '): ' + (s.sua_chu || ''));
      if (s.phi_bai && s.phi_bai !== KHONG_PHI) dong.push(t + 'Phí thời gian ở ' + s.phi_bai + ': ' + (s.phi_chu || ''));
      dong.push(t + '1 giờ học so với 1 giờ làm: ' + s.gia_tri);
      if (s.khong_dung) dong.push(t + 'Không đúng thực tế: ' + s.khong_dung);
      dong.push(t + 'Ba từ: ' + s.ba_tu);
      if (s.dong_nghiep) dong.push(t + 'Nói với đồng nghiệp: ' + s.dong_nghiep);
      if (s.lam_khac) dong.push(t + 'Muốn người làm khoá làm khác: ' + s.lam_khac);
      if (s.ai) dong.push(t + 'AI với mình là: ' + s.ai);
      if (x.w) dong.push(t + 'Sau 7 ngày: ' + x.w.dung + (x.w.dung_gi ? ' — dùng: ' + x.w.dung_gi : '') + (x.w.vuong ? ' — vướng: ' + x.w.vuong : ''));
    });
    bao.forEach(function (r) { dong.push(r['Họ tên'] + ' · Báo chỗ chưa ổn (' + r['Loại'] + ') ở ' + r['Trang'] + ': ' + r['Nội dung']); });
    return dong.join('\n');
  }
  function baoTheoLoc() {
    if (!loc.buoi) return BC.bao;
    var b = timBuoi(loc.buoi); if (!b) return BC.bao;
    return BC.bao.filter(function (r) { var t = String(r['Trang'] || ''); return t.indexOf('Bài ' + b.so + '.') === 0 || t.indexOf('Buổi ' + b.so) >= 0 || t === 'Kiểm tra Buổi ' + b.so; });
  }

  function tabBC() {
    var n = (BC.chung || []).length;
    return '<div class="dg-tab" role="tablist">' +
      '<button type="button" role="tab" data-bc="che" data-che="buoi" aria-selected="' + (loc.che !== 'chung') + '">Đánh giá từng buổi <small>' + BC.dg.filter(function (r) { return r.du_lieu && r.du_lieu.sau; }).length + '</small></button>' +
      '<button type="button" role="tab" data-bc="che" data-che="chung" aria-selected="' + (loc.che === 'chung') + '">Góp ý chung từ trước tới giờ <small>' + n + '</small></button></div>';
  }
  function mucChung() { return (BC.chung || []).map(function (r) { return { ten: r.ten || r.email, email: r.email, c: r.du_lieu || {} }; }).filter(function (x) { return x.c.luc; }); }
  function chuChung(ds) {
    return ds.map(function (x) {
      var c = x.c, t = x.ten + ' · Góp ý chung · ';
      return [t + 'Đã học: ' + (c.buoi || []).join(', '), t + 'Đã dùng được: ' + c.da_dung, t + 'Vì sao chưa dùng nhiều hơn: ' + (c.vuong || []).join(', ') + (c.vuong_chu ? ' — ' + c.vuong_chu : ''),
        t + 'Sửa 1 thứ của cả chương trình: ' + c.sua_chu, t + 'So với thời gian bỏ ra: ' + c.gia_tri,
        c.buoi_nhieu || c.buoi_it ? t + 'Giúp nhiều nhất: ' + (c.buoi_nhieu || '—') + ', ít nhất: ' + (c.buoi_it || '—') + (c.buoi_vi_sao ? ' — ' + c.buoi_vi_sao : '') : '',
        t + 'Ba từ: ' + c.ba_tu, c.tot ? t + 'Người làm đào tạo làm tốt: ' + c.tot : '', t + 'Người làm đào tạo chưa tốt: ' + c.chua_tot,
        c.muc_dich ? t + 'Công ty mở đào tạo để: ' + c.muc_dich : '', c.ai ? t + 'AI với mình là: ' + c.ai : '', c.muon_hoc ? t + 'Muốn học tiếp: ' + c.muon_hoc : ''].filter(Boolean).join('\n');
    }).join('\n');
  }
  function veChungBC(main) {
    var ds = mucChung(), tdg = tomTat.chung, n = ds.length;
    var baTu = {}; ds.forEach(function (x) { String(x.c.ba_tu || '').split(/[,;/\n.]+/).map(function (w) { return w.trim().toLowerCase(); }).filter(function (w) { return w && w.length < 40; }).forEach(function (w) { baTu[w] = (baTu[w] || 0) + 1; }); });
    var baTuDs = Object.keys(baTu).sort(function (a, b) { return baTu[b] - baTu[a] || a.localeCompare(b, 'vi'); });
    var demNhieu = function (ham, nhan) { var c = {}; ds.forEach(function (x) { (ham(x) || []).forEach(function (v) { c[v] = (c[v] || 0) + 1; }); }); return (nhan || Object.keys(c)).map(function (k) { return { nhan: k, so: c[k] || 0 }; }).filter(function (x) { return x.so; }).sort(function (a, b) { return b.so - a.so; }); };
    var gt = dem(ds, function (x) { return x.c.gia_tri; }, GIA_TRI);
    var loiC = function (ham, rong) { return loi(ds.map(function (x) { return { ten: x.ten, so: '', v: ham(x) }; }), function (o) { return o.v; }, rong); };
    var vuongDs = demNhieu(function (x) { return x.c.vuong; }, VUONG);
    main.innerHTML = '<div class="qt dg-bc">' +
      '<a class="qt-ve" href="#/quan-tri">← Kết quả học viên</a>' +
      '<header class="dau-bai"><span class="nhan">Quản trị · ' + e(K.ten) + '</span><h1>Góp ý chung <em class="ng">từ trước tới giờ</em></h1>' +
        '<div class="meta"><span>Cập nhật ' + e(ngayGio(BC.luc)) + '</span><span>' + n + ' người đã góp ý</span></div></header>' + tabBC() +
      '<div class="qt-loc"><span class="gian"></span><button class="nut" type="button" data-bc="tai">↻ Tải lại</button><button class="nut" type="button" data-bc="in">In / lưu PDF</button><button class="nut" type="button" data-bc="xuat">⬇ Xuất Excel</button></div>' +
      '<div class="qt-the">' + the('Người góp ý', n, 'đã gửi góp ý chung') +
        the('Đáng hơn thời gian', n ? Math.round(gt[2].so / n * 100) + '%' : '—', 'chọn "Đáng hơn"') + the('Thấy phí hơn', n ? Math.round(gt[0].so / n * 100) + '%' : '—', 'chọn "Phí hơn"', gt[0].so ? 'qt-canh' : '') +
        the('Vướng nhiều nhất', vuongDs[0] && vuongDs[0].nhan !== 'Không vướng gì' ? vuongDs[0].so : '—', vuongDs[0] && vuongDs[0].nhan !== 'Không vướng gì' ? vuongDs[0].nhan : 'chưa có') + '</div>' +
      (n ? '' : '<p class="dg-rong">Chưa ai gửi góp ý chung. Người học thấy lời mời ở trang khoá học và thẻ nhắc góc trái màn hình.</p>') +
      '<section class="qt-muc dg-ag"><div class="ag-qt-dau"><h2>Agent gom ý kiến</h2><span class="gian"></span><button class="nut chinh" type="button" data-bc="tom-tat"' + (n ? '' : ' disabled') + '>' + (tdg && tdg.kq ? 'Gom lại' : 'Gom ý kiến thành chủ đề') + '</button></div><div class="dg-ag-kq">' + veTomTat(tdg) + '</div></section>' +
      '<div class="dg-luoi"><section class="qt-muc"><h2>Đã tham gia những buổi nào</h2>' + (n ? thanh(demNhieu(function (x) { return x.c.buoi; }, BUOI_CU), n) : '<p class="dg-rong">Chưa có.</p>') + '</section>' +
        '<section class="qt-muc"><h2>So với thời gian bỏ ra</h2>' + (n ? thanh(gt, n, 'dg-gt') : '<p class="dg-rong">Chưa có.</p>') + '</section></div>' +
      '<section class="qt-muc"><h2>Đã thật sự dùng được gì vào việc</h2>' + loiC(function (x) { return x.c.da_dung; }) + '</section>' +
      '<section class="qt-muc"><h2>Vì sao chưa dùng được nhiều hơn</h2>' + (vuongDs.length ? thanh(vuongDs, n) : '<p class="dg-rong">Chưa có.</p>') + '<h3>Nói rõ hơn</h3>' + loiC(function (x) { return x.c.vuong_chu; }) + '</section>' +
      '<section class="qt-muc"><h2>Sửa 1 thứ của cả chương trình</h2>' + loiC(function (x) { return x.c.sua_chu; }) + '</section>' +
      '<div class="dg-luoi"><section class="qt-muc"><h2>Buổi giúp nhiều nhất</h2>' + (ds.some(function (x) { return x.c.buoi_nhieu; }) ? thanh(dem(ds, function (x) { return x.c.buoi_nhieu; }).sort(function (a, b) { return b.so - a.so; }), n) : '<p class="dg-rong">Chưa có.</p>') + '</section>' +
        '<section class="qt-muc"><h2>Buổi giúp ít nhất</h2>' + (ds.some(function (x) { return x.c.buoi_it; }) ? thanh(dem(ds, function (x) { return x.c.buoi_it; }).sort(function (a, b) { return b.so - a.so; }), n) : '<p class="dg-rong">Chưa có.</p>') + '</section></div>' +
      '<section class="qt-muc"><h2>Vì sao buổi đó nhiều / ít</h2>' + loiC(function (x) { return x.c.buoi_vi_sao ? '(' + (x.c.buoi_nhieu || '—') + ' / ' + (x.c.buoi_it || '—') + ') ' + x.c.buoi_vi_sao : ''; }) + '</section>' +
      '<section class="qt-muc"><h2>Người học nhìn người làm đào tạo thế nào</h2>' +
        '<h3>Ba từ tả các buổi đào tạo <small>· số người dùng từ đó</small></h3>' + (baTuDs.length ? '<ul class="dg-tu">' + baTuDs.map(function (w) { return '<li><span>' + e(w) + '</span><b>' + baTu[w] + '</b></li>'; }).join('') + '</ul>' : '<p class="dg-rong">Chưa có.</p>') +
        '<div class="dg-luoi"><div><h3>Chưa tốt</h3>' + loiC(function (x) { return x.c.chua_tot; }) + '</div><div><h3>Làm tốt</h3>' + loiC(function (x) { return x.c.tot; }) + '</div></div>' +
        '<h3>Công ty mở các buổi đào tạo AI để làm gì (theo người học)</h3>' + loiC(function (x) { return x.c.muc_dich; }) +
        '<h3>Tới giờ, AI với người học là…</h3>' + (ds.some(function (x) { return x.c.ai; }) ? thanh(dem(ds, function (x) { return x.c.ai; }, AI)) : '<p class="dg-rong">Chưa có.</p>') + '</section>' +
      '<div class="dg-luoi"><section class="qt-muc"><h2>Cách học hợp nhất</h2>' + (ds.some(function (x) { return (x.c.cach_hoc || []).length; }) ? thanh(demNhieu(function (x) { return x.c.cach_hoc; }, CACH_HOC), n) : '<p class="dg-rong">Chưa có.</p>') + '</section>' +
        '<section class="qt-muc"><h2>Muốn học gì ở buổi tiếp theo</h2>' + loiC(function (x) { return x.c.muon_hoc; }) + '</section></div>' +
      '<section class="qt-muc"><h2>Từng người</h2>' + (n ? '<div class="qt-cuon"><table class="qt-bang"><thead><tr><th>Người học</th><th>Đã học</th><th>So với thời gian</th><th>Vướng</th><th>Ba từ</th><th>Lúc gửi</th></tr></thead><tbody>' +
        ds.slice().sort(function (a, b) { return new Date(b.c.sua_luc || b.c.luc) - new Date(a.c.sua_luc || a.c.luc); }).map(function (x) {
          return '<tr data-email="' + e(x.email) + '" tabindex="0"><td>' + e(x.ten) + '<small>' + e(x.email) + '</small></td><td>' + e((x.c.buoi || []).join(' · ')) + '</td><td>' + e(x.c.gia_tri) + '</td><td>' + e((x.c.vuong || []).join(' · ')) + '</td><td>' + e(x.c.ba_tu) + '</td><td>' + e(ngayGio(x.c.sua_luc || x.c.luc)) + '</td></tr>';
        }).join('') + '</tbody></table></div>' : '<p class="dg-rong">Chưa có.</p>') + '</section></div>';
    ganBC(main);
  }
  function veBC(main) {
    if (!bcLoi && loc.che === 'chung') return veChungBC(main);
    if (bcLoi) { main.innerHTML = '<div class="qt"><a class="qt-ve" href="#/quan-tri">← Kết quả học viên</a><header class="dau-bai"><span class="nhan">Quản trị</span><h1>Đánh giá buổi học</h1></header><p class="qt-loi">' + e(bcLoi) + '</p><button class="nut chinh" type="button" data-bc="tai">↻ Tải lại</button></div>'; ganBC(main); return; }
    var ds = mucDG(), bao = baoTheoLoc(), tuan = ds.filter(function (x) { return x.w; });
    var denHan = ds.filter(function (x) { return !x.w && Date.now() - new Date(x.s.luc).getTime() >= NGAY_HOI_LAI * 864e5; }).length;
    var nguoi = ds.map(function (x) { return x.email; }).filter(function (v, i, a) { return a.indexOf(v) === i; }).length;
    var gt = dem(ds, function (x) { return x.s.gia_tri; }, GIA_TRI), dang = gt[2].so, phi = gt[0].so;
    var tang = []; ds.forEach(function (x) { (x.s.tu_tin || []).forEach(function (k) { if (k.truoc && k.sau) tang.push(k.sau - k.truoc); }); });
    var coBuoi = K.buoi.filter(function (b) { return BC.dg.some(function (r) { return (r.du_lieu || {}).buoi === b.id; }); });
    var sl = soLieuBai(ds), tdg = tomTat[loc.buoi || '*'];
    var suaDs = dem(ds, function (x) { return x.s.sua; }, SUA).filter(function (x) { return x.so; }).sort(function (a, b) { return b.so - a.so; });
    var phiDs = dem(ds, function (x) { return x.s.phi_bai && x.s.phi_bai !== KHONG_PHI ? x.s.phi_bai : ''; }).sort(function (a, b) { return b.so - a.so; });
    var baTu = {}; ds.forEach(function (x) { String(x.s.ba_tu || '').split(/[,;/\n.]+/).map(function (w) { return w.trim().toLowerCase(); }).filter(function (w) { return w && w.length < 40; }).forEach(function (w) { baTu[w] = (baTu[w] || 0) + 1; }); });
    var baTuDs = Object.keys(baTu).sort(function (a, b) { return baTu[b] - baTu[a] || a.localeCompare(b, 'vi'); });
    var xau = function (v, nguong, nguoc) { return v == null ? '' : (nguoc ? v > nguong : v < nguong) ? ' class="dg-xau"' : ''; };
    var pct = function (v) { return v == null ? '—' : Math.round(v * 100) + '%'; };
    main.innerHTML = '<div class="qt dg-bc' + (vuaCho ? ' vao-muot' : '') + '">' +
      '<a class="qt-ve" href="#/quan-tri">← Kết quả học viên</a>' +
      '<header class="dau-bai"><span class="nhan">Quản trị · ' + e(K.ten) + '</span><h1>Đánh giá <em class="ng">buổi học</em></h1>' +
        '<div class="meta"><span>Cập nhật ' + e(ngayGio(BC.luc)) + '</span><span>' + ds.length + ' lượt đánh giá · ' + nguoi + ' người</span><span>' + bao.length + ' lần báo chỗ chưa ổn</span></div></header>' + tabBC() +
      '<div class="qt-loc"><select data-bc="buoi" aria-label="Lọc theo buổi"><option value="">Tất cả các buổi</option>' + K.buoi.map(function (b) { return '<option value="' + b.id + '"' + (loc.buoi === b.id ? ' selected' : '') + '>Buổi ' + b.so + ' · ' + e(b.ten) + (coBuoi.indexOf(b) < 0 ? ' (chưa có)' : '') + '</option>'; }).join('') + '</select>' +
        '<span class="gian"></span><button class="nut" type="button" data-bc="tai">↻ Tải lại</button><button class="nut" type="button" data-bc="in">In / lưu PDF</button><button class="nut" type="button" data-bc="xuat">⬇ Xuất Excel</button></div>' +
      '<div class="qt-the">' + the('Lượt đánh giá', ds.length, nguoi + ' người đã gửi') +
        the('Đáng hơn 1 giờ làm', ds.length ? Math.round(dang / ds.length * 100) + '%' : '—', 'chọn "Đáng hơn"') +
        the('Thấy phí hơn', ds.length ? Math.round(phi / ds.length * 100) + '%' : '—', 'chọn "Phí hơn"', phi ? 'qt-canh' : '') +
        the('Tự tin tăng', tang.length ? (soTB(tang) >= 0 ? '+' : '') + f1(soTB(tang)) : '—', 'mức trung bình (thang 1–5)') +
        the('Hỏi lại 7 ngày', tuan.length + '/' + (tuan.length + denHan), 'đã trả lời / đã đến hạn') + '</div>' +
      (ds.length || bao.length ? '' : '<p class="dg-rong">Chưa có đánh giá nào' + (loc.buoi ? ' cho buổi này' : '') + '. Người học gửi đánh giá ở cuối trang kiểm tra mỗi buổi.</p>') +
      // Agent gom ý kiến
      '<section class="qt-muc dg-ag"><div class="ag-qt-dau"><h2>Agent gom ý kiến</h2><span class="gian"></span><button class="nut chinh" type="button" data-bc="tom-tat"' + (ds.length || bao.length ? '' : ' disabled') + '>' + (tdg && tdg.kq ? 'Gom lại' : 'Gom ý kiến thành chủ đề') + '</button></div>' +
        '<div class="dg-ag-kq">' + veTomTat(tdg) + '</div></section>' +
      // 1. muốn sửa gì
      '<section class="qt-muc"><h2>Người học muốn sửa gì nhất</h2><p class="qt-ghi">Câu 1 (bắt buộc): "Nếu được sửa đúng 1 thứ của buổi này, bạn sửa gì?" — bấm từng dòng để đọc lời viết.</p>' +
        (suaDs.length ? suaDs.map(function (s) {
          return '<details class="dg-mo"><summary>' + thanh([s], ds.length) + '</summary>' + loi(ds.filter(function (x) { return x.s.sua === s.nhan; }), function (x) { return x.s.sua_chu; }) + '</details>';
        }).join('') : '<p class="dg-rong">Chưa có.</p>') + '</section>' +
      // 2. giá trị + phí thời gian
      '<div class="dg-luoi">' +
        '<section class="qt-muc"><h2>1 giờ học so với 1 giờ làm việc</h2>' + (ds.length ? thanh(gt, ds.length, 'dg-gt') : '<p class="dg-rong">Chưa có.</p>') +
          (!loc.buoi && coBuoi.length > 1 ? '<h3>Theo từng buổi</h3><table class="qt-bang nho"><thead><tr><th>Buổi</th><th>Phí hơn</th><th>Ngang</th><th>Đáng hơn</th></tr></thead><tbody>' + coBuoi.map(function (b) {
            var d = BC.dg.map(function (r) { return r.du_lieu || {}; }).filter(function (j) { return j.buoi === b.id && j.sau; }), c = function (v) { return d.filter(function (j) { return j.sau.gia_tri === v; }).length; };
            return '<tr><td>Buổi ' + b.so + '<small>' + d.length + ' lượt</small></td><td' + (c(GIA_TRI[0]) ? ' class="dg-xau"' : '') + '>' + c(GIA_TRI[0]) + '</td><td>' + c(GIA_TRI[1]) + '</td><td>' + c(GIA_TRI[2]) + '</td></tr>';
          }).join('') + '</tbody></table>' : '') + '</section>' +
        '<section class="qt-muc"><h2>Đoạn phí thời gian, suýt bỏ ngang</h2>' + (phiDs.length ? phiDs.map(function (p) {
          return '<details class="dg-mo"><summary>' + thanh([p], ds.length) + '</summary>' + loi(ds.filter(function (x) { return x.s.phi_bai === p.nhan; }), function (x) { return x.s.phi_chu; }, 'Không ghi lý do.') + '</details>';
        }).join('') : '<p class="dg-rong">Chưa ai chọn đoạn nào.</p>') + '</section></div>' +
      // 3. không đúng thực tế
      '<section class="qt-muc"><h2>Điều người học thấy không đúng với thực tế</h2>' + loi(ds, function (x) { return x.s.khong_dung; }) + '</section>' +
      // 4. nhận thức
      '<section class="qt-muc"><h2>Người học nhìn khoá học thế nào</h2>' +
        '<h3>Ba từ tả khoá học <small>· số người dùng từ đó</small></h3>' + (baTuDs.length ? '<ul class="dg-tu">' + baTuDs.map(function (w) { return '<li><span>' + e(w) + '</span><b>' + baTu[w] + '</b></li>'; }).join('') + '</ul>' : '<p class="dg-rong">Chưa có.</p>') +
        '<div class="dg-luoi"><div><h3>Trả lời đồng nghiệp "có đáng học không?"</h3>' + loi(ds, function (x) { return x.s.dong_nghiep; }) + '</div>' +
        '<div><h3>Muốn người làm khoá làm khác đi</h3>' + loi(ds, function (x) { return x.s.lam_khac; }) + '</div></div>' +
        '<h3>Học xong, AI với người học là…</h3>' + (ds.some(function (x) { return x.s.ai; }) ? thanh(dem(ds, function (x) { return x.s.ai; }, AI)) : '<p class="dg-rong">Chưa có.</p>') + '</section>' +
      // 5. sau 7 ngày
      '<section class="qt-muc"><h2>Sau ' + NGAY_HOI_LAI + ' ngày dùng thật</h2>' +
        (tuan.length ? thanh(dem(tuan, function (x) { return x.w.dung; }, DUNG), tuan.length) +
          '<div class="dg-luoi"><div><h3>Đã dùng gì</h3>' + loi(tuan, function (x) { return x.w.dung_gi; }) + '</div><div><h3>Vướng ở đâu</h3>' + loi(tuan, function (x) { return x.w.vuong; }) + '</div></div>'
          : '<p class="dg-rong">Chưa có ai trả lời' + (denHan ? ' (' + denHan + ' lượt đã đến hạn hỏi lại, web sẽ hỏi khi họ vào học)' : ' — web hỏi lại 7 ngày sau khi gửi đánh giá') + '.</p>') + '</section>' +
      // 6. nói và làm theo bài
      '<section class="qt-muc"><h2>Nói và làm: số liệu từng bài</h2><p class="qt-ghi">Đặt lời đánh giá cạnh việc người học thật sự làm. Ô tô màu = đáng xem lại (xem hết dưới 60%, câu hỏi nhanh đúng dưới 60%, có người chọn "phí thời gian", tự tin tăng dưới 1 mức).</p>' +
        '<div class="qt-cuon"><table class="qt-bang"><thead><tr><th>Bài</th><th>Người mở</th><th>Xem hết</th><th>Xem tới (TB)</th><th>Học lại (TB)</th><th>Câu hỏi nhanh đúng lần đầu</th><th>Hỏi Agent</th><th>Chọn "phí thời gian"</th><th>Tự tin trước → sau</th></tr></thead><tbody>' +
        sl.map(function (r) {
          return '<tr><td>' + e(r.ten) + '</td><td>' + r.mo + '</td><td' + xau(r.xemHet, .6) + '>' + pct(r.xemHet) + '</td><td>' + (r.toi == null ? '—' : Math.round(r.toi) + '%') + '</td><td>' + f1(r.hocLai) + '</td>' +
            '<td' + xau(r.hn, .6) + '>' + pct(r.hn) + '</td><td>' + (r.hoi.so ? '<details class="dg-hoi"><summary>' + r.hoi.so + ' câu</summary><ul>' + r.hoi.cau.map(function (c) { return '<li>' + e(c.cau) + '<small>' + e(c.ten) + '</small></li>'; }).join('') + '</ul></details>' : '0') + '</td>' +
            '<td' + (r.phi ? ' class="dg-xau"' : '') + '>' + r.phi + '</td><td' + xau(r.tang, 1) + '>' + (r.truoc == null ? '—' : f1(r.truoc) + ' → ' + f1(r.sau) + ' (' + (r.tang >= 0 ? '+' : '') + f1(r.tang) + ')') + '</td></tr>';
        }).join('') + '</tbody></table></div></section>' +
      // 7. báo chỗ chưa ổn
      '<section class="qt-muc"><h2>Báo chỗ chưa ổn <small class="dg-dem">' + bao.length + '</small></h2>' + (bao.length ? '<div class="qt-cuon"><table class="qt-bang"><thead><tr><th>Lúc</th><th>Người học</th><th>Trang</th><th>Loại</th><th>Nội dung</th></tr></thead><tbody>' +
        bao.slice().reverse().map(function (r) { return '<tr><td>' + e(ngayGio(r['Lúc'])) + '</td><td>' + e(r['Họ tên'] || r['Email']) + '</td><td>' + e(r['Trang']) + '</td><td>' + e(r['Loại']) + '</td><td>' + e(r['Nội dung']) + '</td></tr>'; }).join('') +
        '</tbody></table></div>' : '<p class="dg-rong">Chưa có ai báo' + (loc.buoi ? ' ở buổi này' : '') + '.</p>') + '</section>' +
      // 8. từng người
      '<section class="qt-muc"><h2>Từng lượt đánh giá</h2>' + (ds.length ? '<div class="qt-cuon"><table class="qt-bang"><thead><tr><th>Người học</th><th>Buổi</th><th>Sửa 1 thứ</th><th>1 giờ học</th><th>Ba từ</th><th>Sau 7 ngày</th><th>Lúc gửi</th></tr></thead><tbody>' +
        ds.slice().sort(function (a, b) { return new Date(b.s.luc) - new Date(a.s.luc); }).map(function (x) {
          return '<tr data-email="' + e(x.email) + '" tabindex="0"><td>' + e(x.ten) + '<small>' + e(x.email) + '</small></td><td>Buổi ' + e(x.so) + '</td><td>' + e(x.s.sua) + '<small>' + e(x.s.sua_chu) + '</small></td><td>' + e(x.s.gia_tri) + '</td><td>' + e(x.s.ba_tu) + '</td><td>' + (x.w ? e(x.w.dung) : '—') + '</td><td>' + e(ngayGio(x.s.sua_luc || x.s.luc)) + '</td></tr>';
        }).join('') + '</tbody></table></div><p class="qt-ghi">Bấm một dòng để mở bài làm của người đó.</p>' : '<p class="dg-rong">Chưa có.</p>') + '</section>' +
      '</div>';
    if (vuaCho) setTimeout(function () { vuaCho = false; }, 700);
    ganBC(main);
  }
  function veTomTat(t) {
    if (!t) return '<p class="qt-ghi" style="margin:0">Agent đọc toàn bộ lời viết trong phạm vi đang lọc (đánh giá, hỏi lại 7 ngày, báo chỗ chưa ổn), gom thành chủ đề người học chê nhiều nhất, kèm câu trích và việc nên sửa. Cần khoá Gemini ở mục Agent khoá học.</p>';
    if (t.dang) return '<div class="ag-soan">' + APP().dauCho('nho') + '<span>Agent đang đọc ' + t.so + ' dòng ý kiến…</span></div>';
    if (t.loi) return '<p class="qt-loi">' + e(t.loi) + '</p>';
    var j = t.kq; if (!j) return '<div class="dg-ag-tho">' + e(t.chu).replace(/\n/g, '<br>') + '</div>';
    return (j.uu_tien && j.uu_tien.length ? '<div class="dg-uu"><h3>Nên sửa trước</h3><ol>' + j.uu_tien.map(function (u) { return '<li>' + e(u) + '</li>'; }).join('') + '</ol></div>' : '') +
      (j.nhan_thuc ? '<p class="dg-nt"><b>Người học đang nhìn khoá học:</b> ' + e(j.nhan_thuc) + '</p>' : '') +
      (j.lo_ngai ? '<p class="dg-nt"><b>Điều họ lo:</b> ' + e(j.lo_ngai) + '</p>' : '') +
      '<div class="dg-cd">' + (j.chu_de || []).map(function (c) {
        return '<div class="dg-cd-o dg-md-' + e(c.muc_do || 'vua') + '"><h3>' + e(c.ten) + ' <small>' + e(c.so_nguoi || '?') + ' người</small></h3><p>' + e(c.y) + '</p>' +
          ((c.trich || []).length ? '<ul>' + c.trich.map(function (q) { return '<li>' + e(q) + '</li>'; }).join('') + '</ul>' : '') + (c.nen_sua ? '<p class="dg-cd-sua"><b>Nên sửa:</b> ' + e(c.nen_sua) + '</p>' : '') + '</div>';
      }).join('') + '</div><p class="qt-ghi" style="margin:0">Agent tóm tắt từ ' + t.so + ' dòng ý kiến' + (t.mo_hinh ? ' · ' + e(t.mo_hinh) : '') + '. Đọc lời gốc ở các mục bên dưới trước khi quyết định.</p>';
  }
  function ganBC(main) {
    $$('[data-bc]', main).forEach(function (n) {
      var l = n.getAttribute('data-bc');
      if (l === 'tai') n.addEventListener('click', function () { BC = null; baoCao(main); });
      else if (l === 'buoi') n.addEventListener('change', function () { loc.buoi = n.value; veBC(main); });
      else if (l === 'che') n.addEventListener('click', function () { loc.che = n.getAttribute('data-che'); veBC(main); });
      else if (l === 'xuat') n.addEventListener('click', xuatCsv);
      else if (l === 'in') n.addEventListener('click', inBC);
      else if (l === 'tom-tat') n.addEventListener('click', function () {
        var chung = loc.che === 'chung', k = chung ? 'chung' : loc.buoi || '*', chu = chung ? chuChung(mucChung()) : chuDeGemini(mucDG(), baoTheoLoc()), so = chu.split('\n').filter(Boolean).length, b = !chung && timBuoi(loc.buoi);
        tomTat[k] = { dang: true, so: so }; $('.dg-ag-kq', main).innerHTML = veTomTat(tomTat[k]); n.disabled = true;
        MC().goi('danh-gia-tom-tat', { chu: chu, pham_vi: chung ? 'góp ý chung về cả chương trình đào tạo từ trước tới giờ (các buổi trực tiếp + khoá học trên web)' : b ? 'Buổi ' + b.so + ' · ' + b.ten : 'cả khoá' }).then(function (kq) {
          var LOI = { 'chua-khoa': 'Chưa có khoá Gemini — dán khoá ở trang Quản trị → Agent khoá học.', 'it-y-kien': 'Chưa đủ ý kiến để gom.', 'khoa-sai': 'Khoá Gemini bị từ chối — kiểm tra lại ở mục Agent khoá học.', 'qua-tai': 'Gemini đang quá tải — thử lại sau ít phút.', loai: 'Máy chủ chưa lên bản 7.' };
          tomTat[k] = kq && kq.ok ? { kq: kq.ket_qua, chu: kq.chu, so: so, mo_hinh: kq.mo_hinh } : { loi: LOI[kq && kq.loi] || 'Không gom được (' + ((kq && kq.loi) || 'lỗi') + ').' };
        }).catch(function () { tomTat[k] = { loi: 'Mất kết nối — thử lại.' }; }).then(function () { if (oDay() && (loc.che === 'chung' ? 'chung' : loc.buoi || '*') === k) veBC(main); });
      });
    });
    $$('tr[data-email]', main).forEach(function (tr) {
      var di = function () { location.hash = '#/quan-tri/' + encodeURIComponent(tr.getAttribute('data-email')); };
      tr.addEventListener('click', di); tr.addEventListener('keydown', function (ev) { if (ev.key === 'Enter') di(); });
    });
  }
  function xuatCsvChung() {
    var o = function (v) { v = v == null ? '' : String(v); return /[",\n;]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
    var cot = ['Lúc gửi', 'Họ tên', 'Email', 'Đã học', 'Đã dùng được gì', 'Vì sao chưa dùng nhiều hơn', 'Nói rõ hơn', 'Sửa 1 thứ', 'So với thời gian', 'Giúp nhiều nhất', 'Giúp ít nhất', 'Vì sao', 'Cách học hợp', 'Ba từ', 'Làm tốt', 'Chưa tốt', 'Công ty mở đào tạo để', 'AI với bạn là', 'Muốn học tiếp'];
    var dong = [cot.map(o).join(',')].concat(mucChung().map(function (x) {
      var c = x.c;
      return [ngayGio(c.sua_luc || c.luc), x.ten, x.email, (c.buoi || []).join(' · '), c.da_dung, (c.vuong || []).join(' · '), c.vuong_chu, c.sua_chu, c.gia_tri, c.buoi_nhieu, c.buoi_it, c.buoi_vi_sao, (c.cach_hoc || []).join(' · '), c.ba_tu, c.tot, c.chua_tot, c.muc_dich, c.ai, c.muon_hoc].map(o).join(',');
    }));
    var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + dong.join('\r\n')], { type: 'text/csv;charset=utf-8' }));
    a.download = 'gop-y-chung-' + new Date().toISOString().slice(0, 10) + '.csv'; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
  }
  function xuatCsv() {
    if (loc.che === 'chung') return xuatCsvChung();
    var o = function (v) { v = v == null ? '' : String(v); return /[",\n;]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
    var cot = ['Lúc gửi', 'Họ tên', 'Email', 'Buổi', 'Sửa 1 thứ', 'Sửa thế nào', 'Đoạn phí thời gian', 'Vì sao phí', 'Giá trị 1 giờ học', 'Không đúng thực tế', 'Tự tin trước → sau', 'Ba từ', 'Trả lời đồng nghiệp', 'Muốn người làm khoá làm khác', 'AI với bạn là', 'Sau 7 ngày', 'Đã dùng gì', 'Vướng ở đâu'];
    var dong = [cot.map(o).join(',')].concat(mucDG().map(function (x) {
      var s = x.s, w = x.w || {};
      return [ngayGio(s.sua_luc || s.luc), x.ten, x.email, 'Buổi ' + x.so, s.sua, s.sua_chu, s.phi_bai, s.phi_chu, s.gia_tri, s.khong_dung, (s.tu_tin || []).map(function (k) { return k.ma + ': ' + k.truoc + '→' + k.sau; }).join(' · '), s.ba_tu, s.dong_nghiep, s.lam_khac, s.ai, w.dung, w.dung_gi, w.vuong].map(o).join(',');
    }));
    var bao = baoTheoLoc(); if (bao.length) { dong.push('', 'BÁO CHỖ CHƯA ỔN', ['Lúc', 'Họ tên', 'Email', 'Trang', 'Loại', 'Nội dung'].map(o).join(',')); bao.forEach(function (r) { dong.push([ngayGio(r['Lúc']), r['Họ tên'], r['Email'], r['Trang'], r['Loại'], r['Nội dung']].map(o).join(',')); }); }
    var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + dong.join('\r\n')], { type: 'text/csv;charset=utf-8' }));
    a.download = 'danh-gia-buoi-hoc-' + (loc.buoi || 'ca-khoa') + '-' + new Date().toISOString().slice(0, 10) + '.csv'; document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 4000);
  }
  function inBC() { // in bản đen trắng gọn: lấy nội dung đang hiện (mở hết các mục thu gọn), bỏ nút
    var goc = $('.dg-bc'); if (!goc) return;
    var ban = goc.cloneNode(true);
    $$('button, select, .qt-ve, .qt-loc', ban).forEach(function (n) { n.remove(); });
    $$('details', ban).forEach(function (d) { d.setAttribute('open', ''); });
    var b = timBuoi(loc.buoi), p = document.getElementById('phieu-in'); if (!p) return;
    p.innerHTML = '<style>.dg-in{font-family:"Be Vietnam Pro","Segoe UI",system-ui,sans-serif;color:#111;font-size:12px;line-height:1.5}.dg-in h1{font-size:20px;margin:0}.dg-in h2{font-size:15px;margin:18px 0 6px;border-bottom:1px solid #999;padding-bottom:3px}.dg-in h3{font-size:13px;margin:10px 0 4px}' +
      '.dg-in table{width:100%;border-collapse:collapse;margin:4px 0}.dg-in th,.dg-in td{border:1px solid #aaa;padding:3px 5px;text-align:left;vertical-align:top}.dg-in small{display:block;color:#555}.dg-in .qt-the{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}.dg-in .qt-the div{border:1px solid #aaa;padding:6px}.dg-in .qt-the b{display:block;font-size:18px}' +
      '.dg-in ul{margin:2px 0;padding-left:18px}.dg-in .dg-thanh{list-style:none;padding:0}.dg-in .dg-thanh li{display:grid;grid-template-columns:40% 1fr 90px;gap:6px;align-items:center}.dg-in .dg-thanh i{display:block;height:8px;background:#eee}.dg-in .dg-thanh i b{display:block;height:8px;background:#555}' +
      '.dg-in .dg-xau{font-weight:700;text-decoration:underline}.dg-in summary{list-style:none}.dg-in .dg-tu{list-style:none;padding:0;display:flex;flex-wrap:wrap;gap:4px 10px}.dg-in section{break-inside:avoid-page}@page{margin:12mm}</style>' +
      '<div class="dg-in"><p>' + e(K.ten) + ' · Báo cáo ' + (loc.che === 'chung' ? 'góp ý chung từ trước tới giờ' : 'đánh giá buổi học · ' + (b ? 'Buổi ' + b.so + ' · ' + e(b.ten) : 'cả khoá')) + ' · xuất ' + e(ngayGio(new Date().toISOString())) + '</p>' + ban.innerHTML + '</div>';
    document.documentElement.classList.add('in-phieu'); window.print();
  }

  // ================================================================ 5. trang một học viên (quan-tri.js · veBuoi): đánh giá của người đó cho buổi b
  function cuaNguoi(D, b) {
    var x = D && D.dg && D.dg[b.id]; if (!x || !x.sau) return '';
    var s = x.sau, w = x.tuan, d = function (n, v) { return v ? '<tr><th>' + n + '</th><td>' + e(v) + '</td></tr>' : ''; };
    return '<h3>Đánh giá buổi học <small>· gửi ' + e(ngayGio(s.sua_luc || s.luc)) + '</small></h3><table class="qt-bang nho dg-nguoi"><tbody>' +
      d('Sửa 1 thứ', s.sua + (s.sua_chu ? ' — ' + s.sua_chu : '')) + d('Đoạn phí thời gian', s.phi_bai && s.phi_bai !== KHONG_PHI ? s.phi_bai + (s.phi_chu ? ' — ' + s.phi_chu : '') : '') +
      d('1 giờ học so với 1 giờ làm', s.gia_tri) + d('Không đúng thực tế', s.khong_dung) +
      d('Tự tin trước → sau', (s.tu_tin || []).map(function (k) { return k.ma + ': ' + k.truoc + '→' + k.sau; }).join(' · ')) + d('Ba từ', s.ba_tu) +
      d('Nói với đồng nghiệp', s.dong_nghiep) + d('Muốn người làm khoá làm khác', s.lam_khac) + d('AI với mình là', s.ai) +
      (w ? d('Sau 7 ngày', w.dung) + d('Đã dùng gì', w.dung_gi) + d('Vướng ở đâu', w.vuong) : '') + '</tbody></table>';
  }

  function chungCuaNguoi(D) { // trang một học viên (quan-tri.js · veNguoi)
    var c = D && D.dg_chung; if (!c || !c.luc) return '';
    var d = function (n, v) { v = Array.isArray(v) ? v.join(' · ') : v; return v ? '<tr><th>' + n + '</th><td>' + e(v) + '</td></tr>' : ''; };
    return '<section class="qt-muc"><h2>Góp ý chung <small class="dg-dem">gửi ' + e(ngayGio(c.sua_luc || c.luc)) + '</small></h2><table class="qt-bang nho dg-nguoi"><tbody>' +
      d('Đã học', c.buoi) + d('Đã dùng được gì', c.da_dung) + d('Vì sao chưa dùng nhiều hơn', (c.vuong || []).join(' · ') + (c.vuong_chu ? ' — ' + c.vuong_chu : '')) +
      d('Sửa 1 thứ của cả chương trình', c.sua_chu) + d('So với thời gian bỏ ra', c.gia_tri) +
      d('Giúp nhiều nhất / ít nhất', c.buoi_nhieu || c.buoi_it ? (c.buoi_nhieu || '—') + ' / ' + (c.buoi_it || '—') + (c.buoi_vi_sao ? ' — ' + c.buoi_vi_sao : '') : '') +
      d('Cách học hợp', c.cach_hoc) + d('Ba từ', c.ba_tu) + d('Người làm đào tạo làm tốt', c.tot) + d('Chưa tốt', c.chua_tot) +
      d('Công ty mở đào tạo để', c.muc_dich) + d('AI với mình là', c.ai) + d('Muốn học tiếp', c.muon_hoc) + '</tbody></table></section>';
  }

  window.KHOA_DANH_GIA = { daGui: daGui, mucBuoi: mucBuoi, ganBuoi: ganBuoi, moBao: moBao, baoCao: baoCao, cuaNguoi: cuaNguoi, xemHoiLai: xemHoiLai,
    trangChung: trangChung, ganTong: ganTong, chungCuaNguoi: chungCuaNguoi, daGuiChung: daGuiChung };
})();
