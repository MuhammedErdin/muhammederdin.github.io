document.addEventListener('DOMContentLoaded', function() {
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    
                    
                    let extraOffset = 10;
                    
                    
                    if (targetId === '#contact') {
                        extraOffset = 20;
                    }
                    
                    
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - extraOffset;
                    
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    
                    document.querySelectorAll('.nav-links a').forEach(navLink => {
                        navLink.classList.remove('active');
                    });
                    
                    
                    this.classList.add('active');
                    
                    
                    history.pushState(null, null, targetId);
                    
                    // Eğer mobil menü açıksa, tıklama yapıldığında kapat
                    if (document.querySelector('.mobile-menu').classList.contains('active')) {
                        document.querySelector('.mobile-menu').classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Mobil menü toggle işlevi
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            if (mobileMenu.style.display === 'block') {
                mobileMenu.style.display = 'none';
                setTimeout(() => {
                    mobileMenu.classList.remove('active');
                }, 300);
            } else {
                mobileMenu.style.display = 'block';
                setTimeout(() => {
                    mobileMenu.classList.add('active');
                }, 10);
            }
        });
    }
    
    // Mobil menü linklerine aktif class ekleme
    document.querySelectorAll('.mobile-nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            document.querySelectorAll('.mobile-nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    function fadeInOnScroll() {
        const elements = document.querySelectorAll('.timeline-item, .skill, .project, .contact-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    
    window.addEventListener('scroll', fadeInOnScroll);
    fadeInOnScroll();
    
    
    function setActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
        
        
        const viewportCenter = window.innerHeight / 2;
        
        let activeSection = null;
        let minDistance = Infinity;
        
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
            
            
            if (distance < minDistance) {
                minDistance = distance;
                activeSection = section;
            }
        });
        
        
        if (activeSection) {
            const activeId = activeSection.getAttribute('id');
            
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === `#${activeId}`) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    }
    
    
    window.addEventListener('scroll', setActiveNav);
    
    
    setActiveNav();
}); 