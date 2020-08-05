import { create, Wrapper, Text } from './createElement.js'
import { ease, linear } from './cubicBezier'
import { TimeLine, Animation } from './animation'

export class Panel {
  constructor (config) {
    this.children = []
    this.root = document.createElement('div')
  }

  // 设置attr
  setAttribute (name, value) {
    this[name] = value
  }

  // 处理子节点
  appendChild (child) {
    this.children.push(child)
  }

  render () {
    let root = <div class="panel">
      <h1 style="background: orange;width: 300px; margin: 0;" >{ this.title }</h1>
      <div style="border: 1px solid orange;width: 300px;height: 300px;">
      { this.children }
      </div>
    </div>

    return root
  }
  // 挂载到父节点
  mountTo (parent) {
    this.render().mountTo(parent)
  }
}