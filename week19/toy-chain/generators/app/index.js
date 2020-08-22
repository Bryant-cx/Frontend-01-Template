const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor (args, opts) {
    super (args, opts)
  }

  methods1 () {
    this.log('method 1 just ran')
  }
}