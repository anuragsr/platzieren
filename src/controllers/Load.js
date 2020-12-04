import {l} from "../utils/helpers";

export default class LoadCtrl {
  constructor($stateParams, utils) {
    l($stateParams, utils)
    this.title = 'LoadCtrl';
  }
}
