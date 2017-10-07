import tsil from 'tsil'

export default (nodes) => {
  const propTypes = tsil.modify(nodes, (node) => {
    return node.propType
  })

  return tsil.deflatten(propTypes)
}
