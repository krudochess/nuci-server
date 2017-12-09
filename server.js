
const server = require('centralio').server();
const engine = require('./engine');

// Handshake
server.rx('connect', (client, msg) => {
    console.log('msg', msg);
    if (msg != 'nuci') {
        return client.reject('rejected: please open with nuci.');
    }
    client.status = 'wait-engine';
});

// Engine selection
server.rx('wait-engine', (client, msg) => {
    console.log('msg', msg);
    if (false) {
    }
    client.process = engine.start('fruit');
    client.process.stdout.on('data', (data) => {
        console.log('fruit data:', data+"");
        client.tx(data);
    });
    client.status = 'process';
});

server.rx('process', (client, msg) => {
    console.log('received from clinet:',msg);
    client.process.stdin.write(msg+"\n");
});

server.start(55005);