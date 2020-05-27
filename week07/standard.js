const list = document.getElementById('container').children

const res = []

for (let li of list) {
  if (li.getAttribute('data-tag').match(/css/)) {
    res.push({
      name: li.children[1].innerText,
      url: li.children[1].children[0].href
    })
  }
}

console.log(JSON.stringify(res))