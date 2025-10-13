// Resume Management Utility
class ResumeManager {
    constructor() {
        this.resumePath = 'assets/Maxim_Van_Dorn_Resume.pdf';
        this.init();
    }

    init() {
        this.setupDownloadTracking();
        this.checkResumeAvailability();
    }

    // Track resume downloads for analytics
    setupDownloadTracking() {
        const resumeLinks = document.querySelectorAll('a[href*="Resume.pdf"]');
        
        resumeLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Track the download event
                console.log('Resume downloaded');
                
                // You can add analytics tracking here
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'download', {
                        'event_category': 'Resume',
                        'event_label': 'PDF Download',
                        'value': 1
                    });
                }
                
                // Add visual feedback
                this.showDownloadFeedback(link);
            });
        });
    }

    // Check if resume file exists and show appropriate state
    async checkResumeAvailability() {
        try {
            const response = await fetch(this.resumePath, { method: 'HEAD' });
            const resumeLinks = document.querySelectorAll('a[href*="Resume.pdf"]');
            
            if (response.ok) {
                // Resume exists - ensure links are active
                resumeLinks.forEach(link => {
                    link.classList.remove('disabled');
                    link.setAttribute('href', this.resumePath);
                });
            } else {
                // Resume doesn't exist - show placeholder state
                this.showResumeUnavailable();
            }
        } catch (error) {
            console.log('Resume availability check failed:', error);
            this.showResumeUnavailable();
        }
    }

    showResumeUnavailable() {
        const resumeLinks = document.querySelectorAll('a[href*="Resume.pdf"]');
        
        resumeLinks.forEach(link => {
            link.classList.add('disabled');
            link.setAttribute('href', '#');
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showResumeComingSoon();
            });
        });
    }

    showResumeComingSoon() {
        // Create a simple modal or notification
        const notification = document.createElement('div');
        notification.className = 'resume-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <h4>Resume Coming Soon!</h4>
                <p>I'm currently updating my resume. Please check back soon or contact me directly for the latest version.</p>
                <button onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    showDownloadFeedback(link) {
        const originalText = link.textContent;
        
        // Temporarily change button text
        if (link.classList.contains('btn')) {
            link.textContent = 'Downloaded! ✓';
            link.style.background = 'var(--success-color)';
            
            setTimeout(() => {
                link.textContent = originalText;
                link.style.background = '';
            }, 2000);
        }
    }

    // Method to update resume path (useful if you version your resumes)
    updateResumePath(newPath) {
        this.resumePath = newPath;
        const resumeLinks = document.querySelectorAll('a[href*="Resume.pdf"]');
        
        resumeLinks.forEach(link => {
            link.setAttribute('href', newPath);
        });
    }
}

// Initialize resume manager
document.addEventListener('DOMContentLoaded', () => {
    window.resumeManager = new ResumeManager();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResumeManager;
}