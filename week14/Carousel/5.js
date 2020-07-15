class Carousel {
  constructor () {
    // 组件挂载的根节点
    this.root = null

    // 组件渲染的源数据
    this.data = null
  }

  // 渲染
  render () {
    // 生成根节点
    this.root = document.createElement('div')
    // 添加class
    this.root.classList.add('carousel')

    // 遍历源数据，生成图片挂载到根节点
    for (let d of this.data) {
      let element = document.createElement('img')
      element.src = d

      // 屏蔽图片的拖拽事件
      element.addEventListener('dragstart', event => event.preventDefault())

      // 挂载到根节点
      this.root.appendChild(element)
    }

    // 指针，当前展示的是第几张图片
    let position = 0

    // 下一张要展示的图片
    let nextPic = () => {
      // 指针，下一张要展示的图片
      let nextPosition = (position + 1) % this.data.length

      // 当前展示的图片
      let current = this.root.childNodes[position]
      // 下一张要展示的图片
      let next = this.root.childNodes[nextPosition]

      // 首先将下一张要展示的图片放到窗口右侧，等候入场，这个过程必须关闭动画，否则会有闪屏
      next.style.transition = 'ease 0s' // 关闭动画
      // 将下一张要展示的图片放到窗口右侧
      next.style.transform = `translateX(${100 - 100 * nextPosition}%)`

      // 一帧之后，将当前图片移出窗口，对方在窗口左侧
      // 将下一张要展示的图片移入窗口进行展示
      setTimeout(() => {
        // 打开动画
        current.style.transition = ''
        next.style.transition = ''

        // 将当前图片移出窗口
        current.style.transform = `translateX(${-100 - 100 * position}%)`
        // 将下一张图片移入窗口
        next.style.transform = `translateX(${- 100 * nextPosition}%)`

        // 指针指向下一张图片
        position = nextPosition
      }, 16)

      setTimeout(() => {
        nextPic()
      }, 1000);
    }

    // setTimeout(() => {
    //   nextPic()
    // }, 1000);

    // 给跟节点绑定点击事件
    this.root.addEventListener('mousedown', event => {
      // 获得鼠标的起始位置
      let startX = event.clientX

      // 指针，下一张要展示的是哪张图片的索引
      let nextPosition = (position + 1) % this.data.length
      // 指针，上一张展示的图片的索引
      let prePosition = (position - 1 + this.data.length) % this.data.length

      // 当前窗口的图片
      let current = this.root.childNodes[position]
      // 下一张要展示的图片
      let next = this.root.childNodes[nextPosition]
      // 上一张展示的图片
      let pre = this.root.childNodes[prePosition]

      // 关闭动画
      current.style.transition = 'ease 0s'
      next.style.transition = 'ease 0s'
      pre.style.transition = 'ease 0s'

      // 将当前展示图片放入起始位置
      current.style.transform = `translateX(${- 100 * position}%)`
      // 将下一张图片放到起始位置
      next.style.transform = `translateX(${100 - 100 * nextPosition}%)`
      // 将前一张图片放到起始位置
      pre.style.transform = `translateX(${-100 - 100 * prePosition}%)`

      // 鼠标移动事件
      let move = e => {
        // 拖动的距离
        let distance = e.clientX - startX

        // 三张图片一起移动
        // 当前图片移动后的位置
        current.style.transform = `translateX(${distance - 500 * position}px)`
        // 下一张图片移动后的位置
        next.style.transform = `translateX(${distance + 500 - 500 * nextPosition}px)`
        // 上一张图片移动后的位置
        pre.style.transform = `translateX(${distance - 500 - 500 * prePosition}px)`
      }

      // 松开鼠标按键
      let up = event => {
        // 松开鼠标的时候，清除事件监听
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }

      // 监听鼠标移动事件
      document.addEventListener('mousemove', move)
      // 监听鼠标松开事件
      document.addEventListener('mouseup', up)
    })
  }
}