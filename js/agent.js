// 玩家类
function Agent(maze){
	// public
	
	
	// private
	var _maze = maze;
	var _pathfinder = null;
	var _render = new Renderer();
	
	function start(){
		
	}
	
	function update(){
		
	}
	
	function setPathFinder(f){
		_pathfinder = f;
	}
	
	if(typeof Agent.single_instance === "undefined"){
		Agent.single_instance = this;
	}
	
	return 
}
