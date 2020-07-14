
function create (Cls, attributes, ...children) {
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

  for (let child of children) {
    if (typeof child === 'string') {
      child = new Text(child)
    }
    o.children.push(child)
  }

  return o
}

class Text {
  constructor (text) {
    this.root = document.createTextNode(text)
  }

  mountTo (parent) {
    parent.appendChild(this.root)
  }
}

class Wrapper {
  constructor (type) {
    this.root = document.createElement(type)
    this.children = []
  }

  // 设置attr
  setAttribute (name, value) {
    this.root.setAttribute(name, value)
  }

  // 处理子节点
  appendChild (child) {
    this.children.push(child)
  }

  // 挂载到父节点
  mountTo (parent) {
    parent.appendChild(this.root)

    for (let child of this.children) {
      child.mountTo(this.root)
    }
  }
}

class MyConponent {
  constructor (config) {
    this.children = []
    this.root = document.createElement('div')
  }

  // 设置attr
  setAttribute (name, value) {
    this.root.setAttribute(name, value)
  }

  // 处理子节点
  appendChild (child) {
    this.children.push(child)
  }

  render () {
    return <article>
      <header>I am a header</header>
      { this.slot }
      <footer>I am a footer</footer>
    </article>
  }

  // 挂载到父节点
  mountTo (parent) {
    // parent.appendChild(this.root)
    this.slot = <div></div>
    debugger

    for (let child of this.children) {
      this.slot.appendChild(child)
    }
    this.render().mountTo(parent)
  }
}

class Child {
  constructor (config) {
    this.children = []
    this.root = document.createElement('div')
  }

  setAttribute (name, value) {
    this.root.setAttribute(name, value)
  }

  appendChild (child) {
    this.children.push(child)
  }

  mountTo (parent) {
    parent.appendChild(this.root)

    for (let child of this.children) {
      child.mountTo(this.root)
    }
  }
}

let component = <MyConponent>text text text</MyConponent>

// 挂载到父节点
component.mountTo(document.body)

// component.setAttribute('id', 'b')