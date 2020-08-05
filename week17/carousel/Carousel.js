import { create, Wrapper, Text } from './createElement.js'
import { ease, linear } from './cubicBezier'
import { TimeLine, Animation } from './animation'

import css from './carousel.css'
// console.log(css)
// let style = document.createElement('style')
// style.innerText = css[0][1]
// document.documentElement.appendChild(style)

export class Carousel {
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
    // 指针，当前展示图片的索引
    let position = 0

    // 初始化timeLine
    let timeLine = new TimeLine
    // 开始动画
    timeLine.start()

    // 保存定时器指针
    let timer = null

    let children = this.data.map((url, currentPosition) => {
      // 指针，上一张图片的索引
      let prePosition
      // 指针，下一张图片的索引
      let nextPosition

      // 当前图片
      let current
      // 上一张图片
      let pre
      // 下一张图片
      let next
      // 拖拽开始时的偏移量
      let offset = 0

      // start事件
      let onStart = () => {
        timeLine.pause()
        clearTimeout(timer)

        prePosition = (currentPosition - 1 + this.data.length) % this.data.length
        nextPosition = (currentPosition + 1) % this.data.length

        // 确定拖拽的三张图片
        current = children[currentPosition]
        pre = children[prePosition]
        next = children[nextPosition]

        // 首先关闭动画，防止页面闪动
        next.style.transition = 'ease 0s'

        // 当前变换值
        let currentTransformValue = Number(current.style.transform.match(/translateX\(([\s\S]+)px\)/)[1])

        // 确定偏移量
        offset = currentTransformValue + 500 * currentPosition
      }

      // pan事件
      let onPan = (event) => {
        // 鼠标拖拽的距离
        let dx = event.clientX - event.startX
        // 偏移量
        let offsetValue = dx + offset
        let currentTransform = offsetValue - 500 * currentPosition
        let preTransform = offsetValue - 500 - 500 * prePosition
        let nextTransform = offsetValue + 500 - 500 * nextPosition

        // 首先关闭动画，防止页面闪动
        next.style.transition = 'ease 0s'

        // 将三张图片都放到它们应该出现的位置
        current.style.transform = `translateX(${ currentTransform }px)`
        pre.style.transform = `translateX(${ preTransform }px)`
        next.style.transform = `translateX(${ nextTransform }px)`
      }

      // 拖拽结束后的事件
      let panEnd = (event) => {
        // 计算拖拽距离
        let dx = event.clientX - event.startX
        // 确定偏移方向，向左拖动的时候，值为-1，向右拖动值为1
        let direction = 0

        console.log('flick', event.isFlick)

        if (dx + offset > 250 || dx > 0 && event.isFlick) {
          direction = 1
        } else if (dx + offset < -250 || dx < 0 && event.isFlick) {
          direction = -1
        }

        // 确定元素的当前位置
        let currentTransform = dx + offset - 500 * currentPosition
        let preTransform = dx + offset - 500 - 500 * prePosition
        let nextTransform = dx + offset + 500 - 500 * nextPosition

        // 重置动画时间线
        timeLine.reset()
        timeLine.start()

        // 当前元素的动画
        const currentAnimation = new Animation(current.style, 'transform',v => `translateX(${v}px)`,
         currentTransform, direction * 500 - 500 * currentPosition, 100, 0, ease)
        // 上一张图片的动画
        const preAnimation = new Animation(pre.style, 'transform',v => `translateX(${v}px)`,
         preTransform, direction * 500 - 500 - 500 * prePosition, 100, 0, ease)
        // 下一张图片的动画
        const nextAnimation = new Animation(next.style, 'transform', v => `translateX(${v}px)`,
         nextTransform, direction * 500 + 500 - 500 * nextPosition, 100, 0, ease)

        timeLine.add(currentAnimation)
        timeLine.add(preAnimation)
        timeLine.add(nextAnimation)

        // 重新恢复动画
        position = (currentPosition - direction + this.data.length) % this.data.length
        console.log(position)
        timer = setTimeout(() => {
          nextPic()
        }, 1000);
      }

      let element = <img src={url} onStart={onStart} onPan={onPan} onPanEnd={panEnd} enableGesture={true}/>
      element.addEventListener('dragstart', event => event.preventDefault())
      // 设定一个初始值，防止获取偏移值的时候报错
      element.style.transform = 'translateX(0px)'
      return element
    })

    let root = <div class="carousel" >
      { children }
    </div>

