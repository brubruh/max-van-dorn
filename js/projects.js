// Project Manager Module
class ProjectManager {
    constructor() {
        this.projects = [];
        this.init();
    }

    async init() {
        await this.loadProjects();
        this.renderProjects();
    }

    async loadProjects() {
        try {
            const response = await fetch('data/projects.json');
            const data = await response.json();
            this.projects = data.projects;
        } catch (error) {
            console.error('Error loading projects:', error);
            // Fallback to empty array if JSON fails to load
            this.projects = [];
        }
    }

    renderProjects() {
        const container = document.querySelector('.projects-grid');
        if (!container) return;

        // Clear existing content
        container.innerHTML = '';

        if (this.projects.length === 0) {
            container.innerHTML = `
                <div class="no-projects">
                    <h3>No projects available</h3>
                    <p>Check back soon for updates!</p>
                </div>
            `;
            return;
        }

        this.projects.forEach(project => {
            const projectElement = this.createProjectElement(project);
            container.appendChild(projectElement);
        });

        // Update stats and setup filters after rendering
        this.updateStats();
        this.setupFilters();
    }

    createProjectElement(project) {
        const article = document.createElement('article');
        article.className = 'project';
        article.setAttribute('data-project-id', project.id);

        // Handle image with fallback
        const imageHtml = project.image ? 
            `<div class="project-image">
                <img src="${project.image}" alt="${project.title}" loading="lazy" onerror="this.style.display='none'">
            </div>` : '';

        // Handle technologies
        const techHtml = project.technologies ? 
            `<div class="project-tech">
                ${project.technologies.map((tech, index) => {
                    const detail = project.technologyDetails && project.technologyDetails[index] ? 
                        project.technologyDetails[index] : '';
                    const escapedDetail = detail.replace(/"/g, '&quot;');
                    return `<span class="tech-tag" data-tooltip="${escapedDetail}">${tech}<span class="tooltip-popup">${detail}</span></span>`;
                }).join('')}
            </div>` : '';

        // Handle status
        const statusHtml = project.status ? 
            `<div class="project-status ${project.status.toLowerCase().replace(' ', '-')}">${project.status}</div>` : '';

        article.innerHTML = `
            ${imageHtml}
            <div class="project-content">
                <div class="project-header">
                    <h3>${project.title}</h3>
                    ${statusHtml}
                </div>
                <p>${project.description}</p>
                ${techHtml}
                <div class="project-actions">
                    ${project.link && project.link !== '#' ? 
                        `<a href="${project.link}" target="_blank" rel="noopener noreferrer" class="project-link">View Project</a>` : 
                        '<span class="project-link disabled">Coming Soon</span>'
                    }
                </div>
            </div>
        `;

        return article;
    }

    addProject(projectData) {
        this.projects.push(projectData);
        this.renderProjects();
    }

    removeProject(projectId) {
        this.projects = this.projects.filter(p => p.id !== projectId);
        this.renderProjects();
    }

    getProjectById(id) {
        return this.projects.find(p => p.id === id);
    }

    getFeaturedProjects() {
        return this.projects.filter(p => p.featured);
    }

    // Update project statistics
    updateStats() {
        const projectCountEl = document.getElementById('project-count');
        const techCountEl = document.getElementById('tech-count');
        
        if (projectCountEl) {
            projectCountEl.textContent = this.projects.length;
        }
        
        if (techCountEl) {
            const allTechs = new Set();
            this.projects.forEach(project => {
                if (project.technologies) {
                    project.technologies.forEach(tech => allTechs.add(tech));
                }
            });
            techCountEl.textContent = allTechs.size;
        }
    }

    // Filter projects by category
    filterProjects(filter) {
        const projectElements = document.querySelectorAll('.project');
        
        projectElements.forEach(element => {
            const projectId = parseInt(element.getAttribute('data-project-id'));
            const project = this.getProjectById(projectId);
            
            let shouldShow = false;
            
            switch (filter) {
                case 'all':
                    shouldShow = true;
                    break;
                case 'web':
                    shouldShow = project.technologies && 
                               project.technologies.some(tech => 
                                   ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'].includes(tech));
                    break;
                case 'design':
                    shouldShow = project.technologies && 
                               project.technologies.some(tech => 
                                   ['Design', 'UI/UX', 'Responsive Design'].includes(tech));
                    break;
                case 'featured':
                    shouldShow = project.featured === true;
                    break;
                default:
                    shouldShow = true;
            }
            
            if (shouldShow) {
                element.style.display = 'flex';
                element.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                element.style.display = 'none';
            }
        });
    }

    // Setup filter buttons
    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                // Filter projects
                const filter = button.getAttribute('data-filter');
                this.filterProjects(filter);
            });
        });
    }
}

// Initialize project manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.projects-grid')) {
        window.projectManager = new ProjectManager();
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProjectManager;
}