
let leftNodes = [];
let rightNodes = [];

// Cấu hình nội dung chữ như trong hình
const leftPhrases = ["Một thành phố", "Bên trong", "Một thành phố"];
const rightPhrases = ["Một thành phố", "Tách biệt", "Một thành phố"];

function setup() {
  // Tạo canvas full màn hình
  let canvas = createCanvas(windowWidth, windowHeight);
  // Đặt canvas nằm dưới cùng (position absolute đã set trong CSS, nhưng ta gán ID để chắc chắn)
  canvas.id('p5-canvas');
  
  // Font text - dùng font Phudu hoặc fallback
  textFont('aktiv-grotesk-extended', 32); 
  textStyle(ITALIC); // Chữ in nghiêng
  textAlign(CENTER, CENTER);

  // Điều chỉnh kích thước chữ dựa trên màn hình
  if (windowWidth < 768) {
      textSize(16);
  } else {
      textSize(32);
  }

  initNodes();
}

function initNodes() {
  leftNodes = [];
  rightNodes = [];
  for (let i = 0; i < leftPhrases.length; i++) {
    leftNodes.push(new Node(leftPhrases[i], 'left'));
  }
  for (let i = 0; i < rightPhrases.length; i++) {
    rightNodes.push(new Node(rightPhrases[i], 'right'));
  }
}

function draw() {
  clear(); // Xóa frame cũ, giữ nền trong suốt

  // Vẽ các kết nối trước (để dây nằm dưới chữ)
  drawConnections(leftNodes);
  drawConnections(rightNodes);

  // Cập nhật và vẽ các điểm chữ
  for (let node of leftNodes) {
    node.update();
    node.display();
  }
  for (let node of rightNodes) {
    node.update();
    node.display();
  }
}

// Hàm vẽ đường nối giữa các điểm trong một mảng
function drawConnections(nodes) {
  stroke('#0044FF');
  strokeWeight(0.5); // Đường mảnh
  noFill();
  
  beginShape();
  for (let node of nodes) {
    vertex(node.pos.x, node.pos.y);
  }
  endShape();
}

// Xử lý khi resize màn hình
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Class Node đại diện cho một cụm chữ bay
class Node {
  constructor(text, side) {
    this.text = text;
    this.side = side;
    
    // --- CẤU HÌNH LỀ (MARGIN) ---
    this.marginX = 120; 
    this.marginY = 20;  

    // Xác định vùng hoạt động an toàn
    let minX, maxX;
    
    if (side === 'left') {
        minX = this.marginX;
        maxX = width * 0.3; // Giới hạn bên trái, cách tâm một đoạn
    } else {
        minX = width * 0.7; // Giới hạn bên phải, cách tâm một đoạn
        maxX = width - this.marginX;
    }
    
    // Fallback cho màn hình mobile quá nhỏ
    if (minX > maxX) {
        // Thu hẹp vùng an toàn lại
        if (side === 'left') { minX = 10; maxX = width/2 - 20; }
        else { minX = width/2 + 20; maxX = width - 10; }
        this.marginX = 10; // Giảm margin trên mobile
    }

    this.pos = createVector(random(minX, maxX), random(this.marginY, height - this.marginY));

    // Vận tốc ngẫu nhiên
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(2.1, 2.8)); // Tốc độ vừa phải
  }

  update() {
    this.pos.add(this.vel);

    // --- LOGIC VA CHẠM & CHỐNG KẸT ---
    // 1. Kiểm tra biên TRÊN / DƯỚI
    if (this.pos.y < this.marginY) {
        this.pos.y = this.marginY;       
        this.vel.y = abs(this.vel.y);    // Luôn dương (đi xuống)
    } else if (this.pos.y > height - this.marginY) {
        this.pos.y = height - this.marginY; 
        this.vel.y = -abs(this.vel.y);   // Luôn âm (đi lên)
    }

    // 2. Kiểm tra biên TRÁI / PHẢI
    if (this.side === 'left') {
        let rightLimit = width * 0.3; // Biên giới hạn phía trung tâm
        
        if (this.pos.x < this.marginX) {
            this.pos.x = this.marginX;
            this.vel.x = abs(this.vel.x); // Bật sang phải
        } else if (this.pos.x > rightLimit) {
            this.pos.x = rightLimit;
            this.vel.x = -abs(this.vel.x); // Bật sang trái
        }

    } else {
        let leftLimit = width * 0.7; // Biên giới hạn phía trung tâm
        
        if (this.pos.x < leftLimit) {
            this.pos.x = leftLimit;
            this.vel.x = abs(this.vel.x); 
        } else if (this.pos.x > width - this.marginX) {
            this.pos.x = width - this.marginX;
            this.vel.x = -abs(this.vel.x); // Bật sang trái (về phía tâm)
        }
    }
  }

  display() {
    noStroke();
    fill('#0044FF'); // Màu xanh dương
    
    push();
    translate(this.pos.x, this.pos.y);
    text(this.text, 0, 0);
    pop();
  }
}
