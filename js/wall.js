// 障碍物类
class Wall{
    constructor(w,h,cvs){
        this._width = w;
        this._height = h;
        this._x = 0 ;
        this._y = 0 ;
        this._renderer = Renderer(cvs);
    }
    
    renderWall(){
        this._renderer.renderShape("rect","black",{x:this._x,y:this._y},{w:this._width,h:this._height});
        this._renderer.renderShape("rect","grey",{x:this._x+10,y:this._y+10},{w:this._width-20,h:this._height-20});
    }
    
    setPosition(x,y){
        this._x = x;
        this._y = y;
        this.renderWall();
    }
}