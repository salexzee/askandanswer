'use strict'

module.exports.randomId = () => {
  let num = Math.floor(Math.random() * 100000000)
  if (num.toString().length !== 8) {
    console.log(num)
    this.randomId()
  }
  return num
}
