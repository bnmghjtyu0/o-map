// JavaScript IIFE
;(function() {
  let map = function() {
    this.eventMap = {
      1: { act: 'zoom' },
      2: { act: 'mousemove' },
      3: { act: 'show' },
      4: { act: 'Home' }
    }
    this.NF = 16
    this.nav = null
    this.tg = Array(4)
    this.rID = null
    this.f = 0
    // 取得 svg
    this.svg = document.querySelector('#map')
    this.svgViewBox = this.svg
      .getAttribute('viewBox')
      .split(' ')
      .map(c => Number(c))

    this.stopAni = function() {
      cancelAnimationFrame(rID)
      rID = null
    }
    // 地圖縮放
    this.update = function() {
      let k = ++f / NF,
        j = 1 - k,
        cvb = this.svgViewBox

      if (nav.act === 'zoom') {
        for (let i = 0; i < 4; i++) {
          cvb[i] = j * svgViewBox[i] + k * tg[i]
        }
        rID = requestAnimationFrame(update)
      }

      this.svg.setAttribute('viewBox', cvb.join(' '))
      if (!(f % NF)) {
        f = 0
        this.svgViewBox.splice(0, 4, ...cvb)
        nav = {}
        tg = Array(4)
        stopAni()
      }
    }
    this.zoom = function(e) {
      if (!rID && eventMap) {
        nav = eventMap['1']
        if (nav.act === 'zoom') {
          let newSVGPoint = this.createSVGPoint(),
            CTM = this.getScreenCTM(),
            r
          // dir = 滾輪上下滾動
          const dir = e.wheelDeltaY / 120,
            // 視窗座標 轉 svg 座標
            startClient = {
              x: (newSVGPoint.x = e.clientX),
              y: (newSVGPoint.y = e.clientY)
            },
            startSVGPoint = {
              x: newSVGPoint.matrixTransform(CTM.inverse()).x,
              y: newSVGPoint.matrixTransform(CTM.inverse()).y
            }
          // 縮放倍率

          // 宣告結束 ============================================================================
          if (dir > 0) {
            r = 0.5
          } else if (dir < 0) {
            r = 1.5
          } else {
            r = 1
          }
          this.setAttribute('viewBox', `${svgViewBox[0]} ${svgViewBox[1]} ${svgViewBox[2] * r} ${svgViewBox[3] * r}`)
          // 以滑鼠為中心點縮放
          // 重新取得 viewBox 值  = moveToSVGPoint
          CTM = this.getScreenCTM()
          let moveToSVGPoint = newSVGPoint.matrixTransform(CTM.inverse())

          let delta = {
            dx: startSVGPoint.x - moveToSVGPoint.x,
            dy: startSVGPoint.y - moveToSVGPoint.y
          }
          //  6.設定最終的 viewBox2
          let middleViewBox = this.getAttribute('viewBox')
            .split(' ')
            .map(n => Number(n))
          let moveBackViewBox = `${middleViewBox[0] + delta.dx} ${middleViewBox[1] + delta.dy} ${middleViewBox[2]} ${middleViewBox[3]}`

          tg = moveBackViewBox.split(' ')
        }
        update()
      }
    }
    this.svg.addEventListener('wheel', this.zoom, false)
  }
  map()

  // 設定
  // const NF = 16,
  //   eventMap = {
  //     1: { act: 'zoom' },
  //     2: { act: 'mousemove' },
  //     3: { act: 'show' },
  //     4: { act: 'Home' }
  //   },
  //   VB = _SVG
  //     .getAttribute('viewBox')
  //     .split(' ')
  //     .map(c => Number(c)),
  //   DMAX = VB.slice(2),
  //   WMIN = 8

  // let rID = null,
  //   f = 0,
  //   nav = null,
  //   tg = Array(4)

  // -----------------------------------------------------------------------
  // 還原
  // let Home = document.querySelector('#Home')
  // Home.addEventListener('click', function() {
  //   if (!rID && eventMap) {
  //     nav = eventMap['1']
  //     if (nav.act === 'zoom') {
  //       tg = [1003, 501, 240, 135]
  //     }
  //   }
  //   update()
  // })

  // -----------------------------------------------------------------------

  // function stopAni() {
  //   cancelAnimationFrame(rID)
  //   rID = null
  // }

  // function update() {
  //   let k = ++f / NF,
  //     j = 1 - k,
  //     cvb = VB.slice()

  //   if (nav.act === 'zoom') {
  //     for (let i = 0; i < 4; i++) {
  //       cvb[i] = j * VB[i] + k * tg[i]
  //     }
  //     rID = requestAnimationFrame(update)
  //   }

  //   if (nav.act === 'mousemove') {
  //     for (let i = 0; i < 4; i++) {
  //       cvb[i] = tg[i]
  //     }
  //   }
  //   if (nav.act === 'show') {
  //     for (let i = 0; i < 4; i++) {
  //       cvb[i] = tg[i]
  //     }
  //   }

  //   if (nav.act === 'Home') {
  //     for (let i = 0; i < 4; i++) {
  //       cvb[i] = tg[i]
  //     }
  //   }

  //   _SVG.setAttribute('viewBox', cvb.join(' '))
  //   if (!(f % NF)) {
  //     f = 0
  //     VB.splice(0, 4, ...cvb)
  //     nav = {}
  //     tg = Array(4)
  //     stopAni()
  //     return
  //   }
  // }

  // // 滾輪縮放
  // _SVG.addEventListener(
  //   'wheel',
  //   e => {
  //     if (!rID && eventMap) {
  //       nav = eventMap['1']
  //       if (nav.act === 'zoom') {
  //         const dir = e.deltaY / 100
  //         if ((dir === 1 && VB[2] >= DMAX[0]) || (dir === -1 && VB[2] <= WMIN)) {
  //           // return false
  //         }
  //         //  2.1 取得滑鼠執行縮放的位置
  //         let startClient = {
  //           x: e.clientX,
  //           y: e.clientY
  //         }
  //         //  2.2 轉換成 SVG 座標系統中的 SVG 座標點
  //         let newSVGPoint = _SVG.createSVGPoint()
  //         let CTM = _SVG.getScreenCTM()
  //         newSVGPoint.x = startClient.x
  //         newSVGPoint.y = startClient.y
  //         let startSVGPoint = newSVGPoint.matrixTransform(CTM.inverse())
  //         //  3.進行縮放，如果要讓原本的尺寸縮放兩倍的話。
  //         //  3.1 設定縮放倍率
  //         let r
  //         if (e.deltaY > 0) {
  //           r = 0.5
  //         } else if (e.deltaY < 0) {
  //           r = 1.5
  //         } else {
  //           r = 1
  //         }
  //         //  3.2 進行縮放
  //         _SVG.setAttribute('viewBox', `${VB[0]} ${VB[1]} ${VB[2] * r} ${VB[3] * r}`)
  //         //  4.將一開始滑鼠的執行縮放位置的 viewPort Client 座標利用新的 CTM ，轉換出對應的 SVG 座標。
  //         CTM = _SVG.getScreenCTM()
  //         let moveToSVGPoint = newSVGPoint.matrixTransform(CTM.inverse())

  //         //  5.取得在縮放過程中該圓點的位移量 `(svgX0 - svgX1)`。
  //         let delta = {
  //           dx: startSVGPoint.x - moveToSVGPoint.x,
  //           dy: startSVGPoint.y - moveToSVGPoint.y
  //         }
  //         //  6.設定最終的 viewBox2
  //         let middleViewBox = _SVG
  //           .getAttribute('viewBox')
  //           .split(' ')
  //           .map(n => parseFloat(n))
  //         let moveBackViewBox = `${middleViewBox[0] + delta.dx} ${middleViewBox[1] + delta.dy} ${middleViewBox[2]} ${middleViewBox[3]}`
  //         tg = moveBackViewBox.split(' ')
  //       }
  //       update()
  //     }
  //   },
  //   false
  // )

  // // 拖拉事件
  // let isMousedown = false
  // _SVG.addEventListener('mousedown', e => {
  //   isMousedown = true
  // })

  // _SVG.addEventListener('mouseup', e => {
  //   isMousedown = false
  // })

  // window.addEventListener(
  //   'mousemove',
  //   e => {
  //     if (!rID && eventMap) {
  //       nav = eventMap['2']
  //       if (nav.act === 'mousemove') {
  //         if (isMousedown === false) return false
  //         // 1. 取得一開始的 viewBox 值，原本是字串，拆成陣列，方便之後運算
  //         let startViewBox = _SVG
  //           .getAttribute('viewBox')
  //           .split(' ')
  //           .map(n => +n)
  //         //  2. 取得滑鼠當前 viewport 中 client 座標值
  //         let startClient = {
  //           x: e.clientX,
  //           y: e.clientY
  //         }
  //         //  3. 計算對應回去的 SVG 座標值
  //         let newSVGPoint = _SVG.createSVGPoint()
  //         let CTM = _SVG.getScreenCTM()
  //         newSVGPoint.x = startClient.x
  //         newSVGPoint.y = startClient.y
  //         let startSVGPoint = newSVGPoint.matrixTransform(CTM.inverse())
  //         //  4. 計算拖曳後滑鼠所在的 viewport client 座標值
  //         let moveToClient = {
  //           x: e.clientX + e.movementX, //  movement 可以取得滑鼠位移量
  //           y: e.clientY + e.movementY
  //         }
  //         //  5. 計算對應回去的 SVG 座標值
  //         newSVGPoint = _SVG.createSVGPoint()
  //         CTM = _SVG.getScreenCTM()
  //         newSVGPoint.x = moveToClient.x
  //         newSVGPoint.y = moveToClient.y
  //         let moveToSVGPoint = newSVGPoint.matrixTransform(CTM.inverse())
  //         //  6. 計算位移量
  //         let delta = {
  //           dx: startSVGPoint.x - moveToSVGPoint.x,
  //           dy: startSVGPoint.y - moveToSVGPoint.y
  //         }
  //         tg = [startViewBox[0] + delta.dx, startViewBox[1] + delta.dy, startViewBox[2], startViewBox[3]]
  //       }
  //       update()
  //     }
  //   },
  //   false
  // )

  // var taiwan = document.querySelector('#taiwan')
  // var tip = document.querySelector('.tip')

  // // 貝茲

  // function svgPathCurv(a, b, curv) {
  //   var x1,
  //     x2,
  //     y1,
  //     y2,
  //     s,
  //     k2,
  //     controX,
  //     controY,
  //     q,
  //     l,
  //     path = ''
  //   let L = {
  //     x1: a.x,
  //     y1: a.y,
  //     x2: b.x,
  //     y2: b.y
  //   }
  //   var s = 'M' + L.x1 + ',' + L.y1 + ' '

  //   k2 = -(L.x2 - L.x1) / (L.y2 - L.y1)
  //   controX = (L.x2 + L.x1) / 2 + curv * 30
  //   controX = controX < 0 ? -controX : controX
  //   controY = k2 * (controX - (L.x1 + L.x2) / 2) + (L.y1 + L.y2) / 2
  //   controY = controY < 0 ? -controY : controY

  //   q = 'Q' + controX + ',' + controY + ' '
  //   //l=lineto
  //   l = L.x2 + ',' + L.y2 + ' '

  //   path = s + q + l
  //   return path
  // }

  // // 地區連線 動態
  // // let Taichung = taiwan.childNodes[1].children[14]
  // // let TaichungClientRect = Taichung.getBoundingClientRect()
  // // let ShanghaiClientRect = document.querySelector('#Shanghai').getBoundingClientRect()
  // // let ClientRectCenter = function(name) {
  // //   this.name = name
  // //   this.left = name.left
  // //   this.right = name.right
  // //   this.coordination = function() {
  // //     let x = this.left + (this.right - this.left) / 2
  // //     let y = this.name.top + (this.name.bottom - this.name.top) / 2
  // //     let Obj = { x, y }
  // //     return Obj
  // //   }
  // // }

  // // let TaichungCenter = new ClientRectCenter(TaichungClientRect).coordination()
  // // let ShanghaiCenter = new ClientRectCenter(ShanghaiClientRect).coordination()

  // // 地區連線 動態 ----------------------------------------------------------------------------------

  // let MapMain = document.querySelector('#mapMain')
  // let TaichungToShanghaiPath = svgPathCurv({ x: 816, y: 142.5 }, { x: 815, y: 165 }, 0.2)
  // let TaichungToPalauPath = svgPathCurv({ x: 815, y: 165 }, { x: 862, y: 207 }, 0.2)

  // let svgPath01 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  // let svgPath02 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  // let pin1 = document.createElementNS('http://www.w3.org/2000/svg', 'image')
  // let pin2 = document.createElementNS('http://www.w3.org/2000/svg', 'image')
  // let pin3 = document.createElementNS('http://www.w3.org/2000/svg', 'image')
  // svgPath01.setAttributeNS(null, 'd', TaichungToShanghaiPath)
  // svgPath02.setAttributeNS(null, 'd', TaichungToPalauPath)
  // svgPath01.setAttributeNS(null, 'class', 'border-primary')
  // svgPath02.setAttributeNS(null, 'class', 'border-primary')
  // pin1.setAttributeNS(null, 'href', 'img/pin.svg')
  // TweenLite.set(pin1, { scale: 0.02, x: 815, y: 140 })

  // pin2.setAttributeNS(null, 'href', 'img/pin.svg')
  // TweenLite.set(pin2, { scale: 0.02, x: 860, y: 205 })

  // pin3.setAttributeNS(null, 'href', 'img/pin.svg')
  // TweenLite.set(pin3, { scale: 0.02, x: 814, y: 162 })

  // MapMain.appendChild(svgPath01)
  // MapMain.appendChild(svgPath02)
  // MapMain.appendChild(pin1)
  // MapMain.appendChild(pin2)
  // MapMain.appendChild(pin3)
  // var tween,
  //   opacity = false,
  //   Taichung2Shanghei = MorphSVGPlugin.pathDataToBezier(svgPath01, {
  //     align: '#airplane'
  //   }),
  //   Taichung2Palau = MorphSVGPlugin.pathDataToBezier(svgPath02, {
  //     align: '#airplane'
  //   })
  // const tl = new TimelineMax({ repeat: -1 })
  // tl.set('#airplane', {
  //   transformOrigin: '50% 50%',
  //   xPercent: 1260,
  //   yPercent: 230
  // })
  // tl.from('#airplane', 2, {
  //   bezier: {
  //     type: 'cubic',
  //     values: Taichung2Shanghei,
  //     autoRotate: ['x', 'y', 'rotation', -60, false]
  //   }
  // })
  // tl.to('#airplane', 2, {
  //   bezier: {
  //     type: 'cubic',
  //     values: Taichung2Shanghei,
  //     autoRotate: ['x', 'y', 'rotation', 120, false]
  //   }
  // })
  // tl.from('#airplane', 2, {
  //   bezier: {
  //     type: 'cubic',
  //     values: Taichung2Palau.reverse(),
  //     autoRotate: ['x', 'y', 'rotation', -60, false]
  //   }
  // })
  // // tl.to('#airplane', 0.1, { autoRotate: true })
  // tl.to('#airplane', 2, {
  //   bezier: {
  //     type: 'cubic',
  //     values: Taichung2Palau,
  //     autoRotate: ['x', 'y', 'rotation', 120, false]
  //   }
  // })

  // // 貝茲 ----------

  // taiwan.addEventListener(
  //   'click',
  //   function(e) {
  //     if (!rID && eventMap) {
  //       nav = eventMap['3']
  //       // 1. 取得一開始的 viewBox 值，原本是字串，拆成陣列，方便之後運算
  //       let taiwanPath = Array.from(document.querySelectorAll('#taiwan path'))
  //       taiwanPath.map(path => {
  //         path.classList.remove('active')
  //       })
  //       e.target.classList.add('active')

  //       let startViewBox = _SVG
  //         .getAttribute('viewBox')
  //         .split(' ')
  //         .map(n => +n)
  //       if (nav.act === 'show') {
  //         tg = [1094.9037475585938, 530.9351196289062, 60, 33.75]
  //       }
  //       update()
  //     }
  //   },
  //   false
  // )

  // taiwan.addEventListener('mouseover', function tipA(e) {
  //   tip.style.display = 'block'
  //   let tipPos = {
  //     x: e.clientX,
  //     y: e.clientY
  //   }
  //   let tipId = e.target.getAttribute('countryid')
  //   switch (tipId) {
  //     case 'TW-TPE':
  //       tip.textContent = '台北市'
  //       break
  //     case 'TW-TPQ':
  //       tip.textContent = '台北縣'
  //       break
  //     case 'TW-KEE':
  //       tip.textContent = '基隆'
  //       break
  //     case 'TW-TAO':
  //       tip.textContent = '桃園'
  //       break
  //     case 'TW-HUA':
  //       tip.textContent = '花蓮'
  //       break
  //     case 'TW-TTT':
  //       tip.textContent = '台東'
  //       break
  //     case 'TW-PIF':
  //       tip.textContent = '屏東'
  //       break
  //     case 'TW-KHQ':
  //       tip.textContent = '高雄'
  //       break
  //     case 'TW-TNQ':
  //       tip.textContent = '台南'
  //       break
  //     case 'TW-CYI':
  //       tip.textContent = '嘉義市'
  //       break
  //     case 'TW-CYQ':
  //       tip.textContent = '嘉義縣'
  //       break
  //     case 'TW-YUN':
  //       tip.textContent = '雲林縣'
  //       break
  //     case 'TW-CHQ':
  //       tip.textContent = '彰化縣'
  //       break
  //     case 'TW-NAN':
  //       tip.textContent = '南投縣'
  //       break
  //     case 'TW-TXQ':
  //       tip.textContent = '台中'
  //       break
  //     case 'TW-MIA':
  //       tip.textContent = '苗栗'
  //       break
  //     case 'TW-HSQ':
  //       tip.textContent = '新竹縣'
  //       break
  //     case 'TW-HSZ':
  //       tip.textContent = '新竹市'
  //       break
  //     case 'TW-PEN':
  //       tip.textContent = '澎湖'
  //       break
  //     case 'TW-ILA':
  //       tip.textContent = '宜蘭'
  //       break
  //   }
  //   tip.setAttribute(`style`, `position:absolute; left:${tipPos.x}px; top:${tipPos.y}px;`)
  // })
  // taiwan.addEventListener('mousemove', function(ev) {
  //   if (ev.target.nodeName !== 'path') return false
  //   var ev = ev || window.event
  //   var ofLeft = document.documentElement.offsetLeft || document.body.offsetLeft
  //   var ofTop = document.documentElement.offsetTop || document.body.offsetTop
  //   var oLeft = ev.clientX + ofLeft
  //   var oTop = ev.clientY + ofTop
  //   tip.style.display = 'block'
  //   tip.style.left = oLeft + 'px'
  //   tip.style.top = oTop + 'px'
  // })
  // taiwan.addEventListener('mouseout', function(ev) {
  //   tip.style.display = 'none'
  // })
  // china.onmousemove = function(ev) {
  //   var ev = ev || window.event
  //   var ofLeft = document.documentElement.offsetLeft || document.body.offsetLeft
  //   var ofTop = document.documentElement.offsetTop || document.body.offsetTop
  //   var oLeft = ev.clientX + ofLeft
  //   var oTop = ev.clientY + ofTop
  //   tip.style.display = 'block'
  //   tip.style.left = oLeft + 'px'
  //   tip.style.top = oTop + 'px'
  // }

  // china.addEventListener('mouseover', function tipA(e) {
  //   let tipPos = {
  //     x: e.clientX,
  //     y: e.clientY
  //   }
  //   let tipId = e.target.getAttribute('aria-label')
  //   tip.textContent = tipId

  //   tip.setAttribute(`style`, `position:absolute; left:${tipPos.x}px; top:${tipPos.y}px;`)
  // })
})()
