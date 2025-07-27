const crypto = require('crypto');
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
const calculateHash = (text, algorithm) => {
    return crypto.createHash(algorithm).update(text).digest('hex');
};

describe('Crypto Tools Tests', () => {
    describe('Caesar Cipher', () => {
        test('should encrypt text with shift 3', () => {
            const result = caesarCipher('HELLO', 3, false);
            expect(result).toBe('KHOOR');
        });
        test('should decrypt text with shift 3', () => {
            const result = caesarCipher('KHOOR', 3, true);
            expect(result).toBe('HELLO');
        });
        test('should handle shift 0', () => {
            const text = 'HELLO WORLD';
            const encrypted = caesarCipher(text, 0, false);
            const decrypted = caesarCipher(encrypted, 0, true);
            expect(encrypted).toBe(text);
            expect(decrypted).toBe(text);
        });

        test('should handle shift 25', () => {
            const result = caesarCipher('A', 25, false);
            expect(result).toBe('Z');
        });

        test('should handle shift 26 (should be same as 0)', () => {
            const text = 'HELLO';
            const result1 = caesarCipher(text, 0, false);
            const result2 = caesarCipher(text, 26, false);
            expect(result1).toBe(result2);
        });

        test('should preserve non-alphabetic characters', () => {
            const result = caesarCipher('HELLO 123!', 3, false);
            expect(result).toBe('KHOOR 123!');
        });

        test('should handle empty string', () => {
            const result = caesarCipher('', 3, false);
            expect(result).toBe('');
        });

        test('should handle case insensitive input', () => {
            const result1 = caesarCipher('hello', 3, false);
            const result2 = caesarCipher('HELLO', 3, false);
            expect(result1).toBe(result2);
        });
    });

    describe('Vigenère Cipher', () => {
        test('should encrypt text with key "KEY"', () => {
            const result = vigenereCipher('HELLO', 'KEY', false);
            expect(result).toBe('RIJVS');
        });

        test('should decrypt text with key "KEY"', () => {
            const result = vigenereCipher('RIJVS', 'KEY', true);
            expect(result).toBe('HELLO');
        });

        test('should handle key shorter than text', () => {
            const result = vigenereCipher('HELLO WORLD', 'ABC', false);
            expect(result).toBe('HFNLP YOSND');
        });

        test('should handle key longer than text', () => {
            const result = vigenereCipher('HELLO', 'ABCDEFGHIJK', false);
            expect(result).toBe('HFNOS');
        });

        test('should handle empty key', () => {
            const text = 'HELLO';
            const result = vigenereCipher(text, '', false);
            expect(result).toBe('GDKKN');
        });

        test('should preserve non-alphabetic characters', () => {
            const result = vigenereCipher('HELLO 123!', 'KEY', false);
            expect(result).toBe('RIJVS 123!');
        });

        test('should handle case insensitive key', () => {
            const result1 = vigenereCipher('HELLO', 'key', false);
            const result2 = vigenereCipher('HELLO', 'KEY', false);
            expect(result1).toBe(result2);
        });

        test('should handle empty string', () => {
            const result = vigenereCipher('', 'KEY', false);
            expect(result).toBe('');
        });
    });

    describe('Hash Functions', () => {
        test('should calculate MD5 hash', () => {
            const result = calculateHash('Hello World', 'md5');
            expect(result).toBe('b10a8db164e0754105b7a99be72e3fe5');
        });

        test('should calculate SHA-256 hash', () => {
            const result = calculateHash('Hello World', 'sha256');
            expect(result).toBe('a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e');
        });

        test('should handle empty string', () => {
            const md5Result = calculateHash('', 'md5');
            const sha256Result = calculateHash('', 'sha256');
            
            expect(md5Result).toBe('d41d8cd98f00b204e9800998ecf8427e');
            expect(sha256Result).toBe('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
        });

        test('should handle special characters', () => {
            const text = 'Hello@World#123!';
            const md5Result = calculateHash(text, 'md5');
            const sha256Result = calculateHash(text, 'sha256');
            
            expect(md5Result).toHaveLength(32);
            expect(sha256Result).toHaveLength(64);
        });

        test('should handle unicode characters', () => {
            const text = 'Merhaba Dünya!';
            const md5Result = calculateHash(text, 'md5');
            const sha256Result = calculateHash(text, 'sha256');
            
            expect(md5Result).toHaveLength(32);
            expect(sha256Result).toHaveLength(64);
        });

        test('should produce consistent results', () => {
            const text = 'Test String';
            const md5Result1 = calculateHash(text, 'md5');
            const md5Result2 = calculateHash(text, 'md5');
            const sha256Result1 = calculateHash(text, 'sha256');
            const sha256Result2 = calculateHash(text, 'sha256');
            
            expect(md5Result1).toBe(md5Result2);
            expect(sha256Result1).toBe(sha256Result2);
        });
    });

    describe('Integration Tests', () => {
        test('should encrypt and decrypt with Caesar Cipher', () => {
            const originalText = 'HELLO WORLD';
            const shift = 5;
            
            const encrypted = caesarCipher(originalText, shift, false);
            const decrypted = caesarCipher(encrypted, shift, true);
            
            expect(decrypted).toBe(originalText);
        });

        test('should encrypt and decrypt with Vigenère Cipher', () => {
            const originalText = 'HELLO WORLD';
            const key = 'SECRET';
            
            const encrypted = vigenereCipher(originalText, key, false);
            const decrypted = vigenereCipher(encrypted, key, true);
            
            expect(decrypted).toBe(originalText);
        });

        test('should handle mixed case and special characters', () => {
            const originalText = 'Hello World! 123 @#$%';
            const shift = 3;
            const key = 'KEY';
            
            // Caesar Cipher
            const caesarEncrypted = caesarCipher(originalText, shift, false);
            const caesarDecrypted = caesarCipher(caesarEncrypted, shift, true);
            expect(caesarDecrypted).toBe(originalText.toUpperCase());
            
            // Vigenère Cipher
            const vigenereEncrypted = vigenereCipher(originalText, key, false);
            const vigenereDecrypted = vigenereCipher(vigenereEncrypted, key, true);
            expect(vigenereDecrypted).toBe(originalText.toUpperCase());
        });
    });

    describe('Edge Cases', () => {
        test('should handle very long text', () => {
            const longText = 'A'.repeat(1000);
            const shift = 1;
            const key = 'B';
            
            const caesarResult = caesarCipher(longText, shift, false);
            const vigenereResult = vigenereCipher(longText, key, false);
            const hashResult = calculateHash(longText, 'md5');
            
            expect(caesarResult).toHaveLength(1000);
            expect(vigenereResult).toHaveLength(1000);
            expect(hashResult).toHaveLength(32);
        });

        test('should handle very large shift values', () => {
            const text = 'A';
            const largeShift = 1000;
            
            const result = caesarCipher(text, largeShift, false);
            expect(result).toBe('M'); // 1000 % 26 = 12, so A + 12 = M
        });

        test('should handle negative shift values', () => {
            const text = 'B';
            const negativeShift = -1;
            
            const result = caesarCipher(text, negativeShift, false);
            expect(result).toBe('A');
        });
    });
}); 