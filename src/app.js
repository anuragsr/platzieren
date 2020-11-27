import $ from 'jquery'
import angular from 'angular'
import uiRouter from 'angular-ui-router'
import HomeCtrl from './controllers/Home'
import LoadCtrl from './controllers/Load'

import { l, cl } from './utils/helpers'
import './styles/index.scss'

l('jQuery Version:', $().jquery)

angular
.module('app', [uiRouter])
.controller('HomeCtrl', HomeCtrl)
.controller('LoadCtrl', LoadCtrl)
.config(function($stateProvider, $urlRouterProvider) {
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
