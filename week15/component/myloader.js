const parser = require('./parser')

module.exports = function (source) {
  console.log(parser.parseHTML(source))
  console.log('my loader is running....')
  return ''
}