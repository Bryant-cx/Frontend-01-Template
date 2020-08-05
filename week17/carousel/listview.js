import { create, Wrapper, Text } from './createElement.js'
import { ease, linear } from './cubicBezier'
import { TimeLine, Animation } from './animation'

export class ListView {
  constructor (config) {
    this.children = []
    this.root = document.createElement('div')
    this.state = Object.create(null)
  }

  // 设置attr
  setAttribute (name, value) {
    this[name] = value
  }

  getAttribute (name) {
    return this[name]
  }

  // 处理子节点
  appendChild (child) {
    this.children.push(child)
  }

  render () {
    let data = this.getAttribute('data')
    let root = <div class="listview" style="width: 300px;">
      {
        data.map(this.children[0])
      }
    </div>

    return root
  }
  // 挂载到父节点
  mountTo (parent) {
    this.render().mountTo(parent)
  }
}