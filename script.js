/**
 * NeerajBuilds Portfolio Website - JavaScript
 * Interactive features and animations for a personal portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // =====================
    // Mobile Menu Toggle
    // =====================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
        
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // =====================
    // Smooth Scroll for Anchor Links
    // =====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =====================
    // FAQ Accordion
    // =====================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // =====================
    // Header Scroll Effect
    // =====================
    const header = document.querySelector('nav');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
            header.style.backgroundColor = 'rgba(13, 13, 13, 0.98)';
        } else {
            header.style.boxShadow = 'none';
            header.style.backgroundColor = 'rgba(13, 13, 13, 0.95)';
        }
        
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // =====================
    // Navbar Active State on Scroll
    // =====================
    const navLinks = document.querySelectorAll('.nav-link');
    const sectionsWithIds = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sectionsWithIds.forEach(section => {
            const sectionTop = section.offsetTop;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // =====================
    // Typing Effect in Hero
    // =====================
    const createTypingEffect = () => {
        const heroTitle = document.querySelector('#hero h1 span.text-transparent');
        if (!heroTitle) return;
        
        const phrases = ['That Look Great', 'That Perform Well', 'That Convert Visitors', 'That Engage Users'];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        const typeWriter = () => {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                heroTitle.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                heroTitle.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 500;
            }
            
            setTimeout(typeWriter, typingSpeed);
        };
        
        setTimeout(typeWriter, 1000);
    };
    createTypingEffect();
    
    // =====================
    // 3D Card Tilt Effect
    // =====================
    const initCardTilt = () => {
        const cards = document.querySelectorAll('.service-card, .project-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    };
    initCardTilt();
    
    // =====================
    // Counter Animation for Stats
    // =====================
    const statNumbers = document.querySelectorAll('.stat-item p:first-child, .stat-box p:first-child');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                
                if (!isNaN(parseFloat(text))) {
                    animateNumber(target);
                }
                
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
    
    function animateNumber(element) {
        const text = element.textContent;
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        const hasLess = text.includes('<');
        
        let num = parseFloat(text.replace(/[^0-9.]/g, ''));
        const suffix = text.replace(/[0-9.]/g, '').trim();
        
        if (isNaN(num)) return;
        
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentNum = start + (num - start) * easeOutQuart;
            
            let formatted = Math.floor(currentNum);
            if (currentNum % 1 !== 0) {
                formatted = currentNum.toFixed(currentNum < 10 ? 1 : 0);
            }
            
            let displayText = hasLess ? '< ' : '';
            displayText += formatted;
            if (hasPlus) displayText += '+';
            if (hasPercent) displayText += '%';
            displayText += suffix;
            
            element.textContent = displayText;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    }
    
    // =====================
    // Scroll Animation for Cards
    // =====================
    const animateOnScroll = document.querySelectorAll('.service-card, .project-card, .process-step, .faq-item');
    
    animateOnScroll.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                scrollObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    animateOnScroll.forEach(el => scrollObserver.observe(el));
    
    // =====================
    // Form Submission with Email Validation
    // =====================
    const contactForm = document.querySelector('form[action*="formspree"]');
    
    // Email validation regex - checks for valid email format
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    // Check if email is from disposable/temp email services (basic list)
    const isDisposableEmail = (email) => {
        const disposableDomains = [
            'tempmail.com', 'temp-mail.org', 'throwaway.email', 
            'guerrillamail.com', 'mailinator.com', '10minutemail.com',
            'fakeinbox.com', 'trashmail.com', 'getnada.com',
            'yopmail.com', 'sharklasers.com', 'spam4.me', 'grr.la',
            'maildrop.cc', 'dispostable.com', 'emailondeck.com'
        ];
        const domain = email.split('@')[1]?.toLowerCase();
        return disposableDomains.includes(domain);
    };
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            const emailInput = contactForm.querySelector('input[name="email"]');
            const email = emailInput.value.trim();
            
            // Clear previous error messages
            const existingError = contactForm.querySelector('.email-error');
            if (existingError) existingError.remove();
            
            // Validate email format
            if (!email) {
                showError(emailInput, 'Please enter your email address');
                return;
            }
            
            if (!isValidEmail(email)) {
                showError(emailInput, 'Please enter a valid email address');
                return;
            }
            
            // Check for disposable email
            if (isDisposableEmail(email)) {
                showError(emailInput, 'Please use a permanent email address. Temporary/disposable emails are not allowed.');
                return;
            }
            
            // Show sending state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
            submitBtn.disabled = true;
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            try {
                // Try to send to Formspree (for email notification)
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Save to localStorage for admin panel
                    saveToLocalStorage(data);
                    alert('Message sent successfully! I\'ll get back to you soon.');
                    contactForm.reset();
                } else {
                    // Still save locally even if Formspree fails
                    saveToLocalStorage(data);
                    alert('Message sent! I\'ll get back to you soon.');
                }
            } catch (error) {
                // Save locally as fallback (for when Formspree fails or is not configured)
                saveToLocalStorage(data);
                alert('Message sent! I\'ll get back to you soon.');
            }
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    }
    
    // Show error message below input
    function showError(inputElement, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'email-error text-red-500 text-sm mt-1';
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle mr-1"></i> ${message}`;
        inputElement.parentNode.appendChild(errorDiv);
        inputElement.classList.add('error');
        
        // Remove error on input
        inputElement.addEventListener('input', () => {
            errorDiv.remove();
            inputElement.classList.remove('error');
        });
    }
    
// Save message to localStorage
    function saveToLocalStorage(data) {
        const messages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
        
        // Get current currency preference
        const currency = localStorage.getItem('preferredCurrency') || 'USD';
        
        messages.push({
            ...data,
            currency: currency,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('portfolioMessages', JSON.stringify(messages));
        console.log('Message saved locally with currency:', currency);
    }
    
    // =====================
    // Project Card Hover Effect
    // =====================
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.zIndex = '1';
        });
    });
    
// Console message
    console.log('NeerajBuilds Portfolio - Loaded');
    
    // =====================
    // Currency Toggle Functionality
    // =====================
    
    // Currency configuration
    const currencyConfig = {
        INR: { symbol: '₹', name: 'INR', exchangeRate: 83 }, // 1 USD = ~83 INR
        USD: { symbol: '$', name: 'USD', exchangeRate: 1 }
    };
    
    // Detect user location based on timezone (legal approach - uses browser timezone)
    function detectCurrencyFromTimezone() {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        // Indian timezones
        const indianTimezones = ['Asia/Kolkata', 'Asia/Chennai', 'Asia/Mumbai', 'Asia/Dhaka', 'Asia/Kathmandu'];
        
        // Check if timezone suggests India or nearby region
        if (indianTimezones.some(tz => timezone.includes(tz.replace('Asia/', '')))) {
            return 'INR';
        }
        
        // Check timezone string for India-related identifiers
        if (timezone.toLowerCase().includes('india') || timezone.includes('Kolkata')) {
            return 'INR';
        }
        
        return 'USD'; // Default to USD for international
    }
    
    // Get saved currency preference or detect from timezone
    function getCurrentCurrency() {
        const saved = localStorage.getItem('preferredCurrency');
        if (saved && (saved === 'INR' || saved === 'USD')) {
            return saved;
        }
        return detectCurrencyFromTimezone();
    }
    
    // Update currency display in dropdown
    function updateCurrencyUI(currency) {
        const inrBtn = document.getElementById('currencyINR');
        const usdBtn = document.getElementById('currencyUSD');
        
        if (inrBtn && usdBtn) {
            if (currency === 'INR') {
                inrBtn.classList.add('active', 'text-primary');
                inrBtn.classList.remove('text-gray-400');
                usdBtn.classList.remove('active', 'text-primary');
                usdBtn.classList.add('text-gray-400');
            } else {
                usdBtn.classList.add('active', 'text-primary');
                usdBtn.classList.remove('text-gray-400');
                inrBtn.classList.remove('active', 'text-primary');
                inrBtn.classList.add('text-gray-400');
            }
        }
        
        // Update budget dropdown options
        updateBudgetOptions(currency);
        
        // Update payment display text
        updatePaymentDisplay(currency);
    }
    
    // Update budget dropdown based on currency
    function updateBudgetOptions(currency) {
        const budgetOptions = document.querySelectorAll('.budget-option');
        
        budgetOptions.forEach(option => {
            if (currency === 'INR') {
                option.textContent = option.getAttribute('data-inr');
            } else {
                option.textContent = option.getAttribute('data-usd');
            }
        });
    }
    
    // Update payment display text in process section
    function updatePaymentDisplay(currency) {
        const currencyDisplay = document.querySelector('.currency-display');
        
        if (currencyDisplay) {
            if (currency === 'INR') {
                currencyDisplay.textContent = 'Secure UPI/Bank Transfer/PayPal';
            } else {
                currencyDisplay.textContent = 'Secure PayPal/Stripe/Paytm';
            }
        }
    }
    
    // Set currency function (called by buttons)
    window.setCurrency = function(currency) {
        localStorage.setItem('preferredCurrency', currency);
        updateCurrencyUI(currency);
    };
    
    // Initialize currency on page load
    const initialCurrency = getCurrentCurrency();
    updateCurrencyUI(initialCurrency);
    
    // =====================
    // Availability Toggle (Owner Only)
    // =====================
    const availabilityToggle = document.getElementById('availabilityToggle');
    const availabilityDot = document.getElementById('availabilityDot');
    const availabilityText = document.getElementById('availabilityText');

    // Owner password for toggling availability (change this to your desired password)
    const OWNER_PASSWORD = 'scs390652';

    function updateAvailabilityDisplay(isAvailable) {
        if (availabilityDot && availabilityText) {
            if (isAvailable) {
                availabilityDot.className = 'w-2 h-2 bg-green-500 rounded-full animate-pulse';
                availabilityText.textContent = 'Available for new projects';
            } else {
                availabilityDot.className = 'w-2 h-2 bg-red-500 rounded-full';
                availabilityText.textContent = 'Not available for new projects';
            }
        }
    }

    // Load saved availability status
    const savedAvailability = localStorage.getItem('availabilityStatus');
    if (savedAvailability !== null) {
        updateAvailabilityDisplay(savedAvailability === 'true');
    }

    // Set up click handler for availability toggle
    if (availabilityToggle) {
        availabilityToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const enteredPassword = prompt('Enter owner password to toggle availability:');
            
            if (enteredPassword === null) {
                return;
            }
            
            if (enteredPassword === OWNER_PASSWORD) {
                const currentStatus = localStorage.getItem('availabilityStatus');
                let newStatus;
                
                if (currentStatus === null || currentStatus === 'true') {
                    newStatus = 'false';
                } else {
                    newStatus = 'true';
                }
                
                localStorage.setItem('availabilityStatus', newStatus);
                updateAvailabilityDisplay(newStatus === 'true');
            } else {
                alert('Incorrect password!');
            }
        });
    }
});

