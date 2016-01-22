import md5 from 'js-md5'
import Stylesheet from './Stylesheet'

export default function useStyle (identifier, styles) {
  return function (component) {
    const hash = md5(identifier) 
    component.styles = Stylesheet.create(styles, hash)
    component.prototype.styles = Stylesheet.create(styles, hash)
    
    if (module && module.hot) {
      module.hot.accept()
      Stylesheet.removeStyles()
      Stylesheet.loadIntoDOM()
    }
  }
}