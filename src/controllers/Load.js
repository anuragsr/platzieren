import {l} from "../utils/helpers"
export default class LoadCtrl {
  constructor($scope, $stateParams, utils) {
    l($stateParams)
    this.utils = utils
    this.menuId = $stateParams.lId
    this.init()
  }
  init(){
    this.utils
    .getMenu(this.menuId)
    .then(res => {
      l(res)
    })
  }
}
