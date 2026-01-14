// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Azel Store - Premium SA-MP Services');
  
  // Initialize all components
  initLoader();
  initParticles();
  initNavigation();
  initCounters();
  initFlashSale();
  initProductsFilter();
  initReviewsSlider();
  initBackToTop();
  initChatWidget();
  initScrollAnimations();
  initNewsletterForm();
});

// ===== LOADER =====
function initLoader() {
  const loader = document.querySelector('.loader');
  setTimeout(() => {
    loader.style.opacity = '0';
    loader.style.visibility = 'hidden';
    
    // Trigger initial animations
    document.body.classList.add('loaded');
    
    // Start typing animation
    const typingText = document.querySelector('.typing-animation');
    if (typingText) {
      typingText.style.animation = 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite';
    }
  }, 2000);
}

// ===== PARTICLES =====
function initParticles() {
  const particlesContainer = document.querySelector('.particles');
  if (!particlesContainer) return;
  
  const particleCount = 100;
  
  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement('div');
  particle.classList.add('particle');
  
  // Random properties
  const size = Math.random() * 5 + 2;
  const posX = Math.random() * 100;
  const posY = Math.random() * 100;
  const delay = Math.random() * 10;
  const duration = Math.random() * 30 + 20;
  const color = getRandomColor();
  const opacity = Math.random() * 0.3 + 0.1;
  
  // Apply styles
  particle.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    background: ${color};
    border-radius: 50%;
    left: ${posX}%;
    top: ${posY}%;
    opacity: ${opacity};
    box-shadow: 0 0 10px ${color};
    animation: floatParticle ${duration}s infinite ${delay}s ease-in-out;
    z-index: 0;
  `;
  
  container.appendChild(particle);
}

function getRandomColor() {
  const colors = [
    '#00ffcc', // Primary cyan
    '#aa00ff', // Secondary purple
    '#ff3366', // Accent pink
    '#ff9900', // Orange
    '#00aaff', // Blue
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Add particle animation to style
const particleStyle = document.createElement('style');
particleStyle.textContent = `
  @keyframes floatParticle {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(20px, -30px) rotate(90deg); }
    50% { transform: translate(0, -60px) rotate(180deg); }
    75% { transform: translate(-20px, -30px) rotate(270deg); }
  }
