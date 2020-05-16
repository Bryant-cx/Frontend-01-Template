// 匹配单个字符
function match (string, char) {
  for (let i = 0; i < string.length; i++) {
    if (string.charAt(i) === char) {
      return true
    }
  }

  return false
}

// test
match('abc', 'a') === true
match('abc', 'd') === false