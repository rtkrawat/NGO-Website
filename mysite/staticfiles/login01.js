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
                if (ngoFields) ngoFields.classList.add('hidden');
            } else if (userType === 'ngo') {
                if (volunteerFields) volunteerFields.classList.add('hidden');
                if (ngoFields) ngoFields.classList.remove('hidden');
            } else {
                // Admin or other type
                if (volunteerFields) volunteerFields.classList.add('hidden');
                if (ngoFields) ngoFields.classList.add('hidden');
            }
        });
    });
    
    // Form submission
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get active user type
            const activeType = document.querySelector('.type-btn.active').getAttribute('data-type');
            
            // Get form values
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Additional field values based on user type
            let additionalData = {};
            
            if (activeType === 'volunteer') {
                additionalData.studentId = document.getElementById('studentId').value;
            } else if (activeType === 'ngo') {
                additionalData.ngoId = document.getElementById('ngoId').value;
            }
            
            // Validate form
            if (!email || !password) {
                alert('Please fill in all required fields');
                return;
            }
            
            // For demonstration purposes, just show the data that would be submitted
            console.log('Login attempt:', {
                userType: activeType,
                email: email,
                password: password,
                ...additionalData
            });
            
            // In a real application, you would send this data to the server
            // window.location.href = '/dashboard'; // Redirect after successful login
        });
    }
}); 