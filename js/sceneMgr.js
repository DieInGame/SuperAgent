// manager the scene 
let instance_sm;

class SceneManager{
	constructor(canvas){
		this._agent = null;
		this._unit  = {w:90,h:90};
		// this._maze  = new Array();
		this._cvs   = canvas;
		this._ctx   = canvas.getContext("2d");
		this._renderer  = Renderer(this._cvs);
		if(!instance_sm){
			instance_sm = this;
		}
		return instance_sm;
	}
	
	// 创建迷宫可以使用不同的算法
	createScene(){
		var row = Math.ceil(this._cvs.height/this._unit.h , 10);
		var col = Math.ceil(this._cvs.width/this._unit.w , 10);
		var maze = new Array();
		
		for(let x = 0 ; x < col ; x++ ) {
			maze[x] = new Array();
			for(let y = 0 ; y < row ; y++) {
				// 标记 0 空，1 路径，2 死点，3 起点，4 终点
				if(x == parseInt(col/2,10) && y == 0){
					
					// agent
					maze[x][y] = 3;
					this._renderer.renderShape("rect","lightblue",{x:x*this._unit.w + 5,y:5 + y*this._unit.h},
					{w:this._unit.w - 10,h: this._unit.h - 10});
					
				}else if(x == parseInt(col/2,10)+1 && y == row -2) {
					
					// end
					maze[x][y] = 4;
					this._renderer.renderShape("circle","orange",{x:x*this._unit.w + 5,y:5 + y*this._unit.h},
					{r: (this._unit.h - 10) * 0.5});
					
				}else{
					// 标记为空
					maze[x][y] = 0;
					// 测试用填充
					this._renderer.renderShape("rect","black",{x:x*this._unit.w + 5,y:5 + y*this._unit.h},
					{w:this._unit.w - 10,h: this._unit.h - 10});
				}
							
			}
		}
		// console.log("maze",maze);
		this._maze = maze;
	}
	
	
	// 设置基本单位
	set unit({x,y}){
		this._unit.w = x;
		this._unit.h = y;
	}
	get unit(){
		return this._unit;
	}
	
	
	/* 
	* 迷宫生成算法= - =之后可以单独出来
	*/
	
	// 深度优先生成算法
	DFS(maze = this._maze){
		var col = maze.length;
		var row = maze[0].length;
		var start = {x:Math.floor(col/2),y:0};
		
		var path  = new Array();
		var impasse  = new Array();
		var rd = this._renderer;
		
		findPath();
		console.log(path,impasse);
		// for(let x in path){
		// 	this._renderer.renderShape("rect","green",{x:path[x].x*this._unit.w + 10,y:10 + path[x].y*this._unit.h},
		// 			{w:this._unit.w - 20,h: this._unit.h - 20});
		// }
		
		// for(let x in impasse){
		// 	this._renderer.renderShape("rect","red",{x:impasse[x].x*this._unit.w + 10,y:10 + impasse[x].y*this._unit.h},
		// 			{w:this._unit.w - 20,h: this._unit.h - 20});
		// }
		
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
			if( maze[x-1][y] == 0 || maze[x][y+1] == 0 || maze[x+1][y] == 0 || maze[x][y-1] == 0 )
			return false;
			else return true;
		}
		
		function draw(color,x,y){
			rd.renderShape("rect",color,{x:x*90 + 10,y:10 + y*90},
					{w:70,h: 70});
		}
	}
	
	Kruskal(maze){
		
	}
}