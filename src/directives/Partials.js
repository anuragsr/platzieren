import hTpl from '../templates/header.html'
import fTpl from '../templates/footer.html'
import lTpl from '../templates/loader.html'

const Header = () => ({ template: hTpl, restrict: 'E' })
, Footer = () => ({ template: fTpl, restrict: 'E' })
, Loader = () => ({ template: lTpl, restrict: 'E' })

export { Header, Footer, Loader }

