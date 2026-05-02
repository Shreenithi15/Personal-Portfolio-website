document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for sticky navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple scroll reveal animation for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.glass-panel');
    cards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
        observer.observe(card);
    });
    // Theme Toggle Logic
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Safely check local storage for saved theme preference
    let savedTheme = null;
    try {
        savedTheme = localStorage.getItem('theme');
    } catch (e) {
        console.warn('Local storage is not available. Theme preference will not be saved.');
    }

    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeBtn) themeBtn.textContent = '🌙';
    } else {
        if (themeBtn) themeBtn.textContent = '☀️';
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDarkMode = body.classList.contains('dark-mode');
            
            themeBtn.textContent = isDarkMode ? '🌙' : '☀️';
            
            try {
                localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            } catch (e) {
                // Ignore errors if localStorage is blocked
            }
        });
    }
});
