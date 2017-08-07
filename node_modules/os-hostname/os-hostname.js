'use strict'

var isWindows = process.platform === 'win32'
var method

function osHostname (cb) {
  if (!method) {
    method = require('exec-fallback')(function () {
      return isWindows ? process.env.COMPUTERNAME : process.env.HOSTNAME
    }, 'hostname')
  }
  method(cb)
}
osHostname.invalidate = function () {
  if (method) method.invalidate()
}

module.exports = osHostname
