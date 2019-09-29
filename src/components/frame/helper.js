
const trimTags = function (string, length) {
  string = string.replace(/<.*?>/gm, '')

  // make string a certan carater size
  if (length) {
    let temp = {
      row: string.split(' '),
      count: length,
      constructed: [],
      i: 0,
    }
    do {
      temp.count -= 1 + temp.row[0].length
      if (temp.count > 0) {
        temp.constructed.push(temp.row.shift())
      }
      temp.i++
    } while (temp.i < 500)
    string = temp.constructed.join(' ')
  }

  return string
}

const baseLineUrl = (function () {
  if (window.location.host.split(':').length === 1) {
    // production realrequest
    return window.location.origin + '/dinamic'
  } else {
    // dev mock request
    let builtUrl = window.location.origin.split(':')
    builtUrl.pop()
    return builtUrl.join(':') + '/garadenord/src/api'
  }
})()

export {trimTags, baseLineUrl}
