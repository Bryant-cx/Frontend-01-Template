import { create, Wrapper, Text } from './createElement.js'
import { ease, linear } from './cubicBezier'
import { TimeLine, Animation } from './animation'

export class Tabpanel {
  constructor (config) {
    this.children = []
    this.root = document.createElement('div')
    this.state = Object.create(null)
  }

  // 设置attr
  setAttribute (name, value) {
    this[name] = value
  }

  // 处理子节点
  appendChild (child) {
    this.children.push(child)
  }

  select (i) {
    for (let vie of this.childViews) {
      vie.style.display = 'none'
    }

    this.childViews[i].style.display = ''
    
    for (let vie of this.titileVie) {
      vie.classList.remove('selected')
    }

    this.titileVie[i].classList.add('selected')
  }

  render () {
    setTimeout(() => {
      this.select(0)
    }, 16);

    this.childViews = this.children.map(child => <div style="background: lightgreen;">{ child }</div>)
    this.titileVie = this.children.map((child, i) => <span onClick={ () => this.select(i) } style="margin: 10px; background: orange;cursor: pointer">{ child.getAttribute('title') }</span>)

    let root = <div class="tab-panel">
      <h1 style="width: 300px;margin: 0;" >{ this.titileVie }</h1>
      <div style="border: 1px solid orange;width: 300px;height: 300px;">
      { this.childViews }
      </div>
    </div>

    return root
  }
  // 挂载到父节点
  mountTo (parent) {
    this.render().mountTo(parent)
  }
}