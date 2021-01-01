import {l} from '../utils/helpers'
const FileRead = () => ({
  scope: { fileread: "=" },
  require: "ngModel",
  link: (scope, elem, attrs, ngModel) => {
    elem.bind("change", changeEvent => {

      const reader = new FileReader()
      , { files } = changeEvent.target

      ngModel.$setViewValue(files)
      files.length && reader.readAsDataURL(files[0])
      reader.onload = loadEvent => {
        scope.$apply(() => scope.fileread = loadEvent.target.result)
      }
    })
  }
})

export default FileRead
