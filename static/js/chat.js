// Socket.IO bağlantısı
const socket = io();

// Kanal oluşturma
const CreateChannelButton = document.getElementById('create-channel');
CreateChannelButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    const channelNameInput = document.getElementById('new-channel');
    const channelName = channelNameInput.value;

    if (channelName) {
        // Loading state
        CreateChannelButton.textContent = 'Oluşturuluyor...';
        CreateChannelButton.disabled = true;
        
        fetch('/create_channel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "channel_name": channelName })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                CreateChannelButton.textContent = 'Başarılı!';
                CreateChannelButton.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            } else {
                CreateChannelButton.textContent = 'Oluştur';
                CreateChannelButton.disabled = false;
                alert('Kanal oluşturma başarısız: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            CreateChannelButton.textContent = 'Oluştur';
            CreateChannelButton.disabled = false;
            alert('Bir hata oluştu. Lütfen tekrar deneyin.');
        });
    } else {
        alert('Lütfen bir kanal adı girin.');
    }
});

// Enter tuşu ile kanal oluşturma
document.getElementById('new-channel').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        CreateChannelButton.click();
    }
});

const channelList = document.getElementById('channel-list');