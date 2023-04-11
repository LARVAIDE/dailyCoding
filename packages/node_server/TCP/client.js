const net = require('net');
const MyTransform = require('./myTransform.js');

let overageBuffer = null;
let ts = new MyTransform();

const client = net.createConnection({
  host: 'localhost',
  port: 1234,
});

client.write(ts.encode('111111'));
client.write(ts.encode('222222'));
client.write(ts.encode('333333'));
client.write(ts.encode('444444'));
client.write(ts.encode('555555'));

client.on('data', (chunk) => {
  if (overageBuffer) {
    chunk = Buffer.concat([overageBuffer, chunk]);
  }
  let packageLen = 0;
  while ((packageLen = ts.getPackageLen(chunk))) {
    const packageCon = chunk.slice(0, packageLen);
    chunk = chunk.slice(packageLen);

    const ret = ts.decode(packageCon);
    console.log(ret);
  }
  overageBuffer = chunk;
});
