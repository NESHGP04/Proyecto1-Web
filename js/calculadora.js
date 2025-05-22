//Versión testeable de mi lógica

function createCalculator () {
  let current = ''
  let previous = ''
  let operator = ''
  let resetDisplay = false

  const MAX_LEN = 9
  const MAX_VAL = 999999999

  function getDisplay () {
    return current
  }

  function input (char) {
    if (resetDisplay) {
      current = ''
      resetDisplay = false
    }

    if (char === '.' && current.includes('.')) return current
    if (current.length >= MAX_LEN) return current

    current += char
    return current
  }

  // function setOperator (op) {
  //   if (operator && current !== '') {
  //     operate()
  //   }

  //   operator = op
  //   previous = current
  //   current = ''
  // }

  function setOperator (op) {
    if (operator && current !== '') {
      const result = operate()
      if (result === 'ERROR') {
        current = 'ERROR'
        previous = ''
        operator = ''
        resetDisplay = true
        return
      }
      previous = result
      current = ''
    } else if (current !== '') {
      previous = current
      current = ''
    }

    operator = op
  }

  function operate () {
  const a = parseFloat(previous)
  const b = parseFloat(current)
  let result = 0

  if (isNaN(a) || isNaN(b)) return 'ERROR'

  switch (operator) {
    case '+': result = a + b; break
    case '-': result = a - b; break
    case '*': result = a * b; break
    case '/': result = b === 0 ? 'ERROR' : a / b; break
    case '%': result = b === 0 ? 'ERROR' : a % b; break
    default: return 'ERROR'
  }

  if (typeof result !== 'number' || result < 0 || result > 999999999) {
    return 'ERROR'
  }

  return result.toString()
}


  function calculate () {
    return operate()
  }

  function toggleSign () {
    if (current.startsWith('-')) {
      current = current.slice(1)
    } else {
      if (current.length < MAX_LEN) current = '-' + current
    }
    return current
  }

  function clear () {
    current = ''
    previous = ''
    operator = ''
    resetDisplay = false
    return current
  }

  return {
    input,
    setOperator,
    calculate,
    toggleSign,
    clear,
    getDisplay
  }
}

module.exports = { createCalculator }