function createCircle() {
    const el = document.createElement('div');
    el.classList.add('circle');
    el.innerHTML = `
    <div class="logo1">
            <div class="b">B</div>
            <div class="f">F</div>
          </div>
    `;
    return el;
}

let x = -100;
let y = -100;
let i = 0;
let radiusOptions = [
    0,
    20,
    -20,
    40,
    -40,
    60,
    -60,
]

const circles = [
    
]

while(y < document.body.scrollHeight) {
    const r = i % radiusOptions.length;
    circles.push({ 
        x: x + Math.random() * 20 - 10,
        y: y + Math.random() * 20 - 10, 
        r: radiusOptions[
            r
        ],
        el: createCircle(),
        type: Math.random() > 0.3 ? 'circle3' : 'circle2',
        z: r === 0 ?  200 : Math.floor(Math.random() * 3) + 1
    });
    if (x > window.innerWidth){
        y += 180;
        x = -180;
    }
    if (r === 0) {
        
    }
    x += 150;
    i++;
}


circles.forEach(circle => {
    circle.el.style.transform = `translate(${circle.x}px, ${circle.y}px) rotate(${circle.r}deg)`;
    circle.el.style.zIndex = circle.z;
    document.body.appendChild(circle.el);
    circle.el.classList.add(circle.type,)
    circle.el.classList.add('circle-fall');
    setTimeout(() => {
        fall(circle);
    }, Math.floor(Math.random() * 2000) + 1000);
    
});

function fall(circle) {
    circle.y += 10;
    if (circle.y <= document.body.scrollHeight) {
        circle.el.style.transform = `translate(${circle.x}px, ${circle.y}px) rotate(${circle.r}deg)`;
        requestAnimationFrame(() => fall(circle));
    }
    if (circle.y >= document.body.scrollHeight - 100) {
        circle.el.style.display = 'none';
    }
}