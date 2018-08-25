const crypto = require ('crypto');

class Cipher {
    static encrypt(stringIn,passIn){
        const cipher = crypto.createCipher('aes-128-cbc',passIn);
        let data = cipher.update(stringIn,'utf8','hex');
        data += cipher.final('hex')
        return data;
    }
    static decrypt(stringIn,passIn){
        const decipher = crypto.createDecipher('aes-128-cbc',passIn);
        let data = decipher.update(stringIn,'hex','utf8');
        data += decipher.final('utf8');
        return data;
    }
}

const message = Cipher.encrypt('Ini tulisan rahasia', 'OOP-Challenges')

console.log(message) 

const decryptedMessage = Cipher.decrypt(message, 'OOP-Challenges')

console.log(decryptedMessage)
