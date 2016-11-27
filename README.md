
# Schemative
### Enhanced, declarative, schematic objects

-----------

<p align="center">
  <a href="https://travis-ci.org/sospedra/schemative"><img src="https://travis-ci.org/sospedra/schemative.svg?branch=master" alt="Build Status"></a>
  <a href="https://codeclimate.com/github/sospedra/schemative/coverage"><img src="https://codeclimate.com/github/sospedra/schemative/badges/coverage.svg" alt="Test Coverage"></a>
  <a href="https://codeclimate.com/github/sospedra/schemative"><img src="https://codeclimate.com/github/sospedra/schemative/badges/gpa.svg" alt="Code Climate"></a>
  <a href="https://snyk.io/test/github/sospedra/schemative/7f751bbf69ec44b63a37260ac4783a8a42b27e14"><img src="https://snyk.io/test/github/sospedra/schemative/7f751bbf69ec44b63a37260ac4783a8a42b27e14/badge.svg" alt="Known Vulnerabilities"></a>
  <a href="https://david-dm.org/sospedra/schemative"><img src="https://david-dm.org/sospedra/schemative/status.svg" alt="dependencies Status"></a>
  <a href="http://standardjs.com/"><img src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg" alt="js-standard-style"></a>
  <a href="https://www.npmjs.org/package/awesome-badges"><img src="https://img.shields.io/npm/dm/schemative.svg" alt="npm"></a>
</p>

-----------

Schemative is a tool that helps you write declarative objects.
It creates an object-like superstructure enhanced with the following features:

1. **Default values** depending the attribute defined type.
2. Declarative **replenish** by matching the schema.
3. Get the **React propTypes** definition following your schema.

## Why?

As a Javascript developer you'll find yourself facing three problems quite a lot of times:

1. You're **duplicating** your objects data all around: when creating them, when transforming, parsing, validating, etc.
2. You have to **dummy fill** the default values for some objects.
3. You have to **manual and imperatively modify** your objects. For example to avoid exposing the API response to the internal app state.

With Schemative you're gonna define your objects just once. So there's a clear and nuclear **single source of truth**.

Schemative also **enhance the objects with transformers and mutators**. Therefore, even the object modification are gonna be controlled at definition point.

## Yeah, but... Show me some code!

This is how you **declare** an object with Schemative:

```js
import * as Schemative from 'schemative'

const schema = Schemative.createSchema({
  name: Schemative.string,
  year: Schemative.number,
  address: Schemative.shape({
    city: Schemative.string,
    postalcode: Schemative.number
  })
})
```

If you want to get the **default values**:

```js
schema.Default
// {
//   name: '',
//   year: -1,
//   address: {
//     city: '',
//     postalcode: -1
//   }
// }
```

It can also return the **React propTypes**:
```js
MyReactComponent.propTypes = schema.PropTypes
```

Once you have an schema you can **replenish** it transforming with a filled object:

```js
const data = {
  name: 'Ada Lovelace',
  year: 1812,
  nope: 'Not defined in the schema'
}

schema.transform(data)
// {
//    name: 'Ada Lovelace',
//    year: 1812
// }
```

*Note how those attributes that wasn't defined are excluded.*

Transformers also works with mutators. **Mutators are agents that overrides the final output**. Can be a function which intake the candidate (object after being replenish) or a straight value. They came in 2 flavors: One, mutators can be executed on **run-time**:

```js
schema.transform(data, {
  name: (candidate) => candidate.name.toUpperCase(),
  extra: 'New param out of the definition can be added here'
})
// {
//    name: 'ADA LOVELACE',
//    extra: 'New param out of the definition can be added here'
// }
```
*Note that transform always returns a new object*

The **second flavor** is defined on **declarative time**:

```js
schema.transform.utators = {
  change: 'something'
}

schema.transform({})
// { change: 'something' }

schema.transform(data)
// {
//    name: 'Ada Lovelace',
//    change: 'something'
// }
```

## API

### Types

Used to generate the declarative schema.

| Type          | Default value | Required value  |
| ------------- |--------------:| ---------------:|
| any           |          true |               - |
| array         |            [] |               - |
| bool          |          true |               - |
| element       |         false |               - |
| func          |         *noop*|               - |
| instanceOf    |         false |               - |
| number        |            -1 |               - |
| node          |         false |               - |
| object        |            {} |               - |
| string        |            '' |               - |
| symbol        |        Symbol |               - |
| arrayOf       |             - |  *any primitve* |
| objectOf      |             - |  *any primitve* |
| oneOf         |             - |  *any primitve* |
| oneOfType     |             - |  *any primitve* |
| shape         |             - |              {} |

### createSchema({})

Needs and object containing the object structure definition. And **returns an schema**. It's the main function.

### schema.Default
Return object matching the structure filled with the default type values.

### schema.PropTypes

Return object matching the structure with the React.PropTypes.

### schema.transform({}, {}?)
Method used to replenish the schema. First argument is the one from where the schema is gonna take the values.

The second are the agent mutators. Those who are gonna enhance the final filled object. Each field can be either a function or a straight value.

### schema.transform.mutators
Assign an object an will be used a default mutator each time transform is called.
