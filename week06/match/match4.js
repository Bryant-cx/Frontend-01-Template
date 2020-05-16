/**
 * 状态机匹配字符串'abcabf'
 */

function match(string) {
  let state = start

  for (let i = 0; i < string.length; i++) {
    state = state(string.charAt(i))

    if (state === end) {
      return true
    }
  }

  return false
}

function start (char) {
  if (char === 'a') {
    return findA
  }

  return start
}

function findA (char) {
  if (char === 'b') {
    return findB
  }

  return start(char)
}

function findB (char) {
  if (char === 'c') {
    return findC
  }

  return start(char)
}

function findC (char) {
  if (char === 'a') {
    return findA2
  }

  return start(char)
}

function findA2 (char) {
  if (char === 'b') {
    return findB2
  }

  return start(char)
}

function findB2 (char) {
  if (char === 'x') {
    return end
  }

  return findB(char)
}

function end () {
  return end
}

// test
match('abcabx') === true
match('aaabcabxx') === true
match('aabcababcabxx') === true