let clicked = false;
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
    }, Math.floor(Math.random() * 2000) + 500);
    
});

function fall(circle) {

    circle.y += 10;
    if (clicked){
        circle.y += document.body.scrollHeight;
    }
    if (circle.y <= document.body.scrollHeight) {
        circle.el.style.transform = `translate(${circle.x}px, ${circle.y}px) rotate(${circle.r}deg)`;
        requestAnimationFrame(() => fall(circle));
    }
    if (circle.y >= document.body.scrollHeight - 100) {
        circle.el.style.display = 'none';
    }
}

document.addEventListener('click', (e) => {
    clicked = true;
});

document.querySelector('.carousel-control-prev').addEventListener('click', (e) => {
    console.log( document.querySelector('.carousel-item.active video'))
    document.querySelector('.carousel-item.active video').play();
})
document.querySelector('.carousel-control-next').addEventListener('click', (e) => {
    
    const current =  document.querySelector('.carousel-item.active video');
    current.pause();
    current.currentTime = 0;

    setTimeout(() => {
        const newCurrent =  document.querySelector('.carousel-item.active video');
        newCurrent.currentTime = 0;
        newCurrent.play();
    }, 1000)
})

const targetNodes = document.querySelectorAll('.carousel-item');
class ClassWatcher {

    constructor(targetNode, classToWatch, classAddedCallback, classRemovedCallback) {
        this.targetNode = targetNode
        this.classToWatch = classToWatch
        this.classAddedCallback = classAddedCallback
        this.classRemovedCallback = classRemovedCallback
        this.observer = null
        this.lastClassState = targetNode.classList.contains(this.classToWatch)

        this.init()
    }

    init() {
        this.observer = new MutationObserver(this.mutationCallback)
        this.observe()
    }

    observe() {
        this.observer.observe(this.targetNode, { attributes: true })
    }

    disconnect() {
        this.observer.disconnect()
    }

    mutationCallback = mutationsList => {
        for(let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                let currentClassState = mutation.target.classList.contains(this.classToWatch)
                if(this.lastClassState !== currentClassState) {
                    this.lastClassState = currentClassState
                    if(currentClassState) {
                        this.classAddedCallback()
                    }
                    else {
                        this.classRemovedCallback()
                    }
                }
            }
        }
    }
}

targetNodes.forEach(targetNode => {
    window.addEventListener('scroll', () => {
        const carousel = document.querySelector('#carouselExampleControls');
        if (!isScrolledIntoView(carousel)) {
            targetNode.querySelector('video').pause();
        } else {
            targetNode.querySelector('#carouselExampleControls .active video')?.play();
        }
    });
const classWatcher = new ClassWatcher( targetNode, 'active', () => {

    const video = targetNode.querySelector('video');
    video.currentTime = 0;
    video.play();
}, () => {
    const video = targetNode.querySelector('video');
    video.currentTime = 0;
    video.pause();
});
})

function isScrolledIntoView(el) {
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
}