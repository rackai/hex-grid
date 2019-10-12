'use strict'

import settings from './settings'

var levelContains = level => {
  if (level === 0) return 1
  else return Math.pow(2, level - 1) * settings.angles
}

var sumOfLevels = level => {
  var sum = 1;
  for (var i = 1; i <= level; i++) {
    sum += levelContains(i)
  }
  return sum; 
}

var detectLevel = number => {
  for (var level = 0; level < 9; level++) {
    if (number < sumOfLevels(level)) return level
  }
}

var numberByIndex = (number) => {
  var level = detectLevel(number)
  var index = detectAngle(number, level)
  return { level, index }
}

var detectAngle = (index, level) => index - sumOfLevels(level)

var calculateScale = level => {
  return 1 / (level + 1) * settings.ratio
}

var calculatePosition = (index, level) => {
  let size = 15 + 100 * Math.pow(level, -1 / 3.5)

  let length = 2 * Math.PI
  let x = Math.cos(index * length / levelContains(level))
  let y = Math.sin(index * length / levelContains(level))

  return {
    x: `${level * size * x * 1.15}%`,
    y: `${level * size * y * 1.35}%`
  }
}

var transform = (index, level) => {
  let scale = calculateScale(level)
  let { x, y } = calculatePosition(index, level)

  let _translate = `translate3d(${x}, ${y}, ${100 - level}px)`
  let _scale = `scale(${scale})`

  return `${_translate} ${_scale}`
}

export default { transform, calculateScale, calculatePosition, numberByIndex }