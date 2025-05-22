const { createCalculator } = require('../js/calculadora.js')

describe('Calculadora', () => {
  let calc

  beforeEach(() => {
    calc = createCalculator()
  })

  //Suma básica
  test('suma básica: 2 + 3 = 5', () => {
    calc.input('2')
    calc.setOperator('+')
    calc.input('3')
    const result = calc.calculate()
    expect(result).toBe('5')
  })

  //Error a los negativos
  test('muestra ERROR si el resultado es negativo: 2 - 5', () => {
    calc.input('2')
    calc.setOperator('-')
    calc.input('5')
    const result = calc.calculate()
    expect(result).toBe('ERROR')
  })

  //No mas de 9 dígitos
  test('no permite más de 9 dígitos', () => {
    for (let i = 0; i < 10; i++) {
      calc.input('9')
    }
    expect(calc.getDisplay().length).toBeLessThanOrEqual(9)
  })

  //No más de un decimal en un número
  test('no permite más de un punto decimal en un número', () => {
    calc.input('3')
    calc.input('.')
    calc.input('1')
    calc.input('.')
    expect(calc.getDisplay()).toBe('3.1') // segundo punto se ignora
  })

  //División por cero
  test('división por cero da ERROR', () => {
    calc.input('5')
    calc.setOperator('/')
    calc.input('0')
    const result = calc.calculate()
    expect(result).toBe('ERROR')
  })

})
