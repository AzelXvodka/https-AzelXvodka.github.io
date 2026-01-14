// AzelHost - JavaScript كامل

// تهيئة الموقع عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 أزل هوست - جاري التحميل...');
    
    // إخفاء أي شاشة تحميل إذا وجدت
    hideLoader();
    
    // تهيئة جميع المكونات
    initNavigation();
    initModals();
    initForms();
    initCounters();
    initAnimations();
    initPricing();
    initUserSystem();
    
    console.log('✅ أزل هوست - جاهز!');
});

// ===== إخفاء شاشة التحميل =====
function hideLoader() {
    // إذا كان هناك شاشة تحميل، أخفيها فوراً
    const loaders = document.querySelectorAll('.loader, .loading-screen');
    loaders.forEach(loader => {
        if (loader) {
            loader.style.display = 'none';
            loader.remove();
        }
    });
    
    // إظهار المحتوى الرئيسي
    document.body.style.visibility = 'visible';
    document.body.style.opacity = '1';
}

// ===== التنقل =====
function initNavigation() {
    // القائمة المتنقلة للجوال
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.classList.toggle('show');
        });
    }
    
    // إغلاق القائمة عند النقر على رابط
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                navLinks.style.display = 'none';
                navLinks.classList.remove('show');
            }
        });
    });
    
    // تغيير لون النافبار عند التمرير
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== النوافذ المنبثقة =====
function initModals() {
    // عناصر النوافذ
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeBtns = document.querySelectorAll('.close');
    
    // فتح نافذة تسجيل الدخول
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }
    
    // فتح نافذة التسجيل
    if (registerBtn && registerModal) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            registerModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }
    
    // إغلاق النوافذ
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    // إغلاق عند النقر خارج النافذة
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target === registerModal) {
            registerModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// ===== النماذج =====
function initForms() {
    // تبديل رؤية كلمة المرور
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // تسجيل الدخول
    const loginForm = document.querySelector('#loginModal form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (!email || !password) {
                showNotification('⚠️ الرجاء ملء جميع الحقول', 'warning');
                return;
            }
            
            // محاكاة تسجيل الدخول
            simulateLogin(email, password);
        });
    }
    
    // التسجيل
    const registerForm = document.querySelector('#registerModal form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('register-username').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirm = document.getElementById('register-confirm').value;
            
            // التحقق من المدخلات
            if (!username || !email || !password || !confirm) {
                showNotification('⚠️ الرجاء ملء جميع الحقول', 'warning');
                return;
            }
            
            if (password !== confirm) {
                showNotification('⚠️ كلمات المرور غير متطابقة', 'error');
                return;
            }
            
            if (password.length < 6) {
                showNotification('⚠️ كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'warning');
                return;
            }
            
            // محاكاة التسجيل
            simulateRegister(username, email, password);
        });
    }
}

// ===== محاكاة نظام المستخدم =====
function simulateLogin(email, password) {
    showLoading('جاري تسجيل الدخول...');
    
    setTimeout(() => {
        // تخزين بيانات المستخدم (محلي)
        const user = {
            email: email,
            username: email.split('@')[0],
            isLoggedIn: true,
            plan: 'free',
            joinDate: new Date().toLocaleDateString()
        };
        
        localStorage.setItem('azelhost_user', JSON.stringify(user));
        
        // إغلاق نافذة تسجيل الدخول
        document.getElementById('loginModal').style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // تحديث واجهة المستخدم
        updateUIAfterLogin(user);
        
        showNotification('✅ تم تسجيل الدخول بنجاح!', 'success');
        
        // توجيه إلى لوحة التحكم
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        
    }, 1500);
}

function simulateRegister(username, email, password) {
    showLoading('جاري إنشاء حسابك...');
    
    setTimeout(() => {
        // التحقق إذا كان الحساب موجوداً
        const existingUser = localStorage.getItem('azelhost_user');
        if (existingUser) {
            showNotification('⚠️ هذا الحساب مسجل مسبقاً', 'warning');
            return;
        }
        
        // إنشاء حساب جديد
        const newUser = {
            username: username,
            email: email,
            isLoggedIn: true,
            plan: 'free',
            servers: [],
            balance: 0,
            joinDate: new Date().toLocaleDateString()
        };
        
        localStorage.setItem('azelhost_user', JSON.stringify(newUser));
        
        // إغلاق نافذة التسجيل
        document.getElementById('registerModal').style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // تحديث واجهة المستخدم
        updateUIAfterLogin(newUser);
        
        showNotification('🎉 تم إنشاء حسابك بنجاح!', 'success');
        
        // توجيه إلى لوحة التحكم
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
        
    }, 2000);
}

