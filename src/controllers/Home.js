import ClipboardJS from 'clipboard/dist/clipboard.min'
import { l } from '../utils/helpers'

export default class HomeCtrl {
  constructor($scope, $timeout, utils) {
    this.utils = utils
    this.$scope = $scope

    this.showLoader = true
    this.activeSize = 'S'
    this.filledFields = 0
    this.zoom = 1
    this.idx = 0

    this.formData = {
      f: '', n: '',
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
    // $scope.$watch(() => this.formData, (newVal, oldVal) => {
    //   l(newVal, oldVal)
    // }, true)
    // $scope.$watch(() => this.payForm.$valid, (newVal, oldVal) => {
    //   l(newVal, oldVal)
    // }, true)
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
      // onInit is called when the button first renders
      onInit: (data, actions) => {
        l(data, actions)
        
        // Disable the buttons by default
        actions.disable()

        this.$scope.$watch(() => this.payForm.$valid, (newVal, oldVal) => {
          l(newVal, oldVal)
          if(newVal) actions.enable()
          else actions.disable()
        })

        // // Listen for changes to the checkbox
        // document
        // .querySelector('#check')
        // .addEventListener('change', function(event) {
        //
        //   // Enable or disable the button when it is checked or unchecked
        //   if (event.target.checked) {
        //     actions.enable();
        //   } else {
        //     actions.disable();
        //   }
        // });
      },
      // onClick is called when the button is clicked
      onClick: function() {

        // // Show a validation error if the checkbox is not checked
        // if (!document.querySelector('#check').checked) {
        //   document.querySelector('#error').classList.remove('hidden');
        // }
      },
      style: {
        layout: 'horizontal',
        tagline: false,
        height: 45,
        // shape:  'pill',
        // color:  'blue',
        // label:  'pay',
      },
      // Set up the transaction
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '14.99'
            }
          }]
        });
      },
      // Finalize the transaction
      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          // Show a success message to the buyer
          l('Transaction completed', details);
          // if(details.status === "COMPLETED"){
          //   $scope.goToPaymentResponse("success")
          // } else{
          //   $scope.goToPaymentResponse("failure")
          // }
        });
      },
      onError: function (err) {
        // Show an error page here, when an error occurs
        l('Error', err);
        // $scope.goToPaymentResponse("failure")
      },
      onCancel: function(data){
        l('Cancelled', data);
        // $scope.goToPaymentResponse("failure")
      }
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
