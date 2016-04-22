/*
* 公有render方法
*/ 
 function Renderer(canvas) {
     var context    = canvas.getContext("2d");
     var height     = canvas.height;
     var width      = canvas.width;
     
     function renderBackground(color='lightgoldenrodyellow') {
         context.beginPath();
         context.fillStyle = color;
         context.fillRect(0,0,width,height);
         context.closePath();
     }
     
    //  绘制图形
     function renderShape(shape,color='black',position={x:0,y:0},size={w:10,h:10,r:10}) {
         context.beginPath();
         context.fillStyle = color;
         switch (shape) {
             case "circle":
                 context.arc(position.x + size.r,position.y + size.r,size.r,0,Math.PI*2,true);
                 context.closePath();
                 context.fill();
                 break;
             case "rect":
                 context.fillRect(position.x,position.y,size.w,size.h);
                 context.closePath();
                 break;
             default:
                 break;
         }
         
     }
     
    //绘制图像  
     function  renderSprite(src,position) {
         context.beginPath();
         var sprite = new Image();
         sprite.src = src;
         context.drawImage(sprite,position.x,position.y);
     }
     
     function renderAnimation(params) {
         
     }
     
     return {
         ctx: context,
         renderBackground : renderBackground,
         renderShape    : renderShape,
         renderSprite   : renderSprite
     };
 };