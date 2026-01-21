
document.addEventListener("DOMContentLoaded", () => {
    // Danh sách ID các dòng chữ
    const textIds = ['pt-1', 'pt-2', 'pt-3', 'pt-4', 'pt-5', 'pt-6', 'pt-7'];
    const btnContinue = document.getElementById('btn-continue');
    let isReadyToNavigate = false;

    // --- CẤU HÌNH TỐC ĐỘ ---
    const READING_SPEED = 1200; // Thời gian chờ giữa các dòng (ms) - Đã làm chậm lại

    // Hàm chạy chuỗi Animation (Chỉ hiện chữ)
    async function runSequence() {
        await new Promise(resolve => setTimeout(resolve, 500));

        for (let i = 0; i < textIds.length; i++) {
            const currentEl = document.getElementById(textIds[i]);
            if (currentEl) currentEl.classList.add('visible');

            // Thời gian chờ đọc giữa các dòng
            await new Promise(resolve => setTimeout(resolve, READING_SPEED));
        }

        // Hiện dòng "Nhấn để tiếp tục"
        if (btnContinue) btnContinue.classList.add('visible');
        
        // Bật cờ cho phép click
        isReadyToNavigate = true;
    }

    // Sự kiện click toàn màn hình
    document.addEventListener('click', () => {
        if (isReadyToNavigate) {
            window.location.href = '3.html';
        }
    });

    runSequence();
});
