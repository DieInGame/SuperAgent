
// 
class Agent{
	constructor(name){
		this._name = name;
		this._instance = this;
		this._pathfind = null;
		this._getfile  = false;
	}
	
	start(){
		
	}
	
	update(){
		
	}
	
	
	// 获取实例
	get instance(){
		if(!this._instace){
			this._instance = new Agent("auto");
		}
		return this._instace;
	}
	
	// 设置寻路方法
	set pathfind(f){
		this._pathfind = f;
	} 
	get pathfind(){
		return this._pathfind;
	}
}