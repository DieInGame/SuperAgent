/* 
* 多种寻路算法的实现？
* 自行添加不同的寻路算法。
*/

BFS(map, sx, sy, dx, dy) {
  if(/* dx, dy is outside the map */) {
    // 如果说目标点在地图外
    return false;
  }

  let nodeTree = [];
  let queue = [];

  /* nodeTree[sx][sy] = { x: sx, y: sy }; */
  // 将起点的父节点设为自身
  
  queue.push({ x: sx, y: sy });

  while(queue.length) {
    let curNode = queue.shift();

    if(/* curNode is destination */) {
      // 如果当前节点是目的地, 因为 nodeTree 保存了每个节点的父节点, 可以回溯找到路径上所有节点
    }

    let dir = [[0, -1], [1, 0], [0, 1], [-1, 0]];

    for(let i = 0, i < 4; i++) {
      let nextNode = { x: curNode.x + dir[i][0], y: curNode.y + dir[i][1] };
      if(/* nextNode is inside the map and nextNode is can walk through(there is no wall or master on the node) and nextNode never been visited(Not in nodeTree) */) {
         // 如果 nextNode 在地图内, 可以通过, 并且从未走过(不在 nodeTree 中)
         queue.push(nextNode);
      }
    }
  }
}
