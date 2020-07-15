class Carousel {
  constructor () {
    // 图片挂载的根节点
    this.root = null

    // 图片的源数据
    this.data = null
  }

  // 渲染
  render () {
    // 生成根节点
    this.root = document.createElement('div')
    this.root.classList.add('carousel')

    // 遍历源数据，生成子节点
    for (let d of this.data) {
      let element = document.createElement('img')
      element.src = d

      // 挂载到根节点
      this.root.appendChild(element)
    }

    // 指针，当前展示的是第几张图片
    let position = 0

    // 轮流对图片进行展示
    let nextPic = () => {
      // 指针，下一张要展示的图片
      let nextPosition = (position + 1) % this.data.length

      // 当前展示的图片
      let current = this.root.childNodes[position]
      // 下一张要展示的图片
      let next = this.root.childNodes[nextPosition]

      // 首先将下一张图片放到窗口的右侧，这个过程必须关闭动画
      next.style.transition = 'ease 0s' // 关闭动画
      // 将下一张要展示的图片放到窗口右侧
      next.style.transform = `translateX(${100 - 100 * nextPosition}%)`

      // 在一帧之后，将当前图片移出，堆放到窗口左侧，同时将下一张图片移入窗口，这个过程需要将动画打开
      setTimeout(() => {
        // 打开动画
        current.style.transition = ''
        next.style.transition = ''

        // 将当前图片移出窗口，堆放到窗口左侧
        current.style.transform = `translateX(${-100 - 100 * position}%)`
        // 将下一张图片从窗口右侧移入窗口进行展示
        next.style.transform = `translateX(${- 100 * nextPosition}%)`

        // 指针指向下一张图片
        position = nextPosition
      }, 16)

      setTimeout(nextPic, 1000);
    }

    // 加一个延时，防止第一张图一闪而过
    setTimeout(() => {
      nextPic()
    }, 1000);
  }
}