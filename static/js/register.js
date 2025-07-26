const registerForm = document.getElementById('registerForm');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const registerBtn = document.getElementById('registerBtn');
const registerText = document.getElementById('registerText');
const registerLoading = document.getElementById('registerLoading');

registerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    if (email && password && username) {
        // Loading state
        registerBtn.classList.add('loading');
        registerText.style.display = 'none';
        registerLoading.style.display = 'inline-block';
        registerBtn.disabled = true;
        
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "email": email, "password": password , "username": username})
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Success animation
                registerBtn.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
                registerText.textContent = 'Başarılı!';
                showMessage('success', 'Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...');
                setTimeout(() => {
                    window.location.href = '/login';
                }, 2000);
            } else {
                // Error state
                registerBtn.classList.remove('loading');
                registerText.style.display = 'inline';
                registerLoading.style.display = 'none';
                registerBtn.disabled = false;
                registerText.textContent = 'Kayıt Ol';
                
                showMessage('error', 'Kayıt başarısız: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            registerBtn.classList.remove('loading');
            registerText.style.display = 'inline';
            registerLoading.style.display = 'none';
            registerBtn.disabled = false;
            registerText.textContent = 'Kayıt Ol';
            
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
    registerForm.parentNode.insertBefore(messageDiv, registerForm);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}