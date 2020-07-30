import { Select } from './select/Select'
import './index.sass'

const select = new Select('#select', {
  placeholder: 'Выбери елемент',
  // selectedId: '6',
  data: [
    { id: '1', value: 'React' },
    { id: '2', value: 'Angular' },
    { id: '3', value: 'Vue' },
    { id: '4', value: 'React Native' },
    { id: '5', value: 'Next' },
    { id: '6', value: 'Nest' },
    { id: '7', value: 'Gatsby' },
  ],
  onSelect(item) {
   console.log('ITEM --> ', item)
  }
})

window.s = select
