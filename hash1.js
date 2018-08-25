const crypto = require ('crypto');

class Hash {
    static md5(stringIn){
        const hash = crypto.createHash('md5');
        const data = hash.update(stringIn).digest('hex');
        console.log(data);
    }
    static sha1(stringIn){
        const hash = crypto.createHash('sha1');
        const data = hash.update(stringIn).digest('hex');
        console.log(data);
    }
    static sha256(stringIn){
        const hash = crypto.createHash('sha256');
        const data = hash.update(stringIn).digest('hex');
        console.log(data);
    }
    static sha512(stringIn){
        const hash = crypto.createHash('sha512');
        const data = hash.update(stringIn).digest('hex');
        console.log(data);
    }
}

Hash.sha512('secret')