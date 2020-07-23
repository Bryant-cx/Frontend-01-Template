const parser = require('./parser')

module.exports = function (source) {
  // console.log(parser.parseHTML(source))
  let tree = parser.parseHTML(source)
  let template = null
  let script = null

  for (let node of tree.children) {
    if (node.tagName === 'template') {
      template = node.children.filter(e => e.type !== 'text')[0]
    }

    if (node.tagName === 'script') {
      script = node.children[0].content
    }
  }

  let visit = (node) => {
    if (node.type === 'text') {
      return JSON.stringify(node.content)
    }

    let attrs = {}
    for (let attribute of node.attributes) {
      attrs[attribute.name] = attribute.value
    }

    let children = node.children.map(node => visit(node))

    return `create('${node.tagName}', ${JSON.stringify(attrs)}, ${children})`
  }

  let res = `
import { create, Wrapper, Text } from './createElement.js'
export class Carousel {
  render () {
    return ${visit(template)}
  }

  setAttribute (name, value) {
    this[name] = value
  }

  mountTo (parent) {
    this.render().mountTo(parent)
  }
}  
`
  console.log(res)

  return res
}