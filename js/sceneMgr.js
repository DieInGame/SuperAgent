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
				// 标记
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
		console.log("maze",maze);
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
	DFS(maze){
		// 获取方向
		function getDir() {
			
		}
	}
	
	Kruskal(maze){
		
	}
}