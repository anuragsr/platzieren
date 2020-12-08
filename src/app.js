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
  .component('coffee', {
    bindings: { currPage: '<', },
    template: coffeeTpl,
    controller: function () {
      this.$onInit = () => {
        l("init coffeeTpl", this.currPage)
      }
    }
  })
  .component('japanese', {
    bindings: { currPage: '<', },
    template: japaneseTpl,
    controller: function () {
      this.$onInit = () => {
        l("init japaneseTpl", this.currPage)
      }
    }
  })
  .component('pizza', {
    bindings: { currPage: '<', },
    template: pizzaTpl,
    controller: function () {
      this.$onInit = () => {
        l("init pizzaTpl", this.currPage)
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
      // template: require('./templates/home.html').default,
      // template: '<home></home>',
    })
    .state('load', {
      url: '/l/:lId',
      // template: require('./templates/load.html').default,
      template: loadTpl,
      controller: 'LoadCtrl',
      controllerAs: 'loadCtrl'
    })
    // Add more states here
  }])
  .directive('h', Header)
  .directive('f', Footer)
