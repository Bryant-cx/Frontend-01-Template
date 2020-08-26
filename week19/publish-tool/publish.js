const http = require('http')
// const querystring = require('querystring')
const fs = require('fs')
const archiver = require('archiver')

// const postData = querystring.stringify({
//   'content': 'Hello World12344'
// })
// const postData = 'hello world12334'

let packname = './package'

// fs.stat(packname, (err, stat) => {
  const options = {
    host: 'localhost',
    port: 8881,
    path: '/?filename=' + 'package.zip',
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream'
    }
  }

  let archive = archiver('zip', {
    zlib: { level: 9 }
  })

  // archive.on('end', () => {
  //   console.log('end')
  // })

  archive.directory(packname, false)

  // archive.pipe(fs.createWriteStream('./package.zip'))

  archive.finalize()

  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    // res.setEncoding('utf8');
    // res.on('data', (chunk) => {
    //   console.log(`BODY: ${chunk}`);
    // });
    // res.on('end', () => {
    //   console.log('No more data in response.');
    // });
  });
  
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  
  // let readStream = fs.createReadStream('./cat.jpg')
  // readStream.pipe(req)

  archive.pipe(req)

  archive.on('end', () => {
    console.log('end')
    req.end()
  })

  // readStream.on('end', () => {
  //   req.end()
  // })
  
  // write data to request body
  // req.write(postData);
  // req.end();
// })
