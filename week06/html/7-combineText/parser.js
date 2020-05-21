let currentToken = null
let currentAttribute = null
let currentTextNode = null

let stack = [{type: 'document', children: []}]

// 处理当前统计完的标签
// 将当前统计完的标签处理成节点，入栈
// 如果遇到开始标签，将标签入栈，且处理为栈顶元素的子节点
// 遍历当前标签的属性，添加到节点属性上
// 如果是自封闭标签，不处理，可视为入栈后立即出栈
// 如果是结束标签，且标签名与栈顶元素相同，出栈一个元素
// 如果是文本，统计文本
function emit (token) {
  let top = stack[stack.length - 1]

  if (token.type === 'startTag') {
    let element = {
      type: 'element',
      children: [],
      attributes: []
    }

    element.tagName === token.tagName

    // 遍历标签属性，处理为当前节点的属性
    for (let p in token) {
      if (p !== 'type' && p !== 'tagName') {
        element.attributes.push({
          name: p,
          value: token[p]
        })
      }
    }

    top.children.push(element)
    element.parent = top

    if (!token.isSelfClosing) {
      stack.push(element)
    }

    currentTextNode = null
  } else if (token.type === 'endTag') {
    // 遇到结束标签，判断当前节点的标签名与栈顶元素的标签名是否匹配
    // 匹配就出栈栈顶元素，不匹配就报错
    if (top.tagName !== token.tagName) {
      throw new Error('Tag start end does not match!')
    } else {
      stack.pop()
    }
    currentTextNode = null
  } else if (token.type === 'text') {
    // 遇到文本，统计文本
    if (!currentTextNode) {
      currentTextNode = {
        type: 'text',
        content: ''
      }

      top.children.push(currentTextNode)
    }

    currentTextNode.content += token.content
  }
}

// 文件结束标志
const EOF = Symbol('EOF')

// 进入初始状态
// 遇到‘<’，进入标签开始状态
// 遇到EOF，文件读取结束
// 遇到其他，处理为文本
function data (char) {
  if (char === '<') {
    return tagOpen
  }

  if (char === EOF) {
    return
  }

  emit({
    type: 'text',
    content: char
  })

  return data
}

// 进入标签开始状态
// 遇到'/'，进入结束标签开始状态
// 遇到字母，进入标签名状态
// 遇到其他，处理为文本
function tagOpen (char) {
  if (char === '/') {
    return endTagOpen
  }

  if (char.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'startTag',
      tagName: ''
    }

    return tagName(char)
  }

  emit({
    type: 'text',
    content: char
  })
  return
}

// 进入标签名状态
// 遇到空格、回车、换行符，进入属性名前状态
// 遇到字母，统计标签名，继续进入标签名状态
// 遇到‘/’，进入自封闭标签开始状态
// 遇到‘>’，当前标签统计完成，重新回到初始状态data
// 遇到其他字符，统计标签名，继续进入标签名状态
function tagName (char) {
  if (char.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  }

  if (char.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += char
    return tagName
  }

  if (char === '/') {
    return slefClosingStartTag
  }

  if (char === '>') {
    emit(currentToken)
    return data
  }

  currentToken.tagName += char
  return tagName
}

// 进入属性名前状态
// 遇到字母，进入属性名状态
// 遇到空格、回车、换行符，继续进入属性名前状态
// 遇到‘=’，不处理
// 遇到‘/’、‘>’、EOF，进入属性名后状态
function beforeAttributeName (char) {
  if (char.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  }

  if (char === '=') {
    return
  }

  if (char === '/' || char === '>' || char === EOF) {
    return afterAttributeName
  }

  currentAttribute = {
    name: '',
    value: ''
  }

  return attributeName(char)
}

