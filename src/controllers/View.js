import { l } from '../utils/helpers'

export default class ImgCtrl {
  constructor($scope, $state, $stateParams, $timeout, utils) {
    l($stateParams)
    this.$scope = $scope
    this.$timeout = $timeout
    this.$state = $state
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
      if(!res.result) {
        alert(res.message); this.$state.go('allgemein')
      }
      else {
        this.showLoader = false
        this.menu = res.data.menu
      }
    })
  }
}
