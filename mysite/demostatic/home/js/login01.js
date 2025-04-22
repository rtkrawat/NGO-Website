// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Slideshow Implementation
    const slideshowContainer = document.querySelector('.background-slideshow');
    const images = [
        'https://images.unsplash.com/photo-1593113598332-cd288d649433',
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
        'https://images.unsplash.com/photo-1605810230434-7631ac76ec81'
    ];

    // Create and append images
    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add(index === 0 ? 'active' : '');
        slideshowContainer.appendChild(img);
    });

    // Slideshow rotation
    let currentImage = 0;
    setInterval(() => {
        const imgs = document.querySelectorAll('.background-slideshow img');
        imgs[currentImage].classList.remove('active');
        currentImage = (currentImage + 1) % imgs.length;
        imgs[currentImage].classList.add('active');
    }, 3000);

    // User Type Selection
    const typeBtns = document.querySelectorAll('.type-btn');
    const volunteerFields = document.querySelector('.volunteer-fields');
    const ngoFields = document.querySelector('.ngo-fields');

    typeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            typeBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            // Show/hide additional fields based on user type
            const userType = btn.dataset.type;
            volunteerFields.classList.add('hidden');
            ngoFields.classList.add('hidden');

            if (userType === 'volunteer') {
                volunteerFields.classList.remove('hidden');
            } else if (userType === 'ngo') {
                ngoFields.classList.remove('hidden');
            }
        });
    });

    // Form Submission
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const activeUserType = document.querySelector('.type-btn.active').dataset.type;
        
        // Add your login logic here
        console.log('Login attempt:', {
            userType: activeUserType,
            email: email,
            password: password
        });

        // Example validation
        if (!email || !password) {
            alert('Please fill in all required fields');
            return;
        }

        // You would typically make an API call here
        alert('Login functionality will be implemented with backend integration');
    });
});
