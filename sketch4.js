
const NUM_BUBBLES = 5; 

const WAVE_COUNT = 10;    
const WAVE_HEIGHT = 12;   
const WAVE_SPEED = 0.01;  

let bubbles = [];
let particles = [];
let popTexts = [];
let lastWidth = 0; 

const foodData = [
    { name: "NEM\nCHUA\nRÁN", emotion: "ĐÃ" },
    { name: "BẮP\nXÀO", emotion: "NÓNG" },
    { name: "CÁ\nVIÊN\nCHIÊN", emotion: "PHÊ" },
    { name: "TRÀ\nĐÀO", emotion: "MÁT" },
    { name: "BÁNH\nTRÁNG\nNƯỚNG", emotion: "GIÒN" },
    { name: "TRÉ\nTRỘN", emotion: "CAY" },
    { name: "TRÀ\nTẮC", emotion: "CHUA" },
    { name: "XÍU\nMẠI", emotion: "NGON" },
    { name: "CHÈ\nTHÁI", emotion: "NGỌT" },
    { name: "GỎI\nCUỐN", emotion: "TƯƠI" }
];

function setup() {
    let container = document.getElementById('p5-container');
    let canvas = createCanvas(container.offsetWidth, container.offsetHeight);
    canvas.parent('p5-container');

    pixelDensity(1); 
    frameRate(60); 
    
    lastWidth = width;

    textFont('Phudu');
    textAlign(CENTER, CENTER);

    for (let i = 0; i < NUM_BUBBLES; i++) {
        let b = new FoodBubble();
        b.reset(true); // true = rải đều trên màn hình lúc đầu
        bubbles.push(b);
    }
}

function draw() {
    clear(); 

    // --- XỬ LÝ BÓNG (Dùng Object Pooling) ---
    // Không dùng splice/push để tránh tạo rác bộ nhớ (nguyên nhân chính gây giật)
    for (let i = 0; i < bubbles.length; i++) {
        let b = bubbles[i];
        b.update();
        b.display();
        
        // Nếu bóng rơi khỏi màn hình, TÁI SỬ DỤNG nó bằng cách đưa lên trên cùng
        if (b.isOffScreen()) {
            b.reset(false); // false = đưa về vị trí xuất phát phía trên
        }
    }

    // --- XỬ LÝ PARTICLES ---
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].display();
        if (particles[i].isDead()) {
            particles.splice(i, 1);
        }
    }

    // --- XỬ LÝ POP TEXT ---
    for (let i = popTexts.length - 1; i >= 0; i--) {
        popTexts[i].update();
        popTexts[i].display();
        if (popTexts[i].isDead()) {
            popTexts.splice(i, 1);
        }
    }
}

function mousePressed() {
    // Check va chạm
    for (let i = 0; i < bubbles.length; i++) {
        let b = bubbles[i];
        if (b.isClicked(mouseX, mouseY)) {
            b.explode(); // Tạo hiệu ứng nổ
            b.reset(false); // Tái sinh bóng này ngay lập tức ở trên cùng (Thay vì xóa đi)
            break; // Chỉ nổ 1 quả mỗi lần click để tránh lỗi
        }
    }
}

function touchStarted() {
    mousePressed();
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        return false;
    }
}

function windowResized() {
    let container = document.getElementById('p5-container');
    if (container) {
        if (abs(windowWidth - lastWidth) > 50) {
            resizeCanvas(container.offsetWidth, container.offsetHeight);
            lastWidth = windowWidth;
        }
    }
}

// --- CLASSES ---

class FoodBubble {
    constructor() {
        // Khởi tạo các biến vector một lần duy nhất để tái sử dụng
        this.pos = createVector(0, 0);
        this.vel = createVector(0, 0);
        this.r = 0;
        this.label = "";
        this.emotion = "";
        this.angle = 0;
        this.oscSpeed = 0;
        this.xOffset = 0; 
        this.wavePhase = 0;
    }

