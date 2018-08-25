const fs = require('fs');
const Datastore = require('nedb');
const mysql = require('mysql');

class Config {
    constructor(printerino) {
        this.printer = printerino;
        this.configuration = {};
    }

    put(key, value) {
        this.configuration[key] = value;
    }
    remove(key) {
        delete this.configuration[key];
    }
    get(key) {
        return this.configuration[key]
    }
    print() {
        this.printer.print(this.configuration)
    }
    read() {
        this.printer.read(this.configuration);
        //console.log(this.configuration);
    }
}

class ConfigFileStorage {
    constructor(path) {
        this.path = path;
    }

    print(data) {
        fs.writeFileSync(this.path, JSON.stringify(data));
    }

    read(toChange) {
        for (let key of JSON.parse(fs.readFileSync(this.path))) {
            toChange[key] = JSON.parse(fs.readFileSync(this.path))[key]
        };
    }
}

class ConfigMysql {
    constructor(con) {
        this.con = con;
    }

    print(data) {
        this.con.connect(function (err) {
            this.con.query("UPDATE conf SET string = ? WHERE id = 'i'", JSON.stringify(data));
        }.bind(this));
    }

    read(toChange) {
        this.con.connect(function (err) {
            this.con.query("SELECT * FROM conf", async (err, results) => {
                for (let key in JSON.parse(results[0].string)) {
                    toChange[key] = JSON.parse(results[0].string)[key];
                };
            });
        }.bind(this));
    }
}

class ConfigNedb {
    constructor(path) {
        this.path = path;

    }

    print(data) {
        const db = new Datastore({ filename: this.path, autoload: true });
        db.find({}, (err, docs) => {
            //console.log(docs[0]);
            if (!docs[0]) {
                db.insert(data);
            }
            else {
                db.update({}, data);
            }
        })
    }

    read(toChange) { //WIP: Fungsinya masih async jadinya harus nunggu buat yang lainnya...
        const db = new Datastore({ filename: this.path, autoload: true });
        db.find({}, function (err, docs) {
            delete docs[docs.length-1]['_id'];
            for (let key in docs[docs.length-1]) {
                toChange[key] = docs[docs.length-1][key];
            };
        })
    }
}

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hansel',
    password: 'angga123',
    database: 'config'
});

// connection.connect

const config = new Config(new ConfigNedb('config.db'));
// config.read();//read from file or database
console.log(config);

// config.put('site_name', 'Blogi')         // Be able to save string.
// config.put('maintenance', true)        // Be able to save boolean.
// config.put('age', 30)                   // Be able to save number.
// config.put('meta', { "description": "lorem ipsum dolor sit amet", "tambahan": "bola kuda" }) // Be able to save object or array.
// // // // Print to file/database

// console.log(config);

//Buat NeDB atau  harus pake timeout karena fungsi nya async jadi semua yang diluarnya harus nunggu selesai...
// setTimeout(() => {
//     connection.end();
//     console.log(config.configuration)
// }, 300)