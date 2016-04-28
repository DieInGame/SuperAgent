// GameManager
function GameManager(canvas){
	// public  variables & function
	this.name = "GM1";
	this.start= start;
	
	// private variable
	var _canvas=canvas;
	var _delay = 2;
		
	var _level = 0;
	var _sceneMgr = null;		
	var _enemys   = new Array();
		
	
	awake();
	
	function awake(){
		if(!_canvas) {
			throw new Error("there is no more canvas");
		}
		if(!_sceneMgr){
			// throw new Error("No SceneManager to build Scene");
			window.console.log("create new SceneManager");
			_sceneMgr = new SceneManager( _canvas);
		}
		
		//  add 1 to level
		_level ++;
		
		start();
	}
	
	function start(){
		
		_sceneMgr.createScene();
		
	}
	
	function update(){
		
	}
	
	// Singleton
	if(typeof GameManager.single_instance==="undefined"){  
        GameManager.single_instance=this;//single_instance则是类属性，这个也可以实现单例，类属性和私有属性不同，类属性是类实例公用的   
    }  
	return GameManager.single_instance;
}

