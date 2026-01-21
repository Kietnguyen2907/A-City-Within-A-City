
// --- 1. LOGIC KIỂM TRA CHUYỂN TRANG (CHẠY NGAY LẬP TỨC) ---
// Không bọc trong DOMContentLoaded để tránh hiện tượng nháy trang (Glitch)
(function() {
    try {
        const visitedWards = JSON.parse(sessionStorage.getItem('visitedWards') || '[]');
        
        // Nếu đã xem đủ 4 phường
        if (visitedWards.length >= 4) {
            // Sử dụng replace để thay thế lịch sử trang hiện tại, 
            // giúp trải nghiệm nút Back mượt hơn và không bị nháy.
            window.location.replace('8.html');
        }
    } catch (e) {
        console.error("Lỗi kiểm tra session:", e);
    }
})();

// --- 2. LOGIC GIAO DIỆN (CHẠY KHI DOM ĐÃ TẢI XONG) ---
document.addEventListener('DOMContentLoaded', () => {
    // Lấy lại dữ liệu (vì biến ở trên là local scope trong hàm tự gọi)
    let visitedWards = JSON.parse(sessionStorage.getItem('visitedWards') || '[]');

    // Nếu chưa đủ điều kiện chuyển trang, thì mới xử lý hiển thị
    if (visitedWards.length < 4) {
        
        // A. Ẩn các phường đã xem
        visitedWards.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.display = 'none';
            }
        });

        // B. Gán sự kiện Click cho các vòng tròn còn lại
        const items = document.querySelectorAll('.circle-item');
        
        items.forEach(item => {
            item.addEventListener('click', function() {
                const id = this.id;
                
                // Nếu ID này chưa có trong danh sách đã xem
                if (!visitedWards.includes(id)) {
                    visitedWards.push(id);
                    // Lưu lại vào sessionStorage
                    sessionStorage.setItem('visitedWards', JSON.stringify(visitedWards));
                }
                // Thẻ <a> sẽ tự chuyển trang
            });
        });
    }
});
