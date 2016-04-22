// manager the scene 
let instance_sm;

class SceneManager{
	constructor(canvas){
		this._agent = null;
		this._unit  = {w:50,h:50};
		this._cvs   = canvas;
		this._ctx   = canvas.getContext("2d");
		this._renderer  = Renderer(this._cvs);
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
				this._ctx.fillRect((x+0.5)*this._unit.w , y*this._unit.h,13,13);
			}
		}
	}
	
	
	// 设置基本单位
	set unit({x,y}){
		this._unit.w = x;
		this._unit.h = y;
	}
	get unit(){
		return this._unit;
	}
}