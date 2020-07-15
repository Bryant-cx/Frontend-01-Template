class Carousel {
  constructor () {
    this.root = null
    this.data = null
  }

  render () {
    this.root = document.createElement('div')
    this.root.classList.add('carousel')

    for (let d of this.data) {
      let element = document.createElement('img')
      element.src = d

      this.root.appendChild(element)

      // 当前是第几张
      let position = 0

      let nextPic = () => {
        // 取到当前需要展示的图片
        let current = this.root.childNodes[position]

        // 将当前图片移动到视窗
        // 目前是最简单的逻辑，就是一次将图片移动到视窗中
        // 但是这样的处理方式有问题，就是三次移动之后，函数虽然还在调用，但是此时图片是全部堆在一起的
        // 页面切换效果失败
        current.style.transform = `translateX(${- 100 * position}%)`

        position = (position + 1) % this.data.length

        setTimeout(nextPic, 1000)
      }

      nextPic()
    }
  }
}