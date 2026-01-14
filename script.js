// AzelHost - SA-MP Hosting Platform
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 AzelHost Initializing...');
    
    // Initialize all components
    initLoader();
    initParticles();
    initNavigation();
    initPricingTabs();
    initServerCreation();
    initControlPanel();
    initFAQ();
    initChatWidget();
    initBackToTop();
    initAnimations();
    initFormValidation();
    
    console.log('✅ AzelHost Ready!');
});

// ===== LOADER =====
function initLoader() {
    const loader = document.querySelector('.loader');
    if (!loader) return;
    
    // Simulate loading time
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 1500);
}

// ===== PARTICLES BACKGROUND =====
function initParticles() {
    const container = document.querySelector('.particles-container');
    if (!container) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
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
    const duration = Math.random() * 20 + 10;
    const color = getRandomColor();
    const opacity = Math.random() * 0.3 + 0.1;
    
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
        pointer-events: none;
        z-index: 0;
    `;
    
    container.appendChild(particle);
}

function getRandomColor() {
    const colors = [
        '#00a8ff', // Primary blue
        '#9c88ff', // Secondary purple
        '#ff6b6b', // Accent red
        '#00b894', // Success green
        '#fdcb6e', // Warning yellow
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add particle animation to style
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes floatParticle {
        0%, 100% {
            transform: translate(0, 0) rotate(0deg);
        }
        33% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 50 - 25}px) rotate(${Math.random() * 180}deg);
        }
        66% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 50 - 25}px) rotate(${Math.random() * 180}deg);
        }
    }
`;
document.head.appendChild(particleStyle);

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            
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
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                mobileMenuBtn.classList.remove('active');
                navMenu.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#!') return;
            
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

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== PRICING TABS =====
function initPricingTabs() {
    const pricingTabs = document.querySelectorAll('.pricing-tab');
    const monthlyPrices = document.querySelectorAll('.price.monthly');
    const yearlyPrices = document.querySelectorAll('.price.yearly');
    
    if (!pricingTabs.length) return;
    
    pricingTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            pricingTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            const period = tab.getAttribute('data-period');
            
            // Show/hide prices based on selected period
            if (period === 'monthly') {
                monthlyPrices.forEach(price => price.style.display = 'inline');
                yearlyPrices.forEach(price => price.style.display = 'none');
            } else {
                monthlyPrices.forEach(price => price.style.display = 'none');
                yearlyPrices.forEach(price => price.style.display = 'inline');
            }
        });
    });
}

// ===== SERVER CREATION =====
function initServerCreation() {
    const slotsSlider = document.getElementById('serverSlots');
    const slotsValue = document.getElementById('slotsValue');
    const planPrice = document.getElementById('planPrice');
    const featuresPrice = document.getElementById('featuresPrice');
    const totalPrice = document.getElementById('totalPrice');
    const locationOptions = document.querySelectorAll('.location-option');
    const checkboxes = document.querySelectorAll('.features-checkbox input[type="checkbox"]');
    const createBtn = document.querySelector('.btn-create');
    
    if (!slotsSlider) return;
    
    // Update slots value when slider changes
    slotsSlider.addEventListener('input', function() {
        slotsValue.textContent = this.value;
        updatePricing();
    });
    
    // Location selection
    locationOptions.forEach(option => {
        option.addEventListener('click', function() {
            locationOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Update pricing when checkboxes change
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updatePricing);
    });
    
    // Calculate pricing
    function updatePricing() {
        const slots = parseInt(slotsSlider.value);
        
        // Calculate plan price based on slots
        let planPriceValue = 0;
        if (slots <= 50) {
            planPriceValue = 0;
            planPrice.textContent = 'Free';
        } else if (slots <= 100) {
            planPriceValue = 4.99;
            planPrice.textContent = '$4.99';
        } else if (slots <= 200) {
            planPriceValue = 9.99;
            planPrice.textContent = '$9.99';
        } else if (slots <= 500) {
            planPriceValue = 19.99;
            planPrice.textContent = '$19.99';
        } else {
            planPriceValue = 24.99;
            planPrice.textContent = '$24.99';
        }
        
        // Calculate features price
        let featuresPriceValue = 0;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                if (checkbox.nextElementSibling.textContent.includes('Anti-Cheat')) {
                    featuresPriceValue += 5;
                }
                if (checkbox.nextElementSibling.textContent.includes('Discord Bot')) {
                    featuresPriceValue += 3;
                }
            }
        });
        
        // Update display
        featuresPrice.textContent = featuresPriceValue > 0 ? `$${featuresPriceValue.toFixed(2)}` : '$0.00';
        
        // Calculate total
        const total = planPriceValue + featuresPriceValue;
        totalPrice.textContent = total > 0 ? `$${total.toFixed(2)}` : 'Free';
    }
    
    // Create server button
    if (createBtn) {
        createBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get form values
            const serverName = document.getElementById('serverName').value;
            const serverSlots = slotsSlider.value;
            const serverGamemode = document.getElementById('serverGamemode').value;
            const selectedLocation = document.querySelector('.location-option.active').getAttribute('data-location');
            
            // Show loading state
            const originalText = createBtn.innerHTML;
            createBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Server...';
            createBtn.disabled = true;
            
            // Simulate server creation
            setTimeout(() => {
                // Show success message
                showNotification('🎉 Server created successfully! Your server will be ready in 30 seconds.', 'success');
                
                // Reset button
                createBtn.innerHTML = originalText;
                createBtn.disabled = false;
                
                // Redirect to panel (simulated)
                console.log('Server Details:', {
                    name: serverName,
                    slots: serverSlots,
                    gamemode: serverGamemode,
                    location: selectedLocation,
                    status: 'Creating...'
                });
            }, 2000);
        });
    }
    
    // Initial pricing calculation
    updatePricing();
}

