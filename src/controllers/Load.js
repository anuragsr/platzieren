import $ from 'jquery'
import { l } from '../utils/helpers'

export default class LoadCtrl {
  constructor($scope, $state, $stateParams, utils) {
    // l($stateParams)
    this.utils = utils
    this.menuId = $stateParams.lId
    this.$state = $state

    this.filledFields = 0
    this.zoom = 1

    this.menus = this.utils.menus
    this.menu = {}

    this.init()
    $scope.$on('elFocused', (name, val) => {
      // l(this.focusedEl, val)
      this.focusedEl = val
    })
    $scope.$on('progress', (e, prog) => l(prog))
    $scope.$watch(() => this.menu.qrLogo, (n, o) => {
      // l(n, o)
      this.utils.createQRCode(n, this.viewLink)
    })
  }
  init(){
    this.utils
    .getMenu(this.menuId)
    .then(res => {
      l(res)
      if(!res.result) {
        alert(res.message); this.$state.go('allgemein')
      }
      else {
        this.menu = res.data.menu

        const menuData = this.utils.fl('filter', this.menus, { title: this.menu.title})[0]
        this.viewLink = `${this.utils.IMG_URL}view/${menuData.state}/${this.menuId}`
        l(this.viewLink)
        this.menu.fields = menuData.fields
        this.menu.titles = menuData.titles
        this.totalFields = this.menu.pages.reduce((prev, curr) => prev + curr.fields.length, 0)

        $(() => {
          this.utils.createQRCode("assets/qr-logo.png", this.viewLink)
        })
      }
    })
  }
  addMenuPage(){
    l("add page")
    this.focusedEl = null
    this.menu.pages.push({
      fields: angular.copy(this.menu.fields),
      titles: angular.copy(this.menu.titles),
    })
    this.menu.activePage = this.menu.pages.length - 1
    this.totalFields = this.menu.pages.reduce((prev, curr) => prev + curr.fields.length, 0)
  }
  zoomFn(dir){ this.zoom = this.utils.zoom(this.zoom, dir) }
  focusFn(dir){ this.utils.focus(dir, this.focusedEl, this.menu) }
  save(isAuto){
    if(!isAuto) this.showLoader = true

    this.utils
    .saveMenu(this.menu)
    .then(res => {
      l(res)
      this.showLoader = false
      if(!isAuto) alert(res.message)
    })
  }
  openPDF(){
    this.showLoader = true
    this.utils
    .saveMenu(this.menu)
    .then(res => {
      l(res)
      this.showLoader = false
      window.open(this.viewLink,'_blank');
    })
  }
}
