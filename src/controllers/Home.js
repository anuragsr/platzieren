import ClipboardJS from 'clipboard/dist/clipboard.min'
import {l} from '../utils/helpers'

export default class HomeCtrl {
  constructor($scope, $timeout, utils) {
    this.utils = utils
    this.activeSize = 'S'
    this.filledFields = 0
    this.zoom = 1
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
    const linkData = this.utils.createLink()
    this.shareLink = linkData.link

    this.idx = this.menus.indexOf(menu)
    this.menu = angular.copy(menu)
    this.menu.id = linkData.id
    this.menu.isDark = false
    this.addMenuPage()

    const clipboard = new ClipboardJS('.ctn-link .desc, .inner.link')
    clipboard.on('success', function(e) {
      e.clearSelection()
      alert('In die Zwischenablage kopiert - ' + e.text)
    })
    clipboard.on('error', function(e) {
      alert('Beim Kopieren ist ein Fehler aufgetreten, bitte manuell kopieren.')
    })
  }
  addMenuPage() {
    l("add page")
    this.focusedEl = null
    this.menu.pages.push(angular.copy(this.menu.fields))
    this.menu.activePage = this.menu.pages.length - 1
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
  getQR(){
    l("QR")
  }
}
