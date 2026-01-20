const { isMinor } = require('../src/utils/date');

describe('isMinor', () => {

  test('devuelve true si la persona es menor de edad', () => {
    const result = isMinor('2010-01-01');
    expect(result).toBe(true);
  });

  test('devuelve false si la persona es mayor de edad', () => {
    const result = isMinor('1990-01-01');
    expect(result).toBe(false);
  });

});

