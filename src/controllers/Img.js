import {l} from '../utils/helpers'
import html2canvas from 'html2canvas'
// import { jsPDF } from 'jspdf'

export default class ImgCtrl {
  constructor($scope, $stateParams, $timeout, utils) {
    l($stateParams)
    this.utils = utils
    this.$timeout = $timeout
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
      // this.$timeout(() => {
      //   this.download()
      // }, 2000)
    })



      // const doc = new jsPDF();
      // doc.html(document.body, {
      //   callback: function (doc) {
      //     doc.save("a4.pdf");
      //   },
      // });
    // doc.save("a4.pdf");
  }
  generatePDF(){

  }
  download(){
    l("DL")
    // this.utils.post(`${this.utils.API_URL}process.php`, {
    //   t: "pdf", d: document.documentElement.outerHTML
    // })
    // .then(res => l(res))
    // const doc = new jsPDF();
    // doc.html(document.body, {
    //   callback: function (doc) {
    //     doc.save("a4.pdf");
    //   },
    // });
    // let count = 0
    try{
      [...document.querySelectorAll('.ctn-menu-inner')]
      .forEach(menu => {
        const bb = menu.querySelector(".ctn-menu-page").getBoundingClientRect()
        try {
          html2canvas(menu, {
            x: bb.left + 8, y: bb.top,
            backgroundColor: null
          })
          .then(canvas => {
            l("canvas created", canvas)
            // canvas.setAttribute("id", "id" + count)
            document.querySelector('.menu-download .ctn-menu-outer').appendChild(canvas)
            // count++
          })
        } catch(e){ l(e) }
      })
    }
    catch(e){ l(e) }
  }
}
