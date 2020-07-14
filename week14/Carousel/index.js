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
    }

    let position = 0

    let nextPic = () => {
      let nextPosition = (position + 1) % this.data.length

      let current = this.root.childNodes[position]
      let next = this.root.childNodes[nextPosition]

      current.style.transition = 'ease 0s'
      next.style.transition = 'ease 0s'

      current.style.transform = `translateX(${ - 100 * position}%)`
      next.style.transform = `translateX(${100 - 100 * nextPosition}%)`

      setTimeout(() => {
        current.style.transition = 'ease .5s'
        next.style.transition = 'ease .5s'

        current.style.transform = `translateX(${-100 - 100 * position}%)`
        next.style.transform = `translateX(${- 100 * nextPosition}%)`

        position = nextPosition
      }, 16)

      setTimeout(() => {
        nextPic()
      }, 1000);
    }

    nextPic()
  }
}