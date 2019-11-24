var Transform = require('stream').Transform

function Stringifier (options) {
  if (!(this instanceof Stringifier)) {
    throw new TypeError('Cannot call a class as a function')
  }

  options = options || {}

  Transform.call(this, { objectMode: true })
  this._jsonStringifier = (options.jsonStringifier || JSON.stringify)
}

Stringifier.prototype = Object.create(Transform.prototype)

Stringifier.prototype._transform = function (data, _, cb) {
  var value

  try {
    value = this._jsonStringifier(data)
  } catch (err) {
    err.source = data
    return cb(err)
  }

  cb(null, value + '\n')
}

module.exports = Stringifier
