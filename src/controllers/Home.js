import ClipboardJS from 'clipboard/dist/clipboard.min'
import {l} from '../utils/helpers'

export default class HomeCtrl {
  constructor($scope, $timeout, utils) {
    this.utils = utils

    this.showLoader = true
    this.activeSize = 'S'
    this.filledFields = 0
    this.zoom = 1
    this.idx = 0

    this.menus = this.utils.menus
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

    const { menus } = this.utils
    this.createMenu(menus[0])
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
    this.showLoader = true

    const linkData = this.utils.createLink()

    this.editLink = linkData.editLink
    this.viewLink = linkData.viewLink

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
  save(isAuto){
    if(!isAuto) this.showLoader = true

    this.utils
    .save(this.menu)
    .then(res => {
      l(res)
      this.showLoader = false
      if(!isAuto) alert(res.message)
    })
  }
}
