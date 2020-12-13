import { l } from "./helpers"

export default class Utils {
  constructor($q, $filter, $rootScope, $timeout, ENV){
    // l($q, $filter, $rootScope)
    this.$q = $q
    this.$filter = $filter
    this.$rootScope = $rootScope
    this.$timeout = $timeout

    this.FE_URL = ENV[ENV.CURR].FE_URL
    this.API_URL = ENV[ENV.CURR].API_URL
    // this.def = $q.defer()
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
  createLink(){
    const id = this.generateId(6)
    return { id, link:`${this.FE_URL}${id}` }
  }
  focus(dir, focusedEl, menu){
    // l(dir, focusedEl, menu)
    const { $timeout, $rootScope } = this
    , fieldData = {}

    // 1. check if any field has focus already
    if(!focusedEl){
      // 2. if no, identify first field and focus
      fieldData.page  = menu.activePage
      fieldData.field = menu.pages[menu.activePage][0].id
    } else {
      // 3. if yes, identify next field and focus
      const currPage = menu.pages[menu.activePage]
      let fieldIdx = currPage.findIndex(gr => gr.id === focusedEl.field)

      // l(fieldIdx)
      switch(dir){
        case 'prev':
          if(fieldIdx === 0){ fieldIdx = currPage.length - 1 }
          else { fieldIdx-- }
        break;

        default:
          if(fieldIdx === currPage.length - 1){ fieldIdx = 0 }
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
      page.forEach(obj => {
        if(!angular.isUndefined(obj.name.v) && obj.name.v !== '')
          filled++
      })
    })
    return filled
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
    if(files){
      var paths = []
      files.forEach(function(x){
        fd.append("files[]", x.value)
        paths.push(x.upPath)
      })
      fd.append("paths", angular.toJson(paths))
    }

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

    this.post(`${this.API_URL}process.php`, {
      t: "get", d: id
    }).then(res => {
      if(res.result) this.def.resolve(res)
      else alert(res.message)
    })

    return this.def.promise
  }
  save(menu){
    const { id, title, pages, isDark } = menu
    , formData = { id, title, pages, isDark }

    const def = this.$q.defer()
    this.post(`${this.API_URL}process.php`, {
      t: "save", d: formData
    })
    .then(res => def.resolve(res))

    return def.promise
  }
}
