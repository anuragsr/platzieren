import $ from 'jquery'
import angular from 'angular'
import uiRouter from 'angular-ui-router'
// import carousel from 'angular-ui-bootstrap/src/carousel'
// import uiBootstrap from 'angular-ui-bootstrap'
import 'angular-ui-carousel/dist/ui-carousel.min'
import WebFont from 'webfontloader'

import HomeCtrl from './controllers/Home'
import LoadCtrl from './controllers/Load'
import Header from './directives/Header'
import Footer from "./directives/Footer"
import coffeeTpl from './templates/coffee.html'
import japaneseTpl from './templates/japanese.html'
import pizzaTpl from './templates/pizza.html'

import Utils from "./utils/utils"
import { l, cl } from './utils/helpers'

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
  .component('coffeeTpl', {
    template: coffeeTpl,
    controller: function () {
      this.$onInit = () => {
        l("init coffeeTpl")
      }
    }
  })
  .component('japaneseTpl', {
    template: japaneseTpl,
    controller: function () {
      this.$onInit = () => {
        l("init japaneseTpl")
      }
    }
  })
  .component('pizzaTpl', {
    template: pizzaTpl,
    controller: function () {
      this.$onInit = () => {
        l("init pizzaTpl")
      }
    }
  })
  .controller('HomeCtrl', ['$scope', 'utils', HomeCtrl])
  .controller('LoadCtrl', ['$scope', 'utils', LoadCtrl])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/home");
    // $urlRouterProvider.otherwise("/l/2");

    $stateProvider
    .state('home', {
      url: '/home',
      template: require('./templates/home.html').default,
      controller: 'HomeCtrl',
      controllerAs: 'homeCtrl'
    })
    .state('load', {
      url: '/l/:lId',
      template: require('./templates/load.html').default,
      controller: 'LoadCtrl',
      controllerAs: 'loadCtrl'
    })
    // Add more states here
  }])
  .directive('h', Header)
  .directive('f', Footer)
