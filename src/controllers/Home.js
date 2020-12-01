import $ from 'jquery'
import {l} from "../utils/helpers";

export default class HomeCtrl {
  constructor($scope, utils) {
    this.url = 'http://envisagecyberart.in'
    this.title = 'Platzieren'
    this.pages = [
      {
        title: 'Coffee',
        // tpl: 'templates/coffee.html',
        fields: []
      },
      {
        title: 'Sushi',
        // tpl: '../templates/japanese.html',
        // tpl: require('../templates/japanese.html').default,
        fields: [
          // { r: 0, p: 'Viola Vorlage,', v: '', id:'f0' },
          // { r: 0, p: 'Beispiel-Allee 11,', v: '', id:'f1' },
          // { r: 0, p: '12345 Musterdorf', v: '', id:'f2' },
          // { r: 0, p: 'Vorname Nachname,', v: '', id:'f3' },
          // { r: 0, p: 'Beispiel Strasse X,', v: '', id:'f4' },
          // { r: 0, p: '12345 Musterdorf', v: '', id:'f5' },
          // { r: 0, p: 'Beispiel-Allee 11', v: '', id:'f6' },
          // { r: 0, p: '12345 Musterdorf', v: '', id:'f7' },
          // { r: 0, p: '[EINGABEN EINFÜGEN]', v: '', id:'f8' },
          // { r: 0, p: '3 Zimmern, einer Küche, einem Bad mt WC und Dusche sowie einem Abstellraum', v: '', id:'f9' },
          // {
          //   r: 0, p: '-' + utils.space(3) + 'Küche\x0a-'
          //          + utils.space(3) + 'Bad\x0a-'
          //          + utils.space(3) + 'Abstellraum',
          //   v: '', id:'f10'
          // },
          // { r: 0, p: '[EINGABEN EINFÜGEN]', v: '', id:'f11' },
          // {
          //   r: 0, p: '-' + utils.space(3) + 'ein Wohnungsschlüssel\x0a-'
          //          + utils.space(3) + 'ein Schlüssel für die untere Eingangstür',
          //   v: '', id:'f12'
          // },
          // { r: 0, p: '[DATUM]', v: '', id:'f13' },
          // { r: 0, p: '[DATUM]', v: '', id:'f14' },
          // { r: 0, p: '[BETRAG]', v: '', id:'f15' },
          // { r: 0, p: '[BETRAG]', v: '', id:'f16' },
          // { r: 0, p: '[BETRAG]', v: '', id:'f17' },
          // { r: 0, p: 'Viola Vorlage', v: '', id:'f18' },
          // { r: 0, p: 'Musterdorfer Bank', v: '', id:'f19' },
          // { r: 0, p: 'IBAN: 1234567', v: '', id:'f20' },
          // { r: 0, p: 'BIC: MUSTERBANK', v: '', id:'f21' },
          // { r: 0, p: '[BETRAG]', v: '', id:'f22' },
          // { r: 0, p: '[EINGABEN EINFÜGEN]', v: '', id:'f23' },
          // { r: 0, p: 'Musterdorf', v: '', id:'f24' },
          // { r: 0, p: '[DATUM]', v: '', id:'f25' },
          // { r: 0, p: '[VORNAME NACHNAME]', v: '', id:'f26' },
          // { r: 0, p: '[VORNAME NACHNAME]', v: '', id:'f27' },
        ]
      },
      {
        title: 'Pizza',
        // tpl: 'templates/pizza.html',
        fields: []
      },
    ]
    this.page = {}
    this.init()
    $scope.$on('$viewContentLoaded', function(){
      l("===> Called on View Load")
    })
  }
  init(){
    const { pages } = this
    this.doNew(pages[0])
    // this.doNew(pages[1])
  }
  new(p){
    if(confirm('Möchten Sie wirklich ein neues Dokument erstellen?')) this.doNew(p)
  }
  doNew(page){
    this.page = angular.copy(page)
  }
  invokeMethod(){
    return "Hello";
  }
}
