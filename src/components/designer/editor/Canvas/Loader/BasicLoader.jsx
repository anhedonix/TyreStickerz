// http://www.onicos.com/staff/iz/amuse/javascript/expert/utf.txt

/**
 * utf.js - UTF-8 <=> UTF-16 convertion
 * Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
 * Version: 1.0
 * LastModified: Dec 25 1999
 * This library is free.  You can redistribute it and/or modify it.
 */

/**
 * React components that handle the SDM File
 * This file is used at Saddles India For Representing 3D Models
 * This makes heavy use of ThreeJs and React-Three-Fiber
 * Created by Anand Magaji <anand@eosacro.com>
 */

import { ungzip } from 'pako'

const Utf8ArrayToStr = array => {
  var out, i, len, c
  var char2, char3

  out = ''
  len = array.length
  i = 0
  while (i < len) {
    c = array[i++]
    switch (c >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c)
        break
      case 12:
      case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++]
        out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f))
        break
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++]
        char3 = array[i++]
        out += String.fromCharCode(
          ((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0)
        )
        break
      default:
        break
    }
  }

  return out
}

const loadSD = data_file => {
  return new Promise((resolve, reject) => {
    if (data_file) {
      fetch(data_file)
        .then(res => res.arrayBuffer())
        .then(zip => ungzip(zip))
        .then(str => Utf8ArrayToStr(str))
        .then(out => resolve(JSON.parse(out.toString('base64'))))
    } else {
      reject({ msg: 'No Data file provided' })
    }
  })
}

export default loadSD
