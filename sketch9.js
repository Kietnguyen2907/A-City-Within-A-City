
// Danh sách các câu thoại hỗn loạn
const phrases = [
    "Nay chạy 10 vòng luôn không?",
    "Oke luôn chạy xong ra ăn cá viên chiên",
    "Ngoan không là chú kia bắt đó",
   
    
    "Nay đánh cháy vậy ba",
"Vợt mới mà đánh khác liền fen",
    "Mày! Tao câu được con cá bự lắm",
    "Ngon! Tí nướng làm kèo nhậu là hết bài",
    "Mẹ ơi! Con muốn chơi nhà banh",
    "Oke con! Đợi mẹ mua vé nha",
    "Ba ơi cho con đi xe lửa đi",
    "Thôi về nãy giờ chơi chục trò rồi ông",
   
    "Ê mày ông chú kia chơi hay dữ"
];

let nodes = [];

function setup() {
    let container = document.getElementById('p5-container');
    let canvas = createCanvas(container.offsetWidth, container.offsetHeight);
    canvas.parent('p5-container');
    
    // Cấu hình chữ
    textFont('aktiv-grotesk-extended');
    textAlign(CENTER, CENTER);
    
    initNodes();
}

function initNodes() {
    nodes = [];
    
    // Tạo node cho mỗi câu thoại
    for (let i = 0; i < phrases.length; i++) {
        nodes.push(new TextNode(phrases[i]));
    }
}

function draw() {
    clear(); // Xóa frame cũ để vẽ lại

    // Vẽ các đường line nối các chữ với nhau (tạo mạng lưới hỗn loạn)
    stroke('#0044FF');
    strokeWeight(1);
    noFill();
    
    // Sử dụng beginShape để nối liền mạch các node
    beginShape();
    for (let node of nodes) {
        vertex(node.pos.x, node.pos.y);
    }
    endShape(CLOSE); // Khép kín vòng kết nối

    // Cập nhật và vẽ chữ
    for (let node of nodes) {
        node.update();
        node.display();
    }
}

function windowResized() {
    let container = document.getElementById('p5-container');
    if (container) {
        resizeCanvas(container.offsetWidth, container.offsetHeight);
        initNodes(); // Reset lại vị trí khi resize
    }
}

class TextNode {
    constructor(text) {
        this.text = text;
        
        // Random vị trí xung quanh
        let angle = random(TWO_PI);
        // Bán kính random từ 25% đến 45% chiều rộng màn hình
        let minRadius = min(width, height) * 0.25; 
        let maxRadius = min(width, height) * 0.45;
        let r = random(minRadius, maxRadius);
        
        // Tính toạ độ từ tâm
        let startX = width / 2 + cos(angle) * r;
        let startY = height / 2 + sin(angle) * r;
        
        // Giới hạn biên màn hình (padding an toàn)
        startX = constrain(startX, 100, width - 100);
        startY = constrain(startY, 50, height - 50);

        this.pos = createVector(startX, startY);
        
        // Vận tốc ngẫu nhiên rất chậm (trôi lơ lửng)
        this.vel = p5.Vector.random2D().mult(random(0.2, 1.8));
    }

    update() {
        this.pos.add(this.vel);

        // Kiểm tra va chạm biên màn hình -> Bật lại
        if (this.pos.x < 50 || this.pos.x > width - 50) {
            this.vel.x *= -1;
        }
        if (this.pos.y < 30 || this.pos.y > height - 30) {
            this.vel.y *= -1;
        }
    }

    display() {
        noStroke();
        fill('#0044FF'); // Màu chữ xanh dương
        
        // Responsive font size
        let fSize = width < 768 ? 14 : 18;
        textSize(fSize);
        
        fill('#0044FF');
        text(this.text, this.pos.x, this.pos.y);
    }
}
