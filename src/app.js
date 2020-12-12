import angular from 'angular'
import uiRouter from 'angular-ui-router'
import 'angular-ui-carousel/dist/ui-carousel.min'
import qrcode from 'qrcode-generator'
import qrcode_UTF8 from 'qrcode-generator/qrcode_UTF8'
import ngQrcode from 'angular-qrcode'
import WebFont from 'webfontloader'

// Controllers & Directives
import HomeCtrl from './controllers/Home'
import JapCtrl from './controllers/JapCtrl'
import LoadCtrl from './controllers/Load'
import Header from './directives/Header'
import Footer from "./directives/Footer"
import FocusOn from "./directives/FocusOn"

// Templates
import homeTpl from './templates/home.html'
import loadTpl from './templates/load.html'
import coffeeTpl from './templates/coffee.html'
import japaneseTpl from './templates/japanese.html'
import pizzaTpl from './templates/pizza.html'

// Custom JS
import Utils from "./utils/utils"
import {l, cl, env} from './utils/helpers'

// CSS
import './styles/index.scss'
import 'angular-ui-carousel/dist/ui-carousel.min.css'

// template: require('./templates/home.html').default,
WebFont.load({
  google: { families: ['Exo 2:400,700', 'Open Sans:400,700'] }
  , active: function() {
    l("Webfonts loaded")
    // $(".preload").fadeOut()
  }
})

angular
.module('app', [uiRouter, 'ui.carousel', ngQrcode])
.constant('ENV', env)
.service('utils', ['$q', '$filter', '$rootScope', '$timeout', 'ENV', Utils])
.controller('HomeCtrl', ['$scope', '$timeout', 'utils', HomeCtrl])
.controller('LoadCtrl', ['$scope', '$stateParams', 'utils', LoadCtrl])
.controller('JapCtrl', ['$scope', 'utils', JapCtrl])
.directive('h', Header)
.directive('f', Footer)
.directive('focusOn', ['$rootScope', FocusOn])
.component('home', {
  template: homeTpl,
  controller: 'HomeCtrl',
  controllerAs: 'homeCtrl'
})
.component('load', {
  template: loadTpl,
  controller: 'LoadCtrl',
  controllerAs: 'loadCtrl'
})
.component('coffee', {
  bindings: {
    currMenu: '=', filledFields: '=',
    zoom: '=', getQr: "="
  },
  template: coffeeTpl,
  controller: function () {
    this.$onInit = () => {
      l("init coffeeTpl", this.currMenu)
    }
  }
})
.component('japanese', {
  bindings: {
    currMenu: '=', filledFields: '=',
    zoom: '=', getQr: "="
  },
  template: japaneseTpl,
  controller: 'JapCtrl'
})
.component('pizza', {
  bindings: {
    currMenu: '=', filledFields: '=',
    zoom: '=', getQr: "="
  },
  template: pizzaTpl,
  controller: function () {
    this.$onInit = () => {
      l("init pizzaTpl", this.currMenu)
    }
  }
})
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home");

  $stateProvider
  .state('home', {
    url: '/home',
    component: 'home'
  })
  .state('load', {
    url: '/l/:lId',
    component: 'load'
  })
  // Add more states here
}])
