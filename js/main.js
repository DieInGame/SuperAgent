

// 调整画布
var canvas    = document.getElementById("cvs1");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
var ctx=canvas.getContext('2d');
ctx.fillStyle='#FF0000';
ctx.fillRect(0,0,100,100);

var gameMgr = new GameManager(canvas);
