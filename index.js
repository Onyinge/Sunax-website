// Mobile Navigation Toggle
const mobileToggle = document.getElementById('mobileToggle');
const mainNav = document.getElementById('mainNav');

mobileToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    mobileToggle.querySelector('i').classList.toggle('fa-bars');
    mobileToggle.querySelector('i').classList.toggle('fa-times');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            // Close mobile menu if open
            if(mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileToggle.querySelector('i').classList.remove('fa-times');
                mobileToggle.querySelector('i').classList.add('fa-bars');
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Carousel Functionality
const carouselSlides = document.querySelector('.carousel-slides');
const dots = document.querySelectorAll('.carousel-dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;
let slideInterval;
const totalSlides = 5;

// Function to show a specific slide
function showSlide(index) {
    // Reset all dots
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Handle wrap-around
    if (index >= totalSlides) currentSlide = 0;
    else if (index < 0) currentSlide = totalSlides - 1;
    else currentSlide = index;
    
    // Move slides
    carouselSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Activate corresponding dot
    dots[currentSlide].classList.add('active');
    
    // Add animation to content
    const content = carouselSlides.children[currentSlide].querySelector('.carousel-content');
    content.classList.remove('animate-fade-in-up');
    void content.offsetWidth; // Trigger reflow
    content.classList.add('animate-fade-in-up');
}

// Function to show next slide
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Function to show previous slide
function prevSlide() {
    showSlide(currentSlide - 1);
}

// Event listeners for carousel controls
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Event listeners for dots
dots.forEach(dot => {
    dot.addEventListener('click', function() {
        const slideIndex = parseInt(this.getAttribute('data-slide'));
        showSlide(slideIndex);
        resetSlideInterval();
    });
});

// Start auto-sliding
function startSlideInterval() {
    slideInterval = setInterval(nextSlide, 6000);
}

// Reset interval when user interacts with carousel
function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideInterval();
}

// Initialize carousel
startSlideInterval();

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // In a real application, you would send the form data to a server here
    alert('Thank you for your message! We will get back to you within 24 hours.');
    contactForm.reset();
});

// Update active nav link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
    
    // Header shadow on scroll
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
});

// Add animation to elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.highlight-card, .service-card, .project-card').forEach(el => {
    observer.observe(el);
});
