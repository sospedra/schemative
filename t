const S = require('./lib/schemative')
const tsil = require('tsil')

const simple = S.createSchema({
  apples: S.number,
  oranges: S.number(10),
  pears: S.number(10).isRequired,
  berries: S.number.isRequired,
  store: S.string('Fruitomatic'),
  isOpen: S.bool,
  more: S.any('whatever')
})

const complex = S.createSchema({
  apples: S.array([
    S.number(10),
    S.string('fruit')
  ]),
  store: S.shape({
    name: S.string('Fruitomatic'),
    isOpen: S.bool
  }),
  control: S.bool
})

console.log(complex.Default)
