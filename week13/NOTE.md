组件化

  对象与组件

    对象
      .Properties
      .Methods
      .Inherit

    组件
      .Properties
      .Methods
      .Inherit
      .Attribute
      .Config & State
      .Event
      .Lifecycle
      .Children

  attribute vs property
    .attribute强调描述性
    .property强调从属关系


  Lifecycle
                mount --> mount --> unmount  
              /                               \
            /                                   destroyed
    created --> js change/set
            \                 \               /
             \                / render/update
                user input  /

  Children
    .content型children与template型children