/* ============================================================
   1. ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ
   ============================================================ */
const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

/* ============================================================
   2. КОРЗИНА (счётчик + / -)
   ============================================================ */
const cartCountEl = document.getElementById('cartCount');
let cartCount = 0;

function updateCart(delta) {
    cartCount = Math.max(0, cartCount + delta);
    cartCountEl.textContent = cartCount;

    cartCountEl.classList.add('bump');
    setTimeout(() => cartCountEl.classList.remove('bump'), 250);
}

document.querySelectorAll('.btn--buy').forEach((btn) => {
    btn.addEventListener('click', () => {
        if (btn.dataset.action === 'add') {
            updateCart(1);
            btn.textContent = 'Убрать';
            btn.classList.add('is-removed');
            btn.dataset.action = 'remove';
        } else {
            updateCart(-1);
            btn.textContent = 'В корзину';
            btn.classList.remove('is-removed');
            btn.dataset.action = 'add';
        }
    });
});

/* ============================================================
   3. СЛАЙДЕР (интерактивный элемент)
   ============================================================ */
const track  = document.getElementById('sliderTrack');
const slides = track.querySelectorAll('.slider__slide');
const dotsEl = document.getElementById('sliderDots');
let current  = 0;

slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
});

const dots = dotsEl.querySelectorAll('span');

function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
}

document.getElementById('sliderPrev').addEventListener('click', () => goTo(current - 1));
document.getElementById('sliderNext').addEventListener('click', () => goTo(current + 1));

let auto = setInterval(() => goTo(current + 1), 5000);

const sliderEl = document.getElementById('slider');
sliderEl.addEventListener('mouseenter', () => clearInterval(auto));
sliderEl.addEventListener('mouseleave', () => {
    auto = setInterval(() => goTo(current + 1), 5000);
});

/* ============================================================
   4. ФОРМА (5 вопросов) + валидация
   ============================================================ */
const form = document.getElementById('quizForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name   = form.name.value.trim();
    const email  = form.email.value.trim();
    const forWhom = form.forWhom.value;
    const theme  = form.querySelector('input[name="theme"]:checked');
    const budget = form.budget.value;

    if (!name || !email || !forWhom || !theme || !budget) {
        formMessage.textContent = 'Пожалуйста, ответьте на все пять вопросов';
        formMessage.className = 'form__message error';
        return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
        formMessage.textContent = 'Проверьте корректность email';
        formMessage.className = 'form__message error';
        return;
    }

    formMessage.textContent = `Спасибо, ${name}! Подборка уже летит на ${email}.`;
    formMessage.className = 'form__message success';
    form.reset();
});