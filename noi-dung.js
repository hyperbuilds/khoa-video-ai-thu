// Khoá nền tảng "Làm video bán hàng bằng AI" — NỘI DUNG (03/11/2026).
// Mỗi bài: mục tiêu (Bloom) · tư duy + kỹ năng · lời thuyết minh theo cảnh (motion) · ý chính · khối tài liệu · kiểm tra nhanh.
// Số liệu: Dashboard Video AI (đọc 03/11/2026), biên bản họp Team AI 02/11/2026, form target 2 nhóm, 89 bài thu hoạch 19/10–02/11.
// Luật nhân sự: không lệnh, không tên tệp, không tên người; trợ lý gọi là "Agent"; bài tập trong giờ hành chính.
window.KHOA = {
  ma: 'nguyen-ly-video-ai',
  ban: '03/11/2026',
  ten: 'Làm video bán hàng bằng AI',
  nhan: 'Khoá nền tảng · 3 buổi nguyên lý + 2 buổi thực hành',
  phu: 'Phần 1 không bấm nút, không câu lệnh: hiểu vì sao workflow AI nhanh hơn và trúng hơn, nghĩ kịch bản như người làm nghề, biết mình làm gì trong nhóm. Phần 2 làm thật trên Xưởng: từ yêu cầu tới video đã đăng.',
  ket_qua: [
    { dt: 'Giải thích', chu: 'vòng workflow 7 bước và 3 điều nó mang lại: trúng hơn, nhanh hơn, giỏi dần.' },
    { dt: 'Phân tích', chu: 'một video bán hàng thành hook, thân, kêu gọi; duyệt kịch bản bằng 5 câu hỏi.' },
    { dt: 'Áp dụng', chu: '“làm kỹ một, nhân ra nhiều” để biến buổi live, video cũ thành cả lô video.' },
    { dt: 'Thực hiện', chu: 'vòng Kaizen cuối ngày để Agent giỏi lên sau mỗi lô.' },
    { dt: 'Xác định', chu: 'nhóm của mình, mục tiêu số video và cách kết quả được đo.' },
    { dt: 'Làm', chu: 'một video A→Z trên Xưởng: yêu cầu, duyệt 4 cổng, tự đăng, dán link cho máy đo.' },
    { dt: 'Hoàn thiện', chu: 'video bằng Trình sửa, thay câu mở cho video có sẵn, nhờ Agent sửa bằng lời.' }
  ],
  phan: { 1: 'Phần 1 · Nguyên lý', 2: 'Phần 2 · Thực hành trên Xưởng' },
  // Số hiệu quả (06/11: bỏ tầng 'Học được' 7,9/10 tự chấm — user: điểm thấp không khoe; trang chủ không còn hiện thang 4 tầng)
  hieu_qua: [
    { tang: 1, ten: 'Phản hồi', hoi: 'Người học thấy thế nào?', so: '89', don: 'bài thu hoạch', chu: 'Nhân sự viết bài thu hoạch sau mỗi buổi, góp ý trực tiếp vào tài liệu qua form.' },
    { tang: 3, ten: 'Làm được', hoi: 'Có làm khác đi không?', so: '1.011', don: 'video trong 3 tuần', chu: 'Ngày cao điểm 20 video một người — ít nhất gấp 4 lần lúc đầu (3–5 video). Tỷ lệ đạt chuẩn 19% → 46%.' },
    { tang: 4, ten: 'Kết quả', hoi: 'Có ra đơn không?', so: '21 tr', don: 'ngân sách test mỗi tuần', chu: 'Chặng tiếp theo: đo bằng đơn hàng. Đích: 60–80% video đạt chuẩn và video ra doanh số như các nhóm dẫn đầu (1 video hơn 6.000 USD).' }
  ],
  cach_hoc: [
    { tieu: 'Xem vài phút', chu: 'Mỗi bài một video ngắn 2–5 phút, có phụ đề và bản chép lời — xem xen giữa hai việc cũng được.' },
    { tieu: 'Hiểu ngay', chu: 'Ý chính và số thật của team nằm ngay cạnh video, không phải lục tìm.' },
    { tieu: 'Biết mình hiểu chưa', chu: 'Câu hỏi nhanh cuối bài, chấm và giải thích ngay — sai thì làm lại, không ai trừ điểm.' },
    { tieu: 'Làm thật, mở khoá Agent', chu: 'Bài tập làm trong giờ hành chính, nộp report cuối buổi. Đạt là được mở quyền dùng Agent.' }
  ],
  // TRANG CHỦ viết như trang giới thiệu (06/11, user: "đánh trúng insight, FOMO… đánh như marketing", không giao việc).
  // Mọi con số lấy từ Dashboard Video AI / bài thu hoạch / kịch bản video mới (nguon_so) — không thêm số chưa đo.
  trang_chu: {
    nhan: 'Khoá nền tảng · Hecatech',
    tieu: ['Làm video bán hàng ', 'bằng AI', ''],
    // 06/11 user: tiêu đề = tên khoá, ngay dưới là lợi ích (không đặt số liệu lên tiêu đề)
    loi_ich: ['Tăng tốc độ', 'Tăng chất lượng', 'Giỏi dần mỗi ngày'],
    phu: 'Máy lo phần việc lặp lại, Agent học từ hàng trăm video bán chạy — bạn dồn sức vào phần chỉ người mới làm được: ý tưởng, kịch bản và con mắt duyệt video.',
    mo_khoa: 'Học xong, đạt bài tập là được mở quyền dùng Agent làm video thật',
    bang_chung: [
      { nhan: 'Tốc độ', so: '20–25 phút', chu: 'cho một video, thay vì 1–2 giờ dựng tay' },
      { nhan: 'Chất lượng', so: '×2,4', chu: 'tỉ lệ video đạt chuẩn chỉ sau 1 tuần (19% → 46%)' },
      { nhan: 'Quy mô', so: '1.011', chu: 'video cả team làm trong 3 tuần đầu' }
    ],
    nguon: 'Số của chính team · Dashboard Video AI, 17/10–02/11/2026',
    noi_dau: {
      nhan: 'Nghe quen không?',
      tieu: ['Làm video kiểu cũ, ', 'mệt ở bốn chỗ'],
      phu: 'Không phải bạn chậm. Là cách làm cũ bắt bạn làm lại từ đầu mỗi lần. Khoá này gỡ đúng bốn chỗ đó.',
      muc: [
        { cho: 'Ý tưởng', cu: 'Lướt cả buổi vẫn chưa ra ý, hôm nào hết cảm hứng là đứng hình.', moi: 'Agent — trợ lý AI tự làm việc, không chỉ trả lời như chatbot — đọc hàng trăm video bán chạy rồi mới đề xuất. Bạn chỉ việc chọn ý trúng.' },
        { cho: 'Kịch bản', cu: 'Sửa đi sửa lại vẫn không chắc đúng hay sai.', moi: 'Viết theo công thức của video đã ra đơn, duyệt bằng 5 câu hỏi là biết trúng hay trượt.' },
        { cho: 'Dựng video', cu: 'Một video dựng tay mất 1–2 tiếng.', moi: 'Máy ghép cảnh, đọc giọng, chèn chữ. Mỗi video còn 20–25 phút, bạn duyệt.' },
        { cho: 'Học hỏi', cu: 'Làm mãi mà kinh nghiệm chỉ nằm trong đầu, chẳng ai thấy mình giỏi lên.', moi: 'Mỗi lỗi sửa xong thành bài học chung, Agent nhớ. Mỗi video có số đo — tiến bộ của bạn ai cũng thấy.' }
      ]
    },
    duoc: {
      nhan: 'Bạn được gì',
      tieu: ['Học xong, ', 'bạn có gì trong tay'],
      muc: [
        { tieu: 'Nhanh gấp nhiều lần', chu: 'Mỗi video 20–25 phút thay vì 1–2 giờ. Thời gian dư để chọn ý hay, quay cảnh thật.' },
        { tieu: 'Không còn bí ý', chu: 'Kho hàng trăm video bán chạy của thị trường và của team — Agent đọc trước, bạn chọn.' },
        { tieu: 'Con mắt duyệt kịch bản', chu: 'Nhìn 3 giây đầu là biết video có giữ chân người xem; 5 câu hỏi để biết kịch bản có ra đơn.' },
        { tieu: 'Một video thắng, cả lô video', chu: 'Làm kỹ một, nhân ra nhiều: một buổi live, một video cũ thành cả lô video mới.' },
        { tieu: 'Tiến bộ có số đo', chu: 'Video nào cũng có link và số. Bạn giỏi lên bao nhiêu, Dashboard ghi bấy nhiêu.' },
        { tieu: 'Quyền dùng Agent', chu: 'Đạt bài tập là được mở quyền dùng Agent làm video thật trên Xưởng — đi trước một bước so với cách làm cũ.' }
      ]
    },
    hoc_vien: { so: '89', chu: 'bài thu hoạch người học tự viết sau mỗi buổi. Vài câu trong đó:' },
    chang_tiep: 'Chặng tiếp theo: video được đo bằng đơn hàng thật — mỗi dự án có ngân sách test riêng.',
    loi_ban_hoc: [
      { chu: 'Hiệu quả sản xuất video không đến từ cảm hứng ngẫu nhiên mà đến từ một quy trình có hệ thống.', nguon: 'Bài thu hoạch · 21/10' },
      { chu: 'Khi hành động lặp đi lặp lại, AI sẽ làm tốt hơn và nhanh hơn rất nhiều.', nguon: 'Bài thu hoạch · 21/10' },
      { chu: 'Đi giảng cho người khác sẽ nhớ tốt hơn là tự học.', nguon: 'Bài thu hoạch · 19/10' }
    ],
    chot: { tieu: ['Cả team đã đổi cách làm. ', 'Video tiếp theo là của bạn.'], phu: 'Bài 1 chỉ 3 phút. Xem ngay trong giờ làm — tiến độ tự lưu trên máy này.' }
  },
  thuc_hanh: { tieu: 'Thực hành trên Xưởng video', chu: 'Học xong 3 buổi nguyên lý thì sang phần thực hành: sửa video và làm video trên Xưởng.', link: 'thuc-hanh-buoi-4-5.html#b4',
    buoi: [{ ten: 'Buổi 4 · Sửa video bằng trình sửa', link: 'thuc-hanh-buoi-4-5.html#b4' }, { ten: 'Buổi 5 · Xưởng video', link: 'thuc-hanh-buoi-4-5.html#b5' }] },
  gop_y: { url: 'https://docs.google.com/forms/d/e/1FAIpQLSdk17z8-V7kFGDTYUIva7IwdxLVmZAA-MOHvVs1_iW_bC6ONA/viewform', buoi: 'entry.1840756395', muc: 'entry.48501445' },
  thuat_ngu: [
    ['Agent', 'Trợ lý AI tự làm việc: nhận việc, tự chia bước, dùng công cụ làm đến khi xong rồi báo lại. Khác chatbot AI (như ChatGPT, Gemini) chỉ trả lời bằng chữ.'],
    ['Workflow', 'Vòng làm video khép kín: dữ liệu → Agent học → kịch bản → giọng và hình → video → đăng và đo → học lại.'],
    ['Kho video win', 'Video đang bán chạy của thị trường và của team, kèm số liệu, để Agent học công thức.'],
    ['Hook', 'Khoảng 3 giây đầu video — làm người xem dừng tay.'],
    ['Thân', 'Phần giữa video — chứng minh để người xem tin.'],
    ['Kêu gọi (CTA)', 'Phần cuối — mời người xem làm một việc: bấm giỏ hàng, vào live.'],
    ['Angle', 'Góc nói về sản phẩm: chạm vào nỗi đau, mong muốn hay tình huống nào của khách.'],
    ['Video đạt chuẩn', 'Video đã đăng, có link TikTok và gắn giỏ hàng (nhóm Livestream: có link).'],
    ['Cảnh trám', 'Cảnh sản phẩm chèn thêm để video liền mạch và gắn được giỏ.'],
    ['Lô', 'Nhiều video làm một lượt, đi theo một video mẫu đã duyệt.'],
    ['Kaizen', 'Cải tiến liên tục: mỗi lỗi sửa xong thành bài học để lần sau không lặp.'],
    ['Lead đồng hành', 'Người dẫn nhóm: làm cùng bạn, duyệt video, chịu trách nhiệm kết quả — tự làm nhiều hơn và giỏi hơn để đủ cơ sở duyệt.'],
    ['Video chuyển đổi', 'Video khiến người xem bấm mua, không chỉ xem cho vui.'],
    ['Gắn giỏ', 'Gắn sản phẩm vào video TikTok, người xem bấm là mua được ngay.'],
    ['Ngân sách test', 'Khoản tiền nhỏ chạy quảng cáo thử, để đo video bằng đơn hàng thật.'],
    ['Xưởng video', 'Trang web làm video của team: gửi yêu cầu, duyệt 4 cổng, chốt video.'],
    ['GMV Max', 'Quảng cáo TikTok tự tối ưu theo doanh số.'],
    ['KOL · KOC · Affiliate', 'KOL: người có sức ảnh hưởng giới thiệu sản phẩm. KOC: người dùng thật review sản phẩm. Affiliate: người bán hộ, nhận hoa hồng trên mỗi đơn.'],
    ['CTR · CVR', 'CTR: tỉ lệ click vào quảng cáo. CVR: tỉ lệ ra đơn.'],
    ['CPM · CPA', 'Chi phí quảng cáo: CPM tính trên 1.000 lượt hiển thị, CPA tính trên mỗi đơn.']
  ],
  buoi: [
    // ================================================================ BUỔI 1
    {
      id: 'b1', so: 1, ten: 'Nguyên lý workflow', phu: 'Vì sao làm video bằng AI nhanh hơn, trúng hơn — và bạn đứng ở đâu trong đó.',
      gop_y_ten: 'Buổi 1 · Làm video bán hàng (19/10)',
      bai: [
        {
          id: 'b1-1', ten: 'Trước đây và bây giờ', phut: 2,
          tu_duy: 'Hiệu quả đến từ quy trình có hệ thống, không đến từ cảm hứng.',
          ky_nang: 'Đọc số của team để biết mình đang làm tốt hơn ở đâu.',
          muc_tieu: ['Phân biệt Agent với chatbot AI quen thuộc (ChatGPT, Gemini).', 'So sánh cách làm video cũ và workflow AI ở 4 điểm: ý tưởng, kịch bản, dựng, học hỏi.', 'Dẫn ra ít nhất 2 con số của chính team chứng minh workflow nhanh hơn và đạt chuẩn nhiều hơn.'],
          canh: [
            { loi: 'Chào bạn. Trước khi học cách làm, mình cùng trả lời câu hỏi quan trọng nhất: làm video bằng AI thì hơn cách cũ ở đâu, và hơn bao nhiêu?',
              hinh: { loai: 'tieu-de', nhan: 'Buổi 1 · Bài 1', tieu: 'Trước đây và bây giờ', phu: 'Làm video bằng AI hơn cách cũ ở đâu — và hơn bao nhiêu?' } },
            { loi: 'Trước đây, ý tưởng nằm trong đầu từng người. Hôm nào có cảm hứng thì video hay, hôm nào không thì thôi. Bây giờ, trước khi viết một chữ, Agent đã đọc hàng trăm video bán chạy của thị trường và của chính team mình.',
              hinh: { loai: 'so-sanh', tieu: 'Ý tưởng', truoc: 'Mỗi người tự nghĩ, dựa vào cảm hứng', nay: 'Agent đọc hàng trăm video bán chạy của thị trường và của team rồi mới đề xuất' } },
            { loi: 'Trước đây, một video dựng tay mất một đến hai tiếng. Bây giờ máy làm phần lặp đi lặp lại: ghép cảnh, đọc giọng, chèn chữ. Bạn giữ phần quan trọng nhất là duyệt. Tính ra mỗi video còn khoảng hai mươi lăm phút.',
              hinh: { loai: 'so-sanh', tieu: 'Dựng video', truoc: '1–2 giờ dựng tay mỗi video', nay: 'Khoảng 25 phút — máy dựng, người duyệt' } },
            { loi: 'Kết quả là năng suất. Làm tay, một người được năm, sáu video một ngày. Ngày hai mươi tháng mười, tám bạn làm ra một trăm sáu mươi hai video, tức khoảng hai mươi video mỗi người. Gấp bốn lần.',
              hinh: { loai: 'so', tieu: 'Video mỗi người mỗi ngày', muc: [{ tu: '5–6', so: 20, don: 'video / người / ngày', phu: 'Ngày 20/10: 8 người làm 162 video' }], dau: 'Gấp 4 lần' } },
            { loi: 'Sau ba tuần, team đã làm hơn một nghìn video. Nếu làm tay, khối lượng này bằng năm đến mười tháng làm việc của một editor.',
              hinh: { loai: 'cot', tieu: 'Tổng video cộng dồn', don: 'video', cot: [{ nhan: '17/10', gt: 184 }, { nhan: '25/10', gt: 586 }, { nhan: '01/11', gt: 947 }, { nhan: '02/11', gt: 1011 }], chu_cuoi: '= 5–10 tháng làm tay của một editor' } },
            { loi: 'Nhiều hơn mà vẫn trúng hơn. Tỷ lệ video đạt chuẩn, nghĩa là đã đăng có link TikTok và gắn giỏ hàng, tăng từ mười chín phần trăm lên bốn mươi sáu phần trăm chỉ trong một tuần.',
              hinh: { loai: 'so', tieu: 'Tỷ lệ video đạt chuẩn', muc: [{ tu: '19%', so: 46, hau: '%', don: 'video đạt chuẩn', phu: '26/10 → 02/11 · cùng một cách tính' }], dau: 'Gấp 2,4 lần trong 1 tuần' } },
            { loi: 'Một bạn trong team đã viết rất đúng: hiệu quả không đến từ cảm hứng ngẫu nhiên, mà đến từ một quy trình có hệ thống. Bài tiếp theo, mình sẽ mở quy trình đó ra xem nó chạy thế nào.',
              hinh: { loai: 'trich', chu: 'Hiệu quả sản xuất video không đến từ cảm hứng ngẫu nhiên mà đến từ một quy trình có hệ thống.', nguon: 'Bài thu hoạch · 21/10' } }
          ],
          y_chinh: [
            'Agent không chỉ trả lời như chatbot: bạn giao việc, Agent tự chia bước, dùng công cụ (đọc dữ liệu, viết kịch bản, dựng video) làm đến khi xong rồi báo lại để bạn duyệt.',
            'Ý tưởng có căn cứ: Agent đọc hàng trăm video bán chạy của thị trường và của team trước khi đề xuất.',
            'Máy làm phần lặp, người giữ phần duyệt: mỗi video từ 1–2 giờ còn khoảng 20–25 phút.',
            'Số của team: từ 3–5 video lên 20 video một người một ngày (ít nhất gấp 4 lần), tỷ lệ đạt chuẩn 19% → 46% trong 1 tuần.',
            'Bạn được gì: bớt việc lặp, dồn sức vào chọn ý, duyệt kịch bản, quay cảnh thật; video nào cũng có số đo. Học hết khoá, đạt bài tập là được mở quyền dùng Agent.'
          ],
          khoi: [
            { loai: 'so-sanh', tieu: 'Chatbot AI và Agent khác nhau thế nào', nhan: ['', 'Chatbot AI (ChatGPT, Gemini…)', 'Agent'], dong: [
              ['Bạn làm gì', 'Hỏi từng câu', 'Giao một việc'],
              ['Nó làm gì', 'Trả lời bằng chữ', 'Tự chia việc thành từng bước, tự dùng công cụ: đọc dữ liệu, viết kịch bản, dựng video'],
              ['Kết quả', 'Làm tiếp thế nào là việc của bạn', 'Làm đến khi xong rồi báo lại để bạn duyệt']
            ] },
            { loai: 'so-sanh', tieu: 'Cách cũ và workflow AI', dong: [
              ['Ý tưởng', 'Mỗi người tự nghĩ, dựa vào cảm hứng', 'Agent đọc hàng trăm video bán chạy + video của team rồi đề xuất'],
              ['Kịch bản', 'Mỗi người viết một kiểu, sửa mãi vẫn khó biết đúng sai', 'Agent viết theo công thức của video đã bán được hàng, bạn duyệt'],
              ['Dựng', '1–2 giờ dựng tay mỗi video', 'Khoảng 20–25 phút: máy dựng, người duyệt'],
              ['Sản lượng', '3–5 video / người / ngày', 'Ngày 20/10: khoảng 20 video / người'],
              ['Học hỏi', 'Kinh nghiệm nằm trong đầu từng người, người nghỉ là mất', 'Bài học ghi lại, Agent nhớ cho cả team']
            ] },
            { loai: 'so', muc: [
              { so: '×4+', chu: 'năng suất mỗi người', phu: '3–5 → 20 video/ngày (20/10)' },
              { so: '20–25′', chu: 'mỗi video', phu: 'trước đây 1–2 giờ dựng tay' },
              { so: '1.011', chu: 'video trong 3 tuần', phu: '= 8 tháng đến hơn 1 năm của 1 editor' },
              { so: '46%', chu: 'video đạt chuẩn', phu: 'từ 19% chỉ sau 1 tuần' }
            ] },
            { loai: 'cot', tieu: 'Tổng video cộng dồn', phu: 'Toàn team · Dashboard Video AI', don: 'video', cot: [{ nhan: '17/10', gt: 184 }, { nhan: '25/10', gt: 586 }, { nhan: '01/11', gt: 947 }, { nhan: '02/11', gt: 1011 }] },
            { loai: 'luu-y', chu: '<b>Cách tính.</b> Video đạt chuẩn = đã đăng, có link TikTok và gắn giỏ hàng (nhóm Livestream: có link). Tỷ lệ 19% → 46% tính trên các nhóm bán qua giỏ hàng, cùng một cách tính ở hai ngày 26/10 và 02/11. “20–25 phút mỗi video” là mốc thời gian đã chốt ngày 05/11. “Ít nhất gấp 4 lần”: 20 video so với 3–5 video một người một ngày lúc đầu. “8 tháng đến hơn 1 năm”: 1.011 video chia cho 3–5 video một ngày, 26 ngày công một tháng.' },
            { loai: 'trich', muc: [{ chu: 'Hiệu quả sản xuất video không đến từ cảm hứng ngẫu nhiên mà đến từ một quy trình có hệ thống.', nguon: 'Bài thu hoạch · 21/10' }] }
          ],
          hoi_nhanh: [
            { hoi: 'Điều gì giúp Agent đề xuất ý tưởng tốt hơn một người tự nghĩ?', chon: ['Agent có nhiều cảm hứng hơn', 'Agent đọc hàng trăm video bán chạy và video của team trước khi viết', 'Agent không cần người duyệt', 'Agent viết dài hơn'], dap: 1,
              giai: 'Lợi thế nằm ở dữ liệu: Agent đọc hàng trăm video bán chạy của thị trường và của team, nên ý tưởng có căn cứ chứ không dựa vào cảm hứng.' },
            { hoi: 'Agent khác chatbot AI như ChatGPT ở đâu?', chon: ['Agent trả lời hay hơn', 'Agent nhận việc, tự chia bước, dùng công cụ làm đến khi xong rồi báo lại', 'Agent không cần người duyệt', 'Agent chỉ viết được chữ'], dap: 1,
              giai: 'Chatbot trả lời bằng chữ, còn làm tiếp là việc của bạn. Agent nhận cả một việc, tự chia bước, tự dùng công cụ, làm xong rồi báo lại để bạn duyệt.' }
          ]
        },
        {
          id: 'b1-2', ten: 'Nguyên lý một vòng', phut: 3,
          tu_duy: 'Dữ liệu lớn dạy Agent, kịch bản dẫn đường cho mọi bước phía sau.',
          ky_nang: 'Biết mình phải duyệt ở đâu: kịch bản kỹ nhất, video lần cuối.',
          muc_tieu: ['Mô tả vòng workflow 7 bước: dữ liệu → Agent học → kịch bản → giọng và hình → video → đăng và đo → học lại.', 'Giải thích 3 điều vòng này mang lại: trúng hơn nhờ dữ liệu lớn, nhanh hơn nhờ máy làm phần lặp và kịch bản dẫn đường, giỏi dần nhờ Kaizen.', 'Chỉ ra 2 điểm người phải duyệt.'],
          canh: [
            { loi: 'Workflow làm video AI chạy theo một vòng khép kín. Hiểu vòng này là bạn hiểu vì sao nó nhanh hơn và trúng hơn cách cũ.',
              hinh: { loai: 'tieu-de', nhan: 'Buổi 1 · Bài 2', tieu: 'Nguyên lý một vòng', phu: 'Dữ liệu lớn dạy Agent · Kịch bản dẫn đường' } },
            { loi: 'Vòng bắt đầu từ dữ liệu. Đây là lợi thế lớn nhất so với trước đây. Kho của mình có hàng trăm video doanh số cao nhất của cả mình và đối thủ, lấy từ các nền tảng phân tích như Kalodata, FastMoss, và Chanmama bên Douyin. Thêm công thức hook đã thắng, cảnh quay đã gắn nhãn, và toàn bộ video team đã làm. Một editor giỏi nhớ được vài chục video. Agent đọc hết rồi mới viết.',
              hinh: { loai: 'vong', sang: [0], chip: ['Video GMV cao nhất · mình + đối thủ', 'Kalodata', 'FastMoss', 'Chanmama · Douyin', 'Video của chính team'] } },
            { loi: 'Từ dữ liệu đó, Agent rút ra công thức: video thắng mở đầu thế nào, chứng minh thế nào, kêu gọi thế nào. Đầu vào càng đủ và càng đúng thì công thức càng chuẩn.',
              hinh: { loai: 'vong', sang: [1] } },
            { loi: 'Công thức biến thành kịch bản. Đây là điểm quan trọng nhất của cả vòng: mọi thứ phía sau đều căn cứ từ kịch bản. Giọng đọc theo lời trong kịch bản, cảnh quay chọn theo ý trong kịch bản, chữ trên màn hình cũng lấy từ kịch bản. Vì vậy bạn duyệt kịch bản kỹ nhất.',
              hinh: { loai: 'vong', sang: [2] } },
            { loi: 'Kịch bản đã duyệt thì máy đọc giọng, chọn cảnh, dựng thành video. Bạn xem video lần cuối trước khi đăng. Sửa ở kịch bản thì rẻ, sửa ở video thì đắt, nên lỗi nào bắt được sớm thì bắt sớm.',
              hinh: { loai: 'vong', sang: [3, 4] } },
            { loi: 'Video đăng lên được đo: lượt xem, gắn giỏ, đơn hàng. Bài học từ số đo và từ những lần bạn sửa được ghi lại để Agent nhớ. Vòng sau, Agent bắt đầu từ chỗ giỏi hơn vòng trước.',
              hinh: { loai: 'vong', sang: [5, 6] } },
            { loi: 'Tóm lại ba nguyên lý. Nhanh, vì không phải làm lại từ đầu. Đúng, vì mọi thứ căn cứ từ kịch bản. Và giỏi dần, vì mỗi vòng đều học lại.',
              hinh: { loai: 'danh-sach', tieu: '3 nguyên lý', muc: [{ tieu: 'Nhanh', chu: 'vì không làm lại từ đầu' }, { tieu: 'Đúng', chu: 'vì mọi thứ căn cứ từ kịch bản' }, { tieu: 'Giỏi dần', chu: 'vì mỗi vòng đều học lại' }] } },
            { loi: 'Và như một bạn đã rút ra sau buổi học: đầu vào phải đủ cả chất lẫn lượng. Agent chỉ giỏi bằng dữ liệu mình cho nó.',
              hinh: { loai: 'trich', chu: 'Đầu vào của workflow rất quan trọng, nguồn đầu vào phải đầy đủ về cả chất và lượng.', nguon: 'Bài thu hoạch · 19/10' } }
          ],
          y_chinh: [
            'Lợi thế lớn nhất là dữ liệu lớn: video bán chạy trên TikTok Shop (Kalodata, FastMoss), Douyin (Chanmama), Amazon, quảng cáo Facebook — cùng video thắng của chính brand (shop TikTok, GMV Max) và số đơn thật của team. Agent đọc hết rồi mới viết.',
            'Kịch bản là gốc: giọng, cảnh, chữ đều căn cứ từ kịch bản — duyệt kịch bản kỹ nhất.',
            'Video đăng xong được đo bằng nhiều chỉ số (lượt xem, bấm giỏ, đơn hàng, CTR, CVR, CPM, CPA…). Mỗi lỗi sửa xong thành bài học — Kaizen — nên lỗi chỉ phải sửa một lần.'
          ],
          khoi: [
            { loai: 'vong', tieu: 'Vòng workflow — bấm vào từng bước để xem' },
            { loai: 'the', tieu: 'Dữ liệu Agent đang học', phu: 'Số lượng khác nhau theo từng dự án — dự án nạp càng đủ, Agent càng giỏi.', muc: [
              { tieu: 'Video bán chạy của thị trường', chu: 'Hàng trăm video bán chạy nhất: TikTok Shop qua Kalodata, FastMoss; Douyin (Trung Quốc) qua Chanmama; dữ liệu sàn Amazon; dữ liệu quảng cáo Facebook — kèm doanh số, lượt xem.' },
              { tieu: 'Video thắng của chính brand', chu: 'Từ trang quản lý shop TikTok và GMV Max (quảng cáo tự tối ưu theo doanh số): video của KOL, KOC, affiliate hay team tự làm.' },
              { tieu: 'Công thức hook đã thắng', chu: 'Cả hook bằng lời và hook bằng hình.' },
              { tieu: 'Cảnh quay đã gắn nhãn', chu: 'Máy xem trước, biết cảnh nào hợp với câu nào.' },
              { tieu: 'Video của chính team', chu: 'Toàn bộ video team đã làm, kèm link đăng và số đơn hàng thật.' }
            ] },
            { loai: 'goc', tieu: 'Kịch bản là gốc', chu: 'Sửa ở kịch bản thì rẻ, sửa ở video thì đắt.', nhanh: [['Giọng', 'đọc đúng lời trong kịch bản'], ['Cảnh', 'chọn theo ý của từng câu'], ['Chữ', 'lấy từ câu then chốt'], ['Kêu gọi', 'theo hành động kịch bản chốt']] },
            { loai: 'the', tieu: '3 điều vòng này mang lại', muc: [
              { tieu: 'Trúng hơn', chu: 'Nhờ dữ liệu lớn: Agent học từ hàng trăm video thắng, không đoán.' },
              { tieu: 'Nhanh hơn', chu: 'Nhờ máy làm phần lặp và kịch bản dẫn đường: không phải làm lại từ đầu. Kịch bản sai thì sửa hình bao nhiêu cũng không cứu được.' },
              { tieu: 'Giỏi dần', chu: 'Nhờ Kaizen: mỗi lỗi sửa xong thành bài học, Agent nhớ cho cả team — lỗi chỉ phải sửa một lần.' }
            ] },
            { loai: 'the', tieu: 'Video được đo bằng gì', phu: 'Nhờ các chỉ số này, mình biết video nào thật sự bán được và cần tối ưu ở đâu.', muc: [
              { tieu: 'Lượt xem · bấm giỏ · đơn hàng', chu: 'Có người xem không, có người bấm vào giỏ hàng không, có ra đơn không.' },
              { tieu: 'CTR', chu: 'Tỉ lệ click vào quảng cáo.' },
              { tieu: 'CVR', chu: 'Tỉ lệ ra đơn.' },
              { tieu: 'CPM · CPA', chu: 'Chi phí quảng cáo: CPM tính trên 1.000 lượt hiển thị, CPA tính trên mỗi đơn.' }
            ] },
            { loai: 'trich', muc: [
              { chu: 'Không tin cái gì 100%, phải đọc, phản biện, tìm lỗi của nó.', nguon: 'Bài thu hoạch · 19/10' },
              { chu: 'Khi hành động lặp đi lặp lại, AI sẽ làm tốt hơn và nhanh hơn rất nhiều.', nguon: 'Bài thu hoạch · 21/10' }
            ] }
          ],
          hoi_nhanh: [
            { hoi: 'Vì sao kịch bản là chỗ cần duyệt kỹ nhất?', chon: ['Vì kịch bản là phần dài nhất', 'Vì giọng, cảnh và chữ đều căn cứ từ kịch bản — sai ở đây là sai cả video', 'Vì máy không viết được kịch bản', 'Vì kịch bản không sửa được nữa'], dap: 1,
              giai: 'Mọi bước phía sau đi theo kịch bản. Bắt lỗi ở kịch bản rẻ hơn rất nhiều so với sửa video đã dựng.' },
            { hoi: 'Video đã đăng thì vòng workflow làm gì tiếp?', chon: ['Kết thúc, chuyển video khác', 'Đo số và ghi bài học để vòng sau tốt hơn', 'Xoá dữ liệu cũ', 'Làm lại video đó từ đầu'], dap: 1,
              giai: 'Đăng xong mới đến phần “giỏi dần”: số đo và bài học được ghi lại để Agent bắt đầu vòng sau từ chỗ giỏi hơn.' },
            { hoi: 'Kaizen giúp gì cho bạn?', chon: ['Làm video dài hơn', 'Mỗi lỗi sửa xong thành bài học, Agent nhớ — lỗi chỉ phải sửa một lần', 'Không cần duyệt kịch bản nữa', 'Đăng video nhanh hơn'], dap: 1,
              giai: 'Kaizen là cải tiến liên tục. Bài học được ghi lại và Agent nhớ, nên vòng sau bắt đầu từ chỗ giỏi hơn vòng trước.' }
          ]
        },
        {
          id: 'b1-3', ten: 'Hai nhóm: bạn làm gì, đo bằng gì', phut: 3,
          tu_duy: 'Mỗi sản phẩm ở một trạng thái, mỗi nhóm luyện một bộ kỹ năng.',
          ky_nang: 'Tự đặt mục tiêu theo nhóm và đọc kết quả theo 3 tầng.',
          muc_tieu: ['Xác định mình thuộc Nhóm 1 hay Nhóm 2 và kỹ năng trọng tâm của nhóm.', 'Nêu mục tiêu số video của nhóm và 3 tầng đo kết quả.', 'Mô tả lộ trình 5 bước cho người mới vào nhóm.'],
          canh: [
            { loi: 'Sản phẩm của công ty đang ở hai trạng thái khác nhau, nên team video AI chia thành hai nhóm, mỗi nhóm luyện một bộ kỹ năng riêng.',
              hinh: { loai: 'tieu-de', nhan: 'Buổi 1 · Bài 3', tieu: 'Hai nhóm, hai chuyên ngành', phu: 'Bạn làm gì · mục tiêu bao nhiêu · đo bằng gì' } },
            { loi: 'Nhóm một mở đường cho sản phẩm mới và sản phẩm đang giảm số. Nhóm này cần người toàn diện: biết đạo diễn, quay thêm cảnh, dựng video chuyển đổi, vì sẽ là người cầm các dự án mới. Nhóm hai nhân rộng sản phẩm đang bán tốt. Kỹ năng trọng tâm là kịch bản, nhận angle, dùng Agent, đánh giá và Kaizen.',
              hinh: { loai: 'nhom' } },
            { loi: 'Mục tiêu đã chốt theo tuần. Nhóm một sáu dự án, ba mươi video mỗi ngày. Nhóm hai năm dự án, hai mươi ba video mỗi ngày. Livestream làm đủ bảy dạng video, hai mươi tám video mỗi ngày. Mỗi dự án còn có ngân sách test để đo video thật bằng đơn hàng.',
              hinh: { loai: 'so', tieu: 'Mục tiêu mỗi ngày', muc: [{ so: 30, don: 'video / ngày', phu: 'Nhóm 1 · 6 dự án' }, { so: 23, don: 'video / ngày', phu: 'Nhóm 2 · 5 dự án' }, { so: 28, don: 'video / ngày', phu: 'Livestream · 7 dạng' }] } },
            { loi: 'Mỗi nhóm có một lead đồng hành. Nguyên tắc là nhân sự làm một thì lead làm mười. Lead phải tự làm, làm nhiều hơn và giỏi hơn thì mới đủ cơ sở để duyệt, và mới biết Agent đưa ra đúng hay sai.',
              hinh: { loai: 'trich', to: true, chu: 'Nhân sự làm 1, lead làm 10.', nguon: 'Họp Team AI · 02/11' } },
            { loi: 'Kết quả được đo theo ba tầng. Tầng một là số lượng so với mục tiêu. Tầng hai là đạt chuẩn: đăng có link và gắn giỏ. Tầng ba là hiệu quả: lượt xem và đơn hàng. Team đã vượt tầng một, đang đi lên tầng hai, và tầng ba là đích của giai đoạn này.',
              hinh: { loai: 'bac-thang', muc: [{ tieu: 'Số lượng', chu: 'video làm so với mục tiêu' }, { tieu: 'Đạt chuẩn', chu: 'có link TikTok + gắn giỏ' }, { tieu: 'Hiệu quả', chu: 'lượt xem, đơn hàng' }], o: 1 } },
            { loi: 'Người mới vào nhóm học theo năm bước. Một, học ba buổi nguyên lý này. Hai, thực hành trên Xưởng video. Ba, làm kỹ một video cùng lead. Bốn, nhân ra lô theo mục tiêu của nhóm. Năm, giảng lại cho người mới tiếp theo.',
              hinh: { loai: 'buoc', muc: ['Học 3 buổi nguyên lý', 'Thực hành trên Xưởng', 'Làm kỹ 1 video cùng lead', 'Nhân ra lô theo mục tiêu', 'Giảng lại cho người mới'] } },
            { loi: 'Bước năm là bước nhiều người bỏ qua, nhưng lại là bước giúp nhớ lâu nhất. Một bạn đã viết: đi giảng cho người khác sẽ nhớ tốt hơn là tự học. Hẹn gặp bạn ở buổi hai: tư duy kịch bản.',
              hinh: { loai: 'trich', chu: 'Đi giảng cho người khác sẽ nhớ tốt hơn là tự học.', nguon: 'Bài thu hoạch · 19/10' } }
          ],
          y_chinh: [
            'Nhóm 1 mở đường (sản phẩm mới, sản phẩm đang giảm số): đạo diễn, quay, dựng video chuyển đổi.',
            'Nhóm 2 nhân rộng (sản phẩm đang win): kịch bản, nhận angle, dùng Agent, đánh giá và Kaizen.',
            'Đo 3 tầng: số lượng → đạt chuẩn → hiệu quả. Lead làm nhiều hơn và giỏi hơn để đủ cơ sở duyệt.'
          ],
          khoi: [
            { loai: 'hai-nhom' },
            { loai: 'the', tieu: 'Livestream — 3 sản phẩm, 7 dạng video', phu: '28 video / ngày · làm theo lịch của nhóm · ngân sách test 10 triệu / tuần', chip: ['Highlight', 'Teasing', 'Trả lời bình luận', 'POV / tình huống ngắn', 'KOC / Affiliate', 'Khoe deal / mở hộp', 'Chuyên gia nói ngắn'] },
            { loai: 'trich', muc: [{ chu: 'Lead đồng hành phải trực tiếp làm, làm nhiều hơn và giỏi hơn nhân sự — nhân sự làm 1, lead làm 10. Không trực tiếp làm thì không đủ cơ sở duyệt kết quả và không đánh giá được AI đưa ra đúng hay sai.', nguon: 'Biên bản họp Team AI · 02/11' }] },
            { loai: 'nhip', tieu: 'Nhịp làm việc', phu: 'Đề xuất — lead nhóm chốt lại. Ads làm 6 ngày / tuần, Livestream theo lịch của nhóm.', muc: [
              ['Đầu ngày', 'Xem số hôm qua trên Dashboard. Chọn angle, duyệt kịch bản cùng lead.'],
              ['Trong ngày', 'Làm video mẫu, lead xem, rồi nhân ra lô.'],
              ['Trước 17 giờ', 'Đăng video, điền link và gắn giỏ vào Dashboard.'],
              ['Cuối tuần', 'Họp Kaizen 30 phút: video nào thắng, vì sao, ghi bài học.']
            ] },
            { loai: 'bac-thang', tieu: 'Đo kết quả theo 3 tầng', muc: [{ tieu: 'Số lượng', chu: 'Video làm so với mục tiêu ngày, tuần của nhóm.' }, { tieu: 'Đạt chuẩn', chu: 'Đã đăng, có link TikTok và gắn giỏ hàng.' }, { tieu: 'Hiệu quả', chu: 'Lượt xem, CTR, đơn hàng — đo bằng ngân sách test.' }], o: 1 },
            { loai: 'buoc', tieu: 'Người mới vào nhóm học thế nào', muc: [
              ['Học 3 buổi nguyên lý', 'Khoá này — hiểu vì sao trước khi học bấm gì.'],
              ['Thực hành trên Xưởng', 'Buổi 4–5: làm video, sửa video trên Xưởng.'],
              ['Làm kỹ 1 video cùng lead', 'Duyệt từng phần, hỏi ngay khi vướng.'],
              ['Nhân ra lô', 'Theo mục tiêu ngày của nhóm.'],
              ['Giảng lại', 'Dạy người mới tiếp theo — cách nhớ lâu nhất.']
            ] }
          ],
          hoi_nhanh: [
            { hoi: 'Một sản phẩm mới sắp ra mắt sẽ do nhóm nào làm video?', chon: ['Nhóm 1 — mở đường', 'Nhóm 2 — nhân rộng', 'Nhóm Livestream', 'Nhóm nào rảnh thì làm'], dap: 0,
              giai: 'Nhóm 1 lo sản phẩm mới và sản phẩm đang giảm số — cần người toàn diện: đạo diễn, quay, dựng video chuyển đổi.' },
            { hoi: 'Vì sao lead đồng hành phải tự làm nhiều hơn nhân sự?', chon: ['Để nhân sự làm ít đi', 'Để đủ cơ sở duyệt và biết Agent đưa ra đúng hay sai', 'Để thay nhân sự', 'Để báo cáo đẹp hơn'], dap: 1,
              giai: 'Không trực tiếp làm thì không đủ cơ sở duyệt kết quả, cũng không đánh giá được AI đúng hay sai.' }
          ]
        }
      ],
      kiem_tra: [
        { hoi: 'Lợi thế lớn nhất của workflow AI so với cách làm cũ là gì?', chon: ['Máy tính mạnh hơn', 'Có dữ liệu lớn để Agent học trước khi viết', 'Không cần người duyệt nữa', 'Video dài hơn'], dap: 1 },
        { hoi: 'Giọng, cảnh và chữ trên video căn cứ vào đâu?', chon: ['Sở thích của người dựng', 'Kịch bản đã duyệt', 'Video của đối thủ', 'Nhạc nền'], dap: 1 },
        { hoi: 'Video thế nào thì được tính là đạt chuẩn?', chon: ['Video dài trên 30 giây', 'Đã đăng, có link TikTok và gắn giỏ (Livestream: có link)', 'Có trên 1.000 lượt xem', 'Lead đã khen'], dap: 1 },
        { hoi: 'Ba tầng đo kết quả, theo đúng thứ tự?', chon: ['Hiệu quả → Số lượng → Đạt chuẩn', 'Số lượng → Đạt chuẩn → Hiệu quả', 'Đạt chuẩn → Hiệu quả → Số lượng', 'Chỉ cần đo số lượng'], dap: 1 },
        { hoi: 'Kỹ năng trọng tâm của Nhóm 2 (sản phẩm đang win) là gì?', chon: ['Quay phim ngoài trời', 'Kịch bản, nhận angle, dùng Agent, đánh giá và Kaizen', 'Chạy quảng cáo', 'Chụp ảnh sản phẩm'], dap: 1 },
        { hoi: 'Bước cuối trong lộ trình của người mới là gì?', chon: ['Nhận thưởng', 'Giảng lại cho người mới tiếp theo', 'Tự làm một mình', 'Học lại từ đầu'], dap: 1 },
        { hoi: 'Điểm khác lớn nhất giữa Agent và một chatbot AI thông thường?', chon: ['Agent nói chuyện tự nhiên hơn', 'Agent nhận việc, tự chia bước, dùng công cụ làm đến khi xong rồi báo lại', 'Agent không bao giờ sai', 'Agent không cần dữ liệu'], dap: 1 }
      ],
      tu_luan: [
        'Giảng lại vòng workflow bằng 3–5 câu, như đang nói với một người mới vào nhóm.',
        'Bạn thuộc nhóm nào? Kỹ năng trọng tâm của bạn là gì, và tuần này bạn luyện nó bằng việc gì?'
      ],
      bai_tap: [
        ['Giảng lại vòng workflow cho 1 đồng nghiệp', '15 phút', 'Người nghe kể lại được 3 điều: trúng hơn, nhanh hơn, giỏi dần'],
        ['Mở Dashboard, ghi tỷ lệ đạt chuẩn tuần này của dự án mình', '10 phút', 'Có con số và một câu nhận xét'],
        ['Chọn 1 video bán chạy trong kho, chỉ ra hook – thân – kêu gọi', '20 phút', 'Ghi đúng giây bắt đầu từng phần (chuẩn bị Buổi 2)']
      ],
      checklist: ['Nói lại được 3 điều vòng workflow mang lại: trúng hơn, nhanh hơn, giỏi dần', 'Biết mình ở nhóm nào và mục tiêu của nhóm', 'Đã xem số của dự án mình trên Dashboard', 'Đã giảng lại vòng workflow cho một đồng nghiệp']
    },
    // ================================================================ BUỔI 2
    {
      id: 'b2', so: 2, ten: 'Tư duy kịch bản', phu: 'Ba giây đầu quyết định video có được xem. Kịch bản quyết định video có ra đơn.',
      gop_y_ten: 'Buổi 2 · Sửa hook trên bản 1.0 (20/10)',
      bai: [
        {
          id: 'b2-1', ten: '3 giây đầu và 3 phần của kịch bản', phut: 2,
          tu_duy: 'Nghĩ như người xem đang lướt: mỗi giây phải có lý do để ở lại.',
          ky_nang: 'Chia một video bán hàng thành hook, thân, kêu gọi.',
          muc_tieu: ['Chia một video bán hàng thành hook, thân, kêu gọi.', 'Giải thích vì sao 3 giây đầu quyết định video có được xem.', 'Nêu việc của từng phần trong kịch bản.'],
          canh: [
            { loi: 'Ở buổi một, mình đã biết mọi thứ căn cứ từ kịch bản. Buổi này, mình học cách nghĩ một kịch bản bán hàng.',
              hinh: { loai: 'tieu-de', nhan: 'Buổi 2 · Bài 1', tieu: 'Tư duy kịch bản', phu: '3 giây đầu và 3 phần của một video bán hàng' } },
            { loi: 'Một video bán hàng có ba phần. Hook là ba giây đầu. Thân là phần chứng minh. Kêu gọi là phần cuối, mời người xem làm một việc.',
              hinh: { loai: 'thoi-gian' } },
            { loi: 'Người xem lướt TikTok rất nhanh. Họ quyết định ở lại hay lướt qua chỉ trong vài giây đầu. Vì vậy hook chỉ có một việc: làm người xem dừng tay. Cách hay dùng là chạm vào nỗi đau, cho thấy kết quả, đặt một câu hỏi, hoặc nói một điều bất ngờ.',
              hinh: { loai: 'danh-sach', tieu: 'Hook — làm người xem dừng tay', muc: [{ tieu: 'Nỗi đau', chu: 'chạm đúng điều khách đang khổ' }, { tieu: 'Kết quả', chu: 'cho thấy điều khách muốn có' }, { tieu: 'Câu hỏi', chu: 'hỏi đúng thắc mắc của khách' }, { tieu: 'Bất ngờ', chu: 'một điều khách chưa biết' }] } },
            { loi: 'Thân có việc làm người xem tin. Bằng chứng mạnh nhất là cảnh dùng thật, hình trước và sau, và điểm khác biệt của sản phẩm. Nói đúng sự thật, không hứa quá.',
              hinh: { loai: 'danh-sach', tieu: 'Thân — làm người xem tin', muc: [{ tieu: 'Dùng thật', chu: 'cảnh dùng sản phẩm thật' }, { tieu: 'Trước – sau', chu: 'thay đổi nhìn thấy được' }, { tieu: 'Khác biệt', chu: 'điểm chỉ sản phẩm này có' }] } },
            { loi: 'Kêu gọi chỉ nên có một hành động, thật rõ: bấm giỏ hàng, hoặc vào phiên live. Và nối thật mượt, để người xem không thấy bị cắt ngang.',
              hinh: { loai: 'danh-sach', tieu: 'Kêu gọi — một hành động rõ', muc: [{ tieu: 'Bấm giỏ hàng', chu: 'với video gắn giỏ' }, { tieu: 'Vào live', chu: 'với video kéo khách vào phiên live' }] } },
            { loi: 'Cuộc họp team ngày hai tháng mười một cũng chốt: trong một bản brief kịch bản, quan trọng nhất là ba giây đầu. Hook quyết định video có được xem. Thân và kêu gọi quyết định video có ra đơn.',
              hinh: { loai: 'trich', chu: 'Brief kịch bản quan trọng nhất là 3 giây đầu.', nguon: 'Họp Team AI · 02/11' } }
          ],
          y_chinh: [
            'Hook (3 giây đầu) làm người xem dừng tay: nỗi đau, kết quả, câu hỏi, điều bất ngờ.',
            'Thân làm người xem tin: cảnh dùng thật, trước – sau, điểm khác biệt — nói đúng sự thật.',
            'Kêu gọi có một hành động rõ (bấm giỏ hoặc vào live) và nối thật mượt.'
          ],
          khoi: [
            { loai: 'thoi-gian', tieu: 'Một video bán hàng 30 giây' },
            { loai: 'bang', tieu: 'Ba phần, ba việc', dau: ['Phần', 'Việc của nó', 'Khi duyệt hỏi', 'Đo bằng'], dong: [
              ['Hook', 'Làm người xem dừng tay', '3 giây đầu có làm mình dừng lại không?', 'Lượt xem, tỷ lệ xem vài giây đầu'],
              ['Thân', 'Làm người xem tin', 'Có bằng chứng thật không?', 'Thời gian xem'],
              ['Kêu gọi', 'Mời làm một việc', 'Có đúng một hành động rõ không?', 'Bấm giỏ, đơn hàng']
            ] },
            { loai: 'the', tieu: '4 kiểu hook hay dùng', muc: [
              { tieu: 'Nỗi đau', chu: '“Da dầu mà cứ đến chiều là bóng loáng?”' },
              { tieu: 'Kết quả', chu: 'Mở đầu bằng khoảnh khắc trước – sau, rồi mới kể.' },
              { tieu: 'Câu hỏi', chu: '“Bạn rửa mặt mấy lần một ngày?”' },
              { tieu: 'Bất ngờ', chu: 'Một sự thật khách chưa biết về thói quen hằng ngày.' }
            ] },
            { loai: 'trich', muc: [{ chu: 'Tập trung vào 3s hook ấn tượng, clone giọng mượt có cường điệu, chuyển cảnh mượt, source trám phù hợp.', nguon: 'Bài thu hoạch · 22/10' }] }
          ],
          hoi_nhanh: [
            { hoi: 'Hook có nhiệm vụ gì?', chon: ['Giới thiệu đầy đủ thành phần sản phẩm', 'Làm người xem dừng tay trong vài giây đầu', 'Kêu gọi bấm giỏ hàng', 'Chèn logo thương hiệu'], dap: 1,
              giai: 'Người xem quyết định ở lại hay lướt qua chỉ trong vài giây đầu. Hook chỉ có một việc: làm họ dừng tay.' }
          ]
        },
        {
          id: 'b2-2', ten: 'Một thân, nhiều hook', phut: 2,
          tu_duy: 'Nhân video có căn cứ: giữ phần đã thắng, thử phần chưa biết.',
          ky_nang: 'Chọn hook từ dữ liệu, đổi cả hình lẫn lời, để số đo chọn hook thắng.',
          muc_tieu: ['Giải thích nguyên lý một thân, nhiều hook.', 'Nêu vì sao đổi hook phải đổi cả hình lẫn lời.', 'Dùng dữ liệu để chọn hook thay vì đoán.'],
          canh: [
            { loi: 'Khi đã có một thân video chứng minh tốt, mình không cần quay lại từ đầu để có video mới.',
              hinh: { loai: 'tieu-de', nhan: 'Buổi 2 · Bài 2', tieu: 'Một thân, nhiều hook', phu: 'Nhân video mà vẫn có căn cứ' } },
            { loi: 'Giữ nguyên phần thân đã thắng, gắn năm hook khác nhau, bạn có năm video mới. Đăng cả năm, số đo sẽ cho biết hook nào giữ người xem tốt nhất. Đó là cách nhân video mà vẫn có căn cứ.',
              hinh: { loai: 'nhan' } },
            { loi: 'Hook không phải đoán. Agent chọn từ kho công thức hook bằng lời và bằng hình, rút ra từ hàng trăm video đang bán chạy. Việc của bạn là chọn angle hợp với sản phẩm và khách hàng, rồi duyệt.',
              hinh: { loai: 'danh-sach', tieu: 'Hook chọn từ dữ liệu, không đoán', muc: [{ tieu: 'Công thức hook bằng lời', chu: 'rút từ video đang bán chạy' }, { tieu: 'Hook bằng hình', chu: 'mở đầu bằng hình ảnh gây chú ý' }, { tieu: 'Hàng trăm video bán chạy', chu: 'để đối chiếu trước khi chọn' }] } },
            { loi: 'Số của chính team cho thấy một điều quan trọng. Video có cảnh quay thật đạt chuẩn năm mươi tư đến năm mươi bảy phần trăm. Video chỉ thay hook đạt mười đến hai mươi sáu phần trăm. Nên khi đổi hook, hãy đổi cả hình lẫn lời, đừng chỉ đổi chữ.',
              hinh: { loai: 'cot-ngang', tieu: 'Tỷ lệ đạt chuẩn theo dạng video', hau: '%', cot: [{ nhan: 'Cắt ghép tự quay', gt: 57 }, { nhan: 'Tự quay gắn giỏ', gt: 54 }, { nhan: 'Cắt live', gt: 40 }, { nhan: 'Thay hook', gt: 26 }, { nhan: 'Thay hook + kêu gọi', gt: 10 }] } },
            { loi: 'Giọng cũng là một phần của hook. Nhiều bạn rút ra: giọng của người thật, hoặc giọng lấy từ video đã thắng, nghe chân thật hơn giọng máy. Người xem tin giọng thật.',
              hinh: { loai: 'trich', chu: 'Voice KOC/KOL cho ra video hay và chân thật hơn so với voice AI.', nguon: 'Bài thu hoạch · 27/10' } },
            { loi: 'Với kêu gọi cũng vậy: thử nhiều cách kêu gọi, đừng dùng một câu cho mọi video. Số đo sẽ chọn giúp bạn.',
              hinh: { loai: 'trich', chu: 'Test nhiều CTA để xem CTA nào hiệu quả, thay vì dùng 1 CTA cho 4–5 video khác nhau.', nguon: 'Bài thu hoạch · 23/10' } }
          ],
          y_chinh: [
            'Giữ thân đã thắng, gắn nhiều hook khác nhau → nhiều video mới, không cần quay lại.',
            'Video có cảnh quay thật đạt chuẩn 54–57%, gấp đôi video chỉ thay hook — đổi cả hình lẫn lời.',
            'Hook, giọng, kêu gọi đều nên thử nhiều phương án — để số đo chọn, không đoán.'
          ],
          khoi: [
            { loai: 'nhan', tieu: '1 thân đã thắng × 5 hook = 5 video mới' },
            { loai: 'cot-ngang', tieu: 'Tỷ lệ đạt chuẩn theo dạng video', phu: 'Toàn team · Dashboard Video AI, đọc 03/11', hau: '%', cot: [{ nhan: 'Cắt ghép tự quay', gt: 57 }, { nhan: 'Tự quay gắn giỏ', gt: 54 }, { nhan: 'Cắt live', gt: 40 }, { nhan: 'Thay hook', gt: 26 }, { nhan: 'Thay hook + kêu gọi', gt: 10 }] },
            { loai: 'luu-y', chu: '<b>Đọc biểu đồ thế nào.</b> Video có cảnh quay thật đạt chuẩn cao nhất. Video dạng thay hook thấp hơn vì nhiều bản chỉ đổi lời mà giữ nguyên hình — bài thu hoạch 21/10 cũng ghi đúng điều này. Đổi hook là đổi cả hình mở đầu lẫn câu nói.' },
            { loai: 'trich', muc: [
              { chu: 'Voice KOC/KOL cho ra video hay và chân thật hơn so với voice AI.', nguon: 'Bài thu hoạch · 27/10' },
              { chu: 'Test nhiều CTA để xem CTA nào hiệu quả, thay vì dùng 1 CTA cho 4–5 video khác nhau.', nguon: 'Bài thu hoạch · 23/10' },
              { chu: 'Đa dạng tệp content: 10 video thì có thể chia các dạng như sale, nỗi đau, kết hợp với KOC/KOL.', nguon: 'Bài thu hoạch · 22/10' }
            ] }
          ],
          hoi_nhanh: [
            { hoi: 'Bạn có một thân video đã thắng. Cách nhanh nhất để có thêm 5 video có căn cứ?', chon: ['Quay lại 5 video mới từ đầu', 'Gắn 5 hook khác nhau — đổi cả hình lẫn lời — rồi để số đo chọn', 'Đổi nhạc nền 5 lần', 'Đăng lại video cũ 5 lần'], dap: 1,
              giai: 'Giữ phần đã thắng, thử phần chưa biết. Đổi cả hình lẫn lời để mỗi bản thật sự khác nhau.' }
          ]
        },
        {
          id: 'b2-3', ten: 'Duyệt kịch bản bằng 5 câu hỏi', phut: 2,
          tu_duy: 'Agent đề xuất, bạn quyết định — không tin cái gì 100%.',
          ky_nang: 'Duyệt kịch bản bằng 5 câu hỏi và đọc số theo từng phần.',
          muc_tieu: ['Dùng 5 câu hỏi để duyệt một kịch bản.', 'Biết đọc số nào cho hook, thân, kêu gọi.', 'Nói rõ cho Agent cần sửa gì khi trả kịch bản.'],
          canh: [
            { loi: 'Agent viết kịch bản trong vài giây. Nhưng người quyết định kịch bản có được dùng hay không là bạn. Đây là năm câu hỏi để duyệt nhanh mà chắc.',
              hinh: { loai: 'tieu-de', nhan: 'Buổi 2 · Bài 3', tieu: 'Duyệt kịch bản bằng 5 câu hỏi', phu: 'Agent đề xuất · bạn quyết định' } },
            { loi: 'Một: ba giây đầu có làm mình dừng tay không? Hai: có đúng nỗi đau, mong muốn của khách không? Ba: thân có bằng chứng thật không? Bốn: lời có đúng luật, không hứa quá không? Năm: kêu gọi có một hành động rõ không?',
              hinh: { loai: 'danh-sach', so: true, tieu: '5 câu hỏi duyệt kịch bản', muc: [{ tieu: '3 giây đầu', chu: 'có làm mình dừng tay?' }, { tieu: 'Khách hàng', chu: 'đúng nỗi đau, mong muốn?' }, { tieu: 'Bằng chứng', chu: 'thân có cảnh thật?' }, { tieu: 'Đúng luật', chu: 'không hứa quá?' }, { tieu: 'Kêu gọi', chu: 'một hành động rõ?' }] } },
            { loi: 'Câu số bốn rất quan trọng với mỹ phẩm và thực phẩm chức năng. Không bịa số liệu, không hứa chữa khỏi, không cam kết kết quả tuyệt đối. Máy có kiểm lời bị cấm, nhưng người duyệt vẫn đọc lại.',
              hinh: { loai: 'danh-sach', tieu: 'Lời quảng cáo — 3 điều không', muc: [{ tieu: 'Không bịa số', chu: 'mọi con số phải có nguồn' }, { tieu: 'Không hứa chữa khỏi', chu: 'nói đúng điều sản phẩm làm được' }, { tieu: 'Không tuyệt đối', chu: 'tránh “100%”, “vĩnh viễn”' }] } },
            { loi: 'Một câu trong bài thu hoạch nên dán lên bàn làm việc: không tin cái gì một trăm phần trăm, phải đọc, phản biện, tìm lỗi. Thấy sai thì nói rõ sai ở đâu và muốn thế nào, để Agent viết lại.',
              hinh: { loai: 'trich', chu: 'Không tin cái gì 100%, phải đọc, phản biện, tìm lỗi của nó.', nguon: 'Bài thu hoạch · 19/10' } },
            { loi: 'Sau khi đăng, đọc số theo từng phần. Lượt xem và tỷ lệ giữ người xem vài giây đầu cho biết hook. Thời gian xem cho biết thân. Bấm giỏ và đơn hàng cho biết kêu gọi. Phần nào yếu thì sửa đúng phần đó.',
              hinh: { loai: 'doc-so' } },
            { loi: 'Với nhóm một, kỹ năng này giúp bạn đạo diễn cảnh mở đầu ngay từ lúc quay. Với nhóm hai, nó giúp bạn viết nhiều hook từ video đang thắng và giữ lại hook tốt nhất. Hẹn gặp bạn ở buổi ba.',
              hinh: { loai: 'nhom', ngan: true, n1: 'Đạo diễn cảnh mở đầu ngay từ lúc quay', n2: 'Viết nhiều hook từ video win, giữ hook thắng' } }
          ],
          y_chinh: [
            '5 câu hỏi: 3 giây đầu · đúng khách hàng · bằng chứng thật · đúng luật · một kêu gọi rõ.',
            'Thấy sai thì nói rõ sai ở đâu và muốn thế nào — Agent viết lại trong vài giây.',
            'Đọc số theo phần: lượt xem cho hook, thời gian xem cho thân, bấm giỏ và đơn cho kêu gọi.'
          ],
          khoi: [
            { loai: 'kiem', tieu: '5 câu hỏi duyệt kịch bản — tick khi duyệt thử', muc: ['3 giây đầu có làm mình dừng tay không?', 'Có đúng nỗi đau, mong muốn của khách hàng không?', 'Thân có bằng chứng thật (dùng thật, trước – sau, điểm khác biệt) không?', 'Lời có đúng luật, không bịa số, không hứa chữa khỏi không?', 'Kêu gọi có đúng một hành động rõ không?'] },
            { loai: 'cau-noi', tieu: 'Trả kịch bản cho Agent — nói rõ sai ở đâu, muốn thế nào', muc: [
              'Hook đang kể lể. Đổi thành một câu hỏi chạm nỗi đau da dầu, đọc dưới 3 giây.',
              'Bỏ câu “hết mụn sau 3 ngày”. Chỉ nói điều sản phẩm làm được, đúng hồ sơ sản phẩm.',
              'Thân thiếu bằng chứng. Thêm cảnh dùng thật và một khoảnh khắc trước – sau.',
              'Kêu gọi đang có 2 việc. Chỉ giữ “bấm giỏ hàng bên dưới”.'
            ] },
            { loai: 'doc-so', tieu: 'Đọc số theo từng phần' },
            { loai: 'luu-y', chu: '<b>Lời quảng cáo mỹ phẩm, thực phẩm chức năng.</b> Không bịa số liệu, không hứa chữa khỏi, không cam kết tuyệt đối (“100%”, “vĩnh viễn”). Máy có kiểm lời bị cấm trước khi dựng, nhưng người duyệt vẫn đọc lại — người là người quyết định cuối.' }
          ],
          hoi_nhanh: [
            { hoi: 'Kịch bản có câu “trị dứt điểm mụn sau 3 ngày”. Bạn làm gì?', chon: ['Giữ lại vì nghe hấp dẫn', 'Trả lại, yêu cầu bỏ lời hứa tuyệt đối và chỉ nói điều sản phẩm làm được', 'Đổi thành “sau 5 ngày”', 'Thêm nhạc cho bớt chú ý'], dap: 1,
              giai: 'Đây là lời hứa tuyệt đối — vi phạm câu hỏi số 4. Nói rõ cho Agent bỏ câu đó và chỉ nói điều có thật.' },
            { hoi: 'Video có nhiều lượt xem nhưng gần như không ai bấm giỏ. Phần nào cần sửa trước?', chon: ['Hook', 'Kêu gọi (và thân)', 'Nhạc nền', 'Logo'], dap: 1,
              giai: 'Lượt xem tốt nghĩa là hook đã làm tốt việc của nó. Không ai bấm giỏ thì xem lại thân (đã đủ tin chưa) và kêu gọi (đã rõ chưa).' }
          ]
        }
      ],
      kiem_tra: [
        { hoi: 'Ba phần của một kịch bản bán hàng là gì?', chon: ['Mở bài, thân bài, kết bài', 'Hook, thân, kêu gọi', 'Nhạc, hình, chữ', 'Giới thiệu, giá, khuyến mãi'], dap: 1 },
        { hoi: 'Vì sao 3 giây đầu quan trọng nhất?', chon: ['Vì TikTok tính tiền theo giây', 'Vì người xem quyết định ở lại hay lướt qua trong vài giây đầu', 'Vì logo phải ở đầu video', 'Vì giọng đọc nhanh nhất ở đầu'], dap: 1 },
        { hoi: 'Nguyên lý “một thân, nhiều hook” nghĩa là gì?', chon: ['Một video dùng nhiều nhạc nền', 'Giữ phần thân đã thắng, gắn nhiều hook khác nhau để có nhiều video mới', 'Một hook dùng cho mọi sản phẩm', 'Quay nhiều thân cho một hook'], dap: 1 },
        { hoi: 'Theo số của team, dạng video nào đạt chuẩn cao nhất?', chon: ['Thay hook + kêu gọi', 'Video có cảnh quay thật (cắt ghép tự quay, tự quay gắn giỏ)', 'Thay hook', 'Không khác nhau'], dap: 1 },
        { hoi: 'Câu nào KHÔNG được có trong lời quảng cáo mỹ phẩm?', chon: ['“Da mình dịu hơn sau một tuần dùng”', '“Cam kết hết mụn vĩnh viễn 100%”', '“Bấm giỏ hàng bên dưới nhé”', '“Bạn có đang bị da dầu?”'], dap: 1 },
        { hoi: 'Số nào cho biết hook làm tốt việc của nó?', chon: ['Số đơn hàng', 'Lượt xem và tỷ lệ giữ người xem vài giây đầu', 'Số bình luận chê', 'Độ dài video'], dap: 1 }
      ],
      tu_luan: [
        'Viết 3 hook khác nhau cho một sản phẩm của dự án bạn — mỗi hook một kiểu: nỗi đau, kết quả, câu hỏi.',
        'Lấy một kịch bản Agent viết gần đây, duyệt bằng 5 câu hỏi. Câu nào chưa đạt, và bạn yêu cầu sửa thế nào?'
      ],
      bai_tap: [
        ['Chia 1 video bán chạy thành hook – thân – kêu gọi', '20 phút', 'Ghi đúng giây bắt đầu từng phần + việc của từng phần'],
        ['Từ 1 thân video đã đạt, làm 3 video với 3 hook khác nhau', 'trong ngày', 'Mỗi hook khác cả hình lẫn lời'],
        ['Sau 3 ngày, đọc số 3 video đó', '15 phút', 'Chỉ ra hook nào giữ người xem tốt nhất và vì sao']
      ],
      checklist: ['Chia được một video thành hook – thân – kêu gọi', 'Nói được 4 kiểu hook hay dùng', 'Duyệt thử một kịch bản bằng 5 câu hỏi', 'Biết đọc số nào cho từng phần']
    },
    // ================================================================ BUỔI 3
    {
      id: 'b3', so: 3, ten: 'Tận dụng và Kaizen', phu: 'Kho có sẵn là mỏ nguyên liệu. Làm kỹ một, nhân ra nhiều — và giỏi lên sau mỗi lô.',
      gop_y_ten: 'Buổi 3 · Cắt video Livestream (21/10)',
      bai: [
        {
          id: 'b3-1', ten: 'Kho có sẵn là mỏ: một buổi live thành nhiều video', phut: 2,
          tu_duy: 'Không thiếu nguyên liệu — chỉ thiếu thời gian khai thác. Agent đọc hết, người chọn.',
          ky_nang: 'Chọn đoạn đáng dùng trong một buổi live và biến nó thành video bán hàng.',
          muc_tieu: ['Kể 3 nguồn nguyên liệu có sẵn.', 'Mô tả 4 bước biến một buổi live thành video bán hàng.', 'Nêu 7 dạng video của nhóm Livestream.'],
          canh: [
            { loi: 'Công ty không thiếu nguyên liệu làm video. Cái thiếu là thời gian để xem hết và chọn ra phần đáng dùng. Đây là việc Agent làm rất giỏi.',
              hinh: { loai: 'tieu-de', nhan: 'Buổi 3 · Bài 1', tieu: 'Kho có sẵn là mỏ', phu: 'Một buổi live thành nhiều video bán hàng' } },
            { loi: 'Có ba mỏ nguyên liệu. Một là các buổi live dài hàng giờ, chứa lời chốt đơn thật của host. Hai là video cũ, video của Affiliate và KOL. Ba là giọng đọc của những video đã thắng.',
              hinh: { loai: 'danh-sach', tieu: '3 mỏ nguyên liệu', muc: [{ tieu: 'Buổi live', chu: 'hàng giờ lời chốt đơn thật' }, { tieu: 'Video cũ, Affiliate, KOL', chu: 'cảnh thật đã có sẵn' }, { tieu: 'Giọng video win', chu: 'giọng người thật đã được kiểm chứng' }] } },
            { loi: 'Biến một buổi live thành video bán hàng theo bốn bước. Chọn đoạn có giá trị: lời chốt, cảnh dùng sản phẩm, câu trả lời cho khách. Bỏ đoạn lặp và đoạn chờ. Trám thêm cảnh sản phẩm để video liền mạch và gắn được giỏ. Cuối cùng là kêu gọi, nối thật mượt.',
              hinh: { loai: 'buoc', muc: ['Chọn đoạn có giá trị', 'Bỏ đoạn lặp, đoạn chờ', 'Trám cảnh sản phẩm', 'Kêu gọi nối mượt'] } },
            { loi: 'Nhóm Livestream đã làm hai trăm sáu mươi video, nhiều nhất trong các nhóm, phần lớn từ chính các buổi live của mình.',
              hinh: { loai: 'so', tieu: 'Nhóm Livestream', muc: [{ so: 260, don: 'video', phu: 'nhiều nhất các nhóm' }, { so: 227, don: 'video cắt từ live', phu: 'dạng làm nhiều nhất của cả team' }] } },
            { loi: 'Như một bạn đã viết sau buổi học: cắt live là cách tạo video mới từ chính buổi live, thành video bán hàng gắn được giỏ.',
              hinh: { loai: 'trich', chu: 'Dạng video cắt live là một cách tạo video mới, tận dụng video live để tạo ra một video bán hàng gắn giỏ.', nguon: 'Bài thu hoạch · 21/10' } },
            { loi: 'Từ một buổi live, nhóm Livestream làm đủ bảy dạng: highlight, teasing, trả lời bình luận, tình huống ngắn, video cùng KOC và Affiliate, khoe deal hay mở hộp, và chuyên gia nói ngắn.',
              hinh: { loai: 'chip', tieu: '7 dạng video từ một buổi live', muc: ['Highlight', 'Teasing', 'Trả lời bình luận', 'POV / tình huống ngắn', 'KOC / Affiliate', 'Khoe deal / mở hộp', 'Chuyên gia nói ngắn'] } }
          ],
          y_chinh: [
            '3 mỏ nguyên liệu: buổi live, video cũ / Affiliate / KOL, giọng của video đã thắng.',
            'Live → video: chọn đoạn giá trị → bỏ đoạn lặp, chờ → trám cảnh sản phẩm → kêu gọi nối mượt.',
            'Nhóm Livestream đã làm 260 video, làm đủ 7 dạng từ một buổi live.'
          ],
          khoi: [
            { loai: 'buoc', tieu: 'Một buổi live → video bán hàng', muc: [
              ['Chọn đoạn có giá trị', 'Lời chốt đơn, cảnh dùng sản phẩm, câu trả lời cho khách.'],
              ['Bỏ đoạn lặp, đoạn chờ', 'Đoạn chào khách, chờ người vào, nhắc lại giá nhiều lần.'],
              ['Trám cảnh sản phẩm', 'Để video liền mạch và gắn được giỏ hàng.'],
              ['Kêu gọi nối mượt', 'Chuyển cảnh, âm thanh nhỏ dần — không cắt cụt.']
            ] },
            { loai: 'so', muc: [
              { so: '260', chu: 'video nhóm Livestream', phu: 'nhiều nhất các nhóm' },
              { so: '227', chu: 'video cắt từ live', phu: 'dạng làm nhiều nhất của cả team' },
              { so: '22', chu: 'bài thu hoạch buổi 21/10', phu: 'buổi học cắt live đông nhất' }
            ] },
            { loai: 'trich', muc: [
              { chu: 'Cắt live stream đa dạng, không cần dập theo 1 khuôn mẫu.', nguon: 'Bài thu hoạch · 21/10' },
              { chu: 'Đoạn chuyển hướng hành động (CTA) luôn cần SFX hoặc chuyển cảnh mượt để tránh làm đứt đoạn cảm xúc người xem.', nguon: 'Bài thu hoạch · 21/10' }
            ] }
          ],
          hoi_nhanh: [
            { hoi: 'Vì sao phải trám thêm cảnh sản phẩm vào video cắt từ live?', chon: ['Để video dài hơn', 'Để video liền mạch và gắn được giỏ hàng', 'Để che mặt host', 'Để đổi giọng'], dap: 1,
              giai: 'Cảnh trám giúp video liền mạch và có cảnh sản phẩm rõ ràng — điều kiện để gắn giỏ.' }
          ]
        },
        {
          id: 'b3-2', ten: 'Làm kỹ một, nhân ra nhiều', phut: 2,
          tu_duy: 'Sửa một lần ở video mẫu rẻ hơn sửa mười lần ở cả lô.',
          ky_nang: 'Làm một video mẫu đạt chuẩn rồi nhân ra lô.',
          muc_tieu: ['Giải thích vì sao video đầu tiên phải làm kỹ.', 'Mô tả cách nhân một video mẫu ra cả lô.', 'Nêu 3 điều kiện trước khi nhân.'],
          canh: [
            { loi: 'Khi đã có nguyên liệu, đừng vội làm mười video một lúc. Nguyên lý là: làm kỹ một, rồi mới nhân ra nhiều.',
              hinh: { loai: 'tieu-de', nhan: 'Buổi 3 · Bài 2', tieu: 'Làm kỹ một, nhân ra nhiều', phu: 'Video mẫu trước · cả lô sau' } },
            { loi: 'Video đầu tiên làm chậm. Duyệt kỹ từng phần: kịch bản, giọng, hình, kêu gọi. Khi video mẫu đã ưng, Agent đã biết đúng gu bạn muốn. Lúc đó mới nhân ra cả lô, và cả lô đều đi theo video mẫu.',
              hinh: { loai: 'lo' } },
            { loi: 'Một bạn đã tự đo trên việc của mình: làm kỹ video đầu tiên giúp tiết kiệm tám mươi phần trăm thời gian chỉnh sửa cho các video sau.',
              hinh: { loai: 'so', tieu: 'Nhân sự tự ghi nhận', muc: [{ so: 80, hau: '%', don: 'thời gian chỉnh sửa tiết kiệm', phu: 'nhờ làm kỹ video đầu tiên' }] } },
            { loi: 'Làm vội mười video thì lỗi lặp lại mười lần, và bạn sửa mười lần. Làm kỹ một video thì lỗi được sửa một lần, trước khi nhân.',
              hinh: { loai: 'so-sanh', tieu: 'Sửa bao nhiêu lần?', nhan_truoc: 'Làm vội', nhan_nay: 'Làm kỹ', truoc: 'Làm vội 10 video → lỗi lặp 10 lần, sửa 10 lần', nay: 'Làm kỹ 1 video mẫu → sửa 1 lần, nhân ra 10' } },
            { loi: 'Chỉ nhân khi video mẫu đã qua năm câu hỏi duyệt ở buổi hai, lead đã xem, giọng và kêu gọi đã ổn.',
              hinh: { loai: 'danh-sach', so: true, tieu: 'Khi nào được nhân?', muc: [{ tieu: 'Qua 5 câu hỏi', chu: 'duyệt kịch bản ở Buổi 2' }, { tieu: 'Lead đã xem', chu: 'video mẫu được duyệt' }, { tieu: 'Giọng và kêu gọi ổn', chu: 'hai chỗ hay lỗi nhất' }] } },
            { loi: 'Đây cũng là điều nhiều bạn rút ra giống nhau: sửa kỹ một video mẫu đầu tiên, rồi mới sản xuất theo lô.',
              hinh: { loai: 'trich', chu: 'Nên sửa kĩ 1 video demo đầu tiên để sản xuất theo lô.', nguon: 'Bài thu hoạch · 22/10' } }
          ],
          y_chinh: [
            'Video mẫu làm chậm, duyệt kỹ từng phần — Agent học đúng gu trước khi nhân.',
            'Làm vội 10 video = sửa 10 lần. Làm kỹ 1 video = sửa 1 lần.',
            'Chỉ nhân khi: qua 5 câu hỏi duyệt, lead đã xem, giọng và kêu gọi đã ổn.'
          ],
          khoi: [
            { loai: 'lo', tieu: '1 video mẫu đã duyệt → cả lô đi theo' },
            { loai: 'so-sanh', tieu: 'Làm vội và làm kỹ', nhan: ['', 'Làm vội 10 video', 'Làm kỹ 1 rồi nhân'], dong: [
              ['Lỗi', 'Lặp lại ở cả 10 video', 'Sửa một lần ở video mẫu'],
              ['Thời gian sửa', 'Sửa 10 lần', 'Nhân sự tự ghi nhận: tiết kiệm khoảng 80%'],
              ['Gu video', 'Mỗi video một kiểu', 'Cả lô cùng gu đã duyệt']
            ] },
            { loai: 'trich', muc: [
              { chu: 'Kiểm soát chất lượng đầu vào, làm kỹ video 1 giúp tiết kiệm 80% thời gian chỉnh sửa cho các cổng/video tiếp theo.', nguon: 'Bài thu hoạch · 21/10' },
              { chu: 'Làm từ những video cắt live nhỏ trước cho chỉn chu để AI học rồi nhân rộng sau.', nguon: 'Bài thu hoạch · 21/10' },
              { chu: 'Cần training kĩ từ kịch bản đến video mẫu trước khi sản xuất hàng loạt.', nguon: 'Bài thu hoạch · 22/10' }
            ] }
          ],
          hoi_nhanh: [
            { hoi: 'Khi nào thì được nhân video mẫu ra cả lô?', chon: ['Ngay khi Agent viết xong kịch bản', 'Khi video mẫu đã qua 5 câu hỏi duyệt, lead đã xem, giọng và kêu gọi đã ổn', 'Khi gần hết giờ làm', 'Khi đã có 10 kịch bản'], dap: 1,
              giai: 'Nhân quá sớm thì lỗi của video mẫu bị nhân lên cả lô.' }
          ]
        },
        {
          id: 'b3-3', ten: 'Kaizen: Agent giỏi lên sau mỗi lô', phut: 2,
          tu_duy: 'Lỗi chỉ phải sửa một lần — bài học của một người là của cả team.',
          ky_nang: 'Làm vòng Kaizen 3 câu cuối ngày.',
          muc_tieu: ['Giải thích Kaizen trong workflow.', 'Làm vòng Kaizen 3 câu cuối ngày.', 'Đọc kết quả của vòng học lại trên số của team.'],
          canh: [
            { loi: 'Kaizen nghĩa là cải tiến liên tục, từng chút mỗi ngày. Trong workflow, Kaizen là lý do Agent hôm nay giỏi hơn hôm qua.',
              hinh: { loai: 'tieu-de', nhan: 'Buổi 3 · Bài 3', tieu: 'Kaizen', phu: 'Agent giỏi lên sau mỗi lô' } },
            { loi: 'Mỗi lần bạn sửa một lỗi, hãy ghi lại thành bài học và nói Agent nhớ. Lần sau gặp tình huống giống vậy, Agent làm đúng ngay, không cần bạn nhắc. Lỗi chỉ phải sửa một lần.',
              hinh: { loai: 'vong-nho', muc: ['Gặp lỗi', 'Sửa', 'Ghi bài học', 'Agent nhớ', 'Không lặp lại'] } },
            { loi: 'Cuối ngày, dành năm phút trả lời ba câu. Hôm nay mình sửa lỗi gì nhiều nhất? Vì sao lỗi đó xảy ra? Và ghi bài học gì để lần sau không lặp lại?',
              hinh: { loai: 'danh-sach', so: true, tieu: 'Kaizen 5 phút cuối ngày', muc: [{ tieu: 'Sửa gì nhiều nhất?', chu: 'lỗi lặp lại trong ngày' }, { tieu: 'Vì sao?', chu: 'do dữ liệu, kịch bản hay cách yêu cầu' }, { tieu: 'Ghi bài học gì?', chu: 'để Agent nhớ, lần sau không lặp' }] } },
            { loi: 'Kết quả của vòng học lại thấy rõ trên số. Tỷ lệ video đạt chuẩn của team tăng ba tuần liền: ba mươi sáu, bốn mươi tám, rồi năm mươi mốt phần trăm.',
              hinh: { loai: 'cot', tieu: 'Tỷ lệ đạt chuẩn theo tuần', hau: '%', cot: [{ nhan: '13–17/10', gt: 36 }, { nhan: '19–25/10', gt: 48 }, { nhan: '26/10–01/11', gt: 51 }], chu_cuoi: 'Tăng 3 tuần liền' } },
            { loi: 'Một bạn đã tóm gọn: cuối mỗi buổi làm việc phải có khâu Kaizen, để nạp lại bài học cho hệ thống, giúp bộ não thông minh hơn qua từng chiến dịch.',
              hinh: { loai: 'trich', chu: 'Cuối mỗi chu kỳ, buổi làm việc phải có khâu Kaizen để nạp lại bài học kinh nghiệm cho hệ thống, giúp bộ não thông minh hơn qua từng chiến dịch.', nguon: 'Bài thu hoạch · 21/10' } },
            { loi: 'Bạn đã đi hết ba buổi nguyên lý. Dữ liệu lớn dạy Agent. Kịch bản dẫn đường. Làm kỹ một, nhân ra nhiều. Và Kaizen mỗi ngày. Bước tiếp theo là thực hành trên Xưởng video. Chúc bạn làm ra thật nhiều video bán được hàng.',
              hinh: { loai: 'ket', tieu: 'Bạn đã có nền tảng', muc: ['Dữ liệu lớn dạy Agent', 'Kịch bản dẫn đường', 'Làm kỹ một, nhân ra nhiều', 'Kaizen mỗi ngày'] } }
          ],
          y_chinh: [
            'Mỗi lỗi sửa xong → ghi thành bài học → Agent nhớ → lần sau không lặp.',
            'Kaizen 5 phút cuối ngày: sửa gì nhiều nhất · vì sao · ghi bài học gì.',
            'Tỷ lệ đạt chuẩn của team tăng 3 tuần liền: 36% → 48% → 51%.'
          ],
          khoi: [
            { loai: 'vong-nho', tieu: 'Vòng Kaizen', muc: ['Gặp lỗi', 'Sửa', 'Ghi bài học', 'Agent nhớ', 'Không lặp lại'] },
            { loai: 'cot', tieu: 'Tỷ lệ đạt chuẩn theo tuần', phu: 'Toàn team · cùng một cách tính · Dashboard Video AI', hau: '%', cot: [{ nhan: '13–17/10', gt: 36 }, { nhan: '19–25/10', gt: 48 }, { nhan: '26/10–01/11', gt: 51 }] },
            { loai: 'cau-noi', tieu: 'Nói với Agent để ghi bài học', muc: [
              'Ghi bài học: kêu gọi ở video cắt live phải nối bằng chuyển cảnh mượt, âm thanh nhỏ dần. Lần sau làm đúng như vậy.',
              'Hôm nay mình sửa giọng 4 lần vì đọc quá nhanh. Ghi lại: sản phẩm này đọc chậm, nhấn vào lợi ích.',
              'Tổng kết hôm nay: mình đã sửa những lỗi gì nhiều nhất? Gợi ý bài học nào nên ghi lại?'
            ] },
            { loai: 'trich', muc: [{ chu: 'Cuối mỗi chu kỳ, buổi làm việc phải có khâu Kaizen để nạp lại bài học kinh nghiệm cho hệ thống, giúp bộ não thông minh hơn qua từng chiến dịch.', nguon: 'Bài thu hoạch · 21/10' }] }
          ],
          hoi_nhanh: [
            { hoi: 'Bạn vừa sửa cùng một lỗi giọng lần thứ ba trong ngày. Việc nên làm là gì?', chon: ['Tiếp tục sửa tay mỗi lần', 'Ghi thành bài học và nói Agent nhớ để lần sau không lặp', 'Đổi sang sản phẩm khác', 'Bỏ giọng đọc'], dap: 1,
              giai: 'Lỗi chỉ nên sửa một lần. Ghi thành bài học thì Agent nhớ — cho cả bạn và cả team.' }
          ]
        }
      ],
      kiem_tra: [
        { hoi: 'Ba mỏ nguyên liệu có sẵn để làm video là gì?', chon: ['Ảnh mạng, nhạc mạng, chữ mạng', 'Buổi live; video cũ, Affiliate, KOL; giọng của video đã thắng', 'Video đối thủ tải về', 'Chỉ có video quay mới'], dap: 1 },
        { hoi: 'Bước đầu tiên khi biến một buổi live thành video bán hàng?', chon: ['Thêm nhạc nền', 'Chọn đoạn có giá trị: lời chốt, cảnh dùng sản phẩm, câu trả lời cho khách', 'Cắt đều mỗi 30 giây', 'Đổi giọng host'], dap: 1 },
        { hoi: 'Vì sao phải làm kỹ video mẫu trước khi nhân?', chon: ['Để có video đẹp nhất để khoe', 'Để lỗi được sửa một lần, không bị nhân lên cả lô', 'Vì máy chạy chậm', 'Để lead có việc làm'], dap: 1 },
        { hoi: 'Kaizen trong workflow là gì?', chon: ['Một phần mềm dựng video', 'Cải tiến liên tục: lỗi sửa xong thành bài học để Agent nhớ', 'Một kiểu hook', 'Báo cáo cuối tháng'], dap: 1 },
        { hoi: 'Ba câu Kaizen cuối ngày là gì?', chon: ['Làm bao nhiêu video, mấy giờ về, mai làm gì', 'Sửa gì nhiều nhất, vì sao, ghi bài học gì', 'Ai làm sai, sai ở đâu, phạt thế nào', 'Video nào đẹp, nhạc gì, chữ gì'], dap: 1 },
        { hoi: 'Tỷ lệ đạt chuẩn của team qua 3 tuần cho thấy điều gì?', chon: ['Không thay đổi', 'Tăng 3 tuần liền: 36% → 48% → 51% — vòng học lại có tác dụng', 'Giảm dần', 'Chỉ tăng ở một nhóm'], dap: 1 }
      ],
      tu_luan: [
        'Chọn một buổi live (hoặc một video cũ) của dự án bạn. Liệt kê 3 đoạn đáng dùng và vì sao.',
        'Ghi 3 câu Kaizen của một ngày làm việc gần nhất: sửa gì nhiều nhất, vì sao, ghi bài học gì.'
      ],
      bai_tap: [
        ['Làm 1 video mẫu thật kỹ, nhờ lead xem', 'trong ngày', 'Qua đủ 5 câu hỏi duyệt'],
        ['Nhân video mẫu ra lô 5 video', 'trong ngày', 'Cả lô cùng gu với video mẫu'],
        ['Cuối ngày ghi 3 câu Kaizen', '5 phút', 'Có ít nhất 1 bài học đã nói Agent nhớ']
      ],
      checklist: ['Kể được 3 mỏ nguyên liệu có sẵn', 'Nói được 4 bước biến buổi live thành video', 'Đã làm một video mẫu trước khi nhân lô', 'Đã làm Kaizen cuối ngày ít nhất một lần']
    },
    // ================================================================ BUỔI 4 — thực hành (cảnh = ảnh màn hình thật + giọng Trâm của khoá Xưởng, canh-xuong.js)
    {
      id: 'b4', so: 4, phan: 2, ten: 'Làm video trên Xưởng', phu: 'Đi hết một vòng trên web: gửi yêu cầu, duyệt 4 cổng, chốt video, tự đăng và dán link để máy đo.',
      gop_y_ten: 'Buổi 5 · Xưởng video (02/11)',
      bai: [
        {
          id: 'b4-1', ten: 'Làm quen và gửi yêu cầu', phut: 5, canh: window.CANH_XUONG['b4-1'],
          tu_duy: 'Yêu cầu đúng thì máy làm trúng — chọn đúng sản phẩm và nhóm hàng là xong một nửa.',
          ky_nang: 'Gửi một yêu cầu video đúng sản phẩm, đúng nhóm hàng, đúng mục tiêu.',
          muc_tieu: ['Nhận ra các vùng chính của Xưởng: danh sách video, Kho dữ liệu, Trình sửa, trợ lý Agent.', 'Gửi một yêu cầu video: sản phẩm, cách dựng, nhóm hàng, mục tiêu, giọng, câu mở.'],
          y_chinh: [
            'Mỗi thẻ ở trang đầu là một video; nhãn “đến lượt bạn” là video đang chờ bạn duyệt.',
            'Chọn “Sản phẩm đã có” là máy tự điền tên, shop, hồ sơ, câu kêu gọi và kho cảnh.',
            'Chọn đúng nhóm hàng để máy kiểm đúng lời cấm; ô điểm nổi bật chỉ ghi điều có thật.'
          ],
          khoi: [
            { loai: 'buoc', tieu: 'Gửi yêu cầu trong 6 bước', muc: [
              ['Chọn sản phẩm đã có', 'Máy điền sẵn hồ sơ, câu kêu gọi, kho cảnh.'],
              ['Chọn “Bạn đang có gì”', 'Clip quay thật, kho cảnh đã quay, hay đã có video rồi.'],
              ['Chọn nhóm hàng', 'Mỹ phẩm, thực phẩm chức năng… để máy kiểm đúng lời cấm.'],
              ['Mục tiêu và thời lượng', 'Gắn giỏ hàng = video bán thẳng, có kêu gọi bấm giỏ ở cuối.'],
              ['Giọng và câu mở', 'Nghe thử giọng; câu mở để máy chọn theo công thức video bán chạy, hoặc tự chọn.'],
              ['Gửi yêu cầu', 'Máy viết kịch bản rồi dừng chờ bạn ở Cổng 1.']
            ] },
            { loai: 'luu-y', chu: '<b>Không cần ngồi chờ máy.</b> Gửi xong bạn làm việc khác; tới lượt bạn duyệt thì tiêu đề tab hiện chấm tròn và hộp “Đến lượt bạn” nói rõ việc cần làm.' }
          ],
          hoi_nhanh: [
            { loai: 'bam', anh: 'nha', dung: 'moi', hoi: 'Bạn muốn làm một video mới. Bấm vào đâu?', goi_y: 'Nút nằm ở thanh trên cùng.', giai: 'Nút “Làm video mới” ở thanh trên cùng mở trang Yêu cầu video.' },
            { loai: 'bam', anh: 'moi-giua', dung: 'nhom', hoi: 'Sản phẩm là kem chấm mụn. Ô nào phải chọn đúng để máy kiểm lời cấm của mỹ phẩm?', goi_y: 'Ô nói về nhóm hàng.', giai: 'Chọn đúng nhóm hàng Mỹ phẩm thì máy kiểm đúng những lời bị cấm của mỹ phẩm.' }
          ]
        },
        {
          id: 'b4-2', ten: 'Cổng 1 và 2: duyệt kịch bản, nghe giọng', phut: 5, canh: window.CANH_XUONG['b4-2'],
          tu_duy: 'Sửa ở kịch bản rẻ nhất — Cổng 1 là chỗ duyệt kỹ nhất.',
          ky_nang: 'Duyệt 3 câu mở, kiểu chữ, storyboard và file đọc thử; chưa ổn thì chọn đúng gợi ý sửa.',
          muc_tieu: ['Duyệt kịch bản ở Cổng 1: ba câu mở A/B/C, kiểu chữ mở đầu, storyboard, cảnh báo của máy kiểm.', 'Nghe file đọc thử ở Cổng 2 và xử lý chữ đọc sai.', 'Bấm Không đạt đúng cách: tích gợi ý, ghi góp ý ngắn.'],
          y_chinh: [
            'Ba câu mở A, B, C = ba bản video để đăng thử — máy đo bản nào thắng.',
            'Máy kiểm không bịa, không lời cấm; người duyệt vẫn đọc lại rồi mới bấm Đạt.',
            'Chưa ổn thì bấm Không đạt và tích gợi ý đánh số — không phải viết dài.'
          ],
          khoi: [
            { loai: 'bang', tieu: '4 cổng người duyệt', dau: ['Cổng', 'Bạn xem gì', 'Máy làm gì'], dong: [
              ['1 · Kịch bản', '3 câu mở, kiểu chữ, storyboard', 'Kiểm lời cấm, không bịa'],
              ['2 · Giọng', 'File đọc thử, chữ nghi đọc sai', 'Đọc giọng, tự nghe lại'],
              ['3 · Hình', 'Storyboard khung thật, xem thử 8 giây', 'Ráp video, chụp khung'],
              ['4 · Video', 'Video hoàn chỉnh', 'Render, kiểm chớp và âm lượng']
            ] },
            { loai: 'luu-y', chu: '<b>Nhớ 5 câu hỏi của Buổi 2</b> khi duyệt kịch bản: 3 giây đầu · đúng khách hàng · bằng chứng thật · đúng luật · một kêu gọi rõ.' }
          ],
          hoi_nhanh: [
            { loai: 'bam', anh: 'c1-dau', dung: 'toi', hoi: 'Video đang chờ bạn duyệt. Bấm gì để nhảy thẳng xuống nút duyệt?', goi_y: 'Trong hộp “Đến lượt bạn”.', giai: 'Nút “Tới chỗ bấm” cuộn trang xuống đúng nút duyệt.' },
            { loai: 'bam', anh: 'c1-duyet', dung: 'dat', hoi: 'Kịch bản đã ổn. Bấm vào đâu để máy đọc thử giọng?', goi_y: 'Nút xanh trong hộp Cổng 1.', giai: 'Bấm Đạt ở Cổng 1, máy chuyển sang đọc thử giọng.' }
          ]
        },
        {
          id: 'b4-3', ten: 'Cổng 3 và 4: duyệt hình, chốt video', phut: 4, canh: window.CANH_XUONG['b4-3'],
          tu_duy: 'Lỗi nhỏ thì sửa tay, lỗi lớn thì cho máy làm lại đúng bước.',
          ky_nang: 'Soát chữ bị nút TikTok che, chỉ render bản sẽ đăng, chốt hoặc sửa đúng chỗ.',
          muc_tieu: ['Duyệt storyboard khung thật, xem thử 8 giây, tích bản sẽ render.', 'Chốt video ở Cổng 4, hoặc chọn sửa nhỏ / Không đạt cho đúng loại lỗi.'],
          y_chinh: [
            'Bật “Xem như trên TikTok” để biết chữ có bị nút của TikTok che không.',
            'Chỉ tích bản định đăng — mỗi bản render mất vài phút.',
            'Ưng là chốt luôn; lệch chữ, màu → Sửa vài chỗ nhỏ; sai lời, giọng, cảnh → Không đạt.'
          ],
          khoi: [
            { loai: 'bang', tieu: 'Sửa nhỏ hay bấm Không đạt?', dau: ['Lỗi', 'Làm gì'], dong: [
              ['Chữ, màu, vị trí, hiệu ứng', 'Sửa vài chỗ nhỏ trong Trình sửa (Buổi 5)'],
              ['Lời, giọng', 'Không đạt ở cổng — máy quay về đúng bước gây lỗi'],
              ['Cảnh, bố cục, chữ đè lên mặt', 'Không đạt ở Cổng 3 — tích gợi ý: thay cảnh, dời chữ khỏi mặt…']
            ] }
          ],
          hoi_nhanh: [
            { loai: 'bam', anh: 'c3-sb', dung: 'tiktok', hoi: 'Bạn sợ chữ bị nút TikTok che. Bấm vào đâu để soát?', goi_y: 'Ô tích gần tiêu đề storyboard.', giai: 'Ô “Xem như trên TikTok” phủ nút tim, bình luận, tên shop lên storyboard.' },
            { loai: 'bam', anh: 'c4', dung: 'ung', hoi: 'Video đã ưng ý. Bấm vào đâu để chốt luôn, không sửa?', goi_y: 'Nút xanh đậm trong hộp Cổng 4.', giai: '“Ưng — chốt bản này” chốt luôn bản máy dựng, không phải xuất lại.' },
            { loai: 'bam', anh: 'c4', dung: 'sua', hoi: 'Chữ ở cảnh 3 lệch một chút. Bấm vào đâu?', goi_y: 'Chỉ là lỗi nhỏ.', giai: 'Lỗi nhỏ thì “Sửa vài chỗ nhỏ” — Trình sửa mở ngay trong trang.' }
          ]
        },
        {
          id: 'b4-4', ten: 'Đăng bài và đo lường', phut: 2, canh: window.CANH_XUONG['b4-4'],
          tu_duy: 'Máy không bao giờ tự đăng — nhưng không có link thì máy không học được gì.',
          ky_nang: 'Tự đăng video, dán link TikTok để máy đo 24 giờ, 3 ngày, 7 ngày.',
          muc_tieu: ['Tải video và ảnh bìa, tự đăng lên TikTok.', 'Dán link để máy đo và học câu mở thắng.'],
          y_chinh: ['Máy không tự vượt cổng, không tự đăng.', 'Mọi con số và lời khen trong video phải có thật.', 'Dán link sau khi đăng — số đo thật giúp video sau hay hơn.'],
          khoi: [
            { loai: 'vong-nho', tieu: 'Sau khi đăng', muc: ['Tự đăng', 'Dán link', 'Máy đo 24 giờ · 3 ngày · 7 ngày', 'Bản thắng vào bộ não', 'Video sau hay hơn'] }
          ],
          hoi_nhanh: [
            { loai: 'bam', anh: 'dang-link', dung: 'link', hoi: 'Đã đăng TikTok xong. Dán link vào đâu?', goi_y: 'Ô có chữ tiktok.com.', giai: 'Dán link vào ô này rồi bấm Lưu link — máy tự đo 24 giờ, 3 ngày, 7 ngày.' }
          ]
        }
      ],
      kiem_tra: [
        { hoi: 'Muốn máy kiểm đúng lời cấm của mỹ phẩm, ô nào phải chọn đúng ở trang Yêu cầu?', chon: ['Thời lượng', 'Nhóm hàng', 'Giọng đọc', 'Khung video'], dap: 1 },
        { hoi: 'Ba câu mở A, B, C dùng để làm gì?', chon: ['Chọn một câu, bỏ hai câu', 'Thành ba bản video để đăng thử, máy đo bản nào thắng', 'Để máy đọc ba lần', 'Để làm phụ đề'], dap: 1 },
        { hoi: 'Ở Cổng 2 máy báo một chữ nghi đọc sai. Bạn làm gì?', chon: ['Bỏ qua, vẫn bấm Đạt', 'Bấm Không đạt và chọn sửa cách đọc chữ đó', 'Xoá video làm lại', 'Đổi sản phẩm'], dap: 1 },
        { hoi: 'Vì sao chỉ tích bản định đăng ở Cổng 3?', chon: ['Vì chỉ được đăng một bản', 'Vì mỗi bản render mất vài phút', 'Vì máy chỉ làm được một bản', 'Vì bản còn lại bị xoá'], dap: 1 },
        { hoi: 'Ở Cổng 4, chữ ở cảnh 3 lệch một chút. Bạn bấm gì?', chon: ['Không đạt', 'Sửa vài chỗ nhỏ', 'Ưng — chốt bản này', 'Gửi yêu cầu mới'], dap: 1 },
        { hoi: 'Đăng xong video, việc bắt buộc tiếp theo là gì?', chon: ['Xoá video trên máy', 'Dán link TikTok vào Xưởng để máy đo', 'Gửi file cho lead', 'Làm lại video'], dap: 1 }
      ],
      tu_luan: [
        'Kể lại đường đi của một video trên Xưởng, từ lúc gửi yêu cầu tới khi dán link, bằng 4–6 câu.',
        'Ở Cổng 3 bạn thấy chữ đè lên mặt người. Bạn chọn gì, và vì sao không sửa tay?'
      ],
      bai_tap: [
        ['Gửi 1 yêu cầu video cho sản phẩm của nhóm', '10 phút', 'Chọn đúng sản phẩm và nhóm hàng'],
        ['Duyệt Cổng 1: xem thử rồi đổi kiểu chữ mở đầu cho 1 câu, bấm Đạt', '10 phút', 'Đã xem thử trước khi đổi'],
        ['Duyệt Cổng 2: nghe hết file đọc thử', '5 phút', 'Đạt, hoặc Không đạt kèm lý do'],
        ['Duyệt Cổng 3: bật “Xem như trên TikTok”, chỉ tích bản sẽ đăng', '10 phút', 'Không chữ nào bị nút che'],
        ['Cổng 4: chốt 1 bản, hoặc sửa 1 chữ rồi chốt bản đã sửa', '10 phút', 'Có bản chốt'],
        ['Tự đăng, dán link TikTok vào Xưởng', 'trong ngày', 'Link đã lưu']
      ],
      checklist: ['Gửi được 1 yêu cầu video đúng sản phẩm, đúng nhóm hàng', 'Duyệt đủ 4 cổng cho 1 video', 'Biết khi nào sửa nhỏ, khi nào bấm Không đạt', 'Đã đăng và dán link cho máy đo']
    },
    // ================================================================ BUỔI 5 — thực hành
    {
      id: 'b5', so: 5, phan: 2, ten: 'Sửa video và công cụ', phu: 'Trình sửa video, thay câu mở cho video có sẵn, trợ lý Agent, giọng đọc, kho video, hồ sơ gu và kho dữ liệu.',
      gop_y_ten: 'Buổi 4 · Sửa video bằng trình sửa (31/10)',
      bai: [
        {
          id: 'b5-1', ten: 'Sửa video bằng Trình sửa', phut: 4, canh: window.CANH_XUONG['b5-1'],
          tu_duy: 'Sửa tay là bước cuối, chỉ cho lỗi nhỏ — sửa xong phải xuất để chỗ sửa in vào video.',
          ky_nang: 'Sửa chữ, màu, hiệu ứng trong Trình sửa rồi xuất và chốt bản đã sửa.',
          muc_tieu: ['Nhận ra 4 vùng của Trình sửa: khung xem, danh sách khối, dòng thời gian, bảng sửa.', 'Sửa một khối chữ, thêm hiệu ứng từ kho, lưu, xuất và chốt bản đã sửa.'],
          y_chinh: [
            'Bấm một khối để sửa; kéo khối trên dòng thời gian để đổi giờ hiện, kéo mép để dài hoặc ngắn hơn.',
            'Lưu rồi Xuất video — xuất thử 10 giây đầu để soát trước khi xuất cả video.',
            'Không sửa gì thì không cần xuất: chốt luôn bản máy dựng.'
          ],
          khoi: [
            { loai: 'bang', tieu: 'Phím tắt hay dùng', dau: ['Phím', 'Việc'], dong: [['Ctrl + Z', 'Hoàn tác'], ['Space', 'Phát / dừng'], ['T', 'Thêm chữ tại giây đang xem'], ['H', 'Mở kho hiệu ứng'], ['Ctrl + D', 'Nhân đôi chữ / đồ hoạ'], ['Ctrl + B', 'Tách khối tại kim giờ'], ['Ctrl + K', 'Tìm lệnh, tìm chữ'], ['Delete', 'Xoá / ẩn khối đang chọn']] },
            { loai: 'luu-y', chu: '<b>Lỡ tay?</b> Ctrl + Z để hoàn tác. Trình sửa tự giữ bản đang sửa dở, mở lại là có.' }
          ],
          hoi_nhanh: [
            { loai: 'bam', anh: 'e-tong', dung: 'xuat', hoi: 'Đã sửa xong trong Trình sửa. Bấm gì để in chỗ sửa vào video?', goi_y: 'Nút đậm ở góc trên bên phải.', giai: '“Xuất video” render lại để chỗ sửa in vào video.' }
          ]
        },
        {
          id: 'b5-2', ten: 'Có video rồi: thay câu mở', phut: 3, canh: window.CANH_XUONG['b5-2'],
          tu_duy: 'Giữ phần đã thắng, chỉ thử phần chưa biết — đúng nguyên lý “một thân, nhiều hook”.',
          ky_nang: 'Thay câu mở cho video có sẵn: chọn câu, kiểu chữ, hình nền.',
          muc_tieu: ['Tạo 3 câu mở mới cho video đã có mà giữ nguyên hình.', 'Chọn kiểu chữ và hình nền bằng ảnh xem trước.'],
          y_chinh: [
            'Nhãn “Giọng thật” = câu có sẵn trong video được kéo lên đầu, giữ giọng người thật, khớp khẩu hình.',
            'Chọn kiểu chữ bằng hình: mỗi ô là đúng câu đó với một kiểu chữ, ô viền xanh là kiểu đang dùng.',
            'Hình nền: chọn khoảnh khắc sạch, không đang chuyển cảnh.'
          ],
          khoi: [
            { loai: 'luu-y', chu: '<b>Liên hệ Buổi 2.</b> Đây chính là “một thân, nhiều hook”: thân video đã thắng giữ nguyên, ba câu mở mới thành ba bản để đăng thử, số đo chọn bản thắng.' }
          ],
          hoi_nhanh: [
            { hoi: 'Nhãn “Giọng thật” ở một câu mở nghĩa là gì?', chon: ['Máy đọc bằng giọng clone', 'Câu có sẵn trong video được kéo lên đầu, giữ giọng người thật', 'Câu do lead viết', 'Câu đã được đăng'], dap: 1,
              giai: 'Cắt ngược: lấy câu hay nhất có sẵn trong video kéo lên làm câu mở — giọng thật, khớp khẩu hình.' }
          ]
        },
        {
          id: 'b5-3', ten: 'Trợ lý Agent', phut: 3, canh: window.CANH_XUONG['b5-3'],
          tu_duy: 'Agent sửa nhanh bằng lời thường, nhưng 4 cổng vẫn do bạn bấm.',
          ky_nang: 'Nhờ Agent sửa kịch bản, câu mở, chữ nhấn bằng một câu nói rõ sửa gì, ở đâu, thế nào.',
          muc_tieu: ['Mở Agent và hỏi bằng lời thường hoặc câu gợi ý bấm sẵn.', 'Nhờ Agent sửa trong Trình sửa, giữ hoặc bỏ bằng Ctrl + Z.'],
          y_chinh: [
            'Agent đọc đúng video đang mở: kịch bản, giọng, bước đang làm — không cần kể lại.',
            'Agent sửa được kịch bản, câu mở, kêu gọi, giọng, chạy lại một bước; trang đổi ngay.',
            'Bốn cổng duyệt vẫn do bạn bấm.'
          ],
          khoi: [
            { loai: 'cau-noi', tieu: 'Câu nhờ Agent mẫu', muc: [
              'Viết lại 3 câu mở cho hay hơn, chạm nỗi đau da dầu, mỗi câu đọc dưới 3 giây.',
              'Giải thích các cảnh báo của máy kiểm ở kịch bản này bằng lời dễ hiểu.',
              'Thêm chữ nhấn “dịu da” ở cảnh có tuýp kem, hiện 2 giây.'
            ] }
          ],
          hoi_nhanh: [
            { loai: 'bam', anh: 'agent', dung: 'goiY2', hoi: 'Bạn muốn trợ lý giải thích các cảnh báo của máy kiểm. Bấm vào đâu nhanh nhất?', goi_y: 'Trong bảng Agent có câu gợi ý bấm sẵn.', giai: 'Câu gợi ý bấm sẵn gửi luôn cho Agent, không phải gõ.' }
          ]
        },
        {
          id: 'b5-4', ten: 'Giọng đọc, kho video, hồ sơ gu', phut: 5, canh: window.CANH_XUONG['b5-4'],
          tu_duy: 'Giữ đúng gu của sản phẩm — video sau học từ chính video trước.',
          ky_nang: 'So giọng bằng lời của mình, tìm lại video cũ, dùng hồ sơ gu khi làm video mới.',
          muc_tieu: ['Nghe và so giọng ở trang Giọng đọc, chọn giọng cho video mới.', 'Tìm lại video đã làm ở Kho video và làm lại với video đó.', 'Dùng hồ sơ gu theo sản phẩm và theo người làm.'],
          y_chinh: [
            'Giọng đọc: đọc cùng một câu bằng nhiều giọng, ưng giọng nào bấm dùng cho video mới.',
            'Kho video: mọi video đã làm trên máy, rê chuột để lướt, “Làm lại với video này” để thay câu mở.',
            'Hồ sơ gu: chọn sản phẩm là thấy màu, nhịp, câu mở hay dùng; nhiều người làm thì chọn nhân sự.'
          ],
          khoi: [
            { loai: 'the', tieu: '3 công cụ giữ gu', muc: [
              { tieu: 'Giọng đọc', chu: 'Thư viện giọng máy nhà và ElevenLabs, lọc theo giới, miền; nghe bằng chính câu của bạn.' },
              { tieu: 'Kho video', chu: 'Mọi video thành phẩm trên máy, lọc theo tên, người làm, dạng video.' },
              { tieu: 'Hồ sơ gu', chu: 'Rút từ video đã làm: màu, nhịp đổi hình, câu mở, giọng — điền sẵn cho video mới.' }
            ] }
          ],
          hoi_nhanh: [
            { loai: 'bam', anh: 'giong', dung: 'dungGiong', hoi: 'Bạn đã ưng giọng vừa nghe. Bấm vào đâu để dùng giọng đó cho video mới?', goi_y: 'Nút ở cột lời đọc.', giai: 'Trang Yêu cầu mở ra với giọng đó chọn sẵn.' },
            { loai: 'bam', anh: 'kho-gu', dung: 'quet', hoi: 'Nhóm vừa làm thêm nhiều video. Bấm vào đâu để máy cập nhật gu của sản phẩm?', goi_y: 'Nút xanh trong thẻ Hồ sơ gu.', giai: '“Quét toàn bộ video trên máy” rút lại gu từ các video mới.' }
          ]
        },
        {
          id: 'b5-5', ten: 'Kho dữ liệu, mở khoá và mẹo', phut: 3, canh: window.CANH_XUONG['b5-5'],
          tu_duy: 'Sửa một lần ở Kho dữ liệu là áp cho mọi video sau.',
          ky_nang: 'Sửa bộ sản phẩm, khuôn câu mở; dùng giả lập TikTok, tìm lệnh, mở khoá bằng mã.',
          muc_tieu: ['Biết Kho dữ liệu chứa gì và sửa ở đâu.', 'Dùng giả lập TikTok, tìm lệnh Ctrl + K, giao diện tối.', 'Mở khoá tính năng bằng mã người quản lý gửi.'],
          y_chinh: [
            'Kho dữ liệu: bộ sản phẩm, câu cấm, khuôn câu mở, mẫu kêu gọi, cách đọc tên riêng — sửa là áp cho mọi video sau.',
            'Ô bạn tự sửa trong bộ sản phẩm thì máy luôn giữ, kể cả khi soạn lại.',
            'Tính năng có ổ khoá mở bằng mã: dán ở Kho dữ liệu → Mở khoá.'
          ],
          khoi: [
            { loai: 'hoi-dap', tieu: 'Gặp gì làm gì', muc: [
              ['Có tắt cửa sổ đen đi được không?', 'Không. Cửa sổ đen là máy chủ của Xưởng — tắt là Xưởng tắt. Mở lại bằng nút Xưởng video ngoài màn hình nền.'],
              ['Máy đang làm thì phải ngồi chờ à?', 'Không cần. Tới lượt bạn thì tiêu đề tab hiện chấm tròn “Đến lượt bạn”.'],
              ['Bước máy báo lỗi đỏ thì làm gì?', 'Đọc dòng lỗi, bấm “Nhờ Agent xem”. Vẫn không được thì chụp màn hình gửi người hỗ trợ.'],
              ['Giọng đọc sai một chữ?', 'Ở Cổng 2 bấm Không đạt → chọn sửa cách đọc chữ đó. Lần sau máy nhớ.'],
              ['Video hiện “Chờ lượt máy”?', 'Máy đang làm việc nặng cho video khác. Tới lượt là tự chạy, đóng trang vẫn chạy.'],
              ['Lỡ tay thì sao?', 'Ctrl + Z ở cả Xưởng lẫn Trình sửa.']
            ] }
          ],
          hoi_nhanh: [
            { loai: 'bam', anh: 'mo-khoa', dung: 'nut', hoi: 'Người quản lý vừa gửi mã. Dán mã xong thì bấm vào đâu?', goi_y: 'Nút ngay dưới ô dán mã.', giai: 'Bấm Mở khoá — tính năng chuyển sang Đã mở là dùng được ngay.' }
          ]
        }
      ],
      kiem_tra: [
        { hoi: 'Sửa xong trong Trình sửa, vì sao phải bấm Xuất video?', chon: ['Để lưu bản nháp', 'Vì chỗ sửa phải được in vào video nên máy render lại', 'Để gửi cho lead', 'Không cần xuất'], dap: 1 },
        { hoi: 'Lỡ tay xoá nhầm một khối chữ. Làm gì?', chon: ['Làm lại video từ đầu', 'Bấm Ctrl + Z', 'Tắt Trình sửa', 'Gửi yêu cầu mới'], dap: 1 },
        { hoi: 'Cửa “Có video rồi” giữ gì và thay gì?', chon: ['Thay toàn bộ video', 'Giữ nguyên hình; thay câu mở, giọng hoặc câu kêu gọi', 'Chỉ đổi nhạc', 'Chỉ đổi phụ đề'], dap: 1 },
        { hoi: 'Agent có tự bấm Đạt ở các cổng thay bạn không?', chon: ['Có, nếu được nhờ', 'Không — bốn cổng duyệt vẫn do bạn bấm', 'Chỉ ở Cổng 4', 'Chỉ khi lead cho phép'], dap: 1 },
        { hoi: 'Ưng một giọng ở trang Giọng đọc, muốn dùng cho video mới thì làm gì?', chon: ['Tải giọng về máy', 'Bấm “Dùng giọng này cho video mới”', 'Gõ tên giọng vào kịch bản', 'Nhờ lead đổi'], dap: 1 },
        { hoi: 'Sửa khuôn câu mở ở Kho dữ liệu có tác dụng gì?', chon: ['Chỉ áp cho video đang mở', 'Áp cho mọi video sau', 'Xoá các câu mở cũ', 'Không có tác dụng'], dap: 1 }
      ],
      tu_luan: [
        'Video đã chốt có 1 chữ sai chính tả. Kể các bước sửa tới khi chốt bản đã sửa.',
        'Viết 1 câu nhờ Agent cho một video bạn đang làm — nói rõ sửa gì, ở đâu, thế nào.'
      ],
      bai_tap: [
        ['Sửa 1 chữ trong Trình sửa → xuất → chốt bản đã sửa', '15 phút', 'Bản đã sửa hiện cạnh bản máy dựng'],
        ['Thay câu mở cho 1 video có sẵn (cửa “Có video rồi”)', '20 phút', 'Có 3 câu mở mới, đã chọn kiểu chữ'],
        ['Đọc cùng 1 câu bằng 2 giọng, chọn 1 giọng cho video mới', '10 phút', 'Trang Yêu cầu mở với giọng đã chọn'],
        ['Mở Kho video, tìm lại video đầu tiên bạn làm', '5 phút', 'Mở được video đó'],
        ['Nhờ Agent viết lại 3 câu mở cho 1 video đang ở Cổng 1', '10 phút', 'Câu nhờ nói rõ sửa gì, thế nào']
      ],
      checklist: ['Sửa được 1 khối chữ, xuất và chốt bản đã sửa', 'Thay được câu mở cho 1 video có sẵn', 'Nhờ Agent sửa bằng 1 câu nói rõ', 'Biết Kho dữ liệu sửa ở đâu, áp cho video nào']
    }
  ]
};
