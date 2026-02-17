function animateOnScroll() {
    const elements = document.querySelectorAll("[data-anim]");

    const checkPosition = () => {
        elements.forEach(el => {
            const elementPosition = el.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                el.classList.add(el.dataset.anim);
            }
        })
    }

    checkPosition();
    window.addEventListener("scroll", checkPosition);
}

function setupButtonAnimation() {
    const button = document.getElementById("cta-button");

    if (button) {
        button.addEventListener("mouseover", () => {
            button.style.transform = 'scale(1.05)';
        });

        button.addEventListener("mouseout", () => {
            button.style.transform = 'scale(1)';
        })

        button.addEventListener("click", (e) => {
            button.style.backgroundColor = '#0056b3'
            setTimeout(() => {
                button.style.backgroundColor = '#00a8ff';
            }, 300);
        })
    }
}

function setupKeyboardControls() {
    document.addEventListener("keydown", (e) => {
        if (e.key === 'e' || e.key === 'E') {
            const button = document.getElementById("cta-button");
            if (button) {
                button.click();
                alert('Добро пожаловать в мир Vain Labor!')
            }
        }

        if (e.key === 'ArrowRight') {
            window.location.href = 'games.html'
        }

        if (e.key === 'ArrowLeft') {
            window.location.href = 'about.html';
        }
    });
}

function setupHoverEffects() {
    const cards = document.querySelectorAll('.feature-card, .game-card, .member');

    cards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.2)';
            card.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseout', () => {
            card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            card.style.transform = 'translateY(0)';
        });
    });
}

function setupScrollHeader() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > lastScroll && currentScroll > 100) {
            // Прокрутка вниз — скрываем заголовок
            header.style.transform = 'translateY(-100%)';
        } else {
            // Прокрутка вверх — показываем заголовок
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    setupButtonAnimation();
    setupKeyboardControls();
    setupHoverEffects();
    setupScrollHeader();
});