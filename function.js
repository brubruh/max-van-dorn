// Navigation Module
class NavigationManager {
    constructor() {
        // Support both old and new navigation systems
        this.menuToggle = document.querySelector('.nav-toggle') || document.querySelector('.toggle');
        this.showcase = document.querySelector('.showcase');
        this.sideMenu = document.querySelector('.side-menu');
        this.menu = document.querySelector('.menu');
        this.init();
    }

    init() {
        if (this.menuToggle) {
            this.setupMenuToggle();
            this.setupClickOutside();
            this.setupKeyboardNavigation();
        } else {
            console.error("Menu toggle element not found.");
        }
    }

    setupMenuToggle() {
        this.menuToggle.addEventListener('click', () => {
            this.toggleMenu();
        });
    }

    setupClickOutside() {
        document.addEventListener('click', (e) => {
            const isMenuOpen = this.sideMenu ? this.sideMenu.classList.contains('active') : 
                              this.showcase ? this.showcase.classList.contains('active') : false;
            
            if (isMenuOpen) {
                const menuElement = this.sideMenu || this.menu;
                if (menuElement && !menuElement.contains(e.target) && !this.menuToggle.contains(e.target)) {
                    this.closeMenu();
                }
            }
        });
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            const isMenuOpen = this.sideMenu ? this.sideMenu.classList.contains('active') : 
                              this.showcase ? this.showcase.classList.contains('active') : false;
            
            if (e.key === 'Escape' && isMenuOpen) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.menuToggle.classList.toggle('active');
        
        // Handle new side menu system
        if (this.sideMenu) {
            this.sideMenu.classList.toggle('active');
            const isOpen = this.sideMenu.classList.contains('active');
            this.menuToggle.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
            console.log(`Side menu ${isOpen ? 'opened' : 'closed'}`);
        }
        // Handle old showcase system (for backwards compatibility)
        else if (this.showcase) {
            this.showcase.classList.toggle('active');
            const isOpen = this.showcase.classList.contains('active');
            this.menuToggle.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
            console.log(`Menu ${isOpen ? 'opened' : 'closed'}`);
        }
    }

    closeMenu() {
        this.menuToggle.classList.remove('active');
        
        if (this.sideMenu) {
            this.sideMenu.classList.remove('active');
        }
        if (this.showcase) {
            this.showcase.classList.remove('active');
        }
        
        this.menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NavigationManager();
});

// jQuery Section
$(document).ready(function () {
    function slideTransition(target) {
        $(".page")
            .removeClass("active")
            .addClass("page-exit");
        setTimeout(function () {
            window.location.href = target;
        }, 500); // Match the transition duration
    }

    $("a").on("click", function (e) {
        if (this.pathname === window.location.pathname) {
            return; // Skip if same page
        }

        e.preventDefault(); // Prevent default anchor behavior
        const target = this.href;
        slideTransition(target);
    });
});

// Visual Effects Module
class VisualEffectsManager {
    constructor() {
        this.overlay = document.querySelector('.overlay');
        this.blendModeButton = document.getElementById('blendModeButton');
        this.colorButton = document.getElementById('colorButton');
        
        this.blendModes = [
            'normal', 'multiply', 'screen', 'overlay', 'color-burn', 
            'darken', 'lighten', 'color-dodge', 'difference', 'exclusion', 
            'hue', 'saturation', 'luminosity'
        ];
        this.colors = ['#9f9f9f', '#03a9f4', '#ff6347', '#00ff7f', '#e91e63', '#9c27b0', '#673ab7'];
        
        this.currentBlendModeIndex = 0;
        this.currentColorIndex = 0;
        
        this.init();
    }

    init() {
        if (!this.overlay) return;
        
        if (this.blendModeButton) {
            this.setupBlendModeButton();
        }
        
        if (this.colorButton) {
            this.setupColorButton();
        }
        
        this.setupKeyboardShortcuts();
    }

    setupBlendModeButton() {
        this.blendModeButton.addEventListener('click', () => {
            this.changeBlendMode();
        });
    }

    setupColorButton() {
        this.colorButton.addEventListener('click', () => {
            this.changeColor();
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Press 'B' to change blend mode
            if (e.key.toLowerCase() === 'b' && !e.ctrlKey && !e.altKey) {
                this.changeBlendMode();
            }
            // Press 'C' to change color
            if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.altKey) {
                this.changeColor();
            }
        });
    }

    changeBlendMode() {
        this.currentBlendModeIndex = (this.currentBlendModeIndex + 1) % this.blendModes.length;
        const newMode = this.blendModes[this.currentBlendModeIndex];
        this.overlay.style.mixBlendMode = newMode;
        
        // Update button text
        if (this.blendModeButton) {
            this.blendModeButton.textContent = `Blend: ${newMode}`;
        }
        
        console.log("Blend mode changed to:", newMode);
    }

    changeColor() {
        this.currentColorIndex = (this.currentColorIndex + 1) % this.colors.length;
        const newColor = this.colors[this.currentColorIndex];
        this.overlay.style.backgroundColor = newColor;
        
        // Update button text
        if (this.colorButton) {
            this.colorButton.textContent = `Color: ${newColor}`;
        }
        
        console.log("Background color changed to:", newColor);
    }

    reset() {
        this.currentBlendModeIndex = 0;
        this.currentColorIndex = 0;
        this.overlay.style.mixBlendMode = this.blendModes[0];
        this.overlay.style.backgroundColor = this.colors[0];
    }
}

// Initialize visual effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.overlay')) {
        new VisualEffectsManager();
    }
});
