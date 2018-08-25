const http = require('http');

class Request {
  static GET(path) {
    const options = {
      hostname: 'jsonplaceholder.typicode.com',
      port: 80,
      path: path,
      method: 'GET',
    };
    const req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
    });
    req.end();
  }

  static HEAD(path) {
    const options = {
      hostname: 'jsonplaceholder.typicode.com',
      port: 80,
      path: path,
      method: 'HEAD',
    };
    const req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`OPTIONS: ${res.headers}`);
    });
    req.end();
  }

  static OPTION(path) {
    const options = {
      hostname: 'google.com',
      port: 80,
      path: path,
      method: 'OPTIONS',
    };
    const req = http.request(options, (res) => {
      console.log(`OPTIONS: ${res.headers.allow}`);
    });
    req.end();
  }

  static DELETE(path) {
    const options = {
      hostname: 'jsonplaceholder.typicode.com',
      port: 80,
      path: path,
      method: 'DELETE',
    };
    const req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
    });
    req.end();
  }


  static POST(key, value) {

    let unstring = {};
    unstring[key] = value;

    const postData = JSON.stringify(unstring);

    const options = {
      hostname: 'jsonplaceholder.typicode.com',
      port: 80,
      path: '/posts',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
    });
    req.write(postData);
    req.end();
  }

  static PUT(path, key, value) {

    let unstring = {};
    unstring[key] = value;

    const postData = JSON.stringify(unstring);

    const options = {
      hostname: 'jsonplaceholder.typicode.com',
      port: 80,
      path: path,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
    });
    req.write(postData);
    req.end();
  }

  static PATCH(path, key, value) {

    let unstring = {};
    unstring[key] = value;

    const postData = JSON.stringify(unstring);

    const options = {
      hostname: 'jsonplaceholder.typicode.com',
      port: 80,
      path: path,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
    });
    req.write(postData);
    req.end();
  }

}

// Request.OPTION('');
// Request.GET('/posts');
// Request.DELETE('/posts/1');
//Request.POST('Nama', 'Anugrah');
// Request.PUT('/posts/1','Alamat', 'GCA2');
// Request.PATCH('/posts/2','title', 'Wah berubah ini doang!');


// const [year, month, day] = [new Date(Date.now()).getYear(), new Date(Date.now()).getMonth(), new Date(Date.now()).getDate()];
// console.log(new Date);
// console.log(JSON.stringify(new Date));
