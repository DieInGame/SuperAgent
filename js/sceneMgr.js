// manager the scene 
function SceneManager(canvas){
	// public
	this.createScene = createScene;
	this.moveAgent   = moveAgent;
	this.update      = update;
	this.setUnit	 = setUnit;
	this.getUnit	 = getUnit;
	this.getMaze	 = getMaze;
	
	// private
	var _agent = null;
	var _unit  = {w:90,h:90};
	var _maze;
	var _mazethickness = 0.3; //用于控制地图的墙体密度
	var _cvs   = canvas;
	var _ctx   = canvas.getContext("2d");
	var _renderer  = new Renderer();
	var _background_src;
	
	function createScene(){
		var row = Math.ceil(_cvs.height/_unit.h , 10);
		var col = Math.ceil(_cvs.width/_unit.w , 10);
		_unit = {w:_cvs.width/col,h:_cvs.height/row};
		var maze = new Array();
		
		for(let x = 0 ; x < col ; x++ ) {
			maze[x] = new Array();
			// 初始化场景
			for(let y = 0 ; y < row ; y++) {
				// 标记 0 空，1 路径，2 死点，3 起点，4 终点
				if(x == parseInt(col/2,10) && y == 0){
					
					// agent
					maze[x][y] = 3;
					_renderer.renderShape("rect","lightblue",{x:x*_unit.w + 5,y:5 + y*_unit.h},
					{w:_unit.w - 10,h: _unit.h - 10});
					
				}else if(x == parseInt(col/2,10)+1 && y == row -2) {
					
					// end
					maze[x][y] = 4;
					_renderer.renderShape("circle","orange",{x:x*_unit.w + 5,y:5 + y*_unit.h},
					{r: (_unit.h - 10) * 0.5});
					
				}else{
					// 标记为空
					maze[x][y] = 0;
					// 测试用填充
					_renderer.renderShape("rect","black",{x:x*_unit.w + 5,y:5 + y*_unit.h},
					{w:_unit.w - 10,h: _unit.h - 10});
				}
							
			}
		}
		
		_maze = maze;
		// 执行迷宫生成算法
		_maze = DFS(_maze,_unit);
		// 清除迷宫可视化
		window.setTimeout(()=>{
			_renderer.renderBackground();
			buildMaze();
		},1300);
		
	}	
	
	function buildMaze() {
		var maze = _maze;
		var col = maze.length;
		var row = maze[0].length;
		var ag_pos;
		
		// 建立 迷宫，并不绘制特工，需要保存背景图像数据
		for(let x = 0; x < col ; x++){
			for(let y = 0; y< row ; y++){
				switch (maze[x][y]){
					// create wall by random
					case 0:
					case 2:
						if(Math.random() < _mazethickness){
							var wall = new Wall( _unit.w , _unit.h , _cvs);
							wall.setPosition(x*_unit.w,y*_unit.h);
						}
						break;
						
					// create Agent
					case 3:
						ag_pos = {x:x,y:y};
						break;
					case 4:
						_renderer.renderShape("circle","orange",{x:x*_unit.w + 5,y:5 + y*_unit.h},
						{r: (_unit.h - 10) * 0.5});	
						break;
				}
			}
		}
		_background_src = _ctx.getImageData(0,0,_cvs.width,_cvs.height);
		
		// 绘制人物
		_agent = new Agent(_maze , _unit);
		_agent.setPosition(ag_pos.x,ag_pos.y);
		
	}
	
	
	function update(){
		
	}
	
	function moveAgent(e) {
		
		var touch = e.changedTouches[0];
		var x = parseInt(touch.pageX / _unit.w , 10);
		var y = parseInt(touch.pageY / _unit.h , 10);
		_agent.setDestination(x,y);
		
	}
	
	// 设置基本单位
	function setUnit({x,y}){
		_unit.w = x;
		_unit.h = y;
	}
	function getUnit(){
		return _unit;
	}
	
	// 获取迷宫标识
	function getMaze(){
		return _maze;
	}
	
	// Singleton
	if(typeof SceneManager.single_instance === "undefined"){
		SceneManager.single_instance = this;
	}
	return SceneManager.single_instance;
}
