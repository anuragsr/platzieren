import $ from 'jquery'
import { l } from '../utils/helpers'

export default class HomeCtrl {
  constructor($scope, $state, $timeout, utils) {
    this.$scope = $scope
    this.$state = $state
    this.$timeout = $timeout
    this.utils = utils

    this.idx = 0 // For menu selection on top

    this.showLoader = true
    this.filledFields = 0
    this.zoom = 1

    this.formData = this.utils.formData
    this.menus = this.utils.menus
    this.menu = {}

    $scope.$on('elFocused', (name, val) => {
      // l(this.focusedEl, val)
      this.focusedEl = val
    })
    $scope.$on('progress', (e, prog) => l(prog))
    $scope.$watch(() => this.menu.qrLogo, (n, o) => {
      // l(n, o)
      this.utils.createQRCode(n, this.viewLink)
      this.utils.qrObj.toImage().catch(err => l(err))
    })

    this.init()
  }
  init(){
    l("Current State:", this.$state.current.name)

    const { menus } = this.utils
    , { name } = this.$state.current
    , menu = this.utils.fl('filter', menus, { state: name })[0]

    this.createMenu(menu)
    this.slides = this.utils.createSlider()
    $(() => {
      this.initPaypal()
      $('#buyModal').on('shown.bs.modal', e => {
        l('modal opened')
        this.$timeout(() => { this.slides = this.utils.createSlider() }, 0)
      })
      $('#buyModal').on('hidden.bs.modal', e => {
        l('modal closed')
        this.formData.activeStep = 0
      })
    })
  }
  initPaypal(){
    paypal.Buttons({
      onInit: (data, actions) => {
        l("Paypal Init")
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
      onCancel: data => {
        l('Cancelled', data)
        this.showLoader = false
        this.$scope.$apply()
      }
    })
    .render('#ctn-pp-btn')
  }
  new(p){
    if(confirm('Möchten Sie wirklich ein neues Dokument erstellen?')){
      // this.createMenu(p)

      let stateToNavigate = 'allgemein'
      switch(p.title){
        case 'Sushi': stateToNavigate = 'sushi'; break;
        case 'Pizza': stateToNavigate = 'pizza'; break;
        default: break;
      }

      this.$state.go(stateToNavigate)
    }
  }
  createMenu(menu){
    this.showLoader = true

    const linkData = this.utils.createLink(menu.state)

    this.editLink = linkData.editLink
    this.viewLink = linkData.viewLink

    this.idx = this.menus.indexOf(menu)
    this.menu = angular.copy(menu)
    this.menu.id = linkData.id
    this.menu.isDark = false
    this.addMenuPage()

    $(() => {
      this.utils.createQRCode(this.menu.qrLogo, this.viewLink)
      this.utils.qrObj.toImage().catch(err => l(err))
    })
  }
  addMenuPage(){
    l("add page")
    this.focusedEl = null
    this.menu.pages.push({
      fields: angular.copy(this.menu.fields),
      titles: angular.copy(this.menu.titles),
    })
    this.menu.activePage = this.menu.pages.length - 1
    this.totalFields = this.menu.pages.reduce((prev, curr) => prev + curr.fields.length, 0)
  }
  zoomFn(dir){ this.zoom = this.utils.zoom(this.zoom, dir) }
  focusFn(dir){ this.utils.focus(dir, this.focusedEl, this.menu) }
  toggleVeg(type){
    // l(this.focusedEl, this.menu.fields, type)
    if(!this.focusedEl) return
    const el = this.focusedEl
    , currField = this.menu.pages[el.page].fields[el.field]

    if(currField.vegType === type) currField.vegType = null
    else currField.vegType = type
  }
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
  openPDF(){
    this.showLoader = true
    this.utils
    .saveMenu(this.menu)
    .then(res => {
      l(res)
      this.showLoader = false
      window.open(this.viewLink,'_blank');
    })
  }
  saveOrder(details){
    l(this.formData, details)

    this.utils
    .saveOrder({
      ...this.formData, ...details
      , menuId: this.menu.id
      , qrCodeImg: $("#ctn-qr").prop('src')
    })
    .then(res => {
      l(res)
      this.showLoader = false
      alert(res.message)

      // Send for download
      this.utils.qrObj.downloadImage("QRCode")
    })
  }
}
