const heroImages = document.querySelectorAll(".hero-image");
let dampening = 0.2;
let moveAmount = 200;

let positions = Array.from(heroImages).map(() => ({ x: 0, y: 0, targetX: 0, targetY: 0 }));

heroImages.forEach((image, i) => {
    image.addEventListener("mousemove", (e) => {
        let { left, top, width, height } = image.getBoundingClientRect();
        let x = (e.clientX - (left + width / 2)) / width;
        let y = (e.clientY - (top + height / 2)) / height;
        
        positions[i].targetX = x * moveAmount;
        positions[i].targetY = y * moveAmount;
    });

    image.addEventListener("mouseleave", () => {
        positions[i].targetX = 0;
        positions[i].targetY = 0;
    });
});

function animate() {
    heroImages.forEach((image, i) => {
        positions[i].x += (positions[i].targetX - positions[i].x) * dampening;
        positions[i].y += (positions[i].targetY - positions[i].y) * dampening;
        image.style.transform = `translate(${positions[i].x}px, ${positions[i].y}px)`;
    });
    requestAnimationFrame(animate);
}
animate();