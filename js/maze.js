/* **********************************************************************
* 迷宫生成算法= - =之后可以单独出来
*************************************************************************/

// 醉汉生成算法
// Unit 用于绘制生成过程
function DFS(maze,unit){
	console.log("迷宫生成模式 ： 醉汉寻路法 深度优先搜索");
	var col = maze.length;
	var row = maze[0].length;
	var start = {x:Math.floor(col/2),y:0};
	
	var path  = new Array();
	var impasse  = new Array();
	var rd = new Renderer();
	var u  = unit;
    
	var result = findPath();
	return maze;
	
	// 生成路径
	function findPath(){
		var next  = getIndex(start.x , start.y );
		if( maze[next.x][next.y] == 0){
			path.push(next);
			maze[next.x][next.y] = 1;
			draw("green",next.x,next.y);
			start = next;
			// 递归
			findPath();
		}else if(maze[next.x][next.y] == 1 || maze[next.x][next.y] == 2 || maze[next.x][next.y] == 3){
			// 当下一个点不为空 且不是终点，检测是否有路可走
			if(isTrap(start.x,start.y)){
				impasse.push(start);
				maze[start.x][start.y] = 2;
				draw("red",start.x,start.y);
				start = path.pop();
			}
			
			findPath();
			
		}else if(maze[next.x][next.y] == 4){
			return{
				path:path,
				impasse:impasse
			}
			
		}
	}
	
	// 获取方向
	function getDir() {
		var dir = ["South","East","North","West"];
		var x   = Math.floor(Math.random()*(dir.length));
		return dir[x];
	}
	
	// 获取坐标
	function getIndex(x,y){
		var d = getDir();
		var ny = y;
		var nx = x;
		switch (d) {
			case "South":
				ny --;
				break;
		    case "North":
				ny ++;
				break;
			case "West":
				nx --;
				break;
		    case "East":
				nx ++;
				break;
			
			default:
				break;
		}
		// if(nx < 0 || ny < 0 || nx >= col || ny >= row){
		// 	getIndex(x,y);
		// }
		if(nx < 0) nx =0;
		if(ny < 0) ny =0;
		if(nx >= col) nx = col -1;
		if(ny >= row) ny = row -1;
		var new_pos = {x:nx,y:ny};
		return new_pos;
	}
	
	// 检查是否无路可走
	function isTrap(x,y){
		if( (maze[x-1] && maze[x-1][y] == 0) || (maze[x][y+1] == 0) || (maze[x+1] && maze[x+1][y] == 0) || maze[x][y-1] == 0 )
		return false;
		else return true;
	}
	
	function draw(color,x,y){
		rd.renderShape("rect",color,{x:x*u.w + 10,y:10 + y*u.h},
				{w:u.w-20,h: u.h-20});
	}
}

function Kruskal(maze){
	
}