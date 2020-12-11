import $ from 'jquery'
import { l } from "./helpers"
l('jQuery Version:', $().jquery)

export default class Utils {
  constructor($q, $filter, $rootScope, $timeout, ENV){
    // l($q, $filter, $rootScope)
    this.$timeout = $timeout
    this.$rootScope = $rootScope
    this.$q = $q

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
  save(menu){
    const { id, title, pages } = menu
    , formData = { id, title, pages }

    const def = this.$q.defer()
    this.post(`${this.API_URL}process.php`, {
      t: "save",
      d: formData
    })
    .then(res => def.resolve(res))

    return def.promise
  }
}

// getHTML(type, data){
//   var html = ""
//   // if(type == "pdf"){
//   //   var s = angular.copy(data.sec)
//   //   var t = angular.copy(data.t)
//   //   t.css({ textAlign: "center" })
//   //   t.append("<br>")
//   //   t.removeAttr("class")
//   //   html+= t.get(0).outerHTML
//   //   s.forEach(function(obj){
//   //     var jqObj = $(obj)
//   //     jqObj.find(".ctn-action").remove()
//   //     jqObj.css("margin", "20px 0")
//   //     if(jqObj.hasClass("heading")){
//   //       jqObj.css("margin", "40px 0")
//   //     }
//   //     jqObj.removeAttr("class ng-click")
//   //
//   //     var spans = jqObj.find("span.edit")
//   //     if(spans.length){
//   //       spans.replaceWith(function(){
//   //         return $("<b />", { html: $(this).text().replace(/\n/g, "<br>") })
//   //       })
//   //     }
//   //     html+= jqObj.get(0).outerHTML
//   //   })
//   //   // l(html)
//   // }else{
//   //   // l(data.h)
//   //   html = $(data.h)
//   //   html.find(".ctn-action").remove()
//   //   html.find("span").replaceWith(function(){
//   //     return $("<b />", { html: $(this).text().replace(/\n/g, "<br>") })
//   //   })
//   //   html = $(html[1]).html()
//   //   // l(html)
//   // }
//   return html
// }
// getId(length){
//   var chars = 'M30Z1xA0Nu5Pn8Yo2pXqB5Rly9Gz3vWOj1Hm46IeCfgSrTs7Q9aJb8F6DcE7d2twkUhKiL4V'
//   , charLength = chars.length
//   , randomStr = ''
//   for (var i = 0; i < length; i++) {
//     randomStr+= chars[Math.floor(Math.random() * (charLength - 1)) + 0]
//   }
//   return randomStr
// }
// space(c){
//   return String.fromCharCode(160).repeat(c)
// }
// download(path, name, s){
//   if(  navigator.userAgent.match(/iPhone/i)
//     || navigator.userAgent.match(/iPad/i)
//     || navigator.userAgent.match(/iPod/i)
//   ){
//     // If apple, let user click a link
//     s.dlPath = host + path
//     $(".dl-modal-2").modal('hide')
//     $(".dl-modal").modal('show')
//   } else {
//     // Else, download it
//     var link = document.createElement("a")
//     document.body.appendChild(link)
//     link.href = host + path
//     link.target = '_blank'
//     link.download = name
//     link.click()
//     document.body.removeChild(link)
//   }
// }
// scroll(amount){
//   $('html, body').animate({ scrollTop: amount }, 500)
// }
// resizeFields(spans, arr) {
//   spans.forEach(function(sp, idx){
//     var mh = $(sp).height() + 10
//     , mw = $(sp).width() + 10
//
//     arr[idx].mh = mh
//     arr[idx].mw = mw
//
//     $(sp).css({
//       minHeight : mh,
//       minWidth : mw,
//     })
//   })
// }
// getHTML(type, data){
//   var html = ""
//   if(type == "pdf"){
//     var s = angular.copy(data.sec)
//     var t = angular.copy(data.t)
//     t.css({ textAlign: "center" })
//     t.append("<br>")
//     t.removeAttr("class")
//     html+= t.get(0).outerHTML
//     s.forEach(function(obj){
//       var jqObj = $(obj)
//       jqObj.find(".ctn-action").remove()
//       jqObj.css("margin", "20px 0")
//       if(jqObj.hasClass("heading")){
//         jqObj.css("margin", "40px 0")
//       }
//       jqObj.removeAttr("class ng-click")
//
//       var spans = jqObj.find("span.edit")
//       if(spans.length){
//         spans.replaceWith(function(){
//           return $("<b />", { html: $(this).text().replace(/\n/g, "<br>") })
//         })
//       }
//       html+= jqObj.get(0).outerHTML
//     })
//     // l(html)
//   }else{
//     // l(data.h)
//     html = $(data.h)
//     html.find(".ctn-action").remove()
//     html.find("span").replaceWith(function(){
//       return $("<b />", { html: $(this).text().replace(/\n/g, "<br>") })
//     })
//     html = $(html[1]).html()
//     // l(html)
//   }
//   return html
// }
// getContents(id){
//   def2 = $q.defer()
//   this.post(host + "backend/contract.php", {
//     t: "get",
//     d: {
//       id: id
//     }
//   }).then(function(res){
//     if(res.result)
//       def2.resolve(res)
//     else
//       alert(res.message)
//   })
//   return def2.promise
// }
// createPdf(id, title, sections){
//   var def2 = $q.defer()
//   this.post(host + "backend/contract.php", {
//     t: "pdf",
//     d: {
//       id: id,
//       html: this.getHTML("pdf", {t: title, sec: sections})
//     }
//   }).then(function(res){
//     def2.resolve(res)
//   })
//   return def2.promise
// }
// fl(fil, arr, condition){
//   return $filter(fil)(arr, condition)
// }
// focus(id, dir, arr){
//   // l(dir)
//   const curr = this.fl('filter', arr, {id: id})[0]
//   let idx = arr.indexOf(curr)
//
//   switch(dir){
//     case 'prev':
//       if(idx == 0){
//         idx = arr.length - 1
//       }else{
//         idx--
//       }
//     break;
//
//     case 'next':
//       if(idx == arr.length - 1){
//         idx = 0
//       }else{
//         idx++
//       }
//     break;
//   }
//   const el = $('#' + arr[idx].id)
//   el.focus()
//   $(window).scrollTop(el.offset().top - 260 - 50)
// }
