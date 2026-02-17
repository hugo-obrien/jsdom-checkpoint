const leftLayer = document.querySelector('.parallax-layer.left');
const rightLayer = document.querySelector('.parallax-layer.right');

function parallaxEffect(e) {
    const cursorX = e.clientX;
    const cursorY = e.clientY;

    const windowWidth = window.innerWidth;
    const normalizedX = cursorX / windowWidth;

    const strength = 20;
    const leftOffsetX = -strength * normalizedX;
    const rightOffsetX = strength * (1 - normalizedX);

    leftLayer.style.transform = `translateX(${leftOffsetX}px)`;
    rightLayer.style.transform = `translateX(${rightOffsetX}px)`;
}

document.addEventListener('mousemove', parallaxEffect);
document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    parallaxEffect(touch);
});