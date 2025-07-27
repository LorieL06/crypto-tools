const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Utility functions
const caesarCipher = (text, shift, decrypt = false) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const shiftAmount = decrypt ? -shift : shift;
    
    return text.toUpperCase().split('').map(char => {
        if (alphabet.includes(char)) {
            const index = alphabet.indexOf(char);
            const newIndex = (index + shiftAmount + 26) % 26;
            return alphabet[newIndex];
        }
        return char;
    }).join('');
};

const vigenereCipher = (text, key, decrypt = false) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const keyUpper = key.toUpperCase();
    let keyIndex = 0;
    
    return text.toUpperCase().split('').map(char => {
        if (alphabet.includes(char)) {
            const textIndex = alphabet.indexOf(char);
            const keyChar = keyUpper[keyIndex % keyUpper.length];
            const keyShift = alphabet.indexOf(keyChar);
            
            const shift = decrypt ? -keyShift : keyShift;
            const newIndex = (textIndex + shift + 26) % 26;
            
            keyIndex++;
            return alphabet[newIndex];
        }
        return char;
    }).join('');
};

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Caesar Cipher endpoints
app.post('/api/caesar/encrypt', (req, res) => {
    try {
        const { text, shift } = req.body;
        
        if (!text || shift === undefined) {
            return res.status(400).json({ 
                error: 'Text ve shift değeri gerekli' 
            });
        }
        
        const encrypted = caesarCipher(text, parseInt(shift), false);
        res.json({ 
            original: text,
            encrypted: encrypted,
            shift: shift,
            algorithm: 'Caesar Cipher'
        });
    } catch (error) {
        res.status(500).json({ error: 'Şifreleme hatası' });
    }
});

app.post('/api/caesar/decrypt', (req, res) => {
    try {
        const { text, shift } = req.body;
        
        if (!text || shift === undefined) {
            return res.status(400).json({ 
                error: 'Text ve shift değeri gerekli' 
            });
        }
        
        const decrypted = caesarCipher(text, parseInt(shift), true);
        res.json({ 
            encrypted: text,
            decrypted: decrypted,
            shift: shift,
            algorithm: 'Caesar Cipher'
        });
    } catch (error) {
        res.status(500).json({ error: 'Şifre çözme hatası' });
    }
});

// Vigenère Cipher endpoints
app.post('/api/vigenere/encrypt', (req, res) => {
    try {
        const { text, key } = req.body;
        
        if (!text || !key) {
            return res.status(400).json({ 
                error: 'Text ve key değeri gerekli' 
            });
        }
        
        const encrypted = vigenereCipher(text, key, false);
        res.json({ 
            original: text,
            encrypted: encrypted,
            key: key,
            algorithm: 'Vigenère Cipher'
        });
    } catch (error) {
        res.status(500).json({ error: 'Şifreleme hatası' });
    }
});

app.post('/api/vigenere/decrypt', (req, res) => {
    try {
        const { text, key } = req.body;
        
        if (!text || !key) {
            return res.status(400).json({ 
                error: 'Text ve key değeri gerekli' 
            });
        }
        
        const decrypted = vigenereCipher(text, key, true);
        res.json({ 
            encrypted: text,
            decrypted: decrypted,
            key: key,
            algorithm: 'Vigenère Cipher'
        });
    } catch (error) {
        res.status(500).json({ error: 'Şifre çözme hatası' });
    }
});

// Hash endpoints
app.post('/api/hash/md5', (req, res) => {
    try {
        const { text } = req.body;
        
        if (!text) {
            return res.status(400).json({ 
                error: 'Text değeri gerekli' 
            });
        }
        
        const hash = crypto.createHash('md5').update(text).digest('hex');
        res.json({ 
            original: text,
            hash: hash,
            algorithm: 'MD5',
            length: hash.length
        });
    } catch (error) {
        res.status(500).json({ error: 'Hash hesaplama hatası' });
    }
});

app.post('/api/hash/sha256', (req, res) => {
    try {
        const { text } = req.body;
        
        if (!text) {
            return res.status(400).json({ 
                error: 'Text değeri gerekli' 
            });
        }
        
        const hash = crypto.createHash('sha256').update(text).digest('hex');
        res.json({ 
            original: text,
            hash: hash,
            algorithm: 'SHA-256',
            length: hash.length
        });
    } catch (error) {
        res.status(500).json({ error: 'Hash hesaplama hatası' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Crypto Tools API çalışıyor',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Sunucu hatası' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint bulunamadı' });
});

app.listen(PORT, () => {
    console.log(`🚀 Crypto Tools sunucusu http://localhost:${PORT} adresinde çalışıyor`);
    console.log(`📚 API dokümantasyonu: http://localhost:${PORT}/api/health`);
}); 