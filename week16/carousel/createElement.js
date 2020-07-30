import { enableGesture } from './gesture.js'

export function create (Cls, attributes, ...children) {
  let o

  // 遇到以小写字母作为标签的组件
  if (typeof Cls === 'string') {
    o = new Wrapper(Cls)
  } else {
    o = new Cls({
      timer: {}
    })
  }

  for (let name in attributes) {
    o.setAttribute(name, attributes[name])
  }

  let visit = (children) => {
    for (let child of children) {
      // 如果children是数组，需要递归遍历
      if (typeof child === 'object' && child instanceof Array) {
        visit(child)
        continue
      }

      if (typeof child === 'string') {
        child = new Text(child)
      }
      o.children.push(child)
    }
  }

  visit (children)

  return o
}

export class Text {
  constructor (text) {
    this.root = document.createTextNode(text)
  }

  mountTo (parent) {
    parent.appendChild(this.root)
  }
}

export class Wrapper {
  constructor (type) {
    this.root = document.createElement(type)
    this.children = []
  }

  // 设置attr
  setAttribute (name, value) {
    this.root.setAttribute(name, value)

    // 由于enableGesture只对真实dom节点有效，所以我们让它作用于根节点
    if (name === 'enableGesture') {
      enableGesture(this.root)
    }

    // 处理on事件
    if (name.match(/^on([\s\S]+)$/)) {
      let eventName = RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase())
      
      this.addEventListener(eventName, value)
    }
  }

  // 处理子节点
  appendChild (child) {
    this.children.push(child)
  }

  // 绑定事件
  addEventListener (type, handler, config) {
    this.root.addEventListener(...arguments)
  }

  // 获取属性
  get style () {
    return this.root.style
  }

  // 挂载到父节点
  mountTo (parent) {
    parent.appendChild(this.root)

    for (let child of this.children) {
      child.mountTo(this.root)
    }
  }
}