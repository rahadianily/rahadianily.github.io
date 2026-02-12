// Back to top button logic
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// Smooth Scrolling for navigation
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 70, // Offset agar tidak tertutup navbar
            behavior: 'smooth'
        });
    });
});

// Particle/Bubble Effect
class Particle {
    constructor(x, y) {
        this.initialLifeSpan = Math.floor(Math.random() * 60 + 60);
        this.lifeSpan = this.initialLifeSpan;
        this.velocity = {
            x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 10),
            y: -0.4 + Math.random() * -1,
        };
        this.position = { x, y };
        this.baseDimension = 4;
    }

    update(context) {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.velocity.x += ((Math.random() < 0.5 ? -1 : 1) * 2) / 75;
        this.velocity.y -= Math.random() / 600;
        this.lifeSpan--;
        const scale = 0.2 + (this.initialLifeSpan - this.lifeSpan) / this.initialLifeSpan;

        context.fillStyle = '#e6f1f7';
        context.strokeStyle = '#00d4ff';
        context.beginPath();
        context.arc(
            this.position.x,
            this.position.y,
            this.baseDimension * scale,
            0,
            2 * Math.PI
        );
        context.stroke();
        context.fill();
        context.closePath();
    }
}

const canvas = document.getElementById('bubble-canvas');
const context = canvas.getContext('2d');
let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resize);
resize();

window.addEventListener('mousemove', (e) => {
    particles.push(new Particle(e.clientX, e.clientY));
});

function loop() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update(context);
    }

    particles = particles.filter(p => p.lifeSpan > 0);
    requestAnimationFrame(loop);
}

loop();

// Random Stoic Quotes Logic
const quotes = [
    "Hambatan adalah jalan. - Marcus Aurelius",
    "Kendalikan apa yang bisa kamu kendalikan. - Epictetus",
    "Kita menderita lebih sering dalam imajinasi daripada dalam kenyataan. - Seneca"
];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
document.querySelector('.bio-quote p').innerText = randomQuote;

// Contact Form Handling with SweetAlert2
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    Swal.fire({
        title: 'Mengirim Pesan...',
        text: 'Mohon tunggu sebentar wakk...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Pesan Terkirim!',
                text: 'Terima kasih, Rahadian akan segera membalas pesanmu.',
                background: '#0f1629',
                color: '#e0e0ff',
                confirmButtonColor: '#00d4ff'
            });
            contactForm.reset();
        } else {
            throw new Error();
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Waduh Gagal!',
            text: 'Sepertinya ada masalah koneksi. Coba lagi nanti ya.',
            background: '#0f1629',
            color: '#e0e0ff'
        });
    }
});

// Logic untuk Scroll Reveal 
const observerOptions = {
    threshold: 0.1 // 10% elemen terlihat, efek langsung jalan
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Daftarkan semua elemen yang memiliki class 'reveal'
document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el);
});