const compiler = require('@vue/compiler-sfc')

let output = compiler.compileTemplate({
  filename: 'demo.vue',
  source: '<div>hello world!</div>'
})

console.log(output)