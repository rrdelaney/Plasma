import { uuid } from 'nucleus'

export default class Stylesheet {
  static rules = [];
  
  static create (rules) {
    let instanceClasses = {}
    
    const addRules = (rules, prefix = '', postfix = '') => {
      let instanceRules = []
      
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
            const newClassName = '_' + uuid()
            
            instanceClasses[rule] = newClassName
            addRules(rules[rule], `${prefix} .${newClassName}`, postfix)
          }
        } else {
          instanceRules.push(`${rule}: ${rules[rule]};`)
        }
      })
      
      if (instanceRules.length > 0) {
        Stylesheet.rules.unshift(`${prefix} {\n${instanceRules.map(r => '  ' + r).join('\n')}\n}${postfix}`)
      }
    }
    
    addRules(rules)
    
    return instanceClasses
  }
  
  static render () {
    let style = document.createElement('style')
    style.innerHTML = Stylesheet.rules.join('\n')
    document.body.appendChild(style)
  }
}