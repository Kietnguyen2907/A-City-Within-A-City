
// Dữ liệu cho 3 trạng thái
const layouts = [
    {
        id: "kheo",
        center: "Khéo",
        items: [
            {
                title: "BI\nSẮT",
                desc: "Tiếng hò hét rầm rộ làm góc sân nhộn nhịp hệt như trận chung kết. Giữa sự náo nhiệt đó, các tay bi sắt vẫn bình tĩnh lạ kỳ, họ nín thở nắn nót ném viên bi thật chuẩn về đích trong sự chờ đợi của mọi người",
                // Vị trí Text (tương đối theo %)
                tPos: { top: "10%", left: "50%", transform: "translateX(-50%)", textAlign: "center" },
                dPos: { top: "10%", left: "60%", width: "35%", textAlign: "left" }, // 35% là vừa phải vì nằm lệch phải
                // Vị trí điểm neo dây (để nối vào Center Box)
                lineTarget: { x: 50, y: 25 } // % màn hình (gần title)
            },
            {
                title: "ĐÁ\nCẦU",
                desc: "Dưới mấy tán cây mát rượi, trái cầu cứ nhịp nhàng chuyền qua chuyền lại trên những đôi chân dẻo dai. Tiếng chạm đều đặn ấy vang lên giữa không gian tĩnh lặng, làm cái buổi chiều ở công viên bỗng thấy bình yên hẳn.",
                tPos: { bottom: "35%", left: "10%", textAlign: "center" },
                // TĂNG WIDTH TỪ 25% LÊN 32%
                dPos: { top: "20%", left: "5%", width: "32%", textAlign: "left" },
                lineTarget: { x: 15, y: 60 } 
            },
            {
                title: "CÂU\nCÁ",
                desc: "Mặc kệ dòng người cứ hối hả ngược xuôi, mấy chú câu cá vẫn cứ ngồi đó ung dung, thong thả chờ cá cắn câu. Ai không rành chắc chẳng hiểu nổi cái sướng khi thấy cái phao động đậy sau cả buổi trời ngồi đợi. Đó là lúc cái sự kiên nhẫn, cái mong mỏi của mình cuối cùng cũng được đền đáp thiệt là xứng đáng.",
                tPos: { bottom: "28%", right: "10%", textAlign: "center" },
                // TĂNG WIDTH LÊN 38%
                dPos: { bottom: "10%", right: "15%", width: "38%", textAlign: "left" },
                lineTarget: { x: 85, y: 65 }
            }
        ]
    },
    {
        id: "nhanh",
        center: "Nhanh",
        items: [
            {
                title: "CẦU\nLÔNG",
                desc: "Tiếng cầu rộn rã như xua đi bao bộn bề bài vở, công việc. Đây là lúc người ta gác lại tất cả để thoả đam mê bấy lâu. Dù già hay trẻ, hễ vào sân là ai nấy đều tranh thủ sống trọn với niềm yêu thích của chính mình.",
                tPos: { top: "10%", left: "28%", textAlign: "center" },
                dPos: { top: "12%", right: "15%", width: "38%", textAlign: "left" },
                lineTarget: { x: 35, y: 25 }
            },
            {
                title: "TRƯỢT\nPATIN",
                desc: "Nhìn cái mặt sân xi măng thô ráp vậy thôi, mà đám nhỏ vẫn cứ mang giày patin lướt đi vèo vèo hệt như gió. Có lẽ chỉ lúc này, tụi nó mới thực sự thấy sướng khi cái khao khát được tự do, được bay bổng của mình cuối cùng cũng có chỗ để tung hoành.",
                tPos: { bottom: "10%", left: "15%", textAlign: "center" },
                // TĂNG WIDTH TỪ 22% LÊN 32%
                dPos: { bottom: "38%", left: "5%", width: "32%", textAlign: "left" },
                lineTarget: { x: 20, y: 75 }
            },
            {
                title: "TENNIS",
                desc: "Nép mình ở một góc sân, mấy chú trung niên vẫn hăng hái vung vợt tung ra những cú đánh chắc nịch. Chơi xong trận cầu, người thì tất tả về lo việc nhà, người lại í ới rủ bạn già làm vài ly cho thắm tình anh em.",
                tPos: { top: "42%", right: "8%", textAlign: "right" },
                dPos: { bottom: "15%", right: "8%", width: "35%", textAlign: "left" },
                lineTarget: { x: 80, y: 45 }
            }
        ]
    },
    {
        id: "ben",
        center: "Bền",
        items: [
            {
                title: "CHẠY\nBỘ",
                desc: "Nhìn dòng người cứ nhịp nhàng chạy bộ dưới tán cây xanh, ta mới thấy quý cái bầu không khí trong lành hiếm hoi này. Người ta chạy không chỉ để luyện cái sức bền cho cơ thể, mà còn để 'thỏa' cái cơn thèm được tĩnh lặng, được sống chậm lại một chút giữa nhịp đời hối hả ngoài kia.",
                tPos: { top: "10%", left: "35%", textAlign: "center" },
                // TĂNG WIDTH LÊN 42%
                dPos: { top: "10%", right: "10%", width: "42%", textAlign: "left" },
                lineTarget: { x: 40, y: 25 }
            },
            {
                title: "HÍT\nXÀ",
                desc: "Mấy cậu thanh niên chiều nào cũng ghé đây hít xà, kiên trì để thấy mình mạnh mẽ hơn. Có lẽ cái cảm giác thấy cơ thể vững chãi lên mỗi ngày thiệt sự gây nghiện",
                tPos: { bottom: "25%", left: "12%", textAlign: "center" },
                // TĂNG WIDTH TỪ 25% LÊN 35%
                dPos: { top: "38%", left: "3%", width: "35%", textAlign: "left" },
                lineTarget: { x: 18, y: 65 }
            },
            {
                title: "BƠI\nLỘI",
                desc: "Giữa cái nắng cháy da của Sài Gòn, không có gì sướng bằng việc nhảy ùm xuống làn nước mát rượi. Nhìn mấy đứa nhỏ xíu mà bơi lội rành rọt, quậy tưng bừng hệt như những chú cá nhỏ mới thấy ham.",
                tPos: { top: "50%", right: "10%", textAlign: "right" },
                // TĂNG WIDTH LÊN 38%
                dPos: { bottom: "15%", right: "5%", width: "38%", textAlign: "left" },
                lineTarget: { x: 80, y: 55 }
            }
        ]
    }
];

