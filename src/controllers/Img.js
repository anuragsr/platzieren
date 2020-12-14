import {l} from '../utils/helpers'
import html2canvas from 'html2canvas'

export default class ImgCtrl {
  constructor($scope, $stateParams, utils) {
    l($stateParams)
    this.utils = utils
    this.menuId = $stateParams.iId
    this.menu = {}
    this.init()
  }
  init(){
    this.utils
    .getMenu(this.menuId)
    .then(res => {
      l(res)
      this.showLoader = false
      this.menu = res.data.menu
    })
  }
  download(){
    l("DL")
    // let count = 0
    // try{
    //   [...document.querySelectorAll('.ctn-menu-inner')]
    //   .forEach(menu => {
    //     html2canvas(menu)
    //     .then(canvas => {
    //       l("canvas created", canvas)
    //       canvas.setAttribute("id", "id" + count)
    //       document.body.appendChild(canvas)
    //       count++
    //     })
    //   })
    // }
    // catch(e){ l(e) }
  }
}
