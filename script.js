// ===========================================
// LEGEND HOSTING - SCRIPT.JS
// برمجة خارقة ومتطورة
// ===========================================

// 1. GLOBAL VARIABLES
const config = {
    siteName: 'LEGEND HOSTING',
    founders: ['SBA', 'Vodka'],
    currentYear: new Date().getFullYear(),
    version: '1.0.0',
    isMobile: window.innerWidth <= 768,
    isDarkMode: localStorage.getItem('theme') === 'dark' || 
                (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
};

// 2. DOM ELEMENTS
const elements = {
    loadingScreen: document.querySelector('.loading-screen'),
    themeToggle: document.getElementById('themeToggle'),
    menuToggle: document.querySelector('.menu-toggle'),
    navMenu: document.querySelector('.nav-menu'),
    statsNumbers: document.querySelectorAll('.stat-number'),
    particlesContainer: document.querySelector('.particles-container'),
    pricingTabs: document.querySelectorAll('.pricing-tab'),
    modalTriggers: document.querySelectorAll('[data-modal]'),
    accordionHeaders: document.querySelectorAll('.accordion-header'),
    contactForm: document.getElementById('contactForm')
};

// 3. INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
    console.log(`${config.siteName} v${config.version} - تم التحميل بنجاح!`);
    console.log(`المؤسسون: ${config.founders.join(' & ')}`);
    
    initApp();
});

// 4. MAIN INITIALIZATION FUNCTION
function initApp() {
    // إزالة شاشة التحميل
    setTimeout(() => {
        if (elements.loadingScreen) {
            elements.loadingScreen.classList.add('loaded');
            setTimeout(() => {
                elements.loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1500);
    
    // تهيئة الوضع الداكن/الفاتح
    initTheme();
    
    // تهيئة القائمة المتحركة
    initMobileMenu();
    
    // تهيئة العدادات المتحركة
    initCounters();
    
    // تهيئة الجسيمات المتحركة
    initParticles();
    
    // تهيئة علامات الأسعار
    initPricingTabs();
    
    // تهيئة المودالات
    initModals();
    
    // تهيئة الأكورديون
    initAccordion();
    
    // تهيئة النماذج
    initForms();
    
    // تهيئة تأثيرات التمرير
    initScrollEffects();
    
    // تهيئة مؤشر الأداء
    initPerformanceMonitor();
    
    // تهيئة نظام الألعاب
    initGamification();
    
    // تحديث التاريخ
    updateCopyrightYear();
    
    // إضافة المستمعين للأحداث
    addEventListeners();
    
    // إطلاق التأثيرات الأولية
    launchInitialAnimations();
}

// 5. THEME MANAGEMENT
function initTheme() {
    if (config.isDarkMode) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
    }
    
    if (elements.themeToggle) {
        elements.themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const isDark = document.body.classList.contains('dark-mode');
    
    if (isDark) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }
    
    // تأثير مبهج عند التبديل
    createRippleEffect(elements.themeToggle);
}

// 6. MOBILE MENU
function initMobileMenu() {
    if (elements.menuToggle && elements.navMenu) {
        elements.menuToggle.addEventListener('click', () => {
            elements.navMenu.classList.toggle('active');
            elements.menuToggle.innerHTML = elements.navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // إغلاق القائمة عند النقر على رابط
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                elements.navMenu.classList.remove('active');
                elements.menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
}

// 7. ANIMATED COUNTERS
function initCounters() {
    if (elements.statsNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        elements.statsNumbers.forEach(stat => observer.observe(stat));
    }
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count') || element.textContent.replace(/,/g, ''));
    const duration = 2000; // 2 ثانية
    const steps = 60;
    const stepValue = target / steps;
    const stepTime = duration / steps;
    
    let current = 0;
    const timer = setInterval(() => {
        current += stepValue;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.round(current).toLocaleString();
    }, stepTime);
}

// 8. PARTICLES ANIMATION
function initParticles() {
    if (!elements.particlesContainer) {
        elements.particlesContainer = document.createElement('div');
        elements.particlesContainer.className = 'particles-container';
        document.body.appendChild(elements.particlesContainer);
    }
    
    const particleCount = config.isMobile ? 30 : 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
}

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // حجم عشوائي
    const size = Math.random() * 5 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // لون عشوائي
    const colors = ['#FFD700', '#00F3FF', '#FF00CC', '#00FF88'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.backgroundColor = color;
    particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
    
    // موقع عشوائي
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // حركة عشوائية
    const duration = Math.random() * 20 + 10;
    const xMovement = Math.random() * 100 - 50;
    const yMovement = Math.random() * 100 - 50;
    
    particle.style.animation = `
        float ${duration}s infinite linear,
        pulse ${duration / 2}s infinite ease-in-out
    `;
    
    particle.style.setProperty('--x-move', `${xMovement}px`);
    particle.style.setProperty('--y-move', `${yMovement}px`);
    
    elements.particlesContainer.appendChild(particle);
    
    // إزالة الجسيم بعد فترة
    setTimeout(() => {
        particle.remove();
        setTimeout(createParticle, 1000);
    }, duration * 1000);
}

// 9. PRICING TABS
function initPricingTabs() {
    if (elements.pricingTabs.length > 0) {
        elements.pricingTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // إزالة النشاط من جميع الألسنة
                elements.pricingTabs.forEach(t => t.classList.remove('active'));
                
                // إضافة النشاط للسان المحدد
                tab.classList.add('active');
                
                // تحديث الأسعار حسب الفترة
                const period = tab.getAttribute('data-period');
                updatePrices(period);
                
                // تأثير مبهج
                createRippleEffect(tab);
            });
        });
    }
}

function updatePrices(period) {
    const monthlyPrices = {
        basic: 4.99,
        advanced: 9.99,
        ultimate: 19.99
    };
    
    const yearlyMultiplier = 0.7; // خصم 30%
    
    document.querySelectorAll('.plan-price .amount').forEach((priceElement, index) => {
        let price;
        const planType = ['basic', 'advanced', 'ultimate'][index];
        
        if (period === 'yearly') {
            price = monthlyPrices[planType] * 12 * yearlyMultiplier;
            priceElement.textContent = price.toFixed(2);
        } else {
            price = monthlyPrices[planType];
            priceElement.textContent = price.toFixed(2);
        }
    });
}

// 10. MODALS SYSTEM
function initModals() {
    if (elements.modalTriggers.length > 0) {
        elements.modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = trigger.getAttribute('data-modal');
                const modal = document.getElementById(modalId);
                
                if (modal) {
                    openModal(modal);
                }
            });
        });
        
        // إغلاق المودال عند النقر خارج المحتوى
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                closeModal(e.target);
            }
        });
        
        // إغلاق المودال بمفتاح Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal.active');
                if (openModal) {
                    closeModal(openModal);
                }
            }
        });
    }
}

