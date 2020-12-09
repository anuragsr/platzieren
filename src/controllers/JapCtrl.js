import { l } from "../utils/helpers"
export default class JapCtrl {
  constructor($scope, utils) {
    l(this)
    this.$onInit = () => {
      l("init japaneseTpl")
    }

    $scope.$watch('$ctrl.currMenu.pages', (newVal, oldVal) => {
      // l(newVal, oldVal)
      this.filledFields = utils.getFilledFields(newVal)
    }, true);
  }
  pageFn(opts){
    switch (opts.type) {
      case 'next': if(this.currMenu.activePage < this.currMenu.pages.length - 1) this.currMenu.activePage++; break;
      case 'prev': if(this.currMenu.activePage > 0) this.currMenu.activePage--; break;
      case 'number': this.currMenu.activePage = opts.page; break;
    }
  }
}
