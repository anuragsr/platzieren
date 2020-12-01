import $ from 'jquery'
import angular from 'angular'
import uiRouter from 'angular-ui-router'
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

l('jQuery Version:', $().jquery)

WebFont.load({
  google: { families: ['Exo 2:400,700', 'Open Sans:400,700'] }
  , active: function() {
    l("Webfonts loaded")
    // $(".preload").fadeOut()
  }
})

angular
  .module('app', [uiRouter])
  .factory('utils', Utils)
  .component('coffeeTpl', { template: coffeeTpl })
  .component('japaneseTpl', { template: japaneseTpl })
  .component('pizzaTpl', { template: pizzaTpl })
  .controller('HomeCtrl', HomeCtrl)
  .controller('LoadCtrl', LoadCtrl)
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/home");

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
  })
  .directive('h', Header)
  .directive('f', Footer)
