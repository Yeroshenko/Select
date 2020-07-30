import './select.sass'

const getTemplate = ({ placeholder, data = [], selectedId }) => {
  let text = placeholder || 'Дефолтный плейсхолдер'

  const items = data.map((item) => {
    let cls = ''

    if (item.id === selectedId) {
      text = item.value
      cls = 'selected'
    }

    return `
      <li class='select__item ${cls}' data-type='item' data-id=${item.id}>${item.value}</li>
    `
  })

  return `
    <div class='select__backdrop' data-type='backdrop'></div>
    <div class='select__input' data-type='input'>
      <span class='select__placeholder' data-type='value'>${text}</span>
    </div>
    <div class='select__dropdown'>
      <ul class='select__list'>
        ${items.join('')}
      </ul>
    </div>
  `
}

export class Select {
  constructor(selector, options) {
    this.$el = document.querySelector(selector)
    this.options = options
    this.selectedId = options.selectedId

    this.#render()
    this.#setup()
  }

  #render() {
    const { placeholder, data } = this.options

    this.$el.classList.add('select')
    this.$el.innerHTML = getTemplate({
      placeholder,
      data,
      selectedId: this.selectedId,
    })
  }

  #setup() {
    this.$el.addEventListener('click', this.clickHandler.bind(this))
    this.$value = this.$el.querySelector(`[data-type='value']`)
  }

  clickHandler(e) {
    const { type } = e.target.dataset

    type === 'input' && this.toggle()
    type === 'item' && this.select(e.target.dataset.id)
    type === 'backdrop' && this.close()
  }

  get current() {
    return this.options.data.find((item) => item.id === this.selectedId)
  }

  select(id) {
    this.selectedId = id
    this.$value.textContent = this.current.value

    this.$el
      .querySelectorAll(`[data-type='item']`)
      .forEach((item) => item.classList.remove('selected'))
    this.$el.querySelector(`[data-id='${id}']`).classList.add('selected')

    this.options.onSelect && this.options.onSelect(this.current)
    this.close()
  }

  get isOpen() {
    return this.$el.classList.contains('open')
  }

  toggle() {
    this.isOpen ? this.close() : this.open()
  }

  open() {
    this.$el.classList.add('open')
  }

  close() {
    this.$el.classList.remove('open')
  }

  destroy() {
    this.$el.removeEventListener('click', this.clickHandler)
    this.$el.innerHTML = ''
  }
}
