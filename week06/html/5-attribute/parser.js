let currentToken = null
let currentAttribute = null

const EOF = Symbol('EOF')

function emit (token) {
  if (token.type !== 'text') {
    console.log(token)
  }
}

// 标签初始状态
// 遇到‘<’，进入标签开始状态
// 遇到EOF，文件读取结束
// 遇到其他字符，同意按文本处理
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
// 遇到‘/’，进入结束标签状态
// 遇到字母，进入标签名状态
// 其他，进入文本状态
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
// 遇到字母，统计标签名，继续进入标签名状态
// 遇到‘>’，标签统计结束，重新进入开始状态data
// 遇到空格、换行、回车，进入属性名前状态
// 遇到‘/’，进入自封闭标签状态
function tagName (char) {
  if (char.match(/^[a-zA-Z]$/)) {
    currentToken.tagName += char
    return tagName
  }

  if (char === '>') {
    emit(currentToken)
    return data
  }

  if (char.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  }

  if (char === '/') {
    return selfClosingStartTag
  }
}

// 进入属性名前状态
// 遇到空格、回车、换行，继续进入属性名前状态
// 遇到‘=’，进入属性值状态，暂不处理
// 遇到‘>’、‘/’、‘EOF’，标签统计结束，属性名后状态
// 其他，进入属性名状态
function beforeAttributeName (char) {
  if (char.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  }

  if (char === '>' || char === '/' || char === EOF) {
    return afterAttributeName
  } else if (char === '=') {

  } else {
    currentAttribute = {
      name: '',
      value: ''
    }

    return attributeName (char)
  }
}

// 进入属性名状态
// 遇到空格、回车、换行符，或者‘/’、‘>’、‘EOF’，进入属性名后状态
// 遇到‘=’，进入属性值前状态
// 遇到‘\u0000’即null，不处理
// 其他，统计属性名，继续进入属性名状态
function attributeName (char) {
  if (char.match(/^[\t\n\f ]$/) || char === '/' || char === '>' || char === EOF) {
    return afterAttributeName
  }

  if (char === '=') {
    return beforeAttributeValue
  } else if (char === '\u0000') {

  } else {
    currentAttribute.name += char
    return attributeName
  }
}

// 进入属性值前状态
// 遇到空格、换行、回车，或者‘/’，继续进入属性值前状态
// 遇到单引号，进入单引号属性值状态
// 遇到双引号，进入双引号属性值状态
// 遇到‘>’，标签统计结束，返回开始状态data
// 其他，进入无引号属性值状态
function beforeAttributeValue (char) {
  if (char.match(/^[\t\n\f ]$/) || char === '/') {
    return beforeAttributeValue
  }

  if (char === '"') {
    return doubleQuotedAttributeValue
  }

  if (char === '\'') {
    return singleQuotedAttributeValue
  }

  if (char === '>') {
    emit(currentToken)
    return data
  }

  return unquotedAttributeValue(char)
}

// 进入双引号属性值状态
function doubleQuotedAttributeValue (char) {}

// 进入单引号属性值状态
function singleQuotedAttributeValue (char) {}

// 进入无引号属性值状态
function unquotedAttributeValue (char) {}

// 进入属性名后状态
function afterAttributeName (char) {

}

// 进入结束标签状态
// 遇到字母，进入标签名状态
// 其他情况，暂不处理
function endTagOpen (char) {
  if (char.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'endTag',
      tagName: ''
    }
    return tagName(char)
  }

  if (char === '>') {

  } else if (char === EOF) {

  } else {

  }
}

module.exports.parseHTML = function (html) {
  let state = data

  for (let i = 0; i < html.length; i++) {
    state = state(html.charAt(i))
  }

  state = state(EOF)
}