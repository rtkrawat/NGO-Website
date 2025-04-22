document.addEventListener('DOMContentLoaded', function() {
    // Toggle between different user types
    const typeBtns = document.querySelectorAll('.type-btn');
    const volunteerFields = document.querySelector('.volunteer-fields');
    const ngoFields = document.querySelector('.ngo-fields');
    
    typeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            typeBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const userType = this.getAttribute('data-type');
            
            // Show/hide additional fields based on user type
            if (userType === 'volunteer') {
                volunteerFields.classList.remove('hidden');
                ngoFields.classList.add('hidden');
            } else if (userType === 'ngo') {
                volunteerFields.classList.add('hidden');
                ngoFields.classList.remove('hidden');
            } else {
                // Admin or other type
                volunteerFields.classList.add('hidden');
                ngoFields.classList.add('hidden');
            }
        });
    });
    
    // Form submission
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get active user type
            const activeType = document.querySelector('.type-btn.active').getAttribute('data-type');
            
            // Get common form values
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Additional field values based on user type
            let additionalData = {};
            
            if (activeType === 'volunteer') {
                additionalData.studentId = document.getElementById('studentId').value;
                additionalData.institution = document.getElementById('institution').value;
            } else if (activeType === 'ngo') {
                additionalData.ngoName = document.getElementById('ngoName').value;
                additionalData.registrationNumber = document.getElementById('registrationNumber').value;
                additionalData.ngoAddress = document.getElementById('ngoAddress').value;
            }
            
            // Validate form
            if (!fullName || !email || !password || !confirmPassword) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // Validate additional fields based on user type
            if (activeType === 'volunteer' && (!additionalData.studentId || !additionalData.institution)) {
                alert('Please fill in all required volunteer fields');
                return;
            } else if (activeType === 'ngo' && (!additionalData.ngoName || !additionalData.registrationNumber || !additionalData.ngoAddress)) {
                alert('Please fill in all required NGO fields');
                return;
            }
            
            // For demonstration purposes, just show the data that would be submitted
            console.log('Registration data:', {
                userType: activeType,
                fullName: fullName,
                email: email,
                password: password,
                ...additionalData
            });
            
            // In a real application, you would send this data to the server
            // window.location.href = '/dashboard'; // Redirect after successful registration
        });
    }
    
    // Background animation
    const animateBackground = () => {
        const circles = document.querySelectorAll('.circle');
        circles.forEach(circle => {
            const randomX = Math.random() * 100 - 50;
            const randomY = Math.random() * 100 - 50;
            circle.style.transform = `translate(${randomX}px, ${randomY}px)`;
        });
    };
    
    setInterval(animateBackground, 5000);
}); 