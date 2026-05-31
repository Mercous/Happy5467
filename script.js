(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        initCopyIP();
        initCategoryFilter();
        initCardAnimations();
        initLevelsPage();
        initRulesPage();
    });
    
    function initMobileMenu() {
        const menuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');
        
        if (menuBtn && navMenu) {
            menuBtn.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                menuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
            });
        }
    }
    
    function initCopyIP() {
        const ipElement = document.getElementById('serverIp');
        if (ipElement) {
            ipElement.style.cursor = 'pointer';
            ipElement.addEventListener('click', function() {
                const ipText = this.textContent.trim();
                navigator.clipboard.writeText(ipText).then(function() {
                    showNotification('IP скопирован: ' + ipText);
                }).catch(function() {
                    showNotification('Не удалось скопировать IP');
                });
            });
        }
        
        const anyIpElements = document.querySelectorAll('.server-ip');
        anyIpElements.forEach(function(el) {
            if (el.id !== 'serverIp') {
                el.style.cursor = 'pointer';
                el.addEventListener('click', function() {
                    const ipText = this.textContent.trim();
                    navigator.clipboard.writeText(ipText);
                    showNotification('IP скопирован: ' + ipText);
                });
            }
        });
    }
    
    function initCategoryFilter() {
        const select = document.getElementById('category-select');
        const categories = document.querySelectorAll('.craft-category');
        
        if (!select || categories.length === 0) return;
        
        select.addEventListener('change', function() {
            const selectedValue = this.value;
            
            categories.forEach(function(category) {
                if (selectedValue === 'all') {
                    category.classList.remove('hidden');
                } else if (category.dataset.category === selectedValue) {
                    category.classList.remove('hidden');
                } else {
                    category.classList.add('hidden');
                }
            });
        });
    }
    
    function initCardAnimations() {
        const cards = document.querySelectorAll('.feature-card, .info-card, .craft-card, .stat-card, .loot-card');
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function() {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 50);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        cards.forEach(function(card) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            observer.observe(card);
        });
    }
    
    function initLevelsPage() {
        const statBars = document.querySelectorAll('.stat-fill');
        if (statBars.length) {
            statBars.forEach(bar => {
                const targetWidth = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 200);
            });
        }
        
        const tableRows = document.querySelectorAll('.stats-table tbody tr');
        tableRows.forEach(row => {
            row.addEventListener('mouseenter', () => {
                row.style.backgroundColor = 'rgba(233, 69, 96, 0.1)';
            });
            row.addEventListener('mouseleave', () => {
                row.style.backgroundColor = '';
            });
        });
    }
    
    function initRulesPage() {
        const rulesBtn = document.getElementById('rulesBtn');
        if (rulesBtn && !rulesBtn.disabled) {
            rulesBtn.addEventListener('click', function() {
                window.location.href = 'rules.html';
            });
        }
    }
    
    function showNotification(message) {
        const oldToast = document.querySelector('.toast-notification');
        if (oldToast) oldToast.remove();
        
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(function() {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.2s ease';
            setTimeout(function() {
                if (toast.parentNode) toast.remove();
            }, 200);
        }, 2000);
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'c') {
            const selection = window.getSelection().toString();
            if (!selection) {
                const ipElement = document.querySelector('.server-ip');
                if (ipElement && document.activeElement !== ipElement) {
                    e.preventDefault();
                    const ipText = ipElement.textContent.trim();
                    navigator.clipboard.writeText(ipText);
                    showNotification('IP скопирован');
                }
            }
        }
    });
})();