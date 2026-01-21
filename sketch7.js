
// --- VARIABLES ---
let smokeParticles = [];
let textParticles = []; 
const chars = ["N", "G", "U", "Ồ", "N", "C", "Ộ", "I", "T", "R", "I", "Â", "N", "NH", "Ớ"];

// --- CẤU HÌNH ANIMATION (ĐIỀU CHỈNH TẠI ĐÂY) ---
const ANIM_CONFIG = {
    // 1. BAY LÊN
    FLY_UP_FORCE: 0.06,      // Lực đẩy bay lên (Càng lớn bay càng nhanh)
    INITIAL_VEL_MIN: -0,     // Vận tốc nảy lên tối thiểu ban đầu
    INITIAL_VEL_MAX: -1,     // Vận tốc nảy lên tối đa ban đầu
    
    // 2. TẢN RA 2 BÊN (MỚI)
    SCATTER_FORCE: 2.0,      // Độ tản ra 2 bên (Số càng lớn càng tản rộng)

    // 3. MỜ DẦN (FADE OUT)
    FADE_SPEED: 2.0,         // Độ trong suốt giảm mỗi khung hình (Càng lớn -> mờ càng nhanh)
                             // Ví dụ: 2.0 = khoảng 2 giây là mất hẳn (ở 60fps)

    // 4. THU NHỎ (SHRINK)
    SHRINK_FACTOR: 0.94,     // Tỉ lệ thu nhỏ mỗi khung hình (0.0 -> 1.0)
                             // 1.0 = Giữ nguyên kích thước
                             // 0.95 = Thu nhỏ rất nhanh
                             // 0.99 = Thu nhỏ từ từ
    
    // 5. LỰC CẢN
    DRAG: 0.96               // Lực cản không khí (0.9 -> 1.0). Giúp chữ không bay quá loạn xạ.
};

// --- CẤU HÌNH SỐ LƯỢNG KHÓI NHANG ---
const SMOKE_RATE = 45; 
const PARTICLES_PER_WAVE = 1; 

// Mảng chứa các object Emitter (đầu nhang)
let emitters = [];

// Logic chuyển đổi state
let currentState = 1;
const switchInterval = 6000; 

function setup() {
    let container = document.getElementById('p5-container');
    let canvas = createCanvas(container.offsetWidth, container.offsetHeight);
    canvas.parent('p5-container');
    
    textFont('Arial'); 
    textAlign(CENTER, CENTER);
    
    calculateEmitters();
    
    setInterval(toggleContent, switchInterval);
}

function draw() {
    clear(); 
    
    // 1. SMOKE (Khói từ nhang - Giữ nguyên không đổi)
    for (let em of emitters) {
        if (frameCount >= em.nextEmit) {
            for (let k = 0; k < PARTICLES_PER_WAVE; k++) {
                let x = em.pos.x + random(-2, 2);
                let y = em.pos.y;
                smokeParticles.push(new SmokeParticle(x, y));
            }
            let variance = SMOKE_RATE * 0.3; 
            em.nextEmit = frameCount + SMOKE_RATE + random(-variance, variance);
        }
    }
    
    for (let i = smokeParticles.length - 1; i >= 0; i--) {
        let p = smokeParticles[i];
        p.update();
        p.display();
        if (p.isDead()) smokeParticles.splice(i, 1);
    }

    // 2. TEXT PARTICLES (Chữ bay lên)
    for (let i = textParticles.length - 1; i >= 0; i--) {
        let p = textParticles[i];
        p.update();
        p.display();
        if (p.isDead()) textParticles.splice(i, 1);
    }
}

function windowResized() {
    let container = document.getElementById('p5-container');
    if (container) {
        resizeCanvas(container.offsetWidth, container.offsetHeight);
        calculateEmitters();
    }
}

function calculateEmitters() {
    let centerX = width / 2;
    let scaleFactor = 1;
    let wrapperBottom = 50; 
    
    if (width <= 768) {
        scaleFactor = 0.7;
        wrapperBottom = 50; 
    }

    let rootY = height - wrapperBottom;
    let hCenter = 130 * scaleFactor;
    let hSide = 130 * scaleFactor;
    
    emitters = [];

    function createEmitter(x, y) {
        return {
            pos: createVector(x, y),
            nextEmit: frameCount + random(0, SMOKE_RATE) 
        };
    }
    
    emitters.push(createEmitter(centerX, rootY - hCenter));
    
    let leftOffset = 15 * scaleFactor;
    let leftBaseX = centerX - leftOffset;
    let leftTipX = leftBaseX + hSide * sin(radians(-15));
    let leftTipY = rootY - hSide * cos(radians(-15));
    emitters.push(createEmitter(leftTipX, leftTipY));
    
    let rightOffset = 10 * scaleFactor;
    let rightBaseX = centerX + rightOffset;
    let rightTipX = rightBaseX + hSide * sin(radians(15));
    let rightTipY = rootY - hSide * cos(radians(15));
    emitters.push(createEmitter(rightTipX, rightTipY));
}

