// Api
const json = {
  Keelung: {
    name: '基隆',
    year: {
      '2017': ['Keelung', '51561616']
    },
    country: 'Taiwan'
  },
  TaipeiArea: {
    name: '台北',
    year: {
      '2012': ['淡江大學', '台北藝術大學'],
      '2013': ['台北科技大學', '台灣大學']
    },
    country: 'Taiwan'
  },
  Taoyuan: {
    name: '桃園',
    year: {
      '2017': ['桃園']
    },
    country: 'Taiwan'
  },
  NewTaipeiCity: {
    name: '新北市',
    year: {
      '2017': ['新北市']
    },
    country: 'Taiwan'
  },

  HsinchuCity: {
    name: '新竹',
    year: {
      '2017': ['新竹']
    },
    country: 'Taiwan'
  },
  Miaoli: {
    name: '苗栗',
    year: {
      '2017': ['苗栗']
    },
    country: 'Taiwan'
  },
  TaichungArea: {
    name: '台中',
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
    },
    country: 'Taiwan'
  },
  Changhua: {
    name: '彰化',
    year: {
      '2017': ['彰化']
    },
    country: 'Taiwan'
  },
  Nantou: {
    name: '南投',
    year: {
      '2017': ['南投']
    },
    country: 'Taiwan'
  },

  Yunlin: {
    name: '雲林',
    year: {
      '2017': ['雲林']
    },
    country: 'Taiwan'
  },
  ChiayiCity: {
    name: '嘉義',
    year: {
      '2017': ['嘉義']
    },
    country: 'Taiwan'
  },
  Tainan: {
    name: '台南',
    year: {
      '2017': ['台南']
    },
    country: 'Taiwan'
  },
  Kaohsiung: {
    name: '高雄',
    year: {
      '2017': ['高雄']
    },
    country: 'Taiwan'
  },
  Pingtung: {
    name: '屏東',
    year: {
      '2017': ['屏東']
    },
    country: 'Taiwan'
  },
  Taitung: {
    name: '台東',
    year: {
      '2017': ['台東']
    },
    country: 'Taiwan'
  },
  Hualien: {
    name: '花蓮',
    year: {
      '2017': ['花蓮縣']
    },
    country: 'Taiwan'
  },
  Ilan: {
    name: '宜蘭',
    year: {
      '2017': ['宜蘭']
    },
    country: 'Taiwan'
  },
  Palau: {
    name: '帛琉',
    year: {
      '2017': ['帛琉HIS系統建置']
    }
  },
  Shanghai: {
    name: '上海',
    year: {
      '2017': ['上海真滿網絡科技有限公司-醫德好APP建置']
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
        x: 814,
        y: 163.5,
        pinScale: 0.01
      },
      Shanghai: {
        x: 816,
        y: 142.5,
        pinScale: 0.01
      },
      Palau: {
        x: 862.2,
        y: 207,
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
    let TaiwanAll = Array.from(document.querySelectorAll('#taiwan path'))
    let $mapMain = document.querySelector('#mapMain')

    // 將 data 地區 render 到 sidebar 連結
    let areaList = document.querySelector('.areaList')
    let items = Object.entries(json)
    let Li = ''
    for (item of items) {
      Li += `<li><a href="#" id="${item[0]}Link">${item[1].name}
      </a></li>`
    }
    areaList.innerHTML = Li

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
    let viewBoxInit = '1021, 484.5683, 227.8125, 137.6367'
    // 取得 svg
    this.svg = document.querySelector('#map')
    // 設定預設值
    this.svg.setAttributeNS(null, 'viewBox', viewBoxInit)
    this.svgViewBox = this.svg
      .getAttribute('viewBox')
      .split(' ')
      .map(c => parseFloat(c))

    // 新增選取地區的效果
    this.addAreaActive = function(areaId) {
      let PalauPath = Array.from(document.querySelectorAll('#palau path'))

      // 點地圖新增地區顏色
      if (areaId === 'Palau') {
        PalauPath.map(palau => {
          palau.classList.add('fill-blue')
        })
      }

      // 點 sidebar 連結新增地區顏色
      let ShagnhaiPath = document.querySelector('#Shanghai')
      TaiwanAll.push(ShagnhaiPath)
      TaiwanAll.forEach(area => {
        if (areaId !== area.getAttribute('countryid')) return
        area.classList.add('fill-blue')
      })
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
    var startx = 0
    var starty = 0
    var dist = 0

    this.aafn = function(e) {
      // 阻止滾動
      if (!rID && eventMap) {
        nav = eventMap['2']
        if (nav.act === 'mousemove') {
          var touchobj = e.changedTouches[0]

          // 1.
          let startViewBox = this.getAttribute('viewBox')
            .split(' ')
            .map(n => parseFloat(n))
          //  2. 取得滑鼠當前 viewport 中 client 座標值
          let startClient = {
            x: touchobj.clientX,
            y: touchobj.clientY
          }
          distx = -(parseInt(startClient.x) - startx) * 0.1
          disty = -(parseInt(startClient.y) - starty) * 0.1
          tg = [startViewBox[0] + distx, startViewBox[1] + disty, startViewBox[2], startViewBox[3]]
          e.preventDefault()
        }
        update()
      }
    }
    this.move = function(e) {
      if (!rID && eventMap) {
        nav = eventMap['2']
        if (nav.act === 'mousemove') {
          if (isMousedown === false) return

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
      // if mousemove outside window
      if (e.which === 0) {
        isMousedown = false
      }
    }
    // 事件二: act:mousemove end ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // 事件三: act:show 地圖縮放
    this.mapFocus = function(e) {
      let areaId = ''
      if (!rID && eventMap) {
        nav = eventMap['3']
        if (nav.act === 'show') {
          if (e.type === 'click') {
            // 點地圖時

            if (e.target.nodeName === 'path') {
              let palauId = ''
              let countryid = this.getAttribute('countryid')

              if (this.getAttribute('id') === 'palau') {
                let palauPath = Array.from(this.childNodes[1].children)
                let palauPathId = palauPath.forEach(path => {
                  palauId = path.getAttribute('countryid')
                })
              }
              if (Object.keys(json).includes(palauId)) {
                areaId = palauId
              }
              if (Object.keys(json).includes(countryid)) {
                areaId = countryid
              }
            }
            // 點 sidebar 連結時
            if (e.target.nodeName === 'A') {
              if (e.target.getAttribute('id').indexOf('Link') === -1) return false
              areaId = e.target.getAttribute('id').replace('Link', '')
            }
            let TaiwanCity = []
            Object.entries(json).forEach(area => {
              if (area[1].country !== 'Taiwan') return
              TaiwanCity.push(area[0])
            })
            if (TaiwanCity.includes(areaId)) {
              tg = [1083.3734, 523.3743, 90, 50.625]
            } else if (areaId === 'Shanghai') {
              tg = [1099.6993, 499.0614, 60, 33.75]
            } else if (areaId === 'Palau') {
              tg = [1173.608830859375, 595.295638671875, 37.96875, 18.984375]
            } else {
              return
            }
            stopAirplaneAnimation()
          }
          update()
        }
      }

      // 印出相關資訊 與 地圖 Focus
      removeAreaActive()
      if (areaId in Coordination || areaId in json) {
        // Cases 展開地區資訊
        areaDOM(areaId)
        let maxYear = Math.max(...Object.keys(json[areaId].year))
        areaBlock(maxYear, areaId)
        addAreaActive(areaId)
      }
      e.preventDefault()
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
    }

    // 側邊欄
    this.sidebar = (function() {
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

        for (item of Object.entries(json)) {
          if (item[0] === areaId) {
            title.textContent = `${item[1].name}案例`
          }
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
    })()
    // ------------------------------------------------------------------------------------
    // 地圖函式 ending
    // ------------------------------------------------------------------------------------

    // 公式函示: 二元貝茲曲線
    this.svgPathCurv = function(a, b, curv, id) {
      let p0 = `M${a[0]},${a[1]}` //起點
      let p1 = `${b[0]},${b[1]}` //終點
      let k = -(b[0] - a[0]) / (b[1] - a[1]) // 中垂線公式
      let bezier = Array(2)

      if (k < 2 && k > -2) {
        bezier[0] = (a[0] + b[0]) / 2 + curv * 30
        bezier[0] = bezier[0] < 0 ? -bezier[0] : bezier[0]
        bezier[1] = k * (bezier[0] - (a[0] + b[0]) / 2) + (a[1] + b[1]) / 2
        bezier[1] = bezier[1] < 0 ? -bezier[1] : bezier[1]
      } else {
        bezier[1] = (a[1] + b[1]) / 2 + curv * 30
        bezier[1] = bezier[1] < 0 ? -bezier[1] : bezier[1]
        bezier[0] = (bezier[1] - (a[1] + b[1]) / 2) / k + (a[0] + b[0]) / 2
        bezier[0] = bezier[0] < 0 ? -bezier[0] : bezier[0]
      }
      let q = 'Q' + bezier[0] + ',' + bezier[1] + ' '

      // 建立新的 path Element 元素
      let d = `${p0} ${q} ${p1}`
      let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      // 新增 path Attribute 屬性
      path.setAttributeNS(null, 'd', `${d}`)
      path.setAttributeNS(null, 'id', id)
      path.setAttributeNS(null, 'style', 'fill:none;stroke:#aaaaaa')
      // 將 path 傳入 svg
      svg.appendChild(path)
      return path
    }
    let airplanePath01 = new svgPathCurv([Coordination.TaichungArea.x, Coordination.TaichungArea.y], [Coordination.Shanghai.x, Coordination.Shanghai.y], 0.2, 'airplanePath01')
    let airplanePath02 = new svgPathCurv([Coordination.TaichungArea.x, Coordination.TaichungArea.y], [Coordination.Palau.x, Coordination.Palau.y], 0.5, 'airplanePath02')
    // ------------------------------------------------------------------------------------
    // 飛機沿路徑動畫 + pin
    // ------------------------------------------------------------------------------------
    // 造飛機
    let airplane = document.createElementNS('http://www.w3.org/2000/svg', 'image')
    airplane.setAttributeNS(null, 'href', 'img/airplane.svg')
    airplane.setAttributeNS(null, 'style', 'width:2px')
    airplane.setAttributeNS(null, 'id', 'airplane')
    // 宣告飛機路徑
    this.airplanePathGroup
    // true 加入飛機動畫 , false 關閉動畫
    this.isMousedown = false
    this.pin = function() {
      let s = document.querySelector('#Shanghai')
      let t = document.querySelector('#taiwan')
      let pin1 = document.createElementNS('http://www.w3.org/2000/svg', 'image')
      let pin2 = document.createElementNS('http://www.w3.org/2000/svg', 'image')
      let pin3 = document.createElementNS('http://www.w3.org/2000/svg', 'image')
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
      TweenLite.set(pin1, {
        scale: Coordination.Shanghai.pinScale,
        x: Coordination.Shanghai.x - 23.46 * 0.027,
        y: Coordination.Shanghai.y - 26.4 * 0.055
      })
      TweenLite.set(pin2, {
        scale: Coordination.TaichungArea.pinScale,
        x: Coordination.TaichungArea.x - 23.46 * 0.01 * 2.7,
        y: Coordination.TaichungArea.y - 26.4 * 0.01 * 5.5
      })
      TweenLite.set(pin3, {
        scale: Coordination.Palau.pinScale,
        x: Coordination.Palau.x - 23.46 * 0.01 * 2.7,
        y: Coordination.Palau.y - 26.4 * 0.01 * 5.5
      })

      // 將物件置入 group
      airplanePathGroup.appendChild(airplanePath01)
      airplanePathGroup.appendChild(airplanePath02)
      airplanePathGroup.appendChild(pin1)
      airplanePathGroup.appendChild(pin2)
      airplanePathGroup.appendChild(pin3)
      airplanePathGroup.appendChild(airplane)
      // 將 group 置入 svg
      $mapMain.appendChild(airplanePathGroup)

      motionAirplanePath01 = MorphSVGPlugin.pathDataToBezier(airplanePath01, { align: '#airplane' })
      motionAirplanePath02 = MorphSVGPlugin.pathDataToBezier(airplanePath02, { align: '#airplane' })
      let tl = new TimelineMax({ repeat: -1, useFrames: false })
      let i = 0
      tl.set('#airplane', { xPercent: -50, yPercent: -50, transformOrigin: 'center center' })
      tl.from('#airplane', 2, {
        bezier: {
          type: 'cubic',
          values: motionAirplanePath01.reverse(),
          autoRotate: ['x', 'y', 'rotation', -90, false]
        }
      })
      tl.to('#airplane', 2, {
        bezier: {
          type: 'cubic',
          values: motionAirplanePath01,
          autoRotate: ['x', 'y', 'rotation', 90, false]
        }
      })
      tl.from('#airplane', 2, {
        bezier: {
          type: 'cubic',
          values: motionAirplanePath02.reverse(),
          autoRotate: ['x', 'y', 'rotation', -90, false]
        }
      })
      tl.to('#airplane', 2, {
        bezier: {
          type: 'cubic',
          values: motionAirplanePath02,
          autoRotate: ['x', 'y', 'rotation', 90, false]
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

    this.svg.addEventListener(
      'touchstart',
      function(evt) {
        var touchobj = evt.changedTouches[0]
        startx = parseInt(touchobj.clientX)
        starty = parseInt(touchobj.clientY)
        this.addEventListener('touchmove', aafn, true)
        // this.addEventListener('touchend', function() {
        //   if (dragging) return
        // })
      },
      false
    )

    // 關閉 sidebar 事件
    $closeCases.addEventListener('click', this.closeSidebar, false)

    // 重新定位事件
    document.querySelector('#Home').addEventListener('click', this.reset, false)

    // 台灣事件
    TaiwanAll.forEach(taiwan => {
      taiwan.addEventListener('click', mapFocus, false)
    })

    document.querySelector('#taiwan').addEventListener('mousemove', this.isShowAreaName, false)
    document.querySelector('#taiwan').addEventListener('mouseout', this.isShowAreaName, false)

    // // 上海事件
    document.querySelector('#Shanghai').addEventListener('mousemove', this.isShowAreaName, false)
    document.querySelector('#Shanghai').addEventListener('mouseout', this.isShowAreaName, false)
    document.querySelector('#Shanghai').addEventListener('click', mapFocus, false)

    // // 帛琉事件
    document.querySelector('#palau').addEventListener('mousemove', this.isShowAreaName, false)
    document.querySelector('#palau').addEventListener('mouseout', this.isShowAreaName, false)
    document.querySelector('#palau').addEventListener('click', mapFocus, false)

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
    let taichungLink = Array.from(document.querySelectorAll('.areaList li a'))
    taichungLink.forEach(a => {
      a.addEventListener('click', mapFocus, false)
    })
  }
  map()
  // 執行動畫
  pin()
})
