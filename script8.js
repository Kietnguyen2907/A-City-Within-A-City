
document.addEventListener("DOMContentLoaded", () => {
    // Danh sách ID các dòng chữ theo thứ tự
    const textIds = ['pt-1', 'pt-2', 'pt-3', 'pt-4', 'pt-5', 'pt-6', 'pt-7', 'pt-8'];
    const btnContinue = document.getElementById('btn-continue');
    let isReadyToNavigate = false;

    // --- CẤU HÌNH TỐC ĐỘ ---
    const READING_SPEED = 1200; // Thời gian chờ giữa các dòng (ms). Tăng lên để chậm hơn.

    // Hàm chạy chuỗi Animation
    async function runSequence() {
        // Chờ 0.5s sau khi tải trang mới bắt đầu
        await new Promise(resolve => setTimeout(resolve, 500));

        for (let i = 0; i < textIds.length; i++) {
            const currentEl = document.getElementById(textIds[i]);
            
            if (currentEl) {
                currentEl.classList.add('visible');
            }

            // Thời gian chờ đọc giữa các dòng
            await new Promise(resolve => setTimeout(resolve, READING_SPEED));
        }

        // Hiện dòng "Nhấn để tiếp tục"
        if (btnContinue) {
            btnContinue.classList.add('visible');
        }
        
        // Bật cờ cho phép click chuyển trang
        isReadyToNavigate = true;
    }

    // Sự kiện click toàn màn hình để chuyển trang
    document.addEventListener('click', () => {
        if (isReadyToNavigate) {
            window.location.href = '9.html';
        }
    });

    // Bắt đầu chạy hiệu ứng
    runSequence();
});
