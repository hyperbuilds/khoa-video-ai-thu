// AGENT KHOÁ HỌC (07/11/2026, user: "làm thêm tính năng agent chat bot như NotebookLM: làm tài liệu, hỏi đáp liên quan đến web, khoá học;
//   cần chia ra vì cẩn thận bị quay cóp bằng agent; trước mắt cho tự động agent; làm sẵn chỗ dán khoá Gemini").
// - Học viên: nút "Hỏi Agent" góc phải dưới → khung 2 thẻ:
//     Hỏi đáp      trả lời CHỈ theo tài liệu khoá học, ghi nguồn thành chip bấm về đúng bài; gợi ý câu hỏi theo trang đang mở.
//     Tạo tài liệu tóm tắt · hướng dẫn ôn tập · hỏi đáp thường gặp · thẻ thuật ngữ · kế hoạch áp dụng, theo phạm vi bài / buổi / cả khoá;
//                  sao chép, in / lưu PDF.
// - TÁCH KHỎI PHẦN THI: nguồn gửi máy chủ không có câu kiểm tra, đáp án, đề tự luận, câu hỏi nhanh (câu kiểm tra chỉ gửi kèm loại "chan"
//   để máy chủ so và từ chối câu giống đề, không bao giờ đưa cho Agent); nút ẩn ở trang kiểm tra + khi đang thi; máy chủ còn kiểm cờ "đang thi"
//   ở mọi máy của người đó. Mọi câu hỏi ghi trang tính "Hỏi Agent".
// - Quản trị (trang #/quan-tri, khung "Agent khoá học"): dán / thử / xoá khoá Gemini (khoá chỉ nằm trên máy chủ), bật / tắt, mô hình
//   (mặc định Tự động), giới hạn câu / người / ngày, nguồn tài liệu (tự đồng bộ khi nội dung khoá đổi + thêm nguồn dán chữ), câu hỏi gần đây.
// - Tên hiện cho nhân sự: "Agent" (không nêu tên mô hình / hãng).
(function () {
  'use strict';
  var APP = window.KHOA_APP, C = window.CAU_HINH || {};
  if (!APP || !C.may_chu) return;
  var e = APP.e, K = APP.khoa, DS = APP.ds, QC = APP.qc || {};
  var MC = function () { return window.KHOA_MAY_CHU; };
  var $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var TT = { bat: false, co_khoa: false }, nut = null, khung = null, moKhung = false, the = 'hoi', dangGui = false, dangTao = '', conLuot = null;
  var lich = [], taiLieu = [], xemTL = -1, phamVi = '', emailDoc = '';
  var SAO = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 2.8l1.9 5.1 5.1 1.9-5.1 1.9L11 16.8l-1.9-5.1L4 9.8l5.1-1.9z"/><path d="M18.4 14.2l.9 2.4 2.4.9-2.4.9-.9 2.4-.9-2.4-2.4-.9 2.4-.9z"/></svg>';
  var GUI = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 12h13"/><path d="M12.5 6l6 6-6 6"/></svg>';

  // ================================================================ NGUỒN TÀI LIỆU (dựng từ nội dung khoá — không có phần thi)
  var tron = function (s) { return String(s == null ? '' : s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(); };
  var soBai = function (x) { return x.b.so + '.' + (x.i + 1); };
  function phang(x, ra) { // gom chữ trong khối tài liệu kèm bài (bảng, thẻ, bước…)
    if (x == null || x === '') return;
    if (typeof x === 'string' || typeof x === 'number') { var t = tron(x); if (t) ra.push(t); return; }
    if (Array.isArray(x)) {
      if (x.every(function (y) { return y == null || typeof y === 'string' || typeof y === 'number'; })) { var d = x.map(tron).filter(Boolean).join(' | '); if (d) ra.push(d); }
      else x.forEach(function (y) { phang(y, ra); });
      return;
    }
    Object.keys(x).forEach(function (k) { if (!/^(loai|hinh|id|anh|src|link|mau|lop|icon)$/.test(k)) phang(x[k], ra); });
  }
  function huongDan() {
    var p = function (n) { return Math.round(n * 100) + '%'; };
    return [
      'Đăng nhập bằng tài khoản Google công ty. Tích "Nhớ đăng nhập trên máy này" thì 30 ngày không phải đăng nhập lại; máy dùng chung thì bỏ tích.',
      'Học tuần tự: xong bài trước (xem hết video, nộp câu hỏi nhanh, bấm Hoàn thành) mới mở bài sau; đạt bài kiểm tra cuối buổi trước mới mở buổi sau.',
      'Luật xem video: không tua tới phần chưa xem (xem lại phần đã xem thì được); tốc độ 1× hoặc tối đa ' + (QC.toc_max || 1.1) + '×; chuyển tab hoặc rời trang thì video tự dừng. Video có phụ đề và bản chép lời; chọn được chất lượng hình (2K ở bài có bản 2K).',
      'Tiến độ tự lưu theo tài khoản: đăng nhập máy khác vẫn học tiếp đúng chỗ. Mỗi lần học lại một bài được ghi thành Lần 1, Lần 2, Lần 3…',
      'Câu hỏi nhanh cuối mỗi bài: chấm và giải thích ngay; sai thì làm lại, không bị trừ điểm.',
      'Kiểm tra cuối buổi: làm trong ' + (QC.kt_phut || 10) + ' phút, tối đa ' + (QC.kt_lan || 2) + ' lượt, hai lượt cách nhau ít nhất ' + (QC.kt_cach_phut || 60) + ' phút; đạt khi đúng từ ' + p(QC.kt_dat || .8) + ' số câu. ' +
        'Thứ tự câu và phương án được xáo; điểm hiện ngay khi nộp; đáp án đúng chỉ hiện khi bạn đã đạt hoặc dùng hết lượt. Số lần rời trang khi đang thi được ghi lại cho người hướng dẫn xem. Cần thêm lượt thi thì nhờ người quản lý khoá học.',
      'Điểm buổi (thang 100) = kiểm tra 70 (lấy lượt cao nhất) + chuyên cần 20 (thời gian xem video thật) + câu hỏi nhanh lần nộp đầu 10.',
      'Mỗi buổi có trang Ghi chép để bạn ghi điều nghe được, rút ra và áp dụng. Bảng thuật ngữ ở mục Thuật ngữ. Nút Góp ý ở thanh trên để gửi góp ý cho người làm khoá.',
      'Agent (trợ giảng) trả lời theo tài liệu khoá học. Agent không có đề và đáp án kiểm tra, và tạm nghỉ trong lúc bạn làm bài kiểm tra.'
    ].map(function (x) { return '- ' + x; }).join('\n');
  }
  function bam(s) { var h = 5381; for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36) + '-' + s.length.toString(36); }
  function taoNguon() {
    var nguon = [], chan = [], d = ['Khoá học: ' + K.ten, tron(K.nhan), tron(K.phu)];
    if (K.ket_qua) d.push('Học xong bạn sẽ:\n' + K.ket_qua.map(function (k) { return '- ' + tron(k.dt) + ' ' + tron(k.chu); }).join('\n'));
    if (K.cach_hoc) d.push('Cách học:\n' + K.cach_hoc.map(function (c) { return '- ' + tron(c.tieu) + ': ' + tron(c.chu); }).join('\n'));
    d.push('Lộ trình:');
    K.buoi.forEach(function (b) {
      d.push('- Buổi ' + b.so + ' · ' + tron(b.ten) + ' [' + b.id + ']: ' + tron(b.phu));
      b.bai.forEach(function (bai, i) { d.push('  - Bài ' + b.so + '.' + (i + 1) + ' · ' + tron(bai.ten) + ' [' + bai.id + ']' + (bai.phut ? ' (khoảng ' + bai.phut + ' phút)' : '')); });
    });
    if (K.thuc_hanh) d.push(tron(K.thuc_hanh.tieu) + ': ' + tron(K.thuc_hanh.chu));
    nguon.push({ ma: 'khoa', ten: tron(K.ten), loai: 'khoa', chu: d.filter(Boolean).join('\n') });
    nguon.push({ ma: 'huong-dan', ten: 'Hướng dẫn dùng web học', loai: 'huong-dan', chu: huongDan() });
    K.buoi.forEach(function (b) {
      var x = ['Buổi ' + b.so + ' · ' + tron(b.ten), tron(b.phu), 'Các bài: ' + b.bai.map(function (bai, i) { return b.so + '.' + (i + 1) + ' ' + tron(bai.ten); }).join('; ')];
      if (b.bai_tap && b.bai_tap.length) x.push('Bài tập thực hành:\n' + b.bai_tap.map(function (r) { return '- ' + (Array.isArray(r) ? r.map(tron).filter(Boolean).join(' — ') : tron(r)); }).join('\n'));
      if (b.checklist && b.checklist.length) x.push('Tự kiểm cuối buổi:\n' + b.checklist.map(function (c) { return '- ' + tron(c); }).join('\n'));
      x.push('Cuối buổi có bài kiểm tra ' + (b.kiem_tra || []).length + ' câu trắc nghiệm' + ((b.tu_luan || []).length ? ' và ' + b.tu_luan.length + ' câu tự luận' : '') + ' — Agent không có đề và đáp án.');
      nguon.push({ ma: b.id, ten: 'Buổi ' + b.so + ' · ' + tron(b.ten), loai: 'buoi', chu: x.join('\n') });
      (b.kiem_tra || []).forEach(function (q, j) { chan.push({ ma: b.id + '-kt' + (j + 1), hoi: tron(q.hoi), chon: (q.chon || []).map(tron) }); });
      (b.tu_luan || []).forEach(function (q, j) { chan.push({ ma: b.id + '-tl' + (j + 1), hoi: tron(typeof q === 'string' ? q : (q.hoi || q.chu)), chon: [] }); });
    });
    DS.forEach(function (x) {
      var bai = x.bai, d2 = ['Bài ' + soBai(x) + ' · ' + tron(bai.ten) + ' (Buổi ' + x.b.so + ' · ' + tron(x.b.ten) + ')'];
      if (bai.muc_tieu) d2.push('Mục tiêu: ' + bai.muc_tieu.map(tron).join(' '));
      if (bai.tu_duy) d2.push('Tư duy: ' + tron(bai.tu_duy));
      if (bai.ky_nang) d2.push('Kỹ năng: ' + tron(bai.ky_nang));
      if (bai.y_chinh) d2.push('Ý chính:\n' + bai.y_chinh.map(function (y) { return '- ' + tron(y); }).join('\n'));
      var loi = (bai.canh || []).map(function (c) { return tron(c && c.loi); }).filter(Boolean).join(' ');
      if (loi) d2.push('Lời giảng trong video: ' + loi);
      if (bai.khoi && bai.khoi.length) { var ra = []; bai.khoi.forEach(function (k) { phang(k, ra); }); if (ra.length) d2.push('Tài liệu kèm bài:\n' + ra.join('\n')); }
      nguon.push({ ma: bai.id, ten: 'Bài ' + soBai(x) + ' · ' + tron(bai.ten), loai: 'bai', chu: d2.join('\n') });
    });
    if (K.thuat_ngu && K.thuat_ngu.length) nguon.push({ ma: 'thuat-ngu', ten: 'Bảng thuật ngữ', loai: 'thuat-ngu', chu: K.thuat_ngu.map(function (t) { return '- ' + tron(t[0]) + ': ' + tron(t[1]); }).join('\n') });
    return { nguon: nguon, chan: chan, ma_ban: bam(JSON.stringify([nguon, chan])) };
  }

  // ================================================================ trang đang mở → ngữ cảnh + câu gợi ý
  function ngCanh() {
    var h = (location.hash || '#/').slice(1), m, x, b;
    if ((m = h.match(/^\/bai\/([\w-]+)/)) && (x = DS.filter(function (y) { return y.bai.id === m[1]; })[0])) return { loai: 'bai', id: x.bai.id, buoi: x.b.id, ten: 'Bài ' + soBai(x) + ' · ' + tron(x.bai.ten), ngan: 'bài ' + soBai(x) };
    if ((m = h.match(/^\/ghi\/(\w+)/)) && (b = K.buoi.filter(function (y) { return y.id === m[1]; })[0])) return { loai: 'buoi', id: b.id, buoi: b.id, ten: 'Buổi ' + b.so + ' · ' + tron(b.ten), ngan: 'buổi ' + b.so };
    if (h === '/thuat-ngu') return { loai: 'thuat-ngu', ten: 'Bảng thuật ngữ' };
    if (/^\/quan-tri/.test(h)) return { loai: 'khoa', ten: 'Trang Quản trị' };
    return { loai: 'khoa', ten: 'Trang khoá học' };
  }
  function goiY() {
    var c = ngCanh();
    if (c.loai === 'bai') return ['Tóm tắt ' + c.ngan + ' trong 5 ý', 'Giải thích ý chính của bài bằng ví dụ dễ hiểu', 'Bài này áp dụng vào việc làm video của mình thế nào?'];
    if (c.loai === 'buoi') return ['Buổi này mình cần nắm những gì?', 'Gợi ý cách ghi chép buổi học cho hiệu quả'];
    if (c.loai === 'thuat-ngu') return ['Thuật ngữ nào người mới cần nắm trước?', 'Giải thích "workflow" bằng ví dụ đời thường'];
    return ['Khoá học này gồm những gì?', 'Làm sao để được tính là hoàn thành một bài?', 'Bài kiểm tra cuối buổi tính điểm thế nào?'];
  }
  function dangThi() {
    if (/^#\/kiem-tra\//.test(location.hash)) return true;
    var kt = ((APP.duLieu && APP.duLieu()) || {}).kt || {};
    return Object.keys(kt).some(function (k) { return kt[k] && kt[k].dang; });
  }

  // ================================================================ lưu trên máy (theo email): cuộc trò chuyện + tài liệu đã tạo
  function khoaLuu(loai) { return 'khoa-agent-' + loai + ':' + emailDoc; }
  function napLuu() {
    var mc = MC(), em = ((mc && mc.nguoi && mc.nguoi()) || {}).email || '';
    if (em === emailDoc) return; emailDoc = em;
    try { lich = JSON.parse(localStorage.getItem(khoaLuu('chat')) || '[]') || []; } catch (x) { lich = []; }
    try { taiLieu = JSON.parse(localStorage.getItem(khoaLuu('tai-lieu')) || '[]') || []; } catch (x2) { taiLieu = []; }
  }
  function luuLich() { try { localStorage.setItem(khoaLuu('chat'), JSON.stringify(lich.slice(-40))); } catch (x) {} }
  function luuTL() { try { localStorage.setItem(khoaLuu('tai-lieu'), JSON.stringify(taiLieu.slice(0, 12))); } catch (x) {} }

  // ================================================================ chữ Agent → HTML (đậm, gạch đầu dòng, đánh số, việc cần làm, tiêu đề nhỏ, chip nguồn)
  function chipNguon(ma, ten) {
    var x = DS.filter(function (y) { return y.bai.id === ma; })[0], b;
    if (x) return '<a class="ag-ng" href="#/bai/' + e(ma) + '" title="' + e(tron(x.bai.ten)) + '">Bài ' + soBai(x) + '</a>';
    if ((b = K.buoi.filter(function (y) { return y.id === ma; })[0])) return '<a class="ag-ng" href="#/bai/' + e(b.bai[0].id) + '" title="' + e(tron(b.ten)) + '">Buổi ' + b.so + '</a>';
    if (ma === 'thuat-ngu') return '<a class="ag-ng" href="#/thuat-ngu">Thuật ngữ</a>';
    if (ma === 'khoa') return '<a class="ag-ng" href="#/">Tổng quan khoá</a>';
    if (ma === 'huong-dan') return '<span class="ag-ng">Hướng dẫn học</span>';
    return ten ? '<span class="ag-ng">' + e(ten) + '</span>' : '';
  }
  function tenNguon(ma, ten) {
    var x = DS.filter(function (y) { return y.bai.id === ma; })[0], b;
    if (x) return 'Bài ' + soBai(x); if ((b = K.buoi.filter(function (y) { return y.id === ma; })[0])) return 'Buổi ' + b.so;
    return { 'thuat-ngu': 'Thuật ngữ', khoa: 'Tổng quan khoá', 'huong-dan': 'Hướng dẫn học' }[ma] || ten || '';
  }
  function veChu(s, nt) {
    nt = nt || {};
    var ra = '', ds = '';
    var nd = function (x) {
      return e(x).replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/(^|[\s(])\*([^*\s][^*]*?)\*(?=[\s.,;:!?)]|$)/g, '$1<i>$2</i>')
        .replace(/\s*\[([\w-]+)\]/g, function (all, ma) { var c = chipNguon(ma, nt[ma]); return c ? ' ' + c : ''; });
    };
    var dong = function () { if (ds) { ra += ds === 'viec' ? '</ul>' : '</' + ds + '>'; ds = ''; } };
    var mo = function (loai) { if (ds !== loai) { dong(); ra += loai === 'viec' ? '<ul class="ag-viec">' : '<' + loai + '>'; ds = loai; } };
    String(s || '').replace(/\r/g, '').split('\n').forEach(function (d) {
      var t = d.trim(), m;
      if (!t) { dong(); return; }
      if ((m = t.match(/^#{1,4}\s+(.*)$/))) { dong(); ra += '<h4>' + nd(m[1].replace(/\*\*/g, '')) + '</h4>'; return; }
      if ((m = t.match(/^[-*•]\s+\[( |x|X)\]\s+(.*)$/))) { mo('viec'); ra += '<li><span class="ag-o" aria-hidden="true"></span><span>' + nd(m[2]) + '</span></li>'; return; }
      if ((m = t.match(/^[-*•]\s+(.*)$/))) { mo('ul'); ra += '<li>' + nd(m[1]) + '</li>'; return; }
      if ((m = t.match(/^(\d+)[.)]\s+(.*)$/))) { mo('ol'); ra += '<li>' + nd(m[2]) + '</li>'; return; }
      dong(); ra += '<p>' + nd(t) + '</p>';
    });
    dong();
    return ra;
  }
  // chữ thường để sao chép / in: mã nguồn → tên dễ đọc
  function chuTho(s, nt) { return String(s || '').replace(/\[([\w-]+)\]/g, function (a, ma) { var t = tenNguon(ma, (nt || {})[ma]); return t ? '(' + t + ')' : ''; }); }

  // ================================================================ khung Agent cho học viên
  function dung() {
    if (nut) return;
    nut = document.createElement('button'); nut.type = 'button'; nut.className = 'ag-nut'; nut.hidden = true;
    nut.setAttribute('aria-haspopup', 'dialog'); nut.innerHTML = SAO + '<span>Hỏi Agent</span>';
    nut.addEventListener('click', function () { moAgent(); });
    khung = document.createElement('section'); khung.className = 'ag-khung'; khung.hidden = true;
    khung.setAttribute('role', 'dialog'); khung.setAttribute('aria-modal', 'false'); khung.setAttribute('aria-labelledby', 'ag-tieu');
    khung.innerHTML =
      '<header class="ag-dau"><span class="ag-bieu">' + SAO + '</span><span class="ag-ten"><b id="ag-tieu">Agent khoá học</b><small>Trả lời theo tài liệu của khoá</small></span>' +
        '<button type="button" class="ag-nho" data-ag="moi" title="Bắt đầu cuộc trò chuyện mới">Cuộc mới</button>' +
        '<button type="button" class="ag-x" data-ag="dong" aria-label="Đóng Agent" title="Đóng (Esc)">×</button></header>' +
      '<div class="ag-the" role="tablist"><button type="button" role="tab" data-the="hoi" aria-selected="true">Hỏi đáp</button><button type="button" role="tab" data-the="tl" aria-selected="false">Tạo tài liệu</button></div>' +
      '<div class="ag-than ag-than-hoi" data-o="hoi"><div class="ag-ds"></div>' +
        '<form class="ag-go"><textarea rows="1" maxlength="2000" placeholder="Hỏi về bài học, cách học…" aria-label="Câu hỏi cho Agent"></textarea>' +
        '<button type="submit" class="ag-gui" aria-label="Gửi câu hỏi" title="Gửi (Enter)">' + GUI + '</button></form>' +
        '<p class="ag-chan"><span>Agent có thể nhầm — đối chiếu với bài học.</span><span class="ag-luot"></span></p></div>' +
      '<div class="ag-than ag-than-tl" data-o="tl" hidden></div>';
    document.body.appendChild(nut); document.body.appendChild(khung);
    var go = $('.ag-go', khung), o = $('textarea', go);
    go.addEventListener('submit', function (ev) { ev.preventDefault(); var c = o.value; o.value = ''; coDan(o); hoi(c); });
    o.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' && !ev.shiftKey && !ev.isComposing) { ev.preventDefault(); go.requestSubmit ? go.requestSubmit() : go.dispatchEvent(new Event('submit')); } });
    o.addEventListener('input', function () { coDan(o); });
    khung.addEventListener('click', function (ev) {
      var t = ev.target.closest('[data-ag],[data-the],[data-hoi],[data-chep],[data-kieu],[data-xem],[data-tl],a.ag-ng'); if (!t) return;
      if (t.matches('a.ag-ng')) { if (window.matchMedia('(max-width: 640px)').matches) dongAgent(); return; }
      var ag = t.getAttribute('data-ag');
      if (ag === 'dong') dongAgent();
      else if (ag === 'moi') { if (!lich.length || confirm('Bắt đầu cuộc trò chuyện mới? Cuộc hiện tại sẽ bị xoá khỏi máy này.')) { lich = []; luuLich(); veDs(); $('textarea', khung).focus(); } }
      else if (t.hasAttribute('data-the')) doiThe(t.getAttribute('data-the'));
      else if (t.hasAttribute('data-hoi')) hoi(t.getAttribute('data-hoi'));
      else if (t.hasAttribute('data-chep')) { var m = lich[+t.getAttribute('data-chep')]; if (m) chep(chuTho(m.chu, m.nguon_ten), t); }
      else if (t.hasAttribute('data-kieu')) taoTL(t.getAttribute('data-kieu'));
      else if (t.hasAttribute('data-xem')) { xemTL = +t.getAttribute('data-xem'); veTL(); }
      else if (t.getAttribute('data-tl') === 'lui') { xemTL = -1; veTL(); }
      else if (t.getAttribute('data-tl') === 'chep') { var d = taiLieu[xemTL]; if (d) chep(d.tieu + '\n\n' + chuTho(d.chu, d.nguon_ten), t); }
      else if (t.getAttribute('data-tl') === 'in') inTL(taiLieu[xemTL]);
      else if (t.getAttribute('data-tl') === 'xoa') { if (confirm('Xoá tài liệu này khỏi máy?')) { taiLieu.splice(xemTL, 1); xemTL = -1; luuTL(); veTL(); } }
    });
    khung.addEventListener('change', function (ev) { if (ev.target.matches('.ag-pv select')) phamVi = ev.target.value; });
    document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && moKhung && !ev.defaultPrevented) { dongAgent(); nut.focus(); } });
    window.addEventListener('hashchange', function () { capNhat(); if (moKhung) { if (!lich.length) veDs(); if (the === 'tl' && xemTL < 0 && !dangTao) veTL(); } });
  }
  // không che thanh điều khiển video / trình chiếu (nút tốc độ, phụ đề, chất lượng ở góc phải): chạm thì thu thành vòng tròn và nhích lên trên thanh
  var henCanh = 0;
  function canhNut() {
    henCanh = 0; if (!nut || nut.hidden) return;
    nut.classList.remove('ag-gon'); nut.style.bottom = '';
    var r = nut.getBoundingClientRect(), chong = null;
    $$('.trinh .dk').forEach(function (d) { var q = d.getBoundingClientRect(); if (q.width && q.right > r.left - 8 && q.left < r.right + 8 && q.bottom > r.top - 8 && q.top < r.bottom + 8) chong = q; });
    if (!chong) return;
    nut.classList.add('ag-gon'); nut.style.bottom = Math.max(12, Math.round(window.innerHeight - chong.top + 10)) + 'px';
  }
  function henCanhNut() { if (!henCanh) henCanh = requestAnimationFrame(canhNut); }
  window.addEventListener('scroll', henCanhNut, { passive: true });
  window.addEventListener('resize', henCanhNut);
  function coDan(o) { o.style.height = 'auto'; o.style.height = Math.min(140, o.scrollHeight) + 'px'; }
  function capNhat() {
    if (!nut) return;
    var mc = MC(), hien = !!(mc && mc.daVao() && (TT.bat || (mc.laQuanTri() && TT.co_khoa)) && !dangThi() && !document.documentElement.classList.contains('chua-dang-nhap'));
    nut.hidden = !hien || moKhung;
    if (!hien && moKhung) dongAgent();
    if (!nut.hidden) { henCanhNut(); setTimeout(henCanhNut, 400); }
  }
  function moAgent(cau) {
    dung(); napLuu();
    if (dangThi()) return;
    moKhung = true; khung.hidden = false; nut.hidden = true; document.documentElement.classList.add('ag-dang-mo');
    doiThe(the);
    setTimeout(function () { var o = $('textarea', khung); if (the === 'hoi' && o) o.focus(); }, 60);
    if (cau) hoi(cau);
  }
  function dongAgent() { if (!khung) return; moKhung = false; khung.hidden = true; document.documentElement.classList.remove('ag-dang-mo'); capNhat(); }
  function doiThe(t) {
    the = t;
    $$('[data-the]', khung).forEach(function (b) { b.setAttribute('aria-selected', String(b.getAttribute('data-the') === t)); });
    $$('.ag-than', khung).forEach(function (o) { o.hidden = o.getAttribute('data-o') !== t; });
    if (t === 'hoi') veDs(); else veTL();
  }
  function tenGoi(t) { var p = String(t || '').trim().split(/\s+/); return p.length ? p[p.length - 1] : 'bạn'; }
  function veDs() {
    var ds = $('.ag-ds', khung), ng = (MC() && MC().nguoi()) || {};
    ds.innerHTML = '<div class="ag-tn ag-agent"><div class="ag-bong"><p>Chào ' + e(tenGoi(ng.ten)) + '! Mình là <b>Agent</b> của khoá học. Bạn hỏi về bài học, cách học hay luật kiểm tra — mình trả lời theo tài liệu khoá và chỉ rõ bài để bạn xem lại.</p></div></div>' +
      lich.map(function (m, i) {
        if (m.vai === 'nguoi') return '<div class="ag-tn ag-nguoi"><div class="ag-bong">' + e(m.chu).replace(/\n/g, '<br>') + '</div></div>';
        if (m.loi) return '<div class="ag-tn ag-agent"><div class="ag-bong ag-bao">' + e(m.chu) + '</div></div>';
        return '<div class="ag-tn ag-agent"><div class="ag-bong">' + veChu(m.chu, m.nguon_ten) + '<div class="ag-hd"><button type="button" data-chep="' + i + '">Sao chép</button></div></div></div>';
      }).join('') +
      (dangGui ? '<div class="ag-tn ag-agent"><div class="ag-bong ag-cho" aria-label="Agent đang trả lời"><i></i><i></i><i></i></div></div>' : '') +
      (!lich.length && !dangGui ? '<div class="ag-goi">' + goiY().map(function (g) { return '<button type="button" data-hoi="' + e(g) + '">' + e(g) + '</button>'; }).join('') + '</div>' : '');
    ds.scrollTop = ds.scrollHeight;
    veLuot();
  }
  function veLuot() { var o = khung && $('.ag-luot', khung); if (o) o.textContent = conLuot == null ? '' : 'Còn ' + conLuot + ' lượt hôm nay'; }
  function loiChu(kq) {
    var l = (kq && kq.loi) || '';
    if (l === 'dang-thi') return 'Bạn đang làm bài kiểm tra nên Agent tạm nghỉ. Nộp bài xong mình lại hỗ trợ bạn nhé — chúc bạn làm tốt!';
    if (l === 'giong-de') return 'Câu này giống câu trong bài kiểm tra, nên Agent không trả lời thay bạn. Bạn hỏi mình về khái niệm, hoặc nhờ tóm tắt bài liên quan thì được nhé.';
    if (l === 'het-luot') return 'Hôm nay bạn đã dùng hết ' + (kq.gioi_han || '') + ' lượt hỏi Agent. Mai quay lại nhé!';
    if (l === 'tat') return 'Agent đang tạm tắt.';
    if (l === 'chua-khoa') return 'Agent chưa sẵn sàng — người quản lý khoá học chưa cài đặt xong.';
    if (l === 'chua-nguon') return 'Agent chưa có tài liệu khoá học — người quản lý khoá học cần mở trang Quản trị một lần để nạp.';
    if (l === 'gemini') return kq.chi_tiet === 'khoa-sai' ? 'Agent đang gặp lỗi cài đặt — báo người quản lý khoá học giúp mình nhé.' : 'Agent đang bận, bạn thử lại sau ít phút nhé.';
    if (l === 'phien' || l === 've') return 'Phiên đăng nhập đã hết hạn — đăng nhập lại rồi hỏi tiếp nhé.';
    return 'Chưa hỏi được' + (l ? ' (' + l + ')' : '') + ' — thử lại nhé.';
  }
  function hoi(cau) {
    cau = String(cau || '').trim(); if (!cau || dangGui) return;
    if (dangThi()) { dongAgent(); return; }
    var lichSu = lich.filter(function (m) { return !m.loi; }).slice(-8).map(function (m) { return { vai: m.vai, chu: m.chu }; });
    var c = ngCanh();
    lich.push({ vai: 'nguoi', chu: cau, luc: Date.now() }); dangGui = true; luuLich(); veDs();
    MC().goi('agent-hoi', { cau: cau, lich_su: lichSu, trang: { ten: c.ten, ma: c.id || c.loai } }).then(function (kq) {
      dangGui = false;
      if (kq && kq.ok) { lich.push({ vai: 'agent', chu: kq.tra_loi, nguon_ten: kq.nguon_ten || {}, luc: Date.now() }); conLuot = kq.con_luot; }
      else { lich.push({ vai: 'agent', loi: true, chu: loiChu(kq), luc: Date.now() }); if (kq && kq.con_luot != null) conLuot = kq.con_luot; if (kq && kq.loi === 'het-luot') conLuot = 0; }
      luuLich(); if (moKhung) veDs();
    }).catch(function () { dangGui = false; lich.push({ vai: 'agent', loi: true, chu: 'Mất kết nối — kiểm tra mạng rồi hỏi lại nhé.', luc: Date.now() }); luuLich(); if (moKhung) veDs(); });
  }
  function chep(s, n) {
    var xong = function () { var cu = n.textContent; n.textContent = 'Đã chép ✓'; setTimeout(function () { n.textContent = cu; }, 1400); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(s).then(xong, function () { chepCu(s); xong(); }); else { chepCu(s); xong(); }
  }
  function chepCu(s) { var t = document.createElement('textarea'); t.value = s; t.style.position = 'fixed'; t.style.opacity = '0'; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch (x) {} t.remove(); }

  // ---------------- Tạo tài liệu
  var KIEU = [
    ['tom-tat', 'Tóm tắt', 'Ý chính gọn trong một trang'],
    ['on-tap', 'Hướng dẫn ôn tập', 'Khái niệm cần nắm + câu hỏi tự kiểm'],
    ['hoi-dap', 'Hỏi đáp thường gặp', 'Thắc mắc hay gặp, trả lời ngắn'],
    ['thuat-ngu', 'Thẻ thuật ngữ', 'Giải nghĩa từng thuật ngữ, có ví dụ'],
    ['ap-dung', 'Kế hoạch áp dụng', 'Việc nên làm ngay tuần này']
  ];
  var BIEU_KIEU = {
    'tom-tat': '<path d="M5 6.5h14M5 11h14M5 15.5h9"/>',
    'on-tap': '<path d="M12 6.5c-2-1.4-4.6-1.8-7-1.2v12.2c2.4-.6 5-.2 7 1.2 2-1.4 4.6-1.8 7-1.2V5.3c-2.4-.6-5-.2-7 1.2z"/><path d="M12 6.5v12.2"/>',
    'hoi-dap': '<path d="M5.5 6.5h13v8.5h-7.5l-4 3.2V15h-1.5z"/><path d="M10.2 9.5a1.9 1.9 0 1 1 2.6 1.8c-.5.2-.8.6-.8 1.1v.3"/>',
    'thuat-ngu': '<rect x="4.5" y="5.5" width="11" height="13" rx="1.6"/><path d="M8.5 3.5h10.5a1.5 1.5 0 0 1 1.5 1.5v12"/><path d="M7.5 9.5h5M7.5 12.5h5"/>',
    'ap-dung': '<path d="M5.5 7l1.8 1.8 3-3.3"/><path d="M5.5 13.5l1.8 1.8 3-3.3"/><path d="M13 7.5h6M13 14h6"/>'
  };
  function luaChon() {
    var c = ngCanh(), mac = phamVi || (c.loai === 'bai' ? 'bai:' + c.id : c.loai === 'buoi' ? 'buoi:' + c.id : 'khoa');
    var op = function (v, t) { return '<option value="' + v + '"' + (v === mac ? ' selected' : '') + '>' + e(t) + '</option>'; };
    return '<option value="khoa"' + (mac === 'khoa' ? ' selected' : '') + '>Cả khoá học</option>' + K.buoi.map(function (b) {
      return '<optgroup label="Buổi ' + b.so + ' · ' + e(tron(b.ten)) + '">' + op('buoi:' + b.id, 'Cả Buổi ' + b.so) +
        b.bai.map(function (bai, i) { return op('bai:' + bai.id, 'Bài ' + b.so + '.' + (i + 1) + ' · ' + tron(bai.ten)); }).join('') + '</optgroup>';
    }).join('');
  }
  function docPhamVi(v) {
    var p = String(v || 'khoa').split(':'), x, b;
    if (p[0] === 'bai' && (x = DS.filter(function (y) { return y.bai.id === p[1]; })[0])) return { loai: 'bai', id: p[1], ten: 'Bài ' + soBai(x) + ' · ' + tron(x.bai.ten) };
    if (p[0] === 'buoi' && (b = K.buoi.filter(function (y) { return y.id === p[1]; })[0])) return { loai: 'buoi', id: p[1], ten: 'Buổi ' + b.so + ' · ' + tron(b.ten) };
    return { loai: 'khoa', id: '', ten: 'Cả khoá học' };
  }
  function gioNgan(t) { var d = new Date(t), h = function (n) { return ('0' + n).slice(-2); }; return h(d.getHours()) + ':' + h(d.getMinutes()) + ' ' + h(d.getDate()) + '/' + h(d.getMonth() + 1); }
  function veTL(bao) {
    var o = $('[data-o="tl"]', khung); if (!o) return;
    var d = taiLieu[xemTL];
    if (xemTL >= 0 && d) {
      o.innerHTML = '<div class="ag-tl-thanh"><button type="button" class="ag-nho" data-tl="lui">← Tài liệu</button><span class="gian"></span>' +
        '<button type="button" class="ag-nho" data-tl="chep">Sao chép</button><button type="button" class="ag-nho" data-tl="in">In / Lưu PDF</button><button type="button" class="ag-nho" data-tl="xoa" aria-label="Xoá tài liệu">Xoá</button></div>' +
        '<article class="ag-tl-bai"><span class="ag-tl-nhan">' + e(d.kieu_ten) + ' · ' + e(d.pham_vi.ten) + '</span><h3>' + e(d.tieu) + '</h3>' + veChu(d.chu, d.nguon_ten) + '</article>';
      o.scrollTop = 0; return;
    }
    xemTL = -1;
    o.innerHTML = '<label class="ag-pv"><span>Phạm vi</span><select>' + luaChon() + '</select></label>' +
      '<div class="ag-kieu">' + KIEU.map(function (k) { return '<button type="button" data-kieu="' + k[0] + '"' + (dangTao ? ' disabled' : '') + '><i aria-hidden="true"><svg viewBox="0 0 24 24">' + BIEU_KIEU[k[0]] + '</svg></i><span><b>' + k[1] + '</b><small>' + k[2] + '</small></span></button>'; }).join('') + '</div>' +
      (dangTao ? '<p class="ag-dang-tao"><span class="ag-cho"><i></i><i></i><i></i></span>Agent đang soạn ' + e(dangTao) + '…</p>' : '') +
      (bao ? '<p class="ag-tl-loi" role="alert">' + e(bao) + '</p>' : '') +
      (taiLieu.length ? '<h4 class="ag-tl-tieu">Tài liệu đã tạo</h4><ul class="ag-tl-ds">' + taiLieu.map(function (t, i) { return '<li><button type="button" data-xem="' + i + '"><b>' + e(t.kieu_ten) + '</b><small>' + e(t.pham_vi.ten) + ' · ' + gioNgan(t.luc) + '</small></button></li>'; }).join('') + '</ul>'
        : '<p class="ag-tl-trong">Chọn phạm vi rồi bấm một loại tài liệu. Agent soạn từ đúng nội dung khoá học, có ghi nguồn bài để bạn mở lại.</p>');
  }
  function taoTL(kieu) {
    if (dangTao || dangThi()) return;
    var sel = $('.ag-pv select', khung), pv = docPhamVi(sel ? sel.value : phamVi), k = KIEU.filter(function (x) { return x[0] === kieu; })[0];
    phamVi = sel ? sel.value : phamVi; dangTao = k[1].toLowerCase() + ' · ' + pv.ten; veTL();
    MC().goi('agent-tai-lieu', { kieu: kieu, pham_vi: pv, trang: { ten: ngCanh().ten } }).then(function (kq) {
      dangTao = '';
      if (kq && kq.ok) {
        taiLieu.unshift({ kieu: kieu, kieu_ten: k[1], pham_vi: pv, tieu: k[1] + ' — ' + pv.ten, chu: kq.tra_loi, nguon_ten: kq.nguon_ten || {}, luc: Date.now() });
        luuTL(); if (kq.con_luot != null) conLuot = kq.con_luot; xemTL = 0; veTL(); veLuot();
      } else veTL(loiChu(kq));
    }).catch(function () { dangTao = ''; veTL('Mất kết nối — thử lại nhé.'); });
  }
  function inTL(d) {
    if (!d) return;
    var w = window.open('', '_blank'); if (!w) { alert('Trình duyệt chặn cửa sổ in — cho phép cửa sổ bật lên rồi thử lại.'); return; }
    w.document.write('<!doctype html><html lang="vi"><meta charset="utf-8"><title>' + e(d.tieu) + '</title><style>body{font:15px/1.65 "Be Vietnam Pro","Segoe UI",system-ui,sans-serif;color:#2E312F;max-width:720px;margin:40px auto;padding:0 24px}' +
      'h1{font-size:24px;letter-spacing:-.02em;margin:4px 0 18px}h4{font-size:16px;margin:22px 0 6px;color:#1F714B}.nhan{font:600 11px/1.5 Consolas,monospace;letter-spacing:.14em;text-transform:uppercase;color:#1F714B}' +
      'ul,ol{padding-left:22px}li{margin:4px 0}.ag-ng{font-size:12px;color:#1F714B;text-decoration:none;border:1px solid #CFE7D8;border-radius:999px;padding:0 7px;white-space:nowrap}.ag-viec{list-style:none;padding-left:0}.ag-viec li{display:flex;gap:10px}.ag-o{flex:none;width:14px;height:14px;border:1.5px solid #1F714B;border-radius:4px;margin-top:5px}' +
      'footer{margin-top:36px;padding-top:12px;border-top:1px solid #E3E3DF;font-size:12px;color:#6B6B6D}</style>' +
      '<span class="nhan">' + e(d.kieu_ten) + ' · ' + e(d.pham_vi.ten) + '</span><h1>' + e(d.tieu) + '</h1>' + veChu(d.chu, d.nguon_ten) +
      '<footer>' + e(K.ten) + ' · Nền tảng đào tạo Hecatech · Agent soạn lúc ' + gioNgan(d.luc) + ' — đối chiếu với bài học khi cần.</footer></html>');
    w.document.close(); w.focus(); setTimeout(function () { try { w.print(); } catch (x) {} }, 300);
  }

  // ================================================================ khung quản trị (trang #/quan-tri)
  // trang Quản trị vẽ lại cả trang khi sắp xếp / lọc / đổi quyền → khung Agent là phần tử mới: luôn vẽ vào khung ĐANG HIỆN (qtO),
  // chỉ tải cài đặt 1 lần (qtDangTai), trả lời về muộn cũng vẽ vào khung đang hiện
  var qtTT = null, qtNk = null, qtTuDong = false, qtO = null, qtDangTai = null;
  function veQuanTri(o, bao, loiBao) {
    if (o) qtO = o; o = qtO;
    if (!o || !document.contains(o)) return;
    if (!qtTT) { o.innerHTML = '<h2 id="qt-ag-tieu">Agent khoá học</h2><p class="phu">Đang tải cài đặt Agent…</p>'; taiQT(); return; }
    var t = qtTT, mc = function (v, ten) { return '<option value="' + e(v) + '"' + (t.mo_hinh === v ? ' selected' : '') + '>' + e(ten) + '</option>'; };
    var ngMoi = taoNguon(), khop = t.nguon_ma === ngMoi.ma_ban;
    var chipNg = function (x) { return '<li class="ag-qt-ng ag-qt-ng-' + e(x.loai) + '"><span>' + e(x.ten) + '</span><small>' + Math.max(1, Math.round(x.do_dai / 1000)) + 'k chữ</small>' + (x.loai === 'them' ? '<button type="button" data-ag-bo="' + e(x.ma) + '" aria-label="Bỏ nguồn ' + e(x.ten) + '">×</button>' : '') + '</li>'; };
    o.innerHTML = '<div class="ag-qt-dau"><h2 id="qt-ag-tieu">Agent khoá học</h2><span class="qt-chip ' + (t.bat && t.co_khoa ? 'qt-dang' : 'qt-chua') + '">' + (t.co_khoa ? (t.bat ? 'Đang bật cho học viên' : 'Đang tắt với học viên') : 'Chưa có khoá') + '</span>' +
        '<span class="gian"></span><span class="ag-qt-so"><b>' + (t.hom_nay || 0) + '</b> câu hỏi hôm nay</span></div>' +
      '<p class="phu">Học viên hỏi đáp và tạo tài liệu (tóm tắt, ôn tập, hỏi đáp, thuật ngữ, kế hoạch áp dụng). Agent chỉ trả lời theo tài liệu khoá học, có ghi nguồn bài. ' +
        '<b>Tách khỏi phần thi:</b> Agent không có đề và đáp án; tự nghỉ khi người học đang thi (ở bất kỳ máy nào); từ chối câu giống đề kiểm tra hoặc dạng trắc nghiệm A/B/C; mọi câu hỏi ghi vào trang tính "Hỏi Agent".</p>' +
      '<div class="ag-qt-luoi">' +
        '<div class="ag-qt-o"><h3>Khoá Gemini</h3>' +
          '<p class="ag-qt-tt">' + (t.co_khoa ? '<span class="qt-tt qt-tt-xanh" aria-hidden="true"></span>Đã có khoá, đuôi <code>…' + e(t.khoa_duoi) + '</code>' : '<span class="qt-tt qt-tt-vang" aria-hidden="true"></span>Chưa có khoá — dán khoá để bật Agent') + '</p>' +
          '<form class="ag-qt-khoa" autocomplete="off"><input type="password" name="khoa" autocomplete="new-password" spellcheck="false" placeholder="' + (t.co_khoa ? 'Dán khoá mới để thay' : 'Dán khoá Gemini (dạng AIza…)') + '" aria-label="Khoá Gemini">' +
            '<button type="submit" class="nut chinh">Lưu khoá</button></form>' +
          (t.co_khoa ? '<div class="ag-qt-hang"><button type="button" class="nut" data-ag="thu">Thử khoá</button><button type="button" class="nut" data-ag="xoa-khoa">Xoá khoá</button></div>' : '') +
          '<p class="ag-qt-ghi">Khoá chỉ lưu trên máy chủ — web, Google Sheet và nhật ký không bao giờ hiện lại (chỉ 4 ký tự cuối). Lấy khoá ở Google AI Studio → Get API key.</p></div>' +
        '<div class="ag-qt-o"><h3>Cài đặt</h3>' +
          '<label class="qt-chon"><input type="checkbox" data-ag="bat"' + (t.bat ? ' checked' : '') + '> Bật Agent cho học viên</label>' +
          '<label class="ag-qt-truong"><span>Mô hình</span><select data-ag="mo-hinh">' + mc('tu-dong', 'Tự động (khuyên dùng) — mô hình bận thì tự chuyển') + (t.chuoi || []).map(function (m) { return mc(m, m); }).join('') + '</select></label>' +
          '<label class="ag-qt-truong"><span>Mỗi học viên tối đa</span><span class="ag-qt-so-o"><input type="number" min="1" max="500" step="1" data-ag="gioi-han" value="' + e(t.gioi_han) + '"> câu / ngày</span></label>' +
          '<p class="ag-qt-ghi">Người quản trị không bị giới hạn và vẫn hỏi được khi Agent đang tắt với học viên (để thử).</p></div>' +
        '<div class="ag-qt-o ag-qt-rong"><h3>Nguồn tài liệu <small>' + (t.nguon || []).length + ' nguồn · ' + (t.so_chan || 0) + ' câu kiểm tra chỉ dùng để chặn</small></h3>' +
          '<p class="ag-qt-tt">' + (khop ? '<span class="qt-tt qt-tt-xanh" aria-hidden="true"></span>Khớp với nội dung khoá học hiện tại' + (t.nguon_luc ? ' · đồng bộ ' + e(t.nguon_luc) : '') : '<span class="qt-tt qt-tt-vang" aria-hidden="true"></span>Nội dung khoá đã đổi — đang / cần đồng bộ lại') + '</p>' +
          '<ul class="ag-qt-ds-ng">' + (t.nguon || []).map(chipNg).join('') + '</ul>' +
          '<div class="ag-qt-hang"><button type="button" class="nut" data-ag="dong-bo">↻ Đồng bộ lại từ nội dung khoá</button></div>' +
          '<details class="ag-qt-them"><summary>+ Thêm nguồn tự dán (quy định, hướng dẫn nội bộ…)</summary><form><input type="text" maxlength="200" placeholder="Tên nguồn, ví dụ: Quy định nộp video tuần" aria-label="Tên nguồn">' +
            '<textarea rows="5" maxlength="49000" placeholder="Dán nội dung — Agent sẽ trả lời theo cả nguồn này" aria-label="Nội dung nguồn"></textarea><button type="submit" class="nut chinh">Thêm nguồn</button></form></details></div>' +
        '<div class="ag-qt-o ag-qt-rong"><h3>Câu hỏi gần đây' + (qtNk ? ' <small>' + qtNk.tong + ' câu từ trước tới nay</small>' : '') + '</h3><div class="ag-qt-nk">' +
          (qtNk ? veNk() : '<button type="button" class="nut" data-ag="nk">Xem 150 câu gần nhất</button>') + '</div></div>' +
      '</div><p class="qt-bao ag-qt-bao' + (loiBao ? ' loi' : '') + '" role="status" aria-live="polite">' + e(bao || '') + '</p>';
    ganQT(o);
    if (!khop && !qtTuDong) { qtTuDong = true; dongBo(true); }
  }
  function veNk() {
    if (!qtNk.ds.length) return '<p class="phu">Chưa có câu hỏi nào.</p>';
    return '<ul class="ag-qt-nk-ds">' + qtNk.ds.map(function (r) {
      var kq = r['Kết quả'] || '', lop = /^Đã/.test(kq) ? 'qt-dat' : /^Chặn/.test(kq) ? 'qt-chua' : 'qt-loi-chip';
      return '<li><div class="ag-qt-nk-dau"><b>' + e(r['Họ tên'] || r['Email']) + '</b><small>' + e(r['Lúc']) + (r['Trang'] ? ' · ' + e(r['Trang']) : '') + '</small><span class="qt-chip ' + lop + '">' + e(kq) + '</span></div>' +
        '<p class="ag-qt-nk-hoi">' + (r['Việc'] && r['Việc'] !== 'Hỏi' ? '<span class="qt-chip qt-mo">' + e(r['Việc']) + '</span> ' : '') + e(r['Câu hỏi']) + '</p>' +
        (r['Trả lời'] ? '<details><summary>Agent trả lời</summary><div class="ag-qt-nk-tl">' + veChu(r['Trả lời']) + '</div></details>' : '') + '</li>';
    }).join('') + '</ul>';
  }
  function taiQT() {
    if (qtDangTai) return;
    var loiO = function (chu) { qtDangTai = null; if (qtO && document.contains(qtO)) qtO.innerHTML = '<h2 id="qt-ag-tieu">Agent khoá học</h2><p class="qt-loi">' + chu + '</p>'; };
    qtDangTai = MC().goi('agent-cai-dat').then(function (kq) {
      if (!kq || !kq.ok) { loiO(kq && kq.loi === 'loai' ? 'Máy chủ chưa lên bản có Agent (bản 6) — cần triển khai lại Apps Script.' : 'Chưa tải được cài đặt Agent (' + e((kq && kq.loi) || 'lỗi') + ').'); return; }
      qtDangTai = null; qtTT = kq; veQuanTri();
    }).catch(function () { loiO('Không kết nối được máy chủ.'); });
  }
  function guiQT(loai, them, xong, loiMap) {
    if (qtO) { $$('button, input, select, textarea', qtO).forEach(function (b) { b.disabled = true; }); var b = $('.ag-qt-bao', qtO); if (b) { b.textContent = 'Đang lưu…'; b.className = 'qt-bao ag-qt-bao'; } }
    return MC().goi(loai, them || {}).then(function (kq) {
      if (kq && kq.ok && kq.nguon) qtTT = kq;
      if (kq && kq.ok) { veQuanTri(null, typeof xong === 'function' ? xong(kq) : xong); TT.co_khoa = qtTT.co_khoa; TT.bat = qtTT.bat && qtTT.co_khoa; capNhat(); }
      else veQuanTri(null, (loiMap && kq && loiMap[kq.loi]) || 'Chưa làm được (' + ((kq && kq.loi) || 'lỗi') + ') — thử lại.', true);
      return kq;
    }).catch(function () { veQuanTri(null, 'Mất kết nối — thử lại.', true); });
  }
  function dongBo(tuDong) {
    guiQT('agent-nguon', taoNguon(), function (kq) { return (tuDong ? 'Đã tự đồng bộ ' : 'Đã đồng bộ ') + kq.nguon.length + ' nguồn từ nội dung khoá học.'; });
  }
  function ganQT(o) {
    var f = $('.ag-qt-khoa', o);
    f.addEventListener('submit', function (ev) {
      ev.preventDefault(); var k = f.khoa.value.trim();
      if (!k) { f.khoa.focus(); return; }
      if (!/^[\w-]{20,200}$/.test(k)) { veQuanTri(o, 'Khoá không đúng dạng — dán nguyên khoá, không dấu cách.', true); return; }
      guiQT('agent-cai-dat', { dat: { khoa: k } }, 'Đã lưu khoá (đuôi …' + k.slice(-4) + '). Bấm "Thử khoá" để kiểm tra.', { 'khoa-dang': 'Khoá không đúng dạng.' });
    });
    var bat = $('[data-ag="bat"]', o); if (bat) bat.addEventListener('change', function () { guiQT('agent-cai-dat', { dat: { bat: bat.checked } }, bat.checked ? 'Đã bật Agent cho học viên.' : 'Đã tắt Agent với học viên.'); });
    var mh = $('[data-ag="mo-hinh"]', o); if (mh) mh.addEventListener('change', function () { guiQT('agent-cai-dat', { dat: { mo_hinh: mh.value } }, 'Đã đổi mô hình: ' + (mh.value === 'tu-dong' ? 'Tự động' : mh.value) + '.'); });
    var gh = $('[data-ag="gioi-han"]', o); if (gh) gh.addEventListener('change', function () { var v = Math.round(+gh.value); if (!(v >= 1 && v <= 500)) { veQuanTri(o, 'Giới hạn từ 1 đến 500 câu.', true); return; } guiQT('agent-cai-dat', { dat: { gioi_han: v } }, 'Mỗi học viên tối đa ' + v + ' câu / ngày.'); });
    if (!o._agGan) o._agGan = true, o.addEventListener('click', function (ev) {
      var t = ev.target.closest('[data-ag],[data-ag-bo]'); if (!t || t.disabled || !o.contains(t)) return;
      var a = t.getAttribute('data-ag');
      if (a === 'thu') {
        guiQT('agent-thu', {}, function (kq) { return 'Khoá dùng được ✓ — ' + kq.mo_hinh + ' trả lời sau ' + (Math.round(kq.ms / 100) / 10) + ' giây.'; },
          { 'khoa-sai': 'Khoá không dùng được (Google từ chối) — kiểm tra lại khoá.', 'qua-tai': 'Các mô hình đang bận / hết lượt — thử lại sau ít phút.', 'mo-hinh': 'Không mô hình nào trong danh sách dùng được với khoá này.' });
      } else if (a === 'xoa-khoa') { if (confirm('Xoá khoá Gemini khỏi máy chủ? Agent sẽ ngừng trả lời tới khi dán khoá mới.')) guiQT('agent-cai-dat', { dat: { khoa: '' } }, 'Đã xoá khoá — Agent ngừng trả lời.'); }
      else if (a === 'dong-bo') dongBo(false);
      else if (a === 'nk') { t.disabled = true; t.textContent = 'Đang tải…'; MC().goi('agent-nhat-ky').then(function (kq) { if (kq && kq.ok) { qtNk = kq; veQuanTri(o); } else veQuanTri(o, 'Chưa tải được câu hỏi gần đây.', true); }).catch(function () { veQuanTri(o, 'Mất kết nối.', true); }); }
      else if (t.hasAttribute('data-ag-bo')) { if (confirm('Bỏ nguồn này? Agent sẽ không trả lời theo nó nữa.')) guiQT('agent-bo-nguon', { ma: t.getAttribute('data-ag-bo') }, 'Đã bỏ nguồn.'); }
    });
    var ft = $('.ag-qt-them form', o);
    ft.addEventListener('submit', function (ev) {
      ev.preventDefault(); var ten = $('input', ft).value.trim(), chu = $('textarea', ft).value.trim();
      if (!ten || chu.length < 20) { veQuanTri(o, 'Nhập tên nguồn và nội dung (ít nhất 20 chữ).', true); return; }
      guiQT('agent-them-nguon', { ten: ten, chu: chu }, 'Đã thêm nguồn "' + ten + '".', { 'nguon-trong': 'Nhập tên nguồn và nội dung (ít nhất 20 chữ).' });
    });
  }

  // ================================================================ nối với dang-nhap.js (mỗi lần máy chủ trả lời có kq.agent) + quan-tri.js
  window.KHOA_AGENT = {
    dat: function (a) { TT.bat = !!a.bat; if (typeof a.co_khoa === 'boolean') TT.co_khoa = a.co_khoa; dung(); napLuu(); capNhat(); },
    veQuanTri: veQuanTri, taoNguon: taoNguon, mo: moAgent
  };
  setInterval(function () { if (nut) capNhat(); }, 4000); // bắt đầu / nộp bài thi, đăng nhập lại… không đổi địa chỉ trang
})();
