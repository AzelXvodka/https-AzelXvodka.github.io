// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize everything after page loads
  setTimeout(() => {
    document.querySelector('.loader').style.opacity = '0';
    document.querySelector('.loader').style.visibility = 'hidden';
    
    // Initialize particles
    initParticles();
    
    // Initialize counters
    initCounters();
    
    // Initialize reviews slider
    initSlider();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize newsletter form
    initNewsletterForm();
    
    // Add scroll effects
    initScrollEffects();
    
    // Add hover effects to buttons
    initButtonEffects();
  }, 1500);
});

// Create animated particles in background
function initParticles() {
  const particlesContainer = document.querySelector('.particles');
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random properties
    const size = Math.random() * 5 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 10;
    const duration = Math.random() * 20 + 10;
    const color = Math.random() > 0.5 ? '#00ffcc' : '#aa00ff';
    
    // Apply styles
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      left: ${posX}%;
      top: ${posY}%;
      opacity: ${Math.random() * 0.3 + 0.1};
      box-shadow: 0 0 10px ${color};
      animation: floatParticle ${duration}s infinite ${delay}s linear;
      z-index: 0;
    `;
    
    particlesContainer.appendChild(particle);
  }
  
  // Add CSS animation for particles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatParticle {
      0% { transform: translateY(0) translateX(0); }
      25% { transform: translateY(-20px) translateX(10px); }
      50% { transform: translateY(-40px) translateX(0); }
      75% { transform: translateY(-20px) translateX(-10px); }
      100% { transform: translateY(0) translateX(0); }
    }
  `;
  document.head.appendChild(style);
}

// Animated number counters
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const increment = target / 100;
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        setTimeout(updateCounter, 30);
      } else {
        counter.textContent = target;
      }
    };
    
    // Start counter when element is in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(counter);
  });
}

// Reviews slider
function initSlider() {
  const track = document.querySelector('.review-track');
  const cards = document.querySelectorAll('.review-card');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dotsContainer = document.querySelector('.slider-dots');
  
  if (!track || cards.length === 0) return;
  
  let currentIndex = 0;
  let cardWidth = cards[0].offsetWidth + 30; // Including gap
  
  // Create dots
  cards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.slider-dot');
  
  // Update slider position
  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    
    // Update active dot
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
    
    // Disable buttons at extremes
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === cards.length - 1;
  }
  
  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
  }
  
  function nextSlide() {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      updateSlider();
    }
  }
  
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlider();
    }
  }
  
  // Event listeners
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  
  // Auto slide every 5 seconds
  setInterval(nextSlide, 5000);
  
  // Update card width on resize
  window.addEventListener('resize', () => {
    cardWidth = cards[0].offsetWidth + 30;
    updateSlider();
  });
  
  // Add CSS for dots
  const style = document.createElement('style');
  style.textContent = `
    .slider-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(0, 255, 204, 0.3);
      cursor: pointer;
      transition: all 0.3s;
    }
    .slider-dot.active {
      background: var(--neon-cyan);
      box-shadow: 0 0 10px var(--neon-cyan);
    }
    .slider-dot:hover {
      background: var(--neon-cyan);
    }
  `;
  document.head.appendChild(style);
}

// Mobile menu toggle
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (!menuBtn) return;
  
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    
    // Transform hamburger to X
    const spans = menuBtn.querySelectorAll('span');
    if (menuBtn.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
  
  // Close menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        menuBtn.classList.remove('active');
        navLinks.style.display = 'none';
        const spans = menuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  });
}

// Back to top button
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Newsletter form submission
function initNewsletterForm() {
  const form = document.querySelector('.newsletter-form');
  
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input').value;
    
    // Simple validation
    if (email && email.includes('@')) {
      // In a real application, you would send this to a server
      form.innerHTML = '<p style="color:#00ffcc; text-align:center;">Thank you for subscribing!</p>';
    } else {
      alert('Please enter a valid email address.');
    }
  });
}

// Scroll effects for navbar and sections
function initScrollEffects() {
  const nav = document.querySelector('nav');
  
  window.addEventListener('scroll', () => {
    // Navbar effect
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.feature-card, .product-card, .review-card, .contact-card');
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  });
  
  // Set initial styles for reveal elements
  const revealElements = document.querySelectorAll('.feature-card, .product-card, .review-card, .contact-card');
  revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.5s, transform 0.5s';
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Enhanced button hover effects
function initButtonEffects() {
  // Add ripple effect to buttons
  document.querySelectorAll('.btn, .order-btn, .slider-btn').forEach(button => {
    button.addEventListener('click', function(e) {
      // Create ripple element
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
      `;
      
      this.appendChild(ripple);
      
      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Add ripple animation to styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Add some interactive effects to product cards
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-15px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Add a simple notification for WhatsApp clicks
document.querySelectorAll('a[href*="whatsapp"]').forEach(link => {
  link.addEventListener('click', function() {
    // Optional: Add analytics or tracking here
    console.log('WhatsApp link clicked:', this.href);
  });
});