    // 下一张要展示的图片
    let nextPic = () => {
      // 指针，下一张要展示的图片的索引
      let nextPosition = (position + 1) % this.data.length

      // 当前展示的图片
      let current = children[position]
      // 下一张要展示的图片
      let next = children[nextPosition]

      // 首先关闭动画，防止页面闪动
      next.style.transition = 'ease 0s'

      // 初始化当前图片的动画
      const currentAnimation = new Animation(current.style, 'transform',
       v => `translateX(${ v * 5 }px)`, - 100 * position, -100 - 100 * position, 500, 0, ease)

      // 初始化下一张图片的动画
      const nextAnimation = new Animation(next.style, 'transform',
       v => `translateX(${ v * 5 }px)`, 100 - 100 * nextPosition, - 100 * nextPosition, 500, 0, ease)

      // 将下一张图片放到视框左侧，不用处理当前图片，因为当前图片已经处于视框中
      // next.style.transform = `translateX(${100 - 100 * nextPosition}%)`

      // 将动画加入时间线中
      timeLine.add(currentAnimation)
      timeLine.add(nextAnimation)

      // 指针指向下一张图片
      position = nextPosition

      // 一帧之后，将当前图片移出视框，堆放到视框左侧，将下一张图放入视框
      // setTimeout(() => {
      //   // 首先把动画打开，增加流畅度
      //   next.style.transition = ''

      //   // 将当前图片移出视框，堆放在视框左侧
      //   current.style.transform = `translateX(${-100 - 100 * position}%)`
      //   // 将下一张图片移入视框，完成切换
      //   next.style.transform = `translateX(${ - 100 * nextPosition }%)`

      //   // 指针指向下一张图片
      //   position = nextPosition
      // }, 16);

      timer = setTimeout(() => {
        nextPic()
      }, 1000);
    }

    timer = setTimeout(() => {
      nextPic()
    }, 1000);

    // 监听根节点的拖拽事件
    // root.addEventListener('mousedown', event => {
    //   // 记录鼠标按下的位置
    //   let startX = event.clientX

    //   // 指针，下一张将要展示的图片的索引
    //   let nextPosition = (position + 1) % this.data.length
    //   // 指针，上一张展示的图片的索引
    //   let prePosition = (position - 1 + this.data.length) % this.data.length

    //   // 当前视框中展示的图片
    //   let current = children[position]
    //   // 下一张要展示的图片
    //   let next = children[nextPosition]
    //   // 上一张展示的图片
    //   let pre = children[prePosition]

    //   // 关闭动画，然后将图片放到初始位置
    //   current.style.transition = 'ease 0s'
    //   next.style.transition = 'ease 0s'
    //   pre.style.transition = 'ease 0s'

    //   // 将当前图片放到视框中
    //   current.style.transform = `translateX(${- 100 * position}%)`
    //   // 将下一张要展示的图片放到视框右侧
    //   next.style.transform = `translateX(${100 - 100 * nextPosition}%)`
    //   // 将上一张展示的图片放到视框左侧
    //   pre.style.transform = `translateX(${-100 - 100 * prePosition}%)`

    //   // 监听鼠标移动事件，将图片切换到拖动后的位置
    //   let move = event => {
    //     // 拖动的距离
    //     let distance = event.clientX - startX

    //     // 限定一下distance，防止出现白屏
    //     if (distance > 500) {
    //       distance = 500
    //     }

    //     if (distance < -500) {
    //       distance = -500
    //     }

    //     // 打开动画
    //     current.style.transition = ''
    //     next.style.transition = ''
    //     pre.style.transition = ''

    //     // 将当前图片放到拖动后的位置
    //     current.style.transform = `translateX(${distance - 500 * position}px)`
    //     // 将下一张图片放到拖放后的位置
    //     next.style.transform = `translateX(${distance + 500 - 500 * nextPosition}px)`
    //     // 将上一张图片放到拖放后的位置
    //     pre.style.transform = `translateX(${distance - 500 - 500 * prePosition}px)`
    //   }

    //   // 监听鼠标的up事件
    //   let up = event => {
    //     // 拖动方向：1，向右；-1，向左；0， 不动
    //     let offset = 0
    //     // 拖动的距离
    //     let distance = event.clientX - startX

    //     // 向右
    //     if (distance >= 250) {
    //       offset = 1
    //     } else if (distance <= -250) {
    //       // 向左
    //       offset = -1
    //     }

    //     // 将三张图片一次放到拖动后的位置完成切换
    //     // 将当前图片放到拖动后的位置
    //     current.style.transform = `translateX(${offset * 100 - 100 * position}%)`
    //     // 将下一张要展示的图片放到拖放后的位置
    //     next.style.transform = `translateX(${offset * 100 + 100 - 100 * nextPosition}%)`
    //     // 将前一张展示过的图片放到拖放后的位置
    //     pre.style.transform = `translateX(${offset * 100 - 100 - 100 * prePosition}%)`

    //     // 对指针进行更新
    //     // 轮播图左向滚动时position递增，右向拖放的时候offset为正，所以两者应该相减
    //     position = (position - offset + this.data.length) % this.data.length

    //     document.removeEventListener('mousemove', move)
    //     document.removeEventListener('mouseup', up)
    //   }

    //   // 监听系统的拖拽事件和up事件
    //   document.addEventListener('mousemove', move)
    //   document.addEventListener('mouseup', up)
    // })

    return root
  }
  // 挂载到父节点
  mountTo (parent) {
    this.render().mountTo(parent)
  }
}