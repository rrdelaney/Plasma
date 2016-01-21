import md5 from 'js-md5'
import Stylesheet from './Stylesheet'

export default function useStyle (styles) {
  return function (component) {     
    const hash = md5(component.toString())
    
    component.prototype.styles = Stylesheet.create(styles, hash)
  }
}