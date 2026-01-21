
// --- CẤU HÌNH DỮ LIỆU ---
// Mỗi game đi kèm với một "giấc mơ"
// Game vẫn giữ 2 dòng (có \n), Dream chuyển thành 1 dòng (dùng dấu cách)
const items = [
    { game: "TÀU\nLƯỢN", dream: "Chinh Phục" },
    { game: "ĐĨA\nBAY", dream: "Bay Lên" },
    { game: "XE\nĐIỆN", dream: "Tự Do" },
    { game: "ĐU\nQUAY", dream: "Ngắm Nhìn" },
    { game: "XE\nNGỰA", dream: "Huy Hoàng" },
    { game: "PHI\nTHUYỀN", dream: "Thám Hiểm" },
    { game: "NHÀ\nHƠI", dream: "Bay Bổng" },
    { game: "XE\nLỬA", dream: "Viễn Du" }
];

// --- CẤU HÌNH VÒNG QUAY ---
const SEGMENT_ANGLE = 360 / items.length; // 45 độ mỗi món
const POINTER_ANGLE = 0; 

let currentRotation = 0; // Góc xoay hiện tại của wheel
let isSpinning = false;
let targetRotation = 0;

// Các biến cho Animation Loop
let startTime = null;
let startAngle = 0;
let duration = 0; 

// DOM Elements
const spinner = document.getElementById('spinner');
const btnSpin = document.getElementById('spin-btn');
const dreamTextEl = document.getElementById('dream-text');

// --- INIT ---
function initWheel() {
    items.forEach((item, index) => {
        const el = document.createElement('div');
        el.className = 'game-item';
        // Đặt nội dung (xuống dòng bằng <br> nếu có \n)
        el.innerHTML = item.game.replace('\n', '<br>');
        
        // Xoay từng item vào vị trí
        // Transform-origin đã được set ở CSS là 0% 50% (Tâm vòng tròn)
        const angle = index * SEGMENT_ANGLE;
        el.style.transform = `rotate(${angle}deg)`;
        
        spinner.appendChild(el);
    });
    
    // Set text ban đầu (Item 0 đang ở vị trí 0 độ)
    updateActiveText(0);
}

// --- LOGIC XOAY ---
btnSpin.addEventListener('click', () => {
    if (isSpinning) return;
    
    isSpinning = true;
    btnSpin.disabled = true; // Chặn bấm liên tục
    
    // Tính toán đích đến
    // Quay 4 vòng (ít hơn chút để chậm rãi)
    const extraSpins = 360 * 3; 
    const randomSegment = Math.floor(Math.random() * items.length); // Chọn ngẫu nhiên 1 ô (0-7)
    
    // Muốn ô index 2 (90 độ) chạm mốc 0 độ -> Phải quay wheel -90 độ.
    // Góc item so với trục ngang: index * 45
    // Góc cần quay thêm để item đó về vị trí 0 độ (ngược chiều kim đồng hồ): - (index * 45)
    
    const stopAngle = -(randomSegment * SEGMENT_ANGLE); 
    
    // Tính toán góc đích tổng cộng
    // Snap current về bội số gần nhất của 360 để quay mượt tiếp
    const snapCurrent = Math.ceil(currentRotation / 360) * 360;
    
    // Đảm bảo luôn quay theo chiều dương (kim đồng hồ)
    targetRotation = snapCurrent + extraSpins + stopAngle; 
    
    // Bắt đầu Animation Loop
    startAngle = currentRotation;
    
    // THAY ĐỔI: Tăng thời gian lên 30000ms (30 giây) để xoay thật chậm
    duration = 30000; 
    startTime = null;
    
    requestAnimationFrame(animateSpin);
});

// Hàm Easing (Ease Out Cubic - Chậm dần đều)
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function animateSpin(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1); // 0 -> 1
    
    // Tính góc hiện tại dựa trên easing
    const easeVal = easeOutCubic(progress);
    currentRotation = startAngle + (targetRotation - startAngle) * easeVal;
    
    // Cập nhật DOM
    // Chỉ dùng rotate(), không cần translate vì CSS đã căn top:0 left:0
    spinner.style.transform = `rotate(${currentRotation}deg)`;
    
    // --- REAL-TIME TEXT UPDATE ---
    // Tính xem item nào đang đi ngang qua mũi tên (0 độ)
    updateActiveText(currentRotation);
    
    if (progress < 1) {
        requestAnimationFrame(animateSpin);
    } else {
        isSpinning = false;
        btnSpin.disabled = false;
    }
}

// Hàm xác định item nào đang ở vị trí 0 độ (Mũi tên)
function updateActiveText(rotation) {
    // Normal hóa góc về 0-360
    let effectiveAngle = (360 - (rotation % 360)) % 360;
    
    // Tìm index: góc / 45
    // Cần làm tròn (round) để khi nó lướt qua ranh giới là đổi luôn
    let index = Math.round(effectiveAngle / SEGMENT_ANGLE) % items.length;
    
    // Cập nhật text
    const data = items[index];
    // Hiển thị text giấc mơ (đã là 1 dòng trong data)
    const htmlContent = data.dream;
    
    if (dreamTextEl.innerHTML !== htmlContent) {
        // Hiệu ứng nhẹ khi đổi chữ
        dreamTextEl.style.opacity = 0.5;
        dreamTextEl.style.transform = "scale(0.95)";
        
        setTimeout(() => {
            dreamTextEl.innerHTML = htmlContent;
            dreamTextEl.style.opacity = 1;
            dreamTextEl.style.transform = "scale(1)";
        }, 50);
    }
}

// Chạy
initWheel();
