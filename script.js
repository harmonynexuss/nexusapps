// Neural Network Background Animation
const canvas = document.getElementById('neural-network');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = 2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            const theme = document.documentElement.getAttribute('data-theme');
            const color = theme === 'dark' ? '255, 255, 255' : '26, 26, 26';
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${color}, 0.5)`;
            ctx.fill();
        }
    }

    // Create particles
    function createParticles() {
        const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 15000), 100);
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    createParticles();
    window.addEventListener('resize', createParticles);

    // Draw connections
    function drawConnections() {
        const theme = document.documentElement.getAttribute('data-theme');
        const color = theme === 'dark' ? '255, 255, 255' : '26, 26, 26';
        const maxDistance = 150;

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.3;
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(${color}, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        drawConnections();
        animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animationFrameId);
    });
}

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') ?? 'dark';
html.setAttribute('data-theme', currentTheme);

// Toggle theme on button click
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const theme = html.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinkItems = navLinks.querySelectorAll('a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// Form submission handler for contact form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name')?.value ?? '';
        const email = document.getElementById('email')?.value ?? '';
        const message = document.getElementById('message')?.value ?? '';
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', { name, email, message });
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

