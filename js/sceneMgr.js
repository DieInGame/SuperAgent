// manager the scene 
let instance_sm;

class SceneManager{
	constructor(canvas){
		this._agent = null;
		this._unit  = {w:100,h:100};
		this._cvs   = canvas;
		this._ctx   = canvas.getContext("2d");
		
		if(!instance_sm){
			instance_sm = this;
		}
		return instance_sm;
	}
	
	createScene(){
		var row = Math.ceil(this._cvs.height/this._unit.h , 10);
		var col = Math.ceil(this._cvs.width/this._unit.w , 10);
		
		for(let x = 0 ; x < col ; x++ ) {
			for(let y = 0 ; y < row ; y++) {
				this._ctx.fillStyle = "#FF0000";
				this._ctx.fillRect(x*this._unit.w , y*this._unit.h,13,13);
			}
		}
	}
	
	
	// 设置基本单位
	set unit(u){
		this._unit.w = u.x;
		this._unit.h = u.y;
	}
	get unit(){
		return this._unit;
	}
}