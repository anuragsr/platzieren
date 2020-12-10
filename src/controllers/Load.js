import {l} from "../utils/helpers"
export default class LoadCtrl {
  constructor($scope, $stateParams, utils) {
    l($stateParams)
    this.title = 'LoadCtrl'
  }
}
