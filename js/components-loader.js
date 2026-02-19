fetch('../content/components/header.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('header-placeholder').innerHTML = html;
        updateActiveNavLink();
        setupScrollHeader();
    })

fetch('../content/components/footer.html')
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

        if (mouseY <= openGap) {
            header.style.position = 'fixed';
            main.style.marginTop = header.offsetHeight + 'px';
        }

        if (mouseY >= header.offsetHeight) {
            unlockHeader();
        }
    });

    function unlockHeader() {
        header.style.position = 'relative';
        main.style.marginTop = '0px'
    }
}

