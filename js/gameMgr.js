// 
class GameManager{
	constructor(){
		// public
		this._delay = 2;
		
		this._level = 0;
		this._sceneMgr = null;
		this._instance = null;
		
		this._enemys   = new Array();
		
		this.awake();
	}
	
	static getInstance(){
		if(!this._instance){
			this._instance = this;
		}else if(this._instance != this){
			this._instance = new GameManager();
		}
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