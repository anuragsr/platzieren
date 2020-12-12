import {l} from '../utils/helpers'

export default class LoadCtrl {
  constructor($scope, $stateParams, utils) {
    // l($stateParams)
    this.utils = utils
    this.menuId = $stateParams.lId

    this.filledFields = 0
    this.zoom = 1

    this.menus = [
      {
        title: 'Allge.',
        img: "/assets/coffee.png",
        fields: [],
        pages: [],
        activePage: 0
      },
      {
        title: 'Sushi',
        img: "/assets/sushi.png",
        fields: [
          {
            id:0,
            pos: { top: 360, left: 30 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:1,
            pos: { top: 415, left: 30 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:2,
            pos: { top: 465, left: 30 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:3,
            pos: { top: 330, left: 490 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:4,
            pos: { top: 385, left: 490 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:5,
            pos: { top: 650, left: 30 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:6,
            pos: { top: 705, left: 30 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:7,
            pos: { top: 760, left: 30 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:8,
            pos: { top: 815, left: 30 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:9,
            pos: { top: 605, left: 250 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:10,
            pos: { top: 745, left: 470 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:11,
            pos: { top: 800, left: 470 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          }
        ],
        pages: [],
        activePage: 0
      },
      {
        title: 'Pizza',
        img: "/assets/pizza.png",
        fields: [],
        pages: [],
        activePage: 0
      },
    ]
    this.menu = {}

    this.init()
    $scope.$on('elFocused', (name, val) => {
      // l(this.focusedEl, val)
      this.focusedEl = val
    })
    $scope.$on('progress', (e, prog) => l(prog))
  }
  init(){
    this.utils
    .getMenu(this.menuId)
    .then(res => {
      l(res)
      this.menu = res.data.menu
      this.menu.fields = this.utils.fl('filter', this.menus, { title: this.menu.title})[0].fields
      this.totalFields = this.menu.pages.reduce((prev, curr) => prev + curr.length, 0)
    })
  }
  addMenuPage() {
    l("add page")
    this.focusedEl = null
    this.menu.pages.push(angular.copy(this.menu.fields))
    this.menu.activePage = this.menu.activePage - 1
    this.totalFields = this.menu.pages.reduce((prev, curr) => prev + curr.length, 0)
  }
  zoomFn(dir){ this.zoom = this.utils.zoom(this.zoom, dir) }
  focusFn(dir){ this.utils.focus(dir, this.focusedEl, this.menu) }
  save(){
    this.showLoader = true
    this.utils
    .save(this.menu)
    .then(res => {
      l(res)
      this.showLoader = false
      alert(res.message)
    })
  }
}
