编程语言通识

  1，语言按语法分类
    中文
    英文
  
  2，形势语言（乔姆斯基谱系）
    0型 无限制文法
    1型 上下文相关文法
    2型 上下文无关文法
    3型 正则文法

  3，产生式（BNF）
    . 用尖括号括起来的名称来表示语法结构名
    . 语法结构分为基础结构和需要用其他愈发结构定义的复合结构
        基础结构成终结符
        复合结构称非终结符
    . 可以有括号
    . *表示重复多次
    . |表示或
    . +表示至少一次

  4，通过产生式理解乔姆斯基体系
    0型 无限制文法
        ?::=?
    1型 上下文相关文法
        ?<A>?::?<B>?
        例

    2型 上下文无关文法
        <A>::=?
    3型 正则文法
        <A>::=<A>?
        <A>::=?<A>x

  5，图灵完备性
    命令式--图灵机
      goto
      if和while
    声明式--lambda
      递归

  6，动态与静态
    动态
      在用户的设备、在线服务器上
      在产品实际运行时
      Runtime
    静态
      在程序员的设备上
      在产品开发时
      Compiletime

  7，类型系统
    动态类型系统与静态类型系统
    强类型与弱类型
      String + Number
      String == Boolean
    复合类型
      结构体
      函数签名
    子类型
      逆变/协变

  
作业

// 数字
<Number> = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
// 非0数字
<NoneZeroNumber> = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
// 十进制数字
<DecimalNumber> = "0" | <NoneZeroNumber><Number>*
// 加法表达式
<AdditiveExpression> = <DecimalNumber> | <AdditiveExpression> "+" <DecimalNumber>
// 乘法表达式
<MultiplicativeExpression> = <DecimalNumber> | <MultiplicativeExpression> "*" <DecimalNumber> |
                             <MultiplicativeExpression> "/" <DecimalNumber>

                                  |
                                 \|/

<AdditiveExpression> = <MultiplicativeExpression> | <AdditiveExpression> "+" <MultiplicativeExpression> |
                       <AdditiveExpression> "-" <MultiplicativeExpression>

<!-- 此处用加法表达式，不用乘法表达式，是不是因为加法表达式由乘法表达式祖成，但是乘法表达式中不包含加法表达式？ -->
<LogicalExpression> = <AdditiveExpression> | <LogicalExpression> "&&" <AdditiveExpression> |
                      <LogicalExpression> "||" <AdditiveExpression>

                                  |
                                 \|/

<PrimaryExpression> = <DecimalNumber> | "(" <LogicalExpression> ")"

                                  |
                                 \|/

<!-- 逻辑表达式右加法表达式组成，加法表达式又由乘法表达式组成，所以就变成了乘法表达式由乘法表达式组成？这里感觉乱了。。。 -->
<MultiplicativeExpression> = <PrimaryExpression> | <MultiplicativeExpression> "*" <PrimaryExpression> |
                             <MultiplicativeExpression> "/" <PrimaryExpression>      



// 正则表达式匹配所有Number直接量
// 匹配以0开头的十进制数字
/^(\+|\-)?([0]|(0(?!\d)\.?(\d*[1-9]+)?([e,E]\d+)?))$/

// 匹配非0开头的十进制数字
/^(\+|\-)?[1-9]\d*\.?(\d*[1-9]+)?([eE]\d+)?$/

// 匹配所有十进制数字
/^(\+|\-)?(([0]|(0(?!\d)|([1-9]\d*))\.?\d*?([eE]\d+)?))$/

// 匹配二进制数字
/^(0[bB])[01]+$/

// 匹配八进制数字
/^(0[oO])[0-7]+$/

// 匹配十六进制数字
/^(0[xX])[0-9a-fA-F]+$/

// 匹配所有Number直接量
/^(((\+|\-)?(([0]|(0(?!\d)|([1-9]\d*))\.?\d*?([eE]\d+)?)))|((0[bB])[01]+)|((0[oO])[0-7]+)|((0[xX])[0-9a-fA-F]+))$/