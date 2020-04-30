# 每周总结可以写在这里

Object

  任何一个对象都是唯一的，它与本身状态无关

  即使状态完全一致的两个对象，也并不相等

  我们用状态描述对象

  状态的改变即是行为

  对象的三要素：
    唯一性
    状态
    行为

  
  基于类的对象编程
    类是一种常见的描述对象的方式

    “归类”和“分类”是两个主要的流派

    对于“归类”方法而言，多继承是非常自然的事情，如c++

    采用分类思想的计算机语言，则是单继承结构。并且会有一个基类Object

  Object与prototype

  在设计对象的状态和行为时，我们总是遵循“行为改变状态”的原则


  javascript | 语句，对象

    javascript对象可以分为宿主对象（host Objects）和内置对象（Built-in Objects）两大类。

    宿主对象由JavaScript宿主环境提供，它们的行为完全由宿主环境决定，前端最熟悉的宿主环境就是浏览器。
    宿主对象也分为固有和用户可创建两种。

    内置对象分为：固有对象（Intrinsic Objects），由标准规定，随着JavaScript运行时而自动创建；
    原生对象（Native Objects），可以由用户通过Array、RegExp等内置构造器或者特殊语法创建；
    普通对象（Ordinary Objects），由{}语法、Object构造器或者class关键字定义类创建的对象，它能够
    被原型继承。

    在JavaScript中，能够通过语言本身的构造器创建的对象称为原生对象。它们包括：基础类型，Boolean, String,
    Number, Symbol, Object；基础功能和数据结构，Array, Date, RegExp, Promise, Proxy, Map, WeakMap,
    Set, WeakSet, Function；错误类型，Error, EvalError, RangeError, ReferenceError, SyntaxError, 
    TypeError, URIError；二进制操作，ArrayBuffer, SharedArrayBuffer, DataView；带类型的数组，Float32Array,
    Float64Array, Int8Array, Int16Array, Int32Array, UInt8Array, UInt16Array, UInt32Array, 
    UInt8ClampedArray

    几乎所有的构造器的能力都无法用纯JavaScript代码实现，也无法用class/extends来继承，这些构造函数使用了私有字段，
    例如：

    Error: [[ErrorData]]
    Boolean: [[BooleanData]]
    Number: [[NumberData]]
    Date: [[DateValue]]
    RegExp: [[RegExpMatcher]]
    Symbol: [[SymbolData]]
    Map: [[MapData]]

    在原生对象和固有对象中，还有一些对象的行为跟正常对象有很大差别。它们常见的下标操作（就是使用中括号或者点来做属性
    访问）或者设置原型跟普通对象不同。

    Array: Array的length属性根据最大的下标自动发生变化。
    Object.prototype：作为所有正常对象的默认原型，不能再给它设置原型
    String: 为了支持下标运算，String的正整数属性访问会去字符串里查找
    Arguments: arguments的非负整数型下标属性跟对应的变量联动
    模块的namespace对象：特殊的地方非常多，跟一般的对象完全不一样，尽量只用于import
    类型数组和数组缓冲区：跟内存块相关联，下标运算比较特殊
    bind后的function：跟原来的函数相关联