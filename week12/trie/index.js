class Node {
  constructor (isWord = false) {
    this.isWord = isWord
    this.next = new Map
  }
}

class Trie {
  constructor () {
    this.root = new Node()
    this.size = 0
  }

  // 向Trie中添加一个单词
  insert (word) {
    // 参数检查
    if (typeof word !== 'string' || word.length === 0) {
      throw Error('A string is needed')
    }
    let cur = this.root

    // 遍历字符串
    for (let i = 0; i < word.length; i++) {
      let char = word.charAt(i)
      // 如果当前节点没有指向下一个字符的指针，添加
      if (!cur.next.has(char)) {
        cur.next.set(char, new Node())
      }
      cur = cur.next.get(char)
    }

    // 如果trie之前没有包含这个单词，统计新增一个单词
    if (!cur.isWord) {
      cur.isWord = true
      this.size++
    }
  }

  // 查询Trie中是否包含某个单词
  contains (word) {
    if (typeof word !== 'string' || word.length === 0) {
      throw Errow('A string is needed')
    }

    let cur = this.root

    // 遍历单词
    for (let i = 0; i < word.length; i++) {
      let char = word.charAt(i)

      // 如果当前节点已经没有了指向下一个字符的指针，返回false
      if (!cur.next.has(char)) {
        return false
      }

      cur = cur.next.get(char)
    }

    // 已经遍历到最后一个字符，如果当前节点并不是一个单词的结尾，说明不包含
    return cur.isWord
  }

  // Trie的前缀搜索
  isPrefix (prefix) {
    if (typeof prefix !== 'string' || prefix.length === 0) {
      throw Error('A string is needed')
    }

    let cur = this.root

    // 遍历prefix
    for (let i = 0; i < prefix; i++) {
      let char = prefix.charAt(i)

      // 如果当前节点不存在指向下一个节点的指针，返回false
      if (!cur.next.has(char)) {
        return false
      }

      cur = cur.next.get(char)
    }
    return true
  }
}