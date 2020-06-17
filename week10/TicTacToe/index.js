const pattern = [
  [0, 2, 0],
  [0, 1, 0],
  [0, 0, 0]
]

let color = 1

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

function move (x, y) {
  if (pattern[y][x] > 0) {
    return
  }

  if (check(pattern, 3 - color)) {
    console.log('It is over')
    return
  }

  pattern[y][x] = color

  if (check(pattern, color)) {
    alert(color > 1 ? '❌ is winner' : '⭕️ is winner')
  }

  color = 3 - color
  show()

  computerMove()
}

function computerMove() {
  let choice = bestChoice(pattern, color)
  let point = choice.point

  if (point) {
    pattern[choice[1], choice[0]] = color
  }

  if (check(pattern, color)) {
    alert(color > 1 ? '❌ is winner' : '⭕️ is winner')
  }

  color = 3 - color
  show()
}

function copy (pattern) {
  return JSON.parse(JSON.stringify(pattern))
}

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

openings.set([[0,0,0],[0,0,0],[0,0,0]].toString(), {
  point: [1, 1],
  result: 0
})

function bestChoice (pattern, color) {
  if (openings.has(pattern.toString())) {
    return openings.get(pattern.toString())
  }

  let point = null

  if (point = willWin(pattern, color)) {
    return {
      point: point,
      result: 1
    }
  }

  let result = -1
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (pattern[i][j] > 0) {
        continue
      }

      let temp = copy(pattern)
      temp[i][j] = color
      let opp = bestChoice(temp, 3 - color)
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