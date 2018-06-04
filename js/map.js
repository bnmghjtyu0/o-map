// Api
const json = {
  Palau: {
    year: {
      '2020': ['PalauA', 'PalauB'],
      '2021': ['PalauC', 'PalauD']
    }
  },
  Shanghai: {
    year: {
      '2020': ['ShanghaiA', 'ShanghaiB'],
      '2021': ['ShanghaiC', 'ShanghaiD']
    }
  },
  TaipeiArea: {
    year: {
      '2012': ['淡江大學', '台北藝術大學'],
      '2013': ['台北科技大學', '台灣大學']
    }
  },
  TaichungArea: {
    year: {
      '2013': ['2017A', '2017B'],
      '2014': ['2017A', '2017B'],
      '2015': ['2017A', '2017B'],
      '2016': ['2017A', '2017B'],
      '2017': ['2017A', '2017B'],
      '2018': [
        '大臺中勞工行政管理資訊系統維護',
        '中彰投區勞動力發展策略聯盟資訊平台網站維運案',
        '國立臺中科技大學_106年國中小代理代課教師暨幼兒園教保服務人員人才庫平臺客服及管理維運',
        '勞動部勞動力發展署中彰投分署「106年學員輔導管理資訊系統功能擴充暨維護」採購案',
        '晶鑽時尚診所管理系統建置',
        '勤美天地會員電子化服務開發案',
        '綠道睿峰軟件開發案',
        '臺中市車輛行車事故鑑定及覆議作業系統維護-裁決處',
        '臺中市政府資訊中心_人民陳情管理系統維護與改版建置案',
        '臺中市政府衛生局_「建構臺中市緊急醫療救護作業系統」資訊服務採購案',
        '臺中市政府衛生局_臺中市食品藥物稽查資訊系統採購案',
        '臺中市政府環境保護局_檢警環查緝環保犯罪通報系統改版增修案',
        '臺中市政府環境保護局全球資訊網及局內網維護',
        '臺中榮民總醫院_「全球資訊網站改版及網站管理平台」建置案',
        '臺中榮民總醫院_「多功能互動式自助服務站」壹年期單價合約',
        '臺中榮民總醫院_整合高齡病房床邊照護暨資通訊整合應用系統採購案',
        '衛生福利部食品藥物管理署_106年度「GDP廠商線上申請系統建置案」',
        '機車排氣稽查與定檢站管理計畫'
      ]
    }
  }
}
;(function(global, factory) {
  'use strict'

  // export as AMD...
  if (typeof define !== 'undefined' && define.amd) {
    define('canvgModule', ['rgbcolor', 'stackblur'], factory)
  }
  // ...or as browserify
  else if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(require('rgbcolor'), require('stackblur'))
  }

  global.canvg = factory(global.RGBColor, global.stackBlur)
})(typeof window !== 'undefined' ? window : this, function(RGBColor, stackBlur) {
  // ------------------------------------------------------------------------------------
  // 地圖函式 start
  // ------------------------------------------------------------------------------------
  let map = function() {
    // 飛機路線的座標
    let Coordination = {
      TaichungArea: {
        x: 813.5,
        y: 162.5,
        pinScale: 0.01
      },
      Shanghai: {
        x: 815.5,
        y: 141,
        pinScale: 0.01
      },
      Palau: {
        x: 861,
        y: 206,
        pinScale: 0.01
      }
    }

    // map DOM 宣告
    let $Cases = document.querySelector('.mapSidebar')
    let $map = document.querySelector('.map')
    let $Home = document.querySelector('#Home')
    let $zoomIn = document.querySelector('#zoom-in')
    let $zoomOut = document.querySelector('#zoom-out')
    let $mapMenu = document.querySelector('#mapMenu')
    let $closeCases = document.querySelector('.closeCase')

    // 宣告飛機路徑
    this.airplanePathGroup
    // true 加入飛機動畫 , false 關閉動畫
    this.isMousedown = false

    // 地圖的四個事件
    this.eventMap = {
      1: { act: 'zoom' },
      2: { act: 'mousemove' },
      3: { act: 'show' },
      4: { act: 'reset' }
    }

    // 地圖 init 設定
    let NF = 16
    let nav = null
    let tg = Array(4)
    let rID = null
    let f = 0
    let viewBoxInit = '991.4718017578125, 502.11767578125, 303.75, 183.515625'
    // let viewBoxInit = '1042.0965576171875, 496.01556396484375, 202.5, 122.34375'
    // 取得 svg
    this.svg = document.querySelector('#map')
    // 設定預設值
    this.svg.setAttributeNS(null, 'viewBox', viewBoxInit)
    this.svgViewBox = this.svg
      .getAttribute('viewBox')
      .split(' ')
      .map(c => parseFloat(c))
    this.svgMain = document.querySelector('#mapMain')

    // 新增選取地區的效果
    this.addAreaActive = function(e) {
      if (e.target.getAttribute('countryid') === 'Palau') {
        Array.from(e.target.parentNode.querySelectorAll('path')).map(palau => {
          palau.classList.add('fill-blue')
        })
      }
      e.target.classList.add('fill-blue')
      openSidebar()
    }
    // 移除選取地區的效果
    this.removeAreaActive = function() {
      Array.from(document.querySelectorAll('#mapMain [d]')).map(x => {
        x.classList.remove('fill-blue')
      })
      closeSidebar()
    }
    // 新增選取地區的效果
    this.openSidebar = function() {
      $Cases.style.left = '0'
    }
    // 關閉側邊欄
    this.closeSidebar = function() {
      $Cases.style.left = '-600px'
    }

    // 停止 requestAnimationFrame
    this.stopAnimationFrame = function() {
      cancelAnimationFrame(rID)
      rID = null
    }

    // 停止 飛機動畫
    this.stopAirplaneAnimation = function() {
      airplanePathGroup.style.display = 'none'
      document.querySelector('#airplane').style.display = 'none'
    }

    // 公式函示: 二元貝茲曲線
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

    // 地圖渲染與更新
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
        for (let i = 0; i < 4; i++) {
          cvb[i] = tg[i]
        }
      }
      if (nav.act === 'reset') {
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
        stopAnimationFrame()
      }
    }

    // 事件一: act:zoom 地圖縮放
    this.zoom = function(e) {
      if (!rID && eventMap) {
        nav = eventMap['1']
        if (nav.act === 'zoom') {
          let newSVGPoint = svg.createSVGPoint() //新增一個 svg point
          let CTM = svg.getScreenCTM() //新增 CTM
          let r //新增縮放倍率

          const dir = e.wheelDeltaY / 120 // dir = 滾輪上下滾動
          // 滑鼠目前位置為中心縮放
          const startClient = {
            x: (newSVGPoint.x = e.clientX),
            y: (newSVGPoint.y = e.clientY)
          }
          const startSVGPoint = {
            x: newSVGPoint.matrixTransform(CTM.inverse()).x,
            y: newSVGPoint.matrixTransform(CTM.inverse()).y
          }
          let b1 = svg.createSVGPoint()
          let b1CTM = svg.getScreenCTM()
          b1.x = svg.getBoundingClientRect().width / 2
          b1.y = svg.getBoundingClientRect().height / 2
          const b1Point = b1.matrixTransform(b1CTM.inverse())

          // 縮放倍率
          // 宣告結束 ============================================================================

          if (dir > 0 || this.getAttribute('id') === 'zoom-in') {
            r = 0.5
          } else if (dir < 0 || this.getAttribute('id') === 'zoom-out') {
            r = 1.5
          } else {
            r = 1
          }
          svg.setAttribute('viewBox', `${svgViewBox[0]} ${svgViewBox[1]} ${svgViewBox[2] * r} ${svgViewBox[3] * r}`)

          b2CTM = svg.getScreenCTM()
          let b2Point = b1.matrixTransform(b2CTM.inverse())

          // 以滑鼠為中心點縮放
          // 重新取得 viewBox 值  = moveToSVGPoint

          CTM = svg.getScreenCTM()
          let moveToSVGPoint = newSVGPoint.matrixTransform(CTM.inverse())
          let delta
          if (this.getAttribute('id') === 'zoom-out' || this.getAttribute('id') === 'zoom-in') {
            delta = {
              dx: b1Point.x - b2Point.x,
              dy: b1Point.y - b2Point.y
            }
          } else {
            delta = {
              dx: startSVGPoint.x - moveToSVGPoint.x,
              dy: startSVGPoint.y - moveToSVGPoint.y
            }
          }
          //  6.設定最終的 viewBox2
          let middleViewBox = svg
            .getAttribute('viewBox')
            .split(' ')
            .map(n => parseFloat(n))
          let moveBackViewBox = `${middleViewBox[0] + delta.dx} ${middleViewBox[1] + delta.dy} ${middleViewBox[2]} ${middleViewBox[3]}`
          tg = moveBackViewBox.split(' ')
        }
        update()
      }
    }
    // 事件一: act:zoom end ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // 事件二: act:mousemove 拖曳地圖
    this.move = function(e) {
      if (!rID && eventMap) {
        nav = eventMap['2']
        if (nav.act === 'mousemove') {
          if (isMousedown === false) return false
          // 1. 取得一開始的 viewBox 值，原本是字串，拆成陣列，方便之後運算
          let startViewBox = this.getAttribute('viewBox')
            .split(' ')
            .map(n => parseFloat(n))
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
    // 事件二: act:mousemove end ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // 事件三: act:show 地圖縮放
    this.mapFocus = function(e) {
      e.preventDefault()
      if (!rID && eventMap) {
        nav = eventMap['3']
        if (nav.act === 'show') {
          if (this.getAttribute('id') === 'taiwan' || this.getAttribute('countryid') === 'TaichungArea') {
            tg = [1083, 519, 90, 50.625]
          } else if (this.getAttribute('id') === 'Shanghai' || this.getAttribute('countryid') === 'Shanghai') {
            tg = [1099.34375, 499.84375, 60, 33.75]
          } else if (this.getAttribute('id') === 'Palau' || this.getAttribute('countryid') === 'Palau') {
            tg = [1146.765625, 581.84375, 90, 50.625]
          }
          stopAirplaneAnimation()
        }
        update()
      }

      // areaId
      let areaId = e.target.getAttribute('countryid')

      // 取得點擊地區的座標
      if (e.type === 'click') {
        removeAreaActive()
        if (areaId in Coordination || areaId in json) {
          // Cases 展開地區資訊
          areaDOM(areaId)
          let maxYear = Math.max(...Object.keys(json[areaId].year))
          areaBlock(maxYear, areaId)
          addAreaActive(e)
        }
      }
    }
    // 事件三: act:show end ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // 事件四: act:reset 重置地圖位置與動畫
    this.reset = function() {
      if (!rID && eventMap) {
        nav = eventMap['4']
        if (nav.act === 'reset') {
          tg = viewBoxInit.split(' ').map(c => parseFloat(c))
          airplanePathGroup.style.display = 'block'
          document.querySelector('#airplane').style.display = 'block'
        }
      }
      update()
      removeAreaActive()
    }
    // 事件四: act:reset end ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // mousemove時 出現地區名稱
    this.isShowAreaName = function(e) {
      let tip = document.querySelector('.tip'),
        { offsetX: x, offsetY: y } = e,
        tipId = e.target.getAttribute('aria-label')

      tip.textContent = tipId

      if (e.type == 'mousemove') {
        tip.setAttribute(`style`, `position:absolute; left:${x}px; top:${y}px;display:block`)
        tip.style.display = 'block'
      } else if (e.type == 'mouseout') {
        tip.style.display = 'none'
      }
      sidebar()
    }

    // 側邊欄
    this.sidebar = function() {
      this.areaDOM = function(areaId) {
        let newCategory
        let areaInfo = document.querySelector('#areaInfo')
        areaInfo.innerHTML = ''
        // 建立模板
        newCategory = `
  <h4 class="title"></h4>
  <ul id="tabs" class="tabs scrollbar overflow-x"></ul>
  <ul id="areaBlock" class="text-white scrollbar overflow-y" style="max-height:450px"></ul>
  `
        // 將模板傳回 dom
        areaInfo.insertAdjacentHTML('beforeend', newCategory)
        // api 地區英文轉中文，輸出標題 .title
        var title = document.querySelector('.title')
        switch (areaId) {
          case 'Palau':
            title.textContent = '帛琉案例'
            break
          case 'Shanghai':
            title.textContent = '上海案例'
            break
          case 'TaichungArea':
            title.textContent = '台中案例'
            break
          case 'TaipeiArea':
            title.textContent = '台北案例'
            break
          default:
            title.textContent = null
        }
        // tabs 加入地區的年份
        let year, tabs, yearLi
        tabs = document.querySelector('#tabs')
        year = Object.keys(json[areaId].year)
        year.sort((a, b) => b - a)
        yearLi = ''
        for (let i = 0, len = year.length; i < len; i++) {
          yearLi += `<li><a href="#" id="${year[i]}">${year[i]}</a></li>`
        }
        tabs.innerHTML = yearLi
        let li = Array.from(document.querySelectorAll('#tabs li a'))
        // 點擊年份切換資訊
        li.forEach(link => {
          link.addEventListener('click', function(e) {
            li.forEach(x => {
              e.preventDefault()
              x.classList.remove('active')
            })
            e.target.classList.add('active')
            areaBlock(link.textContent, areaId)
            // get dom id=year2018 回傳到 year()
          })
        })
      }

      this.areaBlock = function(num, areaId) {
        var ul, li, str, year
        ul = document.querySelector(`#areaBlock`)
        ul.innerHTML = ''
        li = document.createElement('li')
        str = ''
        year = json[areaId].year[num]
        year.forEach(x => {
          str += `<li>${x}</li>`
        })
        ul.innerHTML = str
      }
    }
    // ------------------------------------------------------------------------------------
    // 地圖函式 ending
    // ------------------------------------------------------------------------------------

    // ------------------------------------------------------------------------------------
    // 飛機沿路徑動畫 + pin
    // ------------------------------------------------------------------------------------
    this.pin = function() {
      let s = document.querySelector('#Shanghai')
      let t = document.querySelector('#taiwan')
      let pin1 = document.createElementNS('http://www.w3.org/2000/svg', 'image')
      let pin2 = document.createElementNS('http://www.w3.org/2000/svg', 'image')
      let pin3 = document.createElementNS('http://www.w3.org/2000/svg', 'image')
      let svgPath01 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      let svgPath02 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      airplanePathGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
      airplanePathGroup.setAttributeNS(null, 'id', 'airplanePathGroup')
      // 圖標
      pin1.setAttributeNS(null, 'href', 'img/pin.svg')
      pin2.setAttributeNS(null, 'href', 'img/pin.svg')
      pin3.setAttributeNS(null, 'href', 'img/pin.svg')
      pin1.classList.add('removePointEvent')
      pin2.classList.add('removePointEvent')
      pin3.classList.add('removePointEvent')

      // 圖標位置與大小
      TweenLite.set(pin1, { scale: Coordination.Shanghai.pinScale, x: Coordination.Shanghai.x, y: Coordination.Shanghai.y })
      TweenLite.set(pin2, { scale: Coordination.TaichungArea.pinScale, x: Coordination.TaichungArea.x, y: Coordination.TaichungArea.y })
      TweenLite.set(pin3, { scale: Coordination.Palau.pinScale, x: Coordination.Palau.x, y: Coordination.Palau.y })

      // 繪製二元貝茲曲線圖
      let TaichungToShanghaiPath = svgPathCurv(
        { x: Coordination.TaichungArea.x + 0.65, y: Coordination.TaichungArea.y + 1.4 },
        { x: Coordination.Shanghai.x + 0.65, y: Coordination.Shanghai.y + 1.4 },
        0.2
      )
      let TaichungToPalau = svgPathCurv(
        { x: Coordination.TaichungArea.x + 0.65, y: Coordination.TaichungArea.y + 1.4 },
        { x: Coordination.Palau.x + 0.65, y: Coordination.Palau.y + 0.4 },
        0.6
      )
      svgPath01.setAttributeNS(null, 'd', TaichungToShanghaiPath)
      svgPath01.setAttributeNS(null, 'class', 'border-primary')
      svgPath02.setAttributeNS(null, 'd', TaichungToPalau)
      svgPath02.setAttributeNS(null, 'class', 'border-primary')
      svgPath01.classList.add('removePointEvent')
      svgPath02.classList.add('removePointEvent')

      // 將物件置入 group
      airplanePathGroup.appendChild(svgPath01)
      airplanePathGroup.appendChild(svgPath02)
      airplanePathGroup.appendChild(pin1)
      airplanePathGroup.appendChild(pin2)
      airplanePathGroup.appendChild(pin3)
      // 將 group 置入 svg
      this.svgMain.appendChild(airplanePathGroup)
      motionPath = MorphSVGPlugin.pathDataToBezier(svgPath01, { align: '#paperAirplane' })
      var tween,
        opacity = false,
        Taichung2Shanghei = [
          { x: Coordination.Shanghai.x, y: Coordination.Shanghai.y - 4 },
          { x: 819, y: 150 },
          { x: 818, y: 157 },
          { x: Coordination.TaichungArea.x, y: Coordination.TaichungArea.y }
        ],
        Taichung2Palau = [{ x: 876, y: 220 }, { x: 866, y: 170 }, { x: 853, y: 170 }, { x: Coordination.TaichungArea.x + 4, y: Coordination.TaichungArea.y + 1 }]

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

    // svg事件
    this.svg.addEventListener('wheel', this.zoom, false)
    this.svg.addEventListener('mousemove', this.move, false)
    this.svg.addEventListener('mousedown', e => {
      isMousedown = true
    })
    this.svg.addEventListener('mouseup', e => {
      isMousedown = false
    })

    // 關閉 sidebar 事件
    $closeCases.addEventListener('click', this.closeSidebar, false)

    // 重新定位事件
    document.querySelector('#Home').addEventListener('click', this.reset, false)

    // 台灣事件
    document.querySelector('#taiwan').addEventListener('mousemove', this.isShowAreaName, false)
    document.querySelector('#taiwan').addEventListener('mouseout', this.isShowAreaName, false)
    document.querySelector('#taiwan').addEventListener('click', this.mapFocus, false)

    // 上海事件
    document.querySelector('#Shanghai').addEventListener('mousemove', this.isShowAreaName, false)
    document.querySelector('#Shanghai').addEventListener('mouseout', this.isShowAreaName, false)
    document.querySelector('#Shanghai').addEventListener('click', this.mapFocus, false)

    // 帛琉事件
    document.querySelector('#palau').addEventListener('mousemove', this.isShowAreaName, false)
    document.querySelector('#palau').addEventListener('mouseout', this.isShowAreaName, false)
    document.querySelector('#palau').addEventListener('click', this.mapFocus, false)

    // 按鈕縮放事件
    $zoomOut.addEventListener('click', zoom, false)
    $zoomIn.addEventListener('click', zoom, false)

    // 打開 sidebar hamburger
    $mapMenu.addEventListener(
      'click',
      function(e) {
        e.preventDefault()
        openSidebar()
      },
      false
    )
    let areaList = Array.from(document.querySelectorAll('.areaList li a'))
    areaList.map(a => {
      a.addEventListener('click', mapFocus, false)
    })
  }
  map()
  // 執行動畫
  pin()
})
