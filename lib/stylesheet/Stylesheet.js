import Prefixer from 'inline-style-prefixer'
import { uuid } from 'nucleus'

export default class Stylesheet {
  static rules = [];
  
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
          Stylesheet.rules.unshift(`@import ${rules[rule]}`)
        } else {
          instanceRules[rule] = rules[rule]
        }
      })
      
      if (Object.keys(instanceRules).length > 0) {
        const prefixed = new Prefixer().prefix(instanceRules)
        const instanceStyleSheet = Object.keys(prefixed)
          .map(rule => `  ${hyphenate(rule)}: ${prefixed[rule]};`)
          .join('\n')
          
        Stylesheet.rules.push(`${prefix} {\n${instanceStyleSheet}\n}${postfix}`)
      }
    }
    
    addRules(rules)
    
    return instanceClasses
  }
  
  static getCSS () {
    return Stylesheet.rules.join('\n')
  }
  
  static load () {
    let style = document.createElement('style')
    style.innerHTML = Stylesheet.getCSS()
    document.body.appendChild(style)
  }
}