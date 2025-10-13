// Modern Portfolio Website Utilities
// Maxim Van Dorn - Enhanced functionality for all pages

class PortfolioUtils {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupVideoBackground();
        this.setupAnimations();
        this.setupAccessibility();
    }

    // Navigation functionality
    setupNavigation() {
        const navToggle = document.querySelector('.nav-toggle');
        const sideMenu = document.querySelector('.side-menu');

        if (navToggle && sideMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                sideMenu.classList.toggle('active');
                
                // Update ARIA attributes for accessibility
                const isExpanded = sideMenu.classList.contains('active');
                navToggle.setAttribute('aria-expanded', isExpanded);
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!sideMenu.contains(e.target) && !navToggle.contains(e.target)) {
                    navToggle.classList.remove('active');
                    sideMenu.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && sideMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    sideMenu.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                    navToggle.focus();
                }
            });
        }
    }

    // Video background enhancements
    setupVideoBackground() {
        const video = document.querySelector('.video-background video');
        
        if (video) {
            // Ensure video plays on mobile devices
            video.addEventListener('loadedmetadata', () => {
                video.muted = true;
                video.play().catch(e => console.log('Video autoplay failed:', e));
            });

            // Pause video when not visible to save battery
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        video.play().catch(e => console.log('Video play failed:', e));
                    } else {
                        video.pause();
                    }
                });
            });
            observer.observe(video);

            // Handle orientation changes on mobile
            window.addEventListener('orientationchange', () => {
                setTimeout(() => {
                    video.load();
                }, 100);
            });
        }
    }

    // Animation setup
    setupAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all elements with fade-in class
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Add smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Accessibility enhancements
    setupAccessibility() {
        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--accent-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add main content ID if it doesn't exist
        const main = document.querySelector('main');
        if (main && !main.id) {
            main.id = 'main-content';
        }

        // Reduce motion for users who prefer it
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--transition', 'none');
            document.documentElement.style.setProperty('--transition-fast', 'none');
        }
    }

    // Color utilities for filter controls
    static hexToRgba(hex, alpha = 0.1) {
        const r = parseInt(hex.substr(1, 2), 16);
        const g = parseInt(hex.substr(3, 2), 16);
        const b = parseInt(hex.substr(5, 2), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    // Responsive utilities
    static getBreakpoint() {
        const width = window.innerWidth;
        if (width <= 480) return 'mobile-small';
        if (width <= 768) return 'mobile';
        if (width <= 1024) return 'tablet';
        return 'desktop';
    }

    // Performance utilities
    static debounce(func, wait) {
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

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// Filter Controls Class for Homepage
class FilterControls {
    constructor() {
        this.videoBackground = document.querySelector('.video-background');
        this.colorMask = document.querySelector('.color-mask');
        this.filterButtons = document.querySelectorAll('[data-filter]');
        this.colorPicker = document.getElementById('colorPicker');
        
        if (this.filterButtons.length > 0 || this.colorPicker) {
            this.init();
        }
    }

    init() {
        this.setupFilterButtons();
        this.setupColorPicker();
    }

    setupFilterButtons() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                // Remove all filter classes
                this.videoBackground.classList.remove(
                    'filter-invert', 'filter-grayscale', 'filter-sepia', 
                    'filter-blur', 'filter-contrast', 'filter-brightness'
                );
                
                // Add the selected filter class
                const filter = button.dataset.filter;
                if (filter !== 'none') {
                    this.videoBackground.classList.add(`filter-${filter}`);
                }
            });
        });
    }

    setupColorPicker() {
        if (this.colorPicker && this.colorMask) {
            this.colorPicker.addEventListener('input', (e) => {
                const color = e.target.value;
                this.colorMask.style.background = PortfolioUtils.hexToRgba(color, 0.1);
            });
        }
    }
}

// Projects Loader Class
class ProjectsLoader {
    constructor() {
        this.projectsGrid = document.getElementById('projectsGrid');
        if (this.projectsGrid) {
            this.loadProjects();
        }
    }

    async loadProjects() {
        try {
            const response = await fetch('data/projects.json');
            const data = await response.json();
            this.renderProjects(data.projects);
        } catch (error) {
            console.error('Error loading projects:', error);
            this.renderError();
        }
    }

    renderProjects(projects) {
        if (!projects || projects.length === 0) {
            this.renderEmpty();
            return;
        }

        this.projectsGrid.innerHTML = projects.map(project => this.createProjectCard(project)).join('');
        this.setupProjectAnimations();
    }

    createProjectCard(project) {
        return `
            <div class="project-card fade-in">
                ${project.image ? `
                    <div class="project-image">
                        <img src="${project.image}" alt="${project.title}" onerror="this.parentElement.style.display='none'">
                    </div>
                ` : ''}
                <div class="project-content">
                    <div class="project-header">
                        <h3 class="project-title">${project.title}</h3>
                        <span class="project-status ${project.status ? project.status.toLowerCase().replace(' ', '-') : 'unknown'}">${project.status || 'Unknown'}</span>
                    </div>
                    <p class="project-description">${project.description}</p>
                    ${project.technologies ? `
                        <div class="project-tech">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    ` : ''}
                    <div class="project-actions">
                        ${project.link && project.link !== '#' ? 
                            `<a href="${project.link}" class="project-link" target="_blank" rel="noopener noreferrer">View Project</a>` :
                            `<span class="project-link disabled">Coming Soon</span>`
                        }
                    </div>
                </div>
            </div>
        `;
    }

    renderError() {
        this.projectsGrid.innerHTML = `
            <div class="section-content">
                <h3>Projects Coming Soon</h3>
                <p>I'm currently updating my portfolio. Check back soon for exciting projects!</p>
            </div>
        `;
    }

    renderEmpty() {
        this.projectsGrid.innerHTML = `
            <div class="section-content">
                <h3>Projects Coming Soon</h3>
                <p>I'm currently working on some exciting projects. Check back soon!</p>
            </div>
        `;
    }

    setupProjectAnimations() {
        const cards = this.projectsGrid.querySelectorAll('.project-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        });

        cards.forEach(card => observer.observe(card));
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioUtils();
    new FilterControls();
    new ProjectsLoader();
});

// Export for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioUtils, FilterControls, ProjectsLoader };
}