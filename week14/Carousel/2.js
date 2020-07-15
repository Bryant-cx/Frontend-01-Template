class Carousel {
  constructor () {
    // 组件的根节点
    this.root = null

    // 轮播的数据来源
    this.data = []
  }

  // 渲染函数
  render () {
    // 生成根节点
    this.root = document.createElement('div')
    this.root.classList.add('carousel')

    // 遍历数据来源，生成子节点
    for (let d of this.data) {
      let element = document.createElement('img')
      element.src = d

      // 将图片挂载到根节点
      this.root.appendChild(element)
    }

    // 视框中当前显示的是第几张图片
    let position = 0

    // 对图片进行轮播
    let nextPic = () => {
      // 下一张需要展示的图片
      let nextPosition = (position + 1) % this.data.length
      
      // 取到当前视框中需要展示的图片
      let current = this.root.childNodes[position]
      // 取到下一站需要展示的图片
      let next = this.root.childNodes[nextPosition]

      // 将当前窗口中展示的图片移出视框
      current.style.transform = `translateX(${-100 - 100 * position}%)`
      // 将下一张需要展示的图片放入视框进行展示
      next.style.transform = `translateX(${- 100 * nextPosition}%)`

      // 换到下一张图片
      // 注意这里，其实就是将展示过的图片堆放到当前图片的左侧
      // 此时四张图片的状态依次是['transformX(-100%)', 'transformX(-200%)', 'transformX(-300%)', 'transformX(-400%)']
      // 只要保证四张图片的状态依次变成['transformX(0)', 'transformX(-100%)', 'transformX(-200%)', 'transformX(-300%)']
      // 它们就能轮流显示在视框中，这就是这一段代码实现的逻辑
      position = nextPosition

      setTimeout(nextPic, 1000)
    }

    // nextPic()
  }
}