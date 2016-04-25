

/*
* 调整画布
* 在移动机型上，类似于Nexus5X这种浏览器自带上下边框条的会出现问题
*/ 
var canvas    = document.getElementById("cvs1");
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

// Test Renderer
var renderer = new Renderer();
renderer.setCanvas(canvas);
renderer.renderBackground();
renderer.renderShape("circle","black",{x:25,y:135},{r:13});
renderer.renderShape("rect","green",{x:50,y:50},{w:100,h:150});

// var gameMgr = new GameManager(canvas);


