document.addEventListener('DOMContentLoaded', () => {
    // 1. Cursor Glow Effect
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }

    // 2. Typewriter Effect
    const typewriterElement = document.getElementById('typewriter');
    const words = [
        "agentic AI evaluation platforms.",
        "real-time WebRTC & WebSocket systems.",
        "scalable full-stack web applications.",
        "NLP & causal ML prediction models."
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 45;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 90;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = 2200; // Pause at full word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 400; // Pause before typing next
        }

        setTimeout(type, typingSpeed);
    }
    
    if (typewriterElement) {
        type();
    }

    // 3. Stats Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: "0px"
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let current = 0;
                const increment = Math.ceil(target / 40);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        entry.target.textContent = target;
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = current;
                    }
                }, 40);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => statsObserver.observe(stat));

    // 4. Mobile Menu Navigation
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinksContainer = document.getElementById('navLinks');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navLinksContainer) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
            });
        });
    }

    // 5. Skills Tab Switching
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillPanels = document.querySelectorAll('.skill-panel');

    skillTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            skillTabs.forEach(t => t.classList.remove('active'));
            skillPanels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            const targetPanel = document.getElementById(`panel-${tab.getAttribute('data-tab')}`);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // 6. Active Nav Link on Scroll (Scroll-spy)
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSectionId) {
                link.classList.add('active');
            }
        });

        // Add glass shadow to navbar on scroll
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // 7. Interactive Canvas Particles (Vibrant Sky Blue & Purple)
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 65;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 2 + 1;
                this.color = Math.random() > 0.5 ? 'rgba(56, 189, 248, 0.35)' : 'rgba(192, 132, 252, 0.3)';
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Draw connections
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.05)';
            ctx.lineWidth = 0.6;
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
                    if (dist < 130) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // 8. Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            alert(`Thank you for reaching out, ${name}! Your message has been sent successfully. I will get back to you shortly.`);
            contactForm.reset();
        });
    }
});
