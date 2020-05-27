const css = require('css')
const EOF = Symbol('EOF')

let currentToken = null
let currentAttribute = null
let currentTextNode = null

let stack = [{type: 'document', children: []}]

// 加入一个新的函数，addCSSRules，这里我们把css规则暂存到一个数组里
let rules = []

// 将文本转换成ast obj，然后将css规则储存到rules数组
function addCSSRules (text) {
  const ast = css.parse(text)

  console.log(JSON.stringify(ast), null, '    ')
  rules.push(ast.stylesheet.rules)
}

// 标签处理
// 遇到开始标签，初始化一个节点对象，标签名与当前标签相同
// 遍历标签的属性，处理为节点的属性，新的节点对象是栈顶元素的子节点
// 如果是自封闭标签，不做处理，可视为先入栈然后立刻出栈
// 如果不是自封闭标签，入栈
function emit (token) {
  let top = stack[stack.length]

  if (token.type === 'startTag') {
    let elment = {
      tagName: token.tagName,
      type: 'element',
      children: [],
      attributes: []
    }

    for (let p of token) {
      if (p !== 'type' && p !== 'tagName') {
        elment.attributes.push({
          name: p,
          value: token[p]
        })
      }
    }

    // 新节点肯定是栈顶元素的子节点
    top.children.push(element)

    if (!token.isSelfClosing) {
      stack.push(element)
    }

    currentTextNode = null
  } else if (token.type === 'endTag') {
    
  }
}