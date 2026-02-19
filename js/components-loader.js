fetch('content/components/header.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('header-placeholder').innerHTML = html;
        updateActiveNavLink();
        setupScrollHeader();
    });

fetch('content/components/footer.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('footer-placeholder').innerHTML = html;
    });

function updateActiveNavLink() {
    const navItems = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;

    navItems.forEach(item => {
        let linkPath = (new URL(item.href)).pathname;


        if (linkPath === currentPath
            || (linkPath.endsWith('/index.html') && currentPath.endsWith('/'))) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    })
}

function setupScrollHeader() {
    let header = document.querySelector('.header');
    const main = document.querySelector('.main');

    const openGap = 15;

    let isAnimating = false;
    let isShown = false;

    window.addEventListener('scroll', () => {

        let currentScroll = window.scrollY;
        if (currentScroll === 0) {
            unlockHeader();
        }
    });

    document.addEventListener('mousemove', function (e) {
        if (window.scrollY < header.offsetHeight) {
            return;
        }
        const mouseY = e.clientY;

        if (mouseY <= openGap && !isAnimating && !isShown) {
            prepareShow().then(() => {
                header.style.transition = 'transform 0.4s ease-in';
                header.style.transform = 'translateX(0)';
                isAnimating = true;

                setTimeout(() => {
                    isAnimating = false;
                    isShown = true;
                }, 400);
            })
        }

        if (mouseY >= header.offsetHeight && !isAnimating && isShown) {
            prepareHide().then(() => {
                unlockHeader();
            })
        }
    });

    function unlockHeader() {
        header.style.position = 'relative';
        main.style.marginTop = '0px'
        header.style.transform = 'translateY(0)';
    }

    async function prepareShow() {
        header.style.transition = 'none';
        header.style.position = 'fixed';
        header.style.transform = 'translateY(-100%)';
        main.style.marginTop = header.offsetHeight + 'px';
    }

    async function prepareHide() {
        header.style.transform = 'translateY(-100%)';
        isAnimating = true;

        return new Promise(resolve => {
            setTimeout(() => {
                isAnimating = false;
                isShown = false;
                header.style.transition = 'none';
                resolve();
            }, 400);
        });
    }
}

