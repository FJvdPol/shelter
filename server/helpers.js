'use strict'

exports.description = description
exports.plural = plural
exports.configureAddData = configureAddData

function description(data) {
  var value
  var classifications = []

  if (data.description) {
    return data.description
  }

  value = data.name + ' is a ' + data.primaryColor

  if (data.secondaryColor) {
    value += ' (with ' + data.secondaryColor + ')'
  }

  classifications.push(data.sex)

  if ('length' in data && data.length !== 'medium') {
    classifications.push(data.length)
  }

  if (data.size && data.size !== 'medium') {
    if (
      (data.size === 'small' && data.length === 'long') ||
      (data.size === 'large' && data.length === 'short')
    ) {
      classifications[classifications.length - 1] += ' (but ' + data.size + ')'
    } else {
      classifications.push(data.size)
    }
  }

  if (classifications.length === 1) {
    value += ' ' + classifications[0]
  } else {
    value += ', ' + classifications.join(', ')
  }

  value += ' ' + data.type

  return value
}

function plural(word, value) {
  return value === 1 ? word : word + 's'
}

function configureAddData(data){
    data.age = Number(data.age)
    data.weight = Number(data.weight)
    data.vaccinated === 'true' ? data.vaccinated = true : data.vaccinated = false
    data.declawed === 'true' ? data.declawed = true : data.declawed = false
    if (data.secondaryColor === ''){
        data.secondaryColor = undefined
    }
    if (data.type !== 'cat') {
        data.declawed = undefined
    }
    return data
}
