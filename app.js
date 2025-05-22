const display = document.getElementById('display')

let current = ''
let previous = ''
let operator = ''
let resetDisplay = false

// Actualiza el display
// Se encarga de mostrar el resultado en el display y de manejar el caso de error
function updateDisplay (text) {
  if (text.toString().length > 9) {
    display.value = 'ERROR'
    current = ''
    previous = ''
    operator = ''
    return
  }

  display.value = text
}

// Agregar evento de teclado
function append (char) {
  if (display.value === 'ERROR') return

  if (resetDisplay) {
    current = ''
    resetDisplay = false
  }

  if (char === '.' && current.includes('.')) return
  if (current.length >= 9) return

  current += char
  updateDisplay(current)
}

// Gestiona las operaciones
function setOperator (op) {
  if (display.value === 'ERROR') return

  if (operator && current !== '') {
    operate() // Si se presiona una operación nuevamente, y para cada operación subsiguiente, se debe mostrar el resultado al momento de presionar la operación
  }

  operator = op
  previous = current
  current = ''
}

function operate () {
  const a = parseFloat(previous)
  const b = parseFloat(current)
  let result = 0

  if (isNaN(a) || isNaN(b)) return

  switch (operator) {
    case '+':
      result = a + b
      break
    case '-':
      result = a - b
      break
    case '*':
      result = a * b
      break
    case '/':
      result = b === 0 ? 'ERROR' : a / b
      break
    case '%':
      result = b === 0 ? 'ERROR' : a % b
      break
    default:
      return
  }

  if (typeof result === 'number') {
    if (result < 0 || result > 999999999) {
      current = ''
      previous = ''
      operator = ''
      updateDisplay('ERROR')
    } else {
      current = result.toString().slice(0, 9)
      updateDisplay(current)
    }
  } else {
    updateDisplay('ERROR')
    current = ''
    previous = ''
    operator = ''
  }

  resetDisplay = true
}

// Calcula al prsionar el igual
function calculate () {
  if (operator && current !== '') {
    operate()
  }
}

function clearDisplay () {
  current = ''
  previous = ''
  operator = ''
  resetDisplay = false
  updateDisplay('')
}

function toggleSign () {
  if (display.value === 'ERROR') return

  if (current.startsWith('-')) {
    current = current.slice(1)
  } else {
    if (current.length < 9) current = '-' + current
  }

  updateDisplay(current)
}
