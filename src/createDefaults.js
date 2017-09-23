import tsil from 'tsil'

export default (nodes) => {
  const defaultValues = tsil.modify(nodes, (node) => node.value)

  return tsil.deflatten(defaultValues)
}
