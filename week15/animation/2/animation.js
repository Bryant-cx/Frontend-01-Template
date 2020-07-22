export class TimeLine {
  constructor () {
    // 用数组保存时间线里的动画
    this.animations = []

    // 动画开始的时间
    this.startTime = null
  }

  // 始终走一格的状态
  tick () {
    let t = Date.now() - this.startTime
    // 遍历时间线内的动画，依次执行
    for (let animation of this.animations) {
      let {object, property, template, start, end, duration, delay, timingFunction} = animation

      // 如果已经超过动画执行的时间，关闭动画
      if (t > duration + delay) {
        return
      }

      // 是一个0-1区间内的值，表示当前动画运行到哪一步了
      let progress = timingFunction((t - delay) / duration)
      // 当前动画移动的距离
      let value = start + progress * (end - start)

      object[property] = template(value)
    }

    requestAnimationFrame(() => this.tick())
  }

  // 向时间线中添加动画
  add (animation) {
    this.animations.push(animation)
  }

  // 动画开始
  start () {
    // 记录动画开始的时间
    this.startTime = Date.now()
    this.tick()
  }
}

/**
 * @param object 设置动画执行的对象
 * @param property 设置动画执行的对象的属性
 * @param template 设置动画属性变化的模板
 * @param start 设置动画开始的状态
 * @param end 设置动画结束得状态
 * @param duration 设置动画持续的时间
 * @param delay 设置动画的延迟
 * @param timingFunction 设置动画的曲线
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