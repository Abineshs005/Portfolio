// ============================================
// THEME TOGGLE (DARK/LIGHT MODE)
// ============================================
const themeBtn = document.getElementById('themeBtn');
const body = document.body;

if (themeBtn) {
    // Check for saved theme preference or default to dark mode
    const currentTheme = localStorage.getItem('theme') || 'dark';
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');

        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'dark');
            themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// ============================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 212, 255, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
const revealElements = document.querySelectorAll('.project-card, .skill-category, .timeline-item, .contact-item');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize elements
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ============================================
// HAMBURGER MENU
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ============================================
// FORM SUBMISSION
// ============================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = contactForm.querySelector('input[type="text"]');
        const emailInput = contactForm.querySelector('input[type="email"]');
        const messageInput = contactForm.querySelector('textarea');
        
        const name = nameInput.value;
        const email = emailInput.value;
        const message = messageInput.value;
        
        // Validate form
        if (!name || !email || !message) {
            showNotification('Please fill all fields', 'error');
            return;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email', 'error');
            return;
        }
        
        // Open the visitor's email app with the message filled in (no backend yet)
        const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')');
        window.location.href = 'mailto:abineshs338@gmail.com?subject=' + encodeURIComponent('Portfolio message from ' + name) + '&body=' + body;
        showNotification('Opening your email app to send the message.', 'success');
        contactForm.reset();
    });
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const bgColor = type === 'success' ? '#00d4ff' : type === 'error' ? '#ff006e' : '#8338ec';
    
    const style = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${bgColor};
        color: #0a0e27;
        border-radius: 8px;
        font-weight: 600;
        z-index: 9999;
        animation: slideInRight 0.5s ease-out;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    notification.setAttribute('style', style);
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.5s ease-out reverse';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// ============================================
// PARALLAX EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax') || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounters() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const increment = target / 50;
        let current = 0;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(current) + '+';
            }
        }, 30);
    });
}

// Trigger counter animation when about section is in view
const aboutSection = document.querySelector('.about');
let counterAnimated = false;

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterAnimated) {
            animateCounters();
            counterAnimated = true;
        }
    });
}, observerOptions);

if (aboutSection) {
    observer.observe(aboutSection);
}

// ============================================
// ACTIVE NAV LINK HIGHLIGHT
// ============================================
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--dark-text)';
        }
    });
});

// ============================================
// PROJECT CARD HOVER EFFECT
// ============================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// SKILL PROGRESS BAR ANIMATION
// ============================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease-out';
            bar.style.width = width;
        }, 100);
    });
}

// Trigger skill animation when skills section is in view
const skillsSection = document.querySelector('.skills');
let skillsAnimated = false;

if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                animateSkillBars();
                skillsAnimated = true;
            }
        });
    }, observerOptions);
    
    skillsObserver.observe(skillsSection);
}

// ============================================
// TYPING EFFECT FOR HERO TITLE
// ============================================
function typeEffect(element, text, speed = 100) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
           
        }
    }
    
    type();
}

// Apply typing effect to hero title on load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeEffect(heroTitle, originalText, 40);
    }
});

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        color: var(--dark-bg);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
}

createScrollToTopButton();

// ============================================
// LAZY LOADING IMAGES
// ============================================
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// RIPPLE EFFECT ON BUTTONS
// ============================================
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframe
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// ENHANCED TEXT ANIMATION
// ============================================
function createTextAnimation() {
    const textElements = document.querySelectorAll('.hero-description, .about-intro, .project-content p');
    
    textElements.forEach(element => {
        const text = element.textContent;
        element.innerHTML = '';
        
        let charIndex = 0;
        const chars = text.split('');
        
        function addChar() {
            if (charIndex < chars.length) {
                const span = document.createElement('span');
                span.textContent = chars[charIndex];
                span.style.opacity = '0';
                span.style.animation = `fadeIn 0.5s ease-out   ${charIndex * 5}ms forwards`;
                element.appendChild(span);
                charIndex++;
                setTimeout(addChar, 5);
            }
        }
        
        // Start animation when element is in view
        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && charIndex === 0) {
                    addChar();
                    elementObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        elementObserver.observe(element);
    });
}

createTextAnimation();

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Debounce function for scroll events
function debounce(func, wait) {
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

// Apply debounce to scroll events
const debouncedScroll = debounce(() => {
    revealOnScroll();
}, 100);

window.addEventListener('scroll', debouncedScroll);

// ============================================
// PAGE LOAD ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.style.animation = 'fadeIn 0.5s ease-out';
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c🚀 Welcome to Abinesh\'s Portfolio!', 'color: #00d4ff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00d4ff;');
console.log('%c✨ Feel free to explore and get in touch!', 'color: #ff006e; font-size: 14px; font-weight: bold;');
console.log('%c💻 Built with React, Node.js, and modern web technologies', 'color: #8338ec; font-size: 12px;');
