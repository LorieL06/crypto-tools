# Crypto Tools - Şifreleme ve Şifre Çözme Araçları 🔐

Bu proje, temel kriptografi algoritmalarını uygulayan ve hash hesaplama araçları sunan bir web uygulamasıdır. Siber güvenlik ve kriptografi alanlarında pratik deneyim kazanmak için geliştirilmiştir.

## Özellikler

### Şifreleme Algoritmaları
- **Caesar Cipher**: Klasik kaydırma şifreleme algoritması
- **Vigenere Cipher**: Anahtar tabanlı şifreleme algoritması

### Hash Hesaplayıcı
- **MD5**: 128-bit hash fonksiyonu
- **SHA-256**: 256-bit güvenli hash algoritması

### Web Arayüzü
- Modern ve kullanıcı dostu arayüz
- Gerçek zamanlı şifreleme/çözme
- Hash hesaplama
- API endpoint'leri

## Teknolojiler

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Kriptografi**: Node.js built-in crypto modülü
- **Test**: Jest

## Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/LorieL06/crypto-tools
cd crypto-tools
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Uygulamayı başlatın:
```bash
npm start
```

4. Tarayıcınızda `http://localhost:3000` adresine gidin.

## API Endpoint'leri

### Caesar Cipher
- `POST /api/caesar/encrypt` - Caesar şifreleme
- `POST /api/caesar/decrypt` - Caesar şifre çözme

### Vigenere Cipher
- `POST /api/vigenere/encrypt` - Vigenere şifreleme
- `POST /api/vigenere/decrypt` - Vigenere şifre çözme

### Hash Hesaplayıcı
- `POST /api/hash/md5` - MD5 hash hesaplama
- `POST /api/hash/sha256` - SHA-256 hash hesaplama

## Kullanım Örnekleri

### Caesar Cipher
```javascript
fetch('/api/caesar/encrypt', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'HELLO WORLD',
    shift: 3
  })
});

```

### Vigenere Cipher
```javascript
fetch('/api/vigenere/encrypt', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'HELLO WORLD',
    key: 'KEY'
  })
});
```

### Hash Hesaplama
```javascript
fetch('/api/hash/sha256', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'Hello World'
  })
});
```

## Test

Testleri çalıştırmak için:
```bash
npm test
```

## Öğrenme Hedefleri

Bu proje ile:
- Temel kriptografi algoritmalarını anlama
- Güvenli hash fonksiyonlarının kullanımı
- Web API tasarımı ve implementasyonu
- Frontend-backend entegrasyonu
- Test yazma ve uygulama

## Güvenlik Notları

- Bu proje eğitim amaçlıdır
- Caesar ve Vigenere cipher'ları güvenli değildir
- Gerçek uygulamalarda AES gibi modern algoritmalar kullanın
- Hash fonksiyonları tek yönlüdür, geri çözülemez

## Lisans

MIT License

## Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## İletişim

- GitHub: [@LorieL06](https://github.com/loriel06)
- LinkedIn: [Bora Doğan](https://www.linkedin.com/in/boraadogann/)

---

Bu projeyi beğendiyseniz yıldız vermeyi unutmayın! 
