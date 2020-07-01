// 通配符匹配
function isMatch (string, pattern) {
  // 目标字符串的索引
  let strIndex = 0
  // 模式的索引
  let pIndex = 0
  // 目标字符串的长度
  let strLen = string.length
  // 模板的长度
  let pLen = pattern.length
  // 上一次出现‘*’的位置，默认为-1
  let star = -1
  // 上一次出现‘*’时，pIndex所处的位置
  let pp = -1
  // '*'匹配的字符个数，默认为0
  let matches = 0

  // 遍历目标字符串
  while (strIndex < strLen) {
    // 如果遇到正常字符或者‘？’，两个指针直接递增
    if (pIndex < pLen && (string[strIndex] === pattern[pIndex] || pattern[pIndex] === '?')) {
      pIndex++
      strIndex++
    } else if (pIndex < pLen && pattern[pIndex] === '*') {
      // 遇到了‘*’，记录此时对应的目标字符串的指针
      star = strIndex
      // 记录此时pattern的指针
      pp = pIndex
      // pattern指针后移一位
      pIndex++
      // 重置匹配数
      matches = 0
    } else if (star !== -1) {
      matches++
      strIndex = star + matches
      pIndex = pp + 1
    } else {
      return false
    }
  }

  // 判断此时是否还有‘*’没有遍历完
  while (pIndex < pLen && pattern[pIndex] === '*') {
    pIndex++
  }

  return pIndex === pLen
}