class Carousel {
  constructor () {
    // 组件挂载的根节点
    this.root = null

    // 组件显示的源数据
    this.data = null
  }

  // 渲染
  render () {
    // 生成根节点
    this.root = document.createElement('div')
    // 为根节点添加class
    this.root.classList.add('carousel')

    // 遍历源数组，生成节点，挂载到根节点上
    for (let d of this.data) {
      let element = document.createElement('img')
      element.src = d

      // 挂载到根节点上
      this.root.appendChild(element)
    }

    // 当前展示的是第几张图片
    let position = 0

    // 轮流对图片进行展示
    let nextPic = () => {
      // 下一张需要展示的是哪一张图片
      let nextPostion = (position + 1) % this.data.length

      // 当前展示的图片
      let current = this.root.childNodes[position]
      // 下一张需要展示的图片
      let next = this.root.childNodes[nextPostion]

      // 将下一张要展示的图片放到当前图片的左侧
      // 注意，此时应该先将动画关闭，这个动作是不能加动画的
      next.style.transition = 'ease 0s' // 这一步操作用来关闭动画
      next.style.transform = `translateX(${100 - 100 * nextPostion}%)`


      setTimeout(() => {
        // 一帧的时间过后，开始进行图片替换，将当前图片移出，放入下一张图片
        // 这时候要将动画打开
        current.style.transition = ''
        next.style.transition = ''
        // 将当前图片移出视口
        current.style.transform = `translateX(${-100 - 100 * position}%)`
        // 将下一张图片放入视口进行展示
        // 注意这里的写法，不管是current还是next，-100 * position都是将当前图片放入视口
        // 所以在current前面再加一个-100就是将图片移到视口的左侧进行堆放
        next.style.transform = `translateX(${-100 * nextPostion}%)`
        // 跳转到下一张图片
        position = nextPostion
      }, 16);

      setTimeout(nextPic, 1000)
    }

    // 加一个延时，防止第一张图一闪而过
    setTimeout(nextPic, 1000)
  }
}