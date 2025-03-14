const dampening = 0.4;
let moveAmount = 300;

function throttle(fn, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall >= delay) {
            lastCall = now;
            fn(...args);
        }
    };
}

document.querySelectorAll(".hover-image-wrapper").forEach(hero => {
    const images = hero.querySelectorAll(".hover-image-wrapper .hover-image");
    let positions = Array.from(images).map(() => ({ x: 0, y: 0, targetX: 0, targetY: 0 }));

    const handleMouseMove = (e) => {
        if (images[0].matches(':hover')) return;

        const { left, top, width, height } = hero.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        images.forEach((img, i) => {
            const factor = (i + 1) / images.length;
            positions[i].targetX = x * moveAmount * factor;
            positions[i].targetY = y * moveAmount * factor;
        });
    };

    const throttledHandleMouseMove = throttle(handleMouseMove, 30);

    hero.addEventListener("mousemove", throttledHandleMouseMove);

    function animate() {
        images.forEach((img, i) => {
            positions[i].x += (positions[i].targetX - positions[i].x) * dampening;
            positions[i].y += (positions[i].targetY - positions[i].y) * dampening;

            img.style.transform = `translate(${positions[i].x}px, ${positions[i].y}px)`;
        });

        requestAnimationFrame(animate);
    }

    hero.addEventListener("mouseleave", () => {
        positions.forEach((pos) => {
            pos.targetX = 0;
            pos.targetY = 0;
        });
    });

    animate(); 
});