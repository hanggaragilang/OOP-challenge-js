const data = {
    username: 'mul14',
    email: 'email@example.com',
    name: 'Mulia',
    zip: 75324,
    is_admin: true,
    age: 28,
}

const rules = {
    username: 'required|alphanum',
    email: 'required|email',
    name: 'required',
    zip: 'required|numeric',
    is_admin: 'boolean',
    age: 'numeric|min:29|max:20',
}

// The message is optional. But user should be able to customize the messages.
const message = {
    required: 'The %s field is required.',
    alphanum: 'The %s field must be alphanumeric.',
    numeric: 'The %s field must a number.',
    email: 'The %s field must be an email',
    boolean: 'The %s field must be boolean',
    min: 'The %s field must contain a number higher than',
    max: 'The %s field must contain a number lower than'

}

const alphanum = /^[A-Za-z0-9]*$/
const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Validator {
    constructor(data, rules, message) {
        this.message = message;
        this.rules = rules;
        this.data = data;
    }
    passes() {
        return this.errors();
    }
    fails() {
        return !this.errors();
    }
    errors() {
        let pass = true;
        for (let key in this.rules) {
            if (this.rules[key].includes('alphanum')) {
                if (!alphanum.test(this.data[key])) {
                    pass = false
                    console.log(this.message['alphanum'], key);

                };
            }
            if (this.rules[key].includes('required')) {
                if (this.data[key] === '' || !this.data[key]) {
                    pass = false
                    console.log(this.message['required'], key);
                };
            }
            if (this.rules[key].includes('email')) {
                if (!email.test(this.data[key])) {
                    pass = false
                    console.log(this.message['email'], key);
                };
            }
            if (this.rules[key].includes('numeric')) {
                if (!(typeof this.data[key] === 'number')) {
                    pass = false
                    console.log(this.message['numeric'], key);
                };
            }
            if (this.rules[key].includes('boolean')) {
                if (!(typeof this.data[key] === 'boolean')) {
                    pass = false
                    console.log(this.message['boolean'], key);
                };
            }
            if (this.rules[key].includes('min')) {
                if (this.data[key] < parseInt(this.rules[key].replace(/.+min:/g, '').replace(/\|.+$/g, ''))) {
                    pass = false
                    console.log(this.message['min'], key, (this.rules[key].replace(/.+min:/g, '').replace(/\|.+$/g, '')));
                };
            }
            if (this.rules[key].includes('max')) {
                if (this.data[key] > parseInt(this.rules[key].replace(/.+max:/g, '').replace(/\|.+$/g, ''))) {
                    pass = false
                    console.log(this.message['max'], key, (this.rules[key].replace(/.+max:/g, '').replace(/\|.+$/g, '')));
                };
            }
        }
        return pass;
    }
}

const valid = new Validator(data, rules, message);
console.log(valid.errors())