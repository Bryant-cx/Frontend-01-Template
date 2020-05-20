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
// 遇到回引号，当前属性值统计完成，进入引号属性值后状态
// 遇到特殊字符，暂不处理
// 遇到常规字符，统计属性值，继续进入当前双引号属性值状态
function doubleQuotedAttributeValue (char) {
  if (char === '"') {
    currentToken(currentAttribute.name) = currentAttribute.value
    return afterQuotedAttributeValue
  }

  if (char === '\u0000') {

  } else if (char === EOF) {

  } else {
    currentAttribute.value += char
    return doubleQuotedAttributeValue
  }
}

// 进入单引号属性值状态
// 遇到单引号，当前属性值统计完成，进入引号属性值后状态
// 遇到特殊字符，暂不处理
// 遇到普通字符，统计属性值，继续进入单引号属性值状态
function singleQuotedAttributeValue (char) {
  if (char === '\'') {
    currentToken[currentAttribute.name] = currentAttribute.value
    return afterQuotedAttributeValue
  }

  if (char === '\u0000') {

  } else if (char === EOF) {

  } else {
    currentAttribute.value += char
    return singleQuotedAttributeValue
  }
}

// 进入无引号属性值状态
// 遇到空格、回车、换行，当前属性值统计完毕，进入属性名前状态
// 遇到‘/’，当前属性值统计完成，进入自封闭标签开始状态
// 遇到‘>’，当前属性统计完成，当前标签统计完成，重新进入开始状态data
// 遇到‘"’，‘’’，‘<’，‘=’，‘`’时，暂不处理
// 遇到EOF时，暂不处理
// 遇到正常字符，统计属性值，继续进入无字符属性值状态
function unquotedAttributeValue (char) {
  if (char.match(/^[\t\n\f ]$/)) {
    currentToken(currentAttribute.name) = currentAttribute.value
    return beforeAttributeName
  }

  if (char === '/') {
    currentToken[currentAttribute.name] = currentAttribute.value
    return selfClosingStartTag
  }

  if (char === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  }

  if (char === '\u0000') {

  } else if (char === '"' || char === '\'' || char === '<' || char === '=' || char === '`') {

  } else if (char === EOF) {

  } else {
    currentAttribute.value += char
    return unquotedAttributeValue
  }
}

// 进入引号属性值后状态
// 遇到空格、回车、换行符，进入属性名前状态
// 遇到‘/’，进入自封闭标签开始状态
// 遇到‘>’，当前属性值统计完成，当前标签统计完成，重新进入开始状态data
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

  } else {
    currentAttribute.value += char
    // 此处存在重大疑问，为啥进入双引号属性值状态
    return doubleQuotedAttributeValue
  }
}

// 进入自封闭标签开始前状态
// 遇到‘>’，当前标签统计完成，增加自封闭标志位，重新进入开始状态
// 其他字符，暂不处理
function selfClosingStartTag (char) {
  if (char === '>') {
    currentToken.isSelfClosing = true
    emit(currentToken)
    return data
  }

  if (char === EOF) {

  } else {

  }
}

// 进入属性名后状态
// 遇到空格、回车、换行符，继续进入属性名后状态
// 遇到‘/’，进入自封闭标签开始状态
// 遇到‘=’，进入属性值前状态
// 遇到‘>’，当前属性名统计完成，当前标签统计完成，重新进入开始状态data
// 遇到EOF，暂不处理
// 遇到正常字符，当前属性名统计完成，遇到新的属性名，进入属性名状态
function afterAttributeName (char) {
  if (char.match(/^[\t\n\f ]$/)) {
    return afterAttributeName
  }

  if (char === '/') {
    return selfClosingStartTag
  }

  if (char === '=') {
    return beforeAttributeValue
  }

  if (char === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    emit(currentToken)
    return data
  }

  if (char === EOF) {
    currentToken[currentAttribute.name] = currentAttribute.value
    currentAttribute = {
      name: '',
      value
    }

    return attributeName(char)
  }
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