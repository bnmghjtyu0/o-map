// 1.取得 svg
let _SVG = document.querySelector('#map')

// 設定常數
const NF = 16,
  NAV_MAP = {
    187: { dir: 1, act: 'zoom', name: 'in' } /* + */,
    107: { dir: 1, act: 'zoom', name: 'in' } /* + */,
    189: { dir: -1, act: 'zoom', name: 'out' } /* - */,
    109: { dir: -1, act: 'zoom', name: 'out' } /* - */,
    37: { dir: -1, act: 'move', name: 'left', axis: 0 } /* ⇦ */,
    38: { dir: -1, act: 'move', name: 'up', axis: 1 } /* ⇧ */,
    39: { dir: 1, act: 'move', name: 'right', axis: 0 } /* ⇨ */,
    40: { dir: 1, act: 'move', name: 'down', axis: 1 } /* ⇩ */
  },
  VB = _SVG
    .getAttribute('viewBox')
    .split(' ')
    .map(c => Number(c)),
  DMAX = VB.slice(2),
  WMIN = 8

let rID = null,
  f = 0,
  nav = null,
  tg = Array(4)

function stopAni() {
  cancelAnimationFrame(rID)
  rID = null
}
function update() {
  let k = ++f / NF,
    j = 1 - k,
    cvb = VB.slice()
  if (nav.act === 'zoom') {
    for (let i = 0; i < 4; i++) cvb[i] = j * VB[i] + k * tg[i]
  }
  if (nav.act === 'move') cvb[nav.axis] = j * VB[nav.axis] + k * tg[nav.axis]

  _SVG.setAttribute('viewBox', cvb.join(' '))
  if (!(f % NF)) {
    f = 0
    VB.splice(0, 4, ...cvb)
    nav = {}
    tg = Array(4)
    stopAni()
    return
  }
  rID = requestAnimationFrame(update)
}

function updateWheel() {
  let k = ++f / NF,
    j = 1 - k,
    cvb = VB.slice()

  for (let i = 0; i < 4; i++) {
    cvb[i] = j * VB[i] + k * tg[i]
  }

  _SVG.setAttribute('viewBox', cvb.join(' '))

  if (!(f % NF)) {
    f = 0
    VB.splice(0, 4, ...cvb)
    console.log(VB)
    nav = {}
    tg = Array(4)
    stopAni()
    return
  }
  rID = requestAnimationFrame(updateWheel)
}

function updateMove() {
  console.log(tg)
  let k = ++f / NF,
    j = 1 - k,
    cvb = VB.slice()
  for (let i = 0; i < 4; i++) {
    cvb[0] = j * VB[0] + k * tg[0]
    cvb[1] = j * VB[1] + k * tg[1]
  }

  console.log(cvb)

  _SVG.setAttribute('viewBox', cvb.join(' '))

  if (!(f % NF)) {
    f = 0
    VB.splice(0, 4, ...cvb)
    nav = {}
    tg = Array(4)
    stopAni()
    return
  }
  //   rID = requestAnimationFrame(updateMove)
}
// 鍵盤
addEventListener(
  'keyup',
  e => {
    if (!rID && e.keyCode in NAV_MAP) {
      nav = NAV_MAP[e.keyCode]
      if (nav.act === 'zoom') {
        if ((nav.dir === -1 && VB[2] >= DMAX[0]) || (nav.dir === 1 && VB[2] <= WMIN)) {
          return false
        }
        for (let i = 0; i < 2; i++) {
          tg[i + 2] = VB[i + 2] / Math.pow(1.5, nav.dir)
          tg[i] = 0.5 * (DMAX[i] - tg[i + 2])
        }
      } else if (nav.act === 'move') {
        if ((nav.dir === -1 && VB[nav.axis] <= 0) || (nav.dir === 1 && VB[nav.axis] >= DMAX[nav.axis] - VB[2 + nav.axis])) {
          return
        }
        tg[nav.axis] = VB[nav.axis] + 0.5 * nav.dir * VB[2 + nav.axis]
      }
      update()
    }
  },
  false
)

// 滑鼠滾輪
_SVG.addEventListener(
  'wheel',
  e => {
    if (!rID) {
      const dir = e.deltaY / 100
      if ((dir === 1 && VB[2] >= DMAX[0]) || (dir === -1 && VB[2] <= WMIN)) {
        // return false
      }
      for (let i = 0; i < 2; i++) {
        tg[i + 2] = VB[i + 2] / Math.pow(2, dir)
        tg[i] = 0.5 * (DMAX[i] - tg[i + 2])
      }
      updateWheel()
    }
  },
  false
)

// 拖拉事件
// 1. 滑鼠按下後 觸發 滑鼠移動
// mousedown -> mousemove
let isMousedown = false
let startX
let startY
_SVG.addEventListener('mousedown', e => {
  isMousedown = true
  startX = e.pageX
  startY = e.pageY
})

_SVG.addEventListener('mouseup', e => {
  isMousedown = false
})

_SVG.addEventListener(
  'mousemove',
  e => {
    e.preventDefault()
    if (isMousedown === false) return false
    let x = e.pageX
    let y = e.pageY
    let distanceX = x - startX
    let distanceY = y - startY
    tg[0] = VB[0] - distanceX
    tg[1] = VB[1] - distanceY
    updateMove()
  },
  false
)