function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// 11. ACCORDION SYSTEM
function initAccordion() {
    if (elements.accordionHeaders.length > 0) {
        elements.accordionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                const isActive = item.classList.contains('active');
                
                // إغلاق جميع العناصر
                document.querySelectorAll('.accordion-item').forEach(el => {
                    el.classList.remove('active');
                });
                
                // فتح العنصر الحالي إذا لم يكن مفتوحًا
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }
}

// 12. FORMS HANDLING
function initForms() {
    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // إظهار حالة التحميل
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // محاكاة إرسال البيانات
    setTimeout(() => {
        // في الواقع، هنا ستقوم بإرسال البيانات إلى الخادم
        showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.', 'success');
        
        // إعادة تعيين النموذج
        form.reset();
        
        // إخفاء حالة التحميل
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }, 2000);
}

// 13. SCROLL EFFECTS
function initScrollEffects() {
    // تفعيل الروابط النشطة أثناء التمرير
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // تأثير التلاشي للعناصر
        animateOnScroll();
    });
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animated');
        }
    });
}

// 14. PERFORMANCE MONITOR
function initPerformanceMonitor() {
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const loadTime = perfData.loadEventEnd - perfData.navigationStart;
        
        console.log(`وقت تحميل الصفحة: ${loadTime}ms`);
        
        if (loadTime > 3000) {
            console.warn('تحذير: وقت التحميل بطيء. فكر في تحسين الصور والأكواد.');
        }
    }
}

// 15. GAMIFICATION SYSTEM
function initGamification() {
    // نظام النقاط والأوسمة
    let userPoints = parseInt(localStorage.getItem('legend_points')) || 0;
    let userBadges = JSON.parse(localStorage.getItem('legend_badges')) || [];
    
    // تحديث النقاط
    function updatePoints(points) {
        userPoints += points;
        localStorage.setItem('legend_points', userPoints);
        
        // فحص الإنجازات
        checkAchievements();
        
        // إشعار بالمكافأة
        if (points > 0) {
            showNotification(`🎉 +${points} نقطة! مجموع نقاطك: ${userPoints}`, 'success');
        }
    }
    
    // فحص الإنجازات
    function checkAchievements() {
        const achievements = [
            { points: 100, badge: 'مبتدئ', icon: '🥉' },
            { points: 500, badge: 'محترف', icon: '🥈' },
            { points: 1000, badge: 'خارق', icon: '🥇' },
            { points: 5000, badge: 'أسطورة', icon: '👑' }
        ];
        
        achievements.forEach(achievement => {
            if (userPoints >= achievement.points && 
                !userBadges.includes(achievement.badge)) {
                userBadges.push(achievement.badge);
                localStorage.setItem('legend_badges', JSON.stringify(userBadges));
                
                showNotification(
                    `🏆 إنجاز جديد! ${achievement.icon} حصلت على وسام "${achievement.badge}"`,
                    'success'
                );
            }
        });
    }
    
    // إضافة نقاط للتفاعل مع الموقع
    document.addEventListener('click', () => {
        updatePoints(1);
    }, { once: true });
    
    // إضافة نقاط للتمرير
    let scrollPointsAdded = false;
    window.addEventListener('scroll', () => {
        if (!scrollPointsAdded && window.scrollY > 500) {
            updatePoints(10);
            scrollPointsAdded = true;
        }
    });
}