// --- LOGIC CHUYỂN ĐỔI ---
function toggleContent() {
    const el1 = document.getElementById('state-1');
    const el2 = document.getElementById('state-2');
    
    let activeEl = (currentState === 1) ? el1 : el2;
    
    // Bước 1: Tạo hạt chữ từ nội dung đang hiển thị
    createParticlesFromText(activeEl);

    // Bước 2: Chuyển đổi class CSS
    if (currentState === 1) {
        el1.classList.remove('active');
        el2.classList.add('active');
        currentState = 2;
    } else {
        el2.classList.remove('active');
        el1.classList.add('active');
        currentState = 1;
    }
}

// --- HÀM TẠO PARTICLE TỪ DOM TEXT ---
function createParticlesFromText(element) {
    const containerRect = document.getElementById('p5-container').getBoundingClientRect();
    
    let walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    let node;
    
    while(node = walker.nextNode()) {
        let str = node.nodeValue;
        if(str.trim().length === 0) continue;

        let parentStyle = window.getComputedStyle(node.parentElement);
        let fontStyle = parentStyle.fontStyle; 
        let fontWeight = parentStyle.fontWeight;
        let fontSize = parseFloat(parentStyle.fontSize);
        
        let fontFamily = 'aktiv-grotesk-extended';
        if (fontSize > 30) fontFamily = 'Phudu';

        let range = document.createRange();
        for(let i = 0; i < str.length; i++) {
            let char = str[i];
            if(char === ' ' || char === '\n') continue;

            range.setStart(node, i);
            range.setEnd(node, i+1);
            let rect = range.getBoundingClientRect();

            let x = rect.left - containerRect.left + rect.width/2; 
            let y = rect.top - containerRect.top + rect.height/2;

            textParticles.push(new TextAshParticle(x, y, char, fontSize, fontWeight, fontStyle, fontFamily));
        }
    }
}

// --- CLASS: SMOKE PARTICLE (Khói từ nhang) ---
class SmokeParticle {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(random(-0.3, 0.3), random(-1.5, -2.5));
        this.acc = createVector(0, 0);
        this.alpha = 200; 
        
        this.char = random(chars); 
        this.size = random(14, 26); 
        this.xOff = random(1000); 
        this.font = 'Phudu'; 
    }
    
    update() {
        this.xOff += 0.01;
        let wind = map(noise(this.xOff), 0, 1, -0.5, 0.5);
        this.acc.x = wind;
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        
        this.alpha -= 0.8; 
        this.size += 0.05; 
        
        this.acc.mult(0);
    }
    
    display() {
        noStroke();
        fill(255, 255, 255, this.alpha);
        textFont(this.font);
        textStyle(NORMAL);
        textSize(this.size);
        text(this.char, this.pos.x, this.pos.y);
    }
    
    isDead() { return this.alpha <= 0; }
}

// --- CLASS: TEXT ASH PARTICLE (Chữ bay lên) ---
class TextAshParticle {
    constructor(x, y, char, size, weight, style, font) {
        this.pos = createVector(x, y);
        this.char = char;
        
        // Sử dụng CONFIG cho vận tốc ban đầu
        this.vel = createVector(
            random(-ANIM_CONFIG.SCATTER_FORCE, ANIM_CONFIG.SCATTER_FORCE), // X: Tản ra 2 bên
            random(ANIM_CONFIG.INITIAL_VEL_MAX, ANIM_CONFIG.INITIAL_VEL_MIN) // Y: Bay lên
        );
        
        this.size = size;
        this.initialSize = size;
        
        this.weight = (weight === '700' || weight === '900' || weight === 'bold') ? BOLD : NORMAL;
        this.style = (style === 'italic') ? ITALIC : NORMAL;
        this.fontFamily = font;

        this.alpha = 255;
    }

    update() {
        // Cộng vận tốc vào vị trí
        this.pos.add(this.vel);
        
        // Áp dụng lực cản
        this.vel.mult(ANIM_CONFIG.DRAG); 
        
        // Áp dụng lực bay lên (Gia tốc hướng lên)
        this.vel.y -= ANIM_CONFIG.FLY_UP_FORCE; 
        
        // 1. Xử lý FADE OUT
        this.alpha -= ANIM_CONFIG.FADE_SPEED; 
        if (this.alpha < 0) this.alpha = 0;

        // 2. Xử lý SHRINK (Thu nhỏ)
        // Nhân size hiện tại với hệ số thu nhỏ (Ví dụ size * 0.98 sẽ nhỏ dần đều)
        this.size *= ANIM_CONFIG.SHRINK_FACTOR;
        
        if (this.size < 0) this.size = 0;
    }

    display() {
        noStroke();
        fill(255, 255, 255, this.alpha);
        
        textFont(this.fontFamily);
        textStyle(this.style);
        if (this.weight === BOLD) textStyle(BOLD); 
        
        textSize(this.size);
        text(this.char, this.pos.x, this.pos.y);
    }

    isDead() { return this.alpha <= 0 || this.size < 0.5; }
}