    // Hàm Reset: Thay thế cho việc tạo object mới
    reset(startRandomY = false) {
        let data = random(foodData);
        this.label = data.name;
        this.emotion = data.emotion;
        
        this.r = random(110, 140);
        
        let x = random(width * 0.1, width * 0.9);
        // Nếu là lúc khởi đầu (setup), rải đều theo chiều dọc. 
        // Nếu là reset trong game, đặt ở trên cao hơn màn hình (-250 đến -100)
        let y = startRandomY ? random(-height * 0.2, height * 0.6) : random(-300, -150);
        
        this.pos.set(x, y);
        this.xOffset = x;
        
        // Random vận tốc và các tham số dao động
        this.vel.set(0, random(2, 4.5)); // Tốc độ rơi
        this.angle = random(TWO_PI);
        this.oscSpeed = random(0.02, 0.05);
        this.wavePhase = random(TWO_PI);
    }

    update() {
        this.pos.y += this.vel.y;
        this.pos.x = this.xOffset + sin(this.angle) * 20;
        this.angle += this.oscSpeed;
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        
        let gradient = drawingContext.createLinearGradient(-this.r, -this.r, this.r, this.r);
        gradient.addColorStop(0, '#2246FF');   
        gradient.addColorStop(0.7, '#2246FF'); 
        gradient.addColorStop(1, '#ffffff');   
        
        drawingContext.fillStyle = gradient;
        noStroke();
        
        beginShape();
        // TỐI ƯU: Tăng bước nhảy lên 0.1
        // Giảm số lượng đỉnh vẽ đi 50% giúp nhẹ máy hơn nhưng vẫn giữ độ tròn
        for (let a = 0; a < TWO_PI; a += 0.1) {
            
            let waveVal = abs(sin(a * (WAVE_COUNT / 2) + this.wavePhase + frameCount * WAVE_SPEED));
            let offset = map(waveVal, 0, 1, 0, WAVE_HEIGHT);
            
            let r = this.r + offset;
            let sx = r * cos(a);
            let sy = r * sin(a);
            vertex(sx, sy);
        }
        endShape(CLOSE);
        
        // Text
        fill(255);
        noStroke();
        textStyle(BOLD);
        textSize(this.r * 0.35);
        textLeading(this.r * 0.35);
        text(this.label, 0, 0);
        pop();
    }

    isClicked(mx, my) {
        let d = dist(mx, my, this.pos.x, this.pos.y);
        return d < this.r + WAVE_HEIGHT; 
    }

    isOffScreen() {
        return (this.pos.y > height + this.r + WAVE_HEIGHT);
    }

    explode() {
        // --- TẠM THỜI TẮT PARTICLE ---
        // for (let i = 0; i < 20; i++) {
        //     particles.push(new Particle(this.pos.x, this.pos.y, '#ffffff'));
        // }
        popTexts.push(new PopText(this.pos.x, this.pos.y, this.emotion));
    }
}

class Particle {
    constructor(x, y, color) {
        this.pos = createVector(x, y);
        this.vel = p5.Vector.random2D().mult(random(3, 9)); 
        this.color = color;
        this.size = random(8, 16); 
    }

    update() {
        this.pos.add(this.vel);
        this.vel.mult(0.95); 
        this.size -= 0.5; 
    }

    display() {
        if (this.size > 0) {
            noStroke();
            fill(this.color); 
            circle(this.pos.x, this.pos.y, this.size);
        }
    }

    isDead() {
        return this.size <= 0; 
    }
}

class PopText {
    constructor(x, y, txt) {
        this.pos = createVector(x, y);
        this.txt = txt;
        this.scale = 0;
        this.life = 40; 
        this.rotation = random(-PI / 6, PI / 6);
    }

    update() {
        this.life--;
        if (this.scale < 1.8) {
            this.scale += 0.15;
        }
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.rotation); 
        scale(this.scale);
        
        // --- TẠO MÀU GRADIENT CHO CHỮ ---
        // Sử dụng drawingContext.fillText thay vì p5 text() để tránh bị p5 override màu
        let gradient = drawingContext.createLinearGradient(0, -30, 0, 30);
        gradient.addColorStop(0, '#22FFDB');   // Xanh dương đậm ở trên
        // Xanh cyan ở giữa
        gradient.addColorStop(1, '#FFFFFF');   // Trắng ở dưới
        
        drawingContext.fillStyle = gradient;
        
        // Thiết lập Font Native Canvas (Vì dùng fillText)
        drawingContext.font = "900 60px Phudu"; // Bold Weight
        drawingContext.textAlign = "center";
        drawingContext.textBaseline = "middle";

        drawingContext.fillText(this.txt, 0, 0);
        
        pop();
    }

    isDead() {
        return this.life <= 0;
    }
}
