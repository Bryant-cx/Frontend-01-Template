// const assert = require('assert')
const add = require('../src/add.js')
const test = require('ava')

// describe('add', function () {
//   it('should return 7', function () {
//     assert.equal(add(3, 4), 7)
//   })
// })

test('add', t => {
  if (add(3, 4) === 7) {
    t.pass()
  }
})