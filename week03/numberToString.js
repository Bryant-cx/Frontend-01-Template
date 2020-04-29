/**
 * 将数字转换为字符串
 * @param {*} number 
 * @param {*} scale 
 */
function convertNumberToString (number, scale = 10) {
  if (typeof number !== 'number') {
    throw Error('a number param is required')
  }

  // 这里设定一个因子，暂定1亿，但是这个办法是有缺陷的，使用范围极窄
  // 当小数位数过多时，这个因子就会失效，如果整数过大，又超过安全范围了
  // 关于精度丢失，始终没找到好的解决办法
  const factor = 100000000
  // 整数部分
  let integer = Math.floor(number)
  // 小数部分
  let fraction = (number * factor - integer * factor) / factor
  // 结果
  let string = ''

  // 整数部分
  while (integer > 0) {
    string = integer % 10 + string
    integer = Math.floor(integer / 10)
  }

  if (fraction > 0) {
    string += '.'
  }

  // 临时变量
  let temp
  // 临时变量
  let num

  // 小数部分
  while (fraction > 0) {
    // toDO:此处也会有精度丢失
    temp = fraction * 10
    num = Math.floor(temp)

    string += num
    fraction = (temp * factor - num * factor) / factor
  }

  return string
}