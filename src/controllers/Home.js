import ClipboardJS from 'clipboard/dist/clipboard.min'
import $ from 'jquery'
import { l } from '../utils/helpers'

export default class HomeCtrl {
  constructor($scope, $timeout, utils) {
    this.utils = utils
    this.$scope = $scope

    this.showLoader = true
    this.filledFields = 0
    this.zoom = 1
    this.idx = 0

    this.formData = {
      sz: 'S',
      f: '', l: '',
      em: '', ph: '',
      add1: '', add2: '',
      c: '', p: ''
    }

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
    this.createMenu(menus[2])
    this.createSlider()
    this.initPaypal()
  }
  initPaypal(){
    paypal.Buttons({
      onInit: (data, actions) => {
        l(data, actions)

        // Disable the buttons by default
        actions.disable()

        this.$scope.$watch(() => this.payForm.$valid, (newVal, oldVal) => {
          l(newVal, oldVal)
          if(newVal) actions.enable()
          else actions.disable()
        })
      },
      onClick: () => {
        if(!this.payForm.$valid) alert('Please fill in all fields!')
        else {
          this.showLoader = true
          this.$scope.$apply()
        }
      },
      style: {
        layout: 'horizontal',
        tagline: false,
        height: 45,
        // shape:  'pill',
        // color:  'blue',
        // label:  'pay',
      },
      createOrder: (data, actions) => actions.order.create({
        purchase_units: [{
          amount: { value: '14.99' }
        }]
      }),
      onApprove: (data, actions) => actions.order.capture().then(details => {
        // Show a success message to the buyer
        l('Transaction completed', details)
        if(details.status === "COMPLETED"){
          $('#buyModal').modal('hide')
          this.saveOrder(details)
        } else alert('Something went wrong, please try again!')
      }),
      onError: err => { l('Error', err); alert('Something went wrong, please try again!') },
      onCancel: data => l('Cancelled', data)
    })
    .render('#ctn-pp-btn')
  }
  createSlider(){
    let slides = this.slides = []
    for (let i = 0; i < 3; i++) {
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
  addMenuPage(){
    l("add page")
    this.focusedEl = null
    // this.menu.pages.push(angular.copy(this.menu.fields))
    this.menu.pages.push({
      fields: angular.copy(this.menu.fields),
      titles: angular.copy(this.menu.titles),
    })
    this.menu.activePage = this.menu.pages.length - 1
    l(this.menu)
    this.totalFields = this.menu.pages[0].fields.reduce((prev, curr) => prev + curr.length, 0)
  }
  zoomFn(dir){ this.zoom = this.utils.zoom(this.zoom, dir) }
  focusFn(dir){ this.utils.focus(dir, this.focusedEl, this.menu) }
  save(isAuto){
    if(!isAuto) this.showLoader = true

    this.utils
    .saveMenu(this.menu)
    .then(res => {
      l(res)
      this.showLoader = false
      if(!isAuto) alert(res.message)
    })
  }
  saveOrder(details){
    l(this.formData, details)

    this.utils
    .saveOrder( { ...this.formData, ...details })
    .then(res => {
      l(res)
      this.showLoader = false
      alert(res.message)
    })
  }
}
