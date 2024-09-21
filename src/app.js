import angular from 'angular'
import uiRouter from 'angular-ui-router'
import WebFont from 'webfontloader'
import ClipboardJS from 'clipboard/dist/clipboard.min'

import 'angular-ui-carousel/dist/ui-carousel.min'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import './utils/portal'

// Controllers & Directives
import HomeCtrl from './controllers/Home'
import LoadCtrl from './controllers/Load'
import ImgCtrl from './controllers/View'
import MenuCtrl from './controllers/Menus'
import { Header, Footer, Loader } from './directives/Partials'
import FocusOn from './directives/FocusOn'
import FileRead from './directives/FileRead'

// Templates
import homeTpl from './templates/home.html'
import loadTpl from './templates/load.html'
import imgTpl from './templates/view.html'
import coffeeTpl from './templates/coffee.html'
import japaneseTpl from './templates/japanese.html'
import pizzaTpl from './templates/pizza.html'

// Custom JS
import Utils from './utils/utils'
import {l, cl, env} from './utils/helpers'

// CSS
import './styles/index.scss'
import 'angular-ui-carousel/dist/ui-carousel.min.css'

WebFont.load({
  google: { families: ['Exo 2:400,700', 'Open Sans:400,700', 'Ruthie:400'] }
  , active: function() { l("webfonts loaded") }
})

const bindings = {
  menu: '=', filledFields: '=', zoom: '=',
  save: '<', showLoader: '='
}
, clipboard = new ClipboardJS('.ctn-save, .inner.link')

clipboard.on('success', function(e) {
  // l(e)
  e.clearSelection()
  if (!e.trigger.classList.contains("ctn-save"))
    alert('In die Zwischenablage kopiert - ' + e.text)
})
clipboard.on('error', function(e) {
  alert('Beim Kopieren ist ein Fehler aufgetreten, bitte manuell kopieren.')
})

angular
.module('app', [uiRouter, 'ui.carousel', 'portal'])
.constant('ENV', env)
.service('utils', ['$q', '$state', '$filter', '$rootScope', '$timeout', 'ENV', Utils])
.controller('HomeCtrl', ['$scope', '$state', '$timeout', 'utils', HomeCtrl])
.controller('LoadCtrl', ['$scope', '$state', '$stateParams', '$timeout', 'utils', LoadCtrl])
.controller('ImgCtrl',  ['$scope', '$state', '$stateParams', '$timeout', 'utils', ImgCtrl])
.controller('MenuCtrl', ['$scope', '$timeout', 'utils', MenuCtrl])
.directive('h', Header)
.directive('f', Footer)
.directive('l', Loader)
.directive('focusOn', ['$rootScope', FocusOn])
.directive('fileread', FileRead)
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
.component('view', {
  template: imgTpl,
  controller: 'ImgCtrl',
  controllerAs: 'imgCtrl'
})
.component('coffee', {
  bindings,
  template: coffeeTpl,
  controller: 'MenuCtrl'
})
.component('japanese', {
  bindings,
  template: japaneseTpl,
  controller: 'MenuCtrl'
})
.component('pizza', {
  bindings,
  template: pizzaTpl,
  controller: 'MenuCtrl'
})
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider
  .rule(function($injector, $location) {
    const path = $location.path()
    , hasTrailingSlash = path[path.length-1] === '/'

    if(hasTrailingSlash) {
      //if last charcter is a slash, return the same url without the slash
      return path.substr(0, path.length - 1)
    }
  })
  .otherwise('/sushi')

  $locationProvider.html5Mode(true)

  // Adding states here
  $stateProvider
  .state('allgemein', {
    url: '/allgemein',
    component: 'home',
    data : { pageTitle: 'Platzieren | Allgemein' }
  })
  .state('sushi', {
    url: '/sushi',
    component: 'home',
    data : { pageTitle: 'Platzieren | Sushi' }
  })
  .state('pizza', {
    url: '/pizza',
    component: 'home',
    data : { pageTitle: 'Platzieren | Pizza' }
  })
  .state('load', {
    url: '/{params:.*}/:lId',
    component: 'load',
    data : { pageTitle: 'Platzieren | Edit Menu' }
  })
  .state('view', {
    url: '/view/{params:.*}/:iId',
    component: 'view',
    data : { pageTitle: 'Platzieren | View Menu' }
  })
}])
.run(['$rootScope', '$state', function ($rootScope, $state) { $rootScope.$state = $state }])