function updateUIAfterLogin(user) {
    // تحديث الروابط في التنقل
    const navLinks = document.querySelector('.nav-links');
    
    // إزالة روابط تسجيل الدخول والتسجيل
    const loginLink = document.querySelector('.login-btn').parentElement;
    const registerLink = document.querySelector('.register-btn').parentElement;
    
    if (loginLink) loginLink.remove();
    if (registerLink) registerLink.remove();
    
    // إضافة رابط لوحة التحكم
    const dashboardLink = document.createElement('a');
    dashboardLink.href = 'dashboard.html';
    dashboardLink.className = 'nav-link';
    dashboardLink.innerHTML = '<i class="fas fa-tachometer-alt"></i> لوحة التحكم';
    
    // إضافة رابط الملف الشخصي
    const profileLink = document.createElement('a');
    profileLink.href = '#profile';
    profileLink.className = 'nav-link';
    profileLink.innerHTML = `<i class="fas fa-user"></i> ${user.username}`;
    
    // إضافة رابط تسجيل الخروج
    const logoutLink = document.createElement('a');
    logoutLink.href = '#logout';
    logoutLink.className = 'nav-link logout-btn';
    logoutLink.innerHTML = '<i class="fas fa-sign-out-alt"></i> تسجيل الخروج';
    logoutLink.addEventListener('click', logoutUser);
    
    // إضافة الروابط الجديدة
    navLinks.appendChild(dashboardLink);
    navLinks.appendChild(profileLink);
    navLinks.appendChild(logoutLink);
}

function logoutUser(e) {
    e.preventDefault();
    
    if (confirm('هل تريد تسجيل الخروج؟')) {
        localStorage.removeItem('azelhost_user');
        showNotification('✅ تم تسجيل الخروج بنجاح', 'info');
        
        // إعادة تحميل الصفحة
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }
}

function checkLoginStatus() {
    const user = localStorage.getItem('azelhost_user');
    if (user) {
        const userData = JSON.parse(user);
        if (userData.isLoggedIn) {
            updateUIAfterLogin(userData);
        }
    }
}

// ===== العدادات المتحركة =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count') || counter.textContent);
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
        
        // بدء العد عند ظهور العنصر
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

// ===== الأنيميشن =====
function initAnimations() {
    // إضافة تأثير عند التمرير
    const animatedElements = document.querySelectorAll('.feature-card, .pricing-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(element);
    });
}

// ===== الخطط =====
function initPricing() {
    // أزرار اختيار الخطة
    const planButtons = document.querySelectorAll('.pricing-card .btn');
    
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planCard = this.closest('.pricing-card');
            const planName = planCard.querySelector('h3').textContent;
            const planPrice = planCard.querySelector('.price').textContent;
            
            // التحقق من تسجيل الدخول
            const user = localStorage.getItem('azelhost_user');
            if (!user) {
                showNotification('⚠️ الرجاء تسجيل الدخول أولاً', 'warning');
                document.querySelector('.register-btn').click();
                return;
            }
            
            // عرض تفاصيل الخطة
            showPlanDetails(planName, planPrice);
        });
    });
}

