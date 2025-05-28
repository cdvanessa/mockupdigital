document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const navClose = document.getElementById('navClose');
    const overlay = document.getElementById('overlay');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileNav.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (navClose) {
        navClose.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    if (overlay) {
        overlay.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const mobileNav = document.getElementById('mobileNav');
        const overlay = document.getElementById('overlay');
        
        if (mobileNav && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight - 20, // Adjusted for header height + padding
                behavior: 'smooth'
            });
        }
    });
});

// Tab functionality for Methodology and Materials
function setupTabs(tabSelector, contentSelector, parentSelector) {
    const tabBtns = document.querySelectorAll(tabSelector);
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const parentCard = btn.closest(parentSelector);
            const siblingBtns = parentCard.querySelectorAll(tabSelector);
            const siblingContents = parentCard.querySelectorAll(contentSelector);
            
            siblingBtns.forEach(siblingBtn => siblingBtn.classList.remove('active'));
            siblingContents.forEach(content => content.classList.remove('active'));
            
            btn.classList.add('active');
            
            const tabId = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(tabId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// Initialize tabs for Methodology section
setupTabs('.methodology .tab-btn', '.methodology .tab-content', '.technique-card');

// Initialize tabs for Materials section
setupTabs('.materials .tab-btn', '.materials .tab-content', '.material-card');

// "Ver más referencias" functionality
const verMasBtn = document.getElementById('verMasBtn');
const referenceList = document.querySelector('.reference-list');

if (verMasBtn && referenceList) {
    let showingAllReferences = false;
    
    verMasBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if (showingAllReferences) {
            const references = referenceList.querySelectorAll('li');
            references.forEach((ref, index) => {
                if (index >= 5) {
                    ref.style.display = 'none';
                }
            });
            verMasBtn.textContent = 'Ver más referencias';
        } else {
            const references = referenceList.querySelectorAll('li');
            references.forEach(ref => {
                ref.style.display = 'block';
            });
            verMasBtn.textContent = 'Ver menos referencias';
        }
        
        showingAllReferences = !showingAllReferences;
    });

    const references = referenceList.querySelectorAll('li');
    references.forEach((ref, index) => {
        if (index >= 5) {
            ref.style.display = 'none';
        }
    });
}

// Contact button functionality
document.querySelectorAll('.contact-btn').forEach(button => {
    button.addEventListener('click', function() {
        const text = this.textContent.trim();
        let message = '';
        
        if (text.includes('Email')) {
            message = 'Funcionalidad de email - Agregar mailto links';
        } else if (text.includes('WhatsApp')) {
            message = 'Funcionalidad de WhatsApp - Agregar enlaces de WhatsApp';
        } else if (text.includes('LinkedIn')) {
            message = 'Funcionalidad de LinkedIn - Agregar perfiles de LinkedIn';
        }
        
        alert(message);
    });
});

// Animation on scroll
document.addEventListener('DOMContentLoaded', () => {
    const animateOnScroll = () => {
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };
    
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
});

console.log('Mock-Up Dental website loaded successfully!');