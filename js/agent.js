// 玩家类
function Agent(maze,unit){
	// public
	this.speed = 10;
	
	this.setPathFinder = setPathFinder;
	this.setPosition = setPosition;
	this.getPosition = getPosition;
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
	
	
	// 忘了排除相等
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
			window.setTimeout(move,100);
		}
		// _dest_pos.x > _grid_pos.x ? _grid_pos.x += _speed / _unit.w : _grid_pos.x -= _speed / _unit.w ;
		// _dest_pos.y > _grid_pos.y ? _grid_pos.y += _speed / _unit.h : _grid_pos.y -= _speed / _unit.h ;
		
	}
	
	function setDestination(x,y) {
		// path = _pathfinder(x,y);
		_dest_pos = {x:x,y:y};
		if(_dest_pos != _grid_pos){
			
			move();
		}
	}
	
	function setPosition(x,y) {
		_grid_pos.x = x;
		_grid_pos.y = y;
		render();
	}
	function getPosition() {
		return _grid_pos;
	}
	
	// 脏矩，之后改成Render的 overRender方法
	var originImgData;//用于存放覆盖地区的原有图像数据
	function render(){
		if(originImgData != undefined){
			_renderer.putImageData(originImgData.imgData, originImgData.posX, originImgData.posY);
		}
		originImgData = {
			imgData : _renderer.getImageData(_grid_pos.x * _unit.w , _grid_pos.y * _unit.h , _unit.w , _unit.h),
			posX : _grid_pos.x* _unit.w,
			posY : _grid_pos.y * _unit.h,
			width: _unit.w,
			height:_unit.h 
		}
		// 绘制自己
		_renderer.renderShape("rect","lightblue",{x:_grid_pos.x*_unit.w + 5,y:5 + _grid_pos.y*_unit.h},
					{w:_unit.w - 10,h: _unit.h - 10});
	}
	
	
	// 设定寻路方法
	function setPathFinder(f){
		_pathfinder = f;
	}
	
	
	if(typeof Agent.single_instance === "undefined"){
		Agent.single_instance = this;
	}
	
	return Agent.single_instance;
}
