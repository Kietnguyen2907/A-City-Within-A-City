
// Danh sách ID các dòng chữ theo thứ tự
const textIds = ['pt-1', 'pt-2', 'pt-3', 'pt-4', 'pt-5', 'pt-6', 'pt-7', 'pt-8'];
let isReadyToNavigate = false;
const btnContinue = document.getElementById('btn-continue');

// Hàm tạo đường nối từ Element A -> Element B
function createLine(el1, el2, index) {
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();

    let x1, y1, x2, y2;

    // Tọa độ của Element 1
    y1 = rect1.bottom + 5; 
    
    // Tọa độ của Element 2
    y2 = rect2.top - 5;    

    const center1 = rect1.left + rect1.width / 2;
    const center2 = rect2.left + rect2.width / 2;

    if (center2 > center1) {
        x1 = rect1.right - 20; 
        x2 = rect2.left + 20;  
    } else {
        x1 = rect1.left + 20;  
        x2 = rect2.right - 20; 
    }
    
    if (Math.abs(center2 - center1) < 50) {
        x1 = center1;
        x2 = center2;
    }

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.style.position = "absolute";
    svg.style.top = 0;
    svg.style.left = 0;
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.overflow = "visible";
    
    const path = document.createElementNS(svgNS, "path");
    const d = `M ${x1} ${y1} L ${x2} ${y2}`;
    path.setAttribute("d", d);
    path.setAttribute("class", "poem-line");
    path.id = `line-${index}`;
    
    svg.appendChild(path);
    document.getElementById('lines-layer').appendChild(svg);
    
    return path;
}

// Hàm chạy chuỗi Animation
async function runSequence() {
    await new Promise(resolve => setTimeout(resolve, 500));

    for (let i = 0; i < textIds.length; i++) {
        const currentEl = document.getElementById(textIds[i]);
        currentEl.classList.add('visible');

        // Thời gian chờ đọc
        await new Promise(resolve => setTimeout(resolve, 800));

        // Nếu chưa phải dòng cuối, vẽ dây nối
        if (i < textIds.length - 1) {
            const nextEl = document.getElementById(textIds[i+1]);
            const line = createLine(currentEl, nextEl, i);
            
            requestAnimationFrame(() => {
                line.classList.add('visible');
            });

            await new Promise(resolve => setTimeout(resolve, 300));
        }
    }

    // Hiện text "Nhấn để tiếp tục"
    btnContinue.classList.add('visible');
    
    // Bật cờ cho phép click
    isReadyToNavigate = true;
}

// Click toàn màn hình
document.addEventListener('click', () => {
    if (isReadyToNavigate) {
        // Chuyển sang trang 9 (Trang kết thúc)
        window.location.href = '9.html';
    }
});

// Resize
window.addEventListener('resize', () => {
    const layer = document.getElementById('lines-layer');
    if(layer) layer.innerHTML = ''; 
    
    for (let i = 0; i < textIds.length - 1; i++) {
        const el1 = document.getElementById(textIds[i]);
        const el2 = document.getElementById(textIds[i+1]);

        if (el1.classList.contains('visible') && el2.classList.contains('visible')) {
            const line = createLine(el1, el2, i);
            line.classList.add('visible');
        }
    }
});

runSequence();
