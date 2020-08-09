const fsevents = require('fsevents')
const path = require('path')
const { exec } = require('child_process')

exec('http-server')

const stop = fsevents.watch(path.resolve(__dirname, './src'), (path, flags, id) => {
  const info = fsevents.getInfo(path, flags, id)
  console.log('webpack')
  exec('webpack')
  stop()
})