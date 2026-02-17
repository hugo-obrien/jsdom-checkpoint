function updateActiveNavLink() {
    console.log("Update active nav link called");
    const navItems = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;

    navItems.forEach(item => {
        let linkPath = (new URL(item.href)).pathname;

        console.log('link path: ' + linkPath + ', current path: ' + currentPath);

        if (linkPath === currentPath
            || (linkPath.endsWith('/index.html') && currentPath.endsWith('/'))) {
            console.log('Match!')
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    })
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: 'smooth'
                })
            }
        });
    })
}

/*function setupFormHandlers() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            alert("Данные отправлены (на самом деле нет, но мы работаем над этим)");
            this.reset();
        })
    })
}*/

class ModalManager {
    constructor() {
        this.modal = null;
    }

    open(content) {
        this.modal = document.createElement('div')
        this.modal.className = 'modal-overlay';
        this.modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <div clas="modal-body">${content}</div>
            </div>
        `;

        document.body.appendChild(this.modal);

        this.modal.querySelector('.modal-close').addEventListener('click', () => {
            this.close();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.close();
            }
        });
    }

    close() {
        if (this.modal) {
            this.modal.remove();
            this.modal = null;
        }
    }
}

const modalManager = new ModalManager();

function initApp() {
    updateActiveNavLink();
    setupSmoothScroll();
    setupFormHandlers();

    const demoBtn = document.getElementById('demo-modal');
    if (demoBtn) {
        demoBtn.addEventListener('click', (e) => {
            modalManager.open('<h2>Hello world!</h2><p>This is the kind of modal window</p>');
        })
    }

    console.log('Vain labor site initialized');
}

document.addEventListener('DOMContentLoaded', initApp);

window.VainLabor = {
    modalManager: modalManager,
    updateNav: updateActiveNavLink
};