export default function update (component) {
  component.prototype.update = function (field) {
    return newValue => {
      this.setState({
        [field]: newValue
      })
    }
  }
}
