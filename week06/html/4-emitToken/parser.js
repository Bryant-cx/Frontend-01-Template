let currentToken = null

function emit(token) {
  console.log(token)
}

const EOF = Symbol('EOF')

// 进入开始状态
// 遇到‘<’，进入标签开始状态
// 遇到EOF，文件结束
// 其他状态，再度进入data状态
function data (char) {
  if (char === '<') {
    return tagOpen
  }

  if (char === EOF) {
    emit({
      type: "EOF"
    })
    return
  }

  emit({
    type: 'text',
    content: char
  })
  return data
}

// 进入开始标签状态
// 遇到'/'，进入结束标签状态
// 遇到字母，进入标签名状态
// 其他状态，暂不处理
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

  return
}

// 进入结束标签状态
// 遇到字母，进入标签名状态
// 其他状态，暂不处理
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

// 进入标签名状态
// 遇到空格、换行、回车，进入属性状态
// 遇到‘/’，进入自结束标签状态
// 遇到字母，继续进入标签名状态，统计标签名
// 遇到‘>’，当前标签统计接触，emit标签，重新进入开始状态
// 其他状态，暂不处理
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

  return tagName
}

// 进入属性名状态
// 遇到换行、回车、空格，继续进入属性名状态
// 遇到‘>’，当前标签统计结束，回到开始状态data
// 遇到字母，继续进入属性名状态，统计属性名
// 遇到‘=’，进入属性值状态
// 其他状态，暂不处理
function beforeAttributeName (char) {
  if (char.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  }

  if (char === '>') {
    emit(currentToken)
    return data
  }

  if (char.match(/^[a-zA-Z]$/)) {
    return attributeName
  }

  if (char === '=') {
    return beforeAttributeName
  }

  return beforeAttributeName
}

// 进入自封闭标签开始状态
function selfClosingStartTag (char) {
  if (char === '>') {
    currentToken.isSelfClosing = true
    emit(currentToken)
    return data
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