export class TimeLine {
  constructor () {
    // 用数组将要运行的动画统一储存起来
    this.animations = []

    // 动画开始的时间
    this.startTime = null
  }
  // 时钟走一格
  tick () {
    // 查看动画已经执行多久了
    let t = Date.now() - this.startTime

    // 遍历时间线内保存的动画，依次执行
    for (let animation of this.animations) {
      let { object, property, template, start, end, duration, delay, timingFunction } = animation

      // 如果已经超过动画时长了，停止动画
      if (t > duration + delay) {
        return
      }

      // 设置动画对象的属性变化
      object[property] = template(timingFunction(start, end)(t))
    }

    requestAnimationFrame(() => this.tick())
  }

  start () {
    // 记录下动画开始的时间
    this.startTime = Date.now()

    this.tick()
  }

  // 向时间线中添加动画
  add (animation) {
    this.animations.push(animation)
  }
}

/**
 * @param object 设置动画的对象
 * @param property 设置动画的属性
 * @param template 设置动画属性变化的模板
 * @param start 设置开始位置
 * @param end 设置结束位置
 * @param duration 设置动画的持续时长
 * @param delay 设置动画的延迟时间
 * @param timingFunction 设置动画的运行函数曲线
 */
export class Animation {
  constructor (object, property, template, start, end, duration, delay, timingFunction) {
    this.object = object
    this.property = property
    this.template = template
    this.start = start
    this.end = end
    this.duration = duration
    this.delay = delay || 0
    // 解释一下这个timingFunction，这里我们采用最简单的线性动画模式，
    // 函数结束开始位置和结束位置两个参数，返回的是当前时间动画目标的位置
    this.timingFunction = timingFunction || ((start, end) => {
      return (t) => {
        return ((t - this.delay) / duration) * (end - start)
      }
    })
  }
}

/**
 * let animation = new Animation(object, property, start, end, duration, delay, timingFunction)
 * 
 * let timeline = new TimeLine
 * timeline.add(animation)
 * 
 * timeline.start()
 * 
 * timeline.stop()
 * timeline.resume()
 * 
 * timeline.stop()
 */