let currentIndex = 0;
const container = document.getElementById('dynamic-content');
const centerText = document.getElementById('center-text');
const toggleBox = document.getElementById('toggle-box');

// Hàm render layout (TỨC THÌ)
function renderLayout(index) {
    const layout = layouts[index];
    
    // 1. Xóa nội dung cũ
    container.innerHTML = ''; 
    
    // 2. Đổi chữ trung tâm (Không delay)
    centerText.innerText = layout.center;

    // 3. Tạo các phần tử mới (Không delay, không opacity animation)
    layout.items.forEach(item => {
        // --- Tạo Title ---
        const titleEl = document.createElement('div');
        titleEl.className = 'activity-item act-title';
        titleEl.innerText = item.title;
        applyStyle(titleEl, item.tPos);
        container.appendChild(titleEl);

        // --- Tạo Desc ---
        const descEl = document.createElement('div');
        descEl.className = 'activity-item act-desc';
        descEl.innerText = item.desc;
        applyStyle(descEl, item.dPos);
        container.appendChild(descEl);

        // --- Tạo Dây nối ---
        createLine(item.lineTarget.x, item.lineTarget.y);
    });
}

// Hàm áp dụng style từ object
function applyStyle(element, styleObj) {
    for (const prop in styleObj) {
        element.style[prop] = styleObj[prop];
    }
}

// Hàm tạo dây nối
function createLine(targetXPercent, targetYPercent) {
    const line = document.createElement('div');
    line.className = 'connector-line';
    
    // Tính toán hình học
    // Điểm đầu: Tâm màn hình (50% W, 50% H)
    // Điểm cuối: targetXPercent, targetYPercent
    
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    const x1 = w * 0.5;
    const y1 = h * 0.5;
    const x2 = w * (targetXPercent / 100);
    const y2 = h * (targetYPercent / 100);
    
    const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    
    // Set styles
    line.style.width = `${dist}px`;
    line.style.top = `50%`;
    line.style.left = `50%`;
    line.style.transform = `rotate(${angle}deg)`;
    
    container.appendChild(line);
}

// Xử lý sự kiện Click Box (TỨC THÌ)
toggleBox.addEventListener('click', () => {
    // Không thêm animation scale hay timeout
    
    // Chuyển index
    currentIndex = (currentIndex + 1) % layouts.length;
    renderLayout(currentIndex);
});

// Xử lý Resize window để vẽ lại dây
window.addEventListener('resize', () => {
    // Render lại layout hiện tại để tính lại độ dài dây
    renderLayout(currentIndex);
});

// Init
renderLayout(0);
