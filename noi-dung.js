// Khoá nền tảng "Làm video bán hàng bằng AI" — NỘI DUNG (03/11/2026).
// Mỗi bài: mục tiêu (Bloom) · tư duy + kỹ năng · lời thuyết minh theo cảnh (motion) · ý chính · khối tài liệu · kiểm tra nhanh.
// Số liệu: Dashboard Video AI (đọc 03/11/2026), biên bản họp Team AI 02/11/2026, form target 2 nhóm, 89 bài thu hoạch 19/10–02/11.
// Luật nhân sự: không lệnh, không tên tệp, không tên người; trợ lý gọi là "Agent"; bài tập trong giờ hành chính.
window.KHOA = {
  ma: 'nguyen-ly-video-ai',
  ban: '03/11/2026',
  ten: 'Làm video bán hàng bằng AI',
  nhan: 'Khoá nền tảng · 5 buổi học chung + 2 con đường học riêng',
  phu: 'Phần 1 không bấm nút, không câu lệnh: hiểu vì sao workflow AI nhanh hơn và trúng hơn, nghĩ kịch bản như người làm nghề, đọc số để sửa đúng chỗ. Phần 2 làm thật trên Xưởng: từ yêu cầu tới video đã đăng. Phần 3 đi sâu theo con đường của bạn: tìm công thức cho sản phẩm đang tìm chỗ đứng, hoặc mở rộng sản phẩm đang bán tốt.',
  ket_qua: [
    { dt: 'Giải thích', chu: 'vòng workflow 7 bước và 3 điều nó mang lại: trúng hơn, nhanh hơn, giỏi dần.' },
    { dt: 'Xác định', chu: 'sản phẩm mình cầm đang tìm chỗ đứng hay đang bán tốt, và con đường hợp với mình.' },
    { dt: 'Phân tích', chu: 'một video bán hàng thành hook, thân, kêu gọi; duyệt kịch bản bằng 5 câu hỏi.' },
    { dt: 'Đọc', chu: 'số sau khi đăng theo từng phần của video; biết khi nào sửa, khi nào nhân bản.' },
    { dt: 'Thực hiện', chu: '“làm kỹ một, nhân ra nhiều” và vòng Kaizen cuối ngày để giỏi lên sau mỗi lô.' },
    { dt: 'Làm', chu: 'một video A→Z trên Xưởng: yêu cầu, duyệt 4 cổng, tự đăng, dán link cho máy đo.' },
    { dt: 'Hoàn thiện', chu: 'video bằng Trình sửa, thay câu mở cho video có sẵn, nhờ Agent sửa bằng lời.' },
    { dt: 'Đi sâu', chu: 'con đường của mình: tìm ra video win cho sản phẩm mới, hoặc mở rộng qua KOL, KOC, affiliate và nhiều nền tảng.' }
  ],
  phan: { 1: 'Phần 1 · Nền tảng chung', 2: 'Phần 2 · Thực hành trên Xưởng', 3: 'Phần 3 · Học riêng theo con đường' },
  con_duong: { 1: 'Con đường 1 · Người tìm công thức', 2: 'Con đường 2 · Người mở rộng' },
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
    chang_tiep: 'Chặng tiếp theo: video được đo bằng đơn hàng thật, và mỗi người đi sâu vào con đường của mình.',
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
    ['Video win', 'Video bán được, ra đơn đều.'],
    ['Kho video win', 'Video đang bán chạy của thị trường và của team, kèm số liệu, để Agent học công thức.'],
    ['Brief', 'Bản yêu cầu ngắn gửi Agent, người dựng hoặc KOL, KOC: sản phẩm, khách hàng, angle, điều bắt buộc và điều cấm.'],
    ['Người tìm công thức', 'Con đường 1: làm cho sản phẩm đang tìm chỗ đứng (mới ra, hoặc đang đi xuống) — tìm ra video win.'],
    ['Người mở rộng', 'Con đường 2: làm cho sản phẩm đang bán tốt — đưa tới nhiều người, nhiều nền tảng hơn và liên tục thử angle mới.'],
    ['Doanh thu / 1.000 lượt xem', 'Doanh thu của video chia cho lượt xem, nhân 1.000 — so được video lớn với video nhỏ.'],
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
            { loi: 'Hiệu quả không đến từ cảm hứng ngẫu nhiên, mà đến từ một quy trình có hệ thống. Quy trình đó gọi là workflow, tức là các bước làm việc nối nhau thành một vòng. Ở bài tiếp theo, mình sẽ mở vòng đó ra, nơi Agent đọc dữ liệu từ TikTok Shop, Douyin, Amazon và cả quảng cáo Facebook. Hẹn gặp bạn ở bài hai.',
              hinh: { loai: 'trich', chu: 'Hiệu quả không đến từ cảm hứng ngẫu nhiên, mà đến từ một quy trình có hệ thống.', nguon: 'Điều cần nhớ · Bài tiếp theo: Nguyên lý một vòng' } }
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
            { loai: 'trich', muc: [{ chu: 'Hiệu quả không đến từ cảm hứng ngẫu nhiên, mà đến từ một quy trình có hệ thống.', nguon: 'Điều cần nhớ' }] }
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
            { loi: 'Hãy nhớ một điều: Agent chỉ giỏi bằng dữ liệu mình cho nó. Ở bài ba, bạn sẽ thấy hai con đường để làm ra video bán được, và một tinh thần chung cho cả hai. Hẹn gặp bạn ở bài ba.',
              hinh: { loai: 'trich', chu: 'Agent chỉ giỏi bằng dữ liệu mình cho nó.', nguon: 'Điều cần nhớ · Bài tiếp theo: Hai con đường, một tinh thần' } }
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
              { chu: 'Không tin cái gì 100%: đọc, phản biện, tìm lỗi.', nguon: 'Nguyên tắc khi làm với Agent' },
              { chu: 'Việc càng lặp đi lặp lại, AI càng làm tốt hơn và nhanh hơn.', nguon: 'Điều cần nhớ' }
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
          id: 'b1-3', ten: 'Hai con đường, một tinh thần', phut: 2,
          tu_duy: 'Không sản phẩm nào có công thức cố định. Mới ra hay đang bán tốt đều phải đọc số, thử nhanh, sửa nhanh.',
          ky_nang: 'Nhìn một sản phẩm là biết nó cần con đường nào, và con đường đó cần kỹ năng gì.',
          muc_tieu: ['Nhìn sản phẩm là biết nên tìm công thức hay mở rộng.', 'Biết con đường nào hợp với bạn và nó dẫn tới đâu.', 'Biết 3 thói quen mà con đường nào cũng cần.'],
          canh: [
            { loi: 'Làm ra một trăm video giờ không còn khó. AI làm phần lặp lại nhanh hơn bất kỳ ai. Cái khó là làm ra một video bán được. Và người làm được điều đó là người mà đội bán hàng nào cũng cần.',
              hinh: { loai: 'tieu-de', nhan: 'Buổi 1 · Bài 3', tieu: 'Hai con đường, một tinh thần', phu: 'Video bán được bắt đầu từ một câu hỏi đúng' } },
            { loi: 'Muốn video bán được, câu hỏi đầu tiên là: sản phẩm này đang ở đâu? Đang tìm chỗ đứng, vì mới ra hoặc đang đi xuống. Hay đang bán tốt, là những sản phẩm chủ lực của thương hiệu. Mỗi vị trí cần một con đường.',
              hinh: { loai: 'so-sanh', tieu: 'Sản phẩm này đang ở đâu?', nhan_truoc: 'Đang tìm chỗ đứng', truoc: 'Mới ra, hoặc đang đi xuống', nhan_nay: 'Đang bán tốt', nay: 'Sản phẩm chủ lực của thương hiệu' } },
            { loi: 'Con đường thứ nhất: người tìm công thức. Bạn nhận một sản phẩm mới ra, hoặc một sản phẩm từng bán tốt nhưng đang đi xuống, vì cách làm cũ đã hết tác dụng. Việc của bạn là tìm ra video win, tức là video bán được, ra đơn đều.',
              hinh: { loai: 'so-sanh', tieu: 'Con đường 1 · Người tìm công thức', nhan_truoc: 'Mới ra', truoc: 'Chưa có video nào bán được', nhan_nay: 'Đang đi xuống', nay: 'Cách làm cũ đã hết tác dụng' } },
            { loi: 'Bạn hiểu sản phẩm, chọn angle, tức là góc để nói về sản phẩm, lên cảnh quay, dựng video, rồi đọc số để sửa tới khi có video win. Con đường này hợp với người thích tự tay làm từ đầu đến cuối, và muốn có ngày cầm trọn một dự án.',
              hinh: { loai: 'buoc', muc: ['Hiểu sản phẩm', 'Chọn angle', 'Lên cảnh quay', 'Dựng video', 'Đọc số, sửa tới khi win'] } },
            { loi: 'Con đường thứ hai: người mở rộng. Đang bán tốt không có nghĩa là đã có công thức win để cứ thế áp dụng. Ngoài kia, đối thủ cũng đang không ngừng phát triển, và người xem cũng nhanh chán. Bán tốt hôm nay chưa chắc bán tốt ngày mai, nên không có chỗ cho sự ung dung.',
              hinh: { loai: 'trich', to: true, chu: 'Bán tốt hôm nay chưa chắc bán tốt ngày mai.', nguon: 'Con đường 2 · Người mở rộng' } },
            { loi: 'Việc của bạn là vừa đưa sản phẩm tới nhiều người hơn, qua KOL, KOC và affiliate, tức là những người bán hàng hưởng hoa hồng, và qua nhiều nền tảng. Vừa liên tục thử angle mới để tiến lên, giành thêm khách hàng từ đối thủ.',
              hinh: { loai: 'chip', tieu: 'Người mở rộng · hai việc cùng lúc', muc: ['KOL', 'KOC', 'Affiliate', 'Nhiều nền tảng', 'Thử angle mới'] } },
            { loi: 'Người mở rộng cũng cần đủ kỹ năng của người tìm công thức, vì phải biết video tốt làm ra thế nào, mới duyệt được video của người khác.',
              hinh: { loai: 'so-sanh', tieu: 'Muốn duyệt tốt, phải làm được trước', nhan_truoc: 'Người tìm công thức', truoc: 'Làm ra video tốt', nhan_nay: 'Người mở rộng', nay: 'Duyệt được video của người khác' } },
            { loi: 'Hai con đường, nhưng chung một tinh thần, cũng là giá trị cốt lõi của công ty: học tập và phát triển không ngừng. Trong làm video, nó là ba thói quen. Nói chuyện bằng dữ liệu: đọc số sau khi đăng, rồi mới quyết sửa hay nhân bản. Hành động nhanh, thích ứng nhanh: để AI làm phần lặp lại, bạn thử nhiều angle trong một ngày. Chấp nhận và sẵn sàng thử sai: mỗi video là một phép thử, sai thì ghi bài học để lần sau đúng hơn.',
              hinh: { loai: 'danh-sach', tieu: 'Học tập và phát triển không ngừng', muc: [{ tieu: 'Nói chuyện bằng dữ liệu', chu: 'Đọc số sau khi đăng, rồi mới quyết sửa hay nhân bản' }, { tieu: 'Hành động nhanh, thích ứng nhanh', chu: 'AI làm phần lặp lại, bạn thử nhiều angle trong một ngày' }, { tieu: 'Chấp nhận và sẵn sàng thử sai', chu: 'Mỗi video là một phép thử, sai thì ghi bài học' }] } },
            { loi: 'Một video tốt không dừng ở TikTok. Nó có thể đi sang Facebook Reels, YouTube Shorts, quảng cáo Facebook kéo về Shopee, rồi tới trang bán hàng riêng. Mỗi nền tảng một cách làm, đây chính là thích ứng nhanh. Ai làm chủ được điều này sớm, người đó đi trước.',
              hinh: { loai: 'chip', tieu: 'Không dừng ở TikTok', muc: ['Facebook Reels', 'YouTube Shorts', 'Facebook → Shopee', 'Trang bán hàng riêng'] } },
            { loi: 'Khoá học đi từng nấc. Học xong bài trước mới mở bài sau. Đạt bài tập thì được mở quyền dùng Agent. Rồi bạn đi sâu dần vào con đường mình chọn, với bài tập trên sản phẩm thật và số liệu thật.',
              hinh: { loai: 'buoc', muc: ['Học xong bài trước mới mở bài sau', 'Đạt bài tập là được dùng Agent', 'Đi sâu vào con đường bạn chọn'] } },
            { loi: 'Cả hai con đường đều bắt đầu ở cùng một chỗ: kịch bản. Hẹn bạn ở buổi hai: ba giây đầu, phần thân và lời kêu gọi của một kịch bản bán hàng.',
              hinh: { loai: 'trich', chu: 'Cả hai con đường đều bắt đầu từ kịch bản.', nguon: 'Hẹn bạn ở Buổi 2 · Tư duy kịch bản' } }
          ],
          y_chinh: [
            'Người tìm công thức · sản phẩm đang tìm chỗ đứng (mới ra, hoặc đang đi xuống): tìm ra video win bằng cách hiểu sản phẩm, chọn angle, quay, dựng và đọc số tới khi ra đơn.',
            'Người mở rộng · sản phẩm đang bán tốt: vừa đưa tới nhiều người hơn (KOL, KOC, affiliate, nhiều nền tảng), vừa liên tục thử angle mới. Cần đủ kỹ năng của người tìm công thức.',
            'Chung một tinh thần, học tập và phát triển không ngừng: nói chuyện bằng dữ liệu, hành động nhanh, sẵn sàng thử sai.'
          ],
          khoi: [
            { loai: 'hai-nhom' },
            { loai: 'the', tieu: 'Câu hỏi đầu tiên: sản phẩm này đang ở đâu?', muc: [
              { tieu: 'Đang tìm chỗ đứng → Người tìm công thức', chu: 'Sản phẩm mới ra, hoặc từng bán tốt nhưng đang đi xuống vì cách làm cũ đã hết tác dụng. Việc cần làm: tìm ra video win.' },
              { tieu: 'Đang bán tốt → Người mở rộng', chu: 'Sản phẩm chủ lực của thương hiệu. Bán tốt hôm nay chưa chắc bán tốt ngày mai, nên vừa mở rộng vừa thử angle mới.' }
            ] },
            { loai: 'the', tieu: 'Học tập và phát triển không ngừng', phu: 'Giá trị cốt lõi của công ty. Trong làm video, đó là 3 thói quen.', muc: [
              { tieu: 'Nói chuyện bằng dữ liệu', chu: 'Đọc số sau khi đăng, rồi mới quyết sửa hay nhân bản.' },
              { tieu: 'Hành động nhanh, thích ứng nhanh', chu: 'Để AI làm phần lặp lại, bạn thử nhiều angle trong một ngày.' },
              { tieu: 'Chấp nhận và sẵn sàng thử sai', chu: 'Mỗi video là một phép thử. Sai thì ghi bài học để lần sau đúng hơn.' }
            ] },
            { loai: 'the', tieu: 'Một video tốt không dừng ở TikTok', phu: 'Mỗi nền tảng một cách làm. Ai làm chủ sớm, người đó đi trước.', chip: ['Facebook Reels', 'YouTube Shorts', 'Quảng cáo Facebook → Shopee', 'Trang bán hàng riêng'] },
            { loai: 'bang', tieu: 'Thuật ngữ trong bài', dau: ['Từ', 'Nghĩa'], dong: [
              ['Video win', 'Video bán được, ra đơn đều.'],
              ['Angle', 'Góc để nói về sản phẩm: nói nỗi đau nào, cho ai, theo cách nào.'],
              ['KOL', 'Người có tầm ảnh hưởng.'],
              ['KOC', 'Người dùng thật, review thật.'],
              ['Affiliate', 'Người bán hàng hưởng hoa hồng.']
            ] }
          ],
          hoi_nhanh: [
            { hoi: 'Một sản phẩm từng bán rất chạy, 2 tháng nay video mới không còn ra đơn. Sản phẩm này cần con đường nào?', chon: ['Người mở rộng, vì sản phẩm từng bán tốt', 'Người tìm công thức, vì cách làm cũ đã hết tác dụng', 'Giữ nguyên, chờ sản phẩm tự lên lại', 'Chỉ cần đăng nhiều video hơn'], dap: 1,
              giai: 'Đang đi xuống nghĩa là cách làm cũ đã hết tác dụng. Việc cần làm là tìm ra công thức mới, giống như với sản phẩm mới ra.' },
            { hoi: 'Một sản phẩm chủ lực đang bán tốt. Bạn nên làm gì?', chon: ['Giữ nguyên cách cũ vì đang thắng', 'Vừa mở rộng tới nhiều người, nhiều nền tảng, vừa liên tục thử angle mới', 'Ngừng làm video mới cho đỡ tốn', 'Chuyển sang sản phẩm khác'], dap: 1,
              giai: 'Đối thủ cũng không ngừng phát triển, đứng yên là tụt lại. Bán tốt hôm nay chưa chắc bán tốt ngày mai.' },
            { hoi: 'Vì sao người mở rộng cũng cần đủ kỹ năng của người tìm công thức?', chon: ['Để làm thay người khác', 'Phải biết video tốt làm ra thế nào mới duyệt được video của người khác', 'Vì quy định của công ty', 'Không cần, chỉ cần biết duyệt'], dap: 1,
              giai: 'Duyệt video của KOL, KOC, affiliate đòi hỏi biết một video tốt được làm ra thế nào.' }
          ]
        }
      ],
      kiem_tra: [
        { hoi: 'Lợi thế lớn nhất của workflow AI so với cách làm cũ là gì?', chon: ['Máy tính mạnh hơn', 'Có dữ liệu lớn để Agent học trước khi viết', 'Không cần người duyệt nữa', 'Video dài hơn'], dap: 1 },
        { hoi: 'Giọng, cảnh và chữ trên video căn cứ vào đâu?', chon: ['Sở thích của người dựng', 'Kịch bản đã duyệt', 'Video của đối thủ', 'Nhạc nền'], dap: 1 },
        { hoi: 'Video thế nào thì được tính là đạt chuẩn?', chon: ['Video dài trên 30 giây', 'Đã đăng, có link TikTok và gắn giỏ (Livestream: có link)', 'Có trên 1.000 lượt xem', 'Lead đã khen'], dap: 1 },
        { hoi: 'Sản phẩm mới ra, chưa có video nào bán được, cần con đường nào?', chon: ['Người tìm công thức', 'Người mở rộng', 'Chờ có video win của đối thủ rồi chép lại', 'Chưa cần làm video'], dap: 0 },
        { hoi: 'Sản phẩm từng bán tốt nhưng video mới không còn ra đơn. Việc cần làm trước là gì?', chon: ['Nhân bản thật nhiều video cũ', 'Tìm công thức mới, vì cách làm cũ đã hết tác dụng', 'Ngừng làm video', 'Chỉ đổi nhạc nền của video cũ'], dap: 1 },
        { hoi: 'Việc chính của người mở rộng là gì?', chon: ['Giữ nguyên công thức đang thắng', 'Vừa đưa sản phẩm tới nhiều người, nhiều nền tảng hơn, vừa liên tục thử angle mới', 'Chỉ quay video mới', 'Chỉ duyệt video của người khác'], dap: 1 },
        { hoi: 'Ba thói quen của giá trị “Học tập và phát triển không ngừng” trong làm video là gì?', chon: ['Làm nhiều, làm nhanh, làm đều', 'Nói chuyện bằng dữ liệu · Hành động nhanh, thích ứng nhanh · Chấp nhận và sẵn sàng thử sai', 'Học thuộc, làm theo, báo cáo', 'Hỏi lead, chờ duyệt, đăng bài'], dap: 1 },
        { hoi: 'Điểm khác lớn nhất giữa Agent và một chatbot AI thông thường?', chon: ['Agent nói chuyện tự nhiên hơn', 'Agent nhận việc, tự chia bước, dùng công cụ làm đến khi xong rồi báo lại', 'Agent không bao giờ sai', 'Agent không cần dữ liệu'], dap: 1 }
      ],
      tu_luan: [
        'Viết lại vòng workflow bằng 3–5 câu, như đang giải thích cho một người mới.',
        'Chọn một sản phẩm bạn biết rõ. Nó đang cần tìm công thức hay mở rộng? Vì sao?'
      ],
      bai_tap: [
        ['Viết lại vòng workflow bằng 3–5 câu cho một người mới', '15 phút', 'Có đủ 3 điều: trúng hơn, nhanh hơn, giỏi dần'],
        ['Chọn 1 sản phẩm: nó đang ở đâu, cần con đường nào, và việc đầu tiên bạn sẽ làm', '15 phút', 'Có câu trả lời và một lý do dựa trên số liệu'],
        ['Chọn 1 video bán chạy trong kho, chỉ ra hook – thân – kêu gọi', '20 phút', 'Ghi đúng giây bắt đầu từng phần (chuẩn bị Buổi 2)']
      ],
      checklist: ['Nói lại được 3 điều vòng workflow mang lại: trúng hơn, nhanh hơn, giỏi dần', 'Nhìn một sản phẩm, nói được nó cần tìm công thức hay mở rộng', 'Nhớ 3 thói quen của “Học tập và phát triển không ngừng”', 'Đã viết lại vòng workflow cho người mới']
    },
    // ================================================================ BUỔI 2
    {
      id: 'b2', so: 2, ten: 'Tư duy kịch bản', phu: 'Ba giây đầu quyết định video có được xem. Kịch bản quyết định video có ra đơn.',
      gop_y_ten: 'Buổi 2 · Sửa hook trên bản 1.0 (20/10)',
      bai: [
        {
          id: 'b2-1', ten: '3 giây đầu và 3 phần của kịch bản', phut: 2,
          tu_duy: 'Nghĩ như người xem đang lướt: mỗi giây phải có lý do để ở lại.',
          ky_nang: 'Chia một video bán hàng thành hook, thân, kêu gọi, và biết việc của từng phần.',
          muc_tieu: ['Chia một video bán hàng thành hook, thân, kêu gọi.', 'Giải thích vì sao 3 giây đầu quyết định video có được xem.', 'Viết hook theo 4 cách hay dùng.'],
          canh: [
            { loi: 'Chào bạn, chào mừng bạn đến với buổi hai: tư duy kịch bản. Cả hai con đường đều bắt đầu từ kịch bản, nên buổi này mình học cách nghĩ ra một kịch bản bán hàng. Và mình bắt đầu từ thứ quan trọng nhất: ba giây đầu tiên.',
              hinh: { loai: 'tieu-de', nhan: 'Buổi 2 · Bài 1', tieu: 'Tư duy kịch bản', phu: '3 giây đầu và 3 phần của một video bán hàng' } },
            { loi: 'Một video bán hàng có ba phần. Phần đầu là hook, tức là câu mở và hình mở trong ba giây đầu. Phần giữa là thân, nơi chứng minh sản phẩm. Phần cuối là kêu gọi, mời người xem làm một việc cụ thể, như bấm giỏ hàng.',
              hinh: { loai: 'thoi-gian' } },
            { loi: 'Vì sao ba giây đầu lại quan trọng đến vậy? Vì người xem lướt TikTok rất nhanh. Họ quyết định ở lại hay lướt qua chỉ trong vài giây đầu. Nếu hook không giữ được họ, thì phần thân hay đến mấy cũng không ai xem.',
              hinh: { loai: 'trich', chu: 'Hook không giữ được người xem, thì phần thân hay đến mấy cũng không ai xem.', nguon: 'Vì sao 3 giây đầu quan trọng nhất' } },
            { loi: 'Vậy hook làm người xem dừng tay bằng cách nào? Có bốn cách hay dùng. Chạm vào nỗi đau mà khách đang gặp. Cho thấy kết quả khách muốn có. Đặt một câu hỏi đúng thắc mắc của khách. Hoặc nói một điều bất ngờ mà khách chưa biết.',
              hinh: { loai: 'danh-sach', tieu: '4 cách làm người xem dừng tay', muc: [{ tieu: 'Nỗi đau', chu: 'chạm đúng điều khách đang gặp' }, { tieu: 'Kết quả', chu: 'cho thấy điều khách muốn có' }, { tieu: 'Câu hỏi', chu: 'hỏi đúng thắc mắc của khách' }, { tieu: 'Bất ngờ', chu: 'một điều khách chưa biết' }] } },
            { loi: 'Ví dụ, một hook chạm nỗi đau: da dầu mà cứ đến chiều là bóng loáng? Một hook câu hỏi: bạn rửa mặt mấy lần một ngày? Câu ngắn, đọc dưới ba giây, và nói đúng điều khách đang nghĩ.',
              hinh: { loai: 'danh-sach', tieu: 'Hook nói đúng điều khách nghĩ', muc: [{ tieu: 'Hook nỗi đau', chu: '“Da dầu mà cứ đến chiều là bóng loáng?”' }, { tieu: 'Hook câu hỏi', chu: '“Bạn rửa mặt mấy lần một ngày?”' }] } },
            { loi: 'Qua được ba giây đầu, phần thân có một việc: làm người xem tin. Bằng chứng mạnh nhất là cảnh dùng sản phẩm thật, hình trước và sau, và điểm khác biệt mà chỉ sản phẩm này có. Nhớ nói đúng sự thật, không hứa quá.',
              hinh: { loai: 'danh-sach', tieu: 'Thân — làm người xem tin', muc: [{ tieu: 'Dùng thật', chu: 'cảnh dùng sản phẩm thật' }, { tieu: 'Trước – sau', chu: 'thay đổi nhìn thấy được' }, { tieu: 'Khác biệt', chu: 'điểm chỉ sản phẩm này có' }] } },
            { loi: 'Phần cuối là kêu gọi. Chỉ nên có một hành động, thật rõ: bấm giỏ hàng với video gắn giỏ, hoặc vào phiên live với video kéo khách vào live. Và nối thật mượt, để người xem không thấy bị cắt ngang.',
              hinh: { loai: 'danh-sach', tieu: 'Kêu gọi — một hành động rõ', muc: [{ tieu: 'Bấm giỏ hàng', chu: 'với video gắn giỏ' }, { tieu: 'Vào phiên live', chu: 'với video kéo khách vào live' }] } },
            { loi: 'Vì vậy, khi viết brief, tức là bản yêu cầu ngắn gửi cho Agent hoặc người dựng, hãy dồn nhiều công nhất cho ba giây đầu. Hook quyết định video có được xem. Thân và kêu gọi quyết định video có ra đơn.',
              hinh: { loai: 'trich', chu: 'Viết brief: dồn công nhất cho 3 giây đầu.', nguon: 'Ghi nhớ của buổi 2' } },
            { loi: 'Tóm lại, một kịch bản bán hàng có ba phần, và ba giây đầu là cửa vào. Ở bài tiếp theo, bạn sẽ học cách nhân video: giữ một phần thân video win, rồi gắn nhiều hook khác nhau. Hẹn gặp bạn ở bài hai.',
              hinh: { loai: 'trich', chu: '3 giây đầu là cửa vào.', nguon: 'Bài tiếp theo · Một thân, nhiều hook' } }
          ],
          y_chinh: [
            'Hook (3 giây đầu) làm người xem dừng tay: nỗi đau, kết quả, câu hỏi, điều bất ngờ.',
            'Thân làm người xem tin: cảnh dùng thật, trước – sau, điểm khác biệt — nói đúng sự thật.',
            'Kêu gọi có một hành động rõ (bấm giỏ hoặc vào live) và nối thật mượt. Viết brief thì dồn công nhất cho 3 giây đầu.'
          ],
          khoi: [
            { loai: 'thoi-gian', tieu: 'Một video bán hàng 30 giây' },
            { loai: 'bang', tieu: 'Ba phần, ba việc', dau: ['Phần', 'Việc của nó', 'Khi duyệt hỏi', 'Đo bằng'], dong: [
              ['Hook', 'Làm người xem dừng tay', '3 giây đầu có làm mình dừng lại không?', 'Lượt xem, tỉ lệ ở lại qua vài giây đầu'],
              ['Thân', 'Làm người xem tin', 'Có bằng chứng thật không?', 'Thời gian xem'],
              ['Kêu gọi', 'Mời làm một việc', 'Có đúng một hành động rõ không?', 'Bấm giỏ, đơn hàng']
            ] },
            { loai: 'the', tieu: '4 cách làm người xem dừng tay', muc: [
              { tieu: 'Nỗi đau', chu: '“Da dầu mà cứ đến chiều là bóng loáng?”' },
              { tieu: 'Kết quả', chu: 'Mở đầu bằng khoảnh khắc trước – sau, rồi mới kể.' },
              { tieu: 'Câu hỏi', chu: '“Bạn rửa mặt mấy lần một ngày?”' },
              { tieu: 'Bất ngờ', chu: 'Một sự thật khách chưa biết về thói quen hằng ngày.' }
            ] },
            { loai: 'luu-y', chu: '<b>Brief là gì?</b> Bản yêu cầu ngắn gửi cho Agent hoặc người dựng: sản phẩm, khách hàng, mục tiêu. Khi viết brief, dồn nhiều công nhất cho 3 giây đầu — hook quyết định video có được xem.' },
            { loai: 'bang', tieu: 'Thuật ngữ trong bài', dau: ['Từ', 'Nghĩa'], dong: [
              ['Hook', 'Câu mở và hình mở trong 3 giây đầu, giữ người xem ở lại.'],
              ['Thân', 'Phần giữa video, chứng minh sản phẩm.'],
              ['Kêu gọi', 'Phần cuối, mời người xem làm một việc cụ thể (bấm giỏ, vào live).'],
              ['Brief', 'Bản yêu cầu ngắn gửi Agent hoặc người dựng: sản phẩm, khách hàng, mục tiêu.']
            ] }
          ],
          hoi_nhanh: [
            { hoi: 'Hook có nhiệm vụ gì?', chon: ['Giới thiệu đầy đủ thành phần sản phẩm', 'Làm người xem dừng tay trong vài giây đầu', 'Kêu gọi bấm giỏ hàng', 'Chèn logo thương hiệu'], dap: 1,
              giai: 'Người xem quyết định ở lại hay lướt qua chỉ trong vài giây đầu. Hook chỉ có một việc: làm họ dừng tay.' },
            { hoi: 'Video có phần thân rất hay nhưng rất ít người xem quá 3 giây. Nên sửa phần nào trước?', chon: ['Phần thân', 'Hook', 'Kêu gọi', 'Nhạc nền'], dap: 1,
              giai: 'Hook không giữ được người xem thì phần thân hay đến mấy cũng không ai xem. Sửa cửa vào trước.' }
          ]
        },
        {
          id: 'b2-2', ten: 'Một thân, nhiều hook', phut: 2,
          tu_duy: 'Nhân video có căn cứ: giữ phần đã win, thử phần chưa biết.',
          ky_nang: 'Gắn nhiều hook cho một thân video win, đổi cả hình lẫn lời, để số đo chọn hook tốt nhất.',
          muc_tieu: ['Giải thích nguyên lý một thân, nhiều hook.', 'Nêu vì sao đổi hook phải đổi cả hình lẫn lời.', 'Biết thử nhiều phương án cho hook, giọng, kêu gọi.'],
          canh: [
            { loi: 'Chào bạn, mình gặp lại nhau ở bài hai của buổi hai. Khi đã có một phần thân video win, bạn không cần quay lại từ đầu để có video mới. Bài này chỉ bạn cách nhân video mà vẫn có căn cứ.',
              hinh: { loai: 'tieu-de', nhan: 'Buổi 2 · Bài 2', tieu: 'Một thân, nhiều hook', phu: 'Nhân video mà vẫn có căn cứ' } },
            { loi: 'Cách làm rất gọn. Giữ nguyên phần thân đã win, gắn năm hook khác nhau, bạn có năm video mới. Đăng cả năm, số đo sẽ cho biết hook nào giữ người xem tốt nhất.',
              hinh: { loai: 'nhan' } },
            { loi: 'Hook không phải đoán. Agent chọn từ kho công thức hook bằng lời và bằng hình, rút ra từ hàng trăm video đang bán tốt. Việc của bạn là chọn angle hợp với sản phẩm và khách hàng, rồi duyệt.',
              hinh: { loai: 'danh-sach', tieu: 'Hook có căn cứ, không đoán', muc: [{ tieu: 'Kho công thức hook', chu: 'bằng lời và bằng hình, rút từ video đang bán tốt' }, { tieu: 'Agent đề xuất', chu: 'nhiều hook cho cùng một thân' }, { tieu: 'Bạn chọn và duyệt', chu: 'angle hợp sản phẩm và khách hàng' }] } },
            { loi: 'Số liệu thật cho thấy một điều quan trọng. Video có cảnh quay thật đạt chuẩn năm mươi tư đến năm mươi bảy phần trăm. Video chỉ thay hook đạt mười đến hai mươi sáu phần trăm. Nên khi đổi hook, hãy đổi cả hình lẫn lời, đừng chỉ đổi chữ.',
              hinh: { loai: 'cot-ngang', tieu: 'Tỉ lệ đạt chuẩn theo dạng video', hau: '%', cot: [{ nhan: 'Cắt ghép tự quay', gt: 57 }, { nhan: 'Tự quay gắn giỏ', gt: 54 }, { nhan: 'Cắt live', gt: 40 }, { nhan: 'Thay hook', gt: 26 }, { nhan: 'Thay hook + kêu gọi', gt: 10 }] } },
            { loi: 'Giọng cũng là một phần của hook. Giọng người thật, hoặc giọng lấy từ video win, nghe chân thật hơn giọng máy. Người xem tin giọng thật.',
              hinh: { loai: 'trich', chu: 'Người xem tin giọng thật.', nguon: 'Giọng cũng là một phần của hook' } },
            { loi: 'Với kêu gọi cũng vậy. Thử nhiều cách kêu gọi, đừng dùng một câu cho mọi video. Số đo sẽ chọn giúp bạn.',
              hinh: { loai: 'danh-sach', tieu: 'Thử nhiều cách kêu gọi', muc: [{ tieu: 'Bấm giỏ ngay', chu: 'với video gắn giỏ' }, { tieu: 'Bình luận để được tư vấn', chu: 'khi khách cần hỏi thêm' }, { tieu: 'Vào live xem thật', chu: 'kéo khách vào phiên live' }] } },
            { loi: 'Tóm lại: giữ phần đã win, thử phần chưa biết, và để số đo quyết định. Ở bài tiếp theo, bạn sẽ học cách duyệt một kịch bản bằng năm câu hỏi. Hẹn gặp bạn ở bài ba.',
              hinh: { loai: 'trich', chu: 'Giữ phần đã win, thử phần chưa biết.', nguon: 'Bài tiếp theo · Duyệt kịch bản bằng 5 câu hỏi' } }
          ],
          y_chinh: [
            'Giữ thân đã win, gắn nhiều hook khác nhau → nhiều video mới, không cần quay lại.',
            'Video có cảnh quay thật đạt chuẩn 54–57%, cao hơn hẳn video chỉ thay hook (10–26%) — đổi hook là đổi cả hình lẫn lời.',
            'Hook, giọng, kêu gọi đều nên thử nhiều phương án — để số đo chọn, không đoán.'
          ],
          khoi: [
            { loai: 'nhan', tieu: '1 thân đã win × 5 hook = 5 video mới' },
            { loai: 'cot-ngang', tieu: 'Tỉ lệ đạt chuẩn theo dạng video', phu: 'Số liệu thật · Dashboard Video AI, đọc 03/11', hau: '%', cot: [{ nhan: 'Cắt ghép tự quay', gt: 57 }, { nhan: 'Tự quay gắn giỏ', gt: 54 }, { nhan: 'Cắt live', gt: 40 }, { nhan: 'Thay hook', gt: 26 }, { nhan: 'Thay hook + kêu gọi', gt: 10 }] },
            { loai: 'luu-y', chu: '<b>Đọc biểu đồ thế nào.</b> Video có cảnh quay thật đạt chuẩn cao nhất. Video dạng thay hook thấp hơn vì nhiều bản chỉ đổi lời mà giữ nguyên hình. Đổi hook là đổi cả hình mở đầu lẫn câu nói.' },
            { loai: 'the', tieu: 'Ba thứ nên thử nhiều phương án', muc: [
              { tieu: 'Hook', chu: 'Đổi cả hình mở đầu lẫn câu nói, mỗi bản một angle hoặc một cách mở.' },
              { tieu: 'Giọng', chu: 'Giọng người thật, hoặc giọng lấy từ video win, nghe chân thật hơn giọng máy.' },
              { tieu: 'Kêu gọi', chu: 'Bấm giỏ ngay, bình luận để được tư vấn, vào live — để số đo chọn.' }
            ] }
          ],
          hoi_nhanh: [
            { hoi: 'Bạn có một thân video đã win. Cách nhanh nhất để có thêm 5 video có căn cứ?', chon: ['Quay lại 5 video mới từ đầu', 'Gắn 5 hook khác nhau — đổi cả hình lẫn lời — rồi để số đo chọn', 'Đổi nhạc nền 5 lần', 'Đăng lại video cũ 5 lần'], dap: 1,
              giai: 'Giữ phần đã win, thử phần chưa biết. Đổi cả hình lẫn lời để mỗi bản thật sự khác nhau.' }
          ]
        },
        {
          id: 'b2-3', ten: 'Duyệt kịch bản bằng 5 câu hỏi', phut: 2,
          tu_duy: 'Agent đề xuất, bạn quyết định — không tin cái gì 100%.',
          ky_nang: 'Duyệt kịch bản bằng 5 câu hỏi và góp ý cho Agent rõ sai ở đâu, muốn thế nào.',
          muc_tieu: ['Dùng 5 câu hỏi để duyệt một kịch bản.', 'Nhận ra lời quảng cáo vi phạm luật.', 'Góp ý cho Agent đủ rõ để lần sau viết trúng.'],
          canh: [
            { loi: 'Chào bạn, đây là bài cuối của buổi hai. Agent viết kịch bản trong vài giây. Nhưng người quyết định kịch bản có được dùng hay không là bạn. Bài này cho bạn năm câu hỏi để duyệt nhanh mà chắc.',
              hinh: { loai: 'tieu-de', nhan: 'Buổi 2 · Bài 3', tieu: 'Duyệt kịch bản bằng 5 câu hỏi', phu: 'Agent đề xuất · bạn quyết định' } },
            { loi: 'Một: ba giây đầu có làm mình dừng tay không? Hai: có đúng nỗi đau, mong muốn của khách không? Ba: thân có bằng chứng thật không? Bốn: lời có đúng luật, không hứa quá không? Năm: kêu gọi có một hành động rõ không?',
              hinh: { loai: 'danh-sach', so: true, tieu: '5 câu hỏi duyệt kịch bản', muc: [{ tieu: '3 giây đầu', chu: 'có làm mình dừng tay?' }, { tieu: 'Khách hàng', chu: 'đúng nỗi đau, mong muốn?' }, { tieu: 'Bằng chứng', chu: 'thân có cảnh thật?' }, { tieu: 'Đúng luật', chu: 'không hứa quá?' }, { tieu: 'Kêu gọi', chu: 'một hành động rõ?' }] } },
            { loi: 'Câu số bốn rất quan trọng với mỹ phẩm và thực phẩm chức năng. Không bịa số liệu, không hứa chữa khỏi, không cam kết kết quả tuyệt đối. Máy có kiểm lời bị cấm, nhưng người duyệt vẫn phải đọc lại.',
              hinh: { loai: 'danh-sach', tieu: 'Lời quảng cáo — 3 điều không', muc: [{ tieu: 'Không bịa số', chu: 'mọi con số phải có nguồn' }, { tieu: 'Không hứa chữa khỏi', chu: 'nói đúng điều sản phẩm làm được' }, { tieu: 'Không tuyệt đối', chu: 'tránh “100%”, “vĩnh viễn”' }] } },
            { loi: 'Hãy nhớ một nguyên tắc: không tin cái gì một trăm phần trăm. Đọc, phản biện, tìm lỗi. Thấy sai thì nói rõ sai ở đâu và muốn thế nào, để Agent viết lại.',
              hinh: { loai: 'trich', chu: 'Không tin cái gì 100%. Đọc, phản biện, tìm lỗi.', nguon: 'Agent đề xuất · bạn quyết định' } },
            { loi: 'Ví dụ, nói chưa hay, viết lại đi, thì Agent không biết sửa gì. Còn nói hook dài quá, rút còn tám chữ, nói thẳng nỗi đau da dầu, thì lần sau Agent viết trúng ngay.',
              hinh: { loai: 'so-sanh', tieu: 'Góp ý rõ, Agent viết trúng', nhan_truoc: 'Góp ý mơ hồ', truoc: '“Chưa hay, viết lại đi.”', nhan_nay: 'Góp ý rõ', nay: '“Hook dài quá, rút còn 8 chữ, nói thẳng nỗi đau da dầu.”' } },
            { loi: 'Kỹ năng duyệt dùng ở cả hai con đường. Người tìm công thức dùng nó để duyệt kịch bản tự quay, ngay trước buổi quay. Người mở rộng dùng nó để duyệt kịch bản và video mà KOL, KOC, affiliate gửi về.',
              hinh: { loai: 'danh-sach', tieu: 'Kỹ năng duyệt dùng ở cả hai con đường', muc: [{ tieu: 'Người tìm công thức', chu: 'duyệt kịch bản tự quay, ngay trước buổi quay' }, { tieu: 'Người mở rộng', chu: 'duyệt kịch bản và video KOL, KOC, affiliate gửi về' }] } },
            { loi: 'Tóm lại: Agent đề xuất, bạn quyết định. Buổi tiếp theo, bạn sẽ học đọc số sau khi đăng, và cách giỏi lên sau mỗi lô video. Hẹn gặp bạn ở buổi ba.',
              hinh: { loai: 'trich', chu: 'Agent đề xuất, bạn quyết định.', nguon: 'Buổi tiếp theo · Đọc số và Kaizen' } }
          ],
          y_chinh: [
            '5 câu hỏi: 3 giây đầu · đúng khách hàng · bằng chứng thật · đúng luật · một kêu gọi rõ.',
            'Không tin cái gì 100%: thấy sai thì nói rõ sai ở đâu và muốn thế nào — Agent viết lại trong vài giây.',
            'Kỹ năng duyệt dùng ở cả hai con đường: kịch bản tự quay, và video KOL, KOC, affiliate gửi về.'
          ],
          khoi: [
            { loai: 'kiem', tieu: '5 câu hỏi duyệt kịch bản — tick khi duyệt thử', muc: ['3 giây đầu có làm mình dừng tay không?', 'Có đúng nỗi đau, mong muốn của khách hàng không?', 'Thân có bằng chứng thật (dùng thật, trước – sau, điểm khác biệt) không?', 'Lời có đúng luật, không bịa số, không hứa chữa khỏi không?', 'Kêu gọi có đúng một hành động rõ không?'] },
            { loai: 'cau-noi', tieu: 'Trả kịch bản cho Agent — nói rõ sai ở đâu, muốn thế nào', muc: [
              'Hook đang kể lể. Đổi thành một câu hỏi chạm nỗi đau da dầu, đọc dưới 3 giây.',
              'Bỏ câu “hết mụn sau 3 ngày”. Chỉ nói điều sản phẩm làm được, đúng hồ sơ sản phẩm.',
              'Thân thiếu bằng chứng. Thêm cảnh dùng thật và một khoảnh khắc trước – sau.',
              'Kêu gọi đang có 2 việc. Chỉ giữ “bấm giỏ hàng bên dưới”.'
            ] },
            { loai: 'luu-y', chu: '<b>Lời quảng cáo mỹ phẩm, thực phẩm chức năng.</b> Không bịa số liệu, không hứa chữa khỏi, không cam kết tuyệt đối (“100%”, “vĩnh viễn”). Máy có kiểm lời bị cấm trước khi dựng, nhưng người duyệt vẫn đọc lại — người là người quyết định cuối.' },
            { loai: 'the', tieu: 'Hai con đường cùng dùng kỹ năng duyệt', muc: [
              { tieu: 'Người tìm công thức', chu: 'Duyệt kịch bản tự quay ngay trước buổi quay — sửa ở kịch bản rẻ hơn quay lại.' },
              { tieu: 'Người mở rộng', chu: 'Duyệt kịch bản và video mà KOL, KOC, affiliate gửi về — cùng 5 câu hỏi, cùng luật.' }
            ] }
          ],
          hoi_nhanh: [
            { hoi: 'Kịch bản có câu “trị dứt điểm mụn sau 3 ngày”. Bạn làm gì?', chon: ['Giữ lại vì nghe hấp dẫn', 'Trả lại, yêu cầu bỏ lời hứa tuyệt đối và chỉ nói điều sản phẩm làm được', 'Đổi thành “sau 5 ngày”', 'Thêm nhạc cho bớt chú ý'], dap: 1,
              giai: 'Đây là lời hứa tuyệt đối — vi phạm câu hỏi số 4. Nói rõ cho Agent bỏ câu đó và chỉ nói điều có thật.' },
            { hoi: 'Bạn muốn Agent sửa hook. Câu góp ý nào giúp Agent viết trúng nhất?', chon: ['“Chưa hay, viết lại đi.”', '“Hook dài quá, rút còn 8 chữ, nói thẳng nỗi đau da dầu.”', '“Làm cho hay hơn.”', '“Tuỳ bạn.”'], dap: 1,
              giai: 'Góp ý rõ sai ở đâu, muốn thế nào thì Agent mới biết sửa gì — và lần sau viết trúng ngay.' }
          ]
        }
      ],
      kiem_tra: [
        { hoi: 'Ba phần của một kịch bản bán hàng là gì?', chon: ['Mở bài, thân bài, kết bài', 'Hook, thân, kêu gọi', 'Nhạc, hình, chữ', 'Giới thiệu, giá, khuyến mãi'], dap: 1 },
        { hoi: 'Vì sao 3 giây đầu quan trọng nhất?', chon: ['Vì TikTok tính tiền theo giây', 'Vì người xem quyết định ở lại hay lướt qua trong vài giây đầu', 'Vì logo phải ở đầu video', 'Vì giọng đọc nhanh nhất ở đầu'], dap: 1 },
        { hoi: 'Brief là gì?', chon: ['Bản báo cáo cuối tuần', 'Bản yêu cầu ngắn gửi Agent hoặc người dựng: sản phẩm, khách hàng, mục tiêu', 'Một kiểu hook', 'Tên một nền tảng'], dap: 1 },
        { hoi: 'Nguyên lý “một thân, nhiều hook” nghĩa là gì?', chon: ['Một video dùng nhiều nhạc nền', 'Giữ phần thân đã win, gắn nhiều hook khác nhau để có nhiều video mới', 'Một hook dùng cho mọi sản phẩm', 'Quay nhiều thân cho một hook'], dap: 1 },
        { hoi: 'Theo số liệu thật, dạng video nào đạt chuẩn cao nhất?', chon: ['Thay hook + kêu gọi', 'Video có cảnh quay thật (cắt ghép tự quay, tự quay gắn giỏ)', 'Thay hook', 'Không khác nhau'], dap: 1 },
        { hoi: 'Câu nào KHÔNG được có trong lời quảng cáo mỹ phẩm?', chon: ['“Da mình dịu hơn sau một tuần dùng”', '“Cam kết hết mụn vĩnh viễn 100%”', '“Bấm giỏ hàng bên dưới nhé”', '“Bạn có đang bị da dầu?”'], dap: 1 },
        { hoi: 'Agent viết kịch bản chưa đạt. Bạn nên làm gì?', chon: ['Dùng luôn vì Agent viết nhanh', 'Nói rõ sai ở đâu và muốn thế nào để Agent viết lại', 'Tự viết lại từ đầu', 'Bỏ qua phần chưa đạt'], dap: 1 }
      ],
      tu_luan: [
        'Viết 3 hook khác nhau cho một sản phẩm bạn biết rõ — mỗi hook một kiểu: nỗi đau, kết quả, câu hỏi.',
        'Lấy một kịch bản Agent viết gần đây, duyệt bằng 5 câu hỏi. Câu nào chưa đạt, và bạn góp ý cho Agent thế nào?'
      ],
      bai_tap: [
        ['Chia 1 video bán tốt thành hook – thân – kêu gọi', '20 phút', 'Ghi đúng giây bắt đầu từng phần + việc của từng phần'],
        ['Từ 1 thân video đã đạt, làm 3 video với 3 hook khác nhau', 'trong ngày', 'Mỗi hook khác cả hình lẫn lời'],
        ['Duyệt 1 kịch bản Agent viết bằng 5 câu hỏi, trả lại kèm góp ý', '15 phút', 'Mỗi góp ý nói rõ sai ở đâu, muốn thế nào']
      ],
      checklist: ['Chia được một video thành hook – thân – kêu gọi', 'Nói được 4 cách làm người xem dừng tay', 'Duyệt thử một kịch bản bằng 5 câu hỏi', 'Góp ý cho Agent rõ sai ở đâu, muốn thế nào']
    },
    // ================================================================ BUỔI 3
    {
      id: 'b3', so: 3, ten: 'Đọc số và Kaizen', phu: 'Số liệu cho biết kịch bản đúng hay sai. Làm kỹ một, nhân ra nhiều — và giỏi lên sau mỗi lô.',
      gop_y_ten: 'Buổi 3 · Cắt video Livestream (21/10)',
      bai: [
        {
          id: 'b3-1', ten: 'Đọc số sau khi đăng', phut: 2,
          tu_duy: 'Cảm giác thì quên, số liệu thì nhớ. Đọc số trước khi quyết sửa hay nhân bản.',
          ky_nang: 'Đọc số theo từng phần của video, sửa đúng phần yếu, nhận ra lúc nên nhân bản.',
          muc_tieu: ['Biết số nào đo hook, thân, kêu gọi.', 'Yếu đâu sửa đó, không làm lại cả video.', 'Nhận ra tín hiệu để nhân bản.'],
          canh: [
            { loi: 'Chào bạn, chào mừng bạn đến với buổi ba. Ở buổi trước, bạn đã biết cách viết và duyệt kịch bản. Nhưng chỉ khi video được đăng, số liệu mới cho bạn biết kịch bản đúng hay sai. Bài này dạy bạn đọc số sau khi đăng.',
              hinh: { loai: 'tieu-de', nhan: 'Buổi 3 · Bài 1', tieu: 'Đọc số sau khi đăng', phu: 'Nói chuyện bằng dữ liệu' } },
            { loi: 'Mỗi phần của video có một con số riêng. Với hook, xem bao nhiêu người ở lại qua vài giây đầu. Với thân, xem thời gian xem trung bình. Với kêu gọi, xem lượt bấm giỏ và đơn hàng.',
              hinh: { loai: 'doc-so' } },
            { loi: 'Phần nào yếu thì sửa đúng phần đó. Người xem lướt qua ngay thì đổi hook. Người xem ở lại nhưng không bấm giỏ thì xem lại thân và kêu gọi. Đừng làm lại cả video khi chỉ một phần có vấn đề.',
              hinh: { loai: 'danh-sach', tieu: 'Yếu đâu, sửa đó', muc: [{ tieu: 'Lướt qua ngay', chu: '→ đổi hook' }, { tieu: 'Xem nhưng không mua', chu: '→ sửa thân và kêu gọi' }] } },
            { loi: 'Còn khi video có đơn đều, đó là tín hiệu để nhân bản: giữ phần thân, thử thêm hook mới, như bạn đã học ở buổi hai.',
              hinh: { loai: 'so-sanh', tieu: 'Có đơn đều thì nhân bản', nhan_truoc: 'Video win', truoc: 'Có đơn đều', nhan_nay: 'Nhân bản', nay: 'Giữ thân, thử thêm hook mới' } },
            { loi: 'Vài chỉ số bạn sẽ gặp hằng ngày: lượt xem, tỉ lệ giữ chân ba giây đầu, CTR, và số đơn hàng. Đọc chúng cùng nhau, đừng nhìn một con số rồi kết luận.',
              hinh: { loai: 'chip', tieu: 'Chỉ số hằng ngày — đọc cùng nhau', muc: ['Lượt xem', 'Giữ chân 3 giây', 'CTR', 'Đơn hàng'] } },
            { loi: 'Đây chính là thói quen đầu tiên: nói chuyện bằng dữ liệu. Sau một trăm video, cảm giác của bạn sẽ quên, nhưng số liệu thì nhớ hết.',
              hinh: { loai: 'trich', chu: 'Cảm giác thì quên, số liệu thì nhớ.', nguon: 'Thói quen thứ nhất · Nói chuyện bằng dữ liệu' } },
            { loi: 'Tóm lại: đọc số theo từng phần, yếu đâu sửa đó, có đơn đều thì nhân bản. Bài tiếp theo: làm kỹ một, rồi mới nhân ra nhiều. Hẹn gặp bạn ở bài hai.',
              hinh: { loai: 'trich', chu: 'Yếu đâu sửa đó, có đơn đều thì nhân bản.', nguon: 'Bài tiếp theo · Làm kỹ một, nhân ra nhiều' } }
          ],
          y_chinh: [
            'Mỗi phần một con số: hook → người ở lại qua vài giây đầu · thân → thời gian xem · kêu gọi → bấm giỏ và đơn.',
            'Yếu đâu sửa đó: lướt qua ngay thì đổi hook; xem mà không mua thì sửa thân và kêu gọi.',
            'Có đơn đều là tín hiệu nhân bản: giữ thân, thử thêm hook mới.'
          ],
          khoi: [
            { loai: 'doc-so', tieu: 'Đọc số theo từng phần' },
            { loai: 'bang', tieu: 'Chẩn đoán nhanh', dau: ['Bạn thấy', 'Phần cần sửa', 'Làm gì'], dong: [
              ['Lướt qua ngay, ít người ở lại qua 3 giây', 'Hook', 'Đổi cả hình lẫn lời mở đầu'],
              ['Xem lâu nhưng ít bấm giỏ', 'Thân và kêu gọi', 'Thêm bằng chứng thật, kêu gọi đúng một hành động'],
              ['Có đơn đều', 'Không cần sửa', 'Nhân bản: giữ thân, thử thêm hook mới']
            ] },
            { loai: 'luu-y', chu: '<b>Đừng nhìn một con số.</b> Lượt xem cao mà không có đơn chưa phải video tốt. Đọc các chỉ số cùng nhau rồi mới kết luận.' },
            { loai: 'bang', tieu: 'Thuật ngữ trong bài', dau: ['Từ', 'Nghĩa'], dong: [
              ['Giữ chân 3 giây', 'Tỉ lệ người xem còn ở lại sau 3 giây đầu — đo sức của hook.'],
              ['CTR', 'Tỉ lệ bấm: trong số người thấy, bao nhiêu người bấm vào.'],
              ['Nhân bản', 'Giữ phần đã win của một video, làm thêm nhiều bản với hook mới.']
            ] }
          ],
          hoi_nhanh: [
            { hoi: 'Video có nhiều lượt xem nhưng gần như không ai bấm giỏ. Phần nào cần sửa trước?', chon: ['Hook', 'Thân và kêu gọi', 'Nhạc nền', 'Logo'], dap: 1,
              giai: 'Lượt xem tốt nghĩa là hook đã làm tốt việc của nó. Không ai bấm giỏ thì xem lại thân (đã đủ tin chưa) và kêu gọi (đã rõ chưa).' },
            { hoi: 'Một video có đơn đều mỗi ngày. Bước tiếp theo nên là gì?', chon: ['Dừng, vì đã đủ', 'Nhân bản: giữ thân, thử thêm hook mới', 'Làm lại cả video cho mới', 'Đổi sang sản phẩm khác'], dap: 1,
              giai: 'Có đơn đều là tín hiệu tốt nhất để nhân bản — giữ phần đã win, thử phần chưa biết.' }
          ]
        },
        {
          id: 'b3-2', ten: 'Làm kỹ một, nhân ra nhiều', phut: 2,
          tu_duy: 'Sửa một lần ở video mẫu rẻ hơn sửa mười lần ở cả lô.',
          ky_nang: 'Làm một video mẫu đạt chuẩn rồi mới nhân ra lô.',
          muc_tieu: ['Giải thích vì sao video đầu tiên phải làm kỹ.', 'Mô tả cách nhân một video mẫu ra cả lô.', 'Nêu 3 điều kiện trước khi nhân.'],
          canh: [
            { loi: 'Chào bạn, mình gặp lại nhau ở bài hai của buổi ba. Khi đã có nguyên liệu và kịch bản, đừng vội làm mười video một lúc. Nguyên lý của bài này rất gọn: làm kỹ một, rồi mới nhân ra nhiều.',
              hinh: { loai: 'tieu-de', nhan: 'Buổi 3 · Bài 2', tieu: 'Làm kỹ một, nhân ra nhiều', phu: 'Video mẫu trước · cả lô sau' } },
            { loi: 'Video đầu tiên làm chậm. Duyệt kỹ từng phần: kịch bản, giọng, hình, kêu gọi. Khi video mẫu đã ưng, Agent đã biết đúng gu bạn muốn. Lúc đó mới nhân ra cả lô, và cả lô đều đi theo video mẫu.',
              hinh: { loai: 'lo' } },
            { loi: 'Làm vội mười video thì một lỗi lặp lại mười lần, và bạn phải sửa mười lần. Làm kỹ một video thì lỗi được sửa một lần, ngay trước khi nhân.',
              hinh: { loai: 'so-sanh', tieu: 'Sửa bao nhiêu lần?', nhan_truoc: 'Làm vội', nhan_nay: 'Làm kỹ', truoc: 'Làm vội 10 video → lỗi lặp 10 lần, sửa 10 lần', nay: 'Làm kỹ 1 video mẫu → sửa 1 lần, rồi mới nhân' } },
            { loi: 'Chỉ nhân khi video mẫu đã qua năm câu hỏi duyệt ở buổi hai, người duyệt đã xem, và giọng cùng kêu gọi đã ổn.',
              hinh: { loai: 'danh-sach', so: true, tieu: 'Khi nào được nhân?', muc: [{ tieu: 'Qua 5 câu hỏi', chu: 'duyệt kịch bản ở Buổi 2' }, { tieu: 'Người duyệt đã xem', chu: 'video mẫu được duyệt' }, { tieu: 'Giọng và kêu gọi ổn', chu: 'hai chỗ hay lỗi nhất' }] } },
            { loi: 'Đây là cách hành động nhanh mà không vội: chậm ở video mẫu, để nhanh ở cả lô.',
              hinh: { loai: 'trich', chu: 'Chậm ở video mẫu, nhanh ở cả lô.', nguon: 'Hành động nhanh, thích ứng nhanh' } },
            { loi: 'Tóm lại: làm kỹ một, nhân ra nhiều. Bài cuối của buổi ba nói về cách giỏi lên sau mỗi lô: Kaizen. Hẹn gặp bạn ở bài ba.',
              hinh: { loai: 'trich', chu: 'Làm kỹ một, nhân ra nhiều.', nguon: 'Bài tiếp theo · Kaizen' } }
          ],
          y_chinh: [
            'Video mẫu làm chậm, duyệt kỹ từng phần — Agent học đúng gu trước khi nhân.',
            'Làm vội 10 video = sửa 10 lần. Làm kỹ 1 video = sửa 1 lần.',
            'Chỉ nhân khi: qua 5 câu hỏi duyệt, người duyệt đã xem, giọng và kêu gọi đã ổn.'
          ],
          khoi: [
            { loai: 'lo', tieu: '1 video mẫu đã duyệt → cả lô đi theo' },
            { loai: 'so-sanh', tieu: 'Làm vội và làm kỹ', nhan: ['', 'Làm vội 10 video', 'Làm kỹ 1 rồi nhân'], dong: [
              ['Lỗi', 'Lặp lại ở cả 10 video', 'Sửa một lần ở video mẫu'],
              ['Gu video', 'Mỗi video một kiểu', 'Cả lô cùng gu đã duyệt'],
              ['Tốc độ', 'Nhanh lúc đầu, chậm lúc sửa', 'Chậm ở video mẫu, nhanh ở cả lô']
            ] },
            { loai: 'the', tieu: 'Mẹo làm video mẫu', muc: [
              { tieu: 'Bắt đầu từ video ngắn', chu: 'Làm chỉn chu một video ngắn trước để Agent học đúng gu.' },
              { tieu: 'Sửa từ kịch bản', chu: 'Sửa ở kịch bản rẻ hơn sửa ở video đã dựng.' },
              { tieu: 'Ghi lại điều đã sửa', chu: 'Để cả lô sau làm đúng ngay — đây là bước đầu của Kaizen.' }
            ] }
          ],
          hoi_nhanh: [
            { hoi: 'Khi nào thì được nhân video mẫu ra cả lô?', chon: ['Ngay khi Agent viết xong kịch bản', 'Khi video mẫu đã qua 5 câu hỏi duyệt, người duyệt đã xem, giọng và kêu gọi đã ổn', 'Khi gần hết giờ làm', 'Khi đã có 10 kịch bản'], dap: 1,
              giai: 'Nhân quá sớm thì lỗi của video mẫu bị nhân lên cả lô.' }
          ]
        },
        {
          id: 'b3-3', ten: 'Kaizen: giỏi lên sau mỗi lô', phut: 2,
          tu_duy: 'Lỗi chỉ phải sửa một lần — bài học ghi lại là của cả bạn và Agent.',
          ky_nang: 'Làm vòng Kaizen 3 câu cuối ngày.',
          muc_tieu: ['Giải thích Kaizen trong workflow.', 'Làm vòng Kaizen 3 câu cuối ngày.', 'Biết vì sao thử sai không đáng sợ.'],
          canh: [
            { loi: 'Chào bạn, đây là bài cuối của phần nền tảng. Ở buổi một, bạn đã gặp chữ Kaizen, nghĩa là cải tiến liên tục. Bài này chỉ bạn cách làm Kaizen mỗi ngày, để cả bạn và Agent hôm nay giỏi hơn hôm qua.',
              hinh: { loai: 'tieu-de', nhan: 'Buổi 3 · Bài 3', tieu: 'Kaizen', phu: 'Giỏi lên sau mỗi lô' } },
            { loi: 'Mỗi lần bạn sửa một lỗi, hãy ghi lại thành bài học và nói Agent nhớ. Lần sau gặp tình huống giống vậy, Agent làm đúng ngay, không cần bạn nhắc. Lỗi chỉ phải sửa một lần.',
              hinh: { loai: 'vong-nho', muc: ['Gặp lỗi', 'Sửa', 'Ghi bài học', 'Agent nhớ', 'Không lặp lại'] } },
            { loi: 'Cuối ngày, dành năm phút trả lời ba câu. Hôm nay mình sửa lỗi gì nhiều nhất? Vì sao lỗi đó xảy ra? Và ghi bài học gì để lần sau không lặp lại?',
              hinh: { loai: 'danh-sach', so: true, tieu: 'Kaizen 5 phút cuối ngày', muc: [{ tieu: 'Sửa gì nhiều nhất?', chu: 'lỗi lặp lại trong ngày' }, { tieu: 'Vì sao?', chu: 'do dữ liệu, kịch bản hay cách yêu cầu' }, { tieu: 'Ghi bài học gì?', chu: 'để Agent nhớ, lần sau không lặp' }] } },
            { loi: 'Kết quả của vòng học lại thấy rõ trên số. Ở đội làm video AI của công ty, tỉ lệ video đạt chuẩn tăng ba tuần liền: ba mươi sáu, bốn mươi tám, rồi năm mươi mốt phần trăm.',
              hinh: { loai: 'cot', tieu: 'Tỉ lệ video đạt chuẩn theo tuần', hau: '%', cot: [{ nhan: 'Tuần 1', gt: 36 }, { nhan: 'Tuần 2', gt: 48 }, { nhan: 'Tuần 3', gt: 51 }], chu_cuoi: 'Tăng 3 tuần liền' } },
            { loi: 'Đó là thói quen thứ ba: chấp nhận và sẵn sàng thử sai. Sai không đáng sợ. Sai một lỗi hai lần mới đáng sợ.',
              hinh: { loai: 'trich', chu: 'Sai không đáng sợ. Sai một lỗi hai lần mới đáng sợ.', nguon: 'Thói quen thứ ba · Chấp nhận và sẵn sàng thử sai' } },
            { loi: 'Bạn đã đi hết phần nền tảng: kịch bản để hành động nhanh, đọc số để nói chuyện bằng dữ liệu, và Kaizen để thử sai mà không lặp lỗi. Tiếp theo, bạn thực hành trên Xưởng video, rồi đi sâu vào con đường của mình. Chúc bạn làm ra thật nhiều video win.',
              hinh: { loai: 'ket', tieu: 'Bạn đã có nền tảng', muc: ['Kịch bản để hành động nhanh', 'Đọc số để nói chuyện bằng dữ liệu', 'Kaizen để thử sai mà không lặp lỗi', 'Tiếp theo: Xưởng video, rồi con đường của bạn'] } }
          ],
          y_chinh: [
            'Mỗi lỗi sửa xong → ghi thành bài học → Agent nhớ → lần sau không lặp.',
            'Kaizen 5 phút cuối ngày: sửa gì nhiều nhất · vì sao · ghi bài học gì.',
            'Sai không đáng sợ, sai một lỗi hai lần mới đáng sợ. Tỉ lệ đạt chuẩn đã tăng 3 tuần liền: 36% → 48% → 51%.'
          ],
          khoi: [
            { loai: 'vong-nho', tieu: 'Vòng Kaizen', muc: ['Gặp lỗi', 'Sửa', 'Ghi bài học', 'Agent nhớ', 'Không lặp lại'] },
            { loai: 'cot', tieu: 'Tỉ lệ video đạt chuẩn theo tuần', phu: 'Đội làm video AI · cùng một cách tính · Dashboard Video AI', hau: '%', cot: [{ nhan: '13–17/10', gt: 36 }, { nhan: '19–25/10', gt: 48 }, { nhan: '26/10–01/11', gt: 51 }] },
            { loai: 'cau-noi', tieu: 'Nói với Agent để ghi bài học', muc: [
              'Ghi bài học: kêu gọi ở video cắt live phải nối bằng chuyển cảnh mượt, âm thanh nhỏ dần. Lần sau làm đúng như vậy.',
              'Hôm nay mình sửa giọng 4 lần vì đọc quá nhanh. Ghi lại: sản phẩm này đọc chậm, nhấn vào lợi ích.',
              'Tổng kết hôm nay: mình đã sửa những lỗi gì nhiều nhất? Gợi ý bài học nào nên ghi lại?'
            ] },
            { loai: 'the', tieu: 'Ba buổi nền tảng, ba thói quen', phu: 'Học tập và phát triển không ngừng — giá trị cốt lõi của công ty.', muc: [
              { tieu: 'Hành động nhanh, thích ứng nhanh', chu: 'Buổi 2: kịch bản rõ ràng, một thân nhiều hook, làm kỹ một rồi nhân ra nhiều.' },
              { tieu: 'Nói chuyện bằng dữ liệu', chu: 'Bài 3.1: đọc số theo từng phần, yếu đâu sửa đó.' },
              { tieu: 'Chấp nhận và sẵn sàng thử sai', chu: 'Bài 3.3: mỗi video là một phép thử, sai thì ghi bài học.' }
            ] }
          ],
          hoi_nhanh: [
            { hoi: 'Bạn vừa sửa cùng một lỗi giọng lần thứ ba trong ngày. Việc nên làm là gì?', chon: ['Tiếp tục sửa tay mỗi lần', 'Ghi thành bài học và nói Agent nhớ để lần sau không lặp', 'Đổi sang sản phẩm khác', 'Bỏ giọng đọc'], dap: 1,
              giai: 'Lỗi chỉ nên sửa một lần. Ghi thành bài học thì Agent nhớ, lần sau làm đúng ngay.' }
          ]
        }
      ],
      kiem_tra: [
        { hoi: 'Số nào cho biết hook làm tốt việc của nó?', chon: ['Số đơn hàng', 'Lượt xem và tỉ lệ người xem ở lại qua vài giây đầu', 'Số bình luận', 'Độ dài video'], dap: 1 },
        { hoi: 'Video nhiều lượt xem nhưng ít người bấm giỏ. Sửa phần nào trước?', chon: ['Hook', 'Thân và kêu gọi', 'Nhạc nền', 'Làm lại cả video'], dap: 1 },
        { hoi: 'Khi nào là tín hiệu để nhân bản một video?', chon: ['Khi video có nhiều lượt thích', 'Khi video có đơn đều', 'Khi vừa đăng xong', 'Khi người dựng thấy đẹp'], dap: 1 },
        { hoi: 'Vì sao phải làm kỹ video mẫu trước khi nhân?', chon: ['Để có video đẹp nhất để khoe', 'Để lỗi được sửa một lần, không bị nhân lên cả lô', 'Vì máy chạy chậm', 'Để có thêm việc cho người duyệt'], dap: 1 },
        { hoi: 'Kaizen trong workflow là gì?', chon: ['Một phần mềm dựng video', 'Cải tiến liên tục: lỗi sửa xong thành bài học để Agent nhớ', 'Một kiểu hook', 'Báo cáo cuối tháng'], dap: 1 },
        { hoi: 'Ba câu Kaizen cuối ngày là gì?', chon: ['Làm bao nhiêu video, mấy giờ về, mai làm gì', 'Sửa gì nhiều nhất, vì sao, ghi bài học gì', 'Ai làm sai, sai ở đâu, phạt thế nào', 'Video nào đẹp, nhạc gì, chữ gì'], dap: 1 },
        { hoi: 'Tỉ lệ video đạt chuẩn tăng 36% → 48% → 51% trong 3 tuần cho thấy điều gì?', chon: ['Không có gì đặc biệt', 'Vòng học lại (Kaizen) có tác dụng', 'Video dài hơn thì tốt hơn', 'Chỉ do may mắn'], dap: 1 }
      ],
      tu_luan: [
        'Chọn một video bạn đã đăng (hoặc một video trong kho). Đọc số theo 3 phần: phần nào yếu nhất, và bạn sẽ sửa thế nào?',
        'Ghi 3 câu Kaizen của một ngày làm việc gần nhất: sửa gì nhiều nhất, vì sao, ghi bài học gì.'
      ],
      bai_tap: [
        ['Đọc số 3 video đã đăng, chỉ ra phần yếu nhất của từng video', '20 phút', 'Mỗi video có 1 con số làm dẫn chứng'],
        ['Làm 1 video mẫu thật kỹ, nhờ người duyệt xem', 'trong ngày', 'Qua đủ 5 câu hỏi duyệt'],
        ['Nhân video mẫu ra lô 5 video', 'trong ngày', 'Cả lô cùng gu với video mẫu'],
        ['Cuối ngày ghi 3 câu Kaizen', '5 phút', 'Có ít nhất 1 bài học đã nói Agent nhớ']
      ],
      checklist: ['Đọc được số theo 3 phần của video', 'Biết khi nào sửa, khi nào nhân bản', 'Đã làm một video mẫu trước khi nhân lô', 'Đã làm Kaizen cuối ngày ít nhất một lần']
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
    },
    // ================================================================ PHẦN 3 · HỌC RIÊNG — Con đường 1 · Người tìm công thức (Buổi 6–7), Con đường 2 · Người mở rộng (Buổi 8–9)
    // mo_sau: buổi phải đạt trước khi mở (Buổi 6 và 8 cùng mở sau Buổi 5). con_duong: 1 | 2.
    // ================================================================ BUỔI 6
    {
      id: 'b6', so: 6, phan: 3, con_duong: 1, mo_sau: 'b5', ten: 'Hiểu sản phẩm, chọn angle', phu: 'Con đường 1 · Người tìm công thức. Không hiểu sản phẩm thì không có angle đúng — học từ video win, rồi biến angle thành kịch bản tự quay.',
      gop_y_ten: 'Buổi 6 · Hiểu sản phẩm, chọn angle',
      bai: [
        {
          id: 'b6-1', ten: 'Hiểu sản phẩm trước khi làm', phut: 2,
          tu_duy: 'Không hiểu sản phẩm thì không có angle đúng.',
          ky_nang: 'Lập hồ sơ sản phẩm 1 trang: khách là ai, nỗi đau, điểm khác biệt, câu được nói và câu cấm.',
          muc_tieu: ['Biết 5 mục của hồ sơ sản phẩm 1 trang.', 'Viết khách hàng như một người thật, viết nỗi đau bằng lời của khách.', 'Ghi sẵn câu được nói và câu cấm.'],
          canh: [
            { loi: 'Chào bạn, chào mừng bạn đến với con đường thứ nhất: người tìm công thức. Sản phẩm bạn cầm đang tìm chỗ đứng, nên việc đầu tiên không phải là quay, mà là hiểu sản phẩm. Không hiểu sản phẩm thì không có angle đúng.',
              hinh: { loai: 'tieu-de', nhan: 'Con đường 1 · Buổi 6 · Bài 1', tieu: 'Hiểu sản phẩm trước khi làm', phu: 'Không hiểu sản phẩm thì không có angle đúng' } },
            { loi: 'Hãy gói mọi thứ vào một hồ sơ một trang, gồm năm mục. Khách là ai. Họ đang gặp nỗi đau gì. Sản phẩm khác gì so với sản phẩm khác. Câu nào được nói. Và câu nào tuyệt đối không được nói.',
              hinh: { loai: 'danh-sach', so: true, tieu: 'Hồ sơ sản phẩm 1 trang', muc: [{ tieu: 'Khách là ai', chu: 'như một người thật' }, { tieu: 'Nỗi đau', chu: 'bằng lời của khách' }, { tieu: 'Điểm khác biệt', chu: 'điều chỉ sản phẩm này có' }, { tieu: 'Câu được nói', chu: 'đúng điều sản phẩm làm được' }, { tieu: 'Câu cấm', chu: 'ghi sẵn từ đầu' }] } },
            { loi: 'Khách là ai không phải là phụ nữ từ mười tám đến ba mươi lăm tuổi. Hãy viết như một người thật: một bạn sinh viên da dầu, đi học cả ngày, đến chiều mặt bóng loáng và ngại chụp ảnh.',
              hinh: { loai: 'so-sanh', tieu: 'Viết khách như một người thật', nhan_truoc: 'Chung chung', truoc: '“Nữ 18–35 tuổi”', nhan_nay: 'Người thật', nay: '“Sinh viên da dầu, đến chiều mặt bóng loáng, ngại chụp ảnh”' } },
            { loi: 'Nỗi đau và điểm khác biệt nên viết bằng lời của khách, không bằng lời của hãng. Đọc bình luận và đánh giá của người mua thật: họ phàn nàn gì, khen gì, hỏi gì nhiều nhất. Đó là kho angle miễn phí.',
              hinh: { loai: 'danh-sach', tieu: 'Lời của khách nằm ở đâu', muc: [{ tieu: 'Bình luận', chu: 'dưới video của mình và của đối thủ' }, { tieu: 'Đánh giá', chu: 'của người đã mua' }, { tieu: 'Câu hỏi', chu: 'khách hỏi nhiều nhất' }] } },
            { loi: 'Mục cuối là câu được nói và câu cấm. Với mỹ phẩm và thực phẩm chức năng, chỉ nói điều sản phẩm làm được, đúng hồ sơ sản phẩm. Ghi sẵn từ đầu, để Agent và người dựng không bao giờ viết sai.',
              hinh: { loai: 'trich', chu: 'Ghi sẵn câu cấm từ đầu, để không ai viết sai.', nguon: 'Hồ sơ sản phẩm · mục 5' } },
            { loi: 'Khi có hồ sơ một trang, Agent viết kịch bản trúng hơn, và bạn duyệt nhanh hơn. Bài tiếp theo: soi video win để chọn angle. Hẹn gặp bạn ở bài hai.',
              hinh: { loai: 'trich', chu: 'Hồ sơ rõ, kịch bản trúng.', nguon: 'Bài tiếp theo · Soi video win để chọn angle' } }
          ],
          y_chinh: [
            'Hồ sơ 1 trang: khách là ai · nỗi đau · điểm khác biệt · câu được nói · câu cấm.',
            'Viết khách như một người thật; viết nỗi đau và điểm khác biệt bằng lời của khách (bình luận, đánh giá, câu hỏi).',
            'Hồ sơ rõ thì Agent viết kịch bản trúng hơn, bạn duyệt nhanh hơn.'
          ],
          khoi: [
            { loai: 'the', tieu: 'Hồ sơ sản phẩm 1 trang — ví dụ một sản phẩm trị mụn', muc: [
              { tieu: '1 · Khách là ai', chu: 'Sinh viên, nhân viên văn phòng da dầu, hay nổi mụn, đến chiều mặt bóng loáng, ngại chụp ảnh.' },
              { tieu: '2 · Nỗi đau', chu: '“Mụn cứ lặn rồi lại lên”, “thâm mãi không mờ”, “ngại để mặt mộc”.' },
              { tieu: '3 · Điểm khác biệt', chu: 'Điều chỉ sản phẩm này có, nói bằng lời khách hiểu ngay.' },
              { tieu: '4 · Câu được nói', chu: 'Đúng điều sản phẩm làm được, có trong hồ sơ của thương hiệu.' },
              { tieu: '5 · Câu cấm', chu: '“Chữa khỏi”, “100%”, “vĩnh viễn”, số liệu không có nguồn.' }
            ] },
            { loai: 'luu-y', chu: '<b>Kho angle miễn phí.</b> Bình luận, đánh giá và câu hỏi của người mua thật cho bạn biết khách đau ở đâu, thích gì — bằng đúng lời họ dùng. Lời của khách luôn trúng hơn lời của hãng.' },
            { loai: 'kiem', tieu: 'Hồ sơ của bạn đã đủ chưa?', muc: ['Khách hàng được tả như một người thật', 'Nỗi đau viết bằng lời của khách', 'Có ít nhất 1 điểm khác biệt rõ ràng', 'Có danh sách câu được nói', 'Có danh sách câu cấm'] }
          ],
          hoi_nhanh: [
            { hoi: 'Cách viết “khách là ai” nào giúp chọn angle tốt hơn?', chon: ['“Nữ 18–35 tuổi”', '“Sinh viên da dầu, đến chiều mặt bóng loáng, ngại chụp ảnh”', '“Mọi người”', '“Người thích làm đẹp”'], dap: 1,
              giai: 'Khách càng giống một người thật, bạn càng dễ thấy họ đau ở đâu — và angle càng trúng.' }
          ]
        },
        {
          id: 'b6-2', ten: 'Soi video win để chọn angle', phut: 2,
          tu_duy: 'Học từ cái đã bán được, không đoán.',
          ky_nang: 'Tìm video win cùng loại, bóc angle – hook – bằng chứng, chọn 3 angle có bằng chứng.',
          muc_tieu: ['Tìm được video win cùng loại sản phẩm.', 'Bóc một video win thành angle, hook, bằng chứng.', 'Chọn 3 angle, mỗi angle có một video win làm bằng chứng.'],
          canh: [
            { loi: 'Chào bạn, mình gặp lại nhau ở bài hai. Sản phẩm mới chưa có video win, nhưng thị trường thì có. Bài này chỉ bạn học từ những video đã bán được, thay vì đoán.',
              hinh: { loai: 'tieu-de', nhan: 'Con đường 1 · Buổi 6 · Bài 2', tieu: 'Soi video win để chọn angle', phu: 'Học từ cái đã bán được, không đoán' } },
            { loi: 'Bắt đầu bằng việc tìm video win cùng loại: cùng nhóm sản phẩm, cùng tầm giá, và đang ra đơn đều. Có thể là video của đối thủ, hoặc video cũ của chính thương hiệu.',
              hinh: { loai: 'danh-sach', tieu: 'Tìm video win cùng loại', muc: [{ tieu: 'Cùng nhóm sản phẩm', chu: 'cùng giải một nỗi đau' }, { tieu: 'Cùng tầm giá', chu: 'cùng kiểu khách mua' }, { tieu: 'Đang ra đơn đều', chu: 'không chỉ nhiều lượt xem' }] } },
            { loi: 'Với mỗi video, bóc ra ba thứ. Angle: video nói về nỗi đau nào, cho ai. Hook: ba giây đầu làm gì để giữ người xem. Và bằng chứng: phần thân dùng gì để người xem tin.',
              hinh: { loai: 'danh-sach', so: true, tieu: 'Bóc một video win', muc: [{ tieu: 'Angle', chu: 'nỗi đau nào, cho ai' }, { tieu: 'Hook', chu: '3 giây đầu làm gì' }, { tieu: 'Bằng chứng', chu: 'thân dùng gì để người xem tin' }] } },
            { loi: 'Soi đủ nhiều video, bạn sẽ thấy vài angle lặp lại. Angle nào xuất hiện ở nhiều video win, đó là angle có bằng chứng. Chọn ba angle như vậy để thử trước.',
              hinh: { loai: 'trich', chu: 'Angle lặp lại ở nhiều video win là angle có bằng chứng.', nguon: 'Chọn 3 angle để thử trước' } },
            { loi: 'Học, nhưng không chép. Giữ angle và cấu trúc, còn lời, hình và người nói phải là của mình, đúng sản phẩm của mình.',
              hinh: { loai: 'so-sanh', tieu: 'Học, không chép', nhan_truoc: 'Chép', truoc: 'Lấy nguyên lời, nguyên hình', nhan_nay: 'Học', nay: 'Giữ angle và cấu trúc, làm bằng lời và hình của mình' } },
            { loi: 'Tóm lại: tìm video win cùng loại, bóc angle, hook, bằng chứng, rồi chọn ba angle có bằng chứng. Bài tiếp theo: từ angle ra kịch bản tự quay. Hẹn gặp bạn ở bài ba.',
              hinh: { loai: 'trich', chu: 'Học từ cái đã bán được, không đoán.', nguon: 'Bài tiếp theo · Từ angle ra kịch bản tự quay' } }
          ],
          y_chinh: [
            'Tìm video win cùng nhóm sản phẩm, cùng tầm giá, đang ra đơn đều — của đối thủ hoặc của chính thương hiệu.',
            'Bóc mỗi video thành 3 thứ: angle · hook · bằng chứng.',
            'Angle lặp lại ở nhiều video win là angle có bằng chứng — chọn 3 angle như vậy để thử trước. Học, không chép.'
          ],
          khoi: [
            { loai: 'bang', tieu: 'Phiếu bóc video win', dau: ['Video', 'Angle (nỗi đau nào, cho ai)', 'Hook (3 giây đầu)', 'Bằng chứng'], dong: [
              ['Ví dụ', 'Da dầu bóng loáng buổi chiều, cho sinh viên', 'Cận mặt bóng dầu + câu hỏi “Chiều nào cũng thế này?”', 'Cảnh dùng thật, giấy thấm dầu trước – sau'],
              ['Video 2', '…', '…', '…'],
              ['Video 3', '…', '…', '…']
            ] },
            { loai: 'luu-y', chu: '<b>Học, không chép.</b> Giữ angle và cấu trúc của video win. Lời, hình và người nói phải là của mình, đúng hồ sơ sản phẩm của mình.' },
            { loai: 'the', tieu: 'Chọn angle để thử trước', muc: [
              { tieu: 'Có bằng chứng', chu: 'Xuất hiện ở nhiều video win cùng loại — thử trước.' },
              { tieu: 'Hợp hồ sơ', chu: 'Đúng nỗi đau và điểm khác biệt trong hồ sơ 1 trang.' },
              { tieu: 'Mới lạ', chu: 'Chưa ai làm — để dành, thử sau khi đã có video ra đơn.' }
            ] }
          ],
          hoi_nhanh: [
            { hoi: 'Sản phẩm mới ra. Angle nào nên thử trước?', chon: ['Angle bạn thích nhất', 'Angle xuất hiện ở nhiều video win cùng loại', 'Angle chưa ai làm', 'Angle có nhiều chữ nhất'], dap: 1,
              giai: 'Angle lặp lại ở nhiều video win đã có bằng chứng thị trường. Angle mới lạ để dành, thử sau khi đã có video ra đơn.' }
          ]
        },
        {
          id: 'b6-3', ten: 'Từ angle ra kịch bản tự quay', phut: 2,
          tu_duy: 'Mỗi angle là một phép thử.',
          ky_nang: 'Viết kịch bản kèm 3 câu mở và danh sách cảnh cần quay.',
          muc_tieu: ['Biết 3 thứ của một kịch bản tự quay.', 'Viết danh sách cảnh cụ thể.', 'Giữ mỗi video chỉ thử một angle.'],
          canh: [
            { loi: 'Chào bạn, đây là bài cuối của buổi sáu. Bạn đã có ba angle có bằng chứng. Giờ biến mỗi angle thành một kịch bản tự quay, để mỗi video là một phép thử rõ ràng.',
              hinh: { loai: 'tieu-de', nhan: 'Con đường 1 · Buổi 6 · Bài 3', tieu: 'Từ angle ra kịch bản tự quay', phu: 'Mỗi angle là một phép thử' } },
            { loi: 'Một kịch bản tự quay gồm ba thứ. Kịch bản ba phần: hook, thân, kêu gọi. Ba câu mở khác nhau cho cùng một thân. Và danh sách cảnh cần quay.',
              hinh: { loai: 'danh-sach', so: true, tieu: 'Kịch bản tự quay có 3 thứ', muc: [{ tieu: 'Kịch bản 3 phần', chu: 'hook, thân, kêu gọi' }, { tieu: '3 câu mở', chu: 'cho cùng một thân' }, { tieu: 'Danh sách cảnh', chu: 'cảnh nào, khung nào, bao lâu' }] } },
            { loi: 'Vì sao ba câu mở? Vì cùng một buổi quay, bạn quay thân một lần, rồi quay ba cách mở. Đăng lên, số đo sẽ chọn hook tốt nhất, đúng như bài một thân, nhiều hook.',
              hinh: { loai: 'nhan' } },
            { loi: 'Danh sách cảnh viết thật cụ thể: cảnh nào, quay ở đâu, cận hay xa, cầm sản phẩm thế nào. Ví dụ: cận tay lấy kem ra đầu ngón tay, ánh sáng cửa sổ, ba giây.',
              hinh: { loai: 'trich', chu: 'Cận tay lấy kem ra đầu ngón tay · ánh sáng cửa sổ · 3 giây', nguon: 'Một dòng trong danh sách cảnh' } },
            { loi: 'Mỗi video chỉ thử một angle. Như vậy khi đọc số, bạn biết chắc angle nào thắng, angle nào thua, và vì sao.',
              hinh: { loai: 'trich', chu: 'Mỗi video một angle, để số liệu nói rõ.', nguon: 'Mỗi angle là một phép thử' } },
            { loi: 'Trước khi quay, duyệt kịch bản bằng năm câu hỏi của buổi hai. Sửa ở kịch bản luôn rẻ hơn quay lại. Buổi tiếp theo: quay, dựng và tối ưu. Hẹn gặp bạn ở buổi bảy.',
              hinh: { loai: 'trich', chu: 'Sửa ở kịch bản rẻ hơn quay lại.', nguon: 'Buổi tiếp theo · Quay, dựng và tối ưu' } }
          ],
          y_chinh: [
            'Kịch bản tự quay = kịch bản 3 phần + 3 câu mở cho cùng một thân + danh sách cảnh.',
            'Danh sách cảnh ghi rõ: cảnh gì, khung cận hay xa, ánh sáng, bao nhiêu giây.',
            'Mỗi video chỉ thử một angle; duyệt bằng 5 câu hỏi trước khi quay.'
          ],
          khoi: [
            { loai: 'bang', tieu: 'Mẫu danh sách cảnh', dau: ['Cảnh', 'Nội dung', 'Khung', 'Dài'], dong: [
              ['1 · Hook A', 'Cận mặt bóng dầu buổi chiều', 'Cận, dọc', '3 giây'],
              ['2 · Hook B', 'Tay cầm sản phẩm, đặt câu hỏi', 'Cận', '3 giây'],
              ['3 · Thân', 'Lấy kem ra đầu ngón tay, thoa', 'Cận tay', '5 giây'],
              ['4 · Thân', 'Trước – sau cùng góc, cùng ánh sáng', 'Vừa', '6 giây'],
              ['5 · Kêu gọi', 'Chỉ xuống giỏ hàng', 'Vừa', '3 giây']
            ] },
            { loai: 'luu-y', chu: '<b>Trước – sau phải thật.</b> Cùng góc, cùng ánh sáng, không chỉnh màu. Nếu không, người xem không tin — và có thể vi phạm luật quảng cáo.' },
            { loai: 'kiem', tieu: 'Trước khi quay', muc: ['Kịch bản đã qua 5 câu hỏi duyệt', 'Có 3 câu mở khác nhau cho cùng một thân', 'Mỗi video chỉ thử một angle', 'Danh sách cảnh ghi rõ khung, ánh sáng, độ dài'] }
          ],
          hoi_nhanh: [
            { hoi: 'Vì sao mỗi video chỉ nên thử một angle?', chon: ['Để video ngắn hơn', 'Để khi đọc số biết chắc angle nào thắng và vì sao', 'Vì máy chỉ dựng được một angle', 'Không cần, càng nhiều angle càng tốt'], dap: 1,
              giai: 'Một video trộn nhiều angle thì số liệu không nói được angle nào đã làm nên kết quả.' }
          ]
        }
      ],
      kiem_tra: [
        { hoi: 'Hồ sơ sản phẩm 1 trang gồm những gì?', chon: ['Giá, khuyến mãi, quà tặng', 'Khách là ai · nỗi đau · điểm khác biệt · câu được nói · câu cấm', 'Logo, màu, font chữ', 'Doanh số của đối thủ'], dap: 1 },
        { hoi: 'Nỗi đau của khách nên viết bằng lời của ai?', chon: ['Lời của hãng', 'Lời của khách — lấy từ bình luận, đánh giá, câu hỏi', 'Lời của người dựng', 'Lời trong sách chuyên môn'], dap: 1 },
        { hoi: 'Bóc một video win thành những gì?', chon: ['Nhạc, màu, font', 'Angle · hook · bằng chứng', 'Lượt thích, lượt chia sẻ', 'Độ dài, độ phân giải'], dap: 1 },
        { hoi: 'Angle nào là angle có bằng chứng?', chon: ['Angle mình nghĩ ra đầu tiên', 'Angle xuất hiện ở nhiều video win cùng loại', 'Angle của video nhiều lượt xem nhất', 'Angle chưa ai làm'], dap: 1 },
        { hoi: 'Vì sao kịch bản tự quay nên có 3 câu mở?', chon: ['Cho video dài hơn', 'Quay thân một lần, quay 3 cách mở, rồi để số đo chọn hook tốt nhất', 'Để người xem xem 3 lần', 'Vì luật yêu cầu'], dap: 1 },
        { hoi: 'Học từ video win của đối thủ đúng cách là gì?', chon: ['Lấy nguyên lời và hình', 'Giữ angle và cấu trúc, làm bằng lời, hình, người nói của mình', 'Không xem video đối thủ', 'Đăng lại video của họ'], dap: 1 }
      ],
      tu_luan: [
        'Viết hồ sơ 1 trang cho sản phẩm bạn đang cầm: khách là ai, nỗi đau, điểm khác biệt, câu được nói, câu cấm.',
        'Chọn 3 angle cho sản phẩm đó. Với mỗi angle, nêu 1 video win cùng loại làm bằng chứng.'
      ],
      bai_tap: [
        ['Lập hồ sơ 1 trang cho sản phẩm bạn cầm', '30 phút', 'Đủ 5 mục, nỗi đau viết bằng lời của khách'],
        ['Bóc 5 video win cùng loại, chọn 3 angle có bằng chứng', '45 phút', 'Mỗi angle có ít nhất 1 video win làm bằng chứng'],
        ['Viết 1 kịch bản tự quay + 3 câu mở + danh sách cảnh', '30 phút', 'Qua đủ 5 câu hỏi duyệt']
      ],
      checklist: ['Có hồ sơ 1 trang cho sản phẩm mình cầm', 'Bóc được một video win thành angle, hook, bằng chứng', 'Chọn được 3 angle có bằng chứng', 'Có 1 kịch bản tự quay sẵn sàng để quay']
    },
    // ================================================================ BUỔI 7
    {
      id: 'b7', so: 7, phan: 3, con_duong: 1, mo_sau: 'b6', ten: 'Quay, dựng và tối ưu', phu: 'Con đường 1 · Người tìm công thức. Một buổi quay ra nhiều video, đào kho có sẵn, và từ đơn đầu tiên đi tới nhân bản.',
      gop_y_ten: 'Buổi 7 · Quay, dựng và tối ưu',
      bai: [
        {
          id: 'b7-1', ten: 'Một buổi quay, nhiều video', phut: 2,
          tu_duy: 'Quay theo danh sách cảnh, không quay theo cảm hứng.',
          ky_nang: 'Lên một buổi quay đủ cảnh cho nhiều video; đặt tên cảnh và đưa vào kho.',
          muc_tieu: ['Gộp cảnh của nhiều kịch bản vào một buổi quay.', 'Biết 3 loại cảnh luôn phải có.', 'Đặt tên cảnh để dùng lại được.'],
          canh: [
            { loi: 'Chào bạn, chào mừng bạn đến với buổi bảy. Sản phẩm đang tìm chỗ đứng cần nhiều phép thử, nên mỗi buổi quay phải ra nhiều video, không chỉ một.',
              hinh: { loai: 'tieu-de', nhan: 'Con đường 1 · Buổi 7 · Bài 1', tieu: 'Một buổi quay, nhiều video', phu: 'Quay theo danh sách, không theo cảm hứng' } },
            { loi: 'Bí quyết là quay theo danh sách cảnh, không quay theo cảm hứng. Gộp mọi cảnh của ba kịch bản vào một danh sách, rồi quay theo từng chỗ: xong góc này mới sang góc khác.',
              hinh: { loai: 'so-sanh', tieu: 'Quay theo danh sách cảnh', nhan_truoc: 'Theo cảm hứng', truoc: 'Thiếu cảnh, phải quay lại nhiều lần', nhan_nay: 'Theo danh sách', nay: 'Đủ cảnh cho 3 video trong 1 buổi' } },
            { loi: 'Ba loại cảnh luôn phải có: cảnh dùng thật, cảnh trước và sau cùng góc cùng ánh sáng, và cảnh cận tay với sản phẩm. Đây là bằng chứng cho phần thân.',
              hinh: { loai: 'danh-sach', tieu: '3 loại cảnh luôn phải có', muc: [{ tieu: 'Dùng thật', chu: 'sản phẩm trên tay, trên da thật' }, { tieu: 'Trước – sau', chu: 'cùng góc, cùng ánh sáng' }, { tieu: 'Cận tay', chu: 'kết cấu, cách dùng' }] } },
            { loi: 'Quay dư một chút: mỗi cảnh hai, ba lần, thêm vài cảnh trám như mở hộp, kết cấu sản phẩm. Lúc dựng, bạn sẽ cần chúng.',
              hinh: { loai: 'trich', chu: 'Quay dư một chút, lúc dựng sẽ cần.', nguon: 'Cảnh trám: mở hộp, kết cấu sản phẩm' } },
            { loi: 'Quay xong, đặt tên rõ ràng và đưa vào kho: tên sản phẩm, loại cảnh, ngày quay. Kho có tên rõ thì Agent tìm được, và bạn dùng lại được cho những video sau.',
              hinh: { loai: 'chip', tieu: 'Đặt tên cảnh trước khi đưa vào kho', muc: ['Tên sản phẩm', 'Loại cảnh', 'Ngày quay'] } },
            { loi: 'Tóm lại: một danh sách cảnh, một buổi quay, nhiều video. Bài tiếp theo: kho có sẵn là mỏ. Hẹn gặp bạn ở bài hai.',
              hinh: { loai: 'trich', chu: 'Một danh sách cảnh, một buổi quay, nhiều video.', nguon: 'Bài tiếp theo · Kho có sẵn là mỏ' } }
          ],
          y_chinh: [
            'Gộp cảnh của nhiều kịch bản vào một danh sách, quay theo từng chỗ — một buổi ra nhiều video.',
            '3 loại cảnh luôn phải có: dùng thật · trước – sau cùng góc, cùng ánh sáng · cận tay.',
            'Quay dư, thêm cảnh trám; đặt tên cảnh (sản phẩm · loại cảnh · ngày) rồi đưa vào kho.'
          ],
          khoi: [
            { loai: 'buoc', tieu: 'Lên một buổi quay', muc: [
              ['Gộp danh sách cảnh', 'Cảnh của cả 3 kịch bản vào một danh sách.'],
              ['Xếp theo chỗ quay', 'Xong góc này mới sang góc khác, đỡ dựng lại đèn.'],
              ['Quay dư', 'Mỗi cảnh 2–3 lần, thêm cảnh trám.'],
              ['Đặt tên, đưa vào kho', 'Tên sản phẩm · loại cảnh · ngày quay.']
            ] },
            { loai: 'luu-y', chu: '<b>Kho có tên rõ là kho dùng lại được.</b> Cảnh đặt tên đúng thì Agent tìm được ngay cho video sau — buổi quay hôm nay thành nguyên liệu của cả tháng.' }
          ],
          hoi_nhanh: [
            { hoi: 'Cách nào giúp một buổi quay ra được nhiều video nhất?', chon: ['Quay theo cảm hứng', 'Gộp cảnh của nhiều kịch bản vào một danh sách, quay theo từng chỗ', 'Quay một cảnh thật dài', 'Chỉ quay hook'], dap: 1,
              giai: 'Danh sách cảnh giúp không thiếu cảnh và không phải quay lại.' }
          ]
        },
        {
          id: 'b7-2', ten: 'Kho có sẵn là mỏ', phut: 2,
          tu_duy: 'Không thiếu nguyên liệu — chỉ thiếu thời gian khai thác. Agent đọc hết, người chọn.',
          ky_nang: 'Tận dụng buổi live, video cũ, video của KOL / affiliate: chọn đoạn có giá trị, trám cảnh, nối kêu gọi.',
          muc_tieu: ['Kể 3 mỏ nguyên liệu có sẵn.', 'Mô tả 4 bước biến một buổi live thành video bán hàng.', 'Kể các dạng video làm được từ một buổi live.'],
          canh: [
            { loi: 'Chào bạn, mình gặp lại nhau ở bài hai của buổi bảy. Không phải video nào cũng cần quay mới. Công ty không thiếu nguyên liệu, cái thiếu là thời gian để xem hết và chọn ra phần đáng dùng. Đây là việc Agent làm rất giỏi.',
              hinh: { loai: 'tieu-de', nhan: 'Con đường 1 · Buổi 7 · Bài 2', tieu: 'Kho có sẵn là mỏ', phu: 'Agent đọc hết, người chọn' } },
            { loi: 'Có ba mỏ nguyên liệu. Một là các buổi live dài hàng giờ, chứa lời chốt đơn thật của người bán. Hai là video cũ, video của KOL, KOC và affiliate. Ba là giọng đọc của những video đã win.',
              hinh: { loai: 'danh-sach', tieu: '3 mỏ nguyên liệu', muc: [{ tieu: 'Buổi live', chu: 'hàng giờ lời chốt đơn thật' }, { tieu: 'Video cũ, KOL, KOC, affiliate', chu: 'cảnh thật đã có sẵn' }, { tieu: 'Giọng video win', chu: 'giọng người thật đã được kiểm chứng' }] } },
            { loi: 'Biến một buổi live thành video bán hàng theo bốn bước. Chọn đoạn có giá trị: lời chốt, cảnh dùng sản phẩm, câu trả lời cho khách. Bỏ đoạn lặp và đoạn chờ. Trám thêm cảnh sản phẩm để video liền mạch và gắn được giỏ. Cuối cùng là kêu gọi, nối thật mượt.',
              hinh: { loai: 'buoc', muc: ['Chọn đoạn có giá trị', 'Bỏ đoạn lặp, đoạn chờ', 'Trám cảnh sản phẩm', 'Kêu gọi nối mượt'] } },
            { loi: 'Từ một buổi live có thể ra nhiều dạng video: đoạn nổi bật, trả lời bình luận, tình huống ngắn, khoe ưu đãi, mở hộp, hay chuyên gia nói ngắn.',
              hinh: { loai: 'chip', tieu: 'Nhiều dạng video từ một buổi live', muc: ['Đoạn nổi bật', 'Trả lời bình luận', 'Tình huống ngắn', 'Khoe ưu đãi', 'Mở hộp', 'Chuyên gia nói ngắn'] } },
            { loi: 'Agent đọc hết, người chọn. Bạn duyệt những đoạn Agent đề xuất bằng năm câu hỏi, rồi mới dựng.',
              hinh: { loai: 'trich', chu: 'Agent đọc hết, người chọn.', nguon: 'Duyệt bằng 5 câu hỏi trước khi dựng' } },
            { loi: 'Tóm lại: trước khi quay mới, hãy đào kho. Bài tiếp theo: từ đơn đầu tiên tới nhân bản. Hẹn gặp bạn ở bài ba.',
              hinh: { loai: 'trich', chu: 'Trước khi quay mới, hãy đào kho.', nguon: 'Bài tiếp theo · Từ đơn đầu tiên tới nhân bản' } }
          ],
          y_chinh: [
            '3 mỏ nguyên liệu: buổi live · video cũ, KOL, KOC, affiliate · giọng của video đã win.',
            'Live → video: chọn đoạn giá trị → bỏ đoạn lặp, chờ → trám cảnh sản phẩm → kêu gọi nối mượt.',
            'Agent đọc hết, người chọn — duyệt bằng 5 câu hỏi trước khi dựng.'
          ],
          khoi: [
            { loai: 'buoc', tieu: 'Một buổi live → video bán hàng', muc: [
              ['Chọn đoạn có giá trị', 'Lời chốt đơn, cảnh dùng sản phẩm, câu trả lời cho khách.'],
              ['Bỏ đoạn lặp, đoạn chờ', 'Đoạn chào khách, chờ người vào, nhắc lại giá nhiều lần.'],
              ['Trám cảnh sản phẩm', 'Để video liền mạch và gắn được giỏ hàng.'],
              ['Kêu gọi nối mượt', 'Chuyển cảnh, âm thanh nhỏ dần — không cắt cụt.']
            ] },
            { loai: 'the', tieu: 'Mẹo khi dựng từ kho', muc: [
              { tieu: 'Không dập khuôn', chu: 'Mỗi buổi live một kiểu — chọn dạng video hợp với đoạn đang có.' },
              { tieu: 'Kêu gọi có chuyển cảnh', chu: 'Đoạn chuyển sang kêu gọi luôn cần chuyển cảnh hoặc âm thanh mượt, tránh đứt mạch cảm xúc.' },
              { tieu: 'Xin phép khi cần', chu: 'Video của KOL, KOC, affiliate chỉ dùng lại khi đã được phép.' }
            ] }
          ],
          hoi_nhanh: [
            { hoi: 'Vì sao phải trám thêm cảnh sản phẩm vào video cắt từ live?', chon: ['Để video dài hơn', 'Để video liền mạch và gắn được giỏ hàng', 'Để che mặt người bán', 'Để đổi giọng'], dap: 1,
              giai: 'Cảnh trám giúp video liền mạch và có cảnh sản phẩm rõ ràng — điều kiện để gắn giỏ.' }
          ]
        },
        {
          id: 'b7-3', ten: 'Từ đơn đầu tiên tới nhân bản', phut: 2,
          tu_duy: 'Có đơn rồi thì tìm vì sao, rồi nhân lên.',
          ky_nang: 'Đọc vì sao một video ra đơn, nhân hook và angle, chuyển sản phẩm sang mở rộng.',
          muc_tieu: ['Phân tích vì sao một video ra đơn.', 'Phân biệt may mắn với công thức.', 'Biết khi nào sản phẩm chuyển sang con đường mở rộng.'],
          canh: [
            { loi: 'Chào bạn, đây là bài cuối của con đường thứ nhất. Khi video đầu tiên ra đơn, đó là lúc vui nhất. Nhưng việc quan trọng nhất mới bắt đầu: tìm ra vì sao nó bán được.',
              hinh: { loai: 'tieu-de', nhan: 'Con đường 1 · Buổi 7 · Bài 3', tieu: 'Từ đơn đầu tiên tới nhân bản', phu: 'Có đơn rồi thì tìm vì sao' } },
            { loi: 'Đọc lại video đó theo từng phần. Hook giữ người xem bao lâu? Thân dùng bằng chứng gì? Kêu gọi ra sao? Và quan trọng nhất: video đang nói angle nào.',
              hinh: { loai: 'danh-sach', so: true, tieu: 'Vì sao video này ra đơn?', muc: [{ tieu: 'Hook', chu: 'giữ người xem bao lâu' }, { tieu: 'Thân', chu: 'dùng bằng chứng gì' }, { tieu: 'Kêu gọi', chu: 'rõ một hành động chưa' }, { tieu: 'Angle', chu: 'nỗi đau nào, cho ai' }] } },
            { loi: 'Một video ra đơn có thể là may. Hai, ba video cùng angle cùng ra đơn, đó là công thức. Đừng vội kết luận từ một video.',
              hinh: { loai: 'so-sanh', tieu: 'May mắn hay công thức?', nhan_truoc: 'Một video ra đơn', truoc: 'Có thể là may', nhan_nay: 'Nhiều video cùng angle ra đơn', nay: 'Là công thức' } },
            { loi: 'Có công thức rồi thì nhân lên: giữ angle và thân, thử thêm hook mới, giọng mới, kêu gọi mới. Đọc số sau mỗi lô, như bạn đã học ở buổi ba.',
              hinh: { loai: 'nhan' } },
            { loi: 'Khi đơn đã đều, sản phẩm không còn đang tìm chỗ đứng nữa. Nó chuyển sang con đường thứ hai: mở rộng. Và bạn, người tìm ra công thức, là người hiểu sản phẩm nhất để dẫn đường.',
              hinh: { loai: 'trich', chu: 'Tìm ra công thức là bước đầu để mở rộng.', nguon: 'Từ con đường 1 sang con đường 2' } },
            { loi: 'Bạn đã đi hết con đường thứ nhất. Hãy học tiếp con đường thứ hai, vì sớm hay muộn, sản phẩm của bạn cũng sẽ cần mở rộng. Chúc bạn tìm ra thật nhiều công thức win.',
              hinh: { loai: 'ket', tieu: 'Con đường 1 · hoàn thành', muc: ['Hiểu sản phẩm', 'Chọn angle có bằng chứng', 'Một buổi quay, nhiều video', 'Từ đơn đầu tiên tới nhân bản'] } }
          ],
          y_chinh: [
            'Video ra đơn → đọc lại hook, thân, kêu gọi và angle để tìm vì sao.',
            'Một video ra đơn có thể là may; nhiều video cùng angle ra đơn mới là công thức.',
            'Có công thức thì nhân lên; đơn đã đều thì sản phẩm chuyển sang con đường mở rộng.'
          ],
          khoi: [
            { loai: 'bang', tieu: 'Phiếu phân tích một video ra đơn', dau: ['Phần', 'Câu hỏi', 'Bạn ghi'], dong: [
              ['Hook', 'Giữ người xem qua 3 giây được bao nhiêu?', '…'],
              ['Thân', 'Bằng chứng nào làm người xem tin?', '…'],
              ['Kêu gọi', 'Một hành động rõ chưa? Bấm giỏ bao nhiêu?', '…'],
              ['Angle', 'Nỗi đau nào, cho ai?', '…'],
              ['Kết luận', 'May hay công thức? Đã có video thứ 2 cùng angle ra đơn chưa?', '…']
            ] },
            { loai: 'luu-y', chu: '<b>Đừng vội kết luận từ một video.</b> Làm thêm 2–3 video cùng angle. Nếu cùng ra đơn, đó là công thức — lúc đó mới nhân mạnh tay.' }
          ],
          hoi_nhanh: [
            { hoi: 'Video đầu tiên của sản phẩm mới vừa ra đơn. Việc nên làm tiếp?', chon: ['Nhân ngay 50 bản giống hệt', 'Phân tích vì sao ra đơn, làm thêm 2–3 video cùng angle để kiểm chứng', 'Đổi sang angle khác', 'Dừng làm video'], dap: 1,
              giai: 'Một video ra đơn có thể là may. Kiểm chứng bằng vài video cùng angle trước khi nhân mạnh tay.' }
          ]
        }
      ],
      kiem_tra: [
        { hoi: 'Quay theo danh sách cảnh có lợi gì?', chon: ['Video đẹp hơn', 'Đủ cảnh cho nhiều video trong một buổi, không phải quay lại', 'Không cần kịch bản', 'Đỡ phải duyệt'], dap: 1 },
        { hoi: 'Ba loại cảnh luôn phải có là gì?', chon: ['Logo, nhạc, chữ', 'Dùng thật · trước – sau cùng góc, cùng ánh sáng · cận tay', 'Phong cảnh, đường phố, quán cà phê', 'Mở hộp, giá, khuyến mãi'], dap: 1 },
        { hoi: 'Ba mỏ nguyên liệu có sẵn là gì?', chon: ['Ảnh mạng, nhạc mạng, chữ mạng', 'Buổi live · video cũ, KOL, KOC, affiliate · giọng của video đã win', 'Video đối thủ tải về', 'Chỉ có video quay mới'], dap: 1 },
        { hoi: 'Bước đầu tiên khi biến một buổi live thành video bán hàng?', chon: ['Thêm nhạc nền', 'Chọn đoạn có giá trị: lời chốt, cảnh dùng sản phẩm, câu trả lời cho khách', 'Cắt đều mỗi 30 giây', 'Đổi giọng người bán'], dap: 1 },
        { hoi: 'Khi nào một video ra đơn được coi là công thức?', chon: ['Ngay khi có đơn đầu tiên', 'Khi nhiều video cùng angle cùng ra đơn', 'Khi có nhiều lượt thích', 'Khi người dựng thấy ưng'], dap: 1 },
        { hoi: 'Khi đơn đã đều, sản phẩm chuyển sang đâu?', chon: ['Dừng làm video', 'Con đường mở rộng: nhiều người nói, nhiều nền tảng, angle mới', 'Quay lại tìm công thức từ đầu', 'Giữ nguyên, không làm gì thêm'], dap: 1 }
      ],
      tu_luan: [
        'Lên danh sách cảnh cho một buổi quay ra 3 video của sản phẩm bạn cầm. Cảnh nào dùng chung, cảnh nào riêng?',
        'Chọn một video đã ra đơn (của bạn hoặc trong kho). Vì sao nó bán được? Đó là may hay công thức?'
      ],
      bai_tap: [
        ['Lên danh sách cảnh cho 1 buổi quay ra 3 video', '30 phút', 'Đủ 3 loại cảnh: dùng thật, trước – sau, cận tay'],
        ['Dựng 1 video từ tài nguyên có sẵn (live, video cũ)', 'trong ngày', 'Qua 5 câu hỏi duyệt, kêu gọi nối mượt'],
        ['Phân tích 1 video có đơn + làm 3 bản nhân', 'trong ngày', 'Có phiếu phân tích đủ 5 dòng']
      ],
      checklist: ['Lên được danh sách cảnh cho một buổi quay nhiều video', 'Dựng được video từ kho có sẵn', 'Phân biệt được may mắn và công thức', 'Biết khi nào sản phẩm chuyển sang mở rộng']
    },
    // ================================================================ BUỔI 8
    {
      id: 'b8', so: 8, phan: 3, con_duong: 2, mo_sau: 'b5', ten: 'Hiểu vì sao đang bán tốt', phu: 'Con đường 2 · Người mở rộng. Bán tốt không phải may: tìm ra vì sao, thử angle mới có hệ thống, và đưa video win sang nhiều nền tảng.',
      gop_y_ten: 'Buổi 8 · Hiểu vì sao đang bán tốt',
      bai: [
        {
          id: 'b8-1', ten: 'Bóc tách video win', phut: 2,
          tu_duy: 'Bán tốt không phải may: tìm ra vì sao.',
          ky_nang: 'Bóc angle, hook, bằng chứng, người nói của video win; so doanh thu trên mỗi 1.000 lượt xem.',
          muc_tieu: ['Bóc một video win thành 4 thứ.', 'Đọc doanh thu trên mỗi 1.000 lượt xem.', 'Ghi công thức đang chạy thành vài dòng.'],
          canh: [
            { loi: 'Chào bạn, chào mừng bạn đến với con đường thứ hai: người mở rộng. Sản phẩm bạn cầm đang bán tốt. Nhưng bán tốt không phải may. Muốn mở rộng đúng, trước hết phải biết vì sao nó đang bán được.',
              hinh: { loai: 'tieu-de', nhan: 'Con đường 2 · Buổi 8 · Bài 1', tieu: 'Bóc tách video win', phu: 'Bán tốt không phải may' } },
            { loi: 'Lấy những video đang ra đơn nhiều nhất của sản phẩm, bóc ra bốn thứ: angle, hook, bằng chứng, và người nói. Người nói là chủ kênh, KOC hay giọng đọc, vì cùng một kịch bản, người nói khác thì kết quả khác.',
              hinh: { loai: 'danh-sach', so: true, tieu: 'Bóc video win thành 4 thứ', muc: [{ tieu: 'Angle', chu: 'nỗi đau nào, cho ai' }, { tieu: 'Hook', chu: '3 giây đầu làm gì' }, { tieu: 'Bằng chứng', chu: 'thân dùng gì để người xem tin' }, { tieu: 'Người nói', chu: 'chủ kênh, KOC hay giọng đọc' }] } },
            { loi: 'Đừng chỉ nhìn lượt xem. Hãy so doanh thu trên mỗi một nghìn lượt xem. Video ít lượt xem nhưng doanh thu trên một nghìn lượt xem cao, có thể là angle chạm đúng khách mua thật.',
              hinh: { loai: 'so-sanh', tieu: 'Đừng chỉ nhìn lượt xem', nhan_truoc: 'Chỉ nhìn lượt xem', truoc: 'Video nhiều xem nhất chưa chắc bán nhiều nhất', nhan_nay: 'Doanh thu / 1.000 lượt xem', nay: 'Thấy angle chạm đúng khách mua thật' } },
            { loi: 'Đặt các video win cạnh nhau, tìm điểm chung. Có thể là cùng một nỗi đau, cùng một kiểu bằng chứng, hay cùng một kiểu người nói. Điểm chung đó là công thức đang chạy.',
              hinh: { loai: 'trich', chu: 'Điểm chung của các video win là công thức đang chạy.', nguon: 'Bóc tách video win' } },
            { loi: 'Ghi công thức đó ra thành vài dòng, để mọi KOL, KOC và người dựng đều đọc được. Đây là nền để bạn mở rộng và thử angle mới, mà không làm hỏng cái đang chạy.',
              hinh: { loai: 'danh-sach', tieu: 'Ghi công thức thành vài dòng', muc: [{ tieu: 'Angle đang chạy', chu: 'nỗi đau nào, cho ai' }, { tieu: 'Hook hay dùng', chu: 'kiểu mở đang giữ người xem' }, { tieu: 'Bằng chứng mạnh nhất', chu: 'cảnh làm người xem tin' }, { tieu: 'Người nói hợp', chu: 'kiểu người nói đang bán tốt' }] } },
            { loi: 'Tóm lại: bán tốt không phải may, hãy tìm ra vì sao. Bài tiếp theo: thử angle mới có hệ thống. Hẹn gặp bạn ở bài hai.',
              hinh: { loai: 'trich', chu: 'Bán tốt không phải may: tìm ra vì sao.', nguon: 'Bài tiếp theo · Thử angle mới có hệ thống' } }
          ],
          y_chinh: [
            'Bóc video win thành 4 thứ: angle · hook · bằng chứng · người nói.',
            'Đừng chỉ nhìn lượt xem — so doanh thu trên mỗi 1.000 lượt xem để thấy angle chạm đúng khách mua.',
            'Điểm chung của các video win là công thức đang chạy — ghi thành vài dòng cho mọi người cùng đọc.'
          ],
          khoi: [
            { loai: 'bang', tieu: 'Phiếu bóc video win (người mở rộng)', dau: ['Video', 'Angle', 'Hook', 'Bằng chứng', 'Người nói', 'Doanh thu / 1.000 lượt xem'], dong: [
              ['Video 1', '…', '…', '…', '…', '…'],
              ['Video 2', '…', '…', '…', '…', '…'],
              ['Video 3', '…', '…', '…', '…', '…'],
              ['Điểm chung', '…', '…', '…', '…', '—']
            ] },
            { loai: 'bang', tieu: 'Thuật ngữ trong bài', dau: ['Từ', 'Nghĩa'], dong: [
              ['Doanh thu / 1.000 lượt xem', 'Lấy doanh thu của video chia cho số lượt xem rồi nhân 1.000. Cho biết mỗi lượt xem mang lại bao nhiêu tiền — so được video lớn với video nhỏ.'],
              ['Người nói', 'Người xuất hiện hoặc lồng tiếng trong video: chủ kênh, KOC, giọng đọc.']
            ] },
            { loai: 'luu-y', chu: '<b>Công thức đang chạy là tài sản.</b> Ghi thành vài dòng, gửi cho mọi người làm video của sản phẩm. Ai cũng biết cái gì đang win thì không ai vô tình làm hỏng nó.' }
          ],
          hoi_nhanh: [
            { hoi: 'Video A có 500.000 lượt xem, video B có 50.000 lượt xem nhưng doanh thu trên 1.000 lượt xem cao gấp 3. Bạn rút ra gì?', chon: ['Video A tốt hơn vì nhiều lượt xem', 'Angle của video B có thể chạm đúng khách mua hơn — đáng bóc kỹ', 'Bỏ video B', 'Không so được'], dap: 1,
              giai: 'Lượt xem cao chưa chắc bán nhiều. Doanh thu trên 1.000 lượt xem cao cho thấy angle chạm đúng người mua thật.' }
          ]
        },
        {
          id: 'b8-2', ten: 'Thử angle mới có hệ thống', phut: 2,
          tu_duy: 'Đứng yên là tụt lại — nhưng thử phải có căn cứ.',
          ky_nang: 'Giữ cái đang chạy, mỗi lần thử một thay đổi, ghi bảng người nói × angle.',
          muc_tieu: ['Biết 2 nguyên tắc thử angle mới.', 'Biết lấy angle mới từ đâu.', 'Lập bảng người nói × angle.'],
          canh: [
            { loi: 'Chào bạn, mình gặp lại nhau ở bài hai. Đối thủ không đứng yên, người xem cũng nhanh chán. Nên người mở rộng phải liên tục thử angle mới. Nhưng thử phải có căn cứ, không thử bừa.',
              hinh: { loai: 'tieu-de', nhan: 'Con đường 2 · Buổi 8 · Bài 2', tieu: 'Thử angle mới có hệ thống', phu: 'Đứng yên là tụt lại, nhưng thử phải có căn cứ' } },
            { loi: 'Nguyên tắc đầu tiên: giữ cái đang chạy. Phần lớn video vẫn đi theo công thức đang ra đơn, chỉ một phần nhỏ dành để thử angle mới.',
              hinh: { loai: 'so-sanh', tieu: 'Giữ cái đang chạy', nhan_truoc: 'Thử bừa', truoc: 'Bỏ công thức cũ, đơn tụt', nhan_nay: 'Có hệ thống', nay: 'Phần lớn theo công thức, phần nhỏ để thử' } },
            { loi: 'Nguyên tắc thứ hai: mỗi lần chỉ thay một thứ. Đổi angle thì giữ người nói. Đổi người nói thì giữ angle. Như vậy khi số thay đổi, bạn biết chắc vì đâu.',
              hinh: { loai: 'trich', chu: 'Mỗi lần chỉ thay một thứ.', nguon: 'Để biết chắc số thay đổi vì đâu' } },
            { loi: 'Angle mới lấy từ đâu? Từ bình luận và câu hỏi của khách, từ video win của đối thủ, và từ những nỗi đau mà sản phẩm giải quyết nhưng chưa ai nói tới.',
              hinh: { loai: 'danh-sach', tieu: 'Angle mới lấy từ đâu', muc: [{ tieu: 'Bình luận, câu hỏi', chu: 'lời thật của khách' }, { tieu: 'Video win của đối thủ', chu: 'học angle, không chép' }, { tieu: 'Nỗi đau chưa ai nói', chu: 'sản phẩm giải được nhưng chưa ai kể' }] } },
            { loi: 'Ghi mọi phép thử vào một bảng: người nói nào, angle nào, kết quả ra sao. Sau vài tuần, bảng này cho bạn thấy cặp người nói và angle nào đang win.',
              hinh: { loai: 'danh-sach', tieu: 'Bảng người nói × angle', muc: [{ tieu: 'Cột', chu: 'các angle đang thử' }, { tieu: 'Hàng', chu: 'người nói: chủ kênh, KOC, giọng đọc' }, { tieu: 'Ô', chu: 'đơn hàng, doanh thu của từng cặp' }] } },
            { loi: 'Tóm lại: giữ cái đang chạy, mỗi lần thay một thứ, ghi lại mọi phép thử. Bài tiếp theo: một video, nhiều nền tảng. Hẹn gặp bạn ở bài ba.',
              hinh: { loai: 'trich', chu: 'Giữ cái đang chạy, mỗi lần thay một thứ.', nguon: 'Bài tiếp theo · Một video, nhiều nền tảng' } }
          ],
          y_chinh: [
            'Giữ cái đang chạy: phần lớn video theo công thức đang ra đơn, phần nhỏ để thử angle mới.',
            'Mỗi lần chỉ thay một thứ — đổi angle thì giữ người nói, đổi người nói thì giữ angle.',
            'Angle mới lấy từ bình luận, video win của đối thủ, nỗi đau chưa ai nói; ghi mọi phép thử vào bảng người nói × angle.'
          ],
          khoi: [
            { loai: 'bang', tieu: 'Bảng người nói × angle (ví dụ)', dau: ['Người nói', 'Angle A (đang chạy)', 'Angle B (thử)', 'Angle C (thử)'], dong: [
              ['Chủ kênh 1', 'đơn …', 'đơn …', '—'],
              ['KOC 2', 'đơn …', '—', 'đơn …'],
              ['Giọng đọc', 'đơn …', 'đơn …', '—']
            ] },
            { loai: 'luu-y', chu: '<b>Mỗi lần chỉ thay một thứ.</b> Đổi cả angle lẫn người nói cùng lúc thì số tăng hay giảm, bạn cũng không biết vì đâu — phép thử mất giá trị.' },
            { loai: 'the', tieu: 'Kế hoạch thử 2 tuần', muc: [
              { tieu: 'Tuần 1', chu: 'Giữ công thức cho phần lớn video, thử angle B với 1 người nói đang win.' },
              { tieu: 'Tuần 2', chu: 'Đọc số. Angle B ra đơn thì thử với người nói thứ 2; không ra thì thử angle C.' },
              { tieu: 'Cuối mỗi tuần', chu: 'Cập nhật bảng người nói × angle, ghi một bài học.' }
            ] }
          ],
          hoi_nhanh: [
            { hoi: 'Bạn muốn thử angle mới cho sản phẩm đang bán tốt. Cách nào đúng?', chon: ['Đổi hết video sang angle mới', 'Giữ phần lớn theo công thức cũ, thử angle mới với một người nói đang win', 'Đổi cả angle lẫn người nói cùng lúc', 'Không thử, giữ nguyên'], dap: 1,
              giai: 'Giữ cái đang chạy và mỗi lần chỉ thay một thứ — vừa an toàn, vừa biết chắc kết quả vì đâu.' }
          ]
        },
        {
          id: 'b8-3', ten: 'Một video, nhiều nền tảng', phut: 2,
          tu_duy: 'Mỗi nền tảng một cách làm.',
          ky_nang: 'Chuyển video win sang Reels, Shorts, Facebook → Shopee, trang bán hàng riêng.',
          muc_tieu: ['Kể 4 nơi đưa video win đi tiếp.', 'Biết giữ gì, đổi gì khi chuyển nền tảng.', 'Viết kêu gọi đúng cho từng nền tảng.'],
          canh: [
            { loi: 'Chào bạn, đây là bài cuối của buổi tám. Một video win trên TikTok là tài sản. Đưa nó sang nền tảng khác là cách mở rộng nhanh nhất, vì angle đã được chứng minh.',
              hinh: { loai: 'tieu-de', nhan: 'Con đường 2 · Buổi 8 · Bài 3', tieu: 'Một video, nhiều nền tảng', phu: 'Mỗi nền tảng một cách làm' } },
            { loi: 'Bốn nơi hay đi tiếp: Facebook Reels, YouTube Shorts, quảng cáo Facebook kéo khách về Shopee, và trang bán hàng riêng của thương hiệu.',
              hinh: { loai: 'chip', tieu: 'Video win đi tiếp', muc: ['Facebook Reels', 'YouTube Shorts', 'Facebook → Shopee', 'Trang bán hàng riêng'] } },
            { loi: 'Nhưng mỗi nền tảng một cách làm. Người xem mỗi nơi khác nhau, cách bấm mua khác nhau, nên hook và kêu gọi phải đổi theo. Giữ angle và thân, đổi phần đầu và phần cuối.',
              hinh: { loai: 'so-sanh', tieu: 'Giữ gì, đổi gì', nhan_truoc: 'Đăng y nguyên', truoc: 'Kêu gọi “bấm giỏ” mà không có giỏ để bấm', nhan_nay: 'Chuyển đúng cách', nay: 'Giữ angle và thân, đổi hook và kêu gọi' } },
            { loi: 'Ví dụ, trên TikTok kêu gọi là bấm giỏ hàng. Sang quảng cáo Facebook kéo về Shopee, kêu gọi là bấm vào đường link để mua trên Shopee. Sang trang bán hàng riêng, kêu gọi là để lại thông tin để được tư vấn.',
              hinh: { loai: 'danh-sach', tieu: 'Kêu gọi đổi theo nền tảng', muc: [{ tieu: 'TikTok', chu: 'bấm giỏ hàng' }, { tieu: 'Facebook → Shopee', chu: 'bấm link mua trên Shopee' }, { tieu: 'Trang bán hàng riêng', chu: 'để lại thông tin để được tư vấn' }] } },
            { loi: 'Đây chính là thích ứng nhanh. Ai làm chủ được nhiều nền tảng sớm, người đó đi trước đối thủ.',
              hinh: { loai: 'trich', chu: 'Ai làm chủ nhiều nền tảng sớm, người đó đi trước.', nguon: 'Hành động nhanh, thích ứng nhanh' } },
            { loi: 'Tóm lại: một video win, nhiều nền tảng, mỗi nơi một cách làm. Buổi tiếp theo: làm việc với KOL, KOC và affiliate. Hẹn gặp bạn ở buổi chín.',
              hinh: { loai: 'trich', chu: 'Một video win, nhiều nền tảng.', nguon: 'Buổi tiếp theo · Làm việc với KOL, KOC, affiliate' } }
          ],
          y_chinh: [
            'Video win đi tiếp 4 nơi: Facebook Reels · YouTube Shorts · Facebook → Shopee · trang bán hàng riêng.',
            'Giữ angle và thân; đổi hook và kêu gọi theo người xem và cách mua của từng nền tảng.',
            'Làm chủ nhiều nền tảng sớm là thích ứng nhanh — đi trước đối thủ.'
          ],
          khoi: [
            { loai: 'bang', tieu: 'Chuyển một video win sang nền tảng khác', dau: ['Nền tảng', 'Giữ', 'Đổi', 'Kêu gọi'], dong: [
              ['TikTok (gốc)', 'Angle, thân', '—', 'Bấm giỏ hàng'],
              ['Facebook Reels', 'Angle, thân', 'Hook hợp người xem Facebook', 'Bấm link mua hoặc nhắn tin'],
              ['YouTube Shorts', 'Angle, thân', 'Hook, chữ trên hình', 'Bấm link trong mô tả'],
              ['Facebook → Shopee', 'Angle, thân', 'Hook quảng cáo', 'Bấm link mua trên Shopee'],
              ['Trang bán hàng riêng', 'Angle, thân', 'Hook, độ dài', 'Để lại thông tin để được tư vấn']
            ] },
            { loai: 'luu-y', chu: '<b>Đăng y nguyên là lỗi hay gặp nhất.</b> Kêu gọi “bấm giỏ hàng” trên nền tảng không có giỏ làm người xem bối rối. Luôn đổi kêu gọi theo cách mua của nơi đó.' }
          ],
          hoi_nhanh: [
            { hoi: 'Bạn đưa một video win từ TikTok sang quảng cáo Facebook kéo về Shopee. Phần nào phải đổi?', chon: ['Không đổi gì', 'Hook và kêu gọi — giữ angle và thân', 'Đổi angle', 'Đổi sản phẩm'], dap: 1,
              giai: 'Angle và thân đã được chứng minh. Hook và kêu gọi phải hợp người xem và cách mua của nền tảng mới.' }
          ]
        }
      ],
      kiem_tra: [
        { hoi: 'Bóc một video win (người mở rộng) thành mấy thứ?', chon: ['2: hình và tiếng', '4: angle · hook · bằng chứng · người nói', '1: lượt xem', '3: nhạc, chữ, màu'], dap: 1 },
        { hoi: 'Vì sao nên so doanh thu trên mỗi 1.000 lượt xem?', chon: ['Vì dễ tính', 'Để so được video lớn với video nhỏ, thấy angle chạm đúng khách mua', 'Vì nền tảng yêu cầu', 'Để biết video dài bao nhiêu'], dap: 1 },
        { hoi: 'Nguyên tắc đầu tiên khi thử angle mới cho sản phẩm đang bán tốt?', chon: ['Bỏ công thức cũ', 'Giữ cái đang chạy, chỉ dành phần nhỏ để thử', 'Thử mọi thứ cùng lúc', 'Không thử'], dap: 1 },
        { hoi: 'Vì sao mỗi lần chỉ thay một thứ?', chon: ['Cho đỡ mệt', 'Để biết chắc số thay đổi vì đâu', 'Vì luật quảng cáo', 'Để video ngắn hơn'], dap: 1 },
        { hoi: 'Bảng người nói × angle cho bạn biết gì?', chon: ['Ai làm nhiều video nhất', 'Cặp người nói và angle nào đang win', 'Giá của từng KOL', 'Lịch đăng bài'], dap: 1 },
        { hoi: 'Khi chuyển video win sang nền tảng khác, giữ gì và đổi gì?', chon: ['Giữ tất cả', 'Giữ angle và thân; đổi hook và kêu gọi', 'Đổi tất cả', 'Giữ kêu gọi, đổi angle'], dap: 1 }
      ],
      tu_luan: [
        'Bóc 3 video win của sản phẩm bạn cầm. Điểm chung của chúng là gì? Viết công thức đang chạy thành 4 dòng.',
        'Lập kế hoạch thử 3 angle mới trong 2 tuần: thử angle nào, với người nói nào, giữ gì?'
      ],
      bai_tap: [
        ['Bóc 3 video win của sản phẩm mình', '45 phút', 'Đủ 4 thứ + doanh thu trên 1.000 lượt xem; có dòng điểm chung'],
        ['Lập kế hoạch thử 3 angle trong 2 tuần', '30 phút', 'Mỗi lần chỉ thay một thứ; có bảng người nói × angle'],
        ['Chuyển 1 video win thành 2 bản cho 2 nền tảng', 'trong ngày', 'Kêu gọi đúng cách mua của từng nền tảng']
      ],
      checklist: ['Bóc được video win thành 4 thứ', 'Đọc được doanh thu trên 1.000 lượt xem', 'Có bảng người nói × angle', 'Chuyển được video win sang nền tảng khác đúng cách']
    },
    // ================================================================ BUỔI 9
    {
      id: 'b9', so: 9, phan: 3, con_duong: 2, mo_sau: 'b8', ten: 'Làm việc với KOL, KOC, affiliate', phu: 'Con đường 2 · Người mở rộng. Chọn đúng người cho đúng angle, viết brief theo giọng kênh, duyệt video gửi về và nhân cặp win.',
      gop_y_ten: 'Buổi 9 · Làm việc với KOL, KOC, affiliate',
      bai: [
        {
          id: 'b9-1', ten: 'Chọn người hợp angle', phut: 2,
          tu_duy: 'Đúng người nói đúng angle mới ra đơn.',
          ky_nang: 'Đọc kênh theo khán giả, kiểu nói, video bán hàng trước đây; ghép kênh với angle.',
          muc_tieu: ['Đọc một kênh theo 3 điều.', 'Ghép kiểu người nói với angle.', 'Không chọn chỉ vì số người theo dõi.'],
          canh: [
            { loi: 'Chào bạn, chào mừng bạn đến với buổi chín. Người mở rộng đưa sản phẩm tới nhiều người hơn qua KOL, KOC và affiliate. Nhưng đúng người nói đúng angle mới ra đơn, nên bài đầu là chọn người.',
              hinh: { loai: 'tieu-de', nhan: 'Con đường 2 · Buổi 9 · Bài 1', tieu: 'Chọn người hợp angle', phu: 'Đúng người nói đúng angle mới ra đơn' } },
            { loi: 'Trước khi chọn, đọc kênh của họ theo ba điều. Khán giả là ai, có giống khách của mình không. Họ nói kiểu gì: hài hước, chuyên gia, hay chia sẻ đời thường. Và những video bán hàng trước đây của họ ra sao.',
              hinh: { loai: 'danh-sach', so: true, tieu: 'Đọc một kênh theo 3 điều', muc: [{ tieu: 'Khán giả', chu: 'có giống khách của mình không' }, { tieu: 'Kiểu nói', chu: 'hài hước, chuyên gia, đời thường' }, { tieu: 'Video bán hàng trước đây', chu: 'có ra đơn không' }] } },
            { loi: 'Rồi ghép với angle. Angle nỗi đau hợp với người chia sẻ trải nghiệm thật. Angle chuyên sâu về thành phần hợp với người có kiến thức. Angle giá tốt hợp với kênh hay săn ưu đãi.',
              hinh: { loai: 'danh-sach', tieu: 'Ghép kiểu người nói với angle', muc: [{ tieu: 'Angle nỗi đau', chu: '→ người chia sẻ trải nghiệm thật' }, { tieu: 'Angle thành phần', chu: '→ người có kiến thức' }, { tieu: 'Angle giá tốt', chu: '→ kênh hay săn ưu đãi' }] } },
            { loi: 'Đừng chọn chỉ vì kênh nhiều người theo dõi. Một kênh nhỏ có khán giả đúng khách có thể bán tốt hơn một kênh lớn mà khán giả không phải người mua.',
              hinh: { loai: 'so-sanh', tieu: 'Chọn theo gì?', nhan_truoc: 'Theo số người theo dõi', truoc: 'Kênh lớn, khán giả chưa chắc là người mua', nhan_nay: 'Theo khán giả và kiểu nói', nay: 'Khán giả đúng khách, kiểu nói hợp angle' } },
            { loi: 'Chấm mỗi kênh trên ba điều đó, rồi chọn người có điểm cao nhất cho từng angle.',
              hinh: { loai: 'trich', chu: 'Đúng người nói đúng angle mới ra đơn.', nguon: 'Chấm kênh theo khán giả · kiểu nói · video bán hàng' } },
            { loi: 'Tóm lại: đọc kênh, ghép với angle, chọn theo khán giả chứ không theo số người theo dõi. Bài tiếp theo: viết brief theo giọng kênh. Hẹn gặp bạn ở bài hai.',
              hinh: { loai: 'trich', chu: 'Chọn theo khán giả, không theo số người theo dõi.', nguon: 'Bài tiếp theo · Viết brief theo giọng kênh' } }
          ],
          y_chinh: [
            'Đọc kênh theo 3 điều: khán giả · kiểu nói · video bán hàng trước đây.',
            'Ghép kiểu người nói với angle: nỗi đau → trải nghiệm thật; thành phần → người có kiến thức; giá tốt → kênh săn ưu đãi.',
            'Chọn theo khán giả đúng khách, không chỉ theo số người theo dõi.'
          ],
          khoi: [
            { loai: 'bang', tieu: 'Phiếu chấm kênh cho một angle', dau: ['Kênh', 'Khán giả giống khách (1–5)', 'Kiểu nói hợp angle (1–5)', 'Video bán hàng trước đây (1–5)', 'Tổng'], dong: [
              ['Kênh 1', '…', '…', '…', '…'],
              ['Kênh 2', '…', '…', '…', '…'],
              ['Kênh 3', '…', '…', '…', '…']
            ] },
            { loai: 'luu-y', chu: '<b>Kênh nhỏ đúng khách thường đáng thử.</b> Số người theo dõi cho biết bao nhiêu người thấy, không cho biết bao nhiêu người mua. Xem khán giả và video bán hàng trước đây của kênh.' }
          ],
          hoi_nhanh: [
            { hoi: 'Bạn có angle “thành phần lành tính cho da nhạy cảm”. Nên chọn ai?', chon: ['Kênh hài nhiều người theo dõi nhất', 'Người có kiến thức về da, khán giả là người da nhạy cảm', 'Kênh săn ưu đãi', 'Bất kỳ ai rẻ nhất'], dap: 1,
              giai: 'Angle chuyên sâu về thành phần cần người nói có kiến thức và khán giả đúng khách.' }
          ]
        },
        {
          id: 'b9-2', ten: 'Viết brief theo giọng kênh', phut: 2,
          tu_duy: 'Brief rõ việc, nhưng giọng là của họ.',
          ky_nang: 'Viết brief ngắn: angle, gợi ý hook, cảnh bắt buộc, câu không được nói.',
          muc_tieu: ['Biết 4 phần của một brief cho KOL, KOC, affiliate.', 'Không viết sẵn từng chữ.', 'Ghi rõ cảnh bắt buộc và câu cấm.'],
          canh: [
            { loi: 'Chào bạn, mình gặp lại nhau ở bài hai. Bạn đã chọn được người. Giờ là viết brief, tức là bản yêu cầu ngắn gửi cho họ. Brief tốt nói rõ việc, nhưng để người ta nói bằng giọng của chính họ.',
              hinh: { loai: 'tieu-de', nhan: 'Con đường 2 · Buổi 9 · Bài 2', tieu: 'Viết brief theo giọng kênh', phu: 'Rõ việc, giọng là của họ' } },
            { loi: 'Một brief ngắn gồm bốn phần. Angle cần nói. Vài gợi ý hook. Những cảnh bắt buộc phải có. Và những câu tuyệt đối không được nói.',
              hinh: { loai: 'danh-sach', so: true, tieu: 'Brief gồm 4 phần', muc: [{ tieu: 'Angle', chu: 'nỗi đau nào, cho ai' }, { tieu: 'Gợi ý hook', chu: 'vài cách mở, không bắt buộc' }, { tieu: 'Cảnh bắt buộc', chu: 'dùng thật, cận sản phẩm' }, { tieu: 'Câu cấm', chu: 'không chữa khỏi, không 100%' }] } },
            { loi: 'Đừng viết sẵn từng chữ. Người xem theo dõi kênh vì giọng của chủ kênh. Đọc nguyên văn kịch bản của hãng sẽ nghe như quảng cáo, và người xem lướt qua.',
              hinh: { loai: 'so-sanh', tieu: 'Đừng viết sẵn từng chữ', nhan_truoc: 'Kịch bản từng chữ', truoc: 'Nghe như quảng cáo, người xem lướt qua', nhan_nay: 'Gợi ý + giọng của họ', nay: 'Nghe như chia sẻ thật' } },
            { loi: 'Cảnh bắt buộc và câu cấm thì phải thật rõ. Ví dụ: bắt buộc có cảnh dùng thật và cận sản phẩm. Không nói chữa khỏi, không nói một trăm phần trăm.',
              hinh: { loai: 'trich', chu: 'Cảnh bắt buộc và câu cấm phải thật rõ.', nguon: 'Phần không được tuỳ biến của brief' } },
            { loi: 'Brief càng ngắn càng dễ làm đúng. Một trang là đủ.',
              hinh: { loai: 'trich', chu: 'Brief càng ngắn, càng dễ làm đúng.', nguon: 'Một trang là đủ' } },
            { loi: 'Tóm lại: brief rõ việc, nhưng giọng là của họ. Bài tiếp theo, cũng là bài cuối của khoá học: duyệt video gửi về, và nhân cặp win. Hẹn gặp bạn ở bài ba.',
              hinh: { loai: 'trich', chu: 'Brief rõ việc, giọng là của họ.', nguon: 'Bài tiếp theo · Duyệt video gửi về, nhân cặp win' } }
          ],
          y_chinh: [
            'Brief 4 phần: angle · gợi ý hook · cảnh bắt buộc · câu cấm.',
            'Không viết sẵn từng chữ — người xem theo dõi kênh vì giọng của chủ kênh.',
            'Cảnh bắt buộc và câu cấm phải thật rõ; brief một trang là đủ.'
          ],
          khoi: [
            { loai: 'the', tieu: 'Mẫu brief 1 trang', muc: [
              { tieu: 'Angle', chu: 'Da dầu, đến chiều mặt bóng loáng — cho sinh viên, nhân viên văn phòng.' },
              { tieu: 'Gợi ý hook (tuỳ bạn chọn hoặc nói theo cách của bạn)', chu: '“Chiều nào mặt cũng thế này?” · Cận mặt bóng dầu rồi thấm giấy.' },
              { tieu: 'Cảnh bắt buộc', chu: 'Dùng sản phẩm thật trên da · cận sản phẩm, thấy rõ tên · kêu gọi bấm giỏ.' },
              { tieu: 'Câu không được nói', chu: '“Chữa khỏi”, “100%”, “vĩnh viễn”, số liệu không có nguồn.' }
            ] },
            { loai: 'luu-y', chu: '<b>Giọng là tài sản của kênh.</b> Brief chỉ khoá phần bắt buộc (cảnh, câu cấm) và để mở phần còn lại. Người xem tin chủ kênh vì họ nói như chính họ.' }
          ],
          hoi_nhanh: [
            { hoi: 'Brief nào tốt hơn cho một KOC?', chon: ['Kịch bản viết sẵn từng chữ, đọc nguyên văn', 'Angle + gợi ý hook + cảnh bắt buộc + câu cấm, để KOC nói bằng giọng của mình', 'Chỉ gửi link sản phẩm', 'Brief 10 trang thật chi tiết'], dap: 1,
              giai: 'Brief rõ việc nhưng để người nói giữ giọng của họ — nghe như chia sẻ thật, không như quảng cáo.' }
          ]
        },
        {
          id: 'b9-3', ten: 'Duyệt video gửi về, nhân cặp win', phut: 2,
          tu_duy: 'Đo theo cặp người nói × angle, dồn sức vào cặp win.',
          ky_nang: 'Duyệt video gửi về theo 5 câu hỏi và luật; đọc số theo cặp; nhân cặp win.',
          muc_tieu: ['Duyệt video gửi về bằng 5 câu hỏi.', 'Góp ý giữ được giọng của người nói.', 'Đọc số theo cặp và nhân cặp win.'],
          canh: [
            { loi: 'Chào bạn, đây là bài cuối của khoá học. Video từ KOL, KOC và affiliate đã gửi về. Việc của bạn là duyệt cho chắc, rồi dồn sức vào những cặp đang win.',
              hinh: { loai: 'tieu-de', nhan: 'Con đường 2 · Buổi 9 · Bài 3', tieu: 'Duyệt video gửi về, nhân cặp win', phu: 'Đo theo cặp người nói × angle' } },
            { loi: 'Duyệt bằng đúng năm câu hỏi của buổi hai, và đặc biệt kỹ câu số bốn: đúng luật. Video là của người khác, nhưng nếu vi phạm, thương hiệu vẫn chịu trách nhiệm.',
              hinh: { loai: 'danh-sach', so: true, tieu: '5 câu hỏi — kỹ nhất câu số 4', muc: [{ tieu: '3 giây đầu', chu: 'có làm mình dừng tay?' }, { tieu: 'Khách hàng', chu: 'đúng nỗi đau, mong muốn?' }, { tieu: 'Bằng chứng', chu: 'có cảnh dùng thật?' }, { tieu: 'Đúng luật', chu: 'không hứa quá, không câu cấm' }, { tieu: 'Kêu gọi', chu: 'một hành động rõ?' }] } },
            { loi: 'Góp ý cho họ như góp ý cho Agent: nói rõ sai ở đâu, muốn thế nào. Nhưng giữ giọng của họ, chỉ sửa điều thật sự cần.',
              hinh: { loai: 'so-sanh', tieu: 'Góp ý giữ giọng của họ', nhan_truoc: 'Sửa hết theo ý mình', truoc: 'Mất giọng kênh, nghe như quảng cáo', nhan_nay: 'Chỉ sửa điều cần', nay: 'Đúng luật, đủ cảnh — giọng vẫn là của họ' } },
            { loi: 'Sau mỗi đợt, đọc số theo từng cặp người nói và angle. Có cặp ra đơn đều, có cặp không. Đó là thông tin quý nhất của cả đợt.',
              hinh: { loai: 'danh-sach', tieu: 'Đọc số theo cặp', muc: [{ tieu: 'Cặp win', chu: 'ra đơn đều' }, { tieu: 'Cặp đang thử', chu: 'có tín hiệu, cần thêm video' }, { tieu: 'Cặp chưa win', chu: 'đổi một thứ rồi thử lại' }] } },
            { loi: 'Dồn sức vào cặp win: đặt thêm video với người đó cho angle đó, và thử angle đó với những người có khán giả giống họ. Cặp chưa win thì đổi một thứ rồi thử lại, như bạn đã học ở buổi tám.',
              hinh: { loai: 'trich', chu: 'Dồn sức vào cặp win.', nguon: 'Nhân cặp người nói × angle' } },
            { loi: 'Bạn đã đi hết khoá học. Hai con đường, một tinh thần: học tập và phát triển không ngừng. Nói chuyện bằng dữ liệu, hành động nhanh, và sẵn sàng thử sai. Chúc bạn làm ra thật nhiều video win.',
              hinh: { loai: 'ket', tieu: 'Bạn đã hoàn thành khoá học', muc: ['Nói chuyện bằng dữ liệu', 'Hành động nhanh, thích ứng nhanh', 'Chấp nhận và sẵn sàng thử sai', 'Học tập và phát triển không ngừng'] } }
          ],
          y_chinh: [
            'Duyệt video gửi về bằng 5 câu hỏi, kỹ nhất câu đúng luật — thương hiệu vẫn chịu trách nhiệm.',
            'Góp ý rõ sai ở đâu, muốn thế nào, nhưng giữ giọng của người nói.',
            'Đọc số theo cặp người nói × angle; dồn sức vào cặp win, cặp chưa win thì đổi một thứ rồi thử lại.'
          ],
          khoi: [
            { loai: 'kiem', tieu: 'Duyệt video gửi về — tick khi duyệt', muc: ['3 giây đầu giữ được người xem', 'Đúng angle trong brief', 'Có đủ cảnh bắt buộc', 'Không có câu cấm, không hứa quá', 'Kêu gọi đúng một hành động'] },
            { loai: 'bang', tieu: 'Sau mỗi đợt: làm gì với từng cặp', dau: ['Cặp', 'Dấu hiệu', 'Làm gì tiếp'], dong: [
              ['Cặp win', 'Ra đơn đều', 'Đặt thêm video; thử angle này với người có khán giả giống'],
              ['Cặp đang thử', 'Có tín hiệu nhưng chưa đều', 'Thêm 1–2 video trước khi kết luận'],
              ['Cặp chưa win', 'Không ra đơn', 'Đổi một thứ (hook hoặc angle) rồi thử lại']
            ] }
          ],
          hoi_nhanh: [
            { hoi: 'Video KOC gửi về có câu “trị dứt điểm mụn 100%”. Bạn làm gì?', chon: ['Đăng luôn vì là video của KOC', 'Trả lại, yêu cầu bỏ câu đó, giữ phần còn lại theo giọng của họ', 'Tự cắt đoạn đó rồi đăng không báo', 'Bỏ hợp tác'], dap: 1,
              giai: 'Video của người khác nhưng thương hiệu vẫn chịu trách nhiệm. Góp ý rõ, chỉ sửa điều cần, giữ giọng của họ.' }
          ]
        }
      ],
      kiem_tra: [
        { hoi: 'Đọc một kênh KOL, KOC trước khi chọn theo 3 điều nào?', chon: ['Giá, số video, màu kênh', 'Khán giả · kiểu nói · video bán hàng trước đây', 'Số người theo dõi, lượt thích, tuổi', 'Tên kênh, ảnh đại diện, mô tả'], dap: 1 },
        { hoi: 'Vì sao không nên chọn KOL chỉ vì nhiều người theo dõi?', chon: ['Vì đắt', 'Vì số người theo dõi không cho biết bao nhiêu người là khách mua', 'Vì kênh lớn hay trễ hẹn', 'Không có lý do'], dap: 1 },
        { hoi: 'Brief cho KOL, KOC, affiliate gồm những gì?', chon: ['Kịch bản từng chữ', 'Angle · gợi ý hook · cảnh bắt buộc · câu cấm', 'Chỉ link sản phẩm', 'Giá và hạn chót'], dap: 1 },
        { hoi: 'Vì sao không viết sẵn từng chữ cho KOC?', chon: ['Cho đỡ tốn công', 'Người xem theo dõi kênh vì giọng của chủ kênh; đọc nguyên văn nghe như quảng cáo', 'Vì KOC không thích đọc', 'Vì luật cấm'], dap: 1 },
        { hoi: 'Khi duyệt video gửi về, câu hỏi nào cần kỹ nhất?', chon: ['Nhạc nền có hay không', 'Đúng luật, không hứa quá', 'Video có dài không', 'Màu có đẹp không'], dap: 1 },
        { hoi: 'Sau một đợt, việc nên làm với cặp người nói × angle đang win?', chon: ['Dừng để thử cái khác', 'Dồn sức: đặt thêm video, thử angle đó với người có khán giả giống', 'Đổi angle ngay', 'Giảm số video'], dap: 1 }
      ],
      tu_luan: [
        'Chọn một angle của sản phẩm bạn cầm. Chấm 3 kênh cho angle đó và chọn 1 kênh. Vì sao?',
        'Viết brief 1 trang cho kênh bạn chọn: angle, gợi ý hook, cảnh bắt buộc, câu cấm.'
      ],
      bai_tap: [
        ['Chấm 3 kênh cho 1 angle', '30 phút', 'Có điểm cho khán giả, kiểu nói, video bán hàng trước đây'],
        ['Viết 1 brief cho 1 kênh', '20 phút', 'Đủ 4 phần, không viết sẵn từng chữ'],
        ['Lập bảng cặp người nói × angle sau 1 đợt', '30 phút', 'Mỗi cặp có kết luận: win / đang thử / chưa win và việc làm tiếp']
      ],
      checklist: ['Đọc và chấm được một kênh cho một angle', 'Viết được brief 1 trang theo giọng kênh', 'Duyệt được video gửi về bằng 5 câu hỏi', 'Có bảng cặp người nói × angle và biết dồn sức vào đâu']
    }
  ]
};
