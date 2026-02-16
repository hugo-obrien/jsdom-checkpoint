fetch('../content/components/header.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('header-placeholder').innerHTML = html;
        updateActiveNavLink();
    });

fetch('../content/components/footer.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('footer-placeholder').innerHTML = html;
    });