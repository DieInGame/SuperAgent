let instance = null; 

class GameManager{
	constructor(){
		
		this._delay = 2;
		
		this._level = 0;
		this._sceneMgr = null;
		this._instance = null;
		
		this._enemys   = new Array();
		
		//this.awake();
		
		// Singleton
		if(!instance){
			instance = this;
		}
		return instance;
	}
	
	
	
	// 确定必要参数准备
	awake(){
		if(!this._sceneMgr){
			throw new Error("No SceneManager to build Scene");
		}
		
		//  add 1 to level
		this._level ++;
		
		this.start();
	}
	start(){
		
	}
	
	update(){
		
	}
}