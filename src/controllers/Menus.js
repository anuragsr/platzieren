import { l } from "../utils/helpers"

export default class MenuCtrl {
  constructor($scope, $timeout, utils) {
    // l(this)
    this.$timeout = $timeout
    this.utils = utils
    this.$onInit = () => {
      l("init menu", this.menu.title)
      $timeout(() => this.showLoader = false, 1000)
    }
    $scope.$watch('$ctrl.menu.pages', (newVal, oldVal) => {
      // l(newVal, oldVal)
      this.filledFields = utils.getFilledFields(newVal)
    }, true)
  }
  pageFn(opts){
    switch (opts.type) {
      case 'next': if(this.menu.activePage < this.menu.pages.length - 1) this.menu.activePage++; break;
      case 'prev': if(this.menu.activePage > 0) this.menu.activePage--; break;
      case 'number': this.menu.activePage = opts.page; break;
    }
  }
}
