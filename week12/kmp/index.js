function kmp_search (string, pattern) {
  const prefix_table = getPrefixTable(pattern)
  
  // 将前缀table右移一位，让前缀表的首位为-1
  move (prefix_table)
  console.log(prefix_table)

  // 目标字符串的索引
  let strIndex = 0
  // 模板字符串的索引
  let pIndex = 0

  while (strIndex < string.length) {
    // 当模板匹配完，说明匹配成功
    if (pIndex === pattern.length - 1 && string[strIndex] === pattern[pIndex]) {
      return true
    }

    // 遇到相等字符，模板指针和字符串指针均后移一位
    if (pIndex < pattern.length && pattern[pIndex] === string[strIndex]) {
      pIndex++
      strIndex++
    } else {
      // 遇到了不匹配的字符
      pIndex = prefix_table[pIndex]

      // 如果移动到了模板头部，两个指针均自增一位
      if (pIndex === -1) {
        pIndex++
        strIndex++
      }
    }
  }

  return false
}

// 获取模式字符串的前缀table
function getPrefixTable (pattern) {
  const prefix = [0]
  // 前缀字符串的长度
  let len = 0
  // 字符串索引
  let index = 1

  while (index < pattern.length) {
    // 当前字符与前缀字符串len处字符相等，说明找到了更长的前缀字符串
    if (pattern[index] === pattern[len]) {
      len++
      prefix[index] = len
      index++
    } else {
      if (len > 0) {
        // 斜向处理字符串长度，最大限度减少遍历次数
        len = prefix[len - 1]
      } else {
        // 前缀字符串长度为0，当前字符也不相等，前缀table当前值取0
        prefix[index] = len
        index++
      }
    }
  }

  return prefix
}

// 移动前缀表，使得首位值为-1
function move (table) {
  for (let i = table.length - 1; i > 0; i--) {
    table[i] = table[i - 1]
  }
  table[0] = -1
}