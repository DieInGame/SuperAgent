let instance_gm = null; 

class GameManager{
	constructor(canvas){
		this._canvas=canvas;
		this._delay = 2;
		this._instance = this;
		
		this._level = 0;
		this._sceneMgr = null;		
		this._enemys   = new Array();
		
		this.awake();
		
		this._time = new Date();
		this._instance = null;
		// Singleton
		if(!instance_gm){
			instance_gm = this;
		}/*else if(instance_gm != this){
			console.log("delete other instance");
			delete(this);
		}*/
		
		return instance_gm;
	}
	
	static getInstance(cvs){
		if(!this._instance){
			
			this._instance = new GameManager(cvs);
		}
		return this._instance;
	}
	
	// 确定必要参数准备
	awake(){
		if(!this._canvas) {
			throw new Error("there is no more canvas");
		}
		if(!this._sceneMgr){
			// throw new Error("No SceneManager to build Scene");
			window.console.log("create new SceneManager");
			this._sceneMgr = new SceneManager(this._canvas);
		}
		
		//  add 1 to level
		this._level ++;
		
		this.start();
	}
	start(){
		this._sceneMgr.createScene();
	}
	
	update(){
		
	}
}