import {l} from "../utils/helpers";

export default class LoadCtrl {
  constructor($stateParams) {
    l($stateParams)
    this.title = 'LoadCtrl';
  }
}
