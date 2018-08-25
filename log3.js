const fs = require('fs');

class Log extends Array {

    filterByLvl(input) {
        return this.filter(a => a.level === input)
    }

    filterByDate(input) {
        return this.filter(a => (a.date.getYear() === new Date(input).getYear() && a.date.getMonth() === new Date(input).getMonth() && a.date.getDate() === new Date(input).getDate()))
    }

    addMsg(level, message, date = Date.now()) {
        this.push(new Messg(date, level, message))
        return this;
    }

    toFile() {
        fs.writeFileSync('app.log', JSON.stringify(this).replace(/^\[{|"}]$/g, '').replace(/"},{/g, '\n').replace(/"date":"/g, '[').replace(/","level":"/g, '] ').replace(/","message":"/g, ': '))
    }
}

class Messg {
    constructor(date, level, message) {
        this.date = new Date(date);
        this.level = level;
        this.message = message;
    }
}

const log = new Log();
log.addMsg('INFO', 'Wah ada apa ini...', 'July 9 2108')
    .addMsg('DEBUG', 'Test', 'July 8 2018')
    .addMsg('DEBUG', 'Filter Test');
console.log(log.filterByDate('July 10 2018'));
console.log(log.filterByLvl('DEBUG'));
// console.log(log);

//log.toFile();
console.log(JSON.stringify(new Date));

