document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('parallaxContainer');
    const background = document.getElementById('parallaxBg');

    if (background.complete) {
        initParallax();
    } else {
        background.onload = initParallax;
    }

    function initParallax() {

        container.addEventListener('mousemove', function (e) {
            const backgroundWidth = background.width;
            const windowWidth = window.innerWidth;
            const maxOffset = (background.width - windowWidth) / 2;

            const mouseX = e.clientX;
            const normalizedMouseX = (mouseX / windowWidth) * 2 - 1;
            const invertedMouseX = - normalizedMouseX;
            const currentOffset = maxOffset * invertedMouseX;
            background.style.transform = `translateX(calc(-50% + ${currentOffset}px))`;
        });
    }
});