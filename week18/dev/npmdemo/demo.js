const npm = require('npm')

const config = {
  "name": "npmdemo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}

npm.load(config, (err) => {
  npm.install('webpack', err => {
    console.log(err)
  })
})