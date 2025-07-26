// Socket.IO bağlantısı
const socket = io();

// Global variables
let messageList;
let scrollToBottomBtn;

// Sayfa yüklendiğinde gruba katıl
document.addEventListener('DOMContentLoaded', function() {
    socket.emit('join_group', { group_id: groupId });
    console.log('Joined group:', groupId);
    
    // Element referanslarını al
    messageList = document.getElementById('message-list');
    scrollToBottomBtn = document.getElementById('scroll-to-bottom');
    
    console.log('messageList:', messageList);
    console.log('scrollToBottomBtn:', scrollToBottomBtn);
    
    // Sayfa yüklendiğinde mesaj listesini en aşağıya kaydır
    if (messageList) {
        setTimeout(() => {
            messageList.scrollTop = messageList.scrollHeight;
        }, 100);
    }
    
    // Scroll to bottom button functionality
    if (scrollToBottomBtn && messageList) {
        // Scroll event listener to show/hide button
        messageList.addEventListener('scroll', function() {
            const isNearBottom = messageList.scrollTop + messageList.clientHeight >= messageList.scrollHeight - 50;
            console.log('Scroll position:', messageList.scrollTop, 'isNearBottom:', isNearBottom);
            
            if (isNearBottom) {
                scrollToBottomBtn.classList.remove('show');
            } else {
                scrollToBottomBtn.classList.add('show');
            }
        });
        
        // Click event for scroll to bottom button
        scrollToBottomBtn.addEventListener('click', function() {
            console.log('Scroll to bottom button clicked');
            messageList.scrollTo({
                top: messageList.scrollHeight,
                behavior: 'smooth'
            });
        });
        
        // İlk başta butonu gizle
        scrollToBottomBtn.classList.remove('show');
    }
});

// Yeni mesaj geldiğinde
socket.on('new_message', function(data) {
    console.log('New message received:', data);
    
    if (!messageList) {
        messageList = document.getElementById('message-list');
    }
    
    // Mesaj gelmeden önce scroll pozisyonunu kontrol et
    const wasNearBottom = messageList.scrollTop + messageList.clientHeight >= messageList.scrollHeight - 50;
    console.log('Was near bottom before message:', wasNearBottom);
    
    // Mesajın kendimizden mi geldiğini kontrol et
    const isOwnMessage = data.username === currentUsername;
    console.log('Is own message:', isOwnMessage, 'data.username:', data.username, 'currentUsername:', currentUsername);
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isOwnMessage ? 'sent' : 'received'}`;
    
    const currentTime = new Date().toLocaleTimeString('tr-TR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    messageDiv.innerHTML = `
        <div class="username">${data.username}</div>
        <div class="content">${data.content}</div>
        <div class="timestamp">${currentTime}</div>
    `;
    
    const messagesWrapper = document.getElementById('messages-wrapper');
    messagesWrapper.appendChild(messageDiv);
    
    // Clearfix div ekle
    const clearDiv = document.createElement('div');
    clearDiv.style.clear = 'both';
    messagesWrapper.appendChild(clearDiv);
    
    // Eğer kullanıcı en alttaysa veya kendi mesajıysa otomatik kaydır
    if (wasNearBottom || isOwnMessage) {
        setTimeout(() => {
            messageList.scrollTop = messageList.scrollHeight;
            console.log('Auto scrolled to bottom');
        }, 50);
    }
});

// Mesaj gönderme
const SenMessageButton = document.getElementById('send-message');
SenMessageButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    const messageInput = document.getElementById('new-message');
    const message = messageInput.value;

    if (message) {
        // Socket.IO ile mesaj gönder
        socket.emit('send_message', {
            content: message,
            group_id: groupId,
            user_id: userId
        });
        
        messageInput.value = ''; // Clear the input field
    } else {
        alert('Please enter a message.');
    }
});

// Enter tuşu ile mesaj gönderme
document.getElementById('new-message').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        SenMessageButton.click();
    }
});

// Sayfa kapanırken gruptan çık
window.addEventListener('beforeunload', function() {
    socket.emit('leave_group', { group_id: groupId });
});