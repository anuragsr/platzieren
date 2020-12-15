import {l} from '../utils/helpers'

export default class LoadCtrl {
  constructor($scope, $stateParams, utils) {
    // l($stateParams)
    this.utils = utils
    this.menuId = $stateParams.lId

    this.filledFields = 0
    this.zoom = 1

    this.menus = this.utils.menus
    this.menu = {}
    this.viewLink = `${this.utils.IMG_URL}${this.menuId}`

    this.init()
    $scope.$on('elFocused', (name, val) => {
      // l(this.focusedEl, val)
      this.focusedEl = val
    })
    $scope.$on('progress', (e, prog) => l(prog))
  }
  init(){
    this.utils
    .getMenu(this.menuId)
    .then(res => {
      l(res)
      this.menu = res.data.menu
      this.menu.fields = this.utils.fl('filter', this.menus, { title: this.menu.title})[0].fields
      this.totalFields = this.menu.pages.reduce((prev, curr) => prev + curr.length, 0)
    })
  }
  addMenuPage() {
    l("add page")
    this.focusedEl = null
    this.menu.pages.push(angular.copy(this.menu.fields))
    this.menu.activePage = this.menu.pages.length - 1
    this.totalFields = this.menu.pages.reduce((prev, curr) => prev + curr.length, 0)
  }
  zoomFn(dir){ this.zoom = this.utils.zoom(this.zoom, dir) }
  focusFn(dir){ this.utils.focus(dir, this.focusedEl, this.menu) }
  save(){
    this.showLoader = true
    this.utils
    .save(this.menu)
    .then(res => {
      l(res)
      this.showLoader = false
      alert(res.message)
    })
  }
}