// 16. NOTIFICATION SYSTEM
function showNotification(message, type = 'info') {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    
    // أيقونة حسب النوع
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    
    notification.innerHTML = `
        <span class="alert-icon">${icons[type] || icons.info}</span>
        <span class="alert-message">${message}</span>
        <button class="alert-close">&times;</button>
    `;
    
    // إضافة إلى الصفحة
    document.body.appendChild(notification);
    
    // زر الإغلاق
    notification.querySelector('.alert-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // إزالة تلقائية بعد 5 ثوانٍ
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // تأثير الظهور
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
}

// 17. VISUAL EFFECTS
function createRippleEffect(element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    
    ripple.style.width = ripple.style.height = `${Math.max(rect.width, rect.height)}px`;
    ripple.style.left = `${event.clientX - rect.left - ripple.offsetWidth / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - ripple.offsetHeight / 2}px`;
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// 18. UTILITY FUNCTIONS
function updateCopyrightYear() {
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = config.currentYear;
    });
}

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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 19. EVENT LISTENERS
function addEventListeners() {
    // إعادة الحجم عند تغيير حجم النافذة
    window.addEventListener('resize', debounce(() => {
        config.isMobile = window.innerWidth <= 768;
    }, 250));
    
    // تفعيل الرسوم المتحركة عند التمرير
    window.addEventListener('scroll', throttle(() => {
        animateOnScroll();
    }, 100));
    
    // تحسين تجربة اللمس
    document.addEventListener('touchstart', () => {}, { passive: true });
    
    // منع السياق الافتراضي للصور
    document.addEventListener('contextmenu', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            showNotification('© LEGEND HOSTING - جميع الحقوق محفوظة', 'info');
        }
    });
}

// 20. INITIAL ANIMATIONS
function launchInitialAnimations() {
    // تأخير بسيط للرسوم المتحركة الأولية
    setTimeout(() => {
        // إضافة فئة للرسوم المتحركة عند التمرير
        document.querySelectorAll('.feature-card, .pricing-card, .founder-card').forEach((el, index) => {
            el.classList.add('animate-on-scroll');
            el.style.animationDelay = `${index * 0.1}s`;
        });
        
        // تشغيل الرسوم المتحركة الأولية
        animateOnScroll();
        
        // إظهار رسالة ترحيب
        setTimeout(() => {
            showNotification(`مرحبًا بك في ${config.siteName}! 🚀`, 'success');
        }, 1000);
    }, 500);
}

// 21. SERVICE WORKER (للتطبيق التقدمي)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
            (registration) => {
                console.log('ServiceWorker registered:', registration);
            },
            (error) => {
                console.log('ServiceWorker registration failed:', error);
            }
        );
    });
}

// 22. OFFLINE DETECTION
window.addEventListener('online', () => {
    showNotification('✅ عودة الاتصال بالإنترنت', 'success');
});

window.addEventListener('offline', () => {
    showNotification('⚠️ فقدان الاتصال بالإنترنت', 'warning');
});

// 23. LAZY LOADING IMAGES
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// 24. COPY TO CLIPBOARD
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('تم النسخ إلى الحافظة ✅', 'success');
    }).catch(err => {
        showNotification('فشل النسخ ❌', 'error');
    });
}

// 25. SITE ANALYTICS (مبسط)
function trackEvent(eventName, data = {}) {
    const analyticsData = {
        event: eventName,
        timestamp: new Date().toISOString(),
        ...data
    };
    
    console.log('Analytics Event:', analyticsData);
    
    // في الواقع، هنا ستقوم بإرسال البيانات إلى Google Analytics أو أي خدمة تحليلات
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, data);
    }
}

// 26. INITIALIZE TRACKING
document.addEventListener('DOMContentLoaded', () => {
    trackEvent('page_view', {
        page_title: document.title,
        page_location: window.location.href
    });
});

// 27. EXPORT FUNCTIONS (للاستخدام في الملفات الأخرى)
window.LegendHosting = {
    config,
    showNotification,
    copyToClipboard,
    trackEvent,
    toggleTheme
};

// 28. ERROR HANDLING
window.addEventListener('error', (event) => {
    console.error('حدث خطأ:', event.error);
    trackEvent('error', {
        message: event.error.message,
        file: event.filename,
        line: event.lineno,
        column: event.colno
    });
});

// 29. PAGE TRANSITIONS
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href && link.href.includes(window.location.origin) && !link.href.includes('#')) {
        e.preventDefault();
        document.body.style.opacity = '0.7';
        setTimeout(() => {
            window.location.href = link.href;
        }, 300);
    }
});

// 30. FINAL INITIALIZATION
console.log('Legend Hosting Script Loaded Successfully! 🚀');
console.log('Made with ❤️ by SBA & Vodka');