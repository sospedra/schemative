const Schemative = require('schemative')
const axios = require('axios')

const schema = Schemative.createSchema({
  Title: Schemative.string,
  Year: Schemative.number
})

const getSchemaWithMutators = () => {
  const schemaWithMutators = Schemative.createSchema({
    Title: Schemative.string
  })

  schemaWithMutators.transform.mutators = {
    Director: (candidate) => ({
      name: candidate.Director.split(' ').shift(),
      lastname: candidate.Director.split(' ').pop()
    })
  }

  return schemaWithMutators
}

axios('http://www.omdbapi.com/?t=Blade+runner&plot=short&r=json')
  .then((response) => {
    let movie = {}

    // Purification of the API response. Just return those attributes existing
    // in the schema definition
    movie = schema.transform(response.data)
    console.log('\nAfter basic transform\n', movie)

    // You can also mutate the final candidate
    movie = schema.transform(response.data, {
      Country: (candidate) => candidate.Country.split(', ')
    })
    console.log('\nAfter mutator transform\n', movie)

    // Mutators can be also static props
    movie = schema.transform(response.data, {
      extra: 'param'
    })
    console.log('\nAfter static mutator transform\n', movie)

    // Or even you could define the default mutators at declare time
    movie = getSchemaWithMutators().transform(response.data)
    console.log('\nAfter declarative mutations\n', movie)
  })
