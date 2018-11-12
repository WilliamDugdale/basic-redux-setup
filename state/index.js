import { node, when } from '../redux-nodes'

let root = node({count: 0});

when(root).seesAction('increment', (intervalInverse) => (1/intervalInverse)).it.reducesLikesThis((count) => count+1)

export default root