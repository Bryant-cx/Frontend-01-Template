// 时间线
export class TimeLine {
  constructor () {
    // 用数组保存时间线中的动画
    this.animations = new Set

    // 已经完成的动画
    this.finishedAnimation = new Set

    // 用map保存动画与添加时间的对应关系
    this.addTimes = new Map

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
      // 获取动画已经执行的时间
      let t = Date.now() - this.startTime

      // 遍历动画，依次执行
      for (let animation of this.animations) {
        let {object, property, template, start, end, duration, delay, timingFunction} = animation

        let addTime = this.addTimes.get(animation)

        // 获取动画已经执行的进程，是一个百分比的值，0-1
        let progression = timingFunction((t - addTime - delay) / duration)

        // 获取当前已经完成的值
        let value = start + (end - start) * progression

        // 当动画还没开始的时候，直接跳过，否则会出现空白
        if (t < addTime + delay) {
          continue
        }

        // 已经执行完的动画，将状态变为完成
        if (t > duration + delay + addTime) {
          // 执行完的动画从动画队列中删除
          this.animations.delete(animation)

          // 将执行完的动画保存
          this.finishedAnimation.add(animation)

          // 将进程设为完成，确保动画执行完整
          progression = 1
        }

        // 在对象属性上反映动画进程
        object[property] = template(value)
      }

      // 如果有动画还没执行完就继续执行
      if (this.animations.size) {
        this.requestId = requestAnimationFrame(this.tick)
      } else {
        this.requestId = null
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
     this.requestId = null
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

    // 将已经播完的动画放入时间线
    for (let animation of this.finishedAnimation) {
      this.animations.add(animation)
      this.finishedAnimation = new Set
    }

    // 重置参数
    this.startTime = Date.now()
    this.state = 'playing'
    this.pauseTime = null
    this.requestId = null

    // 开始动画
    this.tick()
  }

  // 重置动画
  reset () {
    // 清空时间线内动画
    this.animations = new Set

    // 清空已经播完的动画
    this.finishedAnimation = new Set

    // 清空动画与添加时间的对应关系
    this.addTimes = new Map

    // 如果动画还在播放中
    if (this.state === 'play' || this.requestId !== null) {
      cancelAnimationFrame(this.requestId)
    }

    // 初始化动画状态
    this.state = 'inited'
    this.requestId = null

    // 重置开始时间和暂停时间
    this.startTime = null
    this.pauseTime = null
  }

  // 向时间线中添加动画
  add (animation, addTime) {
    // 初始化动画的开始时间
    if (this.state === 'playing') {
      this.addTimes.set(animation, addTime !== void 0 ? addTime : Date.now() - this.startTime)
    } else {
      this.addTimes.set(animation, addTime !== void 0 ? addTime : 0) 
    }

    this.animations.add(animation)

    // 如果动画在播放中，但是之前时间线内又没有动画，需要手动开启一次
    if (this.state === 'playing' && this.requestId === null) {
      this.tick()
    }
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