function showPlanDetails(planName, planPrice) {
    const details = {
        '🆓 مجاني': {
            features: ['50 لاعب', '512MB رام', 'سكربتات أساسية', 'دعم عبر التذاكر'],
            monthly: 0,
            yearly: 0
        },
        '⭐ أساسي': {
            features: ['100 لاعب', '2GB رام', '20 سكربت', 'دعم سريع', 'نسخ يومي'],
            monthly: 29,
            yearly: 290
        },
        '🚀 احترافي': {
            features: ['250 لاعب', '4GB رام', '50+ سكربت', 'دعم مخصص', 'حماية DDoS', 'نطاق مجاني'],
            monthly: 59,
            yearly: 590
        },
        '🏢 مؤسسة': {
            features: ['500 لاعب', '8GB رام', 'جميع السكربتات', 'دعم 24/7 هاتفي', 'حماية كاملة', 'سيرفر مخصص'],
            monthly: 99,
            yearly: 990
        }
    };
    
    const plan = details[planName] || details['⭐ أساسي'];
    
    const modalHTML = `
        <div class="modal" id="planModal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2 class="modal-title"><i class="fas fa-shopping-cart"></i> ${planName}</h2>
                
                <div class="plan-details">
                    <div class="price-display">
                        <div class="monthly">
                            <h3>شهري</h3>
                            <div class="price">${plan.monthly} <span>درهم/شهر</span></div>
                            <button class="btn neon-btn" onclick="subscribeToPlan('${planName}', 'monthly')">
                                <i class="fas fa-calendar-alt"></i> اشترك شهرياً
                            </button>
                        </div>
                        
                        <div class="yearly">
                            <h3>سنوي <span class="discount">توفير 20%</span></h3>
                            <div class="price">${plan.yearly} <span>درهم/سنة</span></div>
                            <button class="btn neon-btn" onclick="subscribeToPlan('${planName}', 'yearly')">
                                <i class="fas fa-calendar-star"></i> اشترك سنوياً
                            </button>
                        </div>
                    </div>
                    
                    <div class="features-list">
                        <h3><i class="fas fa-check-circle"></i> المميزات المتضمنة:</h3>
                        <ul>
                            ${plan.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // إضافة النافذة المنبثقة
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // عرض النافذة
    const planModal = document.getElementById('planModal');
    planModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // إغلاق النافذة
    const closeBtn = planModal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        planModal.remove();
        document.body.style.overflow = 'auto';
    });
    
    // إغلاق عند النقر خارج النافذة
    planModal.addEventListener('click', (e) => {
        if (e.target === planModal) {
            planModal.remove();
            document.body.style.overflow = 'auto';
        }
    });
}

function subscribeToPlan(planName, period) {
    const user = JSON.parse(localStorage.getItem('azelhost_user') || '{}');
    
    if (!user.email) {
        showNotification('⚠️ الرجاء تسجيل الدخول أولاً', 'warning');
        return;
    }
    
    showLoading(`جاري تفعيل خطة ${planName}...`);
    
    setTimeout(() => {
        // تحديث خطة المستخدم
        user.plan = planName;
        user.planPeriod = period;
        user.planStart = new Date().toISOString();
        
        localStorage.setItem('azelhost_user', JSON.stringify(user));
        
        showNotification(`🎉 تم تفعيل خطة ${planName} بنجاح!`, 'success');
        
        // إغلاق نافذة الخطة
        const planModal = document.getElementById('planModal');
        if (planModal) {
            planModal.remove();
            document.body.style.overflow = 'auto';
        }
        
        // توجيه إلى لوحة التحكم
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 2000);
        
    }, 2000);
}

// ===== نظام المستخدم =====
function initUserSystem() {
    // التحقق من حالة تسجيل الدخول
    checkLoginStatus();
    
    // معالجة طلبات الاستعادة
    const forgotLinks = document.querySelectorAll('a[href="#forgot"]');
    forgotLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showForgotPassword();
        });
    });
}

function showForgotPassword() {
    const modalHTML = `
        <div class="modal" id="forgotModal">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2 class="modal-title"><i class="fas fa-key"></i> استعادة كلمة المرور</h2>
                
                <form class="auth-form" id="forgotForm">
                    <div class="form-group">
                        <label for="forgot-email"><i class="fas fa-envelope"></i> البريد الإلكتروني</label>
                        <input type="email" id="forgot-email" placeholder="example@email.com" required>
                    </div>
                    
                    <button type="submit" class="btn neon-btn full-width">
                        <i class="fas fa-paper-plane"></i> إرسال رابط الاستعادة
                    </button>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const forgotModal = document.getElementById('forgotModal');
    forgotModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    const closeBtn = forgotModal.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        forgotModal.remove();
        document.body.style.overflow = 'auto';
    });
    
    forgotModal.addEventListener('click', (e) => {
        if (e.target === forgotModal) {
            forgotModal.remove();
            document.body.style.overflow = 'auto';
        }
    });
    
    const form = document.getElementById('forgotForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('forgot-email').value;
        
        if (!email) {
            showNotification('⚠️ الرجاء إدخال البريد الإلكتروني', 'warning');
            return;
        }
        
        showLoading('جاري إرسال رابط الاستعادة...');
        
        setTimeout(() => {
            showNotification('📧 تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني', 'success');
            forgotModal.remove();
            document.body.style.overflow = 'auto';
        }, 1500);
    });
}

// ===== أدوات مساعدة =====
function showNotification(message, type = 'info') {
    // إزالة أي إشعارات سابقة
    const oldNotification = document.querySelector('.notification');
    if (oldNotification) oldNotification.remove();
    
    // إنشاء الإشعار
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // ألوان حسب النوع
    const colors = {
        success: '#00ff00',
        error: '#ff0000',
        warning: '#ffff00',
        info: '#00aaff'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 
                              type === 'error' ? 'exclamation-circle' : 
                              type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // إضافة الأنيميشن
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${colors[type] || colors.info}20;
        border: 1px solid ${colors[type] || colors.info};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 400px;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(notification);
    
    // زر الإغلاق
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // إزالة تلقائية بعد 5 ثواني
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function showLoading(message = 'جاري المعالجة...') {
    // إزالة أي تحميل سابق
    const oldLoading = document.querySelector('.loading-overlay');
    if (oldLoading) oldLoading.remove();
    
    const loading = document.createElement('div');
    loading.className = 'loading-overlay';
    
    loading.innerHTML = `
        <div class="loading-content">
            <div class="spinner"></div>
            <p>${message}</p>
        </div>
    `;
    
    loading.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;
    
    document.body.appendChild(loading);
    
    return loading;
}

// إضافة أنيميشن الإشعارات
if (!document.querySelector('#notification-animations')) {
    const style = document.createElement('style');
    style.id = 'notification-animations';
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .loading-content .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid rgba(0, 255, 204, 0.2);
            border-top: 4px solid #00ffcc;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 1rem;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// ===== التمرير السلس =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#' || href.startsWith('#!')) return;
        
        e.preventDefault();
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

console.log('🎮 أزل هوست - نظام الاستضافة جاهز للتشغيل!');