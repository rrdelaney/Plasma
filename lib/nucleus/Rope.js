import uuid from './uuid'

export default class Rope {
  static SPLIT_LENGTH = 1000;
  static JOIN_LENGTH = 500;
  static REBALANCE_RATIO = 1.2;

  constructor (init = '') {
    this.id = uuid()
    this.value = init
    this.length = init.length

    this.adjust()
  }

  *nodes () {
    if (this.left) yield* this.left.nodes()
    if (this.value) yield this
    if (this.right) yield* this.right.nodes()
  }

  *[Symbol.iterator] () {
    yield* this.nodes()
  }

  insert (position, value) {
    if (position < 0 || position > this.length) throw new RangeError('position is not within rope bounds.')

    if (this.value !== undefined) {
      this.value = this.value.substring(0, position) + value.toString() + this.value.substring(position)
      this.length = this.value.length
      this.id = uuid()
    } else {
      let leftLength = this.left.length
      if (position < leftLength) {
        this.left.insert(position, value)
        this.length = this.left.length + this.right.length
      } else {
        this.right.insert(position - leftLength, value)
      }
    }

    this.adjust()
  }

  remove (start, end) {
    if (start < 0 || start > this.length) throw new RangeError('Start is not within rope bounds.')
    if (end < 0 || end > this.length) throw new RangexError('End is not within rope bounds.')
    if (start > end) throw new RangexError('Start is greater than end.')

    if (this.value !== undefined) {
      this.value = this.value.substring(0, start) + this.value.substring(end)
      this.length = this.value.length
      this.id = uuid()
    } else {
      const leftLength = this.left.length
      const leftStart = Math.min(start, leftLength)
      const leftEnd = Math.min(end, leftLength)
      const rightLength = this.right.length
      const rightStart = Math.max(0, Math.min(start - leftLength, rightLength))
      const rightEnd = Math.max(0, Math.min(end - leftLength, rightLength))

      if (leftStart < leftLength) {
        this.left.remove(leftStart, leftEnd)
      }

      if (rightEnd > 0) {
        this.right.remove(rightStart, rightEnd)
      }

      this.length = this.left.length + this.right.length
    }

    this.adjust()
  }

  rebuild () {
    this.value = this.left.toString() + this.right.toString()
    this.left = this.right = undefined
    this.id = uuid()
    this.adjust()
  }

  adjust () {
    if (this.value !== undefined) {
      if (this.length > Rope.SPLIT_LENGTH) {
        let divide = Math.floor(this.length / 2)
        this.left = new Rope(this.value.substring(0, divide))
        this.right = new Rope(this.value.substring(divide))
        this.value = undefined
        this.id = uuid()
      }
    } else {
      if (this.length < Rope.JOIN_LENGTH) {
        this.value = this.left.toString() + this.right.toString()
        this.left = this.right = undefined
        this.id = uuid()
      }
    }
  }
}
