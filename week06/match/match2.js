// 匹配连续出现的两个字符
function match(string, str) {
  let findOne = false
  for (let i = 0; i < string.length; i++) {
    if (string.charAt(i) === str.charAt(0)) {
      findOne = true
    } else if (findOne && string.charAt(i) === str.charAt(1)) {
      return true
    } else {
      findOne = false
    }
  }

  return false
}

// test
match('abc', 'ab') === true
match('acb', 'ab') === false