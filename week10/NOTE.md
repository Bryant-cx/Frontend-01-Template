Range API

  var range = new Range()
  range.setStart(element, 9)
  range.setEnd(element, 4)
  var range = document.getSelection().getRangeAt(0)

  range.setStartBefore
  range.setEndBefore
  range.setStartAfter
  range.setEndAfter
  range.selectNode
  range.selectNodeContents

  能力：
    var fragment = range.extractContents()
    range.insertNode(document.createTextNode('aaa'))

CSSOM

  document.stylesheets
    .document.styleSheets[0].cssRules
    .documnet.styleSheets[0].insertRule('p {color: pink;}')
    .document.styleSheets[0].removeRule[0]

  document.getCumputedStyle(element, pseudoElement)
    .element是想要获取的元素
    .pseudoElement可选，伪元素

  
  window.open 打开窗口

  window.scroll 窗口滚动

  element.getClientRects() 获取元素的位置信息

  element.getBoundingClientRect()

  window.innerWidth

  window.innerHeight

  window.devicePixelRatio