/**
 * Mealy状态机匹配字符串‘abcde’
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
   if (char === 'd') {
     return findD
   }
   return start(char)
 }

 function findD (char) {
   if (char === 'e') {
     return end
   }

   return start(char)
 }

 function end (char) {
   return end
 }

// test
match('i am abcde') === true
match('aaabcdee') === true
match('abcabcde') === true
match('abbcde') === false