import $ from 'jquery'
import angular from 'angular'
import uiRouter from 'angular-ui-router'
import 'angular-ui-carousel/dist/ui-carousel.min'
import WebFont from 'webfontloader'

// Controllers & Directives
import HomeCtrl from './controllers/Home'
import LoadCtrl from './controllers/Load'
import Header from './directives/Header'
import Footer from "./directives/Footer"

// Templates
import homeTpl from './templates/home.html'
import loadTpl from './templates/load.html'
import coffeeTpl from './templates/coffee.html'
import japaneseTpl from './templates/japanese.html'
import pizzaTpl from './templates/pizza.html'

// Custom JS
import Utils from "./utils/utils"
import { l, cl } from './utils/helpers'

// CSS
import './styles/index.scss'
import 'angular-ui-carousel/dist/ui-carousel.min.css'

l('jQuery Version:', $().jquery)
// template: require('./templates/home.html').default,

WebFont.load({
  google: { families: ['Exo 2:400,700', 'Open Sans:400,700'] }
  , active: function() {
    l("Webfonts loaded")
    // $(".preload").fadeOut()
  }
})

angular
  .module('app', [uiRouter, 'ui.carousel'])
  .factory('utils', ['$q', '$filter', '$rootScope', Utils])
  .controller('HomeCtrl', ['$scope', 'utils', HomeCtrl])
  .controller('LoadCtrl', ['$scope', 'utils', LoadCtrl])
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
    bindings: { currMenu: '<', pageFn: '<' },
    template: coffeeTpl,
    controller: function () {
      this.$onInit = () => {
        l("init coffeeTpl", this.currMenu)
      }
    }
  })
  .component('japanese', {
    bindings: { currMenu: '<' },
    template: japaneseTpl,
    controller: ['$scope', function ($scope) {
      // l($scope)
      this.$onInit = () => {
        l("init japaneseTpl")
      }

      this.pageFn = opts => {
        switch (opts.type) {
          case 'next': if(this.currMenu.activePage < this.currMenu.pages.length - 1) this.currMenu.activePage++; break;
          case 'prev': if(this.currMenu.activePage > 0) this.currMenu.activePage--; break;
          case 'number': this.currMenu.activePage = opts.page; break;
        }
      }

      $scope.$watch('$ctrl.currMenu.pages', (newVal, oldVal) => {
        l(newVal, oldVal)
      }, true);
    }]
  })
  .component('pizza', {
    bindings: { currMenu: '<', pageFn: '<' },
    template: pizzaTpl,
    controller: function () {
      this.$onInit = () => {
        l("init pizzaTpl", this.currMenu)
      }
    }
  })
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");
    // $urlRouterProvider.otherwise("/l/2");

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
  .directive('h', Header)
  .directive('f', Footer)
