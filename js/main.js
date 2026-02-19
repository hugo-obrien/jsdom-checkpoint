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
    setupSmoothScroll();

    console.log('Vain labor site initialized');
}

document.addEventListener('DOMContentLoaded', initApp);

window.VainLabor = {
    modalManager: modalManager,
};