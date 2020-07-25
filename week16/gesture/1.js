let element = document.body

// 鼠标事件，在鼠标按下时监听鼠标移动和松开
element.addEventListener('mousedown', event => {
  start(event)

  // 监听鼠标移动事件
  let mousemove = event => {
    move(event)
  }

  // 监听松开鼠标
  let mouseend = event => {
    end (event)

    document.removeEventListener('mousemove', mousemove)
    document.removeEventListener('mouseup', mouseend)
  }

  document.addEventListener('mousemove', mousemove)
  document.addEventListener('mouseup', mouseend)
})

// 移动端监听touch
element.addEventListener('touchstart', event => {
  for (let touch of event.changedTouches) {
    start(touch)
  }
})

element.addEventListener('touchmove', event => {
  for (let touch of event.changedTouches) {
    move(touch)
  }
})

element.addEventListener('touchend', event => {
  for (let touch of event.changedTouches) {
    end(touch)
  }
})

element.addEventListener('touchcancel', event => {
  for (let touch of event.changedTouches) {
    cancel(touch)
  }
})

let start = (point) => {
  console.log('start', point.clientX, point.clientY)
}

let move = (point) => {
  console.log('move', point.clientX, point.clientY)
}

let end = (point) => {
  console.log('end', point.clientX, point.clientY)
}

let cancel = () => {
  console.log('cancel')
}