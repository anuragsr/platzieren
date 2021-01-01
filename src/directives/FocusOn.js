import {l} from '../utils/helpers'
const FocusOn = $rootScope => ({
  scope: { focusOn: "=" },
  link: (scope, elem) => {
    // l(scope.focusOn, elem[0])
    scope.$on('focusOn', (e, fieldData) => {
     if(angular.equals(fieldData, scope.focusOn)) elem[0].focus()
    })

    elem.bind('focus', e => $rootScope.$broadcast('elFocused', scope.focusOn))
    // elem.bind('blur', e => $rootScope.$broadcast('elFocused', null))
  }
})

export default FocusOn
