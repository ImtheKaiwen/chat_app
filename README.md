# 💬 Real-Time Chat Application

Modern, gerçek zamanlı sohbet uygulaması. Flask ve Socket.IO kullanılarak geliştirildi.

## ✨ Özellikler

- 🔐 Kullanıcı kayıt ve giriş sistemi
- 💬 Gerçek zamanlı mesajlaşma
- 👥 Grup sohbetleri
- 📱 Responsive tasarım
- 🎨 Modern UI/UX
- ⬇️ "En Alta Git" butonu
- 🚀 Socket.IO ile anlık mesajlaşma

## 🛠️ Teknolojiler

- **Backend:** Flask, Flask-SocketIO, SQLAlchemy
- **Frontend:** HTML5, CSS3, JavaScript
- **Database:** SQLite (geliştirme), PostgreSQL (production)
- **Real-time:** Socket.IO
- **Styling:** Custom CSS with gradients and animations

## 🚀 Kurulum

### Yerel Geliştirme

1. Repository'yi klonlayın:
```bash
git clone https://github.com/USERNAME/REPO_NAME.git
cd REPO_NAME
```

2. Sanal ortam oluşturun:
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

3. Bağımlılıkları yükleyin:
```bash
pip install -r requirements.txt
```

4. Uygulamayı çalıştırın:
```bash
python app.py
```

5. Tarayıcıda `http://localhost:5000` adresine gidin.

## 🌐 Deployment

Bu uygulama Render, Railway, Heroku gibi platformlarda deploy edilebilir.

### Render ile Deployment:
1. GitHub'a push edin
2. [render.com](https://render.com) hesabı açın
3. "New Web Service" seçin
4. GitHub repo'nuzu bağlayın
5. Build Command: `pip install -r requirements.txt`
6. Start Command: `gunicorn --worker-class eventlet -w 1 app:app`

## 📱 Nasıl Kullanılır

1. **Kayıt Ol:** Yeni hesap oluşturun
2. **Giriş Yap:** Mevcut hesabınızla giriş yapın
3. **Kanal Oluştur:** Yeni sohbet kanalı oluşturun
4. **Mesajlaş:** Gerçek zamanlı olarak mesajlaşmaya başlayın
5. **Gruplar:** Diğer kullanıcıların gruplarına katılın

## 🔧 Proje Yapısı

```
chat/
├── app.py              # Ana uygulama dosyası
├── config.py           # Konfigürasyon ayarları
├── models.py           # Veritabanı modelleri
├── routes.py           # Flask routes
├── requirements.txt    # Python bağımlılıkları
├── Procfile           # Heroku deployment
├── runtime.txt        # Python versiyonu
├── static/
│   ├── css/           # Stil dosyaları
│   └── js/            # JavaScript dosyaları
└── templates/         # HTML şablonları
```

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

Geliştirildi ❤️ ile

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın! 