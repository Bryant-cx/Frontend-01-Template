class Carousel {
  constructor () {
    // 组件挂载的根节点
    this.root = null

    // 组件渲染的源数据
    this.data = null
  }

  // 渲染
  render () {
    // 创建根节点
    this.root = document.createElement('div')
    // 为根节点添加class
    this.root.classList.add('carousel')

    // 遍历源数据，生成图片节点并挂载到根节点
    for (let d of this.data) {
      const element = document.createElement('img')
      element.src = d

      // 屏蔽图片的默认拖拽事件
      element.addEventListener('dragstart', event => event.preventDefault())

      // 将图片挂载到根节点
      this.root.appendChild(element)
    }

    // 指针，当前展示图片的索引
    let position = 0

    // 下一张展示的图片
    let nextPic = () => {
      // 指针，下一张要展示的图片的索引
      let nextPosition = (position + 1) % this.data.length

      // 当前展示的图片
      let current = this.root.childNodes[position]
      // 下一张要展示的图片
      let next = this.root.childNodes[nextPosition]

      // 关闭动画，防止闪屏
      next.style.transition = 'ease 0s'

      // 由于当前要展示的图片已经在视框中，所以我们只需要处理下一张图片
      // 将下一张图片放到视框右侧
      next.style.transform = `translateX(${100 - 100 * nextPosition}%)`

      // 一帧之后，将当前视框中的图片移出视框，堆放在视框左侧，同时将下一张图片移入视框展示完成切换
      setTimeout(() => {
        // 打开动画，增加页面流畅度
        current.style.transition = ''
        next.style.transition = ''

        // 将当前视框中的图片移出，堆放在视框左侧
        current.style.transform = `translateX(${-100 - 100 * position}%)`
        // 将下一张图片移入视框，完成切换
        next.style.transform = `translateX(${- 100 * nextPosition}%)`

        // 指针指向下一站图片
        position = nextPosition
      }, 16);

      setTimeout(() => {
        nextPic()
      }, 1000);
    }

    // 加个延时，防止首图一闪而过
    // setTimeout(() => {
    //   nextPic()
    // }, 1000);

    // 监听跟节点mousedown事件，move的时候开始拖动
    this.root.addEventListener('mousedown', event => {
      // 鼠标开始位置
      let startX = event.clientX

      // 指针，下一张要展示的图片的索引
      let nextPosition = (position + 1) % this.data.length
      // 指针，上一张展示的图片的索引
      let prePosition = (position - 1 + this.data.length) % this.data.length

      // 当前展示的图片
      let current = this.root.childNodes[position]
      // 下一张要展示的图片
      let next = this.root.childNodes[nextPosition]
      // 上一张展示的图片
      let pre = this.root.childNodes[prePosition]

      // 首先关闭动画，然后把图片放到初始位置
      current.style.transition = 'ease 0s'
      next.style.transition = 'ease 0s'
      pre.style.transition = 'ease 0s'

      // 将当前展示图片放入起始位置
      current.style.transform = `translateX(${- 100 * position}%)`
      // 将下一张要展示的图片放到视框右侧
      next.style.transform = `translateX(${100 - 100 * nextPosition}%)`
      // 将上一张展示过得图片放到视框左侧，当前图片已经在视框中了，不用处理
      pre.style.transform = `translateX(${-100 - 100 * prePosition}%)`

      // 鼠标移动事件
      // 鼠标拖拽过程中图片跟着移动
      let move = event => {
        // 拖动距离
        let distance = event.clientX - startX

        // 一次只准拖一张图片，防止拖过界
        if (distance > 500) {
          distance = 500
        }

        if (distance < -500) {
          distance = -500
        }

        // 首先打开动画，增加切换流畅度
        current.style.transition = ''
        next.style.transition = ''
        pre.style.transition = ''

        // 拖动当前图片
        current.style.transform = `translateX(${distance - 500 * position}px)`
        // 下一张图片拖动后的位置
        next.style.transform = `translateX(${distance + 500 - 500 * nextPosition}px)`
        // 前一张图片拖动后的位置
        pre.style.transform = `translateX(${distance - 500 - 500 * prePosition}px)`
      }

      // 鼠标松开的时候完成图片切换，清除监听事件
      // 根据拖拽距离，将图片切换到指定位置
      let up = event => {
        // 移动位置
        let offset = 0

        // 向右拖动
        if (event.clientX - startX >= 250) {
          offset = 1
        } else if (event.clientX - startX <= -250) {
          // 向左移动
          offset = -1
        }

        // 将动画打开
        current.style.transition = ''
        next.style.transition = ''
        pre.style.transition = ''

        // 将当前图片切换到目标位置
        // 注意，正常情况下图片左滑的时候，position指针会递增，这里的offset右滑为正，所以应该减去offset
        current.style.transform = `translateX(${- 100 * (position - offset)}%)`
        // 将下一张图片切换到目标位置
        next.style.transform = `translateX(${100 - 100 * (nextPosition - offset)}%)`
        // 将上一张图片切换到目标位置
        pre.style.transform = `translateX(${-100 - 100 * (prePosition - offset)}%)`

        // 完成指针更新
        position = (position - offset + this.data.length) % this.data.length

        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
      }

      // 监听move事件和up事件
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    })
  }
}