import { StyleSheet } from './index'
import { loadIntoDOM, removeFromDOM } from './dom'

export function applyStyles (styles) {
  return component => {
    const identifier = component.name || '_' + Object.keys(styles).join('_')
    const classNames = StyleSheet.create(styles, identifier)

    component.styles = classNames
    component.prototype.styles = classNames

    if (module && module.hot) {
      module.hot.accept()
      removeFromDOM(StyleSheet)
      loadIntoDOM(StyleSheet)
    }
  }
}
