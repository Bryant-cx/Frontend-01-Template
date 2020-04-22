// U+  0000(0)     ~ U+   007F(127)     : 0XXXXXXX                                7 位数字
// U+  0080(128)   ~ U+   07FF(2047)    : 110XXXXX 10XXXXXX                       11位数字
// U+  0800(2048)  ~ U+   FFFF(65535)   : 1110XXXX 10XXXXXX 10XXXXXX              16位数字
// U+ 10000(65536) ~ U+ 10FFFF(1114111) : 11110XXX 10XXXXXX 10XXXXXX 10XXXXXX     21位数字

function utf8Encoding (str) {
  // 只支持字符串或数字的编码
  if (!['string', 'number'].includes(typeof str)) {
    throw Error('Error input, a string or number is needed!')
  }

  // 参数强制转换成字符串
  str = String(str)

  if (!str.length) {
    return ''
  }

  let res = ''

  for (let char of str) {
    const code = char.codePointAt(0)
    let binaryStr = code.toString(2)

    if (code < 128) {
      binaryStr = ('0000000' + binaryStr).slice(-8)
    } else if (code < 2048) {

      const originStr = ('00000000000' + binaryStr).slice(-11)
      binaryStr = '110' + originStr.slice(0, 5) 
                + '10' + originStr.slice(-6)
    } else if (code < 65536) {

      const originStr = ('0000000000000000' + binaryStr).slice(-16)
      binaryStr = '1110' + originStr.slice(0, 4)
                + '10' + originStr.slice(-12, -6)
                + '10' + originStr.slice(-6)

    } else {
      const originStr = ('000000000000000000000' + binaryStr).slice(-21)
      binaryStr = '11110' + originStr.slice(0, 3)
                + '10' + originStr.slice(-18, -12)
                + '10' + originStr.slice(-12, -6)
                + '10' + originStr.slice(-6)
    }

    res += transBinaryTo16(binaryStr)
  }
  return res
}

// 将二进制字段转换为16进制
function transBinaryTo16 (binaryStr) {
  const reg8 = /.{8}/g
  const reg4 = /.{4}/g
  const binaryArr = binaryStr.match(reg8)
  let res = ''

  binaryArr.forEach(i => {
    const arr = i.match(reg4)
    res += '\\x' + parseInt(arr[0], 2).toString(16).toUpperCase()
        + parseInt(arr[1], 2).toString(16).toUpperCase()
  })

  return res
}