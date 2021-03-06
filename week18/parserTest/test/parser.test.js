const mod = require('../src/parser')
const assert = require('assert')

it ('parse a single element', () => {
  let doc = mod.parseHTML('<div></div>')
  let div = doc.children[0]

  assert.equal(div.tagName, 'div')
  assert.equal(div.children.length, 0)
  assert.equal(div.type, 'element')
  assert.equal(div.attributes.length, 2)
})

it ('parse a single element with text content', () => {
  let doc = mod.parseHTML('<div>hello</div>')
  let text = doc.children[0].children[0]
  
  assert.equal(text.content, 'hello')
  assert.equal(text.type, 'text')
})

it ('tag mismatch', () => {
  try {
    let tag = mod.parseHTML('<div></vid>')
  } catch (e) {
    assert.equal(e.message, "Tag start end doesn't match!")
  }
})

it ('text with <', () => {
  let doc = mod.parseHTML('<div>a < b</div>')
  let text = doc.children[0].children[0]

  assert.equal(text.content, 'a < b')
  assert.equal(text.type, 'text')
})

it ('with property', () => {
  let doc = mod.parseHTML(`<div id='a' class='cls' data="abc"></div>`)
  let div = doc.children[0]
  let count = 0

  for (let attr of div.attributes) {
    if (attr.name === 'id') {
      assert.equal(attr.value, 'a')
      count++
    }

    if (attr.name === 'class') {
      assert.equal(attr.value, 'cls')
      count++
    }

    if (attr.name === 'data') {
      assert.equal(attr.value, 'abc')
      count++
    }
  }
  assert.ok(count === 3)
})

it ('with double quoted property', () => {
  let doc = mod.parseHTML('<div id="a" class="cls" data="abc"></div>')
  let div = doc.children[0]

  let count = 0

  for (let attr of div.attributes) {
    if (attr.name === 'id') {
      assert.equal(attr.value, 'a')
      count++
    }

    if (attr.name === 'class') {
      assert.equal(attr.value, 'cls')
      count++
    }

    if (attr.name === 'data') {
      assert.equal(attr.value, 'abc')
      count++
    }
  }
  assert.ok(count === 3)
})

it ('self close tag', () => {
  let doc = mod.parseHTML('<div id="a" class="cls" data="abc" />')
  let div = doc.children[0]

  let count = 0

  for (let attr of div.attributes) {
    if (attr.name === 'id') {
      assert.equal(attr.value, 'a')
      count++
    }

    if (attr.name === 'class') {
      assert.equal(attr.value, 'cls')
      count++
    }

    if (attr.name === 'data') {
      assert.equal(attr.value, 'abc')
      count++
    }
  }
  assert.ok(count === 3)
})

it ('script', () => {
  let doc = mod.parseHTML(`<script>
    <div>abc</div>
    <span>x</span>
    /script>
    <script
    <
    </
    </s
    </sc
    </scr
    </scri
    </scrip
    </script
  </script>`)

  let div = doc.children[0]
})

it ('attribute with no value', () => {
  let doc = mod.parseHTML('<div class id />')
})