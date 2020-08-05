let element = document.body

// 用一个对象记录事件对象
let contexts = Object.create(null)

// 属性名用symbol，将鼠标事件和touch事件区分开
let MOUSE_SYMBOL = Symbol('mouse')

// 移动端的时候关闭鼠标事件
// 移动端document.ontouchstart值为null，pc端为undefined
if (document.ontouchstart !== null) {
  // 在鼠标按下之后监听move和up事件
  element.addEventListener('mousedown', event => {
    contexts[MOUSE_SYMBOL] = Object.create(null)
    start(event, contexts[MOUSE_SYMBOL])

    // 监听鼠标移动事件
    let mousemove = event => {
      move (event, contexts[MOUSE_SYMBOL])
    }

    // 监听鼠标松开事件
    let mouseend = event => {
      end (event, contexts[MOUSE_SYMBOL])

      document.removeEventListener('mousemove', mousemove)
      document.removeEventListener('mouseup', mouseend)
    }

    document.addEventListener('mousemove', mousemove)
    document.addEventListener('mouseup', mouseend)
  })
}

// 监听touch事件
element.addEventListener('touchstart', event => {
  for (let touch of event.changedTouches) {
    contexts[touch.identifier] = Object.create(null)
    start(touch, contexts[touch.identifier])
  }
})

// 监听touchmove事件
element.addEventListener('touchmove', event => {
  for (let touch of event.changedTouches) {
    move(touch, contexts[touch.identifier])
  }
})

// 监听touchend事件
element.addEventListener('touchend', event => {
  for (let touch of event.changedTouches) {
    end(touch, contexts[touch.identifier])
    delete contexts[touch.identifier]
  }
})

// 监听touchcancel事件
element.addEventListener('touchcancel', event => {
  for (let touch of event.changedTouches) {
    cancel(touch, contexts[touch.identifier])
    delete contexts[touch.identifier]
  }
})


/**
 * 事件抽象：
 * tap，轻点屏幕
 * press，按压屏幕，包括pressstart和pressend
 * pan，在屏幕移动距离超过10px，包括panstart和pan两个状态
 * flick，在屏幕上快速扫过
 *                                end
 *                  start -------------------> tap
 *                 /    \                    
 *               /       \move>10px        
 *              />0.5s    \            panend
 *            /         panstart       /       flickend
 *          /              \         / end        \
 *        /                 \move  /               \end
 *      /        move>10px   \   /   speed > ?      \
 *   pressstart -----------> pan ---------------> flick
 *         \
 *          \end
 *           \
 *       pressend
 */

// 事件开始
let start = (point, context) => {
  console.log('tap')

  // 初始化事件状态
  context.startX = point.clientX
  context.startY = point.clientY

  // 默认是tap事件
  context.isTap = true
  // 是否是press事件
  context.isPress = false
  // 是否是pan事件
  context.isPan = false
  // 设置一个定时器，0.5s后将事件状态改为press
  context.timer = setTimeout(() => {
    // 如果此时已经是pan事件了，不能切换为press事件
    if (context.isPan) {
      return
    }

    // 将事件状态切换为press
    context.isTap = false
    context.isPress = true
    context.isPan = false
    console.log('pressstart')
  }, 500);
}

// 监听move事件
let move = (point, context) => {
  // x坐标和y坐标移动的距离
  let dx = point.clientX - context.startX
  let dy = point.clientY - context.startY

  // 如果移动距离超过10px，将事件状态切换为pan
  if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
    context.isPan = true
    context.isTap = false
    context.isPress = false
    console.log('panstart')
  }

  if (context.isPan) {
    console.log('pan')
  }
}

// 监听end事件
let end = (point, context) => {
  // 清除定时器
  clearTimeout(context.timer)

  if (context.isTap) {
    console.log('tapend')
  }

  if (context.isPan) {
    console.log('panend')
  }

  if (context.isPress) {
    console.log('pressend')
  }
}

// 监听cancel事件
let cancel = (point, context) => {
  // 清除定时器
  clearTimeout(context.timer)
  console.log('canceled')
}