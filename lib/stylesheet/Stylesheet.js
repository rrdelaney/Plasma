import Prefixer from 'inline-style-prefixer'
import { uuid } from 'nucleus'

export default class Stylesheet {
  static rules = [];
  static components = [];
  
  static create (rules, identifier = '') {
    let instanceClasses = {}
    
    const hyphenate = name => name
      .replace('Webkit', '-webkit')
      .replace(/^ms/g, '-ms')
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
    
    const addRules = (rules, prefix = '', postfix = '') => {
      let instanceRules = {}
      
      Object.keys(rules).forEach(rule => {
        if (typeof rules[rule] === 'object') {
          if (rule[0] === '@') {
            addRules(rules[rule], `${prefix} ${rule} {`, `} ${postfix}`)
          } else if (rule[0] === ':') {
            addRules(rules[rule], `${prefix}${rule}`, postfix)
          } else if (rule[0] === '#') {
            addRules(rules[rule], `${prefix} ${rule}`, postfix)
          } else if (rule[0] === '%') {
            addRules(rules[rule], `${prefix} ${rule.substr(1)}`, postfix)
          } else {
            const newClassName = identifier
              ? '_' + identifier + '_' + rule
              : '_' + uuid()
            
            instanceClasses[rule] = newClassName
            addRules(rules[rule], `${prefix} .${newClassName}`, postfix)
          }
        } else if (rule === '@import') {
          Stylesheet.rules.unshift({ rule: `@import ${rules[rule]}` })
        } else {
          instanceRules[rule] = rules[rule]
        }
      })
      
      if (Object.keys(instanceRules).length > 0) {
        const prefixed = Prefixer.prefixAll(instanceRules)
        const instanceStyleSheet = Object.keys(prefixed)
          .map(rule => `  ${hyphenate(rule)}: ${prefixed[rule]};`)
          .join('\n')
          
        Stylesheet.rules.push({ component: identifier, rule: `${prefix} {\n${instanceStyleSheet}\n}${postfix}` })
      }
    }
    
    addRules(rules)
    
    if (identifier) {
      Stylesheet.components.push(identifier)
    }
    
    return instanceClasses
  }
  
  static getCSS () {
    return {
      css: Stylesheet.rules.map(s => s.rule).join('\n'),
      name: Stylesheet.components.join('+')
    }
  }
  
  static removeStyles () {
    Array.from(document.styleSheets)
      .filter(sheet => sheet.ownerNode.getAttribute('data-stylesheet') === 'dynamic')
      .forEach(sheet => sheet.disabled = true)
  }
  
  static loadIntoDOM () {
    let newStyle = document.createElement('style')
    newStyle.setAttribute('data-stylesheet', 'dynamic')
    
    const preloadedStylesheet = Array.from(document.styleSheets)
      .filter(sheet => sheet.ownerNode.getAttribute('data-stylesheet') === 'static')[0]

    if (preloadedStylesheet) {
      const preloadedComponents = preloadedStylesheet.split('+')
      const unloadedComponents = Stylesheet.rules.filter(style => !preloadedComponents.includes(style.component))
      newStyle.innerHTML = unloadedComponents.map(s => s.rule).join('\n')
    } else {
      newStyle.innerHTML = Stylesheet.getCSS().css
    }
    
    document.head.appendChild(newStyle)
  }
}