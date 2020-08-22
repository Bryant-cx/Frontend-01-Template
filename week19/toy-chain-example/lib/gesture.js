function enableGesture (element) {
  // 用一个对象保存事件的对应关系
  let contexts = Object.create(null)

  // 用symbol保存事件对象，与touch事件区分开
  let MOUSE_SYMBOL = Symbol('mouse')

  // 将鼠标事件与touch事件区分开，移动端的时候屏蔽鼠标事件
  // 移动端时，document.ontouchstart值为null；pc端时，document.ontouchstart值为undefined
  if (document.ontouchstart !== null) {

    // 监听鼠标按下事件，在这个状态中鼠标移动事件和鼠标松开事件
    element.addEventListener('mousedown', event => {
      contexts[MOUSE_SYMBOL] = Object.create(null)
      start (event, contexts[MOUSE_SYMBOL])

      // 监听鼠标移动事件
      let mousemove = event => {
        move (event, contexts[MOUSE_SYMBOL])
      }

      // 监听鼠标松开事件
      // 此时，清除事件监听
      let mouseup = event => {
        end (event, contexts[MOUSE_SYMBOL])

        // 清除事件监听
        document.removeEventListener('mousemove', mousemove)
        document.removeEventListener('mouseup', mouseup)
      }

      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mouseup)
    })
  }

  // 监听touch事件
  element.addEventListener('touchstart', event => {
    for (let touch of event.changedTouches) {
      contexts[touch.identifier] = Object.create(null)
      start (touch, contexts[touch.identifier]) 
    }
  })

  // 监听touchmove事件
  element.addEventListener('touchmove', event => {
    for (let touch of event.changedTouches) {
      move (touch, contexts[touch.identifier])
    }
  })

  // 监听touchend事件
  element.addEventListener('touchend', event => {
    for (let touch of event.changedTouches) {
      end (touch, contexts[touch.identifier])
    }
  })

  // 监听touchcancel事件
  element.addEventListener('touchcancel', event => {
    for (let touch of event.changedTouches) {
      cancel (touch, contexts[touch.identifier])
    }
  })

  /**
   * 事件抽象
   * tap，轻触屏幕
   * pan，在屏幕上移动距离超过10px，包括panstart和pan两个状态，也可以包含panend，可以由tap或者press转变过来
   * press，与屏幕接触事件超过0.5s，包含pressstart，pressend两个状态
   * flick，快速地从屏幕扫过，可以从tap，pan，或者press转变过来
   * 
   *                                 end
   *                       start -------------> tap
   *                     /      \
   *                   /         \                             panend
   *                 />0.5s       \move > 10px                  /
   *               /               \                          /end
   *             /                  \            move       /
   *           press               panstart  ---------->  pan
   *          /      \                /                 /
   *        /         \               /               /
   *      /end         \move>10px     /move>10px    /move>10px
   *    /               \             /           /
   *  pressend           \            /         /
   *                                flick
   */

  // 抽象start事件
  let start = (point, context) => {
    console.log('tap')
    // 记录touch的起始位置
    context.startX = point.clientX
    context.startY = point.clientY

    // 初始化事件状态，默认为tap事件
    context.isTap = true
    // 是否为press事件
    context.isPress = false
    // 是否是pan事件
    context.isPan = false

    // 记录拖动轨迹
    context.moves = []

    // 设置一个定时器，0.5s后切换事件状态
    context.timer = setTimeout(() => {
      // 如果已经是pan事件了，不能切换
      if (context.isPan) {
        return
      }

      // 切换为press事件
      context.isTap = false
      context.isPan = false
      context.isPress = true

      console.log('press start')

      // 派发press事件
      const e = new CustomEvent('press')
      element.dispatchEvent(Object.assign(e, {
        clientX: point.clientX,
        clientY: point.clientY
      }))
    }, 500);
  }

  // 抽象move事件
  let move = (point, context) => {
    // 获取当前移动距离
    let dx = point.clientX - context.startX
    let dy = point.clientY - context.startY

    // 如果移动距离超过10px，将事件状态切换为pan
    if (dx ** 2 + dy ** 2 > 100 && !context.isPan) {
      if (context.isPress) {
        console.log('press cancel')

        // 派发press cancel事件
        const e = new CustomEvent('pressCancel')
        element.dispatchEvent(Object.assign(e, {
          clientX: point.clientX,
          clientY: point.clientY
        }))
      }

      context.isPress = false
      context.isTap = false
      context.isPan = true
      
      console.log('pan start')

      // 派发pan start事件
      const e = new CustomEvent('panStart')
      element.dispatchEvent(Object.assign(e, {
        clientX: point.clientX,
        clientY: point.clientY,
        startX: context.startX,
        startY: context.startY
      }))
    }

    if (context.isPan) {
      // 派发pan事件
      const e = new CustomEvent('pan')
      element.dispatchEvent(Object.assign(e, {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY
      }))
    }

    // 记录移动过程
    context.moves.push({
      clientX: point.clientX,
      clientY: point.clientY,
      time: Date.now()
    })

    // 只记录最近300ms内的移动轨迹
    context.moves = context.moves.filter(record => Date.now() - record.time < 300)
  }

  // 抽象end事件
  let end = (point, context) => {
    // 清除定时器
    clearTimeout(context.timer)

    if (context.isTap) {
      console.log('tap end')
      // 派发tap事件
      const e = new CustomEvent('tap')
      element.dispatchEvent(e)
    }

    if (context.isPress) {
      console.log('press end')
      // 派发pressend事件
      const e = new CustomEvent('pressEnd')
      element.dispatchEvent(Object.assign(e, {
        clientX: point.clientX,
        clientY: point.clientY
      }))
    }

    if (context.isPan) {
      console.log('pan end')

      // 计算移动速度
      let record = context.moves[0]
      let speed = Math.sqrt((point.clientX - record.clientX) ** 2 + (point.clientY - record.clientY) ** 2) / (Date.now() - record.time)

      // 是否是flick事件
      let isFlick = speed > 1

      // 切换事件状态
      if (isFlick) {
        console.log('flick')

        // 派发flick事件
        const e = new CustomEvent('flick')
        element.dispatchEvent(Object.assign(e, {
          startX: context.startX,
          startY: context.startY,
          clientX: point.clientX,
          clientY: point.clientY,
          speed
        }))
      }

      // 派发pan end事件
      const e = new CustomEvent('panEnd')
      element.dispatchEvent(Object.assign(e, {
        startX: context.startX,
        startY: context.startY,
        clientX: point.clientX,
        clientY: point.clientY,
        speed,
        isFlick
      }))
    }
  }

  // 抽象cancel事件
  let cancel = (point, context) => {
    // 清除定时器
    clearTimeout(context.timer)

    // 派发cancel事件
    const e = new CustomEvent('canceled')
    element.dispatchEvent(e)
  }
}