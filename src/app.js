import angular from 'angular'
import uiRouter from 'angular-ui-router'
import qrcode from 'qrcode-generator'
import qrcode_UTF8 from 'qrcode-generator/qrcode_UTF8'
import ngQrcode from 'angular-qrcode'
import WebFont from 'webfontloader'

import 'angular-ui-carousel/dist/ui-carousel.min'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './utils/portal'

// Controllers & Directives
import HomeCtrl from './controllers/Home'
import LoadCtrl from './controllers/Load'
import ImgCtrl from './controllers/Img'
import { MenuCtrl } from './controllers/Menus'
import { Header, Footer, Loader } from './directives/Partials'
import FocusOn from './directives/FocusOn'

// Templates
import homeTpl from './templates/home.html'
import loadTpl from './templates/load.html'
import imgTpl from './templates/img.html'
import coffeeTpl from './templates/coffee.html'
import japaneseTpl from './templates/japanese.html'
import pizzaTpl from './templates/pizza.html'

// Custom JS
import Utils from './utils/utils'
import {l, cl, env} from './utils/helpers'

// CSS
import './styles/index.scss'
import 'angular-ui-carousel/dist/ui-carousel.min.css'

// import JapCtrl from './controllers/JapCtrl'
// template: require('./templates/home.html').default,

WebFont.load({
  google: { families: ['Exo 2:400,700', 'Open Sans:400,700'] }
  , active: function() {
    l("Webfonts loaded")
  }
})

angular
.module('app', [uiRouter, 'ui.carousel', 'portal', ngQrcode])
.constant('ENV', env)
.service('utils', ['$q', '$filter', '$rootScope', '$timeout', 'ENV', Utils])
.controller('HomeCtrl', ['$scope', '$timeout', 'utils', HomeCtrl])
.controller('LoadCtrl', ['$scope', '$stateParams', 'utils', LoadCtrl])
.controller('ImgCtrl',  ['$scope', '$stateParams', 'utils', ImgCtrl])
.controller('MenuCtrl',  ['$scope', '$timeout', 'utils', MenuCtrl])
.directive('h', Header)
.directive('f', Footer)
.directive('l', Loader)
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
.component('menuImg', {
  template: imgTpl,
  controller: 'ImgCtrl',
  controllerAs: 'imgCtrl'
})
.component('coffee', {
  bindings: {
    menu: '=', filledFields: '=', zoom: '=',
    download: "=", showLoader: "="
  },
  template: coffeeTpl,
  controller: 'MenuCtrl'
})
.component('japanese', {
  bindings: {
    menu: '=', filledFields: '=', zoom: '=',
    download: "=", showLoader: "="
  },
  template: japaneseTpl,
  controller: 'MenuCtrl'
})
.component('pizza', {
  bindings: {
    menu: '=', filledFields: '=', zoom: '=',
    download: "=", showLoader: "="
  },
  template: pizzaTpl,
  controller: 'MenuCtrl'
})
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/home");

  $stateProvider
  .state('home', {
    url: '/home',
    component: 'home',
    data : { pageTitle: 'Platzieren | Home' }
  })
  .state('load', {
    url: '/l/:lId',
    component: 'load',
    data : { pageTitle: 'Platzieren | Edit Menu' }
  })
  .state('menuImg', {
    url: '/i/:iId',
    component: 'menuImg',
    data : { pageTitle: 'Platzieren | View Menu' }
  })
  // Add more states here
}])
.run(['$rootScope', '$state', function ($rootScope, $state) { $rootScope.$state = $state }])
