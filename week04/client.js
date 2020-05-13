const net = require('net')

class Request {
  constructor () {}
}

class Response {
  constructor () {}
}

const client = net.createConnection({
  host: '127.0.0.1',
  port: 8088 }, () => {
  // 'connect' listener.
  console.log('connected to server!');
  client.write('world!\r\n');
});
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});
client.on('end', () => {
  console.log('disconnected from server');
});
client.on('error', (err) => {
  console.log(err)
})