const EOF = Symbol('EOF') // end of file
let currentToken = null

// 当遇到‘<’表示目前遇到了一个标签的开始
// 遇到EOF表示文件解析已结束
// 遇到其他字符暂不处理
function data (char) {
  if (char === '<') {
    return tagOpen
  }

  if (char === EOF) {
    return
  }

  return data
}

// 进入开始标签状态
// 如果‘/’说明当前遇到的是一个结束标签
// 如果遇到字母，说明当前目前处于标签名状态，遇到其他字符暂不处理
function tagOpen (char) {
  if (char === '/') {
    return endTagOpen
  }

  if (char.match(/^[a-zA-Z]$/)) {
    return tagName(char)
  }

  return
}

// 进入结束标签状态
// 如果遇到字母，进入标签名状态
// 遇到‘>’，进入标签结束状态
// 遇到EOF进入文件结束状态
// 其他状态暂不处理
function endTagOpen (char) {
  if (char.match(/^[a-zA-Z]$/)) {
    currentToken = {
      type: 'endTag',
      tagName: ''
    }

    return tagName
  }

  if (char === '>') {

  } else if (char === EOF) {

  } else {

  }
}

// 进入标签名状态
// 遇到空格、回车或者换行符，进入属性名状态
// 遇到字母，继续再标签名状态，开始统计标签名
// 遇到‘/’，进入自封闭标签状态
// 如果‘>’，一个标签统计完成，重新进入开始状态data
// 其他状态暂也作tagName处理
function tagName (char) {
  if (char.match(/^[\t\f\n ]$/)) {
    return beforeAttributeName
  }

  if (char.match(/^[a-zA-Z]$/)) {
    return tagName
  }

  if (char === '/') {
    return selfClosingStartTag
  }

  if (char === '>') {
    return data
  }

  return tagName
}

// 进入属性名状态
// 遇到字母时，进入属性名状态，开始统计属性名
// 遇到空格、回车、换行符时，不处理，继续处于属性名状态
// 遇到‘=’，进入属性值状态
// 遇到‘>’，当前标签统计完成，进入开始状态data
// 其他情况暂不处理
function beforeAttributeName (char) {
  if (char.match(/^[a-zA-Z]$/)) {
    return attributeName
  }

  if (char.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  }

  if (char === '=') {
    return beforeAttributeName
  }

  if (char === '>') {
    return data
  }

  return
}

// 进入自封闭标签开始状态
// 遇到‘>’，标签结束，开始新一轮统计，回到data状态
// 其他情况暂不处理
function selfClosingStartTag (char) {
  if (char === '>') {
    currentToken.isSelfClosing = true
    return data
  }

  if (char === EOF) {

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