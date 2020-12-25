import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { l } from '../utils/helpers'

export default class ImgCtrl {
  constructor($scope, $stateParams, $timeout, utils) {
    l($stateParams)
    this.$scope = $scope
    this.$timeout = $timeout
    this.utils = utils

    this.menuId = $stateParams.iId
    this.menu = {}
    this.init()
  }
  init(){
    this.showLoader = true
    this.utils
    .getMenu(this.menuId)
    .then(res => {
      l(res)
      this.showLoader = false
      this.menu = res.data.menu
    })
  }
  generatePDF(){
    this.showLoader = true

    let orn = 'p'
    if(this.menu.title === 'Pizza') orn = 'l'

    const doc = new jsPDF({ orientation: orn })
    , pages = [...document.querySelectorAll('.ctn-menu-inner')]
    , xOff = orn === 'p' ? 8 : 9
    l(xOff)

    pages.forEach((menu, idx) => {
      const bb = menu.querySelector(".ctn-menu-page").getBoundingClientRect()

      html2canvas(menu, {
        x: bb.left + xOff, y: bb.top,
        backgroundColor: null
      })
      .then(canvas => {
        l("canvas created", canvas, idx) // TODO: if order incorrect use indices to store first
        // document.querySelector('.menu-download .ctn-menu-outer').appendChild(canvas)
        const imgData = canvas.toDataURL('image/jpg')
        , imgProps = doc.getImageProperties(imgData)

        let pdfHeight, pdfWidth

        if(this.utils.isMobile()){
          pdfHeight = doc.internal.pageSize.getWidth()
          , pdfWidth = (imgProps.width * pdfHeight) / imgProps.height
        } else{
          pdfWidth = doc.internal.pageSize.getWidth()
          , pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
        }

        doc.addImage(imgData, 0, 0, pdfWidth, pdfHeight)

        if(idx === pages.length - 1){
          doc.save(`Platzieren Menu ${this.menu.title} (${this.menu.id}).pdf`)
          this.$scope.$apply(() => this.showLoader = false)
        } else doc.addPage()
      })
    })
  }
}
