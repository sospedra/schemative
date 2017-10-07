import tsil from 'tsil'

export default (nodes) => {
  const defaultValues = tsil.modify(nodes, (node) => {
    return node.value
  })

  return tsil.deflatten(defaultValues)
}
