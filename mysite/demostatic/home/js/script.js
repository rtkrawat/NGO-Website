document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger?.addEventListener('click', () => {
        navMenu?.classList.toggle('show');
    });

    // Sample projects data
    const projects = [
        {
            title: "Community Clean-up Drive",
            organization: "Green Earth NGO",
            location: "Central Park",
            duration: "4 hours",
            volunteers: "20",
            image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b"
        },
        {
            title: "Teaching Assistant Program",
            organization: "Education First",
            location: "Local School",
            duration: "3 months",
            volunteers: "10",
            image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6"
        },
        {
            title: "Food Bank Distribution",
            organization: "Feeding Hope",
            location: "Community Center",
            duration: "Weekends",
            volunteers: "15",
            image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c"
        }
    ];

    // Render projects
    function renderProjects() {
        const projectGrid = document.getElementById('projectGrid');
        if (!projectGrid) return;

        projectGrid.innerHTML = projects.map(project => `
            <div class="project-card">
                <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 200px; object-fit: cover;">
                <div style="padding: 1.5rem;">
                    <h3 style="margin-bottom: 0.5rem; color: var(--foreground);">${project.title}</h3>
                    <p style="color: var(--primary); margin-bottom: 0.5rem;">${project.organization}</p>
                    <p style="color: var(--muted); margin-bottom: 1rem;">
                        📍 ${project.location} | ⏰ ${project.duration} | 👥 ${project.volunteers} needed
                    </p>
                    <button class="btn btn-primary" style="width: 100%;">Apply Now</button>
                </div>
            </div>
        `).join('');
    }

    renderProjects();

    // Search functionality
    const searchInput = document.querySelector('.search-container input');
    const searchButton = document.querySelector('.search-container .btn');

    searchButton?.addEventListener('click', () => {
        const searchTerm = searchInput?.value.toLowerCase();
        // Implement search logic here
        console.log('Searching for:', searchTerm);
        alert('Search functionality will be implemented with backend integration');
    });

    // Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target?.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
