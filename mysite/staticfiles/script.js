document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Populate Featured Projects
    const projectGrid = document.getElementById('projectGrid');
    if (projectGrid) {
        const featuredProjects = [
            {
                title: "Environmental Cleanup",
                location: "City Park",
                date: "May 15, 2024",
                description: "Join us for a day of cleaning up our local park and planting new trees.",
                image: "images/project1.jpg",
                category: "Environment"
            },
            {
                title: "Food Drive",
                location: "Community Center",
                date: "June 2, 2024",
                description: "Help collect and distribute food to families in need in our community.",
                image: "images/project2.jpg",
                category: "Community"
            },
            {
                title: "Literacy Program",
                location: "Public Library",
                date: "Ongoing",
                description: "Volunteer as a reading mentor for children and adults learning to read.",
                image: "images/project3.jpg",
                category: "Education"
            }
        ];
        
        featuredProjects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            
            projectCard.innerHTML = `
                <div class="project-image" style="background-image: url('${project.image}');">
                    <span class="project-category">${project.category}</span>
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <div class="project-details">
                        <span><i class="icon-location"></i> ${project.location}</span>
                        <span><i class="icon-calendar"></i> ${project.date}</span>
                    </div>
                    <p>${project.description}</p>
                    <a href="#" class="btn btn-primary">View Details</a>
                </div>
            `;
            
            projectGrid.appendChild(projectCard);
        });
    }
}); 