// 进入属性名状态
// 遇到空格、回车、换行符、‘/’、‘>’、EOF，进入属性名后状态
// 遇到‘=’，进入属性值前状态
// 遇到‘\u0000’，暂不处理
// 遇到双引号、单引号、‘<’，暂不处理
// 遇到正常字符，统计属性名，继续进入属性名状态
function attributeName (char) {
  if (char.match(/^[\t\n\f ]$/) || char === '/' || char === '>' || char === EOF) {
    return afterAttributeName
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
// 遇到空格、回车、换行符，‘/’，‘>’，EOF，继续进入属性名后状态
// 遇到双引号，进入双引号属性值状态
// 遇到单引号，进入单引号属性值状态
// 遇到其他字符，进入无引号属性值状态
function beforeAttributeValue (char) {
  if (char.match(/^[\t\n\f ]$/) || char === '/' || char === '>' || char === EOF) {
    return beforeAttributeValue
  }

  if (char === '"') {
    return doubleQuotedAttributeValue
  }

  if (char === '\'') {
    return singleQuotedAttributeValue
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
// 进入空格、回车、换行符，进入属性名前状态
// 遇到‘/’，进入自封闭标签开始状态
// 遇到‘>’，当前标签统计完成，重新进入开始状态data
// 遇到EOF，暂不处理
// 遇到其他字符，继续统计属性值，进入双引号属性值状态
function afterQuotedAttributeValue (char) {
  if (char.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  }

  if (char === '/') {
    return slefClosingStartTag
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

// 进入无引号属性值状态
// 遇到空格、回车、换行符，当前属性值统计完成，进入属性名前状态
// 遇到‘/’，当前属性值统计完成，进入自封闭标签开始状态
// 遇到‘>’，当前标签统计完成，当前属性统计完成，重新进入初始状态data
// 遇到‘\u0000’，暂不处理
// 遇到单双引号，‘<’，‘=’，‘`’，暂不处理
// 遇到EOF，暂不处理
// 遇到正常字符，统计属性值，继续进入无引号属性值状态
function unquotedAttributeValue (char) {
  if (char.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  }

  if (char === '/') {
    currentToken[currentAttribute.name] = currentAttribute.value
    return slefClosingStartTag
  }

  if (char === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  }

  if (char === '\u0000') {
    return
  }

  if (char === '"' || char === '\'' || char === '<' || char === '=' || char === '`') {
    return
  }

  if (char === EOF) {
    return
  }

  currentAttribute.value += char
  return unquotedAttributeValue
}

// 进入属性名后状态
// 遇到空格、回车、换行符，继续进入属性名后状态
// 遇到‘/’，进入自封闭标签开始状态
// 遇到‘>’，当前标签统计完成，重新进入重试状态data
// 遇到‘=’，进入属性值前状态
// 遇到EOF，不处理
// 遇到正常字符，当前属性统计完成，开始新一轮属性统计，进入属性名状态
function afterAttributeName (char) {
  if (char.match(/^[\t\n\f ]$/)) {
    return afterAttributeName
  }

  if (char === '/') {
    return slefClosingStartTag
  }

  if (char === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  }

  if (char === '=') {
    return beforeAttributeValue
  }

  if (char === EOF) {
    return
  }

  currentToken[currentAttribute.name] = currentAttribute.value
  currentAttribute = {
    name: '',
    value: ''
  }

  return attributeName(char)
}

// 进入自封闭标签开始状态
// 遇到'>'，当前标签统计完成，增加自封闭标志位，重新进入初始状态data
// 遇到EOF，暂不处理
// 遇到其他字符，暂不处理
function slefClosingStartTag (char) {
  if (char === '>') {
    currentToken.isSelfClosing = true
    emit(currentToken)
    return data
  }

  if (char === EOF) {
    return
  }

  return
}

// 进入结束标签开始状态
// 遇到字母，进入标签名状态
// 遇到其他字符不处理
function endTagOpen (char) {
  if (char.match(/^[\t\n\f ]$/)) {
    currentToken = {
      type: 'endTag',
      tagName = ''
    }

    return tagName(char)
  }

  if (char === EOF) {
    return
  }

  return
}

module.exports.parseHTML = function (html) {
  let state = data

  for (let i = 0; i < html.length; i++) {
    state = state(html.charAt(i))
  }

  state = state(EOF)
}