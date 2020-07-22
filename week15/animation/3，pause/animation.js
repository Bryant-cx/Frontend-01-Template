export class TimeLine {
  constructor () {
    // 用数组保存加入了时间线中的动画
    this.animations = []

    // 动画启动的时间
    this.startTime = null

    // 保存动画id
    this.requesId = null

    this.tick = () => {
      // 获取当前时间
      let t = Date.now() - this.startTime

      // 过滤已经执行完成的动画
      let animations = this.animations.filter(i => !i.finished)
  
      // 遍历时间线内的动画，依次执行
      for (let animation of animations) {
        let {object, property, template, start, end, duration, delay, timingFunction} = animation
  
        // 动画的进程，是一个0-1的百分数
        let progression = timingFunction((t - delay) / duration)

        // 如果已经超出动画执行的时间，关闭动画
        if (t > duration + delay) {
          progression = 1
          animation.finished = true
        }
  
        // 属性当前状态的值
        let value = start + progression * (end - start)
  
        // 设置对象属性
        object[property] = template(value)
      }
  
      if (animations.length) {
        this.requesId = requestAnimationFrame(this.tick)
      }
    }
  }

  // 向时间线内添加动画
  add (animation) {
    this.animations.push(animation)
  }

  // 暂停动画
  pause () {
    cancelAnimationFrame(this.requesId)
  }

  // 动画开始
  start () {
    this.startTime = Date.now()
    this.tick()
  }
}

/**
 * @param object 设置动画执行的对象
 * @param property 设置动画执行的属性
 * @param template 设置属性变化的模板
 * @param start 设置动画的开始状态
 * @param end 设置动画的结束状态
 * @param duration 设置动画的持续时间
 * @param delay 设置动画的延迟时间
 * @param timingFunction 设置动画运行的时间曲线
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