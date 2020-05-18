const EOF = Symbol('EOF')

function data (char) {
  
}

module.exports.parseHTML = function (html) {
  let state = data

  for (let i = 0; i < html.length; i++) {
    state = state(html.charAt(i))
  }

  state = state(EOF)
}