// JavaScript IIFE
;(function() {
  let map = function() {
    this.isMousedown = false
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
    this.svgMain = document.querySelector('#mapMain')

    this.stopAni = function() {
      cancelAnimationFrame(rID)
      rID = null
    }

    // 計算貝茲曲線
    this.svgPathCurv = function(a, b, curv) {
      var x1,
        x2,
        y1,
        y2,
        s,
        k2,
        controX,
        controY,
        q,
        l,
        path = ''
      let L = {
        x1: a.x,
        y1: a.y,
        x2: b.x,
        y2: b.y
      }
      var s = 'M' + L.x1 + ',' + L.y1 + ' '

      k2 = -(L.x2 - L.x1) / (L.y2 - L.y1)
      controX = (L.x2 + L.x1) / 2 + curv * 30
      controX = controX < 0 ? -controX : controX
      controY = k2 * (controX - (L.x1 + L.x2) / 2) + (L.y1 + L.y2) / 2
      controY = controY < 0 ? -controY : controY

      q = 'Q' + controX + ',' + controY + ' '
      //l=lineto
      l = L.x2 + ',' + L.y2 + ' '
      path = s + q + l
      return path
    }
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
      if (nav.act === 'mousemove') {
        console.log(tg)
        for (let i = 0; i < 4; i++) {
          cvb[i] = tg[i]
        }
      }
      if (nav.act === 'Home') {
        for (let i = 0; i < 4; i++) {
          cvb[i] = tg[i]
        }
      }
      if (nav.act === 'show') {
        for (let i = 0; i < 4; i++) {
          cvb[i] = tg[i]
        }
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
    this.zoomIn = function(e) {
      if (!rID && eventMap) {
        nav = eventMap['3']
        if (nav.act === 'show') {
          if (this.getAttribute('id') === 'taiwan') {
            tg = [1094.9037475585938, 530.9351196289062, 60, 33.75]
          } else if (this.getAttribute('id') === 'Shanghai') {
            tg = [1099.34375, 499.84375, 60, 33.75]
          } else if (this.getAttribute('id') === 'palau') {
            tg = [1146.765625, 581.84375, 90, 50.625]
          }
        }
        update()
      }
    }
    // 地圖縮放
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
    this.move = function(e) {
      if (!rID && eventMap) {
        nav = eventMap['2']
        if (nav.act === 'mousemove') {
          if (isMousedown === false) return false
          // 1. 取得一開始的 viewBox 值，原本是字串，拆成陣列，方便之後運算
          let startViewBox = this.getAttribute('viewBox')
            .split(' ')
            .map(n => +n)
          //  2. 取得滑鼠當前 viewport 中 client 座標值
          let startClient = {
            x: e.clientX,
            y: e.clientY
          }
          //  3. 計算對應回去的 SVG 座標值
          let newSVGPoint = this.createSVGPoint()
          let CTM = this.getScreenCTM()
          newSVGPoint.x = startClient.x
          newSVGPoint.y = startClient.y
          let startSVGPoint = newSVGPoint.matrixTransform(CTM.inverse())
          //  4. 計算拖曳後滑鼠所在的 viewport client 座標值
          let moveToClient = {
            x: e.clientX + e.movementX, //  movement 可以取得滑鼠位移量
            y: e.clientY + e.movementY
          }
          //  5. 計算對應回去的 SVG 座標值
          newSVGPoint = this.createSVGPoint()
          CTM = this.getScreenCTM()
          newSVGPoint.x = moveToClient.x
          newSVGPoint.y = moveToClient.y
          let moveToSVGPoint = newSVGPoint.matrixTransform(CTM.inverse())
          //  6. 計算位移量
          let delta = {
            dx: startSVGPoint.x - moveToSVGPoint.x,
            dy: startSVGPoint.y - moveToSVGPoint.y
          }
          tg = [startViewBox[0] + delta.dx, startViewBox[1] + delta.dy, startViewBox[2], startViewBox[3]]
        }
        update()
      }
    }
    this.home = function() {
      if (!rID && eventMap) {
        nav = eventMap['1']
        if (nav.act === 'zoom') {
          tg = [1014, 485.75, 240, 135]
        }
      }
      update()
    }
    this.isShowAreaName = function(e) {
      let tip = document.querySelector('.tip'),
        tipPos = {
          x: e.offsetX,
          y: e.offsetY
        },
        tipId = e.target.getAttribute('aria-label')
      tip.textContent = tipId

      if (e.type == 'mousemove') {
        tip.setAttribute(`style`, `position:absolute; left:${tipPos.x}px; top:${tipPos.y}px;display:block`)
        tip.style.display = 'block'
      } else if (e.type == 'mouseout') {
        tip.style.display = 'none'
      }
    }
    this.pin = function(areaPath) {
      let s = document.querySelector('#Shanghai')
      let t = document.querySelector('#taiwan')
      let pin1 = document.createElementNS('http://www.w3.org/2000/svg', 'image')
      let pin2 = document.createElementNS('http://www.w3.org/2000/svg', 'image')
      let pin3 = document.createElementNS('http://www.w3.org/2000/svg', 'image')

      pin1.setAttributeNS(null, 'href', 'img/pin.svg')
      pin2.setAttributeNS(null, 'href', 'img/pin.svg')
      pin3.setAttributeNS(null, 'href', 'img/pin.svg')
      TweenLite.set(pin1, { scale: 0.016, x: 816 - 1, y: 142.5 - 2.44 })
      TweenLite.set(pin2, { scale: 0.016, x: 814 - 1, y: 164 - 2.44 })
      TweenLite.set(pin3, { scale: 0.016, x: 861.5 - 1, y: 207 - 2.44 })

      this.svgMain.appendChild(pin1)
      this.svgMain.appendChild(pin2)
      this.svgMain.appendChild(pin3)

      let TaichungToShanghaiPath = svgPathCurv({ x: 816, y: 142.5 }, { x: 814, y: 164 }, 0.2)
      let TaichungToPalau = svgPathCurv({ x: 814, y: 164 }, { x: 861.5, y: 207 }, 0.2)
      let svgPath01 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      let svgPath02 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      svgPath01.setAttributeNS(null, 'd', TaichungToShanghaiPath)
      svgPath01.setAttributeNS(null, 'class', 'border-primary')
      svgPath02.setAttributeNS(null, 'd', TaichungToPalau)
      svgPath02.setAttributeNS(null, 'class', 'border-primary')

      this.svgMain.appendChild(svgPath01)
      this.svgMain.appendChild(svgPath02)

      var tween,
        opacity = false,
        Taichung2Shanghei = [{ x: 814, y: 138 }, { x: 819, y: 150 }, { x: 818, y: 157 }, { x: 812, y: 164 }],
        Taichung2Palau = [{ x: 874, y: 220 }, { x: 848, y: 180 }, { x: 833, y: 175 }, { x: 814, y: 164 }]

      const tl = new TimelineMax({ repeat: -1 })
      tl.set('#airplane', {
        transformOrigin: '50% 50%',
        xPercent: 1260,
        yPercent: 230
      })
      tl.from('#airplane', 2, {
        bezier: {
          type: 'cubic',
          values: Taichung2Shanghei,
          autoRotate: ['x', 'y', 'rotation', -60, false]
        }
      })
      tl.to('#airplane', 2, {
        bezier: {
          type: 'cubic',
          values: Taichung2Shanghei,
          autoRotate: ['x', 'y', 'rotation', 120, false]
        }
      })
      tl.from('#airplane', 2, {
        bezier: {
          type: 'cubic',
          values: Taichung2Palau,
          autoRotate: ['x', 'y', 'rotation', -60, false]
        }
      })
      // tl.to('#airplane', 0.1, { autoRotate: true })
      tl.to('#airplane', 2, {
        bezier: {
          type: 'cubic',
          values: Taichung2Palau,
          autoRotate: ['x', 'y', 'rotation', 120, false]
        }
      })
    }

    this.svg.addEventListener('wheel', this.zoom, false)
    this.svg.addEventListener('mousemove', this.move, false)
    document.querySelector('#Home').addEventListener('click', this.home, false)
    document.querySelector('#taiwan').addEventListener('mousemove', this.isShowAreaName, false)
    document.querySelector('#taiwan').addEventListener('mouseout', this.isShowAreaName, false)
    document.querySelector('#taiwan').addEventListener('click', this.zoomIn, false)
    document.querySelector('#Shanghai').addEventListener('mousemove', this.isShowAreaName, false)
    document.querySelector('#Shanghai').addEventListener('mouseout', this.isShowAreaName, false)
    document.querySelector('#Shanghai').addEventListener('click', this.zoomIn, false)
    document.querySelector('#palau').addEventListener('mousemove', this.isShowAreaName, false)
    document.querySelector('#palau').addEventListener('mouseout', this.isShowAreaName, false)
    document.querySelector('#palau').addEventListener('click', this.zoomIn, false)

    pin()

    this.svg.addEventListener('mousedown', e => {
      isMousedown = true
    })

    this.svg.addEventListener('mouseup', e => {
      isMousedown = false
    })
  }
  map()
})()
