// manager the scene 
let instance_sm;

class SceneManager{
	constructor(canvas){
		this._agent = null;
		this._unit  = {w:90,h:90};
		// this._maze  = new Array();
		this._mazethickness = 0.3; //用于控制地图的墙体密度
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
		this._unit = {w:this._cvs.width/col,h:this._cvs.height/row};
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
		
		this._maze = maze;
		// 执行迷宫生成算法
		this.DFS(this._maze);
		// 清除迷宫可视化
		window.setTimeout(()=>{
			this._renderer.renderBackground();
			this.buildMaze();
		},1300);
	}
	
	buildMaze(){
		var maze = this._maze;
		var col = maze.length;
		var row = maze[0].length;
		
		for(let x = 0; x < col ; x++){
			for(let y = 0; y< row ; y++){
				switch (maze[x][y]){
					// create wall by random
					case 0:
					case 2:
						if(Math.random() < this._mazethickness){
							var wall = new Wall( this._unit.w , this._unit.h , this._cvs);
							wall.setPosition(x*this._unit.w,y*this._unit.h);
						}
						break;
						
					// create Agent
					case 3:
						this._renderer.renderShape("rect","lightblue",{x:x*this._unit.w + 5,y:5 + y*this._unit.h},
						{w:this._unit.w - 10,h: this._unit.h - 10});
						break;
					case 4:
						this._renderer.renderShape("circle","orange",{x:x*this._unit.w + 5,y:5 + y*this._unit.h},
						{r: (this._unit.h - 10) * 0.5});	
						break;
				}
			}
		}
		
		
	}
	
	// 刷新地图
	update(){
		var img_data = this._ctx.getImageData(0,0,canvas.width, canvas.height);
		this._ctx.putImageData(img_data);
	}
	
	
	// 设置基本单位
	set unit({x,y}){
		this._unit.w = x;
		this._unit.h = y;
	}
	get unit(){
		return this._unit;
	}
	
	// 获取迷宫标识
	get maze(){
		return this._maze;
	}
	
	/* **********************************************************************
	* 迷宫生成算法= - =之后可以单独出来
	*************************************************************************/
	
	// 醉汉生成算法
	DFS(maze = this._maze){
		console.log("迷宫生成模式 ： 醉汉寻路法 深度优先搜索");
		var col = maze.length;
		var row = maze[0].length;
		var start = {x:Math.floor(col/2),y:0};
		
		var path  = new Array();
		var impasse  = new Array();
		var rd = this._renderer;
		var u  = this._unit;
		
		var result = findPath();
		
		
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
			if( (maze[x-1] && maze[x-1][y] == 0) || (maze[x][y+1] == 0) || (maze[x+1] && maze[x+1][y] == 0) || maze[x][y-1] == 0 )
			return false;
			else return true;
		}
		
		function draw(color,x,y){
			rd.renderShape("rect",color,{x:x*u.w + 10,y:10 + y*u.h},
					{w:u.w-20,h: u.h-20});
		}
	}
	
	Kruskal(maze){
		
	}
}