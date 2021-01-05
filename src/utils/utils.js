import QrCodeWithLogo from 'qrcode-with-logos'
import $ from 'jquery'
import { l } from './helpers'

export default class Utils {
  constructor($q, $state, $filter, $rootScope, $timeout, ENV){
    // l($q, $filter, $rootScope)
    this.$q = $q
    this.$filter = $filter
    this.$rootScope = $rootScope
    this.$timeout = $timeout
    this.$state = $state

    const envObj = ENV[ENV.CURR]
    this.FE_URL  = envObj.FE_URL
    this.IMG_URL = envObj.IMG_URL
    this.API_URL = envObj.API_URL

    this.menus = [
      {
        title: 'Allge.',
        img: 'assets/coffee.png',
        qrLogo: 'assets/qr-logo.png',
        qrLogoFile: '',
        fields: [
          {
            id:0,
            name: { p: 'AMERICANO', v: '' },
            price: { p: '2,99', v: '' },
          },
          {
            id:1,
            name: { p: 'CAPPUCCINO', v: '' },
            price: { p: '2,99', v: '' },
          },
          {
            id:2,
            name: { p: 'LATTE', v: '' },
            price: { p: '2,99', v: '' },
          },
          {
            id:3,
            name: { p: 'MOCHA', v: '' },
            price: { p: '2,99', v: '' },
          },
          {
            id:4,
            name: { p: 'ESPRESSO', v: '' },
            price: { p: '2,99', v: '' },
          },
          {
            id:5,
            name: { p: 'TEA', v: '' },
            price: { p: '2,99', v: '' },
          },
          {
            id:6,
            name: { p: 'HERBAL TEA', v: '' },
            price: { p: '2,99', v: '' },
          },
          {
            id:7,
            name: { p: 'WATER', v: '' },
            price: { p: '2,99', v: '' },
          },
          {
            id:8,
            name: { p: 'SCONE WITH HAM & CHEESE', v: '' },
            price: { p: '2,99', v: '' },
          },
          {
            id:9,
            name: { p: 'AMERICANO WITH HAM, BUTTER & CHEESE', v: '' },
            price: { p: '2,99', v: '' },
          },
          {
            id:10,
            name: { p: 'AMERICANO WITH HAM,BUTTER & CHEESE', v: '' },
            price: { p: '2,99', v: '' },
          },
        ],
        titles: [
          { id:0, v: 'COFFEE MENU' },
          { id:1, v: 'OFFERS' },
        ],
        pages: [],
        state: 'allgemein',
        activePage: 0
      },
      {
        title: 'Sushi',
        img: 'assets/sushi.png',
        qrLogo: '',
        qrLogoFile: '',
        fields: [
          {
            id:0,
            pos: { top: 360, left: 40 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:1,
            pos: { top: 415, left: 40 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:2,
            pos: { top: 465, left: 40 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:3,
            pos: { top: 330, left: 490 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:4,
            pos: { top: 385, left: 490 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:5,
            pos: { top: 650, left: 40 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:6,
            pos: { top: 705, left: 40 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:7,
            pos: { top: 760, left: 40 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:8,
            pos: { top: 815, left: 40 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:9,
            pos: { top: 605, left: 270 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:10,
            pos: { top: 745, left: 470 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:11,
            pos: { top: 800, left: 470 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          }
        ],
        titles: [
          { id:0, v: 'JAPANESE\nMENU', main: true, left: 53, top: 130 },
          { id:1, v: 'maki', left: 40, top: 290 },
          { id:3, v: '  gyoza', left: 40, top: 540 },
          { id:4, v: 'nigiri', left: 505, top: 245 },
          { id:5, v: 'sushi set', left: 265, top: 540 },
          { id:6, v: 'ramen', left: 485, top: 670 },
        ],
        pages: [],
        state: 'sushi',
        activePage: 0
      },
      {
        title: 'Pizza',
        img: 'assets/pizza.png',
        qrLogo: '',
        qrLogoFile: '',
        fields: [
          {
            id: 0,
            pos: { top: 240, left: 55 },
            name: { p: 'FETTUCINE', v: '' },
            desc: { p: 'EXERCITATION DOLOR AON', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id: 1,
            pos: { top: 300, left: 55 },
            name: { p: 'TAGLIOLINI', v: '' },
            desc: { p: 'EXERCITATION DOLOR AUTE AON', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id: 2,
            pos: { top: 360, left: 55 },
            name: { p: 'CARBONARA', v: '' },
            desc: { p: 'EXERCITATION DOLOR AON', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id: 3,
            pos: { top: 580, left: 55 },
            name: { p: 'RAVIOLI', v: '' },
            desc: { p: 'EXERCITATION DOLOR AUTE AON', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id: 4,
            pos: { top: 640, left: 55 },
            name: { p: 'PUMPKIN', v: '' },
            desc: { p: 'EXERCITATION DOLOR AON', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id: 5,
            pos: { top: 700, left: 55 },
            name: { p: 'MINNESTRONI', v: '' },
            desc: { p: 'EXERCITATION DOLOR AUTE AON', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id: 6,
            pos: { top: 460, left: 570 },
            name: { p: 'MARGARITA', v: '' },
            desc: { p: 'EXERCITATION DOLOR AON', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id: 7,
            pos: { top: 520, left: 570 },
            name: { p: 'PEPPERONI', v: '' },
            desc: { p: 'EXERCITATION DOLOR AUTE AON', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id: 8,
            pos: { top: 580, left: 570 },
            name: { p: 'VEGETARIAN', v: '' },
            desc: { p: 'EXERCITATION DOLOR AUTE AON', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id: 9,
            pos: { top: 640, left: 570 },
            name: { p: 'TONNO', v: '' },
            desc: { p: 'EXERCITATION DOLOR AON', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id: 10,
            pos: { top: 700, left: 570 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'EXERCITATION DOLOR AUTE AON', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id: 11,
            pos: { top: 540, left: 900 },
            name: { p: 'TIRAMISU', v: '' },
            desc: { p: 'EXERCITATION DOLOR AUTE AON', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id: 12,
            pos: { top: 600, left: 900 },
            name: { p: 'CANNOLI', v: '' },
            desc: { p: 'EXERCITATION DOLOR AUTE AON', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id: 13,
            pos: { top: 660, left: 900 },
            name: { p: 'PANNACOTTA', v: '' },
            desc: { p: 'EXERCITATION DOLOR AUTE AON', v: '' },
            price: { p: 'X,XX', v: '' },
          },
        ],
        titles: [
          { id:0, v: 'Italian Menu', main: true, left: 640, top: 70 },
          { id:1, v: 'Pasta', left: 30, top: 110 },
          { id:3, v: 'Pizza', left: 30, top: 440 },
          { id:4, v: 'Pizza', left: 550, top: 375 },
          { id:5, v: 'Desserts', left: 870, top: 400 },
        ],
        pages: [],
        state: 'pizza',
        activePage: 0
      },
    ]
    this.qrObj = {}
  }
  isMobile(){
    if(    navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
        || window.innerWidth <= 768
      ){
      return true
    }
    else {
      return false
    }
  }
  fl(fil, arr, condition){
    return this.$filter(fil)(arr, condition)
  }
  generateId(length){
    let chars = 'M30Z1xA0Nu5Pn8Yo2pXqB5Rly9Gz3vWOj1Hm46IeCfgSrTs7Q9aJb8F6DcE7d2twkUhKiL4V'
    , charLength = chars.length
    , randomStr = ''
    for (let i = 0; i < length; i++) {
      randomStr+= chars[Math.floor(Math.random() * (charLength - 1)) + 0]
    }
    return randomStr
  }
  createLink(state){
    const id = this.generateId(6)
    return {
      id,
      editLink:`${this.FE_URL}${state}/${id}`,
      viewLink:`${this.IMG_URL}view/${state}/${id}`
    }
  }
  focus(dir, focusedEl, menu){
    // l(dir, focusedEl, menu)
    const { $timeout, $rootScope } = this
    , fieldData = {}

    // 1. check if any field has focus already
    if(!focusedEl){
      // 2. if no, identify first field and focus
      fieldData.page  = menu.activePage
      fieldData.field = menu.pages[menu.activePage].fields[0].id
    } else {
      // 3. if yes, identify next field and focus
      const currPage = menu.pages[menu.activePage]
      let fieldIdx = currPage.fields.findIndex(gr => gr.id === focusedEl.field)

      // l(fieldIdx)
      switch(dir){
        case 'prev':
          if(fieldIdx === 0){ fieldIdx = currPage.fields.length - 1 }
          else { fieldIdx-- }
        break;

        default:
          if(fieldIdx === currPage.fields.length - 1){ fieldIdx = 0 }
          else { fieldIdx++ }
        break;
      }
      fieldData.page  = focusedEl.page
      fieldData.field = fieldIdx
    }

    $timeout($rootScope.$broadcast('focusOn', fieldData))
  }
  zoom(level, dir){
    switch(dir){
      case '+': if(level !== 1.5) level += .1; break;
      default: if(level !== .5) level -= .1; break;
    }

    return level
  }
  getFilledFields(pages){
    let filled = 0
    pages.forEach(page => {
      page.fields.forEach(obj => {
        if(!angular.isUndefined(obj.name.v) && obj.name.v !== '')
          filled++
      })
    })
    return filled
  }
  createQRCode(src, content){
    l("generating new QRCode")
    this.qrObj = new QrCodeWithLogo({
      content, width: 380,
      image: $("#ctn-qr")[0],
      logo: { src: src === ''?'assets/qr-logo.png':src }
    })
  }
  post(url, data, files){
    const { $q, $rootScope } = this
    this.def = $q.defer()

    const failed = e => l("There was an error attempting to send data.", e)
    , canceled = e => l("The upload has been canceled by the user or the browser dropped the connection.", e)
    , progress = evt => {
      if(evt.lengthComputable){
        $rootScope.$broadcast("progress", Math.round(evt.loaded * 100 / evt.total))
      }else{
        $rootScope.$broadcast("progress", 0)
      }
    }
    , done = evt =>{
      try{
        const res = JSON.parse(evt.target.response)
        this.def.resolve(res)
      }catch(err){
        l(evt.target.response)
      }
    }

    const fd = new FormData(), xhr = new XMLHttpRequest()

    fd.append("params", angular.toJson(data))

    l(files)
    files && files.length && [...files].forEach(x => fd.append("files[]", x))

    xhr.upload.addEventListener("progress", progress, false)
    xhr.addEventListener("load", done, false)
    xhr.addEventListener("error", failed, false)
    xhr.addEventListener("abort", canceled, false)
    xhr.open("POST", url)
    xhr.send(fd)

    return this.def.promise
  }
  getMenu(id){
    const { $q } = this
    this.def = $q.defer()

    this.post(`${this.API_URL}backend/process.php`, {
      t: "get", d: id
    })
    .then(res => this.def.resolve(res))

    return this.def.promise
  }
  saveMenu(menu){
    const { id, title, pages, isDark, qrLogo, qrLogoFile } = menu
    , formData = {
      id, title, pages, isDark, base: this.API_URL,
      qrLogo: qrLogo === ''?'assets/qr-logo.png':qrLogo
    }

    const def = this.$q.defer()
    this.post(`${this.API_URL}backend/process.php`, {
      t: "save", d: formData
    }, qrLogoFile)
    .then(res => def.resolve(res))

    return def.promise
  }
  saveOrder(order){
    const def = this.$q.defer()
    this.post(`${this.API_URL}backend/process.php`, {
      t: "order", d: order
    })
    .then(res => def.resolve(res))

    return def.promise
  }
}
