/**
 * @class BinaryTree
 * binary tree sort
 *
 * @example
 * const arr = [8, 3, 10, 1, 6, 14, 4, 7, 13]
 * const tree = new BinaryTree(arr)
 * 
 * const list = []
 * BinaryTree.traverse(tree, _ => list.push(_))
 * console.log(list)
 *
 */
export default class BinaryTree {
  constructor(seed) {
    this.seed = seed
    this.root = {}
    return this.createTree()
  }

  createChildNode(val, forward, node) {
    return forward ?
      node[forward] = { val } : // 子节点
      node.val = val // 根节点
  }

  /* 打擂台，每个人都要上场，与已经入场参赛选手的过招 */
  createTree(arr) {
    for (const val of this.seed) {
      this.goFighting(val, this.root)
    }
    return this.root
  }

  /**
   * 擂台，打赢了和强的打，输了和弱的打，没有对手时，可以那把椅子占坑
   * 为自己在当前树中找到适合的位置
   * 
   * @param {any} val 当前入场选手
   * @param {any} node 已经入场的一群人
   */
  goFighting(val, node) {
    /** 
     * 判断是否为根节点，为根节点 val 赋值，
     * 没对手运气好，第一个入场来的，直接占座，
     * 早起的鸟儿有有虫吃，
     * 之后每一个入场打选手，都要与之打一架
    */
    if (!node.val) {
      return this.createChildNode(val, '', node)
    }

    /** 
     * 判断接下来是和强的还是弱的打架
     * 如果大于所比较对象，那么去找此节点右侧的比（打赢了，找更强的打）
     * 小于或等于，去节点的左侧比（打输了，找更弱的打）
    */
    const forward = val > node.val ? 'right' : 'left'

    /** 
     * 看看有没有打架对象，有就继续去打，没有更强的或更弱的，则可以占坑
     *（没有对象可打时，就不打了，搬把椅子一边歇着）
    */
    return node[forward]
      ? this.goFighting(val, node[forward])
      : this.createChildNode(val, forward, node)
  }

  static traverse(node, print) {
    // print && print(node.val)  /* 前序遍历，克隆树 */
    node.left && this.traverse(node.left, print) // 阻塞
    // print && print(node.val) /* 中序遍历，排序 */
    node.right && this.traverse(node.right, print)
    print && print(node.val) /* 后序遍历，遍历系统文件 */
    return
  }

  static has(node, val) {
    if (val === node.val) {
      return node
    }

    const forward = val > node.val ? 'right' : 'left'
    return node[forward] ? this.has(node[forward], val) : false
  }

  static min(node, val) {
    return node.left ? this.min(node.left, val) : node.val
  }

  static max(node, val) {
    return node.right ? this.max(node.right, val) : node.val
  }
}

const arr = [3, 10, 24, 7, 8, 13, 4, 5, 2, 6, 15, 12, 11, 14, 18, 17, 16, 1]
const tree = new BinaryTree(arr)

const list = []
BinaryTree.traverse(BinaryTree.has(tree, 7), _ => list.push(_))
console.log(list)
console.log(BinaryTree.max(tree))
console.log(BinaryTree.min(tree))
