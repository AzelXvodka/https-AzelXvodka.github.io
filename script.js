     window.addEventListener('load', () => {
            const loader = document.getElementById('loader');
            gsap.to(loader, { opacity: 0, duration: 0.5, delay: 0.5, onComplete: () => loader.style.display = 'none' });
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                gsap.to(window, { scrollTo: this.getAttribute('href'), duration: 1.5, ease: "power3.inOut" });
            });
        });

        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            gsap.fromTo(".nav-links a", { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 });
        });

        const text = "ولکانو سیتی";
        let index = 0;
        const typingText = document.getElementById('typing-text');
        function type() {
            if (index < text.length) {
                typingText.textContent += text.charAt(index);
                index++;
                setTimeout(type, 200);
            }
        }
        type();

        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            gsap.to('.hero', { backgroundPositionY: scrollPosition * 0.6, duration: 0 });
        });

        gsap.utils.toArray('.section').forEach(section => {
            gsap.from(section, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                }
            });
        });

        gsap.utils.toArray('.feature-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { scale: 1.05, rotationX: 10, rotationY: 10, duration: 0.4, ease: "elastic.out(1, 0.3)" });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { scale: 1, rotationX: 0, rotationY: 0, duration: 0.4, ease: "power2.out" });
            });
        });

        const canvas = document.getElementById('particles');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const particlesArray = [];
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 5 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.size > 0.2) this.size -= 0.1;
            }
            draw() {
                ctx.fillStyle = 'rgba(255, 98, 0, 0.8)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        function initParticles() {
            for (let i = 0; i < 30; i++) {
                particlesArray.push(new Particle());
            }
        }
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
                particlesArray[i].draw();
                if (particlesArray[i].size <= 0.2) {
                    particlesArray.splice(i, 1);
                    i--;
                    particlesArray.push(new Particle());
                }
            }
            requestAnimationFrame(animateParticles);
        }
        initParticles();
        animateParticles();
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });