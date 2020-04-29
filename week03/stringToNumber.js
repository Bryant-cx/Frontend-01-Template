/**
 * 将字符串转换成数字
 * @param {*} string 传入的字符串
 * @param {*} scale 传入的字符串的进制，默认十进制
 */
function convertStringToNumber (string, scale = 10) {
  if (!['string', 'number'].includes(typeof string)) {
    throw Error('A string or number param is needed!')
  }

  if (typeof scale !== 'number') {
    throw Error('Scale param should be an integer')
  }

  string = String(string)
  scale = parseInt(scale)

  if (scale < 2 || scale > 36) {
    return NaN
  }

  // 超过10的进制可以从map中进行对应查找
  const map = {
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15,
    g: 16,
    h: 17,
    i: 18,
    j: 19,
    k: 20,
    l: 21,
    m: 22,
    n: 23,
    o: 24,
    p: 25,
    q: 26,
    r: 27,
    s: 28,
    t: 29,
    u: 30,
    v: 31,
    w: 32,
    x: 33,
    y: 34,
    z: 35
  }

  switch (scale) {
    case 2: {
      return convertBinaryToDecimal(string)
    }

    case 8: {
      return convertOctonaryToDecimal (string)
    }

    case 10: {
      return convertDecStringToDecimal (string)
    }

    case 16: {
      return convertHexaToDecimal (string, map)
    }

    default: {
      return convertOthersToDecimal (string, scale, map)
    }
  }
}

// 将二进制字符串转换成十进制数字
function convertBinaryToDecimal (string) {
  const reg = /^(0[bB])?[01]+/
  let res = 0

  string = reg.exec(string)

  if (!string) {
    return NaN
  }

  string = string[0]

  for (let i = 0; i < string.length; i++) {
    res += string[i] === '1' ? Math.pow(2, string.length - 1 - i) : 0 
  }

  return res
}

// 将八进制字符串转换成十进制数字
function convertOctonaryToDecimal (string) {
  const reg = /^(0[oO])?[0-7]+/
  let res = 0

  string = reg.exec(string)

  if (!string) {
    return NaN
  }

  string = string[0]

  for (let i = 0; i < string.length; i++) {
    res += string[i].match(/[0-7]/) ? (string[i].codePointAt(0) - '0'.codePointAt(0)) * Math.pow(8, string.length - 1 - i) : 0
  }

  return res
}

// 将十六进制字符串转换成十进制数字
function convertHexaToDecimal (string, map) {
  const reg = /^(0[xX])?([0-9a-fA-F]+)/
  let res = 0

  string = reg.exec(string)

  if (!string) {
    return NaN
  }

  string = string[0].toLowerCase()

  for (let i = 0; i < string.length; i++) {
    if (string[i].match(/\d/)) {
      res += (string[i].codePointAt(0) - '0'.codePointAt(0)) * Math.pow(16, string.length - 1 - i)
    } else if (string[i].match(/[a-fA-F]/)) {
      res += map[string[i]] * Math.pow(16, string.length - 1 - i)
    }
  }

  return res
}

// 将十进制字符串转换成十进制数字
function convertDecStringToDecimal (string) {
  const reg = /^(\+|\-)?\d*\.?\d*?([eE][\+\-]?\d+)?$/
  let res = 0

  string = reg.exec(string)

  if (!string) {
    return NaN
  }

  // 如果有科学计数法，先将‘E’转换成‘e’
  string = string[0].toLowerCase()
  // 是否是浮点数
  const isFloat = string.indexOf('.') > -1
  // 是否是科学计数法
  const isScient = string.indexOf('e') > -1
  // 符号，false为负数，true为正数
  const flag = !string.startsWith('-')
  // 科学计数法部分的符号
  const scientFlag = true
  const zeroCode = '0'.codePointAt(0)
  // 整数部分字符串
  let integerStr = string
  // 整数部分
  let integer = 0
  // 小数部分
  let float = string
  // 科学计数法部分
  let exponent = 0

  // 科学计数法
  if (isScient) {
    const arr = string.split('e')
    // 科学计数法部分
    const scient = arr[1]
    // 浮点数部分
    float = arr[0]

    for (let i = 0; i < scient.length; i++) {
      if (scient[i] === '-') {
        scientFlag = false
        continue
      }

      exponent += (scient[i].codePointAt(0) - zeroCode) * Math.pow(10, scient.length - 1 - i)
    }

    // 这里粗暴地判断如果指数部分大于15则返回无穷大，实际情况要结合整数部分来判断，太繁琐了，暂不处理。
    if (exponent > 15) {
      return scientFlag ? Infinity : -Infinity
    }
  }

  // 小数部分
  if (isFloat) {
    const arr = float.split('.')
    const floatStr = arr[1]
    let temp = 0
    integerStr = arr[0]

    for (let i = 0; i < floatStr.length; i++) {
      temp += (floatStr[i].codePointAt(0) - zeroCode) * Math.pow(10, floatStr.length - 1 - i)
    }

    float = temp / Math.pow(10, floatStr.length)
  }

  // 整数部分
  for (let i = 0; i < integerStr.length; i++) {
    if (['+', '-'].includes(integerStr[i])) {
      continue
    }

    integer += (integerStr[i].codePointAt(0) - zeroCode) * Math.pow(10, integerStr.length - 1 - i)
  }

  res += integer + float
  res = flag ? res : -res

  if (scientFlag) {
    res *= Math.pow(10, exponent)
  } else {
    res /= Math.pow(10, exponent)
  }

  return res
}

// 将其他进制的数字转换成十进制数字
function convertOthersToDecimal (string, scale, map) {
  // toDo:要想实现跟parseInt一样的效果，需要增加详细的进制判断，过于繁琐，暂不实现
  let res = 0

  for (let i = 0; i < string.length; i++) {
    res += (string[i].codePointAt(0) - '0'.codePointAt(0)) * Math.pow(scale, string.length - 1 - i)
  }

  return res
}