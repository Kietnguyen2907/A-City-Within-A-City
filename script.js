
// --- CẤU HÌNH ---
const STREET_NAMES = ["Cách Mạng Tháng 8", "Bắc Hải", "Trường Sơn"];
const CHANGE_INTERVAL = 1000; // Đổi tên mỗi 3 giây

// --- RESET TRẠNG THÁI (Logic mới) ---
// Khi người dùng quay về Index, xóa danh sách các phường đã tham quan
// để trang 3.html hiển thị lại đầy đủ 4 vòng tròn.
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    sessionStorage.removeItem('visitedWards');
    console.log("Session Reset: Visited Wards Cleared");
}

// --- BIẾN ---
let currentStreetIndex = 0;
const streetNameElement = document.getElementById('street-name');

// --- LOGIC ĐỔI TÊN ĐƯỜNG (Index Page) ---
function changeStreetName() {
    // Chỉ thực hiện nếu element tồn tại (đang ở trang index.html)
    if (streetNameElement) {
        currentStreetIndex = (currentStreetIndex + 1) % STREET_NAMES.length;
        streetNameElement.innerText = STREET_NAMES[currentStreetIndex];
    }
}

// Bắt đầu vòng lặp đổi tên chỉ khi ở trang index
if (streetNameElement) {
    setInterval(changeStreetName, CHANGE_INTERVAL);
}

// --- LOGIC ĐỔI CHỮ CÔNG VIÊN / THÀNH PHỐ (Park Page - 1.html) ---
const changingTextElement = document.getElementById('changing-text');

if (changingTextElement) {
    setInterval(() => {
        // Kiểm tra nội dung hiện tại
        if (changingTextElement.innerText === 'Công Viên') {
            // Đổi sang Thành Phố và In nghiêng
            changingTextElement.innerText = 'Thành Phố';
            changingTextElement.classList.add('is-italic');
        } else {
            // Đổi về Công Viên và Bỏ in nghiêng (In thẳng)
            changingTextElement.innerText = 'Công Viên';
            changingTextElement.classList.remove('is-italic');
        }
    }, 500); // Đổi mỗi 1 giây (có thể chỉnh tốc độ ở đây)
}

// Log để kiểm tra file đã chạy
console.log("Saigon Traffic Experience: Script Loaded");
