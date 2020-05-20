let currentToken = null
let currentAttribute = null
let currentTextNode = null

let stack = [{type: 'document', children: []}]

// 扫码token，将token挨个放入栈，利用入栈出栈操作，行程dom树
// 如果遇到开始标签，入栈，遍历token中的属性，拿到节点属性
// 遇到结束标签，如果与栈顶元素标签名相同，出栈
// 遇到字封闭标签，不处理，相当于入栈后立即出栈
function emit (token) {
  if (token.type === 'text') {
    return
  }

  let top = stack[stack.length - 1]

  // 遇到开始标签
  if (token.type === 'startTag') {
    let element = {
      type: 'element',
      children: [],
      attributes: []
    }

    element.tagName = token.tagName

    // 遍历token的属性，拿到attribute，添加到当前节点
    for (let p in token) {
      if (p !== 'type' && p !== 'tagName') {
        element.attributes.push({
          name: p,
          value: token[p]
        })
      }
    }

    // 当前节点肯定是栈顶元素的子节点
    top.children.push(element)
    element.parent = top

    // 非自封闭标签，放入栈顶，等待遇到结束标签再出栈
    // 自封闭标签不作处理，相当于入栈之后立即出栈
    if (!token.isSelfClosing) {
      stack.push(element)
    }

    currentTextNode = null
  } else if (token.type === 'endTag') {
    // 如果标签名与栈顶元素不匹配，直接报错，不做html的容错处理
    if (top.tagName !== token.tagName) {
      throw new Error('Tag start end does not match!')
    } else {
      // 成功匹配就将栈顶元素出栈，正常情况下，运算结束时栈顶几乎为空
      stack.pop()
    }

    currentTextNode = null
  }
}

const EOF = Symbol('EOF')

// 标签初始状态
// 遇到‘<’，进入标签开始状态
// 遇到EOF，文件读取结束
// 遇到其他，emit文本，重新进入开始状态
function data (char) {
  if (char === '<') {
    return tagOpen
  }

  if (char === EOF) {
    emit({
      type: 'EOF'
    })
    return
  }

  emit({
    type: 'text',
    content: char
  })

  return data
}

// 进入标签开始状态
// 遇到‘/’，进入结束标签开始状态
// 遇到字母，进入标签名状态
// 其他，进入字符状态
function tagOpen (char) {
  if (char === '/') {
    return endTagOpen
  }

  if (char.match(/^[a-zA-Z]$/)) {
    return tagName(char)
  }

  emit({
    type: 'text',
    content: char
  })

  // 此处是否应该是继续进入tagOpen状态？
  return
}

// 进入标签名状态
// 遇到空格、回车、换行符，进入属性名前状态
// 遇到‘/’，进入自封闭标签开始状态
// 遇到字母，统计标签名，继续进入标签名状态
// 遇到‘>’，当前标签统计结束，重新进入开始状态data
// 遇到其他字符，统计标签名，继续进入标签名状态
function tagName (char) {
  if (char.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  }

  if (char === '/') {
    return selfClosingStartTag
  }

  if (char.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += char
    return tagName
  }

  if (char === '>') {
    emit(currentToken)
    return data
  }

  currentToken.tagName += char
  return tagName
}

// 进入属性名前状态
// 遇到字母、回车、换行符，继续进入属性名前状态
// 遇到‘/’、‘>’、‘EOF’，进入自封闭标签开始状态
// 遇到字母，进入标签名状态，开始统计标签名
// 遇到‘=’，暂不处理
function beforeAttributeName (char) {
  if (char.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  }

  if (char === '/' || char === '>' || char === EOF) {
    return afterAttributeName(char)
  }

  if (char === '=') {

  } else {
    currentAttribute = {
      name: '',
      value: ''
    }

    return attributeName(char)
  }
}

// 进入标签名状态
// 遇到空格、回车、换行符，或者‘/’，‘>’，‘EOF’进入标签名后状态
// 遇到字母，统计属性名，继续进入属性名状态
// 遇到‘=’，进入属性值前状态
// 遇到‘\u0000’，不处理
// 遇到‘“’，‘\'’，‘<’，暂不处理
function attributeName (char) {
  if (char.match(/^[\t\n\f ]$/) || char === '/' || char === '>' || char === EOF) {
    return afterAttributeName(char)
  }

  if (char === '=') {
    return beforeAttributeValue
  }

  if (char === '\u0000') {
    return
  }

  if (char === '"' || char === '\'' || char === '<') {
    return
  }

  currentAttribute.name += char
  return attributeName
}

// 进入属性值前状态
// 遇到空格、回车、换行符，继续进入属性值前状态
// 遇到双引号，进入双引号属性值状态
// 遇到单引号，进入单引号属性值状态
// 其他，进入无引号属性值状态
function beforeAttributeValue (char) {
  if (char.match(/^[\t\n\f ]$/)) {
    return beforeAttributeValue
  }

  if (char === '"') {
    return doubleQuotedAttributeValue
  }

  if (char === '\'') {
    return singleQuotedAttributeValue
  }

  if (char === '>') {
    return
  }

  return unquotedAttributeValue(char)
}

// 进入双引号属性值状态
// 遇到双引号，当前属性值统计完成，进入引号属性值后状态
// 遇到‘\u0000’，暂不处理
// 遇到EOF，暂不处理
// 遇到正常字符，统计属性值，继续进入双引号属性值状态
function doubleQuotedAttributeValue (char) {
  if (char === '"') {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuotedAttributeValue
  }

  if (char === '\u0000') {
    return
  }

  if (char === EOF) {
    return
  }

  currentAttribute.value += char
  return doubleQuotedAttributeValue
}

// 进入单引号属性值状态
// 遇到单引号，当前属性值统计完成，进入引号属性值后状态
// 遇到‘\u0000’，暂不处理
// 遇到EOF，暂不处理
// 遇到正常字符，统计属性值，继续进入单引号属性值状态
function singleQuotedAttributeValue (char) {
  if (char === '\'') {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuotedAttributeValue
  }

  if (char === '\u0000') {
    return
  }

  if (char === EOF) {
    return
  }

  currentAttribute.value += char
  return singleQuotedAttributeValue
}

// 进入引号属性值后状态
// 遇到空格、回车、换行符，进入属性名前状态
// 遇到‘/’，进入自封闭标签开始状态
// 遇到‘>’，当前标签统计完成，重新回到开始状态data
// 遇到EOF，暂不处理
// 遇到正常字符，继续统计属性值，进入双引号属性值状态
function afterQuotedAttributeValue (char) {
  if (char.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  }

  if (char === '/') {
    return selfClosingStartTag
  }

  if (char === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)

    return data
  }

  if (char === EOF) {
    return
  }

  currentAttribute.value += char
  return doubleQuotedAttributeValue
}

// 进入无引号属性值统计状态
function unquotedAttributeValue (char) {}

// 进入属性名后状态
function afterAttributeName (char) {}

// 进入结束标签开始状态
function endTagOpen (char) {}

module.exports.parseHTML = function (html) {
  let state = data

  for (let i = 0; i < html.length; i++) {
    state = state(html.charAt(i))
  }

  state = state(EOF)
}