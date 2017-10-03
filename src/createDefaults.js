import tsil from 'tsil'

export default (nodes) => {
  const defaultValues = tsil.modify(nodes, (node) => {
    return node.value
  })
  console.log(defaultValues.map(x => x.__tsil_value__))
  return tsil.deflatten(defaultValues)
}
