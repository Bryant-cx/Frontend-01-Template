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
      // 遍历时间线内的动画，依次执行

      this.requestId = requestAnimationFrame(this.tick)
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