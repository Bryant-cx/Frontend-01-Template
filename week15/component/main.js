import { Carousel } from './carousel.view'
import { create, Wrapper, Text } from './createElement.js'

// class Carousel {
//   constructor (config) {
//     this.children = []
//     this.root = document.createElement('div')
//   }

//   // 设置attr
//   setAttribute (name, value) {
//     this[name] = value
//   }

//   // 处理子节点
//   appendChild (child) {
//     this.children.push(child)
//   }

//   render () {
//     let children = this.data.map(url => {
//       let element = <img src={url} />
//       element.addEventListener('dragstart', event => event.preventDefault())
//       return element
//     })

//     let root = <div class="carousel" >
//       { children }
//     </div>

//     // 指针，当前展示的图片的索引
//     let position = 0

//     // 下一张要展示的图片
//     let nextPic = () => {
//       // 指针，下一张要展示的图片的索引
//       let nextPosition = (position + 1) % this.data.length

//       // 当前展示的图片
//       let current = children[position]
//       // 下一张要展示的图片
//       let next = children[nextPosition]

//       // 首先关闭动画，防止页面闪动
//       next.style.transition = 'ease 0s'

//       // 将下一张图片放到视框左侧，不用处理当前图片，因为当前图片已经处于视框中
//       next.style.transform = `translateX(${100 - 100 * nextPosition}%)`

//       // 一帧之后，将当前图片移出视框，堆放到视框左侧，将下一张图放入视框
//       setTimeout(() => {
//         // 首先把动画打开，增加流畅度
//         next.style.transition = ''

//         // 将当前图片移出视框，堆放在视框左侧
//         current.style.transform = `translateX(${-100 - 100 * position}%)`
//         // 将下一张图片移入视框，完成切换
//         next.style.transform = `translateX(${ - 100 * nextPosition }%)`

//         // 指针指向下一张图片
//         position = nextPosition
//       }, 16);

//       setTimeout(() => {
//         nextPic()
//       }, 1000);
//     }

//     // setTimeout(() => {
//     //   nextPic()
//     // }, 1000);

//     // 监听根节点的拖拽事件
//     root.addEventListener('mousedown', event => {
//       // 记录鼠标按下的位置
//       let startX = event.clientX

//       // 指针，下一张将要展示的图片的索引
//       let nextPosition = (position + 1) % this.data.length
//       // 指针，上一张展示的图片的索引
//       let prePosition = (position - 1 + this.data.length) % this.data.length

//       // 当前视框中展示的图片
//       let current = children[position]
//       // 下一张要展示的图片
//       let next = children[nextPosition]
//       // 上一张展示的图片
//       let pre = children[prePosition]

//       // 关闭动画，然后将图片放到初始位置
//       current.style.transition = 'ease 0s'
//       next.style.transition = 'ease 0s'
//       pre.style.transition = 'ease 0s'

//       // 将当前图片放到视框中
//       current.style.transform = `translateX(${- 100 * position}%)`
//       // 将下一张要展示的图片放到视框右侧
//       next.style.transform = `translateX(${100 - 100 * nextPosition}%)`
//       // 将上一张展示的图片放到视框左侧
//       pre.style.transform = `translateX(${-100 - 100 * prePosition}%)`

//       // 监听鼠标移动事件，将图片切换到拖动后的位置
//       let move = event => {
//         // 拖动的距离
//         let distance = event.clientX - startX

//         // 限定一下distance，防止出现白屏
//         if (distance > 500) {
//           distance = 500
//         }

//         if (distance < -500) {
//           distance = -500
//         }

//         // 打开动画
//         current.style.transition = ''
//         next.style.transition = ''
//         pre.style.transition = ''

//         // 将当前图片放到拖动后的位置
//         current.style.transform = `translateX(${distance - 500 * position}px)`
//         // 将下一张图片放到拖放后的位置
//         next.style.transform = `translateX(${distance + 500 - 500 * nextPosition}px)`
//         // 将上一张图片放到拖放后的位置
//         pre.style.transform = `translateX(${distance - 500 - 500 * prePosition}px)`
//       }

//       // 监听鼠标的up事件
//       let up = event => {
//         // 拖动方向：1，向右；-1，向左；0， 不动
//         let offset = 0
//         // 拖动的距离
//         let distance = event.clientX - startX

//         // 向右
//         if (distance >= 250) {
//           offset = 1
//         } else if (distance <= -250) {
//           // 向左
//           offset = -1
//         }

//         // 将三张图片一次放到拖动后的位置完成切换
//         // 将当前图片放到拖动后的位置
//         current.style.transform = `translateX(${offset * 100 - 100 * position}%)`
//         // 将下一张要展示的图片放到拖放后的位置
//         next.style.transform = `translateX(${offset * 100 + 100 - 100 * nextPosition}%)`
//         // 将前一张展示过的图片放到拖放后的位置
//         pre.style.transform = `translateX(${offset * 100 - 100 - 100 * prePosition}%)`

//         // 对指针进行更新
//         // 轮播图左向滚动时position递增，右向拖放的时候offset为正，所以两者应该相减
//         position = (position - offset + this.data.length) % this.data.length

//         document.removeEventListener('mousemove', move)
//         document.removeEventListener('mouseup', up)
//       }

//       // 监听系统的拖拽事件和up事件
//       document.addEventListener('mousemove', move)
//       document.addEventListener('mouseup', up)
//     })

//     return root
//   }
//   // 挂载到父节点
//   mountTo (parent) {
//     this.render().mountTo(parent)
//   }
// }

// class Child {
//   constructor (config) {
//     this.children = []
//     this.root = document.createElement('div')
//   }

//   setAttribute (name, value) {
//     this.root.setAttribute(name, value)
//   }

//   appendChild (child) {
//     this.children.push(child)
//   }

//   mountTo (parent) {
//     parent.appendChild(this.root)

//     for (let child of this.children) {
//       child.mountTo(this.root)
//     }
//   }
// }
let data = [
  'https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg',
  'https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg',
  'https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg',
  'https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg'
]
let component = <Carousel data={data} />

console.log(component)

// 挂载到父节点
component.mountTo(document.body)

// component.setAttribute('id', 'b')