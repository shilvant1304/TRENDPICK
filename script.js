// ========================================
// TrendPick — JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------
    // Navbar Scroll Effect
    // ----------------------------------------
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar glass effect
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ----------------------------------------
    // Mobile Menu
    // ----------------------------------------

    // ----------------------------------------
    // Mobile Menu
    // ----------------------------------------
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });



    // ----------------------------------------
    // Active Nav Link on Scroll
    // ----------------------------------------
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);

            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // ----------------------------------------
    // Search Modal
    // ----------------------------------------
    const searchBtn = document.getElementById('search-btn');
    const searchModal = document.getElementById('search-modal');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');

    searchBtn.addEventListener('click', () => {
        searchModal.classList.add('active');
        setTimeout(() => searchInput.focus(), 300);
    });

    searchClose.addEventListener('click', () => {
        searchModal.classList.remove('active');
    });

    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') searchModal.classList.remove('active');
    });

    // ----------------------------------------
    // Counter Animation
    // ----------------------------------------
    const statNumbers = document.querySelectorAll('.stat-number');
    let counterAnimated = false;

    function animateCounters() {
        if (counterAnimated) return;

        statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 16);
        });

        counterAnimated = true;
    }

    // Trigger counter when hero stats are visible
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(heroStats);
    }

    // ----------------------------------------
    // Hierarchical Category Navigation
    // ----------------------------------------
    const mainCategories = document.getElementById('main-categories');
    const subCategoryWrapper = document.getElementById('sub-categories');
    const backBtn = document.getElementById('back-to-categories');
    const categoryCards = document.querySelectorAll('.category-card[data-parent]');
    const subCategoryCards = document.querySelectorAll('.sub-category-card');
    const allFilterTabs = document.querySelectorAll('.filter-tab');
    const subCategoryGrids = document.querySelectorAll('.sub-category-grid');

    // Parent category click
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const parentId = card.getAttribute('data-parent');
            const targetSubGrid = document.getElementById(`sub-${parentId}`);

            if (!targetSubGrid) return;

            // Hide main grid
            mainCategories.classList.add('hidden');
            
            // Show sub wrapper and specific sub grid
            subCategoryWrapper.classList.add('active');
            subCategoryGrids.forEach(grid => grid.classList.remove('active'));
            targetSubGrid.classList.add('active');
            
            // Show back button
            backBtn.classList.add('active');

            // Scroll to top of categories section
            document.getElementById('categories').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Back to main categories
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            mainCategories.classList.remove('hidden');
            subCategoryWrapper.classList.remove('active');
            backBtn.classList.remove('active');
            subCategoryGrids.forEach(grid => grid.classList.remove('active'));
        });
    }

    // Sub-category clicks (Filter sync)
    subCategoryCards.forEach(subCard => {
        subCard.addEventListener('click', (e) => {
            const filter = subCard.getAttribute('data-filter');
            
            // Look for matching filter tab in trending section
            const targetTab = Array.from(allFilterTabs).find(tab => tab.getAttribute('data-filter') === filter);
            
            if (targetTab) {
                // Smooth scroll to Trending section first
                document.getElementById('trending').scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Then click the tab (small delay for scroll)
                setTimeout(() => targetTab.click(), 500);
            }
        });
    });


    // ----------------------------------------
    // Product Filter Tabs
    // ----------------------------------------
    const filterTabs = document.querySelectorAll('.filter-tab');
    const productCards = document.querySelectorAll('.product-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');

            // Filter products with animation
            productCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s both`;
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ----------------------------------------
    // Wishlist Toggle
    // ----------------------------------------
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            btn.classList.toggle('active');
            btn.textContent = btn.classList.contains('active') ? '♥' : '♡';
        });
    });

    // ----------------------------------------
    // Countdown Timer
    // ----------------------------------------
    function updateCountdown() {
        const now = new Date();
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        
        const diff = endOfDay - now;
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    // ----------------------------------------
    // Scroll Reveal Animation
    // ----------------------------------------
    const revealElements = document.querySelectorAll(
        '.category-card, .product-card, .blog-card, .section-header, .deals-content, .newsletter-content'
    );

    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ----------------------------------------
    // Newsletter Form
    // ----------------------------------------
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletter-email').value;
            
            if (email) {
                const btn = document.getElementById('subscribe-btn');
                btn.textContent = '✅ Subscribed!';
                btn.style.background = 'linear-gradient(135deg, #00CEC9 0%, #55EFC4 100%)';
                document.getElementById('newsletter-email').value = '';
                
                setTimeout(() => {
                    btn.textContent = 'Subscribe Free';
                    btn.style.background = '';
                }, 3000);
            }
        });
    }

    // ----------------------------------------
    // Smooth scroll for all anchor links
    // ----------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ----------------------------------------
    // Product card hover tilt effect
    // ----------------------------------------
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});
