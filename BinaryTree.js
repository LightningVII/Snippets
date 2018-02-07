/**
 * @class BinaryTree
 * binary tree sort
 *
 * @example
 * const arr = [8, 3, 10, 1, 6, 14, 4, 7, 13]
 * const list = []
 * const route = new BinaryTree()
 * for (const i of arr) {
 *   BinaryTree.createTree(i, route)
 * }
 * BinaryTree.compareBinaryTree(route, key => list.push(key))
 * console.log(list)
 *
 */
class BinaryTree {
  constructor (param) {
    this.key = param || null
    this.left = null
    this.right = null
  }

  static insert (key, forward, node) {
    return (node[forward] = new BinaryTree(key))
  }

  static createTree (item, node) {
    if (node.key) {
      const forward = item > node.key ? 'right' : 'left'
      node[forward]
        ? BinaryTree.createTree(item, node[forward])
        : BinaryTree.insert(item, forward, node)
    } else {
      node.key = item
    }
  }

  static compareBinaryTree (node, action) {
    node.left && BinaryTree.compareBinaryTree(node.left, action)
    action(node.key)
    node.right && BinaryTree.compareBinaryTree(node.right, action)
  }
}
