// 玩家类
function Agent(maze,unit){
	// public
	this.speed = 10;
	
	this.setPathFinder = setPathFinder;
	this.setPosition = setPosition;
	this.setDestination = setDestination;
	
	// private
	var _maze = maze;
	var _unit = unit;
	var _pathfinder = null;
	var _renderer = new Renderer();
	var _grid_pos = {x:0,y:0};
	var _dest_pos = {x:0,y:0};
	var _speed = this.speed;
	
	start();
	
	function start(){
		if( _pathfinder === null){
			console.log("use default pathfinder");
			// _pathfinder = 
		}

	}
	
	function update(){
		move();
		render();
	}
	
	// 忘了排出相等
	function move() {
		if(_dest_pos.x > _grid_pos.x){
			_grid_pos.x += 1/_speed;
		}else if (_dest_pos.x < _grid_pos.x){
			_grid_pos.x -= 1/_speed;
		}
		
		if (_dest_pos.y > _grid_pos.y) {
			_grid_pos.y += 1/_speed;
		} else if(_dest_pos.y < _grid_pos.y) {
			 _grid_pos.y -= 1/_speed ;
		}
		render();
		if(_dest_pos != _grid_pos){
			move();
		}
		// _dest_pos.x > _grid_pos.x ? _grid_pos.x += _speed / _unit.w : _grid_pos.x -= _speed / _unit.w ;
		// _dest_pos.y > _grid_pos.y ? _grid_pos.y += _speed / _unit.h : _grid_pos.y -= _speed / _unit.h ;
		
	}
	
	function setDestination(x,y) {
		// path = _pathfinder(x,y);
		_dest_pos = {x:x,y:y};
		if(_dest_pos != _grid_pos){
			window.setTimeout(move,1000);
		}
	}
	
	function setPosition(x,y) {
		_grid_pos.x = x;
		_grid_pos.y = y;
		render();
	}
	
	function render(){
		_renderer.renderShape("rect","lightblue",{x:_grid_pos.x*_unit.w + 5,y:5 + _grid_pos.y*_unit.h},
					{w:_unit.w - 10,h: _unit.h - 10});
	}
	
	function setPathFinder(f){
		_pathfinder = f;
	}
	
	if(typeof Agent.single_instance === "undefined"){
		Agent.single_instance = this;
	}
	
	return Agent.single_instance;
}
