
// Typewriter effect for all text elements
window.onload = function() {
    // Select all elements you want to apply the effect to
    const selectors = ['.typewriter', 'h1', 'h2', 'p', 'a.card-btn'];
    const elements = [];
    selectors.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => elements.push(el));
    });

    function typeElement(el, text, i) {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            setTimeout(() => typeElement(el, text, i + 1), 15);
        }
    }

    elements.forEach(el => {
        const text = el.textContent;
        el.textContent = '';
        typeElement(el, text, 0);
    });

    // Mobile nav pop-out toggle logic
    const navToggle = document.querySelector('.nav-toggle');
    const navContent = document.querySelector('.nav-content');
    if (navToggle && navContent) {
        navToggle.addEventListener('click', function() {
            navContent.classList.toggle('open');
        });
        // Close nav when clicking a link (mobile UX)
        navContent.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navContent.classList.remove('open');
            });
        });
    }

    // Desktop: Show side-navbar after scroll, keep top nav always
    let lastScrollY = window.scrollY;
    let desktopNavHidden = false;
    function handleNavScroll() {
        const sideNavbar = document.getElementById('side-navbar');
        const topNavbar = document.querySelector('.top-navbar');
        if (!sideNavbar || !topNavbar) return;
        // Side bar logic
        if (window.innerWidth >= 900) {
            if (window.scrollY > 60) {
                sideNavbar.classList.add('visible');
                if (!desktopNavHidden) {
                    topNavbar.classList.add('hide-top-navbar');
                    desktopNavHidden = true;
                }
            } else {
                sideNavbar.classList.remove('visible');
                topNavbar.classList.remove('hide-top-navbar');
                desktopNavHidden = false;
            }
        } else {
            sideNavbar.classList.remove('visible');
            // Top nav hide/show on scroll direction (mobile/tablet only)
            if (window.scrollY > lastScrollY && window.scrollY > 20) {
                // Scrolling down
                topNavbar.classList.add('hide-top-navbar');
            } else {
                // Scrolling up
                topNavbar.classList.remove('hide-top-navbar');
            }
            desktopNavHidden = false;
        }
        lastScrollY = window.scrollY;
    }
    window.addEventListener('scroll', handleNavScroll);
    window.addEventListener('resize', handleNavScroll);
    handleNavScroll();
};
