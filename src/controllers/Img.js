import {l} from '../utils/helpers'

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
      this.menu = res.data.menu
      // this.menu.fields = this.utils.fl('filter', this.menus, { title: this.menu.title})[0].fields
      // this.totalFields = this.menu.pages.reduce((prev, curr) => prev + curr.length, 0)
    })
  }
}
