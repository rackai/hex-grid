'use strict'

import './style.css'

import DOM from 'domql'
import utils from './util'
import settings from './settings'

import artists from './data/artist'

var points = new Array(artists.length).fill(0).map((value, key) => {
  if (key > 90) return
  
  let { level, index } = utils.numberByIndex(key)

  return {
    tag: 'li',
    data: {
      visible: true,
      level, index
    },
    style: {
      transform: utils.transform(key, level)
    },
    title: {
      text: artists[key]
    },
    on: {
      click: (event, element) => {
        console.log(element)
      }
    }
  }
})

var grid = {
  tag: 'ul',
  ...points
}

DOM.create(grid)
