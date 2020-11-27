import $ from 'jquery'
import { l, cl } from './utils/helpers'
import angular from 'angular'
import './styles/index.scss'

l('jQuery Version:', $().jquery)

let app = () => {
  return {
    template: require('./templates/app.html').default,
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor() {
    this.url = 'http://envisagecyberart.in';
    this.title = 'Platzieren';
  }
}

const MODULE_NAME = 'app';

angular
.module(MODULE_NAME, [])
.directive('app', app)
.controller('AppCtrl', AppCtrl);

export default MODULE_NAME;

