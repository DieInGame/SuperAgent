/* 
* 多种寻路算法的实现？
* 自行添加不同的寻路算法。
*/

// A 星寻路
function AStar(map,sx,sy,dx,dy) {
  
  var closeTree = new Array(); // 关闭列表
  var openTree  = new Array(); // 开启列表
  
  var startp = {x:sx,y:sy};
  var destp  = {x:dx,y:dy};
  
  
  function findNext(start,destination){
    var dir8 = [[1,0],[0,1],[-1,0],[0,-1],[1,1],[1,-1],[-1,-1],[-1,1]];
    
    for(let i = 0; i < dir8.length ; i++ ) {
      
      var point = map[ start.x + dir8[i][0] ][ start.y + dir8[i][1] ]
      // Check if the point is here
      if( point === undefined ){
        throw new Error("point is outside");
        
      } else if ( point === 4 ){
        // 找到了终点
        point.parent = start;
        
        
      } else if( point === 1 ){
        point.parent = start;
        map[ start.x + dir8[i][0] ][ start.y + dir8[i][1] ].isInTree = true;
        point.costG = Math.sqrt(dir8[i][0]*dir8[i][0] + dir8[i][1]*dir8[i][1]);
        openTree.push(point);
        
      }
      
    }
    
    closeTree.push(start);
    
    // 对开启列表中的坐标进行优劣判断，找寻最优点。
    var bestPoint,lowestCost;
    for(var x in openTree ) {
      var costF = calculateFGH(openTree[x],destination);
      if( lowestCost === undefined || costF < lowestCost ){
        lowestCost = costF;
        bestPoint = openTree[x];
      } 
    }
    // 将最优点扔进关闭列表，并从开合列表中删除它
    closeTree.push(bestPoint);
    // 
  }
  
  function calculateFGH(current,destination){
    var G = current.costG;
    var H = Math.abs(destination.y - current.y) + Math.abs(destination.x - current.x);
    return G + H;
  }
  
}



BFS(map, sx, sy, dx, dy) {
  var map_w = map.length；
  var map_h = map[0].length;
  
  if(dx < 0 || dy < 0 || dx > map_w || dy > map_h) {
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

    if(curNode === {x:dx , y:dy}/* curNode is destination */) {
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