// ===== CONTROL PANEL SIMULATION =====
function initControlPanel() {
    const consoleOutput = document.querySelector('.console-output');
    const startBtn = document.querySelector('.panel-actions .btn-success');
    const stopBtn = document.querySelector('.panel-actions .btn-danger');
    const restartBtn = document.querySelector('.panel-actions .btn:not(.btn-success):not(.btn-danger)');
    const consoleInput = document.querySelector('.console-input input');
    const consoleSendBtn = document.querySelector('.console-input .btn');
    
    if (!consoleOutput) return;
    
    // Add initial console lines
    const initialLines = [
        '[12:30:45] SA-MP Server Started',
        '[12:30:46] Server Plugins',
        '[12:30:46]  Loading plugin: mysql.so',
        '[12:30:46]   Failed (libmysqlclient.so.18: cannot open shared object file)',
        '[12:30:46]  Loading plugin: streamer.so',
        '[12:30:46]  Loaded.',
        '[12:30:46]  Loading plugin: sscanf.so',
        '[12:30:46]  Loaded.',
        '[12:30:46]  Loaded 2 plugins.',
        '[12:30:46] ',
        '[12:30:46] Started server on port: 7777, with maxplayers: 100 lanmode is OFF.',
        '[12:30:46] ',
        '[12:30:46] Filterscripts',
        '[12:30:46]  Loading filterscript 'admin.amx'...',
        '[12:30:46]  Loading filterscript 'gl_actions.amx'...',
        '[12:30:46]  Loading filterscript 'gl_realtime.amx'...',
        '[12:30:46]  Loading filterscript 'gl_property.amx'...',
        '[12:30:46]  Loaded 4 filterscripts.',
        '[12:30:46] ',
        '[12:30:46] Number of vehicle models: 77'
    ];
    
    initialLines.forEach((line, index) => {
        setTimeout(() => {
            addConsoleLine(line);
        }, index * 100);
    });
    
    // Server control buttons
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            addConsoleLine('[ACTION] Starting server...');
            startBtn.disabled = true;
            stopBtn.disabled = false;
            restartBtn.disabled = false;
            
            setTimeout(() => {
                addConsoleLine('[12:31:00] Server started successfully!');
                addConsoleLine('[12:31:00] Players online: 0/100');
            }, 1000);
        });
    }
    
    if (stopBtn) {
        stopBtn.addEventListener('click', () => {
            addConsoleLine('[ACTION] Stopping server...');
            startBtn.disabled = false;
            stopBtn.disabled = true;
            restartBtn.disabled = true;
            
            setTimeout(() => {
                addConsoleLine('[12:31:10] Server stopped.');
            }, 1000);
        });
    }
    
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            addConsoleLine('[ACTION] Restarting server...');
            startBtn.disabled = true;
            stopBtn.disabled = true;
            restartBtn.disabled = true;
            
            setTimeout(() => {
                addConsoleLine('[12:31:20] Server restarted successfully!');
                startBtn.disabled = false;
                stopBtn.disabled = false;
                restartBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Console input
    if (consoleSendBtn && consoleInput) {
        consoleSendBtn.addEventListener('click', sendConsoleCommand);
        consoleInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendConsoleCommand();
        });
    }
    
    function sendConsoleCommand() {
        const command = consoleInput.value.trim();
        if (!command) return;
        
        addConsoleLine(`> ${command}`);
        consoleInput.value = '';
        
        // Simulate command response
        setTimeout(() => {
            const responses = [
                `Command executed successfully.`,
                `Unknown command. Type 'help' for available commands.`,
                `Players online: 5/100`,
                `Server uptime: 2 hours, 15 minutes`,
                `CPU Usage: 15%, RAM Usage: 1.2GB/4GB`
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addConsoleLine(randomResponse);
        }, 500);
    }
    
    function addConsoleLine(text) {
        const line = document.createElement('div');
        line.className = 'console-line';
        line.textContent = text;
        consoleOutput.appendChild(line);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }
    
    // Update stats animation
    const statBars = document.querySelectorAll('.stat-fill');
    statBars.forEach(bar => {
        const targetWidth = parseInt(bar.style.width);
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 2s ease';
            bar.style.width = bar.getAttribute('data-width') || bar.style.width;
        }, 1000);
    });
}

