import {l} from "../utils/helpers"
export default class HomeCtrl {
  constructor($scope, utils) {
    this.url = 'http://envisagecyberart.in'
    this.title = 'Platzieren'
    this.toggle = { switch: false }
    this.activeSize = 'S'
    this.idx = 0
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
            id:'f0',
            pos: { top: 360, left: 30 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:'f1',
            pos: { top: 415, left: 30 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:'f2',
            pos: { top: 465, left: 30 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:'f3',
            pos: { top: 330, left: 490 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:'f4',
            pos: { top: 385, left: 490 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:'f5',
            pos: { top: 650, left: 30 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:'f6',
            pos: { top: 705, left: 30 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:'f7',
            pos: { top: 760, left: 30 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:'f8',
            pos: { top: 815, left: 30 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:'f9',
            pos: { top: 605, left: 250 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:'f10',
            pos: { top: 745, left: 470 },
            name: { p: 'SPICY TUNA', v: '' },
            desc: { p: 'Tuna, Rice, Avocado', v: '' },
            price: { p: 'X,XX', v: '' },
          },
          {
            id:'f11',
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
  }
  init(){
    l("init Home")

    const { menus } = this
    this.createMenu(menus[1])
    this.createSlider()
  }
  createSlider(){
    let slides = this.slides = [], currIndex = 0
    for (var i = 0; i < 3; i++) {
      slides.push({ image: '/assets/sl1.png' })
    }
  }
  new(p){
    if(confirm('Möchten Sie wirklich ein neues Dokument erstellen?')) this.createMenu(p)
  }
  createMenu(menu){
    this.idx = this.menus.indexOf(menu)
    this.menu = angular.copy(menu)
    this.filledFields = 0
    this.zoom = 1
    this.addMenuPage()
  }
  addMenuPage() {
    l("add page")
    this.menu.pages.push(angular.copy(this.menu.fields))
    this.menu.activePage = this.menu.pages.length - 1
    this.totalFields = this.menu.pages.reduce((prev, curr) => prev + curr.length, 0)
  }
  zoomFn(dir){
    // s.zoom = utils.zoom(s.zoom, dir)
    l(dir)
    this.zoom = 1
  }
}