`;
document.head.appendChild(particleStyle);

// ===== NAVIGATION =====
function initNavigation() {
  const nav = document.querySelector('nav');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  // Sticky navigation on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
      
      // Transform hamburger to X
      const spans = mobileMenuBtn.querySelectorAll('span');
      if (mobileMenuBtn.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }
  
  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 992) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
        const spans = mobileMenuBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
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
        // Close mobile menu if open
        if (mobileMenuBtn.classList.contains('active')) {
          mobileMenuBtn.classList.remove('active');
          navLinks.classList.remove('active');
        }
        
        // Smooth scroll to target
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== COUNTERS =====
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

// ===== FLASH SALE =====
function initFlashSale() {
  const countdownElement = document.getElementById('countdown-hours');
  const countdownMinutes = document.getElementById('countdown-minutes');
  const countdownSeconds = document.getElementById('countdown-seconds');
  
  if (!countdownElement) return;
  
  // Set countdown to 24 hours from now
  const targetTime = new Date();
  targetTime.setHours(targetTime.getHours() + 24);
  
  function updateCountdown() {
    const now = new Date();
    const difference = targetTime - now;
    
    if (difference <= 0) {
      // Countdown finished
      countdownElement.textContent = '00';
      countdownMinutes.textContent = '00';
      countdownSeconds.textContent = '00';
      
      // Update banner text
      const flashBanner = document.querySelector('.flash-banner');
      if (flashBanner) {
        flashBanner.style.opacity = '0.7';
      }
      
      return;
    }
    
    // Calculate hours, minutes, seconds
    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    // Update elements
    countdownElement.textContent = hours.toString().padStart(2, '0');
    countdownMinutes.textContent = minutes.toString().padStart(2, '0');
    countdownSeconds.textContent = seconds.toString().padStart(2, '0');
  }
  
  // Initial update
  updateCountdown();
  
  // Update every second
  setInterval(updateCountdown, 1000);
}

// ===== PRODUCTS FILTER =====
function initProductsFilter() {
  const categoryBtns = document.querySelectorAll('.category-btn');
  const productCards = document.querySelectorAll('.product-card');
  
  if (!categoryBtns.length) return;
  
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      categoryBtns.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      const category = btn.getAttribute('data-category');
      
      // Filter products
      productCards.forEach(card => {
        if (category === 'all' || card.classList.contains(`category-${category}`)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
  
  // Add click effects to product cards
  productCards.forEach(card => {
    card.addEventListener('click', function(e) {
      if (!e.target.classList.contains('btn')) {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
          this.style.transform = '';
        }, 200);
      }
    });
  });
  
  // Add ripple effect to buttons
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
      createRippleEffect(this, e);
    });
  });
}

function createRippleEffect(element, event) {
  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
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
  
  element.appendChild(ripple);
  
  // Remove ripple after animation
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// ===== REVIEWS SLIDER =====
function initReviewsSlider() {
  const track = document.querySelector('.reviews-track');
  const cards = document.querySelectorAll('.review-card');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dots = document.querySelectorAll('.dot');
  
  if (!track || cards.length === 0) return;
  
  let currentIndex = 0;
  const cardWidth = cards[0].offsetWidth + 30; // Including gap
  
  // Update slider position
  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    
    // Update active dot
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
    
    // Update button states
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === cards.length - 1;
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
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  
  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      updateSlider();
    });
  });
  
  // Auto slide every 5 seconds
  let slideInterval = setInterval(nextSlide, 5000);
  
  // Pause on hover
  if (track) {
    track.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    track.addEventListener('mouseleave', () => {
      slideInterval = setInterval(nextSlide, 5000);
    });
  }
  
  // Update card width on resize
  window.addEventListener('resize', () => {
    const newCardWidth = cards[0].offsetWidth + 30;
    if (newCardWidth !== cardWidth) {
      track.style.transform = `translateX(-${currentIndex * newCardWidth}px)`;
    }
  });
}

// ===== BACK TO TOP =====
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  
  if (!backToTopBtn) return;
  
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

// ===== CHAT WIDGET =====
function initChatWidget() {
  const chatToggle = document.querySelector('.chat-toggle');
  const chatContainer = document.querySelector('.chat-container');
  const chatClose = document.querySelector('.chat-close');
  const chatInput = document.querySelector('.chat-input input');
  const chatSendBtn = document.querySelector('.chat-input button');
  
  if (!chatToggle) return;
  
  // Toggle chat
  chatToggle.addEventListener('click', () => {
    chatContainer.classList.toggle('open');
  });
  
  // Close chat
  if (chatClose) {
    chatClose.addEventListener('click', () => {
      chatContainer.classList.remove('open');
    });
  }
  
  // Send message
  if (chatSendBtn && chatInput) {
    chatSendBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }
  
  function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Simulate bot response after delay
    setTimeout(() => {
      const responses = [
        "Thanks for your message! Our support team will get back to you soon.",
        "For immediate assistance, please contact us via WhatsApp.",
        "You can browse our products for solutions to common server issues.",
        "Need help with anti-cheat setup? Check out our documentation.",
        "Looking for custom development? Contact Azel directly on WhatsApp."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addMessage(randomResponse, 'bot');
    }, 1000);
  }
  
  function addMessage(text, sender) {
    const chatBody = document.querySelector('.chat-body');
    if (!chatBody) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chat-message', sender);
    messageDiv.innerHTML = `<p>${text}</p>`;
    
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.product-card, .team-card, .portfolio-item, .contact-card');
  
  revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
}

// ===== NEWSLETTER FORM =====
function initNewsletterForm() {
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (!newsletterForm) return;
  
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (!email || !email.includes('@')) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }
    
    // Simulate submission
    emailInput.value = '';
    showNotification('Thank you for subscribing to Azel Store updates!', 'success');
    
    // In a real application, you would send this to a server
    console.log('Newsletter subscription:', email);
  });
}

function showNotification(message, type) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button class="notification-close"><i class="fas fa-times"></i></button>
  `;
  
  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .notification {
      position: fixed;
      top: 100px;
      right: 20px;
      background: var(--bg-card);
      border-left: 4px solid var(--primary);
      padding: 15px 20px;
      border-radius: var(--border-radius);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      animation: slideIn 0.3s ease;
      max-width: 400px;
    }
    
    .notification.error {
      border-left-color: var(--accent);
    }
    
    .notification.success {
      border-left-color: #00cc66;
    }
    
    .notification-close {
      background: transparent;
      color: var(--text-gray);
      cursor: pointer;
    }
    
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(notification);
  
  // Close button
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      notification.remove();
      style.remove();
    }, 300);
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        notification.remove();
        style.remove();
      }, 300);
    }
  }, 5000);
}

// Add ripple animation to styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);

// ===== ANALYTICS TRACKING =====
// Track button clicks for analytics
document.querySelectorAll('a[href*="whatsapp"]').forEach(link => {
  link.addEventListener('click', function() {
    console.log('WhatsApp link clicked:', this.href);
    // Here you can add Google Analytics or other tracking
  });
});

// Track product views
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const productName = entry.target.querySelector('h3')?.textContent;
      if (productName) {
        console.log('Product viewed:', productName);
      }
    }
  });
}, { threshold: 0.5 });

// Observe product cards
document.querySelectorAll('.product-card').forEach(card => {
  observer.observe(card);
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce resize events
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    console.log('Window resized, recalculating layouts');
  }, 250);
});

// Lazy load images (if added in the future)
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
}

// ===== INITIALIZATION COMPLETE =====
console.log('✅ Azel Store initialized successfully!');
