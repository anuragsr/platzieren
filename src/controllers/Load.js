import $ from 'jquery'
import { l } from '../utils/helpers'

export default class LoadCtrl {
  constructor($scope, $state, $stateParams, $timeout, utils) {
    this.$scope = $scope
    this.$state = $state
    this.menuId = $stateParams.lId
    this.$timeout = $timeout
    this.utils = utils

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
    $scope.$watch(() => this.formData.sz, (n, o) => {
      this.$timeout(() => { this.slides = this.utils.createSlider(n) }, 0)
    })

    this.init()
  }
  init(){
    this.utils
    .getMenu(this.menuId)
    .then(res => {
      l(res)
      if(!res.result) {
        alert(res.message); this.$state.go('allgemein')
      }
      else {
        this.menu = res.data.menu
        if(this.menu.title === 'Pizza') this.zoom = .8

        const menuData = this.utils.fl('filter', this.menus, { title: this.menu.title})[0]
        this.viewLink = this.utils.getViewLink(this.utils.IMG_URL, menuData.state, this.menuId)
        l(this.viewLink)
        this.menu.fields = menuData.fields
        this.menu.titles = menuData.titles
        this.totalFields = this.menu.pages.reduce((prev, curr) => prev + curr.fields.length, 0)

        $(() => {
          this.utils.createQRCode(this.menu.qrLogo, this.viewLink)
          this.utils.qrObj.toImage().catch(err => l(err))

          this.initPaypal()
          $('#buyModal').on('shown.bs.modal', e => {
            l('modal opened')
            this.$timeout(() => { this.slides = this.utils.createSlider(this.formData.sz) }, 0)
          })
          $('#buyModal').on('hidden.bs.modal', e => {
            l('modal closed')
            this.formData.activeStep = 0
          })
        })
      }
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