// ===== FAQ =====
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');
            
            // Close all other FAQs
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
            });
            
            // Toggle current FAQ
            if (!isActive) {
                question.classList.add('active');
                answer.classList.add('active');
            }
        });
    });
}

// ===== CHAT WIDGET =====
function initChatWidget() {
    const chatToggle = document.querySelector('.chat-toggle');
    const chatContainer = document.querySelector('.chat-container');
    const chatClose = document.querySelector('.chat-close');
    const chatInput = document.querySelector('.chat-input input');
    const chatSendBtn = document.querySelector('.chat-send');
    const chatBody = document.querySelector('.chat-body');
    
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
        chatSendBtn.addEventListener('click', sendChatMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendChatMessage();
        });
    }
    
    function sendChatMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addChatMessage(message, 'user');
        chatInput.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const responses = [
                "Thanks for your message! Our support team typically responds within 5 minutes.",
                "For immediate assistance with server issues, please check our documentation.",
                "I can help you with common issues. What seems to be the problem?",
                "For billing questions, please open a support ticket.",
                "Need help setting up your SA-MP server? Check out our setup guide!"
            ];
            
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addChatMessage(randomResponse, 'bot');
        }, 1000);
    }
    
    function addChatMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = `<p>${text}</p>`;
        
        messageDiv.appendChild(messageContent);
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
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

// ===== ANIMATIONS =====
function initAnimations() {
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.feature-card, .pricing-card, .support-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Add hover effects
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ===== FORM VALIDATION =====
function initFormValidation() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email || !isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate submission
            showNotification('🎉 Thank you for subscribing to AzelHost updates!', 'success');
            this.reset();
        });
    }
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--bg-card);
                border-left: 4px solid var(--primary);
                padding: 1rem 1.5rem;
                border-radius: var(--border-radius);
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
                box-shadow: var(--shadow-lg);
                z-index: 10000;
                animation: slideInRight 0.3s ease;
                max-width: 400px;
            }
            
            .notification.error {
                border-left-color: var(--accent);
            }
            
            .notification.success {
                border-left-color: #00b894;
            }
            
            .notification-close {
                background: transparent;
                color: var(--text-gray);
                cursor: pointer;
                font-size: 1rem;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// ===== ANALYTICS & TRACKING =====
// Track button clicks (for future analytics)
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        console.log(`Button clicked: ${buttonText}`);
        // Here you can add Google Analytics or other tracking
    });
});

// Track section views
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log(`Section viewed: ${entry.target.id}`);
        }
    });
}, { threshold: 0.5 });

// Observe all sections
document.querySelectorAll('section[id]').forEach(section => {
    sectionObserver.observe(section);
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

// ===== ADDITIONAL FEATURES =====
// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        createRippleEffect(this, e);
    });
});

function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation to styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

console.log('🎮 AzelHost - Free SA-MP Hosting Platform Loaded Successfully!');
