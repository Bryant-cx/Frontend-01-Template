// 用二维数组管理棋盘状态
const pattern = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0]
]

// 状态值，确定当前该哪方落子
let color = 1

// 刷新棋盘页面
function show () {
  const div = document.getElementById('box')
  div.innerHTML = ''

  for (let i = 0; i < pattern.length; i++) {
    for (let j = 0; j < pattern[i].length; j++) {
      const item = document.createElement('div')

      if (pattern[i][j] === 1) {
        item.innerHTML = '⭕️'
      }

      if (pattern[i][j] === 2) {
        item.innerHTML = '❌'
      }

      item.addEventListener('click', function () {
        move(j, i)
      })

      div.appendChild(item)
    }
  }
}

show()

// 点击棋盘进行落子
function move (x, y) {
  // 已经落子处点击无效
  if (pattern[y][x] > 0) {
    return
  }

  // 已经分出胜负时，无法落子
  if (check(pattern, 3 - color)) {
    console.log('It is over')
    return
  }

  // 点击棋盘进行落子
  pattern[y][x] = color

  // 校验当前棋局的胜负状态
  if (check(pattern, color)) {
    alert(color > 1 ? '❌ is winner' : '⭕️ is winner')
  }

  // 切换落子状态
  color = 3 - color
  // 重新渲染
  show()

  // 用户落子结束后换机器落子
  computerMove()
}

// 机器人落子
function computerMove() {
  // 计算当前棋局的最佳落点
  let choice = bestChoice(pattern, color)
  let point = choice.point

  if (point) {
    pattern[point[1]][point[0]] = color
  }

  // 落子后校验棋局状态
  if (check(pattern, color)) {
    alert(color > 1 ? '❌ is winner' : '⭕️ is winner')
  }

  // 落子结束后切换落子状态
  color = 3 - color
  // 重新渲染棋局
  show()
}

// 克隆当前棋盘
function copy (pattern) {
  return JSON.parse(JSON.stringify(pattern))
}

// 检查当前棋局胜负状态
function check (pattern, color) {
  // 三个横向扫描
  {
    for (let i = 0; i < 3; i++) {
      let win = true
      for (let j = 0; j < 3; j++) {
        if (pattern[i][j] !== color) {
          win = false
        }
      }

      if (win) {
        return true
      }
    }
  }

  // 三个纵向
  for (let i = 0; i < 3; i++) {
    let win = true
    for (let j = 0; j < 3; j++) {
      if (pattern[j][i] !== color) {
        win = false
      }
    }

    if (win) {
      return true
    }
  }

  // 45度斜线
  {
    let win = true
    for (let i = 0; i < 3; i++) {
      if (pattern[i][i] !== color) {
        win = false
      }
    }

    if (win) {
      return true
    }
  }

  // 另一条45度斜线
  {
    let win = true
    for (let i = 0; i < 3; i++) {
      if (pattern[i][2 - i] !== color) {
        win = false
      }
    }

    if (win) {
      return true
    }
  }

  return false
}

// 检查当前棋局状态，是否有一方即将获胜
function willWin (pattern, color) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (pattern[i][j] > 0) {
        continue
      }

      pattern[i][j] = color
      if (check(pattern, color)) {
        pattern[i][j] = 0
        return [j, i]
      }
      pattern[i][j] = 0
    }
  }

  return null
}

let openings = new Map()
// 如果机器先手，确保先占据中心点
openings.set([[0,0,0],[0,0,0],[0,0,0]].toString(), {
  point: [1, 1],
  result: 0
})

// 当前棋局状态的最佳选择
function bestChoice (pattern, color) {
  // 机器人先手时，占据中心点
  if (openings.has(pattern.toString())) {
    return openings.get(pattern.toString())
  }

  let point = null

  // 如果当前棋局出现了必胜点，将胜负状态调整为胜，返回该点
  if (point = willWin(pattern, color)) {
    return {
      point: point,
      result: 1
    }
  }

  // 默认取当前最坏状态
  let result = -1
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (pattern[i][j] > 0) {
        continue
      }

      // 假如在当前这个点落子
      let temp = copy(pattern)
      temp[i][j] = color
      // 计算对方的最佳选择
      let opp = bestChoice(temp, 3 - color)
      // 如果当前选择不差于对方的最佳选择，那么我们就找到了当前状态的最优解
      if (-opp.result >= result) {
        point = [j, i]
        result = -opp.result
      }
    }
  }
  
  return {
    point: point,
    result: point ? result : 0
  }
}