const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const loginText = document.getElementById('loginText');
const loginLoading = document.getElementById('loginLoading');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = emailInput.value;
    const password = passwordInput.value;

    if (email && password) {
        // Loading state
        loginBtn.classList.add('loading');
        loginText.style.display = 'none';
        loginLoading.style.display = 'inline-block';
        loginBtn.disabled = true;
        
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "email" : email, "password" : password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Success animation
                loginBtn.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
                loginText.textContent = 'Başarılı!';
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            } else {
                // Error state
                loginBtn.classList.remove('loading');
                loginText.style.display = 'inline';
                loginLoading.style.display = 'none';
                loginBtn.disabled = false;
                loginText.textContent = 'Giriş Yap';
                
                // Show error message
                showMessage('error', 'Giriş başarısız: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            loginBtn.classList.remove('loading');
            loginText.style.display = 'inline';
            loginLoading.style.display = 'none';
            loginBtn.disabled = false;
            loginText.textContent = 'Giriş Yap';
            
            showMessage('error', 'Bir hata oluştu. Lütfen tekrar deneyin.');
        });
    } else {
        showMessage('error', 'Lütfen tüm alanları doldurun.');
    }
});

function showMessage(type, message) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.error-message, .success-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
    messageDiv.textContent = message;
    
    // Insert before form
    loginForm.parentNode.insertBefore(messageDiv, loginForm);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}