let element = document.body

// 用对象区分事件的对应关系
let contexts = Object.create(null)

// 用一个symbol防止与touch事件重名
let MOUSE_SYMBOL = Symbol('mouse')

// 区分鼠标事件和touch事件
// 移动端document.ontouchstart值为null，pc端document.ontouchstart值为undefined
// 移动端的时候，需要关闭鼠标事件
if (document.ontouchstart !== null) {

  // 在鼠标按下的状态去监听鼠标移动和鼠标松开事件
  element.addEventListener('mousedown', event => {
    contexts[MOUSE_SYMBOL] = Object.create(null)
    
    // 触发start事件
    start (event, contexts[MOUSE_SYMBOL])

    // 监听move事件
    let mousemove = event => {
      move (event, contexts[MOUSE_SYMBOL])
    }

    // 监听鼠标松开事件
    let mouseend = event => {
      end (event, contexts[MOUSE_SYMBOL])

      // 松开鼠标之后，去掉事件监听
      document.removeEventListener('mousemove', mousemove)
      document.removeEventListener('mouseup', mouseend)
    }

    // 绑定鼠标移动事件和鼠标松开事件
    document.addEventListener('mousemove', mousemove)
    document.addEventListener('mouseup', mouseend)
  })
}

// 监听touch事件
element.addEventListener('touchstart', event => {
  for (let touch of event.changedTouches) {
    contexts[touch.identifier] = Object.create(null)

    // 触发start事件
    start (touch, contexts[touch.identifier])
  }
})

element.addEventListener('touchmove', event => {
  for (let touch of event.changedTouches) {
    // 触发move事件
    move (touch, contexts[touch.identifier])
  }
})

element.addEventListener('touchend', event => {
  for (let touch of event.changedTouches) {
    // 触发end事件
    end (touch, contexts[touch.identifier])
    // 去掉事件监听
    delete contexts[touch.identifier]
  }
})

element.addEventListener('touchcancel', event => {
  for (let touch of event.changedTouches) {
    // 触发cancel事件
    cancel (touch, contexts[touch.identifier])
    // 去掉事件监听
    delete contexts[touch.identifier]
  }
})

/**
 * 事件抽象
 * tap，轻触屏幕
 * press，手指触摸屏幕超过0.5s，包含pressstart和pressend两个状态，也可以包含pressend
 * pan，手机在屏幕上的移动距离超过10px，可以从tap或者press转变而来，包含panstart，pan和panend三个状态
 * flick，手指快速地扫过屏幕，可以由tap，press或者pan转变而来
 * 
 *                             end
 *              start   ----------------->  tap
 *          /         \
 *         /           \                                panend
 *   >0.5s/             \move>10px                      /
 *       /               \                            /end
 *      /    move>10px    \           move           /
 *     press --------->  panstart  -------------> pan
 *     |      \               \                   /
 *    |end     \move speed>?   \move speed > ?  /move speed > ?
 *   |          \               \             /
 * pressend       flick                flick
 * 
 */

// 抽象start事件
let start = (point, context) => {
  // 保存触碰的起始位置
  context.startX = point.clientX
  context.startY = point.clientY

  // 初始化事件状态，默认为tap事件
  context.isTap = true
  // 是否是press事件
  context.isPress = false
  // 是否是pan事件
  context.isPan = false

  // 记录移动的轨迹
  context.moves = []

  // 设置一个定时器，0.5s之后将事件状态切换为press
  context.timer = setTimeout(() => {
    // 如果此时已经是pan事件了，不能切换
    if (context.isPan) {
      return
    }

    // 将事件状态切换为press
    context.isTap = false
    context.isPan = false
    context.isPress = true

    console.log('pressstart')
  }, 500);

  console.log('tap')
}

// 抽象move事件
let move = (point, context) => {
  // 获取移动的距离
  let dx = point.clientX - context.startX
  let dy = point.clientY - context.startY

  // 如果移动的距离超过10px，将事件状态切换为pan
  if (dx ** 2 + dy ** 2 > 100) {
    context.isTap = false
    context.isPress = false
    context.isPan = true

    console.log('panstart')
  }

  context.moves.push({
    clientX: point.clientX,
    clientY: point.clientY,
    time: Date.now()
  })

  // 对运动轨迹进行筛选，丢弃300ms之前的轨迹
  context.moves = context.moves.filter(record => Date.now() - record.time < 300)
}

// 抽象end事件
let end = (point, context) => {
  // 清除定时器
  clearTimeout(context.timer)
  if (context.isPan) {
    console.log('pan end')
  }

  if (context.isPress) {
    console.log('press end')
  }

  if (context.isTap) {
    console.log('tap end')
  }

  // 取出轨迹记录中的首项
  let record = context.moves[0]
  // 计算事件结束前的速度
  let speed = (record && Math.sqrt((point.clientX - record.clientX) ** 2 + (point.clientY - record.clientY) ** 2) / (Date.now() - record.time)) || 0
  // 是否是flick事件
  let isFlick = speed > 2.5

  // 如果是flick事件，将事件状态切换为flick
  if (isFlick) {
    console.log('flick')
  }
}

// 抽象cancel事件
let cancel = (point, context) => {
  // 清除定时器
  clearTimeout(context.timer)
  console.log('canceled')
}