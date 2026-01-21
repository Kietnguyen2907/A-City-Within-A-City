
// Sketch2.js chỉ dùng để giữ canvas background nếu cần
// Logic text và animation đã được chuyển sang script2.js để tránh xung đột biến

function setup() {
    // Tạo canvas khớp với kích thước p5-container
    let container = document.getElementById('p5-container');
    let canvas = createCanvas(container.offsetWidth, container.offsetHeight);
    canvas.parent('p5-container');
}

function draw() {
    // Không xử lý logic ở đây nữa
}

// Xử lý resize cửa sổ
function windowResized() {
    let container = document.getElementById('p5-container');
    if(container) {
        resizeCanvas(container.offsetWidth, container.offsetHeight);
    }
}
