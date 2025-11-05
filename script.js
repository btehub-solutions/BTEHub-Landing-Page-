// ===========================
// Ultra-Modern JavaScript - BTEHub Solutions
// Enhanced Interactions & Animations with AI Effects
// ===========================

// ===========================
// Neural Network Canvas Animation
// ===========================
const neuralCanvas = document.getElementById('neuralCanvas');
if (neuralCanvas) {
    const ctx = neuralCanvas.getContext('2d');
    let nodes = [];
    let animationId;
    
    // Set canvas size
    function resizeCanvas() {
        neuralCanvas.width = neuralCanvas.offsetWidth;
        neuralCanvas.height = neuralCanvas.offsetHeight;
        initNodes();
    }
    
    // Initialize nodes
    function initNodes() {
        nodes = [];
        const nodeCount = Math.floor((neuralCanvas.width * neuralCanvas.height) / 15000);
        
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * neuralCanvas.width,
                y: Math.random() * neuralCanvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }
    
    // Draw neural network
    function drawNeuralNetwork() {
        ctx.clearRect(0, 0, neuralCanvas.width, neuralCanvas.height);
        
        // Update and draw nodes
        nodes.forEach((node, i) => {
            // Update position
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x < 0 || node.x > neuralCanvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > neuralCanvas.height) node.vy *= -1;
            
            // Draw node
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(6, 182, 212, 0.6)';
            ctx.fill();
            
            // Draw connections
            nodes.forEach((otherNode, j) => {
                if (i !== j) {
                    const dx = node.x - otherNode.x;
                    const dy = node.y - otherNode.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        const opacity = (1 - distance / 150) * 0.3;
                        ctx.strokeStyle = `rgba(6, 182, 212, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            });
        });
        
        animationId = requestAnimationFrame(drawNeuralNetwork);
    }
    
    // Initialize
    resizeCanvas();
    drawNeuralNetwork();
    
    // Handle resize
    window.addEventListener('resize', resizeCanvas);
}

// ===========================
// Particle System
// ===========================
const particlesContainer = document.getElementById('particlesContainer');
if (particlesContainer) {
    function createParticles() {
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random animation values
            const tx = (Math.random() - 0.5) * 200;
            const ty = (Math.random() - 0.5) * 200;
            particle.style.setProperty('--tx', tx + 'px');
            particle.style.setProperty('--ty', ty + 'px');
            
            // Random delay
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            
            particlesContainer.appendChild(particle);
        }
    }
    
    createParticles();
}

// ===========================
// AI Stats Counter Animation
// ===========================
function animateAICounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target < 100 ? '+' : '%');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target < 100 ? '+' : '%');
        }
    }, 16);
}

// Observe AI stats
const aiStatObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateAICounter(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item-ai .stat-value').forEach(stat => {
    aiStatObserver.observe(stat);
});

// ===========================
// Theme Toggle - Dark/Light Mode
// ===========================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Toggle theme function
function toggleTheme() {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Re-initialize Lucide icons after theme change
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Add click event listener to theme toggle button
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// ===========================
// Smooth Scrolling for Navigation Links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 90;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            navLinks.classList.remove('active');
            
            // Update active nav link
            updateActiveNavLink(this);
        }
    });
});

// ===========================
// Mobile Menu Toggle
// ===========================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        navLinks.classList.remove('active');
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
        }
    }
});

// ===========================
// Active Navigation Link on Scroll
// ===========================
function updateActiveNavLink(clickedLink = null) {
    const navLinksElements = document.querySelectorAll('.nav-link');
    
    if (clickedLink) {
        navLinksElements.forEach(link => link.classList.remove('active'));
        clickedLink.classList.add('active');
    } else {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.pageYOffset + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksElements.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ===========================
// Enhanced Fade-in Animation on Scroll
// ===========================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// ===========================
// Header Scroll Effect - Transparent to Solid
// ===========================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class for enhanced shadow
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Update active nav link
    updateActiveNavLink();

    lastScroll = currentScroll;
});

// ===========================
// Service Cards Stagger Animation
// ===========================
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
});

// ===========================
// Stat Cards Animation
// ===========================
const statCards = document.querySelectorAll('.stat-card');
statCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// ===========================
// Number Counter Animation for Stats
// ===========================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Observe stat numbers for counter animation
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            
            if (!isNaN(number)) {
                entry.target.textContent = '0+';
                animateCounter(entry.target, number);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statObserver.observe(stat);
});

// ===========================
// Smooth Page Load Animation
// ===========================
window.addEventListener('load', () => {
    // Trigger initial fade-in for hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('visible');
        }, 200);
    }
    
    // Initialize page with smooth fade
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===========================
// Parallax Effect for Hero Background
// ===========================
const heroBackground = document.querySelector('.hero-background');
if (heroBackground) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    });
}

// ===========================
// Button Ripple Effect
// ===========================
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===========================
// Icon Hover Animation Enhancement
// ===========================
document.querySelectorAll('.service-icon, .contact-icon, .social-link').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ===========================
// Lazy Load Optimization
// ===========================
if ('IntersectionObserver' in window) {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('loaded');
                lazyObserver.unobserve(element);
            }
        });
    });
    
    lazyElements.forEach(element => lazyObserver.observe(element));
}

// ===========================
// Performance: Debounce Scroll Events
// ===========================
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll-heavy operations
const debouncedScroll = debounce(() => {
    updateActiveNavLink();
}, 50);

window.addEventListener('scroll', debouncedScroll);

// ===========================
// Testimonial Card Tilt Effect
// ===========================
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===========================
// Pricing Card Comparison Highlight
// ===========================
const pricingCards = document.querySelectorAll('.pricing-card');
pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        pricingCards.forEach(c => {
            if (c !== this) {
                c.style.opacity = '0.6';
            }
        });
    });
    
    card.addEventListener('mouseleave', function() {
        pricingCards.forEach(c => {
            c.style.opacity = '1';
        });
    });
});

// ===========================
// Client Logo Rotation Animation
// ===========================
const clientLogos = document.querySelectorAll('.client-logo img');
clientLogos.forEach((logo, index) => {
    logo.style.animationDelay = `${index * 0.1}s`;
});

// ===========================
// Star Rating Animation
// ===========================
const starRatings = document.querySelectorAll('.testimonial-rating');
const starObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const stars = entry.target.querySelectorAll('i');
            stars.forEach((star, index) => {
                setTimeout(() => {
                    star.style.animation = 'starPop 0.5s ease forwards';
                }, index * 100);
            });
        }
    });
}, { threshold: 0.5 });

starRatings.forEach(rating => starObserver.observe(rating));

// Add star animation CSS
const starStyle = document.createElement('style');
starStyle.textContent = `
    @keyframes starPop {
        0% {
            transform: scale(0);
            opacity: 0;
        }
        50% {
            transform: scale(1.3);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    .testimonial-rating i {
        display: inline-block;
        transform: scale(0);
        opacity: 0;
    }
    
    .testimonial-rating.animated i {
        opacity: 1;
    }
`;
document.head.appendChild(starStyle);

// ===========================
// Smooth Scroll to Pricing from CTA
// ===========================
document.querySelectorAll('a[href="#pricing"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const pricingSection = document.querySelector('#pricing');
        if (pricingSection) {
            pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Highlight featured card
            setTimeout(() => {
                const featuredCard = document.querySelector('.pricing-card.featured');
                if (featuredCard) {
                    featuredCard.style.animation = 'pulse 1s ease';
                }
            }, 500);
        }
    });
});

// Pulse animation for featured pricing card
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1.05);
        }
        50% {
            transform: scale(1.1);
        }
    }
`;
document.head.appendChild(pulseStyle);

// ===========================
// Image Lazy Loading with Fade In
// ===========================
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.6s ease';
            
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
            
            // If image is already loaded
            if (img.complete) {
                img.style.opacity = '1';
            }
            
            imageObserver.unobserve(img);
        }
    });
}, { threshold: 0.1 });

images.forEach(img => imageObserver.observe(img));

// ===========================
// Interactive Pricing Features Highlight
// ===========================
document.querySelectorAll('.pricing-features li').forEach(feature => {
    feature.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(8px)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    feature.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// ===========================
// Carousel Functionality
// ===========================
class Carousel {
    constructor(container) {
        this.container = container;
        this.track = container.querySelector('.carousel-track');
        this.slides = Array.from(this.track.querySelectorAll('.carousel-slide'));
        this.prevBtn = container.querySelector('.carousel-prev');
        this.nextBtn = container.querySelector('.carousel-next');
        this.indicatorsContainer = container.querySelector('.carousel-indicators');
        
        this.currentIndex = 0;
        this.autoplayInterval = null;
        
        this.init();
    }
    
    init() {
        // Create indicators
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('carousel-indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => this.goToSlide(index));
            this.indicatorsContainer.appendChild(indicator);
        });
        
        this.indicators = Array.from(this.indicatorsContainer.querySelectorAll('.carousel-indicator'));
        
        // Event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Touch/swipe support
        let startX = 0;
        let isDragging = false;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.stopAutoplay();
        });
        
        this.track.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        this.track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            
            isDragging = false;
            this.startAutoplay();
        });
        
        // Start autoplay
        this.startAutoplay();
        
        // Pause on hover
        this.container.addEventListener('mouseenter', () => this.stopAutoplay());
        this.container.addEventListener('mouseleave', () => this.startAutoplay());
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        const offset = -100 * index;
        this.track.style.transform = `translateX(${offset}%)`;
        
        // Update indicators
        this.indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(this.currentIndex);
    }
    
    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(this.currentIndex);
    }
    
    startAutoplay() {
        this.autoplayInterval = setInterval(() => this.nextSlide(), 4000);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
}

// Initialize all carousels
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel-container');
    carousels.forEach(container => new Carousel(container));
});

// ===========================
// Console Welcome Message
// ===========================
console.log('%c🚀 BTEHub Solutions', 'font-size: 24px; font-weight: bold; color: #4169E1;');
console.log('%cEmpowering Businesses with Intelligent AI Solutions', 'font-size: 14px; color: #718096;');
console.log('%c💼 Interested in working with us? Visit: btehubsolutions.vercel.app', 'font-size: 12px; color: #4A5568;');
