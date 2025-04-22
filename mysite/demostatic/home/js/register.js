document.addEventListener('DOMContentLoaded', () => {
    // Slideshow Implementation
    const slideshowContainer = document.querySelector('.background-slideshow');
    const images = [
        'https://images.unsplash.com/photo-1593113598332-cd288d649433',
        'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
        'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c',
        'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b'
    ];

    // Create and append images
    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.classList.add(index === 0 ? 'active' : '');
        slideshowContainer.appendChild(img);
    });

    // Enhanced slideshow with fade effect
    let currentImage = 0;
    setInterval(() => {
        const imgs = document.querySelectorAll('.background-slideshow img');
        imgs[currentImage].classList.remove('active');
        currentImage = (currentImage + 1) % imgs.length;
        imgs[currentImage].classList.add('active');
    }, 3000);

    // Form field animations
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

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
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const userType = document.querySelector('.type-btn.active').dataset.type;
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirmPassword').value
        };

        // Add type-specific fields
        if (userType === 'volunteer') {
            formData.studentId = document.getElementById('studentId').value;
            formData.institution = document.getElementById('institution').value;
        } else if (userType === 'ngo') {
            formData.ngoName = document.getElementById('ngoName').value;
            formData.registrationNumber = document.getElementById('registrationNumber').value;
            formData.ngoAddress = document.getElementById('ngoAddress').value;
        }

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Basic validation
        if (!formData.email || !formData.password) {
            alert('Please fill in all required fields');
            return;
        }

        // Log the registration data (replace with your backend integration)
        console.log('Registration data:', { userType, ...formData });
        alert('Registration successful! Redirecting to login...');
        window.location.href = 'index.html';
    });
});