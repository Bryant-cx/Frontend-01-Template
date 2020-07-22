// 时间线
export class TimeLine {
  constructor () {
    // 用数组保存时间线中的动画
    this.animations = []

    // 动画的状态，分为初始化inited，播放中playing，暂停paused
    this.state = 'inited'

    // 动画开始的时间
    this.startTime = null

    // 动画暂停的时间
    this.pauseTime = null

    // 动画id
    this.requestId = null

    // 时钟走一格的状态
    this.tick = () => {
      // 对动画进行筛选，过滤掉已经执行完的动画
      let animations = this.animations.filter(i => !i.finished)

      // 获取动画已经执行的时间
      let t = Date.now() - this.startTime

      // 遍历动画，依次执行
      for (let animation of animations) {
        let {object, property, template, start, end, duration, delay, timingFunction, startTime} = animation

        // 获取动画已经执行的进程，是一个百分比的值，0-1
        let progression = timingFunction((t - startTime - delay) / duration)

        // 获取当前已经完成的值
        let value = start + (end - start) * progression

        // 已经执行完的动画，将状态变为完成
        if (t > duration + delay + startTime) {
          animation.finished = true

          // 将进程设为完成，确保动画执行完整
          progression = 1
        }

        // 在对象属性上反映动画进程
        object[property] = template(value)
      }

      // 如果有动画还没执行完就继续执行
      if (animations.length) {
        this.requestId = requestAnimationFrame(this.tick)
      }
    }
  }

  // 暂停动画
  pause () {
    // 状态校验
    if (this.state !== 'playing') {
      return
    }

    // 记录下暂停的时间戳
    this.pauseTime = Date.now()

    this.state = 'paused'

    // 关闭动画
    cancelAnimationFrame(this.requestId)
  }

  // 恢复动画
  resume () {
    // 状态校验
    if (this.state !== 'paused') {
      return
    }
    // 修改状态
    this.state = 'playing'

    // 重新计算动画时间
    this.startTime += Date.now() - this.pauseTime

    // 恢复动画
    this.tick()
  }

  // 开始动画
  start () {
    // 状态校验
    if (this.state !== 'inited') {
      return
    }

    // 修改状态
    this.state = 'playing'

    // 记录开始时间
    this.startTime = Date.now()

    // 开始动画
    this.tick()
  }

  // 重新开始动画
  restart () {
    // 状态校验
    if (this.state === 'playing') {
      this.pause()
    }

    // 重置参数
    this.startTime = Date.now()
    this.state = 'playing'
    this.pauseTime = null
    this.animations = []
    this.requestId = null

    // 开始动画
    this.tick()
  }

  // 向时间线中添加动画
  add (animation, startTime) {
    // 初始化动画的完成状态
    animation.finished = false

    // 初始化动画的开始时间
    if (this.state === 'playing') {
      animation.startTime = startTime !== void 0 ? startTime : Date.now() - this.startTime
    } else {
      animation.startTime = startTime !== void 0 ? startTime : 0
    }

    this.animations.push(animation)
  }
}

/**
 * 动画
 * @param object 设置动画的对象
 * @param property 设置动画影响的属性
 * @param template 设置属性变化的模板
 * @param start 设置动画的开始状态
 * @param end 设置动画的结束状态
 * @param duration 设置动画的持续时长
 * @param delay 设置动画的延时
 * @param timingFunction 设置动画的时间曲线
 */
export class Animation {
  constructor (object, property, template, start, end, duration, delay, timingFunction) {
    this.object = object
    this.property = property
    this.template = template
    this.start = start
    this.end = end
    this.duration = duration
    this.delay = delay
    this.timingFunction = timingFunction
  